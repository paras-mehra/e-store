import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  return (
    <div className="card" key={product.id}>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>

      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
