import { styles } from "@/styles/style";
import Ratings from "@/utils/Ratings";
import { CheckBoxOutlined } from "@mui/icons-material";
import CoursePlayer from "./CoursePlayer";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleSubmitCourse: any;
  isEdit?: boolean
};

const CoursePreview: React.FC<Props> = ({
  active,
  setActive,
  courseData,
  handleSubmitCourse,
  isEdit
}) => {
  const prevButton = () => {
    setActive(active - 1);
  };

  const discountPercentagePrice = (
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100
  ).toFixed(0);

  const handleSubmit = () => {
    handleSubmitCourse()
  }

  return (
    <div className="w-[80%] m-auto mt-5 dark:text-white">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>

        <div className="flex items-center dark:text-white">
          <h1 className="pt-5 text-[25px] dark:text-white">
            {courseData.price === 0 ? "Free" : `$${courseData.price}`}
          </h1>
          <h5 className="pl-3 text-xl mt-2 line-through opacity-80">
            ${courseData?.estimatedPrice}
          </h5>
          <h4 className="pl-5 pt-4 text-[24px]">
            {discountPercentagePrice}% off
          </h4>
        </div>

        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[180px] my-4 font-Poppins bg-green-500 cursor-not-allowed`}
          >
            Buy Now
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discount coupon ..."
            className={`${styles.input} !w-[80%] ml-3 mt-0`}
          />
          <div
            className={`${styles.button} !w-[120px] my-4 ml-4 font-Poppins cursor-pointer`}
          >
            Apply
          </div>
        </div>

        <p className="pb-1">* Source code include</p>
        <p className="pb-1">* Full lifetime access</p>
        <p className="pb-1">* Certification after completion</p>
        <p className="pb-3 800px:pb-1">* Premium support</p>
      </div>

      <div className="w-full mt-4">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-medium">
            {courseData.name}
          </h1>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5 className="ml-4">0 Reviews</h5>
            </div>
            <h5>0 students</h5>
          </div>
          <h1 className="text-[25px] font-Poppins font-medium mt-4">
            What you will learn from this course
          </h1>
        </div>

        {courseData?.benefits?.map((item: any, index: number) =>(
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-4 mr-1">
              <CheckBoxOutlined />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
       ))}

        <div className="w-full mt-4">
          <h1 className="text-[25px] font-Poppins font-medium">
            What are the prerequisites for starting this course?
          </h1>
          {courseData?.prerequisites?.map((item: any, index: number) => (
            <div className="w-full flex 800px:items-center py-2" key={index}>
              <div className="w-4 mr-1">
                <CheckBoxOutlined />
              </div>
              <p className="pl-2">{item.title}</p>
            </div>
          ))}
        </div>

        {/* course description */}
        <div className="w-full mt-4">
          <h1 className="text-[25px] font-Poppins font-medium">
            Course Details
          </h1>
          <p>{courseData?.description}</p>
        </div>
      </div>

      {/* Create and previous button */}
      <div className="mt-4 flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] bg-green-500 rounded-md text-center py-2 cursor-pointer"
          onClick={prevButton}
        >
          Previous
        </div>
        <div
          className="w-full 800px:w-[180px] bg-green-500 rounded-md text-center py-2 text-white cursor-pointer"
          onClick={() => handleSubmit()}
        >
          {
            isEdit ? "Update course" : "Create course"
          }
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
