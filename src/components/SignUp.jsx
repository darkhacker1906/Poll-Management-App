import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import SignupImg from "../assets/SignupImg.jpeg";
import { signupSchema } from "../schemas/Validation";
import FormError from "../schemas/formError";
import { NavLink } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignUp() {
  const initialValues = {
    username: "",
    password: "",
    confirm_password: "",
    role: "",
  };
  const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  return (
    <Box
      sx={{
        backgroundImage: `url(${SignupImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "cover",
        minHeight: "100vh",
        minWidth: "100vw",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <Container component="main">
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            width={"45%"}
            square
            sx={{ margin: "auto" }}
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
                    required
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
                    required
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
                    {errors.confirm_password && touched.confirm_password && (
                      <FormError error_msg={errors.role} />
                    )}
                  </FormControl>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <NavLink to="/">
                      <Typography sx={{ textDecoration: "none" }}>
                        {" "}
                        Login
                      </Typography>
                    </NavLink>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </Grid>
        </Container>
      </ThemeProvider>
    </Box>
  );
}
