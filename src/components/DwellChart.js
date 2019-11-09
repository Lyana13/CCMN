import React, {Component} from "react";
import cmxAPI from "./cmxAPI";
import chartLib from "./chartLib";
import {Line} from 'react-chartjs-2';
import {Container} from "react-bootstrap";
import Grid from '@material-ui/core/Grid';

class DwellChart extends Component {
    constructor(props){
        super(props);
        this.state = {
          date: new Date(),
        showDate: false,
            labels: [],
            eightPlusHours: [],
            fiveToEightHours: [],
            fiveToThirtyMinutes: [],
            oneToFiveHours: [],
            thirtyToSixtyMinutes: []
        }
      this.setChartData = this.setChartData.bind(this)
    }
    
    onChange = date => {
      this.setState({
          date
      })
  }

  validation = () => {
      this.setState({
          showDate: true
      })
      // console.log(this.state.date);
  }
  reset = () => {
      this.setState({
          showDate: false
      })
  }
    componentDidMount(){
        // this.props.range
        this.updateRangeDays(this.props.range);
        // console.log("bddddd",this.props.range);
    }
  
    componentDidUpdate(prevProps){
      if (this.props.range !== prevProps.range) 
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
      // cmxAPI.dwellDailyLastmonth(cb => console.log(cb));
      // cmxAPI.dwellDailyLastweek(cb => console.log(cb));
      if(days === "Today"){
        this.dwellHourlyToday();
      }
      else if(days === "Yesterday") {
        this.dwellHourlyYesterday()
      }
      else if (days === "Last 3 Days") {
        this.dwellHourlyTime3days()
      }
      else if (days === "Last 7 Days") {
        this.dwellDailyTime7days()
      }
      else if (days === "Last 30 Days") {
        this.dweellDailyTime30days()
      }
      else if (days === "This Month"){
        this.dwellDailyThisMonth()
      }
      else if (days === "Last Month") {
        this.dwellDailyLastMonth()
      }
      else {
        this.dwellCustom(days[0], days[1])
      }
  }

    setChartData(data, labels){
      const eightPlusHours =  data.map(e => e.EIGHT_PLUS_HOURS);
      const fiveToEightHours = data.map(e => e.FIVE_TO_EIGHT_HOURS);
      const fiveToThirtyMinutes = data.map(e => e.FIVE_TO_THIRTY_MINUTES);
      const oneToFiveHours = data.map(e => e.ONE_TO_FIVE_HOURS);
      const thirtyToSixtyMinutes = data.map(e => e.THIRTY_TO_SIXTY_MINUTES);
      this.setState({
          eightPlusHours, 
          fiveToEightHours,
          fiveToThirtyMinutes,
          oneToFiveHours,
          thirtyToSixtyMinutes,
          labels
        });
    }
    
    dwellHourlyToday(){
      cmxAPI.dwellHourlyToday(data => {
        chartLib.commonHourly(data, this.setChartData)
        // const FIVE_TO_THIRTY_MINUTES =  console.log("pref2", Object.values(data).map(e => e.FIVE_TO_THIRTY_MINUTES));
      });
    }
    dwellHourlyYesterday(){
      cmxAPI.dwellHourlyYesterday(data => {
        chartLib.commonHourly(data, this.setChartData)
      });
    }

    dwellHourlyTime3days(){
      cmxAPI.dwellHourlyThreeDays(data => {
         chartLib.commonThreeDays(data, this.setChartData)
      });
    }

    dwellDailyTime7days(){
      cmxAPI.dwellDailyLastweek(data => {
        console.log("n",data);
        chartLib.commonHourly(data, this.setChartData)
      });
    }
    dweellDailyTime30days(){
      cmxAPI.dwellDaily30Days( data => {
        chartLib.commonHourly(data, this.setChartData)
      });
    }

    dwellDailyThisMonth() {
      const dates = chartLib.getThisMounthDates();
      cmxAPI.dwellDailyCustom(dates[0], dates[1], data => {
        chartLib.commonHourly(data, this.setChartData);
      });
    }
    dwellDailyLastMonth(){
      const dates = chartLib.getLastMonthDates();
        cmxAPI.dwellDailyCustom(dates[0], dates[1], data => {
          chartLib.commonHourly(data, this.setChartData);
      });
    }
    dwellCustom(from, to){
      console.log("sr to", from, to);
      cmxAPI.dwellDailyCustom(from, to , data => {
        chartLib.commonHourly(data, this.setChartData)
      })
    }

    render (){
        return (
            <Container>
             <Grid>
                <h2 style={{textAlign: "center", margin: 20}}>Dwell Time</h2>
                <Line ref="chart" data={
                    {
                        labels: this.state.labels,
                        datasets: [
                          {
                            label: '5-30 mins',
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
                            data: this.state.fiveToThirtyMinutes
                          },
                          {
                            label: '30-60 mins',
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
                            data: this.state.thirtyToSixtyMinutes
                          },
                          {
                            label: '1-5 hours',
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
                            data: this.state.oneToFiveHours
                          },
                          {
                            label: '5-8 hours',
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
                            data: this.state.fiveToEightHours
                          },
                          {
                            label: '8+ hours',
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
                            data: this.state.eightPlusHours
                          }
                        ]
                      }
                } />
                </Grid>
            </Container>
        )
    }
}

export default DwellChart;