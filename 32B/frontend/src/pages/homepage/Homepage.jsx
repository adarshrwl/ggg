import React, { useEffect, useState } from "react";
import { getAllProducts, testApi } from "../../apis/Api";
import ProductCard from "../../components/ProductCard";

const Homepage = () => {
  // logic for get products
  const [products, setProducts] = useState([]);

  // Hit API (Get all product) Auto -> useEffect (list of products)
  useEffect(() => {
    getAllProducts()
      .then((res) => {
        // success, message, list of products(products)
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(products);

  return (
    <>
      <div id="carouselExampleCaptions" class="carousel slide">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://i.pinimg.com/564x/43/20/f4/4320f45b6d1b984a3cfd0860627a9839.jpg"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block"></div>
          </div>
          <div class="carousel-item">
            <img
              src="https://i.pinimg.com/736x/f8/b8/fb/f8b8fb2a3a93ea8844530d26928f19b7.jpg"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block"></div>
          </div>
          <div class="carousel-item">
            <img
              src="https://i.pinimg.com/564x/f2/75/cb/f275cbb5125aa0b1a4fb083a70e5e972.jpg"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block"></div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container mt-3">
        <h2>Available Products</h2>

        {/* Dynamic Card - for Specific Product */}

        <div class="row row-cols-1 row-cols-md-4 g-4">
          {products.map((singleProduct) => (
            <div class="col">
              <ProductCard productInformation={singleProduct} color={"green"} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;
