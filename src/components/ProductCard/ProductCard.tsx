import React from 'react';
import LazyImage from '../LazyImage/LazyImage';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  delay?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, delay = 0 }) => {
  return (
    <div
      className="product-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="product-img-wrapper">
        <LazyImage
          src={product.image}
          alt={product.title}
          style={{ position: 'absolute', inset: 0 }}
        />
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}
      </div>

      {/* Body */}
      <div className="product-body">
        <div className="product-category">
          <i className="fas fa-tag me-1" style={{ fontSize: '0.65rem' }} />
          {product.category}
        </div>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <div className="product-price">
            ${product.price.toFixed(2)}
            <span>/unit</span>
          </div>
          <button
            className="btn-add-cart"
            aria-label={`Add ${product.title} to cart`}
          >
            <i className="fas fa-shopping-cart" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
