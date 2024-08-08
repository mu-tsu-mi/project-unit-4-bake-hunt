import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      &nbsp;&nbsp;
      { user ?
        <Link to="" onClick={handleLogOut}>Log Out</Link>
       :
       <Link to="/login">Log In</Link>
      }
      &nbsp; | &nbsp;
      <Link to="/orders">Orders</Link>
      &nbsp; | &nbsp;
      <Link to="/cart">Cart</Link>
    </nav>
  );
}