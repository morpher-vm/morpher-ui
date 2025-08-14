const getStatusColor = (status: string) => {
    switch (status) {
        case "online":
            return "bg-white/20 text-white"
        case "warning":
            return "bg-orange-500/20 text-orange-500"
        case "maintenance":
            return "bg-neutral-500/20 text-neutral-300"
        case "offline":
            return "bg-red-500/20 text-red-500"
        default:
            return "bg-neutral-500/20 text-neutral-300"
    }
}

export default getStatusColor