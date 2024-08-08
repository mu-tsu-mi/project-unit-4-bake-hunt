import { checkToken } from '../../utilities/users-service';
import { Navigate } from 'react-router-dom';

export default function OrdersPage({user}) {

  async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate);
  }

  if (!user) {
    return <Navigate to="/login" />
  }
  
  return (
    <>
      <h1>OrdersPage</h1>
      <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
  );
}