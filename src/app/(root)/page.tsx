import React from "react";

// ** UIs
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSideBar from "@/components/RightSideBar";

const page = () => {
  const loggedIn = {
    firstName: "Hamdi",
    lastName: "Ahmed",
    email: "hamdi.ahmed@gmail.com",
  };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            user="Guest"
            title="Welcome"
            subtext="Access and manage your account and your transactions efficiently."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>

        <p>Recent Transactions</p>
      </div>
      <RightSideBar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123.5 }, { currentBalance: 400 }]}
      />
    </section>
  );
};

export default page;
