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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import { signinSchema } from "../schemas/Validation";
import Signin from "../assets/images/SigninImg.jpeg";
import { Stack } from "@mui/material";
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
const defaultTheme = createTheme();

export default function SignIn() {
  const signinSlice = useSelector((state) => state.signin);

  const navigate = useNavigate();
  useEffect(() => {
    if (signinSlice.isSuccess && signinSlice.data.token) {
      const decode = jwtDecode(signinSlice.data.token);
      localStorage.setItem("token", signinSlice.data.token);
      localStorage.setItem("role", decode.role);
      dispatch(loginResetReducer());
    }
  }, [signinSlice.isSuccess]);

  const initialValues = {
    username: "",
    password: "",
  };
  const { handleBlur, handleSubmit, handleChange, values, touched, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signinSchema,
      onSubmit: (values) => {
        try {
          dispatch(startLoading());
          dispatch(signInApi(values));
        } catch (error) {
          dispatch(loginResetReducer());
        }
      },
    });

  let token = localStorage.getItem("token");
  console.log(token);
  let role = localStorage.getItem("role");
  useEffect(() => {
    if (token) {
      console.log(role, "lllllll");
      if (role.toLocaleLowerCase() === "admin") {
        navigate("/admin");
      }
      if (role.toLocaleLowerCase() === "user") {
        navigate("/user");
      }
    }
  }, [token, role, navigate]);
  return (
    <ThemeProvider theme={defaultTheme}>
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
            backgroundImage: `url(${Signin})`,
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
            width={{ lg: "45%", sm: "50%", md: "70%", xs: "100%" }}
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => handleSubmit()}
                >
                  Sign In
                </Button>
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
    </ThemeProvider>
  );
}
