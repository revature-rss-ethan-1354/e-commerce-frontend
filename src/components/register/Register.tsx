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
import { apiRegister } from "../../remote/e-commerce-api/authService";
import { useNavigate } from "react-router-dom";
import { isValidFirstName } from "../checkout-validation/FirstNameValidation";
import { isValidLastName } from "../checkout-validation/LastNameValidation";
import { isValidEmail } from "../register-validation/EmailValidation";
import { isValidPassword } from "../register-validation/PasswordValidation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp';

const theme = createTheme({
  palette: {
    background: {
      default: 'var(--background-color)'
    }
  },
  typography: {
    fontFamily: "Futura-Std-Book"
  }
});

const style = {
  "& .MuiOutlinedInput-root": {

      "&.Mui-focused fieldset": {
        borderColor: "#F26925"
      },

      "&.MuiOutlinedInput-root": {
        "& fieldset":{
          borderColor: "var(--font-color)"
        }
      },
      

  }
}

export default function Register() {
  const navigate = useNavigate();
  
  let firstName: String = "";
  let lastName: String = "";
  let email: String = "";
  let password: String = "";

  /*
   * This logic makes it possible to not
   * go to the Payment details page if the
   * text fields are left black
   */
  let repeatFirstName: String = "";
  let repeatLastName: String = "";
  let repeatEmail: String = "";
  let repeatPassword: String = "";

  /*
   * Declare and set the states of
   * the TextField entries
   */
  let [validFirstName, setValidFirstName] = React.useState<String>("");
  let [validLastName, setValidLastName] = React.useState<String>("");
  let [validEmail, setValidEmail] = React.useState<String>("");
  let [validPassword, setValidPassword] = React.useState<String>("");

  /*
   *
   */
  const [firstNameText, setFirstNameText] = React.useState<String>("");
  const [lastNameText, setLastNameText] = React.useState<String>("");
  const [emailText, setEmailText] = React.useState<String>("");
  const [passwordText, setPasswordText] = React.useState<String>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    firstName = new String(data.get("firstName"));
    repeatFirstName = isValidFirstName(firstName);
    setValidFirstName(isValidFirstName(firstName));

    lastName = new String(data.get("lastName"));
    repeatLastName = isValidLastName(lastName);
    setValidLastName(isValidLastName(lastName));

    email = new String(data.get("email"));
    repeatEmail = isValidEmail(email);
    setValidEmail(isValidEmail(email));

    password = new String(data.get("password"));
    repeatPassword = isValidPassword(password);
    setValidPassword(isValidPassword(password));
    try{
    const response = await apiRegister(
      `${data.get("firstName")}`,
      `${data.get("lastName")}`,
      `${data.get("email")}`,
      `${data.get("password")}`
    );
      
    if (
      response.status >= 200 &&
      response.status < 300 &&
      repeatFirstName.length === 0 &&
      repeatLastName.length === 0 &&
      repeatEmail.length === 0 &&
      repeatPassword.length === 0
    ) {
      console.log(response.payload);
      navigate("/login");
      // props.handleNext();
      console.log(data);
    } else if(response.status == 409){
      toast.error("Account already exists.", {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    }catch{}
    // if (response.status >= 200 && response.status < 300) navigate("/login");
  };

  const handleChange = (event: any) => {
    if (event.currentTarget.name == "firstName") {
      setFirstNameText(event.currentTarget.value);
    } else if (event.currentTarget.name == "lastName") {
      setLastNameText(event.currentTarget.value);
    } else if (event.currentTarget.name == "email") {
      setEmailText(event.currentTarget.value);
    } else if (event.currentTarget.name == "password") {
      setPasswordText(event.currentTarget.value);
    }
  };

  const handleOnBlur = (event: any) => {
    if (event.currentTarget.name == "firstName") {
      setValidFirstName(isValidFirstName(firstNameText));
    } else if (event.currentTarget.name == "lastName") {
      setValidLastName(isValidLastName(lastNameText));
    } else if (event.currentTarget.name == "email") {
      setValidEmail(isValidEmail(emailText));
    } else if (event.currentTarget.name == "password") {
      setValidPassword(isValidPassword(passwordText));
    }
  };

  const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
    navigate('/login');
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ToastContainer/>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#474C55" }}>
            <AppRegistrationSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onBlur={handleOnBlur}
                  onChange={handleChange}
                  sx={style}
                  InputLabelProps={{style: {color: "var(--font-color)"}}}
                  InputProps={{style: {color: "var(--font-color)"}}}    
                />
                <p className="invalid-checkout-field">{validFirstName}</p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onBlur={handleOnBlur}
                  onChange={handleChange}
                  sx={style}
                  InputLabelProps={{style: {color: "var(--font-color)"}}}
                  InputProps={{style: {color: "var(--font-color)"}}}    
                />
                <p className="invalid-checkout-field">{validLastName}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onBlur={handleOnBlur}
                  onChange={handleChange}
                  sx={style}
                  InputLabelProps={{style: {color: "var(--font-color)"}}}
                  InputProps={{style: {color: "var(--font-color)"}}}    
                />
                <p className="invalid-checkout-field">{validEmail}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onBlur={handleOnBlur}
                  onChange={handleChange}
                  sx={style}
                  InputLabelProps={{style: {color: "var(--font-color)"}}}
                  InputProps={{style: {color: "var(--font-color)"}}}    
                />
                <p className="invalid-checkout-field">{validPassword}</p>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                backgroundColor: "#f26925"
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button sx={{ mt: 2, mb: 1}} type="button" variant="text" style={{backgroundColor: "#B9B9BA"}} onClick={handleClick}>
                  Already have an account? Sign in
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
