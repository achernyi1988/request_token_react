import React from "react";
import GoogleLoginClient from "./GoogleLoginClient"

const Header = () => {
    return (
        <div className={"ui secondary pointing menu"}>
            <div className={"right menu"}>
                <GoogleLoginClient/>
            </div>
        </div>)
};

export default Header;

