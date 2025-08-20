"use client";

import AgentMigrationCostModal from "@/components/modal/AgentMigrationCostModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthGuard } from "@/lib/useAuthGuard";
import AgentSystemInfoStore from "@/store/AgentSystemInfoStore";
import AgentSystemInfo from "@/types/AgentSystemInfo";
import { Filter, Search, Shield } from "lucide-react";
import { useState } from "react";

export default function AgentNetworkPage() {
  useAuthGuard();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<AgentSystemInfo | null>(
    null
  );
  const { agentSystemInfoList } = AgentSystemInfoStore();

  const filteredAgents = agentSystemInfoList.filter(
    (agent) =>
      agent.os.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showDetail = () => {};
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">
            AGENT NETWORK
          </h1>
          <p className="text-sm text-neutral-400">
            Manage and monitor field operatives
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Deploy Agent
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="lg:col-span-1 bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">
                  ACTIVE AGENTS
                </p>
                <p className="text-2xl font-bold text-white font-mono">847</p>
              </div>
              <Shield className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">
                  COMPROMISED
                </p>
                <p className="text-2xl font-bold text-red-500 font-mono">3</p>
              </div>
              <Shield className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">
                  IN TRAINING
                </p>
                <p className="text-2xl font-bold text-orange-500 font-mono">
                  23
                </p>
              </div>
              <Shield className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent List */}
      <Card className="bg-neutral-900 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
            AGENT ROSTER
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">
                    AGENT ID
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">
                    NAME
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">
                    OS
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">
                    VCPU
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">
                    RAM
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">
                    DETAIL
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents &&
                  filteredAgents.map((agent, index) => (
                    <tr
                      key={agent.id}
                      className={`border-b border-neutral-800 hover:bg-neutral-800 transition-colors cursor-pointer ${
                        index % 2 === 0 ? "bg-neutral-900" : "bg-neutral-850"
                      }`}
                      onClick={() => setSelectedAgent(agent)}
                    >
                      <td className="py-3 px-4 text-sm text-white font-mono">
                        {agent.id}
                      </td>
                      <td className="py-3 px-4 text-sm text-white">
                        {agent.os.hostname}
                      </td>
                      <td className="py-3 px-4 text-sm text-white">
                        {agent.os.name}({agent.os.version})
                      </td>
                      <td className="py-3 px-4 text-sm text-white">
                        {agent.cpu.vcpus}
                      </td>
                      <td className="py-3 px-4 text-sm text-white">
                        {agent.ram.total_mb / 1024} GB
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => showDetail()}
                          className="text-neutral-400 hover:text-orange-500"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/*  Modal */}
      {selectedAgent && (
        <AgentMigrationCostModal
          selectedAgentSystem={selectedAgent}
          setSelectedAgentSystem={setSelectedAgent}
        />
      )}
    </div>
  );
}
