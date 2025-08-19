import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import AgentSystemInfo from "@/types/AgentSystemInfo";
import {Server} from "lucide-react";
import {useEffect, useState} from "react";
import GetAwsEc2Instance from "@/util/axios/GetAwsEc2Instance";
import {GetAwsEc2PriceRequest} from "@/types/request/GetAwsEc2PriceRequest";
import {EC2Instance} from "@/types/EC2Instance";

interface props {
    selectedAgentSystem: AgentSystemInfo
    setSelectedAgentSystem: (agentSystemInfo: null) => void;
}

const AgentMigrationCostModal = ({selectedAgentSystem, setSelectedAgentSystem} : props) => {
    const [ec2List, setEc2List] = useState<EC2Instance[] | null>([])

    useEffect(() => {
        const fetchData = async () => {
            const test : GetAwsEc2PriceRequest = {
                "region":      "ap-northeast-1",
                "minVCpu":     selectedAgentSystem.cpu.vcpus,
                "minMemoryGB": selectedAgentSystem.ram.total_mb / 1024,
                "os":          "Linux",
                "maxResults":  10
            }
            const data = await GetAwsEc2Instance(test);
            setEc2List(data)
        };

        fetchData();
    }, []);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="bg-neutral-900 border-neutral-700 w-full max-w-[90vw] max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Server className="w-6 h-6" />
                        <div>
                            <CardTitle className="text-xl font-bold text-white tracking-wider">{selectedAgentSystem.name}</CardTitle>
                            <p className="text-sm text-neutral-400">
                                {selectedAgentSystem.id}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => setSelectedAgentSystem(null)}
                        className="text-neutral-400 hover:text-white"
                    >
                        ✕
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">SYSTEM INFORMATION</h3>
                        <div className="space-y-2 text-sm">
                            <div className="grid grid-cols-3 md:grid-cols-3 gap-6 items-start">
                                <div className="flex flex-col justify-between">
                                    <h2 className="text-neutral-400">OS</h2>
                                    <div className="pl-3">
                                        <div className="flex justify-between">
                                            <span className="text-white">name</span>
                                            <span className="text-white">{selectedAgentSystem.os.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white">version</span>
                                            <span className="text-white">{selectedAgentSystem.os.version}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white">kernel version</span>
                                            <span className="text-white">{selectedAgentSystem.os.kernel_version}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <h2 className="text-neutral-400">CPU</h2>
                                    <div className="pl-3">
                                        <div className="flex justify-between">
                                            <span className="text-white">arch</span>
                                            <span className="text-white">{selectedAgentSystem.cpu.arch}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white">vcpus</span>
                                            <span className="text-white">{selectedAgentSystem.cpu.vcpus}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white">model</span>
                                            <span className="text-white">{selectedAgentSystem.cpu.model}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white">mhz per cpu</span>
                                            <span className="text-white">{selectedAgentSystem.cpu.mhz_per_cpu}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <h2 className="text-neutral-400">RAM</h2>
                                    <div className="pl-3">
                                        <div className="flex justify-between">
                                            <span className="text-white">total GB</span>
                                            <span className="text-white">{selectedAgentSystem.ram.total_mb / 1024}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">AWS EC2 LIST</h3>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex flex-col justify-between text-sm">
                                        {
                                            ec2List && ec2List.map((instance, key) =>
                                                <div key={key} className={"flex flex-col mb-2"}>
                                                    <span className="text-white pl-2">{key}. Instance Type: {instance.instanceType}</span>
                                                    <span className="text-white pl-5">vcpu: {instance.vcpu}</span>
                                                    <span className="text-white pl-5">memory: {instance.memory}</span>
                                                    <span className="text-white pl-5">storage: {instance.storage}</span>
                                                    <span className="text-white pl-5">networkPerformance: {instance.networkPerformance}</span>
                                                    <span className="text-white pl-5">price per hour: {instance.pricePerHour}</span>
                                                    <span className="text-white pl-5">description: {instance.description}</span>
                                                    <span className="text-white pl-5">location: {instance.location}</span>
                                                    <span className="text-white pl-5">OS: {instance.operatingSystem}</span>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-neutral-700">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white">Renew Aws Ec2 List</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AgentMigrationCostModal