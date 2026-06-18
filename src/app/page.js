import Banner from "@/components/Banner";
import Test from "@/components/Test";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className={'text-red-700'}>
        <Banner></Banner>
        {/* <Test></Test> */}
        
      </h1>
    </div>
  );
}
