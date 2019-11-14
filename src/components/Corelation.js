import React, {Component} from "react";
import cmxAPI from "./cmxAPI";
import {Pie} from 'react-chartjs-2';
import {Container, Row, Col} from "react-bootstrap";
import chartLib from "./chartLib";

let chartBackgroundColor = ['rgba(102,51,153,1)',
'rgba(249, 61, 47, 1)',
'rgba(12,1,103,1)',
'rgba(255, 138, 103, 1)',
'#ffc107',
'rgba(0, 157, 255, 1)',
'rgba(0, 157, 58, 1)',
'rgba(214, 254, 166, 1)'];

let percentageTooltip = {
    callbacks: {
        label: function(tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
            var total = meta.total;
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = parseFloat((currentValue/total*100).toFixed(1));
            return currentValue + ' (' + percentage + '%)';
        },
        title: function(tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
        }
    }
};

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
            let sessionDurationData = this.groupByDaysOfTheWeek(data).map(num => num.toPrecision(3));
            console.log("sess", sessionDurationData);
            this.setState({sessionDurationData})
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
            <Container className="chart_wrap">
                <Col sm={4} lg={4}>
                    <Pie
                        data = {{
                            labels:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                            datasets:[
                                {
                                    data: this.state.sessionDurationData,
                                    backgroundColor: chartBackgroundColor
                                }
                            ]
                        }}
                        options={{ 
                            title:{
                                display: true,
                                text: 'Session duration correlation',
                                fontSize: 20,
                            },
                            legend:{
                                display: true,
                                position: 'right'
                            }
                        }}
                    />
                    </Col>
                    <Col sm={4} lg={4}>
                    <Pie
                        data = {{
                            labels:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                            datasets:[
                                {
                                    data: this.state.numberOfConnectionsData,
                                    backgroundColor:chartBackgroundColor
                                }
                            ]
                        }}
                        options={{ 
                            title:{
                                display: true,
                                text: 'Number of connections correlation',
                                fontSize: 20,
                            },
                            legend:{
                                display: false,
                                position: 'top'
                            },
                            tooltips: percentageTooltip
                        }}
                    />
                    </Col>
                    <Col sm={4} lg={4}>
                    <Pie
                        data = {{
                            labels:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                            datasets:[
                                {
                                    data: this.state.passerbyData,
                                    backgroundColor:chartBackgroundColor
                                }
                            ]
                        }}
                        options={{ 
                            title:{
                                display: true,
                                text: 'Passerby Correlation',
                                fontSize: 20,
                            },
                            legend:{
                                display: false,
                                position: 'left'
                            },
                            tooltips: percentageTooltip
                        }}
                    />
                    </Col>

            </Container>
        )
    }
}

export default Corelation;
