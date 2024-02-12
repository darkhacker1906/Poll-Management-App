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
  Select,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import SignupImg from "../assets/SignupImg.jpeg";
import { signupSchema } from "../schemas/Validation";
import FormError from "../schemas/formError";

const defaultTheme = createTheme();

export default function SignIn() {
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
    <Stack
      sx={{
        backgroundImage: `url(${SignupImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "cover",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#EBEBEB",
              opacity: ".9",
              padding: "15px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                <FormError error_msg={errors} />
              )}
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
              </FormControl>

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
                  <Link href="#" variant="body2">
                    {" Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Stack>
  );
}
