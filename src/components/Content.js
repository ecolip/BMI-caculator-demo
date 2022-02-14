import React, { useState, useEffect } from 'react';
import './Content.css';

function Content({ bmiRef }) {
  const [data, setData] = useState(null);
  const [bmiPath, setBmiPath] = useState(null);

  const getRecordDB = () => {
    setBmiPath(bmiRef);

    bmiRef.limitToLast(6).on("value", (snapshot) => {
      let data = [];

      snapshot.forEach((item) => {
        let obj = {};
        obj[item.key] = item.val();
        data.push(obj)
      })
      data.reverse();
      setData(data);
    });
  };

  const removeRecord = (id) => {
    bmiPath.child(id).remove();
  }

  const bmiInfo = (bmi) => {
    return bmi < 18.5 ? "體重過輕" :
      bmi < 24 ? "體重正常" :
        bmi < 27 ? "體重過重" :
          bmi < 30 ? "輕度肥胖" :
            bmi < 35 ? "中度肥胖" : "重度肥胖"
  }

  const bmiStyle = (bmi) => {
    return bmi < 18.5 ? { borderLeft: '5px solid #31BAF9' } :
      bmi < 24 ? { borderLeft: '5px solid #86D73F' } :
        bmi < 27 ? { borderLeft: '5px solid #FF982D' } :
          bmi < 30 ? { borderLeft: '5px solid #FF6C03' } :
            bmi < 35 ? { borderLeft: '5px solid #FF6C06' } : { borderLeft: '5px solid #FF1200' }
  }

  const renderRecord = () => {
    let output = [];

    data.map((item) => {
      Object.entries(item).map(([k, v]) => {
        output.push(
          <li className="d-md-flex justify-content-between align-items-center mb-4 py-2" key={k} style={bmiStyle(v.bmi)}>
            <div className="fw-bold ps-2">{bmiInfo(v.bmi)}</div>
            <div className="bmi"><span>BMI</span>&nbsp;{v.bmi}</div>
            <div className="weight"><span>weight</span>&nbsp;{v.weight}</div>
            <div className="height"><span>height</span>&nbsp;{v.height}</div>
            <div className="date fw-bold">{v.date}</div>
            <div className="remove" onClick={() => { removeRecord(k) }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
              </svg>
            </div>
          </li>)
      })
    })
    return output;
  };

  useEffect(() => {
    getRecordDB();
  }, [])

  return (
    <div className="content pb-3">
      <div className="title my-4">BMI 紀錄</div>
      <div className="record">
        <div className="container">
          <ul>
            {data ? renderRecord() : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Content;