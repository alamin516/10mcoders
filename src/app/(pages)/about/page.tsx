"use server";
import About from "@/components/client/Pages/About/About";
import SimpleLayout from "@/components/master/SimpleLayout";

type Props = {};

const page = (props: Props) => {
  return (
    <SimpleLayout>
      <About />
    </SimpleLayout>
  );
};

export default page;
