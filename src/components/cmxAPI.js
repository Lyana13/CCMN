import axios from 'axios';

class cmxAPI {
    cmxUrl = "https://cisco-cmx.unit.ua"
    presenceUrl = "https://cisco-presence.unit.ua"
    login = "RO"
    cmxPass = "just4reading"
    presencePass = "Passw0rd"
    cmxAuth = {username: this.login, password: this.cmxPass}
    presenceAuth = {username: this.login, password: this.presencePass}

    getFloorImage(floorName, cb) {
        axios.get(this.cmxUrl + "/api/config/v1/maps/image/System Campus/UNIT.Factory/" + floorName, {
            auth: this.cmxAuth,
            responseType: 'blob'
        }).then(response => {
            let reader = new FileReader();
            reader.onloadend = () => cb(reader.result);
            reader.readAsDataURL(response.data);
        })
    }
    
    async getAllClients() {
        const resp = await axios.get(this.cmxUrl + "/api/location/v2/clients ", {
            auth: this.cmxAuth
        })
        // console.log("newww",resp);
        return resp.data;
    }
    getTotalConnectedCount(cb) {
        axios.get(this.cmxUrl + "/api/analytics/v1/now/connectedDetected", {
            auth: this.cmxAuth
        }).then(response => {
            console.log(response)
            return cb(response.data.total)
        })
    }
}

export default new cmxAPI()