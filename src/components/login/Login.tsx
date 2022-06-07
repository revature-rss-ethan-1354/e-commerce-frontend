import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { apiLogin } from "../../remote/e-commerce-api/authService";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../email-validation/EmailValidation";
import "./Login.css";

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  let email;
  let checkEmail;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // let emailString = new String(data.get("email"));
    // let passwordString = new String(data.get("password"));
    // let lastAtPosition = emailString.lastIndexOf("@");
    // let lastDotPosition = emailString.lastIndexOf(".");

    // if (
    //   !(
    //     lastAtPosition < lastDotPosition &&
    //     lastAtPosition > 0 &&
    //     emailString.indexOf("@@") == -1 &&
    //     lastDotPosition > 2 &&
    //     emailString.length - lastDotPosition > 2
    //   )
    // ) {
    //   console.log("Sorry not an email");
    //   setValidEmail(false);
    // } else {
    //   console.log("valid email address");
    //   const response = await apiLogin(
    //     `${data.get("email")}`,
    //     `${data.get("password")}`
    //   );
    //   if (response.status >= 200 && response.status < 300) navigate("/");
    // }
    console.log("valid email address");
    const response = await apiLogin(
      `${data.get("email")}`,
      `${data.get("password")}`
    );
    email = new String(data.get("email"));
    checkEmail = isValidEmail(email);
    if (response.status >= 200 && response.status < 300) navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {checkEmail ? (
              <></>
            ) : (
              <p className="invalid-email">Incorrect Email Format</p>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item>
                <Link href="register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
