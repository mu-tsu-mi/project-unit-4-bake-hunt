import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as bookingsAPI from '../../utilities/booking-api'

export default function CartPage({ user }) {
    const [cart, setCart] = useState(null)

    useEffect(function () {
        async function getCart() {
            const currentCart = await bookingsAPI.getCart(user._id);
            setCart(currentCart);
        }
        getCart();
    }, [user])

    const handleChangeQty = (e, lineItem) => {
        setCart({
            ...cart,
            lineItems: cart.lineItems.map((item) =>
                item._id === lineItem._id ?
                    ({ ...item, qty: e.target.value }) :
                    item
            )
        })        
    }

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
                            {cart.lineItems.map((lineItem) => {
                                return <tr key={lineItem._id}>
                                    <td>{lineItem.cake.cakeName}</td>
                                    <td>${lineItem.cake.unitPrice}</td>
                                    <td><input type='number' value={lineItem.qty} onChange={(e) => handleChangeQty(e, lineItem)} /></td>
                                    <td>${lineItem.extPrice}</td>
                                </tr>
                            })}
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