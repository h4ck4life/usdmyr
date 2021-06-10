import React, { ChangeEvent, useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dayjs from "dayjs";
//import { BsArrowLeftRight } from "react-icons/bs";

let typingTimer: any = null;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Converter = () => {
  const [usdAmount, setUsdAmount] = useState("1");
  const [myrAmount, setMyrAmount] = useState("0");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updatedDate, setUpdatedDate] = useState("");
  const [isLoading, setLoading] = useState(false);

  const getMyrToUsd = (inputEl?: ChangeEvent<HTMLInputElement>) => {
    window.clearTimeout(typingTimer);
    const amount = inputEl ? inputEl.target.value : myrAmount;
    setMyrAmount(amount);
    typingTimer = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.exchangerate.host/latest?base=MYR&amount=${
            amount !== "" ? amount : "1"
          }&symbols=USD`
        );
        const data = await response.json();
        if (amount === "") setMyrAmount("1");
        setUsdAmount(parseFloat(data.rates.USD).toFixed(2));
        setUpdatedDate(data.date);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const getUsdToMyr = (inputEl?: ChangeEvent<HTMLInputElement>) => {
    window.clearTimeout(typingTimer);
    const amount = inputEl ? inputEl.target.value : usdAmount;
    setUsdAmount(amount);
    typingTimer = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.exchangerate.host/latest?base=USD&amount=${
            amount !== "" ? amount : "1"
          }&symbols=MYR`
        );
        const data = await response.json();
        if (amount === "") setUsdAmount("1");
        setMyrAmount(parseFloat(data.rates.MYR).toFixed(2));
        setUpdatedDate(data.date);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  useEffect(() => {
    getUsdToMyr();
    return () => {};
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col justify-center text-center">
      <div className="flex justify-center flex-col text-center text-5xl text-blue-100">
        <div className="mt-7 flex-row md:flex-col flex-wrap">
          <span className="lg:mr-4 md:mr-0 text-blue-400">USD</span>
          <input
            className={`my-2 lg:w-auto w-full text-7xl bg-blue-900 p-3 text-center lg:text-left lg:pl-4 focus:outline-none ${
              isLoading ? "text-blue-600 animate-pulse" : "text-blue-100"
            }`}
            type="number"
            onChange={getUsdToMyr}
            id="usd"
            value={usdAmount}
          />
        </div>
        <div className="mt-7 flex-col flex-wrap">
          <span className="lg:mr-4 md:mr-0 text-blue-400">MYR</span>
          <input
            className={`my-2 lg:w-auto w-full text-7xl bg-blue-900 p-3 text-center lg:text-left lg:pl-4 focus:outline-none ${
              isLoading ? "text-blue-600 animate-pulse" : "text-blue-100"
            }`}
            type="number"
            value={myrAmount}
            id="myr"
            onChange={getMyrToUsd}
          />
        </div>
      </div>
      {/* <div className="mt-4 flex-col flex-wrap text-xs text-blue-500">
        {updatedDate !== "" &&
          dayjs(updatedDate, "YYYY-MM-DD").format("D MMM YYYY")}
      </div> */}
    </div>
  );
};

export default Converter;
