// src/pages/ProductDetails.jsx

import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div style={{ padding: "60px" }}>
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="details-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="details-info">
        <h2>{product.name}</h2>
        <h3>${product.price}</h3>
        <p>Premium quality product with modern design and advanced features.</p>
        <button onClick={() => addToCart(product)}>Add To Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
