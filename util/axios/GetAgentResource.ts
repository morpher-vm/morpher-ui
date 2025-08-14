import axios from "axios";

const GetAgentResource = async () => {
    const REQUEST_URL = "http://localhost:8080/agent/resource"
    const response = await axios.get(REQUEST_URL)

    console.log(response.data)

    return response
}

export default GetAgentResource