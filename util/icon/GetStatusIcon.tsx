import {Activity, AlertTriangle, CheckCircle, Settings} from "lucide-react";

const getStatusIcon = (status: string) => {
    switch (status) {
        case "online":
            return <CheckCircle className="w-4 h-4" />
        case "warning":
            return <AlertTriangle className="w-4 h-4" />
        case "maintenance":
            return <Settings className="w-4 h-4" />
        case "offline":
            return <AlertTriangle className="w-4 h-4" />
        default:
            return <Activity className="w-4 h-4" />
    }
}

export default getStatusIcon