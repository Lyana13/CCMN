import React, {Component} from "react";
import {Bar} from 'react-chartjs-2';
import {Container} from "react-bootstrap";

class Chart extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartDate:{
                labels:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets:[
                    {
                        label:'Population',
                        data:[
                            550,
                            500,
                            400,
                            700,
                            500,
                            800,
                            300
                        ],
                        backgroundColor:[
                            'rgba(102,51,153,1)',
                            'rgba(102,51,153,1)',
                            'rgba(102,51,153,1)',
                            'rgba(102,51,153,1)',
                            'rgba(255, 66, 33, 0.8)',
                            'rgba(255, 66, 33, 0.8)',
                            'rgba(255, 66, 33, 0.8)',
                        ]
                    }
                ]
            }
        }
    }

    render (){
        return (
            <Container>
                <Bar
                data={this.state.chartDate}
                options={{ 
                    title:{
                        display:true,
                        text: 'Correlation between day of the week',
                        fontSize: 25
                    },
                    legend:{
                        display:true,
                        position:"top"
                    }
                }}
            />
            </Container>
        )
    }
}

export default Chart;

