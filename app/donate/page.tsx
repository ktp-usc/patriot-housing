import Image from "next/image";
import guy from "@/components/images/Guy.png"
import {Button} from "@/components/ui/button"
import Header from "@/components/header";

export default function DonatePage() {
    return (
        <div>
            <Header />
            <div style={{position: "relative", display: "flex", backgroundColor: "white", height: "100vh"}}>
                <Image src={guy} alt="Veteran" width={400} height={450}/>
                <div style={{
                    position: "absolute",
                    top: "30%",
                    left: "45%",
                    transform: "translate(-10%, -50%)",
                    fontSize: "24px"
                }}>
                    <p style={{fontSize: "20px", fontStyle: "Inter"}}>At Patriot Housing, we provide housing, job support,
                        and long-term stability for Veterans facing hardship.
                    </p>
                    <p style={{fontSize: "20px", paddingTop: "30px"}}>We build pathways to permanent housing and
                        self-sufficiency. One Hero, one home, one community at a time.</p>
                    <p style={{fontSize: "20px", paddingTop: "30px"}}>We can&apos;t do it alone.
                        Your support turns compassion into action.</p>

                </div>
                <div>
                    <h1 style={{fontSize: "40px", paddingTop: "400px", paddingLeft: "90px"}}>Be the reason a Veteran
                        finds stability</h1>
                    <Button style={{marginTop: "20px", marginLeft: "350px", backgroundColor: "blue"}}>Support a Veteran</Button>
                </div>
            </div>

        </div>
    );
}
