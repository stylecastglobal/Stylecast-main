"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    // ✅ UI 확인용 (백엔드 없음)
    console.log({ email, password });

    // 임시 이동 (나중에 role별로 바꿀 예정)
    router.push("/account");
  };

  const googleLogin = () => {
    console.log("Google login (UI only)");

    // 임시 이동
    router.push("/account");
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 py-10">
      <div className="flex flex-col md:flex-row bg-white rounded-[40px] shadow-xl overflow-hidden w-full max-w-6xl">
        {/* LEFT IMAGE */}
        <div className="relative w-full md:w-1/2 p-6">
          <div className="relative w-full h-full rounded-[40px] overflow-hidden">
            <Image
              src="/london1.jpg"
              alt="London"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 p-10 md:p-14 flex items-center">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-semibold mb-3">
              Sign in to StyleCast
            </h1>

            <p className="text-gray-700 mb-8 text-[15px]">
              Shopping or managing your brand, everything starts here.
            </p>

            {/* EMAIL */}
            <label className="font-semibold text-black">Email</label>
            <input
              type="email"
              className="w-full mt-1 mb-5 bg-[#e6e6e6] rounded-[40px] px-5 py-3.5"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* PASSWORD */}
            <label className="font-semibold text-black">Password</label>
            <input
              type="password"
              className="w-full mt-1 mb-4 bg-[#e6e6e6] rounded-[40px] px-5 py-3.5"
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* SIGN IN */}
            <button
              onClick={login}
              className="w-full bg-black text-white py-3.5 rounded-[40px] text-[17px] font-medium mb-5"
            >
              Sign In
            </button>

            {/* GOOGLE SIGN IN */}
            <button
              onClick={googleLogin}
              className="w-full bg-white border border-[#d6d6d6] py-3.5 rounded-[40px] flex items-center justify-center gap-3 text-[17px] font-medium hover:bg-gray-100"
            >
              <Image src="/google.png" width={22} height={22} alt="Google" />
              Sign in with Google
            </button>

            {/* SIGN UP LINK */}
            <p className="text-center text-sm mt-6">
              Don’t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
