"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function QuizLink() {
  const router = useRouter();

  return (
    <motion.div
      onClick={() => router.push("/quiz")}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.3)" }}
      whileTap={{ scale: 0.95 }}
      className="relative w-full max-w-sm p-6 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 text-white shadow-lg cursor-pointer transition-all duration-300 border border-gray-400 hover:border-yellow-400"
    >

      <div className="absolute inset-0 bg-white bg-opacity-10 rounded-xl backdrop-blur-md"></div>
    
      <div className="relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md"
        >
          🚀 Take the Challenge!
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-yellow-200 mt-2 font-medium drop-shadow-sm"
        >
          Sharpen your skills and climb the leaderboard!
        </motion.p>
      </div>
    </motion.div>
  );
}
