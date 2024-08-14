import './OrdersPage.css';
import { Navigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as bookingsAPI from '../../utilities/booking-api'

export default function OrdersPage({ user }) {
  const [orders, setOrders] = useState(null);

  useEffect(function () {
    async function getOrders() {
      const allOrders = await bookingsAPI.getOrders(user._id);
      setOrders(allOrders);
    }
    getOrders();
  }, [user])
  
  if (!user) {
    return <Navigate to="/login" />
  }

  if (!orders || orders.length === 0) {
    return <div className="no-item-msg">It seems there is no order made yet</div>
  }

  return (
    <>
      <h1>Your Orders</h1>
      {orders.map((order) => {
        return <div key={order._id} className="order-contents">
          <span className="item">Pick up date: {order.pickUpDate.toLocaleString().split('T')[0]}</span>
          <span className="item">Pick up time: {order.timeOfDay}</span>
          <span className="item">Total: ${order.cartTotal}</span>
          <table className="lineitem-table">
            <thead>
              <tr>
                <th>Cake Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.lineItems.map((lineItem) => {
                return <tr key={lineItem._id}>
                  <td><Link to={`/cakes/${lineItem.cake.cakeNickname}`}>{lineItem.cake.cakeName}</Link></td>
                  <td>${lineItem.cake.unitPrice}</td>
                  <td>{lineItem.qty}</td>
                  <td>${lineItem.extPrice}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      })}
    </>
  );
}