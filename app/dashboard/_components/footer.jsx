// components/Footer.jsx
"use client";
import React from "react";
import { FaUpload, FaPaintBrush, FaDownload, FaHeadset } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto flex flex-wrap justify-between px-4">
        <div className="footer-section flex flex-col items-center text-center mb-8">
          <FaUpload className="text-4xl mb-4" />
          <h4 className="text-lg font-semibold mb-2">Upload</h4>
          <p className="text-sm">Upload your room images to start designing.</p>
          <Link href="/dashboard">
            <Button className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="footer-section flex flex-col items-center text-center mb-8">
          <FaPaintBrush className="text-4xl mb-4" />
          <h4 className="text-lg font-semibold mb-2">Select Design</h4>
          <p className="text-sm">Choose a design that suits your space.</p>
          <Link href="/dashboard">
            <Button className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="footer-section flex flex-col items-center text-center mb-8">
          <FaDownload className="text-4xl mb-4" />
          <h4 className="text-lg font-semibold mb-2">Ready to Download</h4>
          <p className="text-sm">Download your design when you're ready.</p>
          <Link href="/dashboard">
            <Button className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="footer-section flex flex-col items-center text-center mb-8">
          <FaHeadset className="text-4xl mb-4" />
          <h4 className="text-lg font-semibold mb-2">24/7 Support</h4>
          <p className="text-sm">We are here to help, anytime you need.</p>
          <Link href="/dashboard">
            <Button className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
