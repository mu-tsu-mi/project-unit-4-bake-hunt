import { useState } from 'react';

export default function AddToCart({ handleAddToCart }) {
    const [qty, setQty] = useState(1)

    return (
        <>
            <p>cart</p>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleAddToCart(qty)
            }}>
                <input
                    type="number"
                    value={qty}
                    min="1"
                    onChange={(e) => setQty(e.target.value)}>
                </input>
                <button type="submit" >ADD TO CART</button>
            </form>
        </>
    )
}
