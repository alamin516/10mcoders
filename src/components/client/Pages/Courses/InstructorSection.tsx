import Image from "next/image";

type Props = {
  course: any;
};

const InstructorSection:React.FC<Props> = ({ course }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Instructor
      </h2>
      <div className="flex items-center space-x-4">
        <div className="instructor-avatar w-16 h-16">
          <Image
            src={course?.instructor?.avatar || "/assets/images/hsp-1.webp"}
            alt={course?.instructor?.name || "Instructor Name"}
            width={64}
            height={64}
            className="rounded-full w-16 h-16"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {course?.instructor?.name || "Md Alamin"}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {course?.instructor?.bio || "Instructor bio or details go here."}
          </p>
        </div>
      </div>
    </>
  );
};

export default InstructorSection;
