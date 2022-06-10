import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "../../models/Product";
import { apiGetAllProducts } from "../../remote/e-commerce-api/productService";
import Navbar from "../navbar/Narbar";
import { ProductCard } from "./ProductCard";
import { isValidPriceRange } from "../display-products-validation/PriceRangeValidation";
import { useNavigate } from "react-router-dom";
import "./DisplayProducts.css";
// import Chat from '../chat/Chat';

const Container = styled.div`
  padding: 20px;
  display: inline-flex;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  height: 80vh;
  min-width: 10vh;
  border: 2px solid #b9b9ba;
  padding: 20px;
  border-radius: 10px;
  position: fixed;
`;

const ItemContainer = styled.div`
  width: auto;
  padding: 20px;
  margin-left: 25vh;
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

  // For small bug
  const [checkedAll, setCheckedAll] = useState(true);
  const [checkedClothes, setCheckedClothes] = useState(false);
  const [checkedAccessories, setCheckedAccessories] = useState(false);
  const [checkedElectronics, setCheckedElectronics] = useState(false);

  useEffect(() => {
    //setCheckedAll(true);
    const fetchData = async () => {
      const result = await apiGetAllProducts();
      setProducts(result.payload);
    };
    fetchData();
  }, []);

  //let minPriceRange: number = 0;
  //let maxPriceRange: String = "";

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "category") {
      setCategory(event.target.value);
      if (event.target.value === "clothing") {
        setCheckedClothes(true);
        setCheckedAccessories(false);
        setCheckedElectronics(false);
        setCheckedAll(false);
      } else if (event.target.value === "accessories") {
        setCheckedAccessories(true);
        setCheckedClothes(false);
        setCheckedElectronics(false);
        setCheckedAll(false);
      } else if (event.target.value === "electronics") {
        setCheckedElectronics(true);
        setCheckedClothes(false);
        setCheckedAccessories(false);
        setCheckedAll(false);
      } else if (event.target.value === "") {
        setCheckedAll(true);
        setCheckedElectronics(false);
        setCheckedClothes(false);
        setCheckedAccessories(false);
      }
      console.log("category = " + event.target.value);
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
    setCheckedClothes(false);
    setCheckedAccessories(false);
    setCheckedElectronics(false);
    setCheckedAll(true);
    setFilter("");
    setCategory("");
    setMinimum(0);
    setMaximum(1000000);
  };

  return (
    <React.Fragment>
      <div className="navbar-div">
        <Navbar />
      </div>
      <Container>
        <SearchContainer>
          <form>
            <label className="title">Search Products</label> <br />
            <div className="search">
              <input
                className="search-field"
                type="text"
                name="search-box"
                value={filter}
                placeholder="search"
                onChange={handleInput}
              />
            </div>
            <br />
            <div className="categories">
              <label className="title">Categories</label> <br />
              <label>
                <input
                  className="radio-box"
                  type="radio"
                  name="category"
                  value=""
                  checked={checkedAll}
                  onChange={handleInput}
                />
                All
              </label>{" "}
              <br />
              <label>
                <input
                  className="radio-box"
                  type="radio"
                  name="category"
                  value="clothing"
                  checked={checkedClothes}
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
                  checked={checkedElectronics}
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
                  checked={checkedAccessories}
                  onChange={handleInput}
                />
                Accessories
              </label>
            </div>
            <div>
              <label className="title">Price Range</label> <br />
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
