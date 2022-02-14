import React, { useState, useRef } from 'react';
import logo from '../imgs/BMICLogo.png';
import './Header.css';
import { formatedDate } from "../utilities/formatedDate";
import clsx from 'clsx';

function Header({ bmiRef }) {
  const [bmi, setBmi] = useState(null);
  const heighDiv = useRef(null);
  const weightDiv = useRef(null);

  const writeRecordData = () => {
    let h = heighDiv.current.value;
    let w = weightDiv.current.value;
    if (h > 0 && w > 0) {
      let bmi = (w / Math.pow(h / 100, 2)).toFixed(2);
      let date = formatedDate();
      setBmi(bmi);

      //push()類似陣列用法, 增加物件資料, 每筆會給一個unic key value
      bmiRef.push({
        bmi,
        weight: weightDiv.current.value,
        height: heighDiv.current.value,
        date
      })
    } else {
      alert("欄位未填寫完畢");
    }
  }

  const btnClass = () => {
    let result = bmiDescrib(bmi);
    switch (result) {
      case "體重過輕":
        return "low";
      case "體重正常":
        return "normal";
      case "體重過重":
        return "heavy";
      case "輕度肥胖":
        return "light-heavy";
      case "中度肥胖":
        return "middle-heavy";
      case "重度肥胖":
        return "high-heavy";
      default:
        return null;
    }
  }

  const bmiDescrib = () => {
    if (bmi) {
      return bmi < 18.5 ? "體重過輕" :
        bmi < 24 ? "體重正常" :
          bmi < 27 ? "體重過重" :
            bmi < 30 ? "輕度肥胖" :
              bmi < 35 ? "中度肥胖" : "重度肥胖"
    }
  }

  const resetInput = () => {
    setBmi(null);
    weightDiv.current.value = null;
    heighDiv.current.value = null;
  }

  return (
    <div className="header">
      <div className="container">
        <div className="d-md-flex justify-content-between align-items-center">
          <div>
            <img src={logo} className="bmi-logo" alt="logo" />
          </div>
          <div className="input-groups">
            <div>
              <div>身高 cm</div>
              <input type="number" className="heigh" placeholder="請輸入身高" ref={heighDiv} />
            </div>
            <div>
              <div>體重 kg</div>
              <input type="number" className="weight" placeholder="請輸入體重" ref={weightDiv} />
            </div>
          </div>
          {bmi ?
            <div className={clsx("bmi_result d-flex align-items-center", btnClass())}>
              <div className="box position-relative me-5">
                {bmi}
                <small><br />BMI</small>
                <div className={clsx("reset position-absolute", btnClass())}>
                  <svg onClick={() => { resetInput() }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                    <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                  </svg>
                </div>
              </div>
              <div className="bmi_describ">{bmiDescrib()}</div>
            </div> :
            <button className="rounded-circle" onClick={() => { writeRecordData() }}>看結果</button>
          }
        </div>
      </div>
    </div>
  );
}

export default Header;