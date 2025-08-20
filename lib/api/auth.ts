import { LoginRequest, LoginResponse } from "@/types/Login";
import axios from "axios";

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function login({
  username,
  password,
}: LoginRequest): Promise<LoginResponse> {
  // TODO: Remove this temporary logic when backend server is ready
  if (!SERVER_URL && username === "admin" && password === "admin") {
    return {
      token: "dev-admin-token",
      mustChangePassword: false,
    };
  }
  const response = await axios.post(`${SERVER_URL}/api/sign-in`, {
    username,
    password,
  });
  return response.data;
}

export async function changePassword(newPassword: string): Promise<void> {
  const token = localStorage.getItem("token");

  await axios.post(
    `${SERVER_URL}/api/change-password`,
    { newPassword },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}
