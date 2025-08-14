import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Progress} from "@/components/ui/progress";
import AgentSystemInfo from "@/types/AgentSystemInfo";
import {
    Server,
} from "lucide-react";
import {useEffect, useState} from "react";
import getStatusIcon from "@/util/icon/GetStatusIcon";
import getStatusColor from "@/util/icon/GetStatusColor";
import getHealthColor from "@/util/icon/GetHealthColor";

interface props {
    props: AgentSystemInfo;
    setSelectedSystemTest: (agentSystemInfo: AgentSystemInfo) => void;
}

const AgentCard = ({props, setSelectedSystemTest}: props) => {
    const [totalDisk, setTotalDisk] = useState(0)
    const [totalUsedDisk, setTotalUsedDisk] = useState(0)

    useEffect(() => {
        const tud  = props.disk.mounts.reduce((totalUsed, d) => totalUsed + d.used_gb, 0)
        const td = props.disk.mounts.reduce((total, d) => total + d.total_gb, 0)

        setTotalDisk(td)
        setTotalUsedDisk(tud)

        console.log(totalDisk, totalUsedDisk)
    }, []);

    return (
        <Card
            key={props.id}
            className="bg-neutral-900 border-neutral-700 hover:border-orange-500/50 transition-colors cursor-pointer"
            onClick={() => setSelectedSystemTest(props)}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Server className="w-6 h-6" />
                        <div>
                            <CardTitle className="text-sm font-bold text-white tracking-wider">{props.name}</CardTitle>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {getStatusIcon(props.status)}
                        <Badge className={getStatusColor(props.status)}>{props.status.toUpperCase()}</Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400">SYSTEM HEALTH</span>
                    <span className={`text-sm font-bold font-mono ${getHealthColor(props.health)}`}>{props.health}%</span>
                </div>
                <Progress value={props.health} className="h-2" />

                <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                        <div className="text-neutral-400 mb-1">CPU</div>
                        <div className="text-white font-mono">vcpu: {props.cpu.vcpus}</div>
                        <div className="text-white font-mono">mhz: {props.cpu.mhz_per_cpu}</div>
                    </div>
                    <div>
                        <div className="text-neutral-400 mb-1">MEMORY</div>
                        <div className="text-white font-mono">{Math.ceil(props.ram.used_mb/props.ram.total_mb *100)}%</div>

                        <div className="w-full bg-neutral-800 rounded-full h-)1 mt-1">
                            <div
                                className="bg-orange-500 h-1 rounded-full transition-all duration-300"
                                style={{ width: `${props.ram.used_mb/props.ram.total_mb *100}%` }}
                            ></div>
                        </div>
                    </div>
                    <div>
                        <div className="text-neutral-400 mb-1">STORAGE</div>
                        <div className="text-white font-mono">{Math.ceil(totalUsedDisk/totalDisk *100)}%</div>
                        <div className="w-full bg-neutral-800 rounded-full h-1 mt-1">
                            <div
                                className="bg-orange-500 h-1 rounded-full transition-all duration-300"
                                style={{ width: `${totalUsedDisk/totalDisk * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default AgentCard