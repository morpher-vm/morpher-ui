export interface GetAwsEc2PriceRequest {
    "region":      string,
    "minVCpu":     number,
    "minMemoryGB": number,
    "os":          string,
    "maxResults":  number
}