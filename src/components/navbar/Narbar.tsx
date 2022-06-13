import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  apiCheckLogin,
  apiLogout,
} from "../../remote/e-commerce-api/authService";
import pride from "./revBackground.png";
import { useCallback } from "react";

const Container = styled.div`
  height: fit-content;
  background: #72a4c2;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 17px;
  cursor: pointer;
  margin-left: 55px;
`;
const Image = styled.img`
  width: 200px;
  height: 75px;
  z-index: 2;
  cursor: pointer;
`;

const Navbar = () => {
  let [invalidServer, setinvalidServer] = React.useState<String>("");
  useEffect(() => {
    try{
    const fetchData = async () => {
      const checkLogin = await apiCheckLogin();
      setLoggedIn(checkLogin.payload);
    };
    fetchData();
  }catch(e){setinvalidServer("Our servers are momentarily down please visit again soon.");}
  }, []);

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState<number>(1);

  const handleLogout = () => {
    apiLogout();
    setLoggedIn(1);
    window.location.reload();
    navigate("/");
  };

  const handleCart = () => {
    if (loggedIn != 1) navigate("/cart");
    else navigate("/login");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Image
            src={pride}
            onClick={() => {
              navigate("/");
            }}
          />
        </Left>
        <p className="invalid-checkout-field">{invalidServer}</p>
        <Right>
          {loggedIn == 3 ? (
            <>
              {window.location.pathname == "/create" ? (
                <MenuItem
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  SEARCH
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    navigate("/create");
                  }}
                >
                  CREATE
                </MenuItem>
              )}
            </>
          ) : (
            <></>
          )}
          {loggedIn != 1 ? (
            <MenuItem onClick={handleLogout}>LOG OUT</MenuItem>
          ) : (
            <>
              <MenuItem
                onClick={() => {
                  navigate("/register");
                }}
              >
                REGISTER
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/login");
                }}
              >
                SIGN IN
              </MenuItem>
            </>
          )}
          <MenuItem onClick={handleCart}>
            <Badge color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
