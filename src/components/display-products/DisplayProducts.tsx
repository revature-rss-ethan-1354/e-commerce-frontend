import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Product from '../../models/Product';
import { apiGetAllProducts } from '../../remote/e-commerce-api/productService';
import Navbar from '../navbar/Narbar';
import { ProductCard } from "./ProductCard";
import Chat from '../chat/Chat';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    
    justify-content: space-between;
`;

const SearchContainer = styled.div`
    height: 100vh;
    width: 20vh;
    border: 2px solid black;
`;

const ItemContainer = styled.div`
    width: 80vh;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const DisplayProducts = () => {

  const [products, setProducts] = useState<Product[]>([])
  const [searchInput, setSearchInput] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [category, setCategory] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await apiGetAllProducts()
      setProducts(result.payload)
    }
    fetchData()
  }, [])


  const handleInput = (event:React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.name === "category"){
      setCategory(event.target.value)
      console.log("category = "+ category);
    }
    else {
      setFilter(event.target.value);
      setSearchInput(event.target.value);
      console.log("search input = " + searchInput);
    }

  }
  
  const handleSearch=async (event: React.MouseEvent<HTMLButtonElement>) => {
    
  }


  return (
    <React.Fragment>
        <Navbar/>
        <Container>
        <SearchContainer>
          <form>
            <input className="search-field" type="text" name="search-box" value={searchInput} onChange={handleInput}/>
            <label><input className="radio-box" type="radio" name="category" value="clothes"  onChange={handleInput}/>
            Clothes
            </label>
            <label><input className="radio-box" type="radio" name="category" value="electronics"  onChange={handleInput}/>
            Electronics
            </label>
            <label><input className="radio-box" type="radio" name="category" value="accessories"  onChange={handleInput}/>
            Accessories
            </label>
          </form> 
        </SearchContainer>
        <ItemContainer>
        {products.map((item: Product) => (
          (item.featured && (item.name.toLowerCase().includes(filter.toLowerCase()) || item.description.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))) ? 
             <ProductCard product={item} key={item.id} />: <></>
        ))}
        {products.map((item: Product) => (
          (!item.featured && (item.name.toLowerCase().includes(filter.toLowerCase()) || item.description.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))) ? 
             <ProductCard product={item} key={item.id} />: <></>
        ))}
        </ItemContainer>
        </Container>
        <Chat/>
    </React.Fragment>
    
  );
};