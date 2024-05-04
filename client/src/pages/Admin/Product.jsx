import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  // get all product
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/product/get-product"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"All Products List"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 border-0 d-flex flex-wrap">
              {products?.map((product) => (
                <Link
                  to={`/dashboard/admin/product/${product.slug}`}
                  key={product._id}
                  className="product-link"
                >
                  <div
                    className="card m-2"
                    style={{ width: "18rem", height: "25rem" }}
                  >
                    <img
                      src={`http://localhost:8000/api/product/product-photo/${product._id}`}
                      alt={product.name}
                      className="card-img-top"
                      height={"300px"}
                    />
                    <div className="card-body overflow-hidden">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
