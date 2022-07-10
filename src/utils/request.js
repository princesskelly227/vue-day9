import axios from "axios";
// axios.default.baseUrl = "http://localhost:3000";
// export default axios;


const request = axios.create({
    baseURL: "http://localhost:3000",
})

export default request;
