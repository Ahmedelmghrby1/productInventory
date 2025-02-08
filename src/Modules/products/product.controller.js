import { Product } from "../../../Database/Models/product.model.js";

const cache = {}; // Simple in-memory cache

// Add a new product
const addProduct = async (req, res) => {
  const { name, category, price, quantity } = req.body;
  try {
    const product = new Product({ name, category, price, quantity });
    await product.save();

    // Clear the cache for products
    for (const key in cache) {
      if (key.startsWith("products:")) {
        delete cache[key];
      }
    }

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products with pagination and optional category filtering
const getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const category = req.query.category;

  const cacheKey = `products:${page}:${limit}:${category || "all"}`;

  // Check if the data is in cache
  if (cache[cacheKey]) {
    console.log("Serving from cache");
    return res.json(cache[cacheKey]);
  }

  const skip = (page - 1) * limit;
  const query = category ? { category } : {};

  try {
    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await Product.countDocuments(query);

    const response = {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      products,
    };

    // Store the result in cache
    cache[cacheKey] = response;

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Clear the cache for products
    for (const key in cache) {
      if (key.startsWith("products:")) {
        delete cache[key];
      }
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Clear the cache for products
    for (const key in cache) {
      if (key.startsWith("products:")) {
        delete cache[key];
      }
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
