
import axios from "axios"

const journalApi = axios.create({
    baseURL: "https://vue-demos-f28ac-default-rtdb.firebaseio.com",
})

export default journalApi