import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col items-center space-y-2 w-full p-6 bg-custom-black text-sm leading-6">
      <span className="text-gray-200 tracking-widest md:text-2xl">
        &copy; {new Date().getFullYear()} Usman Shabir
      </span>
      <span className="text-gray-400 md:text-lg">
        Powered by&nbsp;
        <a
          href="https://www.weatherapi.com/"
          title="Weather API"
          className="font-light underline hover:text-[#5ed3ff]!"
          target="_blank"
        >
          WeatherAPI.com
        </a>
      </span>
    </div>
  );
};

export default Footer;
