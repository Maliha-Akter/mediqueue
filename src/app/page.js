import AvailableTeacher from "@/components/AvailableTeacher";
import Banner from "@/components/Banner";
import HowItWorks from "@/components/HowItWorks";
import Test from "@/components/Test";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className={'text-red-700'}>
        <Banner></Banner>
        {/* <Test></Test> */}
        <AvailableTeacher></AvailableTeacher>
        <WhyChooseUs></WhyChooseUs>
        <HowItWorks></HowItWorks>
        
      </h1>
    </div>
  );
}
