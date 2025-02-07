"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
// import Image from "next/image";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { width, height } = useWindowSize();

  const score = Number(searchParams.get("score")) || 0;
  const timeTaken = Number(searchParams.get("timeTaken")) || 0;

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (score >= 80) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [score]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} min ${seconds} sec`;
  };

  const getPerformanceMessage = () => {
    if (score >= 80) {
      return { message: "Outstanding! 🎉", color: "text-green-600", emoji: "🏆" };
    } else if (score >= 50) {
      return { message: "Great Job! 💪", color: "text-yellow-500", emoji: "🥈" };
    } else {
      return { message: "Keep Practicing! 🚀", color: "text-red-500", emoji: "📚" };
    }
  };

  const performance = getPerformanceMessage();

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8">
      {showConfetti && <Confetti width={width} height={height} />}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }} 
        className="max-w-lg bg-white p-8 shadow-xl rounded-xl text-center"
      >
        <h1 className={`text-5xl font-bold ${performance.color}`}>
          {performance.emoji} {performance.message}
        </h1>
        <p className="text-2xl font-medium text-gray-700 mt-4">Your Score: <span className="text-blue-600">{score}/100</span></p>
        <p className="text-lg text-gray-600 mt-2">Time Taken: <span className="font-semibold">{formatTime(timeTaken)}</span></p>


        <div className="mt-6 flex flex-col gap-4">
          <motion.button 
            onClick={() => router.push("/")}
            className="p-3 bg-blue-500 text-white rounded-lg shadow-lg text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Home
          </motion.button>

          <motion.button 
            onClick={() => alert("Feature coming soon! 🎉")}
            className="p-3 bg-green-500 text-white rounded-lg shadow-lg text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Share Your Score 🚀
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
