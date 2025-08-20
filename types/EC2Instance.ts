export interface EC2Instance {
    instanceType: string;
    vcpu: string;
    memory: string;
    storage: string;
    networkPerformance: string;
    pricePerHour: number;
    description: string;
    location: string;
    operatingSystem: string;
}