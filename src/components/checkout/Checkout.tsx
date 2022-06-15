import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Address from '../../models/Address';
import PaymentDetail from '../../models/PaymentDetail';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import Product from '../../models/Product';
import { useNavigate } from 'react-router-dom';
import pride from "../navbar/revBackground.png";
import styled from "styled-components";
import { apiCheckLogin } from '../../remote/e-commerce-api/authService';
import Navbar from '../navbar/Narbar';

const Image = styled.img`
  width: 200px;
  height: 75px;
  z-index: 2;
  cursor: pointer;
`;

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const products: Product[] = [
];
let address = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: ""
};
let paymentDetail = [
  { name: 'Card type', detail: '' },
  { name: 'Card holder', detail: '' },
  { name: 'Card number', detail: '' },
  { name: 'Expiry date', detail: '' },
];

const theme = createTheme({
  typography: {
    fontFamily: "Futura-Std-Book"
  }
});

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const updateAddress = (newAddress: Address) => {
    address = newAddress
  }

  const updatePayment = (newPaymentDetail: PaymentDetail[]) => {
    paymentDetail = newPaymentDetail
  }
  const [loggedInStatus, setLoggedInStatus] = React.useState<number>(1);
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await apiCheckLogin();
      setLoggedInStatus(result.payload);
      if(result.payload == 1){navigate("/")}
      if(result.status == 500){navigate("/500")};
    };
    fetchData();
  }, []);

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm handleNext={handleNext} updateAddress={updateAddress} />;
      case 1:
        return <PaymentForm handleNext={handleNext} handleBack={handleBack} updatePayment={updatePayment} />;
      case 2:
        return <Review handleNext={handleNext} handleBack={handleBack} payments={paymentDetail} address={address} />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <div className="navbar-div">
        <Navbar />
      </div>
      {/* <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar className="toolbar">
          <Image src={pride} onClick={() => { navigate('/'); }} />
          {/* <Typography className="home" variant="h6" color="inherit" noWrap onClick={() => navigate('/')}>
            Revature Swag Shop
          </Typography> */}
        </Toolbar>
      </AppBar> */}
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper className="step" activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}
                sx={{
                  '& .MuiStepLabel-root .Mui-completed': {
                    color: '#F26925', // circle color (COMPLETED)
                  },
                  '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                  {
                    color: '#B9B9BA', // Just text label (COMPLETED)
                  },
                  '& .MuiStepLabel-root .Mui-active': {
                    color: '#F26925', // circle color (ACTIVE)
                  },
                  '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                  {
                    color: 'common.white', // Just text label (ACTIVE)
                  },
                  '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                    fill: 'common.white', // circle's number (ACTIVE)
                  },
                }}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}