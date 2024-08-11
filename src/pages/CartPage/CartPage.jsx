import './CartPage.css';
import { Navigate, Link } from 'react-router-dom';
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
                    ({ ...item, qty: Number(e.target.value) }) :
                    item
            )
        })
    }

    const handleChangePickUpDate = (e) => {
        setCart({
            ...cart,
            pickUpDate: e.target.value
        })
    }

    const handleChangeTimeOfDay = (e) => {
        setCart({
            ...cart,
            timeOfDay: e.target.value
        })
    }

    const handleSubmitChange = async (e) => {
        e.preventDefault();
        const currentCart = await bookingsAPI.updateCart(user._id, cart);
        setCart(currentCart);
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    if (!cart) {
        return <div>No item is in your cart yet</div>
    }
    const initialPickUpDate = cart.pickUpDate.toLocaleString().split('T')[0]

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
                                    <td><Link to={`/cakes/${lineItem.cake.cakeNickname}`} className='cakeLink'>{lineItem.cake.cakeName}</Link></td>
                                    <td>${lineItem.cake.unitPrice}</td>
                                    <td><input type='number' min="1" value={lineItem.qty} onChange={(e) => handleChangeQty(e, lineItem)} /></td>
                                    <td>${lineItem.extPrice}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <button type='submit' onClick={handleSubmitChange}>UPDATE CART</button>
                </div>

                <div className='booking-date'>
                    <div>
                        <label htmlFor="pickUpDate">Pick a date for your pick up date</label>
                        <input id="pickUpDate" type="date" value={initialPickUpDate} onChange={handleChangePickUpDate} />
                    </div>
                    <div>
                        <label htmlFor="timeOfDay">Pick a time for your pick up</label>
                        <select id="timeOfDay" value={cart.timeOfDay} onChange={handleChangeTimeOfDay}>
                            <option>9am - Noon</option>
                            <option>Noon - 3pm</option>
                            <option>3 - 6pm</option>
                        </select>
                    </div>
                </div>

            </div>
        </>
    )
}