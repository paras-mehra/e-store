import React from "react";
import { FaTrash } from "react-icons/fa";

const Cart = ({ cart, increaseQty, decreaseQty, removeItem }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>${item.price}</p>

                <div className="qty-box">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>

              <div className="cart-actions">
                <h4>${item.price * item.quantity}</h4>

                <FaTrash
                  className="remove-icon"
                  onClick={() => removeItem(item.id)}
                />
              </div>
            </div>
          ))}

          <h3 className="total">Total: ${total}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;
