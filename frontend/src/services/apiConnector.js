import axios from "axios";

// BUGFIX: no timeout was set, so a stalled/unreachable backend (e.g. a
// sleeping free-tier Render instance, or a dropped connection) made requests
// hang indefinitely with no error and no user feedback - reported as
// "timeouts" and "connection resets". A finite timeout makes failures fail
// fast and visibly instead of silently hanging the UI.
export const axiosInstance = axios.create({
    timeout: 20000,
});

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