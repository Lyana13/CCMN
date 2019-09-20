import React from "react";
import {Sonnet, Container, Row, Col, Button, Tabs,  Tab, Nav, ButtonGroup,DropdownButton, Dropdown } from "react-bootstrap";
import cmxAPI from "./cmxAPI";
import Select from 'react-select';

import AWS from 'awesome-notifications';


const options = [
    { value: '1st_Floor', label: 'First' },
    { value: '2nd_Floor', label: 'Second' },
    { value: '3rd_Floor', label: 'Third' },
  ];

class Content extends React.Component  {
    state = {
        image: "",
        selectedFloor: { value: '1st_Floor', label: 'First' }
    }
   
    componentDidMount() {
        cmxAPI.getFloorImage(this.state.selectedFloor.value, image => this.setState({ image }));
    }

    handleFloorChange = selectedFloor => {
        cmxAPI.getFloorImage(selectedFloor.value, image => this.setState({ image }));
        this.setState({ selectedFloor });

        addNotification({
            title: 'Welcome',
            message: 'you clicked on the button',
            level: 'success',
            dismissible: true,
            dismissAfter: 3000
          });
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
                <ul class="list-group content-wrap-text">
                <li class="list-group-item list-group-item-action list-group-item-light">Connected: <strong><span id="inner1"></span></strong></li>
                <li class="list-group-item list-group-item-action list-group-item-light">All: <strong><span id="inner2"></span></strong></li>
                <li class="list-group-item list-group-item-action list-group-item-light">Detected: <strong><span id="inner3"></span></strong></li>
                <li class="list-group-item list-group-item-action list-group-item-light">Active users: <strong><span id="inner4"></span></strong></li>
                </ul>
            </Col>
            </Row>
        </Container>
        )
  }
   
}

export default Content;