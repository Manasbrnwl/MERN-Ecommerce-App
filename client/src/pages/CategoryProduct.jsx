import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);
  return (
    <Layout>
      <div className="container">
        <h3 className="text-center mt-3">{category.name}</h3>
        <h6 className="text-center">{products.length} result found</h6>
        <div className="p-2 border-0 d-flex flex-wrap justify-content-center">
          {products?.map((product) => (
            <div
              key={product._id}
              className="card m-2"
              style={{ width: "18rem", height: "28rem" }}
            >
              <img
                src={`http://localhost:8000/api/product/product-photo/${product._id}`}
                alt={product.name}
                className="card-img-top"
              />
              <div className="card-body overflow-hidden">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text overflow-hidden p-0 m-1">
                  {product.description.substring(0, 30)}...
                </p>
                <p className="p-0 m-1">{`₹ ${product.price}`}</p>
                <div className="d-flex justify-content-around pt-1">
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => {
                      navigate(`/product/${product.slug}`);
                    }}
                  >
                    More Details
                  </button>
                  <button className="btn btn-outline-info">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
