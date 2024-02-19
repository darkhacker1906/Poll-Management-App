import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { signinSchema } from "../schemas/Validation";
import { CircularProgress, Stack } from "@mui/material";
import FormError from "../schemas/formError";
import { NavLink, useNavigate } from "react-router-dom";
import { dispatch } from "../redux/store/store";
import {
  signInApi,
  loginResetReducer,
  startLoading,
} from "../redux/slice/SignInSlice";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";

export default function SignIn() {
  const signinSlice = useSelector((state) => state.signin);
  const isLoading = signinSlice.loading;
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };
  const {
    handleBlur,
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signinSchema,
    onSubmit: (values) => {
      try {
        dispatch(startLoading());
        dispatch(signInApi(values));
      } catch (error) {
        dispatch(loginResetReducer());
      }
      resetForm();
    },
  });

  useEffect(() => {
    if (signinSlice.isSuccess && signinSlice.data.token) {
      const decode = jwtDecode(signinSlice.data.token);
      localStorage.setItem("token", signinSlice.data.token);
      localStorage.setItem("role", decode.role);
      dispatch(loginResetReducer());
    } else if (signinSlice.isError) {
      toast.error("User does not exist!", { autoClose: 1500 });
      dispatch(loginResetReducer());
    }
  }, [signinSlice.isSuccess, signinSlice.isError]);

  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  useEffect(() => {
    if (token) {
      if (role.toLocaleLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } else {
      navigate("/");
    }
  }, [token, role, navigate]);
  return (
    <>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          overflowY: "hidden",
        }}
      >
        <CssBaseline />
        <Stack
          p={{ lg: 3, xs: 0 }}
          sx={{
            background: "linear-gradient(80deg, #2E3192, #1BFFFF)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            objectFit: "cover",
            minHeight: "100vh",
            minWidth: "100vw",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            width={{ lg: "40%", sm: "50%", md: "70%", xs: "100%" }}
            height={{ sm: "auto", md: "auto", xs: "100%" }}
            square
            borderRadius={{ lg: 5, xs: 0 }}
            sx={{ opacity: ".8" }}
          >
            <Stack
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                width={"100%"}
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  value={values.username}
                  id="username"
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.username && touched.username && (
                  <FormError error_msg={errors.username} />
                )}
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <FormError error_msg={errors.password} />
                )}
                {isLoading ? (
                  <Box
                    display={"flex"}
                    sx={{ justifyContent: "center", mb: 2 }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => handleSubmit()}
                  >
                    Sign In
                  </Button>
                )}
              </Box>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Box display={"flex"} gap={1}>
                    Don't have an account
                    <NavLink style={{ textDecoration: "none" }} to="/signup">
                      Sign up
                    </NavLink>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <ToastContainer />
    </>
  );
}
