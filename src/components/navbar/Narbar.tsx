import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiCheckLogin, apiLogout } from "../../remote/e-commerce-api/authService";

const Container = styled.div`
  height: 60px;
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
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;




const Navbar = () => {

  useEffect(() => {
    const fetchData = async () => {
      const checkLogin = await apiCheckLogin()
      if (checkLogin.payload) {
        setLoggedIn(true)
      }
    }
    fetchData()
  }, [])

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    apiLogout()
    setLoggedIn(false)
    navigate("/")
  }

  const handleCart = () => {
    if(loggedIn) navigate("/cart")
    else navigate("/login")
  }

  return (
    <Container>
      <Wrapper>
        <Left>
        <Logo onClick={() => {navigate('/')}}>Revature Swag Shop</Logo>
        </Left>
        <Right>
          {loggedIn? <MenuItem onClick={handleLogout}>LOG OUT</MenuItem> :
          <>
          <MenuItem onClick={() => {navigate('/register')}}>REGISTER</MenuItem>
          <MenuItem onClick={() => {navigate('/login')}}>SIGN IN</MenuItem></>}
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