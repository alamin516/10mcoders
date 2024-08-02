import EditCourse from "@/components/admin/courses/EditCourse/EditCourse";
import Heading from "@/utils/Heading";

type Props = {};

const page = ({params}: any) => {
  const id = params?.id;

  console.log(id)

  return (
    <>
      <Heading title="Edit Course - admin" description="" keywords="" />
      <EditCourse id={id}/>
    </>
  );
};

export default page;
