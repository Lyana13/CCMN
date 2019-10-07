import React from 'react';
import { Link } from 'react-router-dom';
import { Container} from "@material-ui/core";
import Box from '@material-ui/core/Box';



function Nav() {
    const navStyle = {
        color: 'white',
    }


    return (
        <Container>
            <Box width="100%" display="flex" justifyContent="space-around">
            <Box p={1} bgcolor="secondary.main">
            <Link style={navStyle} to="/chart">
                <strong>Forcasting</strong>
            </Link>
            </Box>
                <Box p={1} bgcolor="grey.300">
                <Link style={navStyle} to="/dwell_chart">
                    <strong>dwell_chat</strong>
                </Link>
                </Box>
                <Box p={1}  bgcolor="secondary.main">
                <Link style={navStyle} to="/analitics">
                    <strong>analitics</strong>
                </Link>
                </Box>
                <Box p={1} bgcolor="grey.300">
                <Link style={navStyle} to="/content">
                    <strong>content</strong>
                </Link>
                </Box>
            </Box>  
        </Container>
    );
}

export default Nav;