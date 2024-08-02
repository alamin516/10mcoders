import Blog from "@/components/client/Pages/Blog/Blog";
import SimpleLayout from "@/components/master/SimpleLayout";

type Props = {};

const page = (props: Props) => {
  return (
    <SimpleLayout>
      <Blog />
    </SimpleLayout>
  );
};

export default page;
