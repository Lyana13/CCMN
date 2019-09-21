import React from "react";
import {Sonnet, Container, Row, Col, Button, Tabs,  Tab, Nav, ButtonGroup,DropdownButton, Dropdown } from "react-bootstrap";
import cmxAPI from "./cmxAPI";
import Select from 'react-select';
import AWN from 'awesome-notifications';
import "awesome-notifications/dist/style.css";

const options = [
    { value: '1st_Floor', label: 'First' },
    { value: '2nd_Floor', label: 'Second' },
    { value: '3rd_Floor', label: 'Third' },
  ];

class Content extends React.Component  {
    state = {
        image: "",
        selectedFloor: { value: '1st_Floor', label: 'First' },
        clients: [],
        connected: "",
        all: "",
        detected: ""
    }
   
    componentDidMount() {
        cmxAPI.getFloorImage(this.state.selectedFloor.value, image => this.setState({ image }));
        let notifier = new AWN({});
        setInterval(async () => {
            let oldClients = this.state.clients,
                newClients = await cmxAPI.getAllClients();
            this.setState({clients: newClients});
            if (oldClients.length == 0) {
                oldClients = newClients;
            }
            // console.log("newww:",newClients, "old", oldClients);
            var newMacAdresses = this.getNewMacAdresses(oldClients, newClients);
            // console.log("newww",newMacAdresses);
            newMacAdresses.forEach(function(macAddr){
                notifier.info("mac Address: " + macAddr, {});
            });
        }, 1000);
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
        cmxAPI.getFloorImage(selectedFloor.value, image => this.setState({ image }));
        this.setState({ selectedFloor });
    };

  render(){
    return (
        
        <Container>
            <Row className="content">
            <Col>
            <img  id="content__map" src={this.state.image} width="100%" />
            </Col>
            <Col>

            <Select
                    value={this.state.selectedFloor}
                    onChange={this.handleFloorChange}
                    options={options}
                />
            <ButtonGroup  vertical>
                {/* <DropdownButton  variant="outline-secondary" as={ButtonGroup} title="Maps" id="bg-vertical-dropdown-1">
                    <Dropdown.Item eventKey="1">1st_Floor</Dropdown.Item>
                    <Dropdown.Item eventKey="2">2nd_Floor</Dropdown.Item>
                    <Dropdown.Item eventKey="3">3rd_Floor</Dropdown.Item>
                </DropdownButton> */}
                <Button variant="outline-secondary">Active users</Button>
                <Button variant="outline-secondary">KPI</Button>
                <Button variant="outline-secondary">Analitics and Presence</Button>
                <Button variant="outline-secondary">Forecasting number of visitors</Button>
            </ButtonGroup>
            </Col>
            </Row>
            <Row>
            <Col>
                <ul className="list-group content-wrap-text">
                <li className="list-group-item list-group-item-action list-group-item-light">Connected: {this.state.connected}<strong><span id="inner1"></span></strong></li>
                <li className="list-group-item list-group-item-action list-group-item-light">All: {this.state.all}<strong><span id="inner2"></span></strong></li>
                <li className="list-group-item list-group-item-action list-group-item-light">Detected: {this.state.detected}<strong><span id="inner3"></span></strong></li>
                <li className="list-group-item list-group-item-action list-group-item-light">Active users: <strong><span id="inner4"></span></strong></li>
                </ul>
            </Col>
            </Row>
        </Container>
        )
  }
   
}

export default Content;