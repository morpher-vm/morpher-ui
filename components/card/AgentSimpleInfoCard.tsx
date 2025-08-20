import {Cpu, HardDrive, Server} from "lucide-react";
import { AgentSystemInfo } from "@/types/AgentSystemInfo";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

interface props {
    agentSystemInfo: AgentSystemInfo
}

const AgentSimpleInfoCard = ({agentSystemInfo}: props) => {

    return (
        <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
                <CardTitle className="text-orange-500 flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    SYSTEM INFORMATION
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-neutral-800 border border-neutral-700 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-orange-500/20 rounded">
                                <Server className="w-4 h-4 text-orange-500" />
                            </div>
                            <h3 className="text-white font-semibold">Operating System</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-neutral-400">Name:</span>
                                <span className="text-white">{agentSystemInfo.os.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-neutral-400">Version:</span>
                                <span className="text-white">{agentSystemInfo.os.version}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-neutral-400">Kernel:</span>
                                <span className="text-white">{agentSystemInfo.os.kernel_version}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* CPU Information */}
                    <div className="p-4 bg-neutral-800 border border-neutral-700 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-orange-500/20 rounded">
                                <Cpu className="w-4 h-4 text-orange-500" />
                            </div>
                            <h3 className="text-white font-semibold">Processor</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-neutral-400">Architecture:</span>
                                <span className="text-white">{agentSystemInfo.cpu.arch}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-neutral-400">Vcpus:</span>
                                <span className="text-white">{agentSystemInfo.cpu.vcpus}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-neutral-400">Model:</span>
                                <span className="text-white">{agentSystemInfo.cpu.model}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-neutral-400">Mhz Per Cpu:</span>
                                <span className="text-white">{agentSystemInfo.cpu.mhz_per_cpu}</span>
                            </div>
                        </div>
                    </div>

                    {/* RAM Information */}
                    <div className="p-4 bg-neutral-800 border border-neutral-700 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-orange-500/20 rounded">
                                <HardDrive className="w-4 h-4 text-orange-500" />
                            </div>
                            <h3 className="text-white font-semibold">Memory</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-neutral-400">Total RAM(GB):</span>
                                <span className="text-white">{agentSystemInfo.ram.total_mb / 1024}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-neutral-400">Used:</span>
                                <span className="text-white">{Math.floor(agentSystemInfo.ram.used_mb / 1024 * 100) / 100 }</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-neutral-400">Available:</span>
                                <span className="text-green-400">{Math.floor(agentSystemInfo.ram.free_mb / 1024 * 100) / 100}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-neutral-400">Usage:</span>
                                <span className="text-orange-400">{Math.floor((agentSystemInfo.ram.used_mb / 1024) / (agentSystemInfo.ram.total_mb / 1024) * 100)} %</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default AgentSimpleInfoCard