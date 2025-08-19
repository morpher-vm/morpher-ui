import axios from "axios";
import { LoginRequest, LoginResponse } from "@/types/Login";

export async function login({ username, password }: LoginRequest): Promise<LoginResponse> {
  // 실제 API 호출 예시
  // const response = await axios.post("/api/login", { username, password });
  // return response.data;

  // 임시 mock (API spec 나오기 전까지)
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (username === "change" || password === "change") {
    return {
      token: "mock-token-change",
      mustChangePassword: true,
    };
  }
  if (username === "fail") {
    throw new Error("Invalid credentials");
  }
  return {
    token: "mock-token-success",
    mustChangePassword: false,
  };
}
