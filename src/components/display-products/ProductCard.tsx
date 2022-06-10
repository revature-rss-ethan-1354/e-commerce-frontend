import { SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import Product from "../../models/Product";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiCheckLogin } from "../../remote/e-commerce-api/authService";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import VerifiedIcon from "@mui/icons-material/Verified";

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
  max-width: 300px;
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
  height: 75%;
  z-index: 2;
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
  font-size: 40px;
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

// const VerifiedIcon = styled.div`

// `;

interface productProps {
  product: Product;
  key: number;
}

export const ProductCard = (props: productProps) => {
  const { cart, setCart } = useContext(CartContext);
  const [loggedInStatus, setLoggedInStatus] = useState<number>(1);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await apiCheckLogin();
      setLoggedInStatus(result.payload);
    };
    fetchData();
  }, []);

  const addItemToCart = (product: Product) => {
    const newCart = [...cart];
    const index = newCart.findIndex((searchProduct) => {
      return searchProduct.id === product.id;
    });

    if (index === -1) newCart.push(product);
    else newCart[index].quantity += product.quantity;

    setCart(newCart);
  };

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
              <Image src={props.product.image} />
              <Info>
                {props.product.discontinued || props.product.quantity == 0 ? (
                  <></>
                ) : (
                  <Icon>
                    <ShoppingCartOutlined
                      onClick={() => {
                        addItemToCart({ ...props.product, quantity: 1 });
                      }}
                    />
                  </Icon>
                )}
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

              <Image src={props.product.image} />
              <Info>
                {props.product.discontinued ? <CancelIcon /> : <></>}

                <Icon>
                  <ShoppingCartOutlined
                    onClick={() => {
                      addItemToCart({ ...props.product, quantity: 1 });
                    }}
                  />
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
