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
import { apiRegister } from "../../remote/e-commerce-api/authService";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  apiGetProductById,
  apiUpdateProduct,
} from "../../remote/e-commerce-api/productService";
import Product from "../../models/Product";
import { Select } from "@mui/material";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Narbar";
import "./UpdateProduct.css";
import "../../fonts/Futura-Std-Book.otf";

const theme = createTheme({
  typography: {
    fontFamily: "Futura-Std-Book"
  }
});

export default function UpdateProduct() {
  let productId = Number(window.location.pathname.split("/update/")[1]);
  console.log("Pid " + productId);

  const navigator = useNavigate();

  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [featured, isFeatured] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [discontinued, isDiscontinued] = useState<boolean>(false);

  useEffect(() => {
    const fetchIdData = async () => {
      const result = await apiGetProductById(productId);

      setName(result.payload.name);
      setQuantity(result.payload.quantity);
      setPrice(result.payload.price);
      setDescription(result.payload.description);
      setImage(result.payload.image);
      isFeatured(result.payload.featured);
      isDiscontinued(result.payload.discontinued);
      setCategory(result.payload.category);
    };
    // console.log(name);
    fetchIdData();
  }, []);

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
    if (event.currentTarget.name == "featured") {
      isFeatured(!featured);
    } else {
      isDiscontinued(!discontinued);
    }
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
      id: productId,
      name,
      quantity,
      price,
      description,
      image,
      featured,
      discontinued,
      category,
    };

    console.log(temp);

    const response = await apiUpdateProduct(temp);
    navigator("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div className="body-container">
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
          {/*
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          */}

          <Typography component="h1" variant="h5">
            Update
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
                  value={name}
                  //placeholder={product.name}
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="quantity"
                  label="quantity"
                  type="number"
                  name="quantity"
                  //placeholder={product.quantity.toString()}
                  value={quantity}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  type="number"
                  //placeholder={product.price.toString()}
                  value={price}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="description"
                  id="description"
                  //placeholder={product.description}
                  value={description}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="image"
                  label="image"
                  id="image"
                  //placeholder={product.image}
                  value={image}
                />
              </Grid>

              <div className="switch-container">
              <span className="featured">Featured:</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="featured"
                    onClick={handleClick}
                    checked={featured}
                  />
                  <span className="slider round"></span>
                </label>

                <span className="featured">Discontinued:</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="discontinued"
                    onClick={handleClick}
                    checked={discontinued}
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

                <select
                  className="category"
                  id="category"
                  onChange={handleSelect}
                >
                  <option className="option" selected value="clothing">Clothing</option>
                  <option className="option" value="accessories">Accessories</option>
                  <option className="option" value="electronics">Electronics</option>
                </select>
              </Grid>
            </Grid>
            <button
              type="submit"
              onClick={handleSubmit}
              className="submit-button"
            >
              Update Product
            </button>

          </Box>
        </Box>
      </Container>
      </div>
    </ThemeProvider>
  );
}
