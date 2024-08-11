"use client"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Add, Delete, Remove, ContentCopy } from "@mui/icons-material";
import { useEditLayoutDataMutation, useGetHeroDataQuery } from "@/lib/features/layout/layoutApi";
import { styles } from "@/styles/style";

interface Faq {
  question: string;
  answer: string;
}

const EditFaq: React.FC = () => {
  const { data, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [originalFaqs, setOriginalFaqs] = useState<Faq[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [editLayoutData, { isSuccess, error }] = useEditLayoutDataMutation();

  useEffect(() => {
    if (data) {
      setFaqs(data.layout?.faq ?? []);
      setOriginalFaqs(data.layout?.faq ?? []);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("FAQ updated successfully");
    }
    if (error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message);
    }
  }, [isSuccess, error, refetch]);

  const handleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleEditFaq = (index: number, question: string, answer: string) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index] = { ...updatedFaqs[index], question, answer };
    setFaqs(updatedFaqs);
  };

  const handleAddFaq = () => {
    const newFaq: Faq = {
      question: "",
      answer: "",
    };
    setFaqs([...faqs, newFaq]);
    setExpandedIndex(faqs.length);
  };

  const handleRemoveFaq = (index: number) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFaqs);
  };

  const handleCopyFaq = (index: number) => {
    const copiedFaq = { ...faqs[index]};
    setFaqs([...faqs, copiedFaq]);
    setExpandedIndex(faqs.length);
  };

  const handleSave = async () => {
    const hasEmptyFields = faqs.some((faq) => !faq.question.trim() || !faq.answer.trim());
    if (hasEmptyFields) {
      toast.error("All questions and answers must be filled out.");
      return;
    }

    await editLayoutData({
      type: "FAQ",
      faq: faqs,
    });
  };

  const hasChanges = () => {
    return JSON.stringify(faqs) !== JSON.stringify(originalFaqs);
  };

  return (
    <div className="w-[98%] 800px:w-[90%] 1100px:w-[60%] mx-auto space-y-3">
      <div className="flex justify-between items-center">
        <button
          onClick={handleAddFaq}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add FAQ
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded"
          disabled={!hasChanges()}
        >
          Save
        </button>
      </div>
      {faqs.map((faq, index) => (
        <div key={index} className="relative flex items-center w-full gap-2">
          <div className="border rounded flex-1">
            <div
              onClick={() => handleExpand(index)}
              className="cursor-pointer p-4 flex justify-between items-center"
            >
              <input
                type="text"
                value={faq.question}
                onChange={(e) =>
                  handleEditFaq(index, e.target.value, faq.answer)
                }
                className={`dark:text-white text-[#000000c7] text-lg px-3 w-full font-[600] font-Josefin bg-transparent border-none outline-none`}
                placeholder="Question"
              />
              <span className="dark:text-white">
                {expandedIndex === index ? <Remove /> : <Add />}
              </span>
            </div>
            {expandedIndex === index && (
              <div className={`p-2 ${expandedIndex === index && 'border-t-[1px] border-white'}`}>
                <textarea
                  rows={5}
                  value={faq.answer}
                  onChange={(e) =>
                    handleEditFaq(index, faq.question, e.target.value)
                  }
                  className="dark:text-white text-[#000000c7] text-base p-3 w-full font-Josefin bg-transparent border-none outline-none"
                  placeholder="Answer"
                />
              </div>
            )}
          </div>
          
          <button
            onClick={() => handleCopyFaq(index)}
            className={`${styles.button} !w-10 !h-10`}
          >
            <ContentCopy />
          </button>
          <button
            onClick={() => handleRemoveFaq(index)}
            className={`${styles.button} !w-10 !h-10`}
          >
            <Delete />
          </button>
        </div>
      ))}
    </div>
  );
};

export default EditFaq;
