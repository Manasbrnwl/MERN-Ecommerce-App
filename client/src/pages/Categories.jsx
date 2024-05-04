import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6 offset-md-3 d-flex flex-column gap-3">
            {categories.map((category) => (
              <div key={category._id} className=" btn btn-outline-info">
                <Link
                  to={`/category/${category.slug}`}
                  className="text-decoration-none text-black"
                >
                  {category.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
