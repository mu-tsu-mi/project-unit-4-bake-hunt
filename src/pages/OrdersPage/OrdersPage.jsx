import { Navigate } from 'react-router-dom';
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

  if (!orders) {
    return <div>It seems there is no order made yet</div>
  }

  return (
    <>
      <h1>Your Orders</h1>
      <div className="order-list">
        {orders.map((order) => {
          return <div key={order._id} className='order-card'>
            <span>Pick up date: {order.pickUpDate.toLocaleString().split('T')[0]}</span>
            <span>Pick up time: {order.timeOfDay}</span>
            {order.lineItems.map((lineItem) => {
              return <div key={lineItem._id} className='lineitem'>
                <span>Cake: {lineItem.cake.cakeName}</span>
                <span>Quantity: {lineItem.qty}</span>
                </div>
            })}
          </div>
        })}
      </div>
    </>
  );
}