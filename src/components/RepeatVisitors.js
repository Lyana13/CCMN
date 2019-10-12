import React, {Component} from "react";
import cmxAPI from "./cmxAPI";
import {Line} from 'react-chartjs-2';
import {Container} from "react-bootstrap";
import Grid from '@material-ui/core/Grid';

class RepeatVisitors extends Component {
    constructor(props){
        super(props);
        this.state = {
            DAILY: [],
            FIRST_TIME: [],
            OCCASIONA: [],
            WEEKLY: [],
            YESTERDAY: [],
            labels: ["2am-3am",
                    "3am-4am",
                    "5am-6am",
                    "7am-8am",
                    "9am-10am",
                    "11am-12am",
                    "12pm-1pm",
                    "2pm-3pm",
                    "4pm-5pm",
                    "5pm-6pm",
                    "6pm-7pm",
                    "8pm-9pm",
                    "10pm-11pm",
            ]
        } 
    }

    componentDidMount(){
        this.updateRangeDays(this.props.range);
    }
    
    componentDidUpdate(prevProps){
        if(this.props.range !== prevProps.range) 
        {
          this.updateRangeDays(this.props.range);
        }
    }
    
    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'bottom',
        location:'City'
    }
    
    updateRangeDays(days){
        if(days === "Today"){
            this.repeatVisitorsToday();
          }
          else if(days === "Yesterday") {
            this.repeatVisitorsYesterday();
          }
          else if (days === "Last 3 Days") {
            this.repeatVisitorsThreeDays();
          }
    }
    commonRepeatVisitors(data){
        //  console.log("DATARepeat",data);
        let keys = Object.keys(data);
        data = Object.values(data);
        console.log("DATARepeat",keys);
        const daily =  data.map(e => e.DAILY);
        const firstTime = data.map(e => e.FIRST_TIME);
        const occasiona = data.map(e => e.OCCASIONA);
        const weekly = data.map(e => e.WEEKLY);
        const yesterday = data.map(e => e.YESTERDAY);
        this.setState({
            DAILY:daily, 
            FIRST_TIME:firstTime,
            OCCASIONA:occasiona,
            WEEKLY:weekly,
            YESTERDAY:yesterday,
            // labels: keys
        });
    }

    repeatVisitorsToday(){
        cmxAPI.repeatVisitorsToday(data => {
            this.commonRepeatVisitors(data)
        });
    }

    repeatVisitorsYesterday(){
        cmxAPI.repeatVisitorsYesterday(data => {
            this.commonRepeatVisitors(data)
        });
    }
    
    repeatVisitorsThreeDays(){
        cmxAPI.repeatVisitorsThreeDays(data => {
            this.commonRepeatVisitors(data)
        });
    }
    
    render() {
        return(
            <Container>          
            <Grid >
               <h2 style={{textAlign: "center", margin: 30}}>Repeat Visitors</h2>
               <Line ref="chart" data={
                   {
                       labels: this.state.labels,
                       datasets: [
                         {
                           label: 'DAILY',
                           fill: false,
                           lineTension: 0.1,
                           backgroundColor: 'rgba(33, 43, 250, 1)',
                           borderColor: 'rgba(33, 43, 250, 1)',
                           borderCapStyle: 'butt',
                           borderDash: [],
                           borderDashOffset: 0.0,
                           borderJoinStyle: 'miter',
                           pointBorderColor: 'rgba(33, 43, 250, 1)',
                           pointBackgroundColor: '#fff',
                           pointBorderWidth: 1,
                           pointHoverRadius: 5,
                           pointHoverBackgroundColor: 'rgba(33, 43, 250, 1)',
                           pointHoverBorderColor: 'rgba(33, 43, 250, 1)',
                           pointHoverBorderWidth: 2,
                           pointRadius: 1,
                           pointHitRadius: 10,
                           data: this.state.DAILY
                         },
                         {
                           label: 'FIRST TIME',
                           fill: false,
                           lineTension: 0.1,
                           backgroundColor: 'rgba(250, 42, 41, 1)',
                           borderColor: 'rgba(250, 42, 41, 1)',
                           borderCapStyle: 'butt',
                           borderDash: [],
                           borderDashOffset: 0.0,
                           borderJoinStyle: 'miter',
                           pointBorderColor: 'rgba(250, 42, 41, 1)',
                           pointBackgroundColor: '#fff',
                           pointBorderWidth: 1,
                           pointHoverRadius: 5,
                           pointHoverBackgroundColor: 'rgba(250, 42, 41, 1)',
                           pointHoverBorderColor: 'rgba(250, 42, 41, 1)',
                           pointHoverBorderWidth: 2,
                           pointRadius: 1,
                           pointHitRadius: 10,
                           data: this.state.FIRST_TIME
                         },
                         {
                           label: 'OCCASIONA',
                           fill: false,
                           lineTension: 0.1,
                           backgroundColor: 'rgba(75,199,192,1)',
                           borderColor: 'rgba(75,199,192,1)',
                           borderCapStyle: 'butt',
                           borderDash: [],
                           borderDashOffset: 0.0,
                           borderJoinStyle: 'miter',
                           pointBorderColor: 'rgba(75,199,192,1)',
                           pointBackgroundColor: '#fff',
                           pointBorderWidth: 1,
                           pointHoverRadius: 5,
                           pointHoverBackgroundColor: 'rgba(75,199,192,1)',
                           pointHoverBorderColor: 'rgba(75,199,192,1)',
                           pointHoverBorderWidth: 2,
                           pointRadius: 1,
                           pointHitRadius: 10,
                           data: this.state.OCCASIONA
                         },
                         {
                           label: 'WEEKLY',
                           fill: false,
                           lineTension: 0.1,
                           backgroundColor: 'rgba(82, 255, 250, 1)',
                           borderColor: 'rgba(82, 255, 250, 1)',
                           borderCapStyle: 'butt',
                           borderDash: [],
                           borderDashOffset: 0.0,
                           borderJoinStyle: 'miter',
                           pointBorderColor: 'rgba(82, 255, 250, 1)',
                           pointBackgroundColor: '#fff',
                           pointBorderWidth: 1,
                           pointHoverRadius: 5,
                           pointHoverBackgroundColor: 'rgba(82, 255, 250, 1)',
                           pointHoverBorderColor: 'rgba(82, 255, 250, 1)',
                           pointHoverBorderWidth: 2,
                           pointRadius: 1,
                           pointHitRadius: 10,
                           data: this.state.WEEKLY
                         },
                         {
                           label: 'YESTERDAY',
                           fill: false,
                           lineTension: 0.1,
                           backgroundColor: 'rgba(251, 238, 18, 1)',
                           borderColor: 'rgba(251, 238, 18, 1)',
                           borderCapStyle: 'butt',
                           borderDash: [],
                           borderDashOffset: 0.0,
                           borderJoinStyle: 'miter',
                           pointBorderColor: 'rgba(251, 238, 18, 1)',
                           pointBackgroundColor: '#fff',
                           pointBorderWidth: 1,
                           pointHoverRadius: 5,
                           pointHoverBackgroundColor: 'rgba(251, 238, 18, 1)',
                           pointHoverBorderColor: 'rgba(251, 238, 18, 1)',
                           pointHoverBorderWidth: 2,
                           pointRadius: 1,
                           pointHitRadius: 10,
                           data: this.state.YESTERDAY
                         }
                       ]
                     }
               } />
               </Grid>
           </Container>
        )
    }
}

export default RepeatVisitors;