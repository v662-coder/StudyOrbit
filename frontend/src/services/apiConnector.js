import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: method,  // template string की जरूरत नहीं
        url: url,
        data: bodyData || undefined,  // null के बजाय undefined
        headers: headers || undefined,
        params: params || undefined,
        //        method: `${method}`,
        // url: `${url}`,
        // data: bodyData ? bodyData : null,
        // headers: headers ? headers : null,
        // params: params ? params : null,
    });
}