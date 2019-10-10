import React, {Component} from "react";
import cmxAPI from "./cmxAPI";
import { Card} from "react-bootstrap";

class Active extends Component  {
  
    constructor(props){
        super(props);

        this.state = {
            activeUser: ""
        }
    }
    componentDidMount() {
        this.sit();
    }
    

    sit(){
        cmxAPI.getActiveClients(cb => this.setState({
            activeUser: cb.data
        }));
    }
    render(){
        return(
            <Card.Body>
                <li className="list-group-item list-group-item-action list-group-item-light">
                Active users: <span className="highlight">{this.state.activeUser}</span><strong><span id="inner4"></span></strong>
                </li>
            </Card.Body>
        )
    }
}

export default Active;