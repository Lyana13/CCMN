import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    const navStyle = {
        color: 'red'
    }

    return (
        <nav>
            <h3>hello</h3>
            <ul className="nav-links">
                <Link style={navStyle} to="/picker">
                    <li>picker</li>
                </Link>
                <Link to="/chart">
                    <li>chart</li>
                </Link>
                <Link to="/dwell_chart">
                    <li>dwell_chat</li>
                </Link>
                <Link to="/picker">
                    <li>picker</li>
                </Link>
                <Link to="/analitics">
                    <li>analitics</li>
                </Link>
                <Link to="/content">
                    <li>content</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;