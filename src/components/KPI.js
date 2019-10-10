import React, {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";
import cmxAPI from "./cmxAPI";

class KPI extends Component {
    constructor(props){
        super(props);

        this.state = {
        }
    }
    componentDidMount(){
        this.kpiForThreeDays();
        // this.updateRangeDays("This Month");
    }
    kpiForThreeDays(){
        cmxAPI.kpiSummaryThreeDays(data => {
            console.log("data", data);
        });
    }

    render(){
         return (
            <Container>
                <Row>
                    <Col>
                    test
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default KPI;