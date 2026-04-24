// OPTIONAL: Add this component to your layout to show offline status
"use client";

import { useEffect, useState } from "react";

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowIndicator(true);
      // Hide success message after 3 seconds
      setTimeout(() => setShowIndicator(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowIndicator(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showIndicator) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 text-center font-medium transition-all duration-300 ${
        isOnline
          ? "bg-green-600 text-white"
          : "bg-yellow-500 text-gray-900"
      }`}
      role="alert"
    >
      {isOnline ? (
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl">✅</span>
          <span>Back online!</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl">📡</span>
          <span>You're offline - using cached version</span>
        </div>
      )}
    </div>
  );
}

// Alternative minimal version without Tailwind:
export function OfflineIndicatorMinimal() {
  const [isOnline, setIsOnline] = useState(true);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowIndicator(true);
      setTimeout(() => setShowIndicator(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowIndicator(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showIndicator) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: "12px 16px",
        textAlign: "center",
        fontWeight: 600,
        backgroundColor: isOnline ? "#10b981" : "#fbbf24",
        color: isOnline ? "#fff" : "#1f2937",
        transition: "all 0.3s ease",
      }}
    >
      {isOnline ? "✅ Back online!" : "📡 You're offline - using cached version"}
    </div>
  );
}

/* 
USAGE in your root layout:

import OfflineIndicator from "@/components/OfflineIndicator";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <OfflineIndicator />
        {children}
      </body>
    </html>
  );
}
*/
