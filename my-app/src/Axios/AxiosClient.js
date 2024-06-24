import axios from "axios";

const AxiosClient = axios.create({
    baseURL: `https://localhost:7073/api`,
    headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    }
});

AxiosClient.interceptors.response.use(
    res => res,
    error => {
        // if (error.response.status == 401) {
        //     window.location.href = `http://localhost:3000/login`;
        // }
        console.error(`Error! Status Code: ` + error.response.status);
        return Promise.reject(error);
    }
);

export default AxiosClient;