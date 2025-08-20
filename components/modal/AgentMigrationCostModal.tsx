import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import AgentSystemInfo from "@/types/AgentSystemInfo";
import {Server} from "lucide-react";
import {useEffect, useState} from "react";
import GetAwsEc2Instance from "@/util/axios/GetAwsEc2Instance";
import {GetAwsEc2PriceRequest} from "@/types/request/GetAwsEc2PriceRequest";
import {EC2Instance} from "@/types/EC2Instance";
import Ec2InstanceCard from "@/components/card/Ec2InstanceCard";
import AgentSimpleInfoCard from "@/components/card/AgentSimpleInfoCard";

interface props {
    selectedAgentSystem: AgentSystemInfo
    setSelectedAgentSystem: (agentSystemInfo: null) => void;
}

const AgentMigrationCostModal = ({selectedAgentSystem, setSelectedAgentSystem} : props) => {
    const [ec2List, setEc2List] = useState<EC2Instance[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const test : GetAwsEc2PriceRequest = {
                "region":      "ap-northeast-1",
                "minVCpu":     selectedAgentSystem.cpu.vcpus,
                "minMemoryGB": Math.ceil(selectedAgentSystem.ram.total_mb / 1024),
                "os":          "Linux",
                "maxResults":  10
            }
            const data = await GetAwsEc2Instance(test);
            data.sort((a,b)=> a.pricePerHour - b.pricePerHour)
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
                            <CardTitle className="text-xl font-bold text-white tracking-wider">{selectedAgentSystem.os.hostname}</CardTitle>
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
                        { selectedAgentSystem && <AgentSimpleInfoCard agentSystemInfo={selectedAgentSystem} />}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="space-y-3">
                                <div>
                                    <Card className="bg-neutral-900 border-neutral-700">
                                        <CardHeader>
                                            <CardTitle className="text-orange-500 flex items-center gap-2">
                                                <Server className="w-5 h-5" />
                                                AWS EC2 INSTANCE LIST
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                                                {
                                                    ec2List && ec2List.map((instance, key) =>
                                                        <Ec2InstanceCard key={key} ec2Instance={instance} />)
                                                }
                                            </div>
                                        </CardContent>
                                    </Card>
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