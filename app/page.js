"use client"
import { Button } from "@/components/ui/button";
import React from "react";
import Header from "./dashboard/_components/Header";
import Image from "next/image";
import Footer from "./dashboard/_components/Footer"; 
import Link from "next/link";
export default function Home() {
  return (
    <div>
     <Header/>
     <section className="intro bg-homepage flex flex-col items-center justify-center min-h-screen text-center px-4">
     <h1 className="black-text text-3xl font-bold">AI Room and</h1>
        <h2>
          <span className="purple-text text-4xl font-semibold">Home Interior Design</span>
        </h2>
          <p className="description mb-8">
            Transform your space with AI: Effortless Room and Home Interior Design at your fingertips.
          </p>
          <Link href="/dashboard">
          <Button className="flex justify-center items-center text-center py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition mb-8">
            Get Started
          </Button>
          </Link>
          <div className="image-container flex flex-row gap-8 items-center">
            <Image
              src="/empty-interior-room.jpg"
              width={400}
              height={400}
              alt="Normal Room"
              className="rounded-lg shadow-lg"
            />
              <Image
              src="/arrowF.png"
              width={200}
              height={200}
              alt="Normal Room"
              className="rounded-lg "
            />
            <Image
              src="/aiImage.png" // Replace with your second image URL
              width={400}
              height={400}
              alt="AI Integrated Room"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>
        <Footer/>
    </div>
  );
}
