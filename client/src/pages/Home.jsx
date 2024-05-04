import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";

const Home = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  //get all category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting Category");
    }
  };

  // get all product
  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/api/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //get Total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/api/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
    if (!checked || !radio) getProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio) filterProduct();
  }, [checked.length, radio]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/product/filter-product",
        { checked, radio }
      );
      setTotal(data?.total);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="row container-fluid p-2 pt-4">
        <div className="col-md-2 border-end">
          <h3 className="text-start">Filter By Category</h3>
          <div className="d-flex flex-column ms-3 p-2">
            {categories?.map((c) => (
              <Checkbox
                className="mb-1"
                key={c._id}
                onChange={(e) => {
                  handleFilter(e.target.checked, c._id);
                }}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h3 className="text-start">Filter By Price</h3>
          <div className="d-flex flex-column ms-3 p-2">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array} className="mb-1">
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <button
            className="btn btn-outline-danger"
            onClick={() => window.location.reload()}
          >
            RESET FILTER
          </button>
        </div>
        <div className="col-md-10">
          <h3 className="text-center">All Products</h3>
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
          <div className="text-center m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "loading.." : "Load more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
