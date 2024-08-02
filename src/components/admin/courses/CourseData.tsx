import { styles } from "@/styles/style";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import React from "react";
import toast from "react-hot-toast";

type Props = {
  active: number;
  setActive: (active: number) => void;
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
};

const CourseData: React.FC<Props> = ({
  active,
  setActive,
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
}) => {
  const handleBenefitsChange = (index: number, value: string) => {
    const updatedBenefits = benefits.map((benefit, i) =>
      i === index ? { ...benefit, title: value } : benefit
    );
    setBenefits(updatedBenefits);
  };

  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handleRemoveBenefit = (index: number) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(updatedBenefits);
  };

  const handlePrerequisitesChange = (index: number, value: string) => {
    const updatedPrerequisites = prerequisites.map((prerequisite, i) =>
      i === index ? { ...prerequisite, title: value } : prerequisite
    );
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const handleRemovePrerequisite = (index: number) => {
    const updatedPrerequisites = prerequisites.filter((_, i) => i !== index);
    setPrerequisites(updatedPrerequisites);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleNext = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the empty fields to go to next");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-5">
      <div>
        <label className={`${styles.label}`} htmlFor="benefits">
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center my-2">
            <input
              type="text"
              name="benefits"
              id="benefits"
              placeholder="You will be able to build a full stack LMS platform..."
              required
              className={`${styles.input} flex-grow`}
              value={benefit.title}
              onChange={(e) => handleBenefitsChange(index, e.target.value)}
            />
            {benefits.length > 1 && (
              <RemoveCircleOutline
                className="ml-2 cursor-pointer w-8 dark:text-white"
                onClick={() => handleRemoveBenefit(index)}
              />
            )}
          </div>
        ))}
        <AddCircleOutline
          className="my-3 cursor-pointer w-8 dark:text-white"
          onClick={handleAddBenefits}
        />
      </div>

      <div className="mt-4">
        <label className={`${styles.label}`} htmlFor="prerequisites">
          What are the prerequisites for students in this course?
        </label>
        <br />
        {prerequisites.map((prerequisite, index) => (
          <div key={index} className="flex items-center my-2">
            <input
              type="text"
              name="prerequisites"
              id="prerequisites"
              placeholder="You will be able to build a full stack LMS platform..."
              required
              className={`${styles.input} flex-grow`}
              value={prerequisite.title}
              onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
            />
            {prerequisites.length > 1 && (
              <RemoveCircleOutline
                className="ml-2 cursor-pointer w-8 dark:text-white"
                onClick={() => handleRemovePrerequisite(index)}
              />
            )}
          </div>
        ))}
        <AddCircleOutline
          className="my-3 cursor-pointer w-8 dark:text-white"
          onClick={handleAddPrerequisites}
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] bg-green-500 rounded-md text-center py-2 text-white cursor-pointer"
          onClick={prevButton}
        >
          Previous
        </div>
        <div
          className="w-full 800px:w-[180px] bg-green-500 rounded-md text-center py-2 text-white cursor-pointer"
          onClick={handleNext}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
