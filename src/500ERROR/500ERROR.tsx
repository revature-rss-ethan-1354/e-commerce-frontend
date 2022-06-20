import React from "react";
import styled from "styled-components";


export const ERROR500 = () =>{
    const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #72a4c2;
`;
    const Image = styled.img`
    left: 30%;
    display: flex;
    width: 50%;
    height: 50%;
    z-index: 2;
`;
const Message = styled.div`
  z-index: 5;
  color: red;
  border: 2px solid red;
  display: flex;
  position: absolute;
  font-weight: bold;
  top: 30%;
  font-size: 1.7vw;
  text-align: center;
`;
    return (
        <Container>
            <Message >Error 500: Our servers are momentarily down please visit again soon.</Message>
        <Image
           src = "https://www.pngarts.com/files/3/Turtle-PNG-High-Quality-Image.png"/>
        </Container>
    )
}