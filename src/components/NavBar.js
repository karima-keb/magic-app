import React from "react";
import "./NavBar.css"
import logo from "./../img/logo.svg"

class NavBar extends React.Component {
    render() {
        return <div className="header">
                <img src={logo} width="8%" alt="logo"/>
            </div>;
    }
}

export default NavBar;