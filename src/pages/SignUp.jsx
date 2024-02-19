import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import SignupImg from "../assets/images/SignupImg.jpeg";
import { signupSchema } from "../schemas/Validation";
import FormError from "../schemas/formError";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { dispatch } from "../redux/store/store";
import {
  signUpapi,
  signupResetReducer,
  startLoading,
} from "../redux/slice/SignUpSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const navigate = useNavigate();
  const signupSlice = useSelector((state) => state.signup);
  // console.log(signupSlice);
  const isLoading = signupSlice.loading;
  const initialValues = {
    username: "",
    password: "",
    confirm_password: "",
    role: "",
  };
  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchema,
    onSubmit: (values) => {
      try {
        dispatch(startLoading());
        dispatch(signUpapi(values));
      } catch (error) {
        dispatch(signupResetReducer());
      }
      resetForm();
    },
  });

  useEffect(() => {
    if (signupSlice.isError) {
      toast.error("User already exists!",{autoClose:1000});
      dispatch(signupResetReducer());
    } else if (signupSlice.isSuccess) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
      toast.success("Sign up successful!", { autoClose: 1000 });
    }
    dispatch(signupResetReducer());
  }, [signupSlice.isSuccess,signupSlice.isError]);

  return (
    <Box
      sx={{
        justifyContent: "center",
        // backgroundImage: `url(${SignupImg})`,
        background:"linear-gradient(80deg, #D8B5FF ,  #1EAE98)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "cover",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <>
        <Container
          component="main"
          sx={{
            padding: {
              xs: 0,
              md: 16,
            },
          }}
        >
          <CssBaseline />
          <Stack
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            width={{ lg: "45%", sm: "50%", md: "60%", xs: "100%" }}
            square
            sx={{ margin: "auto", borderRadius: "15px", opacity: ".9" }}
          >
            <Box>
              <Box display={"flex"} sx={{ justifyContent: "center" }}>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
              </Box>

              <Typography component="h1" variant="h5" textAlign={"center"}>
                Sign Up
              </Typography>
              <Stack
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 1, p: 2 }}
              >
                <Box>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={values.username}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.username && touched.username && (
                    <FormError error_msg={errors.username} />
                  )}
                </Box>
                <Box width={"100%"}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password && (
                    <FormError error_msg={errors.password} />
                  )}
                </Box>
                <Box width={"100%"}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="confirm_password"
                    label=" Confirm Password"
                    type="password"
                    id="confirm_password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirm_password && touched.confirm_password && (
                    <FormError error_msg={errors.confirm_password} />
                  )}
                </Box>
                <Box width={"100%"}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="role"
                      value={values.role}
                      label="Role"
                      onChange={handleChange}
                    >
                      <MenuItem value={"Admin"}>Admin</MenuItem>
                      <MenuItem value={"User"}>User</MenuItem>
                    </Select>
                    {errors.role && touched.role && (
                      <FormError error_msg={errors.role} />
                    )}
                  </FormControl>
                </Box>
                {isLoading ? <Box display={"flex"} sx={{justifyContent:"center",mb:2}}>
                  <CircularProgress />
                </Box> : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                )}

                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Box display={"flex"} gap={1}>
                      Already have an account
                      <NavLink
                        style={{
                          textDecoration: "none",
                        }}
                        to="/"
                      >
                        Sign in
                      </NavLink>
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </>
      <ToastContainer />
    </Box>
  );
}
