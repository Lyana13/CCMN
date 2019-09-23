import React from "react";

function Header(props) {
    return (
            <header className="header">
        <h3 className="header__item">Welcome to <span className="highlight">CCMN!</span></h3>
        <p className="header__item">Search <input id="header__item_search" /></p>

    </header>   
    )
}

export default Header;