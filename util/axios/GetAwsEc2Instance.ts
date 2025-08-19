import axios from "axios";
import {GetAwsEc2PriceRequest} from "@/types/request/GetAwsEc2PriceRequest";
import {EC2Instance} from "@/types/EC2Instance";

const GetAwsEc2Instance = async (requestBody: GetAwsEc2PriceRequest) => {
    const REQUEST_URL = process.env.AWS_EC2_API_URL || "http://localhost:9000/api/v1/aws/ec2"

    try {
        const response = await axios.post(REQUEST_URL, requestBody)
        const data: EC2Instance[] = response.data.result

        return data
    } catch (error) {
        throw new Error("Failed to fetch AWS EC2 instances: " + (error instanceof Error ? error.message : String(error)));
    }
}

export default GetAwsEc2Instance