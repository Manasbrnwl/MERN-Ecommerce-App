import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const navigate = useNavigate();

  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [product?.slug]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getRelatedProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get related products
  const getRelatedProducts = async (pId, cId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/product/related-product/${pId}/${cId}`
      );
      setRelatedProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container p-4">
        <div className="col-md-6">
          <img
            src={`http://localhost:8000/api/product/product-photo/${product._id}`}
            alt={product.name}
            className="card-img-top"
            height={"400px"}
          />
        </div>
        <div className="col-md-6 mt-5">
          <h3>Name : {product?.name}</h3>
          <h4>Price : ₹ {product?.price}</h4>
          <h6>Description : {product?.description}</h6>
          {/* <h6>Category : {product?.category.name}</h6> */}

          <button
            className="btn btn-outline-info"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item added to cart.");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="row p-4">
        <h3>Similar products</h3>
        {relatedProduct.length < 1 && <p>No Similar Product Found</p>}
        {relatedProduct.map((product) => (
          <div className="card m-2" style={{ width: "18rem", height: "28rem" }}>
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
              <div className="d-flex py-1 gap-1">
                <button
                  className="btn btn-outline-dark"
                  onClick={() => {
                    navigate(`/product/${product.slug}`);
                    window.location.reload();
                  }}
                >
                  More Details
                </button>
                <button
                  className="btn btn-outline-info"
                  onClick={() => {
                    setCart([...cart, product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );
                    toast.success("Item added to cart.");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProductDetails;
