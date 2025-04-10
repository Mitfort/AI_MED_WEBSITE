import { useEffect } from "react"
import "./Loading.css"

export default function IntroAnimation({onComplete,onClick})
{

    const handleClick = () =>{
        onComplete();
        onClick();
    }

   useEffect(() => {
    const timer = setTimeout(() => {
        onComplete();
    },5000);

    return () => clearTimeout(timer);
   },[onComplete])


    return (
        <div className="loader" onClick={() => handleClick()}>
            <div className="loading-logo"/>

            <div className="typewriter">
                <div>
                    <p>Artificial Inteligence In Medicine</p>
                </div>
            </div>
        </div>
    )
}