import axios from "axios";

const GetAgent = async () => {
    const REQUEST_URL = "http://localhost:8080/agent"
    const response = await axios.get(REQUEST_URL)

    console.log(response.data)

    return response
}

export default GetAgent