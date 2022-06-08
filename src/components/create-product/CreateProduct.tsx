import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { apiRegister } from '../../remote/e-commerce-api/authService';
import { useNavigate } from 'react-router-dom';
import { apiUpdateProduct, apiUpsertProduct } from '../../remote/e-commerce-api/productService';
import Product from '../../models/Product';

const theme = createTheme();

export default function CreateProduct() {

    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<string>('');


    const handleInput = (event: React.ChangeEvent<HTMLFormElement>) => {

        //const data = new FormData(event.currentTarget);

        if (event.target.name == "name") {
            setName(event.target.value);
            console.log(event.target.value);
        }
        else if (event.target.name == "quantity") {
            setQuantity(event.target.value);
            console.log(event.target.value);
        }
        else if (event.target.name == "price") {
            setPrice(event.target.value);
            console.log(event.target.value);
        }
        else if (event.target.name == "description") {
            setDescription(event.target.value);
            console.log(event.target.value);
        }
        else if (event.target.name == "image") {
            setImage(event.target.value);
            console.log(event.target.value);
        }
    
    }
        
    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();    

        let temp = {
            id: 0,
            name,
            quantity,
            price,
            description,
            image,
            featured: false
        }
                            
        const response = await apiUpsertProduct(temp);
    };
    
    return (
        <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create
          </Typography>
          <Box component="form" noValidate onChange={handleInput} sx={{ mt: 3 }}>
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
                  placeholder="Quantity"
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
                  placeholder="Price"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="description"
                  id="description"
                  placeholder="Description"
                />
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Create Product
            </Button>
           
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
            
    )
    // id: number;
    // name: string;
    // quantity: number;
    // price: number;
    // description: string;
    // image: string;
}