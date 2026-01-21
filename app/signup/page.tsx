"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // ✅ UI 확인용: 실제 회원가입 안 함
    console.log({ fullName, email, password });

    // 👉 임시 이동 (나중에 팀원이 백엔드 연결)
    router.push("/login");
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      <Image
        src="/nyc1.jpg"
        alt="NYC Background"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-[90%] max-w-4xl bg-black/30 rounded-[40px] px-6 md:px-12 py-12 md:py-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl mx-auto text-white"
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-center mb-3">
            Welcome to StyleCast
          </h1>

          <p className="text-center text-gray-200 mb-10">
            Enter your details to create your account
          </p>

          <div className="mb-5">
            <label className="block mb-2 font-semibold">Full Name</label>
            <input
              className="w-full bg-[#E6E6E6] text-black rounded-[40px] px-6 py-4"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              className="w-full bg-[#E6E6E6] text-black rounded-[40px] px-6 py-4"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold">Password</label>
            <input
              type="password"
              className="w-full bg-[#E6E6E6] text-black rounded-[40px] px-6 py-4"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-[40px] text-lg font-medium"
          >
            Sign Up
          </button>

          {/* BRAND INFO */}
<div className="mt-8 text-center text-sm text-gray-200">
  <p className="mb-2 font-medium">Are you a brand?</p>
  <p className="opacity-80">
    Brands can manage their own storefronts on StyleCast.
    <br />
    You can apply as a brand after creating an account.
  </p>

  <span
    className="inline-block mt-3 underline cursor-pointer"
    onClick={() => router.push("/brand-onboarding")}
  >
    Learn more
  </span>
</div>


          <p className="text-center text-sm text-gray-200 mt-4">
            Already have an account?{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
