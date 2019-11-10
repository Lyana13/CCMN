import axios from 'axios';
import "awesome-notifications/dist/style.css";
import AWN from 'awesome-notifications';

class cmxAPI {
    cmxUrl = "https://cisco-cmx.unit.ua"
    presenceUrl = "https://cisco-presence.unit.ua"
    login = "RO"
    cmxPass = "just4reading"
    presencePass = "Passw0rd"
    cmxAuth = {username: this.login, password: this.cmxPass}
    presenceAuth = { username: this.login, password: this.presencePass }
    notifier = new AWN({});

    handleError = (error) => {
        this.notifier.alert("SERVER ERROR"); 
    }

    getFloorImage(floorName, cb) {
        axios.get(this.cmxUrl + "/api/config/v1/maps/image/System Campus/UNIT.Factory/" + floorName, {
            auth: this.cmxAuth,
            responseType: 'blob'
        }).then(response => {
            let reader = new FileReader();
            reader.onloadend = () => cb(reader.result);
            reader.readAsDataURL(response.data);
        }).catch(this.handleError)
    }
    
    async getAllClients() {
        const resp = await axios.get(this.cmxUrl + "/api/location/v2/clients ", {
            auth: this.cmxAuth
        }).catch(this.handleError)
        return resp ? resp.data : [];
    }

    /*Total Vidsitors  */
    getVisitorsCountToday(cb) {
        axios.get(this.presenceUrl + "/api/presence/v1/visitor/count/today?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }
    getVisitorsCountYesterday(cb) {
        axios.get(this.presenceUrl + "/api/presence/v1/visitor/count/yesterday?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }
    getVisitorsCountThreeDays(cb) {
        axios.get(this.presenceUrl + "/api/presence/v1/visitor/total/3days?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            console.log("rs", response);
            return cb(response.data)
        }).catch(this.handleError)
    }
    getVisitorsCountSevenDays(cb) {
        axios.get(this.presenceUrl + "/api/presence/v1/visitor/total/lastweek?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }
    getVisitorsCountThirtyDays(cb) {
        axios.get(this.presenceUrl + "/api/presence/v1/visitor/total/lastmonth?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }
    getVisitorsCountMonth(startDate, endDate, cb) {
        axios.get(this.presenceUrl + "/api/presence/v1/visitor/total?siteId=1513804707441&startDate=" + startDate +"&endDate=" + endDate, {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }

    getActiveClients(cb) {
        axios.get(this.cmxUrl + "/api/location/v2/clients/active", {
            auth: this.cmxAuth
        }).then(response => {
            return cb(response);
        }).catch(this.handleError)
    }

    /*Count visiter */
    totalVisitorsToday(cb){
        axios.get(this.presenceUrl + "/api/presence/v1/visitor/count/today?siteId=1513804707441", {
            auth: this.presenceAuth  
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }
    totalVisitorsYesterday(cb){
        axios.get(this.presenceUrl + "/api/presence/v1/visitor/count/yesterday?siteId=1513804707441", {
          auth: this.presenceAuth  
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }
    totalVisitorsThreeDays(cb){
        axios.get(this.presenceUrl + "/api/presence/v1/visitor/total/3days?siteId=1513804707441", {
          auth: this.presenceAuth  
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }
    totalVisitorsLastweek(cb){
        axios.get(this.presenceUrl + "/api/presence/v1/visitor/lastweek/?siteId=1513804707441", {
            auth: this.presenceAuth  
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }
        totalVisitors30Days(cb){
            axios.get(this.presenceUrl + "/api/presence/v1/visitor/total/lastmonth?siteId=1513804707441", {
              auth: this.presenceAuth  
            }).then(response => {
                return cb(response.data)
            }).catch(this.handleError)
        }
    /*Count visiter */
    
    getDailyConnectedCount(startDate, endDate, cb) { 
        axios.get(this.presenceUrl + "/api/presence/v1/connected/daily?siteId=1513804707441&startDate=" + startDate +"&endDate=" + endDate, {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }

/* number of dwell chart */

    dwellHourlyToday(cb){ 
        axios.get(this.presenceUrl + "/api/presence/v1/dwell/hourly/today?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }

    dwellHourlyYesterday(cb){ 
        axios.get(this.presenceUrl + "/api/presence/v1/dwell/hourly/yesterday?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }

    dwellHourlyThreeDays(cb){ 
        axios.get(this.presenceUrl + "/api/presence/v1/dwell/hourly/3days?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }

    dwellDailyLastweek(cb){ 
        axios.get(this.presenceUrl + "/api/presence/v1/dwell/daily/lastweek?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }

    dwellDaily30Days(cb){ 
        axios.get(this.presenceUrl + "/api/presence/v1/dwell/daily/lastmonth?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }
    
    dwellDailyCustom(startDate, endDate ,cb){ 
        axios.get(this.presenceUrl + "/api/presence/v1/dwell/daily?siteId=1513804707441&startDate=" + startDate +"&endDate=" + endDate, {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }
     /* number of dwell chart */

    /* number of repeat visitors */
    repeatVisitorsToday(cb){
        axios.get(this.presenceUrl + "/api/presence/v1/repeatvisitors/hourly/today?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }
    repeatVisitorsYesterday(cb){
        axios.get(this.presenceUrl + "/api/presence/v1/repeatvisitors/hourly/yesterday?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }
    repeatVisitorsThreeDays(cb){
        axios.get(this.presenceUrl + "/api/presence/v1/repeatvisitors/hourly/3days?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }
    repeatVisitorsLastweek(cb){
        axios.get(this.presenceUrl + "/api/presence/v1/repeatvisitors/daily/lastweek?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }
    repeatVisitors30days(cb){
        axios.get(this.presenceUrl + "/api/presence/v1/repeatvisitors/daily/lastmonth?siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }
    repeatVisitors(startDate, endDate, cb){
        axios.get(this.presenceUrl + "/api/presence/v1/repeatvisitors/daily?siteId=1513804707441&startDate=" + startDate +"&endDate=" + endDate, {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }
    repeatVisitorsLastMouth(startDate, endDate, cb){
        axios.get(this.presenceUrl + "/api/presence/v1/repeatvisitors/count?siteId=1513804707441&startDate=" + startDate +"&endDate=" + endDate, {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }

    /*correlation*/
    async dwellAverage(startDate, endDate){
        const resp = await axios.get(this.presenceUrl + "/api/presence/v1/dwell/average?startDate=" + startDate + "&endDate=" + endDate + "&siteId=1513804707441", {
            auth: this.presenceAuth
        }).catch(this.handleError)
        return resp ? resp.data : 0;
    }
    
    dailyVisitors(startDate, endDate, cb){
        axios.get(this.presenceUrl + "/api/presence/v1/visitor/daily?startDate=" + startDate + "&endDate=" + endDate + "&siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }
   dailyPasserby(startDate, endDate, cb){
        axios.get(this.presenceUrl + "/api/presence/v1/passerby/daily?startDate=" + startDate + "&endDate=" + endDate + "&siteId=1513804707441", {
            auth: this.presenceAuth
        }).then(response => {
            return cb(response.data)
        }).catch(this.handleError)
    }
    getConnectedDetecdedNow(cb){
        axios.get(this.cmxUrl + "/api/analytics/v1/now/connectedDetected", {
            auth: this.cmxAuth
        }).then(response => {
            return cb(response.data.total)
        }).catch(this.handleError)
    }
}


export default new cmxAPI()