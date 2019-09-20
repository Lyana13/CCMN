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

}

export default new cmxAPI()