import React from "react";
import cmxAPI from "./cmxAPI";

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            connected: "",
            detected: "",
            all: ""
        }
    }

    componentDidMount(){
        this.updateConnectedDetecdedNow();
        setInterval(this.updateConnectedDetecdedNow, 5000);
    }

    updateConnectedDetecdedNow = () => {
        cmxAPI.getConnectedDetecdedNow(total => this.setState({
            all: total.totalAll,
            connected: total.totalConnected,
            detected: total.totalDetected
        }));
    }

    render (){
        return (
            <header className="header">
                <h3 className="header__item">Welcome to <span className="highlight">CCMN!</span></h3>
                <div>
                    <p>All: {this.state.all}</p>
                    <p>Detected: {this.state.detected}</p>
                    <p>Connected: {this.state.connected}</p>
                </div>
            </header>   
        )
    }   
}

export default Header;