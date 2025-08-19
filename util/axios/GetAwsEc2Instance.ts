import axios from "axios";
import {GetAwsEc2PriceRequest} from "@/types/request/GetAwsEc2PriceRequest";
import {EC2Instance} from "@/types/EC2Instance";

const GetAwsEc2Instance = async (requestBody: GetAwsEc2PriceRequest) => {
    const REQUEST_URL = "http://localhost:9000/api/v1/aws/ec2"

    const response = await axios.post(REQUEST_URL, requestBody)
    const data: EC2Instance[] = response.data.result

    return data
}

export default GetAwsEc2Instance