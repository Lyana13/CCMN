import React from "react";
import {Container, Row, Col, Button, Tabs,  Tab, Nav, ButtonGroup,DropdownButton, Dropdown } from "react-bootstrap";
import cmxAPI from "./cmxAPI";
import Select from 'react-select';
import AWN from 'awesome-notifications';
import "awesome-notifications/dist/style.css";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
const options = [
    { value: '1st_Floor', label: 'First' },
    { value: '2nd_Floor', label: 'Second' },
    { value: '3rd_Floor', label: 'Third' },
  ];

class Content extends React.Component  {
  
    constructor(props){
        super(props);

        this.state = {
            image: "",
            selectedFloor: { value: '1st_Floor', label: 'First' },
            clients: [],
            connected: "",
            all: "",
            detected: "",
            activeUser: "",
            kpi: "",
            alalitics: "",
            forecasting: ""
        }
        this.updateTotalConnectedCount = this.updateTotalConnectedCount.bind(this);
        this.updateFloorImage = this.updateFloorImage.bind(this);
    }

    componentDidMount() {
        this.updateFloorImage(this.state.selectedFloor.value);
        this.updateTotalConnectedCount();
        let notifier = new AWN({});
        setInterval(async () => {
            this.updateTotalConnectedCount();
            
            let oldClients = this.state.clients,
                newClients = await cmxAPI.getAllClients();
            this.setState({clients: newClients});
            if (oldClients.length == 0) {
                oldClients = newClients;
            }
            console.log("newww:",newClients);
            var newMacAdresses = this.getNewMacAdresses(oldClients, newClients);
            // console.log("newww",newMacAdresses);
            newMacAdresses.forEach(function(macAddr){
                notifier.info("mac Address: " + macAddr, {});
            });
        }, 1000);
    }
    
    updateTotalConnectedCount() {
        cmxAPI.getTotalConnectedCount(total => this.setState({
            all: total.totalAll,
            connected: total.totalConnected,
            detected: total.totalDetected
        }));
    }

    updateFloorImage(Floor) {
        cmxAPI.getFloorImage(Floor, image => this.setState({ image }));
    }

    macAdressesFromClients(clients) {
        return clients.map(client => client.macAddress);
    }

    getNewMacAdresses(oldClients, updatedClients){
        oldClients = this.macAdressesFromClients(oldClients)
        updatedClients = this.macAdressesFromClients(updatedClients)
        return updatedClients.filter(e => !oldClients.includes(e));
    }

    handleFloorChange = selectedFloor => {
        this.updateFloorImage(selectedFloor.value);
        this.setState({ selectedFloor });
    };
    
    render(){
        return (
            <div >
            <Grid container spacing={2}>
            <Grid item xs={6} sm={9}>
            <div style={{
                backgroundImage: "url(" + this.state.image + ")",
                backgroundSize: 'cover',
                width: 775,
                height: 385,
                position: 'absolute'
            }} id="content__map">
                {
                    this.state.clients.map(client => 
                        <div style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: 'black',
                            position: 'absolute',
                            left: client.mapCoordinate.x / 2 - 5,
                            top: client.mapCoordinate.y / 2 - 5
                        }}>
                        </div>
                    )
                }
            </div>
        </Grid>
        <Grid item xs={6} sm={3}>
        <Select
            value={this.state.selectedFloor}
            onChange={this.handleFloorChange}
            options={options}
        />
        <ul className="list-group content-wrap-text">
            <li className="list-group-item list-group-item-action list-group-item-light">Connected: {this.state.connected}<strong><span id="inner1"></span></strong></li>
            <li className="list-group-item list-group-item-action list-group-item-light">All: {this.state.all}<strong><span id="inner2"></span></strong></li>
            <li className="list-group-item list-group-item-action list-group-item-light">Detected: {this.state.detected}<strong><span id="inner3"></span></strong></li>
            <li className="list-group-item list-group-item-action list-group-item-light">Active users: <strong><span id="inner4"></span></strong></li>
        </ul>
        </Grid> 
    </Grid>
          </div>
 
        //     <ButtonGroup  vertical>
        //             <Button variant="outline-secondary">Active users: {this.state.activeUser}</Button>
        //             <Button variant="outline-secondary">KPI: {this.state.kpi}</Button>
        //             <Button variant="outline-secondary">Analitics and Presence: {this.state.alalitics}</Button>
        //             <Button variant="outline-secondary">Forecasting number of visitors: {this.state.forecasting}</Button>
        //         </ButtonGroup>
        )
    }
}

export default Content;