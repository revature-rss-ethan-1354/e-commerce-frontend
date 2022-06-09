import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "../../models/Product";
import { apiGetAllProducts } from "../../remote/e-commerce-api/productService";
import Navbar from "../navbar/Narbar";
import { ProductCard } from "./ProductCard";
import { isValidPriceRange } from "../display-products-validation/PriceRangeValidation";
import { useNavigate } from "react-router-dom";
// import Chat from '../chat/Chat';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;

  justify-content: space-between;
`;

const SearchContainer = styled.div`
  height: 100vh;
  width: fit-content;
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
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [minimum, setMinimum] = useState<number>(0);
  const [maximum, setMaximum] = useState<number>(1000000);

  useEffect(() => {
    const fetchData = async () => {
      const result = await apiGetAllProducts();
      setProducts(result.payload);
    };
    fetchData();
  }, []);

  let minPriceRange: number = 0;
  let maxPriceRange: String = "";

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "category") {
      setCategory(event.target.value);
      console.log("category = " + category);
    } else if (event.target.name === "min-price") {
      setMinimum(Number(event.target.value));
      console.log("minimum price = " + minimum);
    } else if (event.target.name === "max-price") {
      if (Number(event.target.value) === 0) {
        setMaximum(1000000);
      } else {
        setMaximum(Number(event.target.value));
        console.log("maximum price = " + maximum);
      }
    } else {
      setFilter(event.target.value);
    }
  };

  const clearFilters = () => {
    setFilter("");
    setCategory("");
    setMinimum(0);
    setMaximum(1000000);
  };

  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <SearchContainer>
          <form>
            <label>Search Products</label> <br />
            <input
              className="search-field"
              type="text"
              name="search-box"
              value={filter}
              placeholder="search"
              onChange={handleInput}
            />
            <br />
            <label>Categories</label> <br />
            <label>
              <input
                className="radio-box"
                type="radio"
                name="category"
                value="clothing"
                onChange={handleInput}
              />
              Clothes
            </label>{" "}
            <br />
            <label>
              <input
                className="radio-box"
                type="radio"
                name="category"
                value="electronics"
                onChange={handleInput}
              />
              Electronics
            </label>{" "}
            <br />
            <label>
              <input
                className="radio-box"
                type="radio"
                name="category"
                value="accessories"
                onChange={handleInput}
              />
              Accessories
            </label>
            <div>
              <label>Price Range</label> <br />
              <input
                className="price-range"
                type="text"
                name="min-price"
                placeholder="minimum"
                maxLength={5}
                onChange={handleInput}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <br />
              <input
                className="price-range"
                type="text"
                name="max-price"
                placeholder="maximum"
                maxLength={5}
                onChange={handleInput}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </div>
            <input
              type="reset"
              value="Reset"
              onClick={clearFilters}
              className="reset-btn"
            ></input>
          </form>
        </SearchContainer>
        <ItemContainer>
          {products.map((item: Product) =>
            item.featured &&
            (item.name.toLowerCase().includes(filter.toLowerCase()) ||
              item.description
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase())) &&
            (item.category === category || category === "") &&
            item.price <= maximum &&
            item.price >= minimum ? (
              <ProductCard product={item} key={item.id} />
            ) : (
              <></>
            )
          )}
          {products.map((item: Product) =>
            !item.featured &&
            (item.name.toLowerCase().includes(filter.toLowerCase()) ||
              item.description
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase())) &&
            (item.category === category || category === "") &&
            item.price <= maximum &&
            item.price >= minimum ? (
              <ProductCard product={item} key={item.id} />
            ) : (
              <></>
            )
          )}
        </ItemContainer>
      </Container>
      {/*<Chat/>*/}
    </React.Fragment>
  );
};
