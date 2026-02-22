"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ fullName, email, password });
    router.push("/login");
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">
      {/* LEFT — EDITORIAL IMAGE */}
      <div className="relative w-full lg:w-[55%] h-[40vh] lg:h-screen overflow-hidden">
        <Image
          src="/nyc1.jpg"
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
              Join Us
            </span>
          </div>
          <h2 className="text-white text-3xl lg:text-5xl font-light leading-tight tracking-tight">
            Discover brands,
            <br />
            <span className="font-semibold">define your look.</span>
          </h2>
        </div>
      </div>

      {/* RIGHT — FORM */}
      <div className="w-full lg:w-[45%] flex items-center justify-center px-6 py-12 lg:py-0 bg-white">
        <div className="w-full max-w-[400px]">
          {/* BRAND HEADER */}
          <div className="mb-10">
            <span className="text-[11px] tracking-[0.35em] uppercase text-neutral-400 font-medium">
              StyleCast
            </span>
            <h1 className="text-[28px] lg:text-[32px] font-semibold text-black mt-2 leading-tight tracking-tight">
              Create account
            </h1>
            <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
              Enter your details to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* FULL NAME */}
            <div className="mb-5">
              <label
                className={`text-xs tracking-wide uppercase transition-colors duration-200 ${
                  focused === "name" ? "text-black" : "text-neutral-400"
                }`}
              >
                Full Name
              </label>
              <input
                value={fullName}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full mt-2 bg-transparent border-b border-neutral-200 focus:border-black pb-3 text-[15px] text-black outline-none transition-colors duration-300 placeholder:text-neutral-300"
                placeholder="Your full name"
              />
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
                placeholder="Create a password"
              />
            </div>

            {/* SIGN UP */}
            <button
              type="submit"
              className="w-full bg-black text-white py-4 text-sm tracking-[0.15em] uppercase font-medium hover:bg-neutral-800 transition-colors duration-300"
            >
              Create Account
            </button>
          </form>

          {/* BRAND INFO */}
          <div className="mt-8 pt-8 border-t border-neutral-100">
            <div className="flex items-start gap-3">
              <div className="w-1 h-10 bg-black rounded-full mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-black tracking-wide uppercase mb-1">
                  Are you a brand?
                </p>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Brands can manage their own storefronts on StyleCast.
                  Apply after creating an account.
                </p>
                <button
                  onClick={() => router.push("/brand-onboarding")}
                  className="text-xs text-black font-medium mt-2 hover:underline underline-offset-4 transition-all"
                >
                  Learn more &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-neutral-400 mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-black font-medium hover:underline underline-offset-4 transition-all"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
