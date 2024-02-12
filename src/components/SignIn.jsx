import * as React from "react";
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
import Signin from "../assets/SigninImg.jpeg";
import { Stack } from "@mui/material";
import FormError from "../schemas/formError";
import { NavLink } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignIn() {
  const initialValues = {
    username: "",
    password: "",
  };
  const { handleBlur, handleSubmit, handleChange, values, touched, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signinSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Stack
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
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            width={"45%"}
            square
          >
            <Stack
              sx={{
                my: 8,
                mx: 4,
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
                  <NavLink to="/signup"> Sign up</NavLink>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Stack>
      </Grid>
    </ThemeProvider>
  );
}
