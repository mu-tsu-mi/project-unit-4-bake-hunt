import './CartPage.css';
import { Navigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as bookingsAPI from '../../utilities/booking-api'

export default function CartPage({ user }) {
    const [cart, setCart] = useState(null)
    const [err, setErr] = useState('')

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
        setErr('')
        try {
            const currentCart = await bookingsAPI.updateCart(user._id, cart);
            setCart(currentCart);
        } catch (err) {
            setErr(err.message)
        }
    }

    const handleSubmitCancel = async (e) => {
        e.preventDefault();
        const clearCart = await bookingsAPI.clearCart(user._id);
        setCart(clearCart);
    }

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        const currentCart = await bookingsAPI.checkoutCart(user._id, cart);
        setCart(currentCart);
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    if (!cart) {
        return <div className="no-item-msg"><h3>No item is in your cart now</h3></div>
    }

    const initialPickUpDate = cart.pickUpDate.toLocaleString().split('T')[0]

    return (
        <>
            <h1>Your Cart</h1>
            <div className='cart'>
                <div className='cart-contents'>
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
                            {cart.lineItems.map((lineItem) => {
                                return <tr key={lineItem._id}>
                                    <td><Link to={`/cakes/${lineItem.cake.cakeNickname}`}>{lineItem.cake.cakeName}</Link></td>
                                    <td>${lineItem.cake.unitPrice}</td>
                                    <td><input name={lineItem.qty} type='number' min="0" value={lineItem.qty} onChange={(e) => handleChangeQty(e, lineItem)} /></td>
                                    <td>${lineItem.extPrice}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <div className='cart-total'>
                        <span>
                        <button type='submit' onClick={handleSubmitChange}>UPDATE CART</button>
                        <button id="clear-cart" type="submit" onClick={handleSubmitCancel}>CLEAR CART</button>
                        {err && <p className="error-message">{err}</p>}
                        </span>
                        <span className="grand-total">Total: ${cart.cartTotal}</span>
                    </div>
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
                    <button type='submit' onClick={handleSubmitOrder}>BOOK</button>
                </div>

            </div>
        </>
    )
}