import { NextPage } from "next";
import { useEffect, useState } from "react";
import Parser from "cron-parser";
import styles from "./styles.module.css";

const CakeClock: NextPage = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const cakeTime = "05 10 * * 1";
  const oneWeekInMils = 604800000;
  let interval = Parser.parseExpression(cakeTime);
  let nextWednesDay = new Date(interval.next().toString());
  let now = Date.now();

  useEffect(() => {
    let countDown = setInterval(function () {
      now = Date.now();
      if (nextWednesDay.getTime() < now) {
        nextWednesDay = new Date(interval.next().toString());
      }

      let distance = nextWednesDay.getTime() - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setPercentage((1 - distance / oneWeekInMils) * 100);
      setDays(days);
      setHours(hours);
      setMins(minutes);
      setSecs(seconds);
    }, 1000);

    return () => {
      clearInterval(countDown);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.counter}>
        <span className={styles.title}>
          Cake Clock
        </span>
        <br />
        <span>
          {days}d {hours}t {mins > 9 ? mins : "0" + mins}:
          {secs > 9 ? secs : "0" + secs}
        </span>
        <br />
          <span className={styles.cakes}>
            <img className={styles.cakes} src="/cake.svg" alt="" width="130px" />
          </span>
        <div className={styles.progress}>
          <br />
          <div>
          <span
            className={styles.circleback}
          ></span>
          <span
            className={styles.circle}
            style={{ width: percentage + "%" }}
          ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeClock;
