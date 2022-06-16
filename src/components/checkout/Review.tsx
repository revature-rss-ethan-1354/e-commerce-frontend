import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Product from '../../models/Product';
import PaymentDetail from '../../models/PaymentDetail';
import Address from '../../models/Address';
import { Box, Button } from '@mui/material';
import { apiPurchase } from '../../remote/e-commerce-api/productService';
import { CartContext } from '../../context/cart.context';
import "./Checkout.css";

interface reviewProps {
  handleBack: () => void
  handleNext: () => void
  address: Address
  payments: PaymentDetail[]
}

const styleButton = {
  '&:hover': {
    backgroundColor: '#FCB414',
  },
  mt: 3, ml: 1, backgroundColor: "#FCB414", color: "black"
}

export default function Review(props: reviewProps) {

  const {cart, setCart} = React.useContext(CartContext)
  let [invalidOrder, setinvalidOrder] = React.useState<String>("");
  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    let productPurchaseDtos = cart.map((product) => ({
      id: product.id,
      quantity: product.cartCount
    }))
    try{
      const fetchData = async () => {
        const result = await apiPurchase(productPurchaseDtos)
        if(result.status == 400){setinvalidOrder("We were unable to fullfill the quantity of at least one of your ordered items.");}
        else{
    setCart([])
    props.handleNext()}
      }; fetchData();
  }catch{}
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <p className="invalid-checkout-field">{invalidOrder}</p>
      <List disablePadding>
        {cart.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={`${product.name} x${product.cartCount}`} secondary={product.description} />
            <Typography variant="body2">{product.price * product.cartCount}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $ {cart.reduce<number>((total, product) => total + product.price * product.cartCount, 0)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{`${props.address.firstName} ${props.address.lastName}`}</Typography>
          <Typography gutterBottom>{`${props.address.address1}${props.address.address2? ', ' + props.address.address2: ''}, ${props.address.city}, ${props.address.state} , ${props.address.zip}, ${props.address.country}`}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {props.payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1, color: "#474C55"}}>
          Back
        </Button>
        <Button className="place-order"
          variant="contained"
          onClick={handleSubmit}
          sx={styleButton}
        >
          Place order
        </Button>
      </Box>
    </React.Fragment>
  );
}