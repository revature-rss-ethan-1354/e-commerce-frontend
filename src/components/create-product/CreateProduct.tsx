import React, { useEffect, useState } from "react";
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
import { apiCheckLogin, apiRegister } from "../../remote/e-commerce-api/authService";
import { useNavigate } from "react-router-dom";
import {
  apiUpsertProduct,
} from "../../remote/e-commerce-api/productService";
import Product from "../../models/Product";
import { Select } from "@mui/material";
import Navbar from "../navbar/Narbar";

import "./CreateProduct.css";
import "../../fonts/Futura-Std-Book.otf";
import { isValidProductName } from "../create-product-validation/product-name-validation";
import { isValidProductQuantity } from "../create-product-validation/product-quantity-validation";
import { isValidProductPrice } from "../create-product-validation/product-price-validation";
import { isValidProductDescription } from "../create-product-validation/product-description-validation";
import { number } from "card-validator";

const theme = createTheme({
  typography: {
    fontFamily: "Futura-Std-Book"
  }
});

export default function CreateProduct() {
  const navigate = useNavigate();
  useEffect(() => {
   
    try{
    const fetchData = async () => {
      const result = await apiCheckLogin();
      if(result.payload != 3){navigate("/")}
    };
    fetchData();
  }catch{}
  }, []);
  let productName: String = "";
  let productNameChecked: String = "";
  let [validProductName, setValidProductName] = React.useState<String>("");

  let productQuantity: String = "";
  let productQuantityChecked: String = "";
  let [validProductQuantity, setValidProductQuantity] = React.useState<String>("");

  let productPrice: String = "";
  let productPriceChecked: String = "";
  let [validProductPrice, setValidProductPrice] = React.useState<String>("");

  let productDescription: String = "";
  let productDescriptionChecked: String = "";
  let [validProductDescription, setValidProductDescription] = React.useState<String>("");

 
  
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [featured, isFeatured] = useState<boolean>(false);
  // const [discontinued, isDiscontinued] = useState<boolean>();
  const [category, setCategory] = useState<string>("");
  let [invalidServer, setinvalidServer] = React.useState<String>("");
  const handleInput = (event: React.ChangeEvent<HTMLFormElement>) => {
    if (event.target.name == "name") {
      setName(event.target.value);
      console.log(event.target.value);
    } else if (event.target.name == "quantity") {
      setQuantity(event.target.value);
      console.log(event.target.value);
    } else if (event.target.name == "price") {
      setPrice(event.target.value);
      console.log(event.target.value);
    } else if (event.target.name == "description") {
      setDescription(event.target.value);
      console.log(event.target.value);
    } else if (event.target.name == "image") {
      setImage(event.target.value);
      console.log(event.target.value);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    isFeatured(!featured);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.currentTarget.name == "category") {
      setCategory(event.currentTarget.value);
      console.log(event.currentTarget.value);
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();


    let temp = {
      id: 0,
      name,
      quantity,
      price,
      description,
      image,
      featured,
      discontinued: false,
      category,
      cartCount: 0
    };


    productName = temp.name;
    productNameChecked = isValidProductName(productName);
    setValidProductName(isValidProductName(productName));

    productQuantity = new String(temp.quantity);
    productQuantityChecked = isValidProductQuantity(productQuantity);
    setValidProductQuantity(isValidProductQuantity(productQuantity));

    productPrice = new String(temp.price);
    productPriceChecked = isValidProductPrice(productPrice);
    setValidProductPrice(isValidProductPrice(productPrice));

    productDescription = temp.description;
    productDescriptionChecked = isValidProductDescription(productDescription);
    setValidProductDescription(isValidProductDescription(productDescription));

    console.log(temp);
    if (
      productNameChecked.length === 0 &&
      productPriceChecked.length === 0 &&
      productPriceChecked.length === 0 &&
      productDescriptionChecked.length === 0
    ) {
      const response = await apiUpsertProduct(temp);
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <p className="invalid-checkout-field">{invalidServer}</p>
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
            Create
          </Typography>
          <Box
            component="form"
            noValidate
            onChange={handleInput}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="Product Name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  autoFocus
                  onKeyPress={(event) => {
                    if (!/[a-z, A-Z]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <p className="invalid-product-field">{validProductName}</p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="quantity"
                  label="quantity"
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <p className="invalid-product-field">{validProductQuantity}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  type="number"
                  placeholder="Price"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <p className="invalid-product-field">{validProductPrice}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="description"
                  id="description"
                  placeholder="Description"
                  onKeyPress={(event) => {
                    if (!/[a-z, A-Z, 0-9, %]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <p className="invalid-product-field">{validProductDescription}</p>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="image"
                  label="image"
                  id="image"
                  placeholder="Image"
                />
              </Grid>

              <div className="switch-container">
                {/* <input
                  type="radio"
                  name="is-featured"
                  id="featured"
                  value="featured"
                  onClick={handleClick}
                ></input>
                <label>Featured</label>
                <br />
                <input
                  type="radio"
                  name="is-featured"
                  id="not-featured"
                  value="not-featured"
                  onClick={handleClick}
                ></input>
                <label>Not Featured</label> */}
                <span className="featured">Featured:</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="featured-check"
                    onClick={handleClick}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <Grid item xs={12}>
                {/*
                <Select
                    fullWidth
                    name="category"
                    label="category"
                    id="category"
                    >
                      <option onSelect={(event) => setCategory("Clothing")} selected value="clothing">Clothing</option>
                      <option onSelect={(event) => setCategory("Accessories")} value="accessories">Accessories</option>
                      <option onSelect={(event) => setCategory("Electronics")}  value="electronics">Electronics</option>
                </Select>
                */}

                <select className="category" id="category" onChange={handleSelect}>
                  <option selected value="clothing">
                    Clothing
                  </option>
                  <option value="accessories">Accessories</option>
                  <option value="electronics">Electronics</option>
                </select>
              </Grid>
            </Grid>
            <button
              className="create-button"
              type="submit"
              onClick={handleSubmit}
            >
              Create Product
            </button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
