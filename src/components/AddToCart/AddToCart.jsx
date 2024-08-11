import './AddToCart.css';
import { useState } from 'react';

export default function AddToCart({ handleAddToCart }) {
    const [qty, setQty] = useState(1)

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleAddToCart(qty)
            }}>
                <div className='addToCart'>
                    <input
                        type="number"
                        value={qty}
                        min="1"
                        onChange={(e) => setQty(e.target.value)}>
                    </input>
                    <button type="submit" className='add-button'>ADD TO CART</button>
                </div>
            </form>
        </>
    )
}
