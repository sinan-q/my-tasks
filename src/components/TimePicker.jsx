import React, { useState } from 'react'

const TimePicker = ({onCancel, onClick}) => {
    const [isHour, setIsHour] = useState(true)
    const [hour, sethour] = useState(12)
    const [minute, setminute] = useState(30)
    const [isAm, setIsAm] = useState(true)
    const radius = 72
    const ahd = 30 * Math.PI / 180

    return (
        <div
        className=" absolute z-20 bg-white self-center bottom-1/4  px-4 border rounded-2xl shadow-black shadow-2xl">
            <div className="text-xs ms-4 my-2">Select time</div>
            <div className=" inline-flex">
                <button onClick={() => {setIsHour(true)}} className={`text-4xl ms-2 px-3 py-2 border w-fit rounded-xl ${ isHour &&'bg-gray-700'}`} >{hour < 10 && "0"}{hour}</button>
                <div className="text-4xl py-2 w-fit" >:</div>
                <button onClick={() => {setIsHour(false)}} className={`text-4xl me-2 px-3 py-2 border w-fit rounded-xl ${ !isHour &&'bg-gray-700'}`}  >{minute < 10 && "0"}{minute}</button>
                <div className="flex flex-col">
                    <button onClick={() => {setIsAm(true)}} className={`border rounded-t-md text-xs border-black p-1.5 ${isAm && 'bg-green-400 text-white'} `}>a.m.</button>
                    <button onClick={() => {setIsAm(false)}} className={`border rounded-b-md text-xs border-black p-1.5 ${!isAm && 'bg-green-400 text-white'}`}>p.m.</button>

                </div>
            </div>
            <div class="box border relative rounded-full border-orange-100 my-4 w-48 h-48" id="clock">
                <div class="origin w-2 h-2 bg-slate-500 rounded-lg absolute top-1/2 left-1/2 -mt-1 -ml-1"></div>
                <div class="dot_box">
                     {isHour ? [6,5,4,3,2,1,12,11,10,9,8,7].map((num, index) => (
                        <button onClick={() => sethour(num)} class="dot w-5 h-5 absolute text-sm leading-none rounded-3xl" style={{backgroundColor:  hour === num  ? 'brown' : "transparent", top: 90 + Math.cos((ahd * index)) * radius+"px", left: 90 + Math.sin((ahd * index)) * radius + "px" }} key={num}>{num}</button>
                     )) :
                     [30,25,20,15,10,5,0,55,50,45,40,35].map((num, index) => (
                        <button onClick={() => setminute(num)} class="dot w-5 h-5 absolute text-sm leading-none rounded-3xl" style={{backgroundColor: minute === num  ? 'brown' : "transparent", top: 90 + Math.cos((ahd * index)) * radius+"px", left: 90 + Math.sin((ahd * index)) * radius + "px"}} key={num}>{num}</button>
                     )) }
                        
                     
                   
                </div>
                <div class="hour_line transition-all absolute z-20 w-16 h-1 top-1/2 left-1/2 bg-black rounded-sm origin-left -mt-0.5" style={{transform: `rotate(${isHour ? (hour - 3)*30 : (minute-15)*6}deg)`}} id="hour_line"></div>

            </div>
            <div className="flex justify-end gap-2 m-4">
                <button onClick={onCancel} className="text-sm">Cancel</button>
                <button onClick={() => { onClick(hour, minute, isAm) }} className="text-sm">OK</button>
            </div>
        </div>
    )
}

export default TimePicker