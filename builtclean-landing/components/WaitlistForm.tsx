"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

interface WaitlistFormProps {
  buttonText?: string;
}

export default function WaitlistForm({
  buttonText = "Get early access",
}: WaitlistFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    setServerMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setServerMessage(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerMessage("Network error. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 py-4 px-6 rounded-full border border-[#2a2a2a] bg-[#111]">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="10" fill="#4ade80" fillOpacity="0.15" />
          <path
            d="M6 10l3 3 5-5"
            stroke="#4ade80"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-sm text-white">
          You&apos;re on the list! We&apos;ll be in touch.
        </span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email address"
            disabled={status === "loading"}
            autoComplete="email"
            className="flex-1 h-12 px-5 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-[#444] text-sm outline-none focus:border-[#444] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="h-12 px-6 rounded-full bg-white text-black text-sm font-semibold whitespace-nowrap hover:bg-[#e5e5e5] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
          >
            {status === "loading" ? (
              <>
                <svg
                  className="animate-spin"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="7"
                    cy="7"
                    r="5.5"
                    stroke="currentColor"
                    strokeOpacity="0.3"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M7 1.5A5.5 5.5 0 0112.5 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Joining...
              </>
            ) : (
              buttonText
            )}
          </button>
        </div>
      </form>

      {(errors.email || (status === "error" && serverMessage)) && (
        <p className="mt-2 ml-4 text-xs" style={{ color: "#f87171" }}>
          {errors.email?.message || serverMessage}
        </p>
      )}
    </div>
  );
}
