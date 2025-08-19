import axios from "axios";
import AgentSystemInfo from "@/types/AgentSystemInfo";

const GetAgentSystemInfoList = async () => {
    const REQUEST_URL = "http://localhost:9000/api/v1/agents";

    try {
        const response = await axios.get(REQUEST_URL);
        const data: AgentSystemInfo[] = response.data.result;

        return data;
    } catch (error) {
        throw error;
    }
}

export default GetAgentSystemInfoList