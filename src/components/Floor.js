import React from "react";
import AWN from 'awesome-notifications';
import cmxAPI from "./cmxAPI";
import Select from 'react-select';
import "awesome-notifications/dist/style.css";
import {Container, Row, Col} from "react-bootstrap";

const options = [
    { value: "735495909441273878", label: 'First' },
    { value: "735495909441273979", label: 'Second' },
    { value: "735495909441273980", label: 'Third' },
];

const floorsNames = {
    "735495909441273878": "1st_Floor",
    "735495909441273979": "2nd_Floor",
    "735495909441273980": "3rd_Floor"
}

class Floor extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            image: "",
            selectedFloor: options[0],
            clients: [],
            searchedMacAddress: "",
            timerId: ""
        }
        this.changeMacAddress = this.changeMacAddress.bind(this);
        this.updateFloorImage = this.updateFloorImage.bind(this);
    }
    componentDidMount() {
        this.updateFloorImage(this.state.selectedFloor.value);
        let notifier = new AWN({});

        let timerId = setInterval(async () => {
            let oldClients = this.state.clients,
                newClients = await cmxAPI.getAllClients();
            this.setState({clients: newClients});
            if (oldClients.length === 0) {
                oldClients = newClients;
            }
            var newMacAdresses = this.getNewMacAdresses(oldClients, newClients);
            newMacAdresses.forEach(macAddr => {
                notifier.info("Hi, @xlogin or mac: " + macAddr + " now is on the " + this.state.selectedFloor.label.toLowerCase() + " floor", {});
            });
        }, 1000);
        this.setState({timerId});
        // cmxAPI.getFloorsInfo(floorList => {
        //     console.log("fL", floorList);
        //     let visitsCountMap = new Map();
        //         floorList.forEach(floor => {
        //             visitsCountMap.set(floor.name, floor.aesUidString);
        //         })
        //         this.setState({visitsCountMap: visitsCountMap});
        // });
    }

    componentWillUnmount() {
        clearInterval(this.state.timerId);
    }

    updateFloorImage(floorId) {
        cmxAPI.getFloorImage(floorsNames[floorId], image => this.setState({ image }));
    }

    handleFloorChange = selectedFloor => {
        this.updateFloorImage(selectedFloor.value);
        this.setState({ selectedFloor });
    }

    macAdressesFromClients(clients) {
        return clients.map(client => client.macAddress);
    }

    getNewMacAdresses(oldClients, updatedClients){
        oldClients = this.macAdressesFromClients(oldClients)
        updatedClients = this.macAdressesFromClients(updatedClients)
        return updatedClients.filter(e => !oldClients.includes(e));
    }
    changeMacAddress(e){
        const macAddress = e.target.value.toLowerCase();
        this.setState({searchedMacAddress: macAddress});
        var regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
        if(regex.test(macAddress)){
            e.target.classList.remove("err");
            e.target.classList.add("valid");
            const client = this.state.clients.find(e => e.macAddress == macAddress);
            if (client){
                const option = options.find(e => e.value == client.mapInfo.floorRefId);
                this.setState({ selectedFloor: option });
                this.updateFloorImage(option.value);
            }
        }
        else{
            e.target.classList.remove("valid");
            e.target.classList.add("err");
        }
    }
    // 24:6f:28:db:20:d8

    render(){
        const floorId = this.state.selectedFloor.value
        return(
          <Container>
                <Row>
                    <Col className="wrapperFloor">
                    <div style={{
                        backgroundImage: "url(" + this.state.image + ")",
                        backgroundSize: 'cover',
                        width: 775,
                        height: 385,
                        position: 'absolute',

                    }} id="content__map">
                        {this.state.clients
                            .filter(client => floorId === client.mapInfo.floorRefId)
                            .map(client => {
                                return <div key={client.macAddress} style={{
                                    width: client.macAddress === this.state.searchedMacAddress ? 20 : 10,
                                    height: client.macAddress === this.state.searchedMacAddress ? 20 : 10,
                                    borderRadius: client.macAddress === this.state.searchedMacAddress ? 10 : 5,
                                    backgroundColor: client.macAddress === this.state.searchedMacAddress ? "red" : 'blue',
                                    position: 'absolute',
                                    left: client.mapCoordinate.x / 2 - 5,
                                    top: client.mapCoordinate.y / 2 - 5
                                }}>
                                </div>
                                }
                            )
                        }  
                    </div>
                    <div className="side__bar">
                    <div className="wrap_search">
                    <p><i className="fa fa-search" aria-hidden="true"></i></p>
                        <p className="search">Search <input value={this.state.searchedMacAddress} onChange={this.changeMacAddress} id="header__item_search"/></p>
                    </div>
                    
                    
                    <Select 
                    value={this.state.selectedFloor}
                    onChange={this.handleFloorChange}
                    options={options}
                    />
                    
                    </div>
                    </Col>
                </Row>
          </Container>
        )   
    }
}

export default Floor;