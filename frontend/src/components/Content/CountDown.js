import { useState,useEffect } from "react";

const CountDown = (props) =>{
    const {countDownDuration} = props
    const [count, setCount] = useState(countDownDuration);
    

    const  toHHMMSS = (secs) => {
        const sec_number = parseInt(secs,10)
        const hours = Math.floor(sec_number / 3600);
        const minutes = Math.floor(sec_number / 60)%60;
        const seconds = sec_number % 60;
        
    
        return [hours,minutes,seconds]
                .map(v => v<10?"0"+v:v)
                .filter((v,i)=>v!=="00"||i>0)
                .join(":")
    }
   
    
    useEffect(()=>{
        if(count===0) {
            props.onTimeUp();
            return};
        const timer = setInterval(()=>{
            setCount(count-1)
        },1000)

        return () =>{
            clearInterval(timer)
        }
       
    },[count])
    return (

        <div className="countdown-container">
            {toHHMMSS(count)}

        </div>
    )
}
export default CountDown;