# ShopEase

A full-stack **e-commerce web application** built with a **Spring Boot** (Java) backend and an **Angular** frontend. Developed as a series of homework assignments.

## Overview

ShopEase is an online shopping platform that supports product browsing, cart management, order processing, user authentication, and category filtering. The project follows a REST API architecture with a separate Angular SPA frontend.

## Features

- User authentication and authorization (Spring Security)
- Product catalog with category filtering
- Predictive search
- Shopping cart management
- Order placement and order history
- Image upload for products
- REST API backend
- Angular SPA frontend with routing

## Project Structure

```
ShopEase/                        Spring Boot backend
  src/main/java/com/ecommerce/shopease/
      controllers/                 REST controllers
          services/                    Business logic
              models/                      JPA entities
                  repos/                       Spring Data repositories
                      dtos/                        Data Transfer Objects
                          security/                    Spring Security config
                              bean/                        Bean configurations
                                pom.xml                        Maven dependencies

                                shopease-frontend/               Angular frontend
                                  src/app/
                                      product/                     Product listing and details
                                          cart-items/                  Shopping cart
                                              orders/                      Order management
                                                  authentication/              Login and registration
                                                      category/                    Category navigation
                                                          shared/                      Shared components
                                                              interceptor/                 HTTP interceptors

                                                              Shopease_tema*.docx              Assignment documentation
                                                              ```

                                                              ## Technologies

                                                              **Backend:**
                                                              - Java / Spring Boot
                                                              - Spring Security (JWT authentication)
                                                              - Spring Data JPA
                                                              - Maven

                                                              **Frontend:**
                                                              - Angular (TypeScript)
                                                              - HTML / CSS

                                                              ## Setup

                                                              ### Backend

                                                              1. Navigate to the `ShopEase` folder:
                                                                 ```bash
                                                                    cd ShopEase
                                                                       ```

                                                                       2. Build and run with Maven:
                                                                          ```bash
                                                                             mvn spring-boot:run
                                                                                ```

                                                                                The API will be available at `http://localhost:8080`.

                                                                                ### Frontend

                                                                                1. Navigate to the frontend folder:
                                                                                   ```bash
                                                                                      cd shopease-frontend
                                                                                         ```

                                                                                         2. Install dependencies and start:
                                                                                            ```bash
                                                                                               npm install
                                                                                                  ng serve
                                                                                                     ```
                                                                                                     
                                                                                                     The app will be available at `http://localhost:4200`.
