import { formatAmount } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BankCard = ({ account, userName, showBalance }: CreditCardProps) => {
  return (
    <div className="flex flex-col">
      <Link href="/" className="bank-card">
        <div className="bank-card_content">
          <div>
            <h1 className="text-16 font-semibold text-white">{userName}</h1>

            <p className="font-ibm-plex-serif text-white">{formatAmount(account.currentBalance)}</p>
          </div>

          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-12 font-semibold text-white">{userName || "Hamdi Ahmed"}</h1>
              <h2 className="text-12 font-semibold text-white">●● / ●●</h2>
            </div>

            <p className="text-14 font-semibold tracking[1.1px] text-white">
              **** **** **** ****
              <span className="text-16">&nbsp; 1234</span>
            </p>
          </article>
        </div>

        <div className="bank-card_icon">
          <Image src="/icons/Paypass.svg" width={20} height={24} alt="pay" />

          <Image src="/icons/mastercard.svg" className="ml-5" width={45} height={32} alt="master_card" />
        </div>

        <Image src="/icons/lines.png" width={360} height={190} alt="master_card" className="absolute top-0 left-0" />
      </Link>
    </div>
  );
};

export default BankCard;
