import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1 ? (
              "No Products Found"
            ) : (
              <div className="p-2 border-0 d-flex justify-content-center mt-4">
                {values?.results.map((product) => (
                  <Link
                    to={`/dashboard/admin/product/${product.slug}`}
                    key={product._id}
                    className="product-link"
                  >
                    <div
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
                          <button className="btn btn-outline-dark">
                            More Details
                          </button>
                          <button className="btn btn-outline-info">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </h6>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
