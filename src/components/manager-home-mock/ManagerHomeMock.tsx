import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Product from "../../models/Product";
import { apiGetAllProducts, apiGetProductById } from "../../remote/e-commerce-api/productService";
import CreateProduct from "../create-product/CreateProduct";
import { ProductCard } from "../display-products/ProductCard";
import UpdateProduct from "../update-product/UpdateProduct";


export const ManagerHomeMock = () => {
//  let thingOne : Product = {
//         id:0,
//         name:"",
//         quantity:0,
//         price:0,
//         description:'',
//         image:'',
//         featured:false,
//         discontinued:false,
//         category:''
//       }
    // const [item, setThing] = useState<Product>(thingOne);
    const [products, setProducts] = useState<Product[]>([])
      const [id, setId]= useState<number>(0)
    useEffect(() => {
        const fetchData = async () => {
          const result = await apiGetAllProducts()
          setProducts(result.payload)
        }
        fetchData()
    //     const fetchIdData = async () => {
    //         const result = await apiGetProductById(id)
    //   setThing(result.payload);}
    //     fetchIdData()
      }, [])

      const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
          console.log(event.currentTarget.value)
        if (event.currentTarget.name == "stuff") {
           setId(Number(event.currentTarget.value))
          
        }
      
      }

      const handleProduct = ( p:Product) => {
        console.log(p.name)
        
      }
    
    
     

    return (
        <>
            <CreateProduct/>
            
              
            <select
                    name="stuff"
                    id="stuff"
                    onChange = {handleChange}
                    >
                      <option selected></option>
                {products?
                products.map((thing: Product) => (
             <option key={thing.id} value={thing.id} onChange={()=>handleProduct(thing)} >{thing.name}</option> 
        )) : <option></option>}
        </select>
        
                   
        {id? <UpdateProduct/> : <></> }
        {/* {item?
        <>
            <h4>{item.name}</h4>
                <h6>{item.description}</h6>
             <ProductCard product={item} key={item.id} />
        </>: <></>} */}

            
        </>
    )
}