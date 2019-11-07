import React, {Component} from "react";
import cmxAPI from "./cmxAPI";
import {Pie} from 'react-chartjs-2';
import {Container, Row, Col} from "react-bootstrap";
import chartLib from "./chartLib";


class Corelation extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            sessionDurationData: [34, 65, 33, 22, 11, 55, 66]
        }
    }
    
    componentDidMount(){
        this.getSessionDurationData(12)
        //chartLib.aggregateByDayOfWeek(12, cmxAPI.dwellAverage, (data) => this.setState({sessionDurationData: data}))
    }
    
    getSessionDurationData = (weeks) => {
        let days = weeks * 7;
        let endDate = new Date();
        let startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        startDate = chartLib.dateToString(startDate);
        endDate = chartLib.dateToString(endDate);
        cmxAPI.dwellAverage(startDate, endDate, data => {
            console.log("data: ", data);
            let map = new Map();
            data = Object.entries(data);
            data.forEach(e => {
                let dayOfWeek = new Date(e[0]).getDay();
                let value = map.get(dayOfWeek) || 0;
                value += e[1];
                map.set(dayOfWeek, value);
            })
            let map2 = new Map();
            map.forEach((value, key) => map2.set(key, Math.round(value / weeks)));
            this.setState( {sessionDurationData: [map2.get(0), map2.get(1), map2.get(2), map2.get(3), map2.get(4), map2.get(5), map2.get(6)]} )
        });
    }

    // dailyVisitors(){
    //     let endDate = new Date();
    //     let startDate = new Date();
    //     startDate.setDate(startDate.getDate() - 7);
    //     startDate = this.dateToString(startDate);
    //     endDate = this.dateToString(endDate);
    //     console.log("cs",endDate);
    //     console.log("ssscs",startDate);
    //     cmxAPI.dailyVisitors(startDate, endDate, data => {
    //         data = Object.entries(data);
    //         let array = [];
    //         data.forEach(e => {
    //             console.log("e", e);
    //             let indx = new Date(e[0]).getDay();
    //             array[indx] = e[1];
    //         });
    //         this.setState({chartDailyVisitors: array});
    //        console.log("arr", array);
    //     });
        
    // }
    // async dwellAverageforCorelation(){
    //     let date = new Date();
    //     let array = [];
    //     // console.log("test",date);
    //     for(var i = 0; i < 7; i++){
    //         date.setDate(date.getDate() - 1);
    //             let indx = date.getDay();
    //             let result = await cmxAPI.dwellAverageforCorelation(this.dateToString(date));
    //             // console.log("test",date);
    //             array[indx] = result;
    //     };
    //     // console.log("test",array);
    //     this.setState({
    //         chartData: array
    //     })
    // }

    // getDweellTimeToday(){
    //     cmxAPI.getDweellTimeToday(data => {
    //         // console.log("getDweellTimeToday", data);
    //     });
    // }

    // proximitySummaryToday(){
    //     cmxAPI.proximitySummaryToday(data => {
    //         this.commonProximityData(data);
    //     });
    // }
    // proximitySummaryYesterday(){
    //     cmxAPI.proximitySummaryYesterday(data => {
    //         this.commonProximityData(data);
    //     });
    // }
    // proximitySummaryThreeDays(){
    //     cmxAPI.proximitySummaryThreeDays(data => {
    //         this.commonProximityData(data);
    //     })
    // }

    // proximitySummaryLastweek(){
    //     cmxAPI.proximitySummaryLastweek(data => {
    //         this.commonProximityData(data);
    //     })
    // }

    // proximitySummaryThirtyDays(){
    //     cmxAPI.proximitySummaryThirtyDays(data => {
    //         this.commonProximityData(data);
    //     })
    // }

    // proximitySummaryThisMouth(){
    //     cmxAPI.proximitySummaryThisMouth(data => {
    //         this.commonProximityData(data);
    //     })
    // }
    // proximitySummaryLastMouth(){
    //     cmxAPI.proximitySummaryLastMouth(data => {
    //         this.commonProximityData(data);
    //     })
    // }

    render (){
        return (
            <Container>
                <Row>
                    {/* <Col>
                        <p>Visitor count in peak hour: {this.state.peakHourCount}</p>
                        <p>Peak Day: {this.state.peakDayCount}visitors on {this.state.peakDate}</p>
                        <p>totalConnectedCount: {this.state.totalConnectedCount}totalConnectedCount {this.state.totalPasserbyCount}</p>
                    </Col> */}
                    {/* <Col item sm={12} lg={6}>
                        <Pie data={{
                            labels: [
                            'Visitors',
                            'Passerby',
                            "Connected",
                            'Probing',
                            'Visitors',
                            'Passerby',
                            "Connected"
                            ],
                            datasets: [{
                                data: this.state.chartData,
                            //   data: [this.state.peakHourCount,this.state.totalPasserbyCount, this.state.totalConnectedCount, this.state.peakDate],
                            backgroundColor: [
                                '#92a8d1;',
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#FTCO51',
                            '#92a8d1;',
                            ],
                            hoverBackgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#74992e;',
                            '#92a8d1;',
                            ]
                            }]
                        }}
                        height={550} width={200} 
                        options={{
                            maintainAspectRatio: false,
                            responsive: false,
                            title:{
                                text: 'Forecasting number of visitors for next week',
                                fontSize: 20,
                            },
                            legend: {
                            position: 'left',
                            labels: {
                                boxWidth: 10
                            }
                            }
                        }}
                        />
                    </Col> */}
                    <Col item sm={12} lg={6}>
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
                </Row>
            </Container>
        )
    }
}
export default Corelation;
