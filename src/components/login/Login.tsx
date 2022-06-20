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
import { apiLogin, setInitRole } from "../../remote/e-commerce-api/authService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";

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
      }
  }
}

//export const HTTP_500_ERROR = 'HTTP_500_ERROR'
export default function Login() {
  const navigate = useNavigate();
  let [invalidEmail, setinvalidEmail] = React.useState<String>("");
  const dispatch:AppDispatch = useDispatch();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    try{
      const response = await apiLogin(
        `${data.get("email")}`,
        `${data.get("password")}`
      );

      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        dispatch(setInitRole(response.payload));
        
        navigate("/");
    }
    }
    catch (e){
      console.log(e);
      toast.error("Email or Password incorrect.", {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      
    }
  };
  const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
    navigate('/register');
  }


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
          <Avatar sx={{ m: 1, bgcolor: "#474C55" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <ToastContainer/>
            <TextField
              className="login-input"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={style}
              InputLabelProps={{style: {color: "var(--font-color)"}}}
                  InputProps={{style: {color: "var(--font-color)"}}}
            />
            <TextField
              className="login-input"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={style}
              InputLabelProps={{style: {color: "var(--font-color)"}}}
                  InputProps={{style: {color: "var(--font-color)"}}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                backgroundColor: "#f26925"
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Button sx={{ mt: 2, mb: 1}} type="button" variant="text" style={{backgroundColor: "#B9B9BA"}} onClick={handleClick}>
                  Don't have an account? Sign Up!
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
