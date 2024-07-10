import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../apis/Api";
import ProductCard from "../../components/ProductCard";
import './PropertyCard.css';
import backgroundImage from './bg.jpg';

const PropertyCard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='properties-container' style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className='container mt-3'>
        <h2>Listed Properties</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {products.map((singleProduct) => (
            <div className="col" key={singleProduct._id}>
              <ProductCard productInformation={singleProduct} color={"green"} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
