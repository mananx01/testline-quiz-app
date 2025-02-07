"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const [quizData, setQuizData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timer, setTimer] = useState(600);
  const [timerRunning, setTimerRunning] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("/api/quiz");
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setQuizData(data);
        setQuestions(data.questions || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      }
    };

    fetchQuizData();
    setStartTime(Date.now());

    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(timerInterval);
          handleSubmit();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const handleAnswerSelection = (q_id, selectedOption) => {
    if (!selectedAnswers[q_id]) {
      setSelectedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [q_id]: selectedOption,
      }));
    }
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q) => {
      const selectedOption = selectedAnswers[q.id];
      const correctAnswer = q.options.find((op) => op.is_correct);
      if (selectedOption && selectedOption.id === correctAnswer.id) {
        score += 10;
      }
    });

    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    router.push(`/results?score=${score}&timeTaken=${timeTaken}`);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  if (error) return <p className="text-red-500 text-center">Failed to load quiz: {error}</p>;
  if (!quizData) return <p className="text-center">Loading...</p>;

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-indigo-500 via-pink-500 to-pink-600 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-xl rounded-xl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h1 className="text-4xl font-semibold text-blue-600 text-center">{quizData.title}</h1>
          <p className="text-gray-600 text-lg mt-2 text-center">{quizData.topic}</p>
        </motion.div>

        <div className="text-right text-2xl font-bold text-red-600 mt-4">
          Time Left: {formatTime(timer)}
        </div>

        {questions.map((q, index) => {
          const correctAnswer = q.options.find((op) => op.is_correct);
          return (
            <motion.div key={q.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6 p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-xl font-medium text-gray-700">
                {index + 1}. {q.description || "No description available"}
              </h2>
              <div className="mt-4">
                {q.options.map((op) => (
                  <motion.button
                    key={op.id}
                    onClick={() => handleAnswerSelection(q.id, op)}
                    className={`block w-full p-4 mt-2 text-left border rounded-lg text-black ${
                      selectedAnswers[q.id]
                        ? selectedAnswers[q.id].id === op.id
                          ? op.is_correct
                            ? "bg-green-400"
                            : "bg-red-400"
                          : "bg-gray-200"
                        : "hover:bg-blue-100"
                    }`}
                    disabled={!!selectedAnswers[q.id]}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {op.description}
                  </motion.button>
                ))}
              </div>

              {selectedAnswers[q.id] && (
                <div className="mt-4 text-lg text-gray-600">
                  <p className="font-semibold">Correct Answer:</p>
                  <p className={`text-lg ${correctAnswer.id === selectedAnswers[q.id].id ? "text-green-600" : "text-red-600"}`}>
                    {correctAnswer.description}
                  </p>
                  {q.detailed_solution && (
                    <div className="mt-2 text-sm text-gray-500">
                      <strong>Solution:</strong> {q.detailed_solution}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}

        <div className="mt-6 text-center">
          <motion.button
            onClick={handleSubmit}
            className="p-3 w-full bg-blue-500 text-white rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
        </div>
      </div>
    </div>
  );
}
