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
                    <div>Cake Name

                    </div>
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