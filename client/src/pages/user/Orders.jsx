import React, { useEffect, useState } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <>
      <Layout title={"Dashboard - Orders"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="card p-3 border-0">
                <h1 className="text-center">All Orders</h1>
                {orders.map((order, i) => {
                  return (
                    <div className="shadow rounded rounded-top">
                      <table className="table table-responsive">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Status</th>
                            <th scope="col">Buyer</th>
                            <th scope="col">Date</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <>
                            <tr key={order._id}>
                              <th scope="row">{i + 1}</th>
                              <td>{order?.status}</td>
                              <td>{order?.buyer?.name}</td>
                              <td>{moment(order?.createdAt).fromNow()}</td>
                              <td>
                                {order?.payment.success ? "Success" : "Failed"}
                              </td>
                              <td>{order?.products?.length}</td>
                            </tr>
                          </>
                        </tbody>
                      </table>
                      <div className="d-flex wrap">
                        {order?.products?.map((product) => (
                          <div
                            key={product._id}
                            className="card m-2"
                            style={{ width: "18rem", height: "25rem" }}
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
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Orders;
