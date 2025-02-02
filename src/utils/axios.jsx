import axios from "axios";


const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        Accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2UyM2NmMzk3M2YxODQzOTE5NzVhM2I4ZWFhMmQxZiIsIm5iZiI6MTczNzczOTI2NS4zMzYsInN1YiI6IjY3OTNjYzAxOTQ4MTA5NTY1MTQ4MjViYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YDr0-rt4odDycOGsJHlT6WyUoXEqZHqcSa7lHvy5t1M`
    }
});


export default instance;