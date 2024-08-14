import './AddToCart.css';
import { useState } from 'react';

export default function AddToCart({ handleAddToCart }) {
    const [qty, setQty] = useState(1)

    return (
        <>
            <form name="addToCart" onSubmit={(e) => {
                e.preventDefault();
                handleAddToCart(qty)
            }}>
                <div className='addToCart'>
                    <input
                        name="qty"
                        type="number"
                        value={qty}
                        min="1"
                        onChange={(e) => setQty(Number(e.target.value))}>
                    </input>
                    <button type="submit" className='add-button'>ADD TO CART</button>
                </div>
            </form>
        </>
    )
}
