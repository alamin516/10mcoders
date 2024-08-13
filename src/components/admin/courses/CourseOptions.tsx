import { CheckOutlined } from "@mui/icons-material";
import React, { useEffect } from "react";

type Props = {
  active: number;
  setActive: (active: number) => void;
  isEdit?: boolean;
  handleSubmit?: any;
};

const CourseOptions: React.FC<Props> = ({
  active,
  setActive,
  isEdit,
  handleSubmit,
}) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  const handleChangeOption = (index: number) => {
    if (isEdit) {
      setActive(index);
    }
  };

  useEffect(()=>{
    if(active === 3){
      handleSubmit();
    }
  },[active, handleSubmit])

  return (
    <div>
      {options.map((option: any, index: number) => (
        <div
          key={index}
          className={`w-full flex py-5 ${isEdit && "cursor-pointer"}`}
          onClick={() => handleChangeOption(index)}
        >
          <div
            className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${
              active + 1 > index ? "bg-green-400" : "bg-slate-700"
            } relative`}
          >
            <CheckOutlined className="text-white" />
            {index !== options.length - 1 && (
              <div
                className={`absolute h-[30px] w-1 ${
                  active + 1 > index ? "bg-green-500" : "bg-slate-700"
                } bottom-[-100%]`}
              ></div>
            )}
          </div>
          <h5
            className={`pl-3 ${
              active === index ? "dark:text-white" : "dark:text-white"
            }`}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
