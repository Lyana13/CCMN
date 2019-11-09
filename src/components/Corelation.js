import React, {Component} from "react";
import cmxAPI from "./cmxAPI";
import {Pie} from 'react-chartjs-2';
import {Container, Row, Col} from "react-bootstrap";
import chartLib from "./chartLib";


class Corelation extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            sessionDurationData: [],
            numberOfConnectionsData: [],
            passerbyData: []
        }
    }
    
    componentDidMount(){
        this.getSessionDurationData()
        this.getNumberOfConnectionsData();
        this.getPasserbyData();
        //chartLib.aggregateByDayOfWeek(12, cmxAPI.dwellAverage, (data) => this.setState({sessionDurationData: data}))
    }

    
    async getSessionDurationData() {
        let data = {};
        for (let i = 1; i <= 7; i++){
            var start = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - i);
            start = chartLib.dateToString(start);
            let resp = await cmxAPI.dwellAverage(start, start);
            data[start] = resp;
        }
            let sessionDurationData =  this.groupByDaysOfTheWeek(data);
            console.log("sess", sessionDurationData);
            this.setState( {sessionDurationData})
    }
    getPrevWeekDates(){
        let end = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() -1);
        let start = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() -7);
        return [chartLib.dateToString(start), chartLib.dateToString(end)]
    }
    getNumberOfConnectionsData() {
        let [start, end] = this.getPrevWeekDates();
        cmxAPI.dailyVisitors(start, end, data => {
            let numberOfConnectionsData =  this.groupByDaysOfTheWeek(data);
            console.log("sess", numberOfConnectionsData);
            this.setState( {numberOfConnectionsData})
        });   
    }
    getPasserbyData() {
        let [start, end] = this.getPrevWeekDates();
        cmxAPI.dailyPasserby(start, end, data => {
            console.log("data", data);
            let  passerbyData =  this.groupByDaysOfTheWeek(data);
            this.setState( { passerbyData})
        });   
    }

    groupByDaysOfTheWeek(data){
        let array = [];
        data = Object.entries(data);
        data.forEach(e => {
            let dayOfWeek = new Date(e[0]).getDay();
            array[dayOfWeek] = e[1];
        })
        return array;
    }


    render (){
        return (
            <Container>
                <Row>
                    <Col sm={12} lg={6}>
                    <Pie
                        data = {{
                            labels:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                            datasets:[
                                {
                                    data: this.state.sessionDurationData,
                                    backgroundColor:[
                                        'rgba(102,51,153,1)',
                                        'rgba(249, 61, 47, 1)',
                                        'rgba(12,1,103,1)',
                                        'rgba(255, 138, 103, 1)',
                                        'rgba(12,1,103,1)',
                                        'rgba(0, 157, 255, 1)',
                                        'rgba(0, 157, 58, 1)',
                                        'rgba(214, 254, 166, 1)'
                                    ]
                                }
                            ]
                        }}
                        options={{ 
                            title:{
                                display: true,
                                text: 'Correlation between session duration and the day of the week',
                                fontSize: 20,
                            },
                            legend:{
                                display: true,
                                position: 'top'
                            }
                        }}
                    />
                    </Col>
                    <Col sm={12} lg={6}>
                    <Pie
                        data = {{
                            labels:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                            datasets:[
                                {
                                    data: this.state.numberOfConnectionsData,
                                    backgroundColor:[
                                        'rgba(102,51,153,1)',
                                        'rgba(249, 61, 47, 1)',
                                        'rgba(12,1,103,1)',
                                        'rgba(255, 138, 103, 1)',
                                        'rgba(12,1,103,1)',
                                        'rgba(0, 157, 255, 1)',
                                        'rgba(0, 157, 58, 1)',
                                        'rgba(214, 254, 166, 1)'
                                    ]
                                }
                            ]
                        }}
                        options={{ 
                            title:{
                                display: true,
                                text: 'Correlation between number of connections and the day of the week and the day of the week',
                                fontSize: 20,
                            },
                            legend:{
                                display: false,
                                position: 'top'
                            }
                        }}
                    />
                    </Col>
                    <Col sm={12} lg={6}>
                    <Pie
                        data = {{
                            labels:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                            datasets:[
                                {
                                    data: this.state.passerbyData,
                                    backgroundColor:[
                                        'rgba(102,51,153,1)',
                                        'rgba(249, 61, 47, 1)',
                                        'rgba(12,1,103,1)',
                                        'rgba(255, 138, 103, 1)',
                                        'rgba(12,1,103,1)',
                                        'rgba(0, 157, 255, 1)',
                                        'rgba(0, 157, 58, 1)',
                                        'rgba(214, 254, 166, 1)'
                                    ]
                                }
                            ]
                        }}
                        options={{ 
                            title:{
                                display: true,
                                text: 'Correlation between number of passerby and the day of the week',
                                fontSize: 20,
                            },
                            legend:{
                                display: false,
                                position: 'top'
                            }
                        }}
                    />
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Corelation;
