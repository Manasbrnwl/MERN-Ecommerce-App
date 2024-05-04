import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");

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

  useEffect(() => {
    getAllCategories();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const { data } = axios.post(
        "http://localhost:8000/api/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Layout title={"Dashboard - Create Product"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="card p-3 border-0 w-75">
                <h1>Create Products</h1>
                <div className="m-1">
                  <Select
                    variant={false}
                    placeholder="Select a category"
                    size="large"
                    className="form-select mb-3"
                    onChange={(value) => {
                      setCategory(value);
                    }}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                  <div className="mb-3">
                    <label className="btn btn-close-secondary  col-md-8 offset-md-2">
                      {photo ? photo.name : "Upload Photo"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                  </div>
                  <div className="mb-3">
                    {photo && (
                      <div className="text-center">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product-photo"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      value={name}
                      placeholder="Write a name of the product"
                      className="form-control mb-2"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <TextArea
                      type="text"
                      value={description}
                      placeholder="Write a description of the product"
                      className="form-control mb-2"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                      type="Number"
                      value={quantity}
                      placeholder="Provide product Quantity"
                      className="form-control mb-2"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <input
                      type="text"
                      value={price}
                      placeholder="Provide product Price"
                      className="form-control mb-2"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <Select
                      variant={false}
                      placeholder="Select shipping"
                      size="middle"
                      className="form-select mb-2"
                      onChange={(value) => {
                        setShipping(value);
                      }}
                    >
                      <Option value="1">Yes</Option>
                      <Option value="0">No</Option>
                    </Select>
                  </div>
                  <div>
                    <button
                      className="btn btn-outline-secondary col-md-8 offset-md-2"
                      onClick={handleCreate}
                    >
                      CREATE PRODUCT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProduct;
