"use client";
import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Image
        src="/atxlogo.png"
        alt="ATX Logo"
        width={400}
        height={400}
        className="mb-8"
      />
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to AtxExpert
      </h1>
      <p className="text-gray-600 mb-8">Press to continue</p>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-full flex items-center"
        onClick={() => (window.location.href = "/sign-in")}
      >
        Continue
        <ArrowRight className="ml-2" />
      </button>
    </div>
  );
}

export default Hero;
