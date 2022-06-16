import { SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import Product from "../../models/Product";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
// import { apiCheckLogin } from "../../remote/e-commerce-api/authService";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import VerifiedIcon from "@mui/icons-material/Verified";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from "../../store";
import { useSelector } from "react-redux";

import React from 'react';
import Popup from  'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  margin-left: 0px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  z-index: 2;
  max-height: 350px;
  max-width: 280px;
  height: auto;
  width: auto;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const OutOfStock = styled.div`
  z-index: 5;
  color: red;
  border: 2px solid red;
  display: flex;
  position: absolute;
  font-weight: bold;
  bottom: 30%;
  font-size: 1.7vw;
`;

const Featured = styled.div`
  background-color: #f9ffa1;
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Price = styled.div`
  top: 8%;
  z-index: 200;
  right: 10%;
  position: absolute;
  font-family: fantasy;
  font-size: 30px;
`;



// const VerifiedIcon = styled.div`

// `;

interface productProps {
  product: Product;
  key: number;
}

export const ProductCard = (props: productProps) => {
  const { cart, setCart } = useContext(CartContext);
  // const [loggedInStatus, setLoggedInStatus] = useState<number>(1);
  const navigator = useNavigate();
  const loggedInStatus = useSelector((state:RootState) => state.role.role);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await apiCheckLogin();
  //     setLoggedInStatus(result.payload);
  //   };
  //   fetchData();
  // }, []);

  const addItemToCart = (product: Product) => {

      let success = false;

      const newCart = [...cart];
      const index = newCart.findIndex((searchProduct) => {
        return searchProduct.id === product.id;
      });

        if (index === -1){
           newCart.push(product);
           success = true;
        }
        else if(newCart[index].cartCount < product.quantity){ 
          newCart[index].cartCount += product.cartCount;
          success = true;
        }

        if(success){
          toast.success(product.name + ' Added to Cart', {
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error('Error: Not enough product in stock', {
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }

        setCart(newCart);
  };

  const displayProduct = (product: Product) => {

  }

  const handleUpdate = () => {
    if (loggedInStatus == 3) {
      navigator(`/update/${props.product.id}`);
    }
  };

  return (
    <>

      {loggedInStatus != 3 && props.product.discontinued ? (
        <></>
      ) : (
        <>
          {!props.product.featured ? (
            <Container>
              <Circle />
              {props.product.quantity == 0 ? (
                <OutOfStock>OUT OF STOCK</OutOfStock>
              ) : (
                <></>
              )}
              {props.product.discontinued ? (
                <OutOfStock>DISCONTINUED</OutOfStock>
              ) : (
                <></>
              )}
              <Price>
                $
                {props.product.price % 1 == 0
                  ? props.product.price
                  : props.product.price.toFixed(2)}
              </Price>
              <Image src={props.product.image} />
              <Info>
                {props.product.discontinued || props.product.quantity == 0 ? (
                  <></>
                ) : (
                  <Icon>
                    <ShoppingCartOutlined
                      onClick={() => {
                        addItemToCart({ ...props.product, cartCount: 1 });
                      }}
                    />
                  </Icon>
                )}
                <Icon>
                <Popup trigger={<SearchOutlined   />} 
                    position="right center"
                      contentStyle= {{
                        border: "2px solid #F26925",
                        borderRadius: "10px",
                        background: "#f5fbfd",
                        textAlign: "center"
                      }}
                      >
                      <div>
                        <h2>  {props.product.name} </h2>
                        <h4> Category: {props.product.category} </h4>
                        <h4> {props.product.description} </h4>
                        <h4> Stock: {props.product.quantity} </h4>
                        
                        
                      </div>
                </Popup>
                  
                </Icon>
                {loggedInStatus == 3 ? (
                  <Icon>
                    <EditIcon onClick={handleUpdate} />
                  </Icon>
                ) : (
                  <></>
                )}
              </Info>
            </Container>
          ) : (
            <Featured>
              <Circle />
              {props.product.quantity == 0 ? (
                <OutOfStock>OUT OF STOCK</OutOfStock>
              ) : (
                <></>
              )}

              <div
                style={{
                  top: "10%",
                  left: "10%",
                  position: "absolute",
                  color: "green",
                  transform: "scale(1.75)",
                }}
              >
                <VerifiedIcon />
              </div>

              <Price>
                $
                {props.product.price % 1 == 0
                  ? props.product.price
                  : props.product.price.toFixed(2)}
              </Price>

              <Image src={props.product.image} />
              <Info>
                {props.product.discontinued ? <CancelIcon /> : <></>}
                {props.product.quantity == 0 ? <></> :
                <Icon> 
                  <ShoppingCartOutlined
                    onClick={() => {
                      addItemToCart({ ...props.product, cartCount: 1 });
                    }}
                  />
                </Icon>
                }
                <Icon>
                <Popup trigger={<SearchOutlined   />} 
                    position="right center"
                      contentStyle= {{
                        border: "2px solid #F26925",
                        borderRadius: "10px",
                        background: "#f5fbfd",
                        textAlign: "center"
                      }}
                      >
                      <div>
                        <h2>  {props.product.name} </h2>
                        <h4> Category: {props.product.category} </h4>
                        <h4> {props.product.description} </h4>
                        <h4> Stock: {props.product.quantity} </h4>
                      </div>
                </Popup>
                  
                </Icon>
                {loggedInStatus == 3 ? (
                  <Icon>
                    <EditIcon onClick={handleUpdate} />
                  </Icon>
                  
                ) : (
                  <></>
                )}
              </Info>
            </Featured>
          )}
        </>
      )}
    </>
  );
};
