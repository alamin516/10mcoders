"use client";
import { useGetHeroDataQuery } from "@/lib/features/layout/layoutApi";
import React from "react";

type Props = {};

const FAQSkeleton: React.FC = () => (
  <div className="faq-item mb-4 animate-pulse">
    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
  </div>
);

const FAQ: React.FC<Props> = () => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = React.useState<number | null>(
    null
  );
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      setQuestions(data?.layout?.faq || []);
    }
  }, [data]);

  const toggleQuestion = (id: number) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="w-full 1000px:w-[60%] mx-auto p-6 py-20">
        <div className="text-3xl font-bold mb-8 dark:text-white text-center">Frequently Asked Questions</div>
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <FAQSkeleton key={index} />
          ))
        : questions.map((question: any, index: number) => (
            <div
              key={index}
              className="faq-item mb-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm"
            >
              <h3
                onClick={() => toggleQuestion(question._id)}
                className="faq-question cursor-pointer text-lg font-semibold text-gray-800 dark:text-white flex items-center justify-between"
              >
                {question.question}
                <span
                  className={`transform transition-transform duration-300 ${
                    activeQuestion === question._id ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </h3>
              {activeQuestion === question._id && (
                <div className="faq-answer mt-2 text-gray-600 dark:text-gray-300 pl-2 border-t-[1px] pt-4">
                  {question.answer}
                </div>
              )}
            </div>
          ))}
    </div>
  );
};

export default FAQ;
