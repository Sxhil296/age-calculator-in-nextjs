import Image from "next/image";
import { Poppins } from "next/font/google";
import { useState } from "react";
import CountUp from "react-countup";

import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
import icon from "../images/icon-arrow.svg";
import Head from "next/head";

const poppins = Poppins({ subsets: ["latin"], weight: "700" });

export default function Home() {
  const [days, setDays] = useState("");
  const [months, setMonths] = useState("");
  const [years, setYears] = useState("");
  const [diffInDays, setDiffInDays] = useState("");
  const [diffInMonths, setDiffInMonths] = useState("");
  const [diffInYears, setDiffInYears] = useState("");
  const [inputsFilled, setInputsFilled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "day") setDays(value);
    if (name === "month") setMonths(value);
    if (name === "year") setYears(value);


      // Check if all input fields have values
    if (days && months && years) {
      setInputsFilled(true);
    } else {
      setInputsFilled(false);
    }
  };

  const handleClick = () => {
    const calculatedDiffInDays = differenceInDays(
      new Date(years, months - 1, 31),
      new Date(years, months - 1, days)
    );

    const calculatedDiffInMonths = differenceInMonths(
      new Date(years, 11, 31),
      new Date(years, months - 1, days)
    );

    const calculatedDiffInYears = differenceInYears(
      new Date(2023, 11, 31),
      new Date(years, months - 1, days)
    );

    setDiffInDays(calculatedDiffInDays);
    setDiffInMonths(calculatedDiffInMonths);
    setDiffInYears(calculatedDiffInYears);
  };

  return (
    <>
      <Head>
        <title>Age Calculator</title>
      </Head>
      <main
        className={`lg:flex lg:items-center lg:justify-center lg:h-screen ${poppins.className}`}
      >
        <div className="max-w-lg bg-white rounded rounded-br-[40%] shadow p-8 mx-auto">
          <div>
            <form className="flex gap-4">
              <article>
                <label
                  htmlFor="day"
                  className={`${days > 31 && "text-red-500"}`}
                >
                  day
                </label>
                <input
                  type="number"
                  name="day"
                  id="day"
                  placeholder="DD"
                  min="1"
                  max="31"
                  value={days}
                  onChange={handleChange}
                />
                {days > 31 && (
                  <small className="text-red-500 font-thin block">
                    Must be a valid day
                  </small>
                )}
              </article>
              <article>
                <label
                  htmlFor="month"
                  className={`${months > 12 && "text-red-500"}`}
                >
                  month
                </label>
                <input
                  type="number"
                  name="month"
                  id="month"
                  placeholder="MM"
                  min="1"
                  max="12"
                  value={months}
                  onChange={handleChange}
                />
                {months > 12 && (
                  <small className="text-red-500 font-thin block">
                    Must be a valid month
                  </small>
                )}
              </article>
              <article>
                <label
                  htmlFor="year"
                  className={`${years > 2023 && "text-red-500"}`}
                >
                  year
                </label>
                <input
                  type="number"
                  name="year"
                  id="year"
                  placeholder="YYYY"
                  min="1900"
                  max="2023"
                  value={years}
                  onChange={handleChange}
                />
                {years > 2023 && (
                  <small className="text-red-500 font-thin block">
                    Must be a valid year
                  </small>
                )}
                {/* {years < 1900 && years > 0 && <small className="text-red-500 font-thin block">You are too old to calculate your age</small>} */}
              </article>
            </form>
          </div>

          <div className="relative mt-10">
            <hr className="border border-slate-400" />
            <button
              type="button"
              className="bg-purple-600 rounded-full absolute w-30 h-30 p-2 right-0 -top-7"
              onClick={handleClick}
              disabled={!inputsFilled}
            >
              <Image src={icon} width={40} height={40} alt="Arrow Icon" />
            </button>
          </div>

          <div className="mt-10">
            <ul className="flex flex-col gap-2">
              <li className="text-5xl italic">
                <span className="text-purple-600 text-5xl">
                  <CountUp start={0} end={diffInYears || 0} duration={1} />
                </span>{" "}
                years
              </li>
              <li className="text-5xl italic">
                <span className="text-purple-600 text-5xl">
                  <CountUp start={0} end={diffInMonths || 0} duration={1} />
                </span>{" "}
                months
              </li>
              <li className="text-5xl italic">
                <span className="text-purple-600 text-5xl">
                  <CountUp start={0} end={diffInDays || 0} duration={1} />
                </span>{" "}
                days
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
