import React from 'react';
import './ProductCard.css';
const ProductCard = ({product}) => {
    return (
        <div className="gallary">
            <div className="content">
                <img src={product.image} alt="" />
                <h5>{product.title}</h5>
                <h3>$ {product.price}</h3>
                <h6>{product.category}</h6>
            </div>
        </div>
    );
};

export default ProductCard;