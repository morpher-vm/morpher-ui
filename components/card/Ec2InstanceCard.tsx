import {EC2Instance} from "@/types/EC2Instance";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Cpu, HardDrive, Server, Zap} from "lucide-react";

interface props {
    ec2Instance: EC2Instance;
}

const Ec2InstanceCard = ({ec2Instance}: props) => {

    return (
        <>
            <Card
                key={ec2Instance.instanceType}
                className="bg-neutral-800 border-neutral-700 hover:border-orange-500/50 transition-all"
            >
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-orange-500 text-lg">{ec2Instance.instanceType}</CardTitle>
                        <div className="text-right">
                            <div className="text-white font-bold">${ec2Instance.pricePerHour}/hr</div>
                            <div className="text-xs text-neutral-400">On-Demand</div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Cpu className="w-4 h-4 text-orange-400" />
                            <div>
                                <div className="text-white font-medium">{ec2Instance.vcpu} vCPU</div>
                                <div className="text-xs text-neutral-400">Virtual Processors</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Server className="w-4 h-4 text-orange-400" />
                            <div>
                                <div className="text-white font-medium">{ec2Instance.memory}</div>
                                <div className="text-xs text-neutral-400">Memory (RAM)</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <HardDrive className="w-4 h-4 text-orange-400" />
                            <div>
                                <div className="text-white font-medium">{ec2Instance.storage}</div>
                                <div className="text-xs text-neutral-400">Storage</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Zap className="w-4 h-4 text-orange-400" />
                            <div>
                                <div className="text-white font-medium">{ec2Instance.networkPerformance}</div>
                                <div className="text-xs text-neutral-400">Network Performance</div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-neutral-700 pt-3">
                        <div className="text-xs text-neutral-400 mb-2">Cost Estimates</div>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-neutral-300">Daily:</span>
                                <span className="text-white">${(ec2Instance.pricePerHour * 24).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-neutral-300">Monthly:</span>
                                <span className="text-white">${(ec2Instance.pricePerHour * 24*30).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-neutral-300">Yearly:</span>
                                <span className="text-orange-400 font-medium">
                          ${(ec2Instance.pricePerHour * 24*30*12).toFixed(0)}
                        </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">{ec2Instance.operatingSystem}</div>
                        <div className="text-xs text-neutral-500">{ec2Instance.location}</div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default Ec2InstanceCard