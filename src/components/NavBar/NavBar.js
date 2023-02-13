import React from "react";
import { Link } from "react-router-dom";
import * as userService from '../../utilities/users-services'

export default function NavBar({ user, setUser }) {

function handleLogOut() {
    // we should delegate the actual logging out to the users service
    userService.logOut()
    setUser(null)
}

  return (
    <>
      <div className="welcome-message" style={{
        marginTop: "10px",
        marginBottom: "20px"
      }}>
        Welcome, <b>{user.name}</b>!
      </div>
      <nav>
        <Link to="/orders">Order History</Link>
        &nbsp; | &nbsp;
        <Link to="/orders/new">New Order</Link>
        &nbsp; | &nbsp;
        <Link to="" onClick={handleLogOut}>Logout</Link>
      </nav>
    </>
  );
}
