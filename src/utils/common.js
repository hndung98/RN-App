export const formatDateToYMDString = (date) => {
    if (!date) return "2000-01-01";
    let month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export const getYMD = (dateObj) => {
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    return newdate = year + "/" + month + "/" + day;
}
export const isNumeric = (str) => {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export const createTransactionID = (id) => {
    let today = new Date();
    let month = today.getUTCMonth() + 1; 
    let day = today.getUTCDate();
    let year = today.getUTCFullYear();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    
    let res = year + "" + month + "" + day + "" + h + "" + m + "" + s + id;

    return res;
}