import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../common/Spinner/Spinner";
import Message from "../common/Message/Message";

import { listOrders } from "../../actions/order";

import "./orderlist.css";

const OrderList = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <div className="order-list-title">Order list</div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className="table-place">
          <table className="table-size">
            <thead className="table-header">
              <tr>
                <th className="table-order-id">Order Id</th>
                <th className="table-user">User</th>
                <th className="table-date">Date</th>
                <th className="table-total-price">Total price</th>
                <th className="table-button"></th>
              </tr>
            </thead>
            <tbody className="table-body">
              {orders.map((order) => (
                <tr className="table-content-row" key={order._id}>
                  <td className="table-order-id-content">{order._id}</td>
                  <td className="table-user-content">
                    {order.user && order.user.name}
                  </td>
                  <td className="table-date-content">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="table-total-price-content">
                    ${order.totalPrice}
                  </td>
                  <td>
                    <Link
                      className="order-list-button"
                      to={`/order/${order._id}`}
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default OrderList;
