import Image from "next/image";
import Link from "next/link";
import React from "react";
import BankCard from "./BankCard";

const RightSideBar = ({ banks, transactions, user }: RightSidebarProps) => {
  console.log({ user });
  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl text-blue-500 font-bold">{user?.name.split("")[0]}</span>
          </div>

          <div className="profile-details">
            <h1 className="profile-name">{user?.name}</h1>
            <p className="profile-email">{user?.email}</p>
          </div>
        </div>
      </section>

      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2">My Banks</h2>
          <Link href="/" className="flex gap-2">
            <Image src="/icons/plus.svg" alt="plus_icon" width={20} height={20} />
            <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
          </Link>
        </div>

        {banks?.length > 0 && (
          <div className="relative flex flex-1 flex-col item-center justify-center gap-5">
            <div className="relative z-10">
              <BankCard key={banks[0]?.$id} userName={user.name} account={banks[0]} showBalance={false} />
            </div>

            {banks[1] && (
              <div className="absolute right-1 top-8 z-0 w-[90%]">
                <BankCard key={banks[1]?.$id} userName={user.name} account={banks[1]} showBalance={false} />
              </div>
            )}
          </div>
        )}
      </section>
    </aside>
  );
};

export default RightSideBar;
