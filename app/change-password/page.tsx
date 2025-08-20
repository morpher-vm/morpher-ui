"use client";

import { Button } from "@/components/ui/button";
import { useAuthGuard } from "@/lib/useAuthGuard";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { changePassword } from "@/lib/api/auth";

export default function ChangePasswordPage() {
  useAuthGuard();
  const router = useRouter();

  // -----------------------------
  // State Management
  // -----------------------------
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPasswordGuide, setShowPasswordGuide] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const mustChange = localStorage.getItem("mustChangePassword");
    if (mustChange !== "true") {
      router.replace("/agent-dashboard");
    }
  }, [router]);

  // -----------------------------
  // Password Validation Rules
  // -----------------------------
  const passwordRules = [
    {
      label: "At least 12 characters",
      valid: newPassword.length >= 12,
    },
    {
      label: "At least one uppercase letter",
      valid: /[A-Z]/.test(newPassword),
    },
    {
      label: "At least one lowercase letter",
      valid: /[a-z]/.test(newPassword),
    },
    {
      label: "At least one number",
      valid: /[0-9]/.test(newPassword),
    },
    {
      label: "At least one special character",
      valid: /[!@#$%^&*()_\-+=\[{\]};:'\",<.>/?\\|]/.test(newPassword),
    },
  ];

  // -----------------------------
  // Form Submission Handler
  // -----------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const firstInvalid = passwordRules.find((r) => !r.valid);
    if (firstInvalid) {
      setError("Password does not meet security requirements.");
      return;
    }

    // TODO: Replace with actual password update API call
    try {
      await changePassword(newPassword);
      localStorage.setItem("mustChangePassword", "false");
      router.push("/agent-dashboard");
    } catch (err: any) {
      setError(err.message || "Password change failed");
      return;
    }
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-neutral-900 border border-neutral-700 rounded-xl p-8 shadow-lg flex flex-col gap-4 relative">
        {/* Morpher VM Logo */}
        <div className="flex justify-center">
          <Image
            src="/logo.svg"
            alt="Morpher VM Logo"
            width={160}
            height={40}
            priority
          />
        </div>

        {/* Page Title and Description */}
        <div className="flex flex-col gap-2 items-start w-full">
          <h2 className="text-white text-xl font-bold">Change Your Password</h2>
          <p className="text-left text-sm text-neutral-300 leading-relaxed max-w-sm">
            For security reasons,
            <br />
            you must change your password
            <br />
            before accessing your dashboard.
          </p>
        </div>

        {/* Password Change Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* New Password Input */}
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="newPassword" className="text-sm text-neutral-400">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              ref={inputRef}
              value={newPassword}
              onFocus={() => setShowPasswordGuide(true)}
              onBlur={() => setShowPasswordGuide(false)}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="h-10 px-4 rounded-md bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            {/* Password Requirements Tooltip */}
            {showPasswordGuide && (
              <div className="absolute left-full ml-2 top-0 bg-neutral-800 border border-neutral-700 rounded-md p-4 z-10 shadow-md text-sm w-64">
                <p className="text-neutral-300 font-semibold mb-2">
                  Password must include:
                </p>
                <ul className="space-y-1 text-sm">
                  {[
                    {
                      label: "12+ characters",
                      valid: newPassword.length >= 12,
                    },
                    {
                      label: "Uppercase letter (A–Z)",
                      valid: /[A-Z]/.test(newPassword),
                    },
                    {
                      label: "Lowercase letter (a–z)",
                      valid: /[a-z]/.test(newPassword),
                    },
                    { label: "Number (0–9)", valid: /[0-9]/.test(newPassword) },
                    {
                      label: "Special character (!@#)",
                      valid: /[!@#$%^&*()_\-+=\[{\]};:'\",<.>/?\\|]/.test(
                        newPassword
                      ),
                    },
                  ].map((rule, idx) => (
                    <li
                      key={idx}
                      className={clsx(
                        "flex items-center gap-2",
                        rule.valid ? "text-green-400" : "text-neutral-400"
                      )}
                    >
                      <span className="text-lg">•</span>
                      <span>{rule.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="confirmPassword"
              className="text-sm text-neutral-400"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="h-10 px-4 rounded-md bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Submit Button */}
          <Button
            type="submit"
            className="h-10 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
          >
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
}
