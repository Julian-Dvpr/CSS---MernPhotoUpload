import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icons/menu.svg";
import Close from "./icons/close.svg";
import { Link } from "react-router-dom";
import axios from "axios";


function Header() {
  const state = useContext(GlobalState);

  const [isLogged] = state.UserAPI.isLogged;
  const [isAdmin] = state.UserAPI.isAdmin;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem("firsLogin");
    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to={"/create_product"}>Create Product</Link>
        </li>
        
      </>
    );
  };
  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to={"/"} onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="" width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to={"/"}>{isAdmin ? "Admin" : "E-commerce"}</Link>
        </h1>
      </div>
      <ul style={styleMenu}>
        <li>
          <Link to={"/"}>{isAdmin ? "Products" : "products"}</Link>
        </li>

        {isAdmin && adminRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to={"/login"}>Login ☺ Register</Link>
          </li>
        )}

        <li onClick={() => setMenu(!menu)}>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>

    
    </header>
  );
}

export default Header;
