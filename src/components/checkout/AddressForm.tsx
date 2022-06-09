import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import Address from "../../models/Address";
import { isValidZipOrPostal } from "../checkout-validation/ZipOrPostalValidation";
import { isValidStateOrRegion } from "../checkout-validation/StateOrRegionValidation";
import { isValidCity } from "../checkout-validation/CityValidation";
import { isValidCountry } from "../checkout-validation/CountryValidation";
import { isValidFirstName } from "../checkout-validation/FirstNameValidation";
import { isValidLastName } from "../checkout-validation/LastNameValidation";
import { isValidAddress } from "../checkout-validation/AddressValidation";
import "../checkout/Checkout.css";
/*
 * import { Autocomplete } from "@lob/react-address-autocomplete";
 * <Autocomplete apiKey="YOUR_API_KEY" />;
 */

interface addressFormProps {
  updateAddress: (addresses: Address) => void;
  handleNext: () => void;
}

export default function AddressForm(props: addressFormProps) {
  let firstName: String = "";
  let lastName: String = "";
  let address: String = "";
  let city: String = "";
  let stateOrRegion: String = "";
  let zipOrPostal: String = "";
  let country: String = "";

  /*
   * This logic makes it possible to not
   * go to the Payment details page if the
   * text fields are left black
   */
  let repeatFirstName: String = "";
  let repeatLastName: String = "";
  let repeatAddress: String = "";
  let repeatCity: String = "";
  let repeatStateOrRegion: String = "";
  let repeatZipOrPostal: String = "";
  let repeatCountry: String = "";

  /*
   * Declare and set the states of
   * the TextField entries
   */
  let [validFirstName, setValidFirstName] = React.useState<String>("");
  let [validLastName, setValidLastName] = React.useState<String>("");
  let [validAddress, setValidAddress] = React.useState<String>("");
  let [validCity, setValidCity] = React.useState<String>("");
  let [validStateOrRegion, setValidStateOrRegion] = React.useState<String>("");
  let [validZipOrPostal, setValidZipOrPostal] = React.useState<String>("");
  let [validCountry, setValidCountry] = React.useState<String>("");

  /* We might need a useEffect to keep track of the
   * state information typed into the TextFields
   *    React.useEffect(() => {}, []);
   */

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    firstName = new String(data.get("firstName"));
    repeatFirstName = isValidFirstName(firstName);
    setValidFirstName(isValidFirstName(firstName));

    lastName = new String(data.get("lastName"));
    repeatLastName = isValidLastName(lastName);
    setValidLastName(isValidLastName(lastName));

    address = new String(data.get("address1"));
    repeatAddress = isValidAddress(address);
    setValidAddress(isValidAddress(address));

    country = new String(data.get("country"));
    repeatCountry = isValidCountry(country);
    setValidCountry(isValidCountry(country));

    city = new String(data.get("city"));
    repeatCity = isValidCity(city, country);
    setValidCity(isValidCity(city, country));

    stateOrRegion = new String(data.get("state"));
    repeatStateOrRegion = isValidStateOrRegion(stateOrRegion, country);
    setValidStateOrRegion(isValidStateOrRegion(stateOrRegion, country));

    zipOrPostal = new String(data.get("zip"));
    repeatZipOrPostal = isValidZipOrPostal(zipOrPostal, country);
    setValidZipOrPostal(isValidZipOrPostal(zipOrPostal, country));

    props.updateAddress({
      firstName: `${data.get("firstName")}`,
      lastName: `${data.get("lastName")}`,
      address1: `${data.get("address1")}`,
      address2: `${data.get("address2")}`,
      city: `${data.get("city")}`,
      state: `${data.get("state")}`,
      zip: `${data.get("zip")}`,
      country: `${data.get("country")}`,
    });

    if (
      repeatFirstName.length === 0 &&
      repeatLastName.length === 0 &&
      repeatAddress.length === 0 &&
      repeatCity.length === 0 &&
      repeatStateOrRegion.length === 0 &&
      repeatZipOrPostal.length === 0 &&
      repeatCountry.length === 0
    ) {
      props.handleNext();
    } else {
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
            <p className="invalid-checkout-field">{validFirstName}</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
            <p className="invalid-checkout-field">{validLastName}</p>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
            <p className="invalid-checkout-field">{validAddress}</p>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              inputProps={{
                autoComplete: "off",
              }}
            />
            <p className="invalid-checkout-field">{validCity}</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              inputProps={{
                autoComplete: "off",
              }}
            />
            <p className="invalid-checkout-field">{validStateOrRegion}</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              inputProps={{
                autoComplete: "off",
              }}
            />
            <p className="invalid-checkout-field">{validZipOrPostal}</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              inputProps={{
                autoComplete: "off",
              }}
            />
            <p className="invalid-checkout-field">{validCountry}</p>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
            Next
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}
