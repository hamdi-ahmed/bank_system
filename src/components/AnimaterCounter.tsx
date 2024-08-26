"use client";

import React from "react";
import CountUp from "react-countup";

type props = {
  amount: number;
};

const AnimaterCounter: React.FC<props> = ({ amount }) => {
  return (
    <div className="w-full">
      <CountUp end={amount} decimal="," prefix="$" duration={2.75} decimals={2} />
    </div>
  );
};

export default AnimaterCounter;
