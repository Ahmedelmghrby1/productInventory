import { Router } from "express";
import { check } from "express-validator";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import {  addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "./product.controller.js";


const productRouter = Router();

productRouter
.route('/')
.post(protectedRoutes,allowedTo("admin"),[
    check("name", "Name is required").not().isEmpty(),
    check("category").optional().isString(),
    check("price", "Price must be a positive number").isFloat({ min: 0 }),
    check("quantity", "Quantity must be a non-negative integer").isInt({ min: 0 }),
  ],addProduct)
.get(getProducts)

productRouter
.route('/:id')
.get(getProductById)
.put(protectedRoutes,allowedTo("admin"),[
  check("name", "Name is required").not().isEmpty(),
  check("category").optional().isString(),
  check("price", "Price must be a positive number").isFloat({ min: 0 }),
  check("quantity", "Quantity must be a non-negative integer").isInt({ min: 0 }),
],updateProduct)
.delete(protectedRoutes,allowedTo("admin"),deleteProduct)

export default productRouter
