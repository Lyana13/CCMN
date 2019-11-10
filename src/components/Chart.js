import React, {Component} from "react";
import cmxAPI from "./cmxAPI";
import {Bar, Pie} from 'react-chartjs-2';
import {Container, Row, Col} from "react-bootstrap";

class Chart extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartData:[],
            chartLabels: []
        }
    }

    componentDidMount(){
        this.forcasting(4);
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'bottom',
        location:'City'
    }

    dateToString(date){
        let day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear();
        return year + "-" + month + "-" + day;
    }

    generateChartData(map){
        let now = new Date();
        let labels = [];
        let data = [];
        for(let i = 1; i <= 7; i++){
            let date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
            labels.push(this.dateToString(date));
            let dayOfWeek = date.getDay();
            let connectedCount = map.get(dayOfWeek);
            data.push(connectedCount);
        }
        return [labels, data]; 
    }

    forcasting(weeks) {
        let days = weeks * 7;
        let now = new Date();
        let endDate = this.dateToString(now);
        let startDate = this.dateToString(new Date(now.getFullYear(), now.getMonth(), now.getDate() - days));
        cmxAPI.getDailyConnectedCount(startDate, endDate, data => {
            let map = new Map();
            data = Object.entries(data);
            data.forEach(e => {
                let dayOfWeek = new Date(e[0]).getDay();
                console.log("tut",dayOfWeek, e[1])
                let value = map.get(dayOfWeek) || 0;
                value += e[1];
                map.set(dayOfWeek, value);
            })
            let map2 = new Map();
            map.forEach((value, key) => map2.set(key, Math.round(value / weeks)));
            let [chartLabels, chartData] = this.generateChartData(map2);
            // console.log("map",map, map2);
            this.setState( {chartData, chartLabels} )
        });
    }

    render (){
        return (
            <Container >
                <Row className="chart">
                    <Col sm={12} lg={12}>
                    <Bar
                        data = {{
                            labels: this.state.chartLabels,
                            datasets:[
                                {
                                    label:'Number of visitors',
                                    data: this.state.chartData,
                                    backgroundColor:[
                                        'rgba(102,51,153,1)',
                                        'rgba(102,51,153,1)',
                                        'rgba(102,51,153,1)',
                                        'rgba(102,51,153,1)',
                                        'rgba(102,51,153,1)',
                                        'rgba(102,51,153,1)',
                                        'rgba(102,51,153,1)'
                                    ]
                                }
                            ]
                        }}
                        options={{ 
                            title:{
                                display:this.props.displayTitle,
                                text: 'Forecasting number of visitors for next 7 days',
                                fontSize: 20,
                            },
                            legend:{
                                display:this.props.displayLegend,
                                position:this.props.legendPosition
                            }
                        }}
                    />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Chart;

