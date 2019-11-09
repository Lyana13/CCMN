class chartLib {
    dateToString(date){
        let day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        return year + "-" + month + "-" + day;
    }

    getThisMounthDates(){
        let start = new Date();
        let end = new Date();
        start = new Date(start.getFullYear(),start.getMonth(), 1);
        return [this.dateToString(start), this.dateToString(end)]
    }
    getLastMonthDates(){
        let start = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
        let end = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
        return [this.dateToString(start), this.dateToString(end)]
    }
      
    commonHourly(data, cb){
        const labels = Object.keys(data);
        data = Object.values(data);
        cb(data, labels);
      }
  
      commonThreeDays(data, cb){
        let labels = Object.entries(data);
        labels = [labels[0][0], Object.keys(labels[0][1]).slice(1),
                  labels[1][0], Object.keys(labels[1][1]).slice(1),
                  labels[2][0], Object.keys(labels[2][1]).slice(1)].flat();
        data = Object.values(data);
        data = data.map(e =>  Object.values(e));
        data = [data[0], data[1], data[2]].flat();
        cb(data, labels);
      }

}

export default new chartLib()