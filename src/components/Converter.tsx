/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ChangeEvent, useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dayjs from "dayjs";

import myflag from "../images/my.svg";
import usflag from "../images/us.svg";
import sgflag from "../images/sg.svg";
import thflag from "../images/th.svg";
import idflag from "../images/id.svg";

let typingTimer: any = null;
const delayTimer = 1000;
const currency = ["USD", "SGD", "IDR", "THB", "MYR"];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Converter = () => {
  const [usdAmount, setUSDAmount] = useState("1");
  const [myrAmount, setMYRAmount] = useState("0");
  const [sgdAmount, setSGDAmount] = useState("0");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [idrAmount, setIDRAmount] = useState("0");
  const [thbAmount, setTHBAmount] = useState("0");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updatedDate, setUpdatedDate] = useState("");
  const [isLoading, setLoading] = useState(false);

  const getAmountByBase = (
    base: string,
    inputEl: ChangeEvent<HTMLInputElement>
  ) => {
    const matchBase = currency.filter((currency) => currency === base);
    const amount = inputEl
      ? inputEl.target.value
      : eval(`${matchBase[0].toLowerCase}Amount`);
    eval(`set${matchBase}Amount(amount)`);
    return amount;
  };

  const setConvertedCurrency = (base: string, amount: string, data: any) => {
    if (amount === "") {
      switch (base) {
        case "THB":
          eval(`setTHBAmount("10")`);
          break;
        case "IDR":
          eval(`setIDRAmount("1000")`);
          break;
        default:
          eval(`set${base}Amount("1")`);
      }
    }
    currency
      .filter((currency) => currency !== base)
      .forEach((currency) => {
        switch (currency) {
          case "IDR":
            setIDRAmount((parseFloat(data.rates.IDR) / 1000).toFixed(3));
            break;
          default:
            eval(
              `set${currency}Amount(parseFloat(data.rates.${currency}).toFixed(2))`
            );
        }
      });
  };

  const setDefaultAmountByCountry = (base: string, amount: string) => {
    switch (base) {
      case "IDR":
        return amount !== "" ? parseFloat(amount) * 1000 : "1000";
      case "THB":
        return amount !== "" ? amount : "10";
      default:
        return amount !== "" ? amount : "1";
    }
  };

  const getConvertedCurrency = (inputEl?: ChangeEvent<HTMLInputElement>) => {
    window.clearTimeout(typingTimer);
    const base = inputEl?.target.attributes.getNamedItem("data-base")
      ?.value as string;
    const amount = getAmountByBase(base, inputEl!);
    typingTimer = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.exchangerate.host/latest?base=${base}&amount=${setDefaultAmountByCountry(
            base,
            amount
          )}&symbols=${currency.filter((currency) => currency !== base)}`
        );
        const data = await response.json();
        setConvertedCurrency(base, amount, data);
        setUpdatedDate(data.date);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, delayTimer);
  };

  const initCurrency = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.exchangerate.host/latest?base=USD&amount=1&symbols=${currency.filter(
          (currency) => currency !== "USD"
        )}`
      );
      const data = await response.json();
      setConvertedCurrency("USD", "1", data);
      setUpdatedDate(data.date);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initCurrency();
    return () => {};
  }, []);

  return (
    <div className="flex flex-col justify-center text-center">
      <div className="flex justify-center flex-col text-center text-5xl text-blue-100">
        <div className="mt-5 flex-row md:flex-col flex-wrap">
          <div className="inline-flex">
            <img src={usflag} className="w-8 rounded-3xl mr-3 opacity-50" />
            <span className="lg:mr-4 md:mr-0 text-blue-400">USD</span>
          </div>
          <input
            className={`text-shadow-md lg:w-auto w-full text-7xl bg-blue-900 text-center lg:text-left lg:pl-4 focus:outline-none ${
              isLoading ? "text-blue-600 animate-pulse" : "text-blue-100"
            }`}
            type="number"
            data-base="USD"
            onChange={getConvertedCurrency}
            id="usd"
            value={usdAmount}
          />
        </div>
        <div className="mt-10 flex-row md:flex-col flex-wrap">
          <div className="inline-flex">
            <img src={myflag} className="w-8 rounded-3xl mr-3 opacity-50" />
            <span className="lg:mr-4 md:mr-0 text-blue-400">MYR</span>
          </div>
          <input
            className={`text-shadow-md lg:w-auto w-full text-7xl bg-blue-900 text-center lg:text-left lg:pl-4 focus:outline-none ${
              isLoading ? "text-blue-600 animate-pulse" : "text-blue-100"
            }`}
            type="number"
            value={myrAmount}
            id="myr"
            data-base="MYR"
            onChange={getConvertedCurrency}
          />
        </div>
        <div className="mt-10 flex-row md:flex-col flex-wrap">
          <div className="inline-flex">
            <img src={sgflag} className="w-8 rounded-3xl mr-3 opacity-50" />
            <span className="lg:mr-4 md:mr-0 text-blue-400">SGD</span>
          </div>
          <input
            className={`text-shadow-md lg:w-auto w-full text-7xl bg-blue-900 text-center lg:text-left lg:pl-4 focus:outline-none ${
              isLoading ? "text-blue-600 animate-pulse" : "text-blue-100"
            }`}
            type="number"
            value={sgdAmount}
            id="sgd"
            data-base="SGD"
            onChange={getConvertedCurrency}
          />
        </div>
        <div className="mt-10 flex-col flex-wrap">
          <div className="inline-flex">
            <img src={thflag} className="w-8 rounded-3xl mr-3 opacity-50" />
            <span className="lg:mr-4 md:mr-0 text-blue-400">THB</span>
          </div>
          <input
            className={`text-shadow-md lg:w-auto w-full text-7xl bg-blue-900 text-center lg:text-left lg:pl-4 focus:outline-none ${
              isLoading ? "text-blue-600 animate-pulse" : "text-blue-100"
            }`}
            type="number"
            value={thbAmount}
            id="thb"
            data-base="THB"
            onChange={getConvertedCurrency}
          />
        </div>
        <div className="mt-7 lg:block flex-wrap hidden">
          <div className="inline-flex">
            <img src={idflag} className="w-8 rounded-3xl mr-3 opacity-50" />
            <span className="lg:mr-4 md:mr-0 text-blue-400">IDR</span>
          </div>
          <input
            className={`text-shadow-md lg:w-auto w-full text-7xl bg-blue-900 p-3 text-center lg:text-left lg:pl-4 focus:outline-none ${
              isLoading ? "text-blue-600 animate-pulse" : "text-blue-100"
            }`}
            type="number"
            value={idrAmount}
            id="idr"
            data-base="IDR"
            onChange={getConvertedCurrency}
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
