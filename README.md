# E-Commerce Swag Shop 

## Summary Description
The E-Commerce Swag Shop is an e-commerce web application that allows users to search for a variety of goods stored in H2 database. 

## Features

Guest are able to...
  - Create an account and browse through the online catalog. 
  - Chat with admin support about any issues that they encounter during their experience on the web application.
  - They can add items to cart, however they must have an account inorder to make a purchase.

Users are able to...
  - Login to the system and browse the online catalog
  - Add items they wish to purchase and proceed to checkout
  - They can specify the quantity of the item the wish to purchase
  - Connect with admin chat support on the main product page
  - Search through the catalog according to an input field, item category, and price range
  - Display product details

Admin are able to...
  - Login to their account
  - Create a new product listing
  - Open up chatroom, and see customer messages
  - Search through the catalog according to an input field, item category, and price range
  - Update an existing product from the catalog view
  - Set item to discontinued and featured
  - View discontinued items
  - Display product details

The System will...
  - Display a message if the item is out of stock to the user
  - check for input validations in register, login, checkout and information form
  - Diplay 500 error if an internal server error was encountered
  - Display notifications when items are added to cart, items are out of stock, incorrect login, incorrect information entered during checkout

## Todo List
  - Improve reset button responsiveness
  - Don't allow users to login multiple time simultaneously 
  - Store user information and allow users to retrieve it from storage during checkout
  - Implement RDS
  - Create a wishlist
  - Implement password encrpytion 
  - Add additional payment plan option
  - Generate unique order ID for logistical purposes
  - Flexible display across all platforms

# Technologies Used
  Backend Tech
  - Maven -v 4.0
  - Spring Boot
  - Hibernate H2 Database Engine
  - Aspects
  - Lombok Annotations 
  - STOMP 
  - Webjars 
  - Jupiter -v 5.8.2
  - Java -v 1.8.0
  - IntelliJ
  - Mockito
  - MockMVC
  - Spring Boot DevTools
  - Spring Boot Web
  - Sonar Lint

  Frontend Tech
  - React - Typescript
  - React-Redux
  - Conext API
  - Axios
  - Material UI
  - Toastify
  - VS Code

  Cloud Services
  - Jenkins
  - Docker
  - GitHub
  - AWS EC2
  - AWS S3 - Bucket

# Deployment
1. Back-End, Front-End is hosted on Amazon Web Service wth EC2, and S3 bucket respectively

2. Follow the link to the launch page when the EC2 server is up at: http://e-commerce-frontend-p3.s3-website.us-east-2.amazonaws.com/ 

# Usage

Users can view the catalog from the main page
![image](https://user-images.githubusercontent.com/101683611/174679509-2d302047-b693-4ecb-95e3-cac833606b09.png)

search feature
![image](https://user-images.githubusercontent.com/101683611/174679582-862bbd15-7a6c-4e02-a127-68c069839f70.png)

add to cart + prompt
![image](https://user-images.githubusercontent.com/101683611/174679673-8c3a71a3-5d6c-4a3f-87f7-64c6fc717cb2.png)

register account page
![image](https://user-images.githubusercontent.com/101683611/174679717-bcce26c2-ef4b-4958-b23f-c0499623d9f2.png)

Login Page
![image](https://user-images.githubusercontent.com/101683611/174679763-3a9dc189-4867-484d-8206-b92b7db7e06d.png)

Dark Mode
![image](https://user-images.githubusercontent.com/101683611/174679859-857457a8-1f4d-424d-8ee6-3f3a62bbb6e7.png)

cart page
![image](https://user-images.githubusercontent.com/101683611/174679951-e3810fb1-9a97-49f4-a48a-6a9f07b537fb.png)

out of stock and discontinued
![image](https://user-images.githubusercontent.com/101683611/174680127-023e751b-d1de-4087-b2ef-56e3333aeea4.png)

featured items
![image](https://user-images.githubusercontent.com/101683611/174680177-391e29ea-e272-4094-886d-b1f734049a3e.png)

create page
![image](https://user-images.githubusercontent.com/101683611/174680283-e9d10ac6-509c-4b9a-9838-c8f50ee3f93c.png)

Update Page
![image](https://user-images.githubusercontent.com/101683611/174680316-8eb20c40-bfb7-41ca-9a5a-3034c33b8efb.png)

checkout - fill in information
![image](https://user-images.githubusercontent.com/101683611/174680397-d929ec26-1f9c-4c49-b2a5-5d1dc2fd5f2d.png)

payment page
![image](https://user-images.githubusercontent.com/101683611/174680436-ab66f865-97f0-4510-ae9a-dda774085e26.png)

order summary 
![image](https://user-images.githubusercontent.com/101683611/174680512-a191fd8a-ab08-40a7-aa4c-6e142d4b11b2.png)







