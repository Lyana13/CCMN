import React, {Component} from "react";
import {Bar, Pie, Line} from 'react-chartjs-2';
import {Container, Row, Col} from "react-bootstrap";

class Chart extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartData:props.chartData
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        location:'City'
    }

    render (){
        return (
            <Container>
                <Row>
                    <Col item  sm={6} lg={6}>
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
            </Col>
            <Col item  sm={6} lg={12}>
            <Bar
                data={this.state.chartData}
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

