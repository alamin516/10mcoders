import CourseContents from "@/components/client/Pages/AccessCourse/CourseContent";
import SimpleLayout from "@/components/master/SimpleLayout";

type Props = {};

const page = ({ params }: any) => {
  const id = params?.id;

  return (
    <>
      <SimpleLayout>
        <CourseContents id={id}/>
      </SimpleLayout>
    </>
  );
};

export default page;
