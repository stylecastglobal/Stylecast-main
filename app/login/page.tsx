"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const login = () => {
    console.log({ email, password });
    router.push("/account");
  };

  const googleLogin = () => {
    console.log("Google login (UI only)");
    router.push("/account");
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">
      {/* LEFT — EDITORIAL IMAGE */}
      <div className="relative w-full lg:w-[55%] h-[40vh] lg:h-screen overflow-hidden">
        <Image
          src="/london1.jpg"
          alt="Editorial"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-white/70" />
            <span className="text-white/70 text-xs tracking-[0.3em] uppercase">
              Welcome Back
            </span>
          </div>
          <h2 className="text-white text-3xl lg:text-5xl font-light leading-tight tracking-tight">
            Your style,
            <br />
            <span className="font-semibold">your story.</span>
          </h2>
        </div>
      </div>

      {/* RIGHT — FORM */}
      <div className="w-full lg:w-[45%] flex items-center justify-center px-6 py-12 lg:py-0 bg-white">
        <div className="w-full max-w-[400px]">
          {/* LOGO / BRAND */}
          <div className="mb-10">
            <span className="text-[11px] tracking-[0.35em] uppercase text-neutral-400 font-medium">
              StyleCast
            </span>
            <h1 className="text-[28px] lg:text-[32px] font-semibold text-black mt-2 leading-tight tracking-tight">
              Sign in
            </h1>
            <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
              Shopping or managing your brand, everything starts here.
            </p>
          </div>

          {/* EMAIL */}
          <div className="mb-5">
            <label
              className={`text-xs tracking-wide uppercase transition-colors duration-200 ${
                focused === "email" ? "text-black" : "text-neutral-400"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 bg-transparent border-b border-neutral-200 focus:border-black pb-3 text-[15px] text-black outline-none transition-colors duration-300 placeholder:text-neutral-300"
              placeholder="your@email.com"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-8">
            <label
              className={`text-xs tracking-wide uppercase transition-colors duration-200 ${
                focused === "password" ? "text-black" : "text-neutral-400"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 bg-transparent border-b border-neutral-200 focus:border-black pb-3 text-[15px] text-black outline-none transition-colors duration-300 placeholder:text-neutral-300"
              placeholder="Enter your password"
            />
          </div>

          {/* SIGN IN */}
          <button
            onClick={login}
            className="w-full bg-black text-white py-4 text-sm tracking-[0.15em] uppercase font-medium hover:bg-neutral-800 transition-colors duration-300"
          >
            Sign In
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-[1px] bg-neutral-200" />
            <span className="text-[11px] text-neutral-400 tracking-wider uppercase">or</span>
            <div className="flex-1 h-[1px] bg-neutral-200" />
          </div>

          {/* GOOGLE SIGN IN */}
          <button
            onClick={googleLogin}
            className="w-full border border-neutral-200 py-3.5 flex items-center justify-center gap-3 text-sm font-medium text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-300"
          >
            <Image src="/google.png" width={18} height={18} alt="Google" />
            Continue with Google
          </button>

          {/* SIGN UP LINK */}
          <p className="text-center text-sm text-neutral-400 mt-10">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-black font-medium hover:underline underline-offset-4 transition-all"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
