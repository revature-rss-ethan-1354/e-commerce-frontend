export default class Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
    description: string;
    image: string;
    featured: boolean;
    discontinued: boolean;
    category: string;
    cartCount: number;

    constructor (id: number, name: string, quantity: number, description: string, price: number, image: string, featured: boolean, discontinued: boolean, category: string) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.description = description;
        this.price = price;
        this.image = image;
        this.discontinued = discontinued;
        this.featured = featured;
        this.category = category;
        this.cartCount = 0;
    }
}