import React, {Component} from "react";
import cmxAPI from "./cmxAPI";
import {Pie} from 'react-chartjs-2';
import {Container, Row, Col} from "react-bootstrap";
const data = {
    labels: [
      'Visitors',
      'Passerby',
      "Connected",
      'Probing'
    ],
    datasets: [{
        data: [20, 40, 20, 3],
    //   data: [this.state.peakHourCount,this.state.totalPasserbyCount, this.state.totalConnectedCount, this.state.peakDate],
      backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#FFCE56'
      ],
      hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#FFCE56'
      ]
    }]
  }

  const options = {
    maintainAspectRatio: false,
    responsive: false,
    legend: {
      position: 'left',
      labels: {
        boxWidth: 10
      }
    }
  }
class Proximity extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            kpiSummary: "",
            peakHourCount: "", 
            peakDayCount: "",
            peakDate: "",
            totalConnectedCount: "",
            totalPasserbyCount: ""
        }
    }
    
    componentDidMount(){
        this.proximitySummaryToday();
        this.proximitySummaryYesterday();
        this.proximitySummaryLastweek();
        this.proximitySummaryThirtyDays();
        this.proximitySummaryThisMouth();
        this.proximitySummaryLastMouth();
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
                <Col>
                    <p>Visitor count in peak hour: {this.state.peakHourCount}</p>
                    <p>Peak Day: {this.state.peakDayCount}visitors on {this.state.peakDate}</p>
                    <p>totalConnectedCount: {this.state.totalConnectedCount}totalConnectedCount {this.state.totalPasserbyCount}</p>
                    </Col>
                    <Col item sm={12} lg={6}>
                    <Pie data={data} height={150} width={200} options={options}/>
                <Pie
                data = {{
                    labels:['Passerby', 'Visitors'],
                    datasets:[
                        {
                            label:'Number of visitors',
                            data: this.state.chartData,
                            backgroundColor:[
                                'rgba(102,51,153,1)',
                                'rgba(12,1,103,1)',
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
export default Proximity;
