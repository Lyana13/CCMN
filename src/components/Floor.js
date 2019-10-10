import React from "react";
import AWN from 'awesome-notifications';
import cmxAPI from "./cmxAPI";
import Select from 'react-select';
import "awesome-notifications/dist/style.css";

const options = [
    { value: '1st_Floor', label: 'First' },
    { value: '2nd_Floor', label: 'Second' },
    { value: '3rd_Floor', label: 'Third' },
  ];

class Floor extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            image: "",
            selectedFloor: { value: '1st_Floor', label: 'First' },
            clients: [],
            visitsCountMap: new Map()
        }
        this.updateFloorImage = this.updateFloorImage.bind(this);
    }

    componentDidMount() {
        this.updateFloorImage(this.state.selectedFloor.value);
        let notifier = new AWN({});
        setInterval(async () => {
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
        cmxAPI.getFloorsInfo(floorList => {
            let visitsCountMap = new Map();
                floorList.forEach(floor => {
                    visitsCountMap.set(floor.name, floor.aesUidString);
                })
                this.setState({visitsCountMap: visitsCountMap});
        });
    }

    updateFloorImage(Floor) {
        cmxAPI.getFloorImage(Floor, image => this.setState({ image }));
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

    render(){
        const floorName = this.state.selectedFloor.value,
        floorId = this.state.visitsCountMap.get(floorName);
        return(
          
                    <div className="containe">
                    
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
                                        width: 10,
                                        height: 10,
                                        borderRadius: 5,
                                        backgroundColor: 'blue',
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
                        <Select 
                        value={this.state.selectedFloor}
                        onChange={this.handleFloorChange}
                        options={options}
                        />
                        </div>
                      
                    </div>
   
 
        )   
    }
}

export default Floor;