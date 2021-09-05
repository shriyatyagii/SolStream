import React, { useState } from "react";
import { sendMoney } from "../helpers/wallet";
import "./Sender.css";

interface SenderProps {
  didSendMoney: () => void;
}

const Sender: React.FC<SenderProps> = ({ didSendMoney }) => {
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState("0");
  const [timeA, setTime] = useState(0);
  const [timeHr, setTimeHr] = useState(0);
  const [timeDay, setTimeDay] = useState(0);

  const [intervals, setIntervals] = useState(0);


  const [performance, setPerformace] = useState(0);
  var amount1 = amount*1000000000;
  const amountStream = amount1 * 0.8; //800
  const amountPerformance = amount1 * 0.2; //200
  const performanceIntervalAmountTransfer = performance * (amountPerformance*0.1);

  
  var timeforstop:number;
  var intervalsInMilSec: number;
  var timeInMil: number;
  timeforstop=0;

  timeInMil = (timeA * 60000)+(timeHr * 3600000)+(timeDay * 86400000); //converting days into miliseconds
  intervalsInMilSec = timeInMil/intervals;

  //var amountperInterval = amount1/intervals;

  const streamAmtPerInterval = (amountStream/timeInMil)*intervalsInMilSec;
  const performanceAmtPerInterval = (performanceIntervalAmountTransfer/timeInMil)*intervalsInMilSec;


  
  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value ? Number(e.target.value) : 0);
  };

  const onChangeTimeA = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value ? Number(e.target.value) : 0);
  };
  const onChangeTimeHr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeHr(e.target.value ? Number(e.target.value) : 0);
  };
  const onChangeTimeDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeDay(e.target.value ? Number(e.target.value) : 0);
  };
  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value ? e.target.value.toString() : "");
  };
//>>>.
  const onChangeIntervals = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntervals(e.target.value ? Number(e.target.value) : 0);
  };
//>>>

const onChangePerformace = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPerformace(e.target.value ? Number(e.target.value) : 0);
};


const onClickStop = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  timeforstop=1;
  console.log("Button stop pressed and timeforstop=1");
  e.preventDefault();
};



const onClickSendMoney = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  e.preventDefault();
  console.log("this is running");

  
    
  var varCounter = 0;
  var varName = async function(){
     
        
        if(varCounter < timeInMil && performance) {
          if(timeforstop===0){
            console.log("timeforstop=0");
            varCounter = varCounter+intervalsInMilSec;
            var moneyToTransfer = streamAmtPerInterval+performanceAmtPerInterval;
            await sendMoney(address, moneyToTransfer);
            didSendMoney();
          }else{
            console.log("clear interval about to happne");
            clearInterval(intervalId);
          }}else {
         console.log("outer else loop");
         clearInterval(intervalId);
        }
      
       
  };
  var intervalId = setInterval(varName, intervalsInMilSec);
  
};

return (
  <><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap"></link>
  <div className="main">
    <div className="text">
      <div className="text-sub">
        <h2>The Protocol for Real-Time Payments</h2>
        <p>No more Paydays, hassle-free Payrolls!</p>
      </div>
    </div>
    <div className="rating">
    <div className="pr-func">
          <label className="pr-label">Performance Rating: </label><label className="label">{performance}</label>
          <div className="pr"><input type="range" min="1" max="10" onChange={onChangePerformace} value={performance} className="slider"></input></div>
        </div>
      <div className="rating-sub">
        <div><button onClick={onClickStop} className="button-pr"><span>Stop Stream</span></button></div>
      </div>
    </div>
    <div className="form">
      <div className="form-sub">
        <form className="wrapper">
          <label>Amount (in Sol): </label>
          <div className="form-row"><input type="text" onChange={onChangeAmount} value={amount} placeholder="Amount" className="form-control"></input></div>
          <label>Address: </label>
          <div className="form-row"><input type="text" onChange={onChangeAddress} value={address} className="form-control"></input></div>

          <label>Time: (Days-Hrs-Mins)</label>
      <div><input type="text" onChange={onChangeTimeDay} value={timeDay} className="time-form" placeholder="days"></input></div>
      <div><input type="text" onChange={onChangeTimeHr} value={timeHr} className="time-form" placeholder="hr"></input></div>
          <div><input type="text" onChange={onChangeTimeA} value={timeA} className="time-form" placeholder="min"></input></div>
          <label>Interval: </label><label className="label">{intervals}</label>
          <div className="form-row"><input type="range" min="1" max="100" onChange={onChangeIntervals} value={intervals} className="slider"></input></div>
          <label></label>
          <div><button onClick={onClickSendMoney} className="button"><span>Create Stream</span></button></div>
        </form> </div></div></div></>

);

};

export default Sender;
