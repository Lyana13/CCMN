import React, {Component} from "react";
import cmxAPI from "./cmxAPI";
import {Bar, Pie, Line} from 'react-chartjs-2';
import {Container, Row, Col} from "react-bootstrap";

class Chart extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartData:[]  
        }
    }

    componentDidMount(){
        this.forcasting(4);
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
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
        //console.log("star", startDate, "end", endDate);
        cmxAPI.getDailyConnectedCount(startDate, endDate, data => {
            let map = new Map();
            data = Object.entries(data);
            data.forEach(e => {
                let dayOfWeek = new Date(e[0]).getDay();
                //console.log(dayOfWeek, e[1])
                let value = map.get(dayOfWeek) || 0;
                //if(value == undefined){
                //    value = 0;
                //}
                value += e[1];
                map.set(dayOfWeek, value);
            })
            // map = map.entries().map(e => console.log(e));
            let map2 = new Map();
            map.forEach((value, key) => map2.set(key, Math.round(value / weeks)));

            //onsole.log("getDailyConnectedCount", data)
            console.log("map",map, map2);
        
        });
    }

    render (){
        return (
            <Container>
                <Row>
                    {/* <Col item sm={6} lg={6}>
                <Pie
                data={this.state.chartData}
                options={{ 
                    title:{
                        display:this.props.displayTitle,
                        text: 'Correlation between visitors and device manufactures',
                        fontSize: 25
                    },
                    legend:{
                        display:this.props.displayLegend,
                        position:this.props.legendPosition
                    }
                }}
            />
            </Col>
            <Col item sm={6} lg={6}>
            <Line
                data={this.state.chartData}
                options={{ 
                    title:{
                        display:this.props.displayTitle,
                        text: 'Forecasting number of visitors(7 days)',
                        fontSize: 25
                    },
                    legend:{
                        display:this.props.displayLegend,
                        position:this.props.legendPosition
                    }
                }}
            />
            </Col> */}
            <Col item  sm={6} lg={6}>
            <Bar
                data = {{
                    labels:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    datasets:[
                        {
                            label:'Population',
                            data: this.state.chartData,
                            backgroundColor:[
                                'rgba(102,51,153,1)',
                                'rgba(102,51,153,1)',
                                'rgba(102,51,153,1)',
                                'rgba(102,51,153,1)',
                                'rgba(255, 66, 33, 0.8)',
                                'rgba(255, 66, 33, 0.8)',
                                'rgba(255, 66, 33, 0.8)'
                            ]
                        }
                    ]
                }}
                options={{ 
                    title:{
                        display:this.props.displayTitle,
                        text: 'Correlation between day of the week',
                        fontSize: 25
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

