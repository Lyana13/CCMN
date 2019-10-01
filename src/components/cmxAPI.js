import axios from 'axios';

class cmxAPI {
    cmxUrl = "https://cisco-cmx.unit.ua"
    presenceUrl = "https://cisco-presence.unit.ua"
    login = "RO"
    cmxPass = "just4reading"
    presencePass = "Passw0rd"
    cmxAuth = {username: this.login, password: this.cmxPass}
    presenceAuth = { username: this.login, password: this.presencePass }

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
    async getSitesIP(){
        const response= await axios.get(this.presenceUrl + "/api/config/v1/sites", {
            auth: this.presenceAuth
        })
        return response.data[0].aesUId;
    }

    getTotalConnectedCount(cb) {
        axios.get(this.cmxUrl + "/api/analytics/v1/now/connectedDetected", {
            auth: this.cmxAuth
        }).then(response => {
            // console.log(response)
            return cb(response.data.total)
        })
    }

    getFloorsInfo(cb) {
        axios.get(this.cmxUrl + "/api/config/v1/maps/info/System Campus/UNIT.Factory/", {
            auth: this.cmxAuth
        }).then(response => {
             //console.log("floorListdrugoy",response)
            return cb(response.data.floorList)
        })
    }

    topDevicesMacers(sitesID, cb){
        axios.get(this.presenceUrl + "/api/presence/v1/visitor/count/yesterday?siteId=" + sitesID, {
          auth: this.presenceAuth  
        }).then(response => {
            console.log("text1s", response)
            return cb(response.data)
        })
    }
    
    getDailyConnectedCount(start, end, cb) { 
        axios.get(this.presenceUrl + "/api/presence/v1/connected/daily?siteId=1513804707441&startDate=" + start +"&endDate=" + end, {
            auth: this.presenceAuth
        }).then(response => {
            // console.log("flossssssssss",response.data)
            return cb(response.data)
        })
    }
}

export default new cmxAPI()