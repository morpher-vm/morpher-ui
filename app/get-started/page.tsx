"use client";

import { useAuthGuard } from "@/lib/useAuthGuard";
import {Check, Copy, Monitor, Target} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useState} from "react";

export default function GetStartedPage() {
  useAuthGuard();

  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCommand(text)
      setTimeout(() => setCopiedCommand(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const steps = [
    {
      id: 1,
      title: "Install Morpher agent",
      command: [
          {
              type: "x86_64",
              cmd: `wget -O install_amd64.sh https://raw.githubusercontent.com/morpher-vm/morpher-agent/main/scripts/install_amd64.sh
chmod +x install_amd64.sh  
sudo MORPHER_CONTROLLER_IP=<controller-ip> ./install_amd64.sh`
          },
          {
              type: "ARM64",
              cmd: `wget -O install_arm64.sh https://raw.githubusercontent.com/morpher-vm/morpher-agent/main/scripts/install_arm64.sh
chmod +x install_arm64.sh
sudo MORPHER_CONTROLLER_IP=<controller-ip> ./install_arm64.sh`
          },
          {
              type: "Verify",
              cmd: `systemctl status morpher-agent --no-pager
journalctl -u morpher-agent -e --no-pager`
          }
      ],
      description: "Follow these steps to install morpher",
      icon: Monitor
    },
    {
          id: 2,
          title: "Service Management",
          command: `sudo systemctl start morpher-agent
sudo systemctl enable morpher-agent
sudo systemctl status morpher-agent
sudo journalctl -u morpher-agent -f`,
          description: "Service management command",
          icon: Monitor
    },
    {
          id: 3,
          title: "Delete agent",
          command: `sudo systemctl disable --now morpher-agent
sudo rm -f /etc/systemd/system/morpher-agent.service
sudo rm -rf /etc/morpher-agent
sudo rm -f /usr/local/bin/morpher-agent
sudo systemctl daemon-reload`,
          description: "Delete agent command",
          icon: Monitor
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">
            GET STARTED
          </h1>
          <p className="text-sm text-neutral-400">
            Get started with Morpher
          </p>
        </div>
      </div>

      {/* System Overview Stats */}
      <div className="grid gap-6">
        {
          steps.map((item, key) =>
            <Card key={key} className="bg-gray-900/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-orange-500 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  {item.id}. {item.title}
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>

                    {
                        Array.isArray(item.command) ? item.command.map((cmd, key) =>
                            <div key={key} className="mb-5">
                                <span className={"text-white"}>{cmd.type}</span>
                                <div className={"flex justify-between items-center gap-2 bg-black/50 rounded p-3 border border-gray-700/50"}>
                                    <code className={"whitespace-pre-line text-green-500"}>
                                        {
                                            cmd.cmd
                                        }
                                    </code>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0 hover:bg-orange-500/20"
                                        onClick={() => copyToClipboard(cmd.cmd)}
                                    >
                                        {copiedCommand === cmd.cmd ? (
                                            <Check className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <Copy className="w-4 h-4 text-gray-400" />
                                        )}
                                    </Button>
                                </div>
                            </div>) : <div>
                            <div className={"flex justify-between items-center gap-2 bg-black/50 rounded p-3 border border-gray-700/50"}>
                                <code className={"whitespace-pre-line text-green-500"}>
                                    {
                                        item.command
                                    }
                                </code>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 hover:bg-orange-500/20"
                                    onClick={() => {
                                        if (typeof item.command === "string") {
                                            copyToClipboard(item.command);
                                        } else {
                                            console.warn("Attempted to copy a non-string command:", item.command);
                                        }}
                                    }
                                >
                                    {typeof item.command === "string" && copiedCommand === item.command ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-gray-400" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    }
              </CardContent>
            </Card>
          )
        }
      </div>
    </div>
  );
}