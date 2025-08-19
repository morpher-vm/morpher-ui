interface OSInfo {
    name: string;
    hostname: string;
    version: string;
    kernel_version: string;
}

interface CPUInfo {
    arch: string;
    vcpus: number;
    model: string;
    mhz_per_cpu: number;
}

interface RAMInfo {
    total_mb: number;
    used_mb: number;
    free_mb: number;
}

interface DiskMount {
    mount: string;
    total_gb: number;
    used_gb: number;
    used_percent: number;
}

interface DiskInfo {
    mounts: DiskMount[];
}

interface SystemInfo {
    id: string;
    os: OSInfo;
    cpu: CPUInfo;
    ram: RAMInfo;
    disk: DiskInfo;
}

export default SystemInfo