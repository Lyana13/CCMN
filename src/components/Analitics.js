import React, {Component} from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Analitics extends Component {
    constructor(props){
        super(props);
        this.state = {
           
        }
    }

    render (){
        return(
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Home">
                dsd
                </Tab>
                <Tab eventKey="profile" title="Profile">
                dsds
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                    dsd
                </Tab>
            </Tabs>
            )
        }
    }
    
export default Analitics;