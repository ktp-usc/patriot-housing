import Image from "next/image";
import guy from "@/images/Guy.png";
import {Button} from "@/components/ui/button"

export default function DonatePage() {
    return (
        <div>
            <div style={{position: "relative", display: "flex", backgroundColor: "lightgrey", height: "100vh"}}>
                <Image src={guy} alt="Veteran" width={400} height={450}/>
                <div style={{
                    position: "absolute",
                    top: "30%",
                    left: "45%",
                    transform: "translate(-10%, -50%)",
                    fontSize: "24px"
                }}>
                    <p style={{fontSize: "20px"}}>At Patriot Housing, we provide housing, job support,
                        and long-term stability for Veterans facing hardship.
                    </p>
                    <p style={{fontSize: "20px", paddingTop: "20px"}}>We build pathways to permanent housing and
                        self-sufficiency. One Hero, one home, one community at a time.</p>
                    <p style={{fontSize: "20px", paddingTop: "20px"}}>We can't do it alone.
                        Your support turns compassion into action.</p>

                </div>
                <div>
                    <h1 style={{fontSize: "40px", paddingTop: "400px", paddingLeft: "90px"}}>Be the reason a Veteran
                        finds stability</h1>
                    <Button style={{marginTop: "20px", marginLeft: "350px", backgroundColor: "darkred"}}>Support a Veteran</Button>
                </div>
            </div>

        </div>
    );
}