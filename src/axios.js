import axios from "axios"

export default axios.create({
    baseURL: 'https://front-end-api-widget.herokuapp.com/api/test/user/info/',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
    "eyJ1c2VySWQiOiI1ZGZiZDJlMTllZWRkZDIyODIzODY0ODciLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNTc2Nzg0NjA5LCJleHAiOjE1ODE5Njg2MDl9." +
    "OPxzfA3v67vA8ZhyOUMNzi0PQI9ukAtl78XJYns_tes"
    }
});


