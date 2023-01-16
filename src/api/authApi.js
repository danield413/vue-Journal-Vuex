
import axios from "axios"

const authApi = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
    params: {
        key: "AIzaSyCPPIONYhQgbPyupqQL7PAyAbST63flh6M"
    }
})

export default authApi