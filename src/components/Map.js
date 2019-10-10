  
import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

class Map extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            kpi: "",
            alalitics: "",
        }
    }
    render(){
        return(
            <div>
                <ButtonGroup  vertical>
                <Button variant="outline-secondary">Active users: </Button>
                <Button variant="outline-secondary">KPI: {this.state.kpi}</Button>
                <Button variant="outline-secondary">Analitics and Presence: {this.state.alalitics}</Button>
            </ButtonGroup>
            </div>
        )
    }
}
export default Map;