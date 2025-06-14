import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col items-center w-full p-5 bg-custom-black text-off-white">
      <span>&copy; Usman Shabir</span>
      <span>
        Powered by&nbsp;
        <a
          href="https://www.weatherapi.com/"
          title="Weather API"
          className="font-light underline"
          target="_blank"
        >
          WeatherAPI.com
        </a>
      </span>
    </div>
  );
};

export default Footer;
