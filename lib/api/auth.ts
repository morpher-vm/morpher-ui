import { LoginRequest, LoginResponse } from "@/types/Login";
import axios from "axios";

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function login({
  username,
  password,
}: LoginRequest): Promise<LoginResponse> {
  const response = await axios.post(`${SERVER_URL}/api/sign-in`, {
    username,
    password,
  });
  return response.data;
}
