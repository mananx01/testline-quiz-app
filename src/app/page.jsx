"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 text-white">
      <div className="relative w-full h-[100vh] flex flex-col justify-center items-center text-center bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md rounded-lg"></div>

        <div className="relative z-10 px-6 md:px-12">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-lg"
          >
            Welcome to <span className="text-yellow-300">Testline</span>!
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-200 mt-4 max-w-3xl mx-auto"
          >
            🚀 Your AI-powered quiz platform to master competitive exams with smart daily tests, gamified revision, and real-time leaderboards.
          </motion.p>

          {/* Stsrting button */}
          <motion.button
            onClick={() => router.push("/quiz")}
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-6 py-3 bg-yellow-400 text-gray-900 font-bold text-lg rounded-lg shadow-xl transition-all duration-300 hover:scale-105 hover:bg-yellow-300"
          >
            Start Your Quiz 🚀
          </motion.button>
        </div>
      </div>

      {/* Features */}
      <div className="h-screen w-full bg-white py-16 mt-16">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8">
            Why Choose <span className="text-indigo-600">Testline</span>?
          </h2>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 hover:cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-indigo-100 rounded-lg shadow-xl transition-all"
            >
              <h3 className="text-2xl font-semibold text-indigo-700 mb-4">🎯 Smart Learning</h3>
              <p className="text-lg text-gray-700">
                AI-powered quiz recommendations based on your progress.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-purple-100 rounded-lg shadow-xl transition-all"
            >
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">📊 Track Your Progress</h3>
              <p className="text-lg text-gray-700">
                Personalized dashboards & real-time performance insights.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-pink-100 rounded-lg shadow-xl transition-all"
            >
              <h3 className="text-2xl font-semibold text-pink-700 mb-4">🏆 Compete & Win</h3>
              <p className="text-lg text-gray-700">
                Leaderboards, badges, and rewards to stay motivated.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
