import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as bookingsAPI from '../../utilities/booking-api'

export default function CartPage({user}) {
    const [cart, setCart] = useState(null)
    
    useEffect(function () {
        async function getCart() {
          const currentCart = await bookingsAPI.getCart(user._id);
          setCart(currentCart);
        }
        getCart();
      }, [user])
    

    if (!user) {
        return <Navigate to="/login" />
    }

    if (!cart) {
        return <div>No item is in your cart yet</div>
    }

    return (
        <>
            <div>
                <div className='cart-contents'>
                    <table>
                        <thead>
                            <tr>
                                <th>Cake Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.lineItems.map((lineitem) => { return <tr key={lineitem._id}>
                                <td>{lineitem.cake.cakeName}</td>
                                <td>{lineitem.cake.unitPrice}</td>
                                <td>{lineitem.qty}</td>
                                <td>{lineitem.extPrice}</td>
                            </tr>})}
                        </tbody>
                    </table>
                    
                    <button>UPDATE CART</button>
                </div>

                <div className='booking-date'>
                    <div>Calendar</div>
                    <div>Time Selector</div>
                </div>
            
            </div>
        </>
    )
}