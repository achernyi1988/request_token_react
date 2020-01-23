import {USER_ACCOUNT,USER_DATA} from "./types"
import axios from "../axios"



export const login = (id) => (dispatch) => {

    localStorage.setItem("UserId", id)
    dispatch({
        type: USER_ACCOUNT, payload: true
    })
}

export const logout = () => (dispatch) => {
    console.log("logout");
    localStorage.removeItem("UserId")
    dispatch({
        type: USER_ACCOUNT, payload: false
    })
    // dispatch({
    //     type: USER_DATA, payload: null
    // })
}

export const fetchData = () => (dispatch) => {

    axios.get(`5dfbe282ac985631c46d4ca3`)
        .then((res) => {
            console.log("res", res)

            dispatch({
                type: USER_DATA, payload: res.data.data
            })
        })
        .catch((error) => {
            console.log("error", error.response.data)
        })
}


export const updateData = (data) => (dispatch) => {

    console.log("updateData", axios.defaults.headers);
    axios.put(`5dfbe282ac985631c46d4ca3`, data)

    axios.put(`5dfbe282ac985631c46d4ca3`, {
        "first_name": 'Alex',
        "last_name": 'Chernyi',
        "hobby": {
            "sports": [
                {
                    "id": "1319bc1a-eca8-44ce-8a7a-80e0ffb7073b",
                    "name": "football"
                },
            ],
            "books": [
                {
                    "id": "3f2636d8-5bc7-4e09-8931-1326ec8bee5v",
                    "name": "111 Гарри Поттер и Принц-полукровка"
                },
                {
                    "id": "3f2636d8-5bc7-4e09-8931-1326ec8be21v",
                    "name": "clever investor"
                },
            ],
            "computer game": [
                {
                    "id": "3f2636d8-5bc7-4e09-8931-1326ec8bee5v",
                    "name": "DOOM 3"
                },
            ]
        }
    })
        .then((res) => {
            console.log("res", res)
            dispatch(fetchData());
        })
        .catch((error) => {
            console.log("error", error.response.data)
        })
}