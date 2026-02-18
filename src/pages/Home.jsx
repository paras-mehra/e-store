// src/pages/Home.jsx
import { useState } from "react";
import products from "../data/products";
import { useNavigate } from "react-router-dom";

const Home = ({ addToCart, search = "" }) => {
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) => {
    const name = product.name || "";

    const matchSearch = name.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category === "All" || product.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <>
      {/* CATEGORY TABS */}
      <div className="categories">
        {["All", "Mobile", "Laptop", "LED"].map((cat) => (
          <button
            key={cat}
            className={category === cat ? "active-tab" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div
            className="card"
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>

            {/* STOP PROPAGATION SO BUTTON DOESN'T TRIGGER NAVIGATION */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
