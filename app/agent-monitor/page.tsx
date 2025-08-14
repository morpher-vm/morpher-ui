"use client"

import { useState} from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Settings,
} from "lucide-react"
import AgentCard from "@/components/card/AgentCard";
import AgentSystemInfo from "@/types/AgentSystemInfo";
import AgentDetailModal from "@/components/modal/AgentDetailModal";

export default function AgentMonitorPage() {
  const [selectedSystem, setSelectedSystem] = useState<AgentSystemInfo|null>(null)

  const mockSystemInfo: AgentSystemInfo = {
    id: "testId01",
    name: "testName",
    status: "online",
    health: 100,
    "os": {
      "name": "Darwin",
      "version": "15.6",
      "kernel_version": "24.6.0"
    },
    "cpu": {
      "arch": "arm64",
      "vcpus": 10,
      "model": "Apple M4",
      "mhz_per_cpu": 4
    },
    "ram": {
      "total_mb": 24576,
      "used_mb": 13578,
      "free_mb": 10997
    },
    "disk": {
      "mounts": [
        {
          "mount": "/",
          "total_gb": 460.4,
          "used_gb": 74.4,
          "used_percent": 16.2
        },
        {
          "mount": "/System/Volumes/VM",
          "total_gb": 460.4,
          "used_gb": 74.4,
          "used_percent": 16.2
        },
        {
          "mount": "/System/Volumes/Preboot",
          "total_gb": 460.4,
          "used_gb": 74.4,
          "used_percent": 16.2
        },
        {
          "mount": "/System/Volumes/Update",
          "total_gb": 460.4,
          "used_gb": 74.4,
          "used_percent": 16.2
        },
        {
          "mount": "/System/Volumes/xarts",
          "total_gb": 0.5,
          "used_gb": 0,
          "used_percent": 3.6
        },
        {
          "mount": "/System/Volumes/iSCPreboot",
          "total_gb": 0.5,
          "used_gb": 0,
          "used_percent": 3.6
        },
        {
          "mount": "/System/Volumes/Hardware",
          "total_gb": 0.5,
          "used_gb": 0,
          "used_percent": 3.6
        },
        {
          "mount": "/System/Volumes/Data",
          "total_gb": 460.4,
          "used_gb": 74.4,
          "used_percent": 16.2
        }
      ]
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">AGENTS MONITOR</h1>
          <p className="text-sm text-neutral-400">Infrastructure health and performance monitoring</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">System Scan</Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">Maintenance Mode</Button>
        </div>
      </div>

      {/* System Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">SYSTEMS ONLINE</p>
                <p className="text-2xl font-bold text-white font-mono">24/26</p>
              </div>
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">WARNINGS</p>
                <p className="text-2xl font-bold text-orange-500 font-mono">3</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">AVG UPTIME</p>
                <p className="text-2xl font-bold text-white font-mono">99.7%</p>
              </div>
              <Activity className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">MAINTENANCE</p>
                <p className="text-2xl font-bold text-neutral-300 font-mono">1</p>
              </div>
              <Settings className="w-8 h-8 text-neutral-300" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Systems Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AgentCard props={mockSystemInfo} setSelectedSystemTest={setSelectedSystem}/>
      </div>

      {/* System Detail Modal */}
      {
        selectedSystem && <AgentDetailModal
              selectedSystemTest={selectedSystem}
              setSelectedSystemTest={setSelectedSystem}
          />
      }
    </div>
  )
}
