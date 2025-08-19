import axios from "axios";
import AgentSystemInfo from "@/types/AgentSystemInfo";

const GetAgentSystemInfoList = async () => {
    const REQUEST_URL = process.env.AGENT_SYSTEM_INFO_URL || "http://localhost:9000/api/v1/agents";

    try {
        const response = await axios.get(REQUEST_URL);
        const data: AgentSystemInfo[] = response.data.result;

        return data;
    } catch (error) {
        console.error("Failed to fetch agent system info list:", error);
        throw error;
    }
}

export default GetAgentSystemInfoList