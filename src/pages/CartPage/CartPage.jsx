import { Navigate } from 'react-router-dom';

export default function CartPage({user}) {
    if (!user) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <h1>Cart page</h1>
        </>
    )
}