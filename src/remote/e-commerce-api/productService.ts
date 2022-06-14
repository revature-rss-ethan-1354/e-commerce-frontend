import Product from "../../models/Product";
import eCommerceClient, { eCommerceApiResponse } from "./eCommerceClient";

const baseURL = "/api/product"

export const apiGetAllProducts = async (): Promise<eCommerceApiResponse> => {
    try{
    const response = await eCommerceClient.get<any>(
        `${baseURL}`
    );
    return { status: response.status, payload: response.data };}catch{ 
        let product:Product = {
            id: 0,
            name: "",
            quantity: 0,
            price: 0,
            description: "",
            image: "",
            featured: false,
            discontinued: false,
            category: "",
            cartCount: 0
         };
         let stuff:Product[]=[product,product];
        return { status: 500, payload: stuff };}
}

export const apiGetProductById = async (id: number): Promise<eCommerceApiResponse> => {
    try {const response = await eCommerceClient.get<any>(
        `${baseURL}/${id}`
    );console.log(response.data,id);
    return { status: response.status, payload: response.data };}catch{ 
        let product:Product = {
            id: 0,
            name: "",
            quantity: 0,
            price: 0,
            description: "",
            image: "",
            featured: false,
            discontinued: false,
            category: "",
            cartCount: 0
         };
         let stuff:Product[]=[product,product];
        return { status: 404, payload: stuff };}
}

export const apiUpsertProduct = async (product: Product): Promise<eCommerceApiResponse> => {
    try{
    const response = await eCommerceClient.put<any>(
        `${baseURL}`,
        product
    );
    return { status: response.status, payload: response.data };}catch{
        return {status : 500, payload: null};
    }
}

export const apiPurchase = async (products: {id: number, quantity: number}[]): Promise<eCommerceApiResponse> => {
    try{
    const response = await eCommerceClient.patch<any>(
        `${baseURL}`,
        products
    );
    return { status: response.status, payload: response.data };
}catch{return {status: 400, payload: null};}
}

export const apiDeleteProduct = async (id: number): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.delete<any>(
        `${baseURL}/${id}`
    );
    return { status: response.status, payload: response.data };
}

export const apiUpdateProduct = async (product: Product): Promise<eCommerceApiResponse> => {
    try{
    const response = await eCommerceClient.put<any>(
        `${baseURL}/update`,
        product
    );
    return {status: response.status, payload: response.data};}catch{
        return {status : 500, payload: null};
    }
}