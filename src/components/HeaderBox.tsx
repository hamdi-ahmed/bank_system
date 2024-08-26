import React from "react";

const HeaderBox: React.FC<HeaderBoxProps> = ({
  title,
  type,
  user,
  subtext,
}) => {
  return (
    <header className="header-box">
      <h1 className="header-box-title">
        {title}
        {type === "greeting" && (
          <span className="text-bankGradient">, {user}</span>
        )}
      </h1>
      <p className="header-box-subtext">{subtext}</p>
    </header>
  );
};

export default HeaderBox;
