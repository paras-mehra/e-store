import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";

function App() {
  /* ================= LOAD SAVED DATA ================= */

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const [search, setSearch] = useState("");

  /* ================= APPLY THEME ================= */

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme); // save theme
  }, [theme]);

  /* ================= SAVE CART ================= */

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ================= THEME TOGGLE ================= */

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  /* ================= CART LOGIC ================= */

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  /* ================= ROUTES ================= */

  return (
    <Router basename="/e-store">
      <Header
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        search={search}
        setSearch={setSearch}
        toggleTheme={toggleTheme}
        theme={theme}
      />

      <Routes>
        <Route
          path="/"
          element={<Home addToCart={addToCart} search={search} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              removeItem={removeItem}
            />
          }
        />

        <Route
          path="/product/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
