import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";

const Header = ({ cartCount, search, setSearch, toggleTheme, theme }) => {
  return (
    <div className="header">
      <Link to="/" className="logo">
        E-Store ⚡
      </Link>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="header-right">
        {/* THEME TOGGLE */}
        <div className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? (
            <>
              <FaSun className="icon sun" />
              <span>Light</span>
            </>
          ) : (
            <>
              <FaMoon className="icon moon" />
              <span>Dark</span>
            </>
          )}
        </div>

        {/* CART */}
        <Link to="/cart" className="cart">
          <FaShoppingCart />
          <span className="badge">{cartCount}</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
