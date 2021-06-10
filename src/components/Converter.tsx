import React, { ChangeEvent, useEffect, useState } from "react";
//import { BsArrowLeftRight } from "react-icons/bs";

let typingTimer: any = null;

export const Converter = () => {
  const [usdAmount, setUsdAmount] = useState("1");
  const [myrAmount, setMyrAmount] = useState("0");
  const [isLoading, setLoading] = useState(false);

  const getMyrToUsd = (inputEl?: ChangeEvent<HTMLInputElement>) => {
    window.clearTimeout(typingTimer);
    setLoading(true);
    const amount = inputEl ? inputEl.target.value : myrAmount;
    setMyrAmount(amount);
    typingTimer = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate.host/latest?base=MYR&amount=${
            amount !== "" ? amount : "1"
          }&symbols=USD`
        );
        const data = await response.json();
        if (amount === "") setMyrAmount("1");
        setUsdAmount(parseFloat(data.rates.USD).toFixed(2));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  const getUsdToMyr = (inputEl?: ChangeEvent<HTMLInputElement>) => {
    window.clearTimeout(typingTimer);
    setLoading(true);
    const amount = inputEl ? inputEl.target.value : usdAmount;
    setUsdAmount(amount);
    typingTimer = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate.host/latest?base=USD&amount=${
            amount !== "" ? amount : "1"
          }&symbols=MYR`
        );
        const data = await response.json();
        if (amount === "") setUsdAmount("1");
        setMyrAmount(parseFloat(data.rates.MYR).toFixed(2));
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
    <div className="">
      <div className="flex justify-center flex-col text-center text-5xl text-blue-100 font-bold">
        <div className="flex-col flex-wrap">
          <span className="mr-2">USD</span>
          <input
            className={`my-2 w-full text-6xl bg-blue-800 p-3 text-center focus:outline-none rounded-md font-bold ${
              isLoading ? "text-blue-600 animate-pulse" : "text-blue-100"
            }`}
            type="number"
            onChange={getUsdToMyr}
            id="usd"
            value={usdAmount}
          />
        </div>
        <div className="flex-col flex-wrap">
          <span className="mr-2">MYR</span>
          <input
            className={`my-2 w-full text-6xl bg-blue-800 p-3 text-center focus:outline-none rounded-md font-bold ${
              isLoading ? "text-blue-600 animate-pulse" : "text-blue-100"
            }`}
            type="number"
            value={myrAmount}
            id="myr"
            onChange={getMyrToUsd}
          />
        </div>
      </div>
    </div>
  );
};

export default Converter;
