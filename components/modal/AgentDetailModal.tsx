import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import AgentSystemInfo from "@/types/AgentSystemInfo";
import {Server} from "lucide-react";
import {useEffect, useState} from "react";

interface props {
    selectedSystemTest: AgentSystemInfo
    setSelectedSystemTest: (agentSystemInfo: null) => void;
}

const AgentDetailModal = ({selectedSystemTest, setSelectedSystemTest} : props) => {

    const [totalDisk, setTotalDisk] = useState(0)
    const [totalUsedDisk, setTotalUsedDisk] = useState(0)

    useEffect(() => {
        const tud  = selectedSystemTest.disk.mounts.reduce((totalUsed, d) => totalUsed + d.used_gb, 0)
        const td = selectedSystemTest.disk.mounts.reduce((total, d) => total + d.total_gb, 0)

        setTotalDisk(td)
        setTotalUsedDisk(tud)

        console.log(totalDisk, totalUsedDisk)
    }, []);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="bg-neutral-900 border-neutral-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Server className="w-6 h-6" />
                        <div>
                            <CardTitle className="text-xl font-bold text-white tracking-wider">{selectedSystemTest.name}</CardTitle>
                            <p className="text-sm text-neutral-400">
                                {selectedSystemTest.id}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => setSelectedSystemTest(null)}
                        className="text-neutral-400 hover:text-white"
                    >
                        ✕
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">SYSTEM INFORMATION</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex flex-col justify-between">
                                        <h2 className="text-neutral-400">OS</h2>
                                        <div className="pl-3">
                                            <div className="flex justify-between">
                                                <span className="text-white">name</span>
                                                <span className="text-white">{selectedSystemTest.os.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-white">version</span>
                                                <span className="text-white">{selectedSystemTest.os.version}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-white">kernel version</span>
                                                <span className="text-white">{selectedSystemTest.os.kernel_version}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <h2 className="text-neutral-400">CPU</h2>
                                        <div className="pl-3">
                                            <div className="flex justify-between">
                                                <span className="text-white">arch</span>
                                                <span className="text-white">{selectedSystemTest.cpu.arch}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-white">vcpus</span>
                                                <span className="text-white">{selectedSystemTest.cpu.vcpus}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-white">model</span>
                                                <span className="text-white">{selectedSystemTest.cpu.model}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-white">mhz per cpu</span>
                                                <span className="text-white">{selectedSystemTest.cpu.mhz_per_cpu}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <h2 className="text-neutral-400">RAM</h2>
                                        <div className="pl-3">
                                            <div className="flex justify-between">
                                                <span className="text-white">total MB</span>
                                                <span className="text-white">{selectedSystemTest.ram.total_mb}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-white">used MB</span>
                                                <span className="text-white">{selectedSystemTest.ram.used_mb}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-white">free MB</span>
                                                <span className="text-white">{selectedSystemTest.ram.free_mb}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <h2 className="text-neutral-400">DISK</h2>
                                        <div className="pl-3">
                                            {selectedSystemTest.disk.mounts.map(((mount, key) =>
                                                <div key={key}>
                                                    <span className="text-white">Mount: {mount.mount}</span>
                                                    <div className="pl-3 flex justify-between">
                                                        <span className="text-white">total GB</span>
                                                        <span className="text-white">{mount.total_gb}</span>
                                                    </div>
                                                    <div className="pl-3 flex justify-between">
                                                        <span className="text-white">used GB</span>
                                                        <span className="text-white">{mount.used_gb}</span>
                                                    </div>
                                                    <div className="pl-3 flex justify-between">
                                                        <span className="text-white">used percent</span>
                                                        <span className="text-white">{mount.used_percent}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-neutral-400">Health Score:</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">RESOURCE USAGE</h3>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-neutral-400">CPU Usage</span>
                                            <div className="text-white font-mono">vcpu: {selectedSystemTest.cpu.vcpus}</div>
                                            <div className="text-white font-mono">mhz: {selectedSystemTest.cpu.mhz_per_cpu}</div>
                                        </div>
                                        <div className="w-full bg-neutral-800 rounded-full h-2">
                                            <div
                                                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${selectedSystemTest.cpu}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-neutral-400">Memory Usage</span>
                                            <span className="text-white font-mono">{Math.ceil(selectedSystemTest.ram.used_mb/selectedSystemTest.ram.total_mb *100)}%</span>
                                        </div>
                                        <div className="w-full bg-neutral-800 rounded-full h-2">
                                            <div
                                                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${selectedSystemTest.ram.used_mb/selectedSystemTest.ram.total_mb *100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-neutral-400">Storage Usage</span>
                                            <span className="text-white font-mono">{Math.ceil(totalUsedDisk/totalDisk *100)}%</span>
                                        </div>
                                        <div className="w-full bg-neutral-800 rounded-full h-2">
                                            <div
                                                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${totalUsedDisk/totalDisk * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-neutral-700">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white">Restart System</Button>
                        <Button
                            variant="outline"
                            className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                        >
                            View Logs
                        </Button>
                        <Button
                            variant="outline"
                            className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                        >
                            Schedule Maintenance
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AgentDetailModal