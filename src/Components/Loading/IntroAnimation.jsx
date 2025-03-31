import { useEffect } from "react"
import "./Loading.css"

export default function IntroAnimation({onComplete})
{
   useEffect(() => {
    const timer = setTimeout(() => {
        onComplete();
    },5000);

    return () => clearTimeout(timer);
   },[onComplete])


    return (
        <div className="loader">
            <div className="loading-logo"/>

            <div className="typewriter">
                <div>
                    <p>Arteficial Inteligence In Medicine</p>
                </div>
            </div>
        </div>
    )
}