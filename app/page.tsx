import Image from "next/image";
import pic1 from "@/images/pic1.png";
import pic2 from "@/images/pic2.jpg"
export default function Home() {
  return (
      <div>
        <div style={{ backgroundColor: "white", height: "180vh" }}>
            <Image src={pic1} alt="Stock photo 1" width={ 1260 } height={ 100 }/>

        </div>
        <div style={{ backgroundColor: "white", height: "250vh" }}>
            <Image src={pic2} alt="Stock photo 2" width={ 500 } height={ 100 }/>

        </div>

        <div style={{ backgroundColor: "#0A3161", height: "50vh" }}>

        </div>
        <div style={{ backgroundColor: "white", height: "150vh" }}>

        </div>
        <div style={{ backgroundColor: "#0A3161", height: "70vh" }}>

        </div>
      </div>
  );
}
