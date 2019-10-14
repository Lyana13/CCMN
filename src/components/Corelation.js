import React, {Component} from "react";
import cmxAPI from "./cmxAPI";
import {Pie} from 'react-chartjs-2';
import {Container, Row, Col} from "react-bootstrap";

class Corelation extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            chartData:[],
            chartDailyVisitors: [],
            kpiSummary: "",
            peakHourCount: "", 
            peakDayCount: "",
            peakDate: "",
            totalConnectedCount: "",
            totalPasserbyCount: "",
        }
    }
    
    componentDidMount(){
        this.proximitySummaryToday();
        this.proximitySummaryYesterday();
        this.proximitySummaryLastweek();
        this.proximitySummaryThirtyDays();
        this.proximitySummaryThisMouth();
        this.proximitySummaryLastMouth();
        this.getDweellTimeToday();
        this.dwellAverageforCorelation();
        this.dailyVisitors();
    }

    commonProximityData(data){
        this.setState({
            peakHourCount: data.data.peakSummary.peakHourCount,
            peakDayCount: data.data.peakSummary.peakDayCount,
            peakDate: data.data.peakSummary.peakDate,
            totalConnectedCount: data.data.totalConnectedCount,
            totalPasserbyCount: data.data.totalPasserbyCount
        })
    }
    dateToString(date){
        let day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear();
        return year + "-" + month + "-" + day;
    }
    dailyVisitors(){
        let endDate = new Date();
        let startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        startDate = this.dateToString(startDate);
        endDate = this.dateToString(endDate);
        console.log("cs",endDate);
        console.log("ssscs",startDate);
        cmxAPI.dailyVisitors(startDate, endDate, data => {
            data = Object.entries(data);
            let array = [];
            data.forEach(e => {
                console.log("e", e);
                let indx = new Date(e[0]).getDay();
                array[indx] = e[1];
            });
            this.setState({chartDailyVisitors: array});
           console.log("arr", array);
        });
        
    }
    async dwellAverageforCorelation(){
        let date = new Date();
        let array = [];
        // console.log("test",date);
        for(var i = 0; i < 7; i++){
            date.setDate(date.getDate() - 1);
                let indx = date.getDay();
                let result = await cmxAPI.dwellAverageforCorelation(this.dateToString(date));
                // console.log("test",date);
                array[indx] = result;
        };
        // console.log("test",array);
        this.setState({
            chartData: array
        })
    }

    getDweellTimeToday(){
        cmxAPI.getDweellTimeToday(data => {
            // console.log("getDweellTimeToday", data);
        });
    }

    proximitySummaryToday(){
        cmxAPI.proximitySummaryToday(data => {
            this.commonProximityData(data);
        });
    }
    proximitySummaryYesterday(){
        cmxAPI.proximitySummaryYesterday(data => {
            this.commonProximityData(data);
        });
    }
    proximitySummaryThreeDays(){
        cmxAPI.proximitySummaryThreeDays(data => {
            this.commonProximityData(data);
        })
    }

    proximitySummaryLastweek(){
        cmxAPI.proximitySummaryLastweek(data => {
            this.commonProximityData(data);
        })
    }

    proximitySummaryThirtyDays(){
        cmxAPI.proximitySummaryThirtyDays(data => {
            this.commonProximityData(data);
        })
    }

    proximitySummaryThisMouth(){
        cmxAPI.proximitySummaryThisMouth(data => {
            this.commonProximityData(data);
        })
    }
    proximitySummaryLastMouth(){
        cmxAPI.proximitySummaryLastMouth(data => {
            this.commonProximityData(data);
        })
    }


    render (){
        return (
            <Container>
                <Row>
                    {/* <Col>
                        <p>Visitor count in peak hour: {this.state.peakHourCount}</p>
                        <p>Peak Day: {this.state.peakDayCount}visitors on {this.state.peakDate}</p>
                        <p>totalConnectedCount: {this.state.totalConnectedCount}totalConnectedCount {this.state.totalPasserbyCount}</p>
                    </Col> */}
                    <Col item sm={12} lg={6}>
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
                    </Col>
                    <Col item sm={12} lg={6}>
                    <Pie
                        data = {{
                            labels:['Passerby', 'Visitors'],
                            datasets:[
                                {
                                    label:'Number of visitors',
                                    data: this.state.chartDailyVisitors,
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
                                display:this.props.displayTitle,
                                text: 'Correlation between visitors and device manufactures',
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
export default Corelation;
