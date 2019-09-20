import React from "react";
import {Container} from "react-bootstrap";

function Header(props) {
    return (
        <Container>
            <header className="header">
        <h3 className="header__item">Welcome to <span className="highlight">CCMN!</span></h3>
        <p className="header__item">Search <input id="header__item_search" /></p>
    </header>
        </Container>
        
    )
}

export default Header;