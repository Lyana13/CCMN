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
            return cb(response.data.total)
        })
    }

    getFloorsInfo(cb) {
        axios.get(this.cmxUrl + "/api/config/v1/maps/info/System Campus/UNIT.Factory/", {
            auth: this.cmxAuth
        }).then(response => {
            return cb(response.data.floorList)
        })
    }

    getActiveClients(cb) {
        axios.get(this.cmxUrl + "/api/location/v2/clients/active", {
            auth: this.cmxAuth
        }).then(response => {
            console.log("active", response);
            return cb(response);
        })
    }
/*Count visiter */
totalVisitorsToday(sitesID, cb){
    axios.get(this.presenceUrl + "/api/presence/v1/visitor/count/today?siteId=" + sitesID, {
      auth: this.presenceAuth  
    }).then(response => {
        return cb(response.data)
    })
}
    totalVisitorsYesterday(sitesID, cb){
        axios.get(this.presenceUrl + "/api/presence/v1/visitor/count/yesterday?siteId=" + sitesID, {
          auth: this.presenceAuth  
        }).then(response => {
            return cb(response.data)
        })
    }
    totalVisitorsThreeDays(sitesID, cb){
        axios.get(this.presenceUrl + "/api/presence/v1/visitor/count/3days?siteId=" + sitesID, {
          auth: this.presenceAuth  
        }).then(response => {
            return cb(response.data)
        })
    }
        totalVisitorsLastweek(sitesID, cb){
            axios.get(this.presenceUrl + "/api/presence/v1/visitor/lastweek/yesterday?siteId=" + sitesID, {
              auth: this.presenceAuth  
            }).then(response => {
                return cb(response.data)
            })
        }
        totalVisitorsLastmonth(sitesID, cb){
            axios.get(this.presenceUrl + "/api/presence/v1/visitor/lastmonth/yesterday?siteId=" + sitesID, {
              auth: this.presenceAuth  
            }).then(response => {
                return cb(response.data)
            })
        }
    /*Count visiter */
    
    getDailyConnectedCount(start, end, cb) { 
        axios.get(this.presenceUrl + "/api/presence/v1/connected/daily?siteId=1513804707441&startDate=" + start +"&endDate=" + end, {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        })
    }

    async getDweellTimeToday(){
        const resp = await axios.get(this.presenceUrl + "/api/presence/v1/dwell/average/today?siteId=1513804707441", {
            auth: this.presenceAuth
        })
        return resp;
    }
    async getDweellTime3days(){
        const resp = await axios.get(this.presenceUrl + "/api/presence/v1/dwell/average/3days?siteId=1513804707441", {
            auth: this.presenceAuth
        })
        return resp;
    }

    async getDweellTimeYesterday(){
        const resp = await axios.get(this.presenceUrl + "/api/presence/v1/dwell/average/yesterday?siteId=1513804707441", {
            auth: this.presenceAuth
        })
        return resp;
    }

    async getDweellTime7days(){
        const resp = await axios.get(this.presenceUrl + "/api/presence/v1/dwell/average/lastweek?siteId=1513804707441", {
            auth: this.presenceAuth
        })
        return resp;
    }
  
    async getDweellTimeLastmonth(){
        const resp = await axios.get(this.presenceUrl + "/api/presence/v1/dwell/average/lastmonth?siteId=1513804707441", {
            auth: this.presenceAuth
        })
        return resp;
    }
    async KPISummaryToday(){
        const resp = await axios.get(this.presenceUrl + "/api/presence/v1/kpisummary/today", {
            auth: this.presenceAuth
        })
        return resp;
    }


    dwellHourlyToday(cb){ 
        axios.get(this.presenceUrl + "/api/presence/v1/dwell/hourly/today?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        })
    }

    dwellHourlyYesterday(cb){ 
        axios.get(this.presenceUrl + "/api/presence/v1/dwell/hourly/yesterday?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        })
    }

    dwellHourlyThreeDays(cb){ 
        axios.get(this.presenceUrl + "/api/presence/v1/dwell/hourly/3days?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        })
    }

    dwellDailyLastweek(cb){ 
        axios.get(this.presenceUrl + "/api/presence/v1/dwell/daily/lastweek?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        })
    }

    dwellDaily30Days(cb){ 
        axios.get(this.presenceUrl + "/api/presence/v1/dwell/daily/lastmonth?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        })
    }
    
    dwellDaily(start, end ,cb){ 
        axios.get(this.presenceUrl + "/api/presence/v1/dwell/daily?siteId=1513804707441&startDate=" + start +"&endDate=" + end, {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        })
    }
    /* number of repeat visitors */
    repeatVisitorsToday(cb){
        axios.get(this.presenceUrl + "/api/presence/v1/repeatvisitors/hourly/today?siteId=1513804707441&startDate=", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        })
    }
    repeatVisitorsYesterday(cb){
        axios.get(this.presenceUrl + "/api/presence/v1/repeatvisitors/hourly/yesterday?siteId=1513804707441&startDate=", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        })
    }
    repeatVisitorsThreeDays(cb){
        axios.get(this.presenceUrl + "/api/presence/v1/repeatvisitors/hourly/3days?siteId=1513804707441&startDate=", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        })
    }
    
    

    /* KPI */

    kpiSummaryThreeDays(cb){
        axios.get(this.presenceUrl + "/api/presence/v1/kpisummary/3days?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response)
        })
    }
}

export default new cmxAPI()