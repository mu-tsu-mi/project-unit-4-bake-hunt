import './NavBar.css';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <div className="header">
      <Link to="/">
      <span className="logo">
        <span>B&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;H</span>
      </span>
      </Link>
      <nav>
        <Link to="/">Home</Link>
        &nbsp; | &nbsp;
        {user ?
          <>
            <Link to="" onClick={handleLogOut}>Log Out</Link>
            &nbsp; | &nbsp;
            <Link to="/orders">Orders</Link>
            &nbsp; | &nbsp;
            <Link to="/cart">Cart</Link>
          </>
          :
          <Link to="/login">Log In</Link>
        }
      </nav>
    </div>
  );
}