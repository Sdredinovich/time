import { useEffect, useState } from "react";
import * as s from "./TimerInput.module.css";
let interval;
let interval1;
let interval2;

const TimerInput = ({ select }) => {
  // ================================
  // Локальный стейт

  const [start, setStart] = useState(false);
  const [time, setTime] = useState({
    hours: "00",
    minuts: "00",
    seconds: "00",
  });
  // ============================

  //Получение времени и изменение стейта

  const updateClock = () => {
    const data = new Date().toLocaleTimeString().split(":");
    setTime({ hours: data[0], minuts: data[1], seconds: data[2] });
  };
  // ============================
  //ЮзЭффект

  // ======================================
  //Механизм секундомера
  const secondPlus = () => {
    if (time.seconds < 59) {
      if (+time.seconds < 9) {
        setTime({ ...time, seconds: "0" + (+time.seconds + 1) });
      } else {
        setTime({...time, seconds: +time.seconds + 1 });
      }
    } else {

      if (time.minuts < 59) {
        if (+time.minuts < 9) {
        setTime({ ...time, seconds: '00', minuts: "0" + (+time.minuts + 1) });

        } else {

        setTime({...time,seconds: '00', minuts: +time.minuts + 1 });

        }
      } else {


if (time.hours < 23) {
  if (+time.hours < 9) {
    setTime({...time, minuts: '00', seconds:'00', hours: "0" + (+time.hours + 1)})
  } else {
    setTime({...time, minuts: '00', seconds:'00', hours: +time.hours + 1})

  }
} else {
  setTime({...time, hours:"00"});
}
      }
    }
  };

  // ======================================
  //Механизм таймера
  const secondMinus = () => {

    if (+time.seconds > 0) {
      if (+time.seconds < 11) {
        setTime({...time,seconds:"0" + (+time.seconds - 1)})
      } else {
        setTime({...time,seconds:+time.seconds - 1})

      }
    } else {
      if (+time.minuts > 0 || +time.hours > 0 + time.minuts > 0) {

        // ====
        if (+time.minuts > 0) {
          if (+time.minuts < 11) {
            setTime({...time, seconds: '59', minuts:"0" + (+time.minuts - 1)})
          } else {
            setTime({...time, seconds: '59', minuts: +time.minuts - 1})
          }
        } else {
          // ===============
          if (+time.hours > 0) {
            if (+time.hours < 11) {
              setTime({seconds: 59, minuts: '59', hours:"0" + (+time.hours - 1) })
            } else {
              setTime({seconds: 59, minuts: '59', hours: +time.hours - 1 })

            }
          }
        }

      }
    }
  };


  const setInterv = () => {

// interval = setTimeout(() => {
//   switch(select){
//     case 1: return secondMinus();
//       case 2: return secondPlus()
//       case 3: return updateClock()
//   }
// }, 1000);
    if (select === 1) {
      interval1 = setTimeout(() => {
        secondMinus();
      }, 1000);
    }

    if (select === 2) {
      interval = setTimeout(() => {
        secondPlus();
      }, 1000);
    }

    if (select === 3) {
      interval2 = setTimeout(() => {
        updateClock();
      }, 1000);
    }
  };

  start && setInterv();

  const sbros = () => {
    stop();
    setTime({ hours: "00", minuts: "00", seconds: "00" });
  };

  const stop = () => {
    setStart(false);
    clearTimeout(interval);
    clearTimeout(interval1);
    clearTimeout(interval2);
  };
  useEffect(() => {
    if (select === 3) {
      setStart(true);
      updateClock();
    }
    return () => {
      sbros();
    };
  }, [select]);
  // ===========================onChange и onBlur

  const inputChange = (e, score) => {
    let limit = { hours: 23, seconds: 59, minuts: 59 };
    let limited = limit[score];

    if (e.nativeEvent.data !== "e") {
      if (e.target.value.toString().length > 2) {
        let str = e.target.value.toString();
        setTime({ ...time, [score]: str.slice(0, -1) });
      } else {
        if (e.target.value > limited) {
          setTime({ ...time, [score]: limited });
        } else {
          setTime({ ...time, [score]: e.target.value });
        }
      }
    }
  };
  const onBlurFunk = (score) => {
    if (time[score].length === 1) {
      setTime({ ...time, [score]: "0" + time[score] });
    } else if (time[score].length == 0) {
      setTime({ ...time, [score]: "00" });
    }
  };

  return (
    <div className={s.timerInput}>
      <div className={`${s.tablo} ${select === 3 && s.tabloHourse}`}>
        <div className={s.inpDiv}>
          <input
            onBlur={(e) => {
              onBlurFunk("hours");
            }}
            onChange={(e) => inputChange(e, "hours")}
            readOnly={start || select === 3 || select == 2}
            value={time.hours}
            className={`${s.input}  ${!start && select === 1 && s.startInput} ${
              select === 3 && s.clockInp
            }`}
            type="number"
          ></input>
          <p className={s.inputTiitle}>ЧАСОВ</p>
        </div>
        <b className={s.razdel}>:</b>
        <div className={s.inpDiv}>
          <input
            onBlur={() => {
              onBlurFunk("minuts");
            }}
            onChange={(e) => inputChange(e, "minuts")}
            readOnly={start || select === 3 || select == 2}
            value={time.minuts}
            className={`${s.input} ${!start && select === 1 && s.startInput} ${
              select === 3 && s.clockInp
            }`}
            type="number"
          ></input>
          <p className={s.inputTiitle}>МИНУТ</p>
        </div>
        <b className={s.razdel}>:</b>
        <div className={s.inpDiv}>
          <input
            onBlur={() => {
              onBlurFunk("seconds");
            }}
            onChange={(e) => inputChange(e, "seconds")}
            readOnly={start || select === 3 || select == 2}
            value={time.seconds}
            className={`${s.input} ${!start && select === 1 && s.startInput} ${
              select === 3 && s.clockInp
            }`}
            type="number"
          ></input>
          <p className={s.inputTiitle}>СЕКУНД</p>
        </div>
      </div>
      <div className={`${s.pultDiv} ${select === 3 && s.pultDivNone}`}>
        {start ? (
          <button
         
            onClick={() => stop()}
            className={`${s.startStop} ${start && s.stopbtn}`}
          >
            СТОП
          </button>
        ) : (
          <button
            onClick={() => setStart(!start)}
            className={`${s.startStop} `}
          >
            СТАРТ
          </button>
        )}

        <button
          className={s.sbros}
          onClick={() => sbros()}
        >
          СБРОС{" "}
        </button>
      </div>
    </div>
  );
};

export default TimerInput;
