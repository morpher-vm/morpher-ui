"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/lib/api/auth";
import { LoginRequest } from "@/types/Login";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSecretModal, setShowSecretModal] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const req: LoginRequest = { username, password };
      const res = await login(req);
      localStorage.setItem("token", res.token);
      localStorage.setItem("mustChangePassword", JSON.stringify(res.mustChangePassword));
      if (res.mustChangePassword) {
        router.push("/change-password");
      } else {
        router.push("/agent-dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-neutral-900 border border-neutral-700 rounded-xl p-8 shadow-lg flex flex-col gap-4 relative">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/logo.svg"
            alt="Morpher VM Logo"
            width={160}
            height={40}
            priority
          />
        </div>

        {/* Welcome Text */}
        <div className="flex flex-col gap-2 items-start w-full">
          <h2 className="text-white text-xl font-bold">
            Welcome to Morpher-VM!
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Sign in to access your
            <br />
            virtual machine operations dashboard.
          </p>
        </div>

        {/* Login Form */}
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm text-neutral-400">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
              className="h-10 px-4 rounded-md bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-neutral-400">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="h-10 px-4 rounded-md bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            className="h-10 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Credential Hint Link */}
        <div className="text-sm text-center text-neutral-400">
          Forgot your{" "}
          <button
            type="button"
            className="text-orange-500 hover:underline"
            onClick={() => setShowSecretModal(true)}
          >
            credentials?
          </button>
        </div>

        {/* Credential Recovery Modal */}
        {showSecretModal && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 w-full max-w-md space-y-4 shadow-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-white text-lg font-semibold">
                  Retrieve your credentials
                </h2>
                <button
                  onClick={() => setShowSecretModal(false)}
                  className="text-neutral-400 hover:text-white text-lg"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-neutral-300">
                If you've forgotten your login ID or password, and you've
                already installed the morpher agent inside the VMware instance,
                run the following command:
              </p>

              <pre className="bg-neutral-800 text-white px-4 py-2 rounded-md text-xs overflow-x-auto">
                morpher-agent secret --instance-id $(hostname)
              </pre>

              <p className="text-sm text-neutral-400">
                This will print the credentials for this VM instance. Make sure
                to keep them secure.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
