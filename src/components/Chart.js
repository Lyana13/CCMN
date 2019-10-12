import React, {Component} from "react";
import cmxAPI from "./cmxAPI";
import {Bar, Pie} from 'react-chartjs-2';
import {Container, Row, Col} from "react-bootstrap";

class Chart extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartData:[],
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

    forcasting(weeks) {
        let days = weeks * 7;
        let endDate = new Date();
        let startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        startDate = this.dateToString(startDate);
        endDate = this.dateToString(endDate);
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
            // console.log("map",map, map2);
            this.setState( {chartData: [map2.get(0), map2.get(1), map2.get(2), map2.get(3), map2.get(4), map2.get(5), map2.get(6)]} )
        });
    }

    render (){
        return (
            <Container >
                <Row>
            <Col item  sm={12} lg={6}>
            <Bar
                data = {{
                    labels:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
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
                        text: 'Forecasting number of visitors for next week',
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

