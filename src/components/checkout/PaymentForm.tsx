import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import PaymentDetail from "../../models/PaymentDetail";
import { Box, Button } from "@mui/material";
import { isValidFullName } from "../checkout-validation/FullNameCardValidation";
import { isValidCardNumber } from "../checkout-validation/CardNumberValidation";
import { isValidExpirationDate } from "../checkout-validation/ExpirationDateCardValidation";
import { isValidCvv } from "../checkout-validation/CvvValidation";
import { orange } from "@mui/material/colors";

interface paymentFormProps {
  handleBack: () => void;
  handleNext: () => void;
  updatePayment: (paymentDetail: PaymentDetail[]) => void;
}

export default function PaymentForm(props: paymentFormProps) {
  let fullName: String = "";
  let cardNumber: String = "";
  let expirationDate: String = "";
  let cvv: String = "";

  /*
   * This logic makes it possible to not
   * go to the Review order page if the
   * text fields are left black
   */
  let repeatFullName: String = "";
  let repeatCardNumber: String = "";
  let repeatExpirationDate: String = "";
  let repeatCvv: String = "";

  let [validFullName, setValidFullName] = React.useState<String>("");
  let [validCardNumber, setValidCardNumber] = React.useState<String>("");
  let [validExpirationDate, setValidExpirationDate] =
    React.useState<String>("");
  let [validCvv, setValidCvv] = React.useState<String>("");

  const [fullNameText, setFullNameText] = React.useState<String>("");
  const [cardNumberText, setCardNumberText] = React.useState<String>("");
  const [expirationDateText, setExpirationDateText] =
    React.useState<String>("");
  const [cvvText, setCvvText] = React.useState<String>("");


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    fullName = new String(data.get("cardName"));
    repeatFullName = isValidFullName(fullName);
    setValidFullName(isValidFullName(fullName));

    cardNumber = new String(data.get("cardNumber"));
    repeatCardNumber = isValidCardNumber(cardNumber);
    setValidCardNumber(isValidCardNumber(cardNumber));

    expirationDate = new String(data.get("expDate"));
    repeatExpirationDate = isValidExpirationDate(expirationDate);
    setValidExpirationDate(isValidExpirationDate(expirationDate));

    cvv = `${data.get("cvv")}`;
    repeatCvv = isValidCvv(cvv);
    setValidCvv(isValidCvv(cvv));

    props.updatePayment([
      { name: "Card Type", detail: `Visa` },
      { name: "Card Holder", detail: `${data.get("cardName")}` },
      {
        name: "Card Number",
        detail: formatCardNumber(`${data.get("cardNumber")}`),
      },
      { name: "Expiry Date", detail: `${data.get("expDate")}` },
    ]);

    if (
      repeatFullName.length === 0 &&
      repeatCardNumber.length === 0 &&
      repeatExpirationDate.length === 0 &&
      repeatCvv.length === 0
    ) {
      props.handleNext();
    } else {
    }
  };

  const formatCardNumber = (cardNumber: string) => {
    return `xxxx-xxxx-xxxx-${cardNumber.slice(-4)}`;
  };

  const handleChange = (event: any) => {
    if (event.currentTarget.name == "cardName") {
      setFullNameText(event.currentTarget.value);
    } else if (event.currentTarget.name == "cardNumber") {
      setCardNumberText(event.currentTarget.value);
    } else if (event.currentTarget.name == "expDate") {
      setExpirationDateText(event.currentTarget.value);
    } else if (event.currentTarget.name == "cvv") {
      setCvvText(event.currentTarget.value);
    }
  };
  const handleOnBlur = (event: any) => {
    if (event.currentTarget.name == "cardName") {
      setValidFullName(isValidFullName(fullNameText));
    } else if (event.currentTarget.name == "cardNumber") {
      setValidCardNumber(isValidCardNumber(cardNumberText));
    } else if (event.currentTarget.name == "expDate") {
      setValidExpirationDate(isValidExpirationDate(expirationDateText));
    } else if (event.currentTarget.name == "cvv") {
      setValidCvv(isValidCvv(cvvText));
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              name="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              onBlur={handleOnBlur}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (!/[a-z, A-Z]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            <p className="invalid-checkout-field">{validFullName}</p>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              name="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              onBlur={handleOnBlur}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            <p className="invalid-checkout-field">{validCardNumber}</p>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              name="expDate"
              label="Expiry date (MMYY)"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              onBlur={handleOnBlur}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            <p className="invalid-checkout-field">{validExpirationDate}</p>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              name="cvv"
              label="CVV"
              // helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              onBlur={handleOnBlur}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            <p className="invalid-checkout-field">{validCvv}</p>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1, backgroundColor: orange }}>
            Back
          </Button>
          <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }} color="warning">
            Next
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}
