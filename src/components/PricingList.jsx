import React from "react";
import { pricing } from "../constants";
import Button from "./Button";
import { check } from "../assets";

const PricingList = () => {
  return (
    <div className="flex gap-[1rem] max-lg:flex-wrap">
      {pricing.map((item) => (
        <div
          key={item.id}
          className="w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-3 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 [&>h4]:first:text-color-2 [&>h4]:even:text-color-1 [&>h4]:last:text-color-3"
        >
          <h4 className="h4 mb-4">{item.title}</h4>
          <p className="body-2 min-h-[4rem] mb-3 text-n-1/50">
            {item.description}
          </p>
          <div className="flex items-center h-[5.5rem] mg-6">
            {item.price && (
              <>
                <div className="h3">$</div>
                <div className="text-[5.5rem] leading-none font-bold">
                  {item.price}
                </div>
              </>
            )}
          </div>

          <Button
            className="w-full mb-6"
            href={
              item.price
                ? "/prompt"
                : "https://mail.google.com/mail/?view=cm&fs=1&to=thomasandromeda999@gmail.com"
            }
            white={!!item.price}
          >
            {item.price ? "Get started" : "Contact us"}
          </Button>

          <ul>
            {item.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start py-5 border-t border-n-6 "
              >
                <img src={check} width={24} height={24} alt="Check" />
                <p>{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PricingList;
<div className="mt-[50px] mb-[50px] mx-0 text-[56px] p-5 font-medium">
  <p>
    <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
      Hello
    </span>
  </p>
  <p className="mt-8">How can i help you today</p>
</div>;