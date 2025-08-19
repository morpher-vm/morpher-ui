import {create} from "zustand";
import AgentSystemInfo from "@/types/AgentSystemInfo";

interface AgentSystemInfoStoreState {
    agentSystemInfoList: AgentSystemInfo[]
    setAgentSystemInfoList: (list: AgentSystemInfo[]) => void
}

const AgentSystemInfoStore = create<AgentSystemInfoStoreState>((set) => ({
    agentSystemInfoList: [],
    setAgentSystemInfoList: (agentInfoList: AgentSystemInfo[]) => {
        set({agentSystemInfoList: agentInfoList})
    }
}))

export default AgentSystemInfoStore