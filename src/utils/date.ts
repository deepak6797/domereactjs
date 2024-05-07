import moment from "moment";

export const formatDate = (date: Date, format="YYYY-MM-DD")=>{
    return moment(date).format(format)
}
