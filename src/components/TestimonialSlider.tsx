"use client";

import { testimonialData } from "@/constants/data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  //   slider lenght
  const slideLength = testimonialData.length;
  // Define the number of testimonials to show in one slide
  const testimonialsPerSlide = 3;
  const autoScroll = true;
  let showInterval: string | number | NodeJS.Timeout | undefined;
  let intervalTime = 7000;

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + testimonialsPerSlide) % testimonialData.length
    );
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - testimonialsPerSlide + testimonialData.length) %
        testimonialData.length
    );
  };
  const autoshow = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + testimonialsPerSlide) % testimonialData.length
    );
    // setCurrentIndex(currentIndex === slideLength - 1 ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        showInterval = setInterval(autoshow, intervalTime);
      };
      auto();
    }
    return () => clearInterval(showInterval);
  }, [currentIndex, showInterval, autoshow]);

  const [isTooLong, setIsTooLong] = useState(false);

  return (
    <div className="relative px-6 pt-8 bg-[#FEE5CB] h-[10rem] w-full">
      <div className=" flex gap-4 overflow-x-auto">
        {testimonialData
          .slice(currentIndex, currentIndex + testimonialsPerSlide)
          .map((testimonial, index) => (
            <div
              key={index}
              className="lg:w-[27rem] lg:h-[13re rounded-lg p-6 bg-white shadow-xl flex flex-col gap-8 "
            >
              <>
                <p className="text-gray-700 text-xs font-semibold">
                  {testimonial.statement.length > 100 ? (
                    <>{`${testimonial.statement.slice(0, 180)}...`}</>
                  ) : (
                    <>{testimonial.statement}</>
                  )}
                </p>
                <div className="flex justify-start items-center gap-2">
                  <div className="w-[4rem] h-[4rem] overflow-hidden relative flex justify-center items-center">
                    <Image src={testimonial.img} alt="partner" priority fill />
                  </div>
                  <div className="font-medium flex flex-col gap-1">
                    <h3 className="text-afruna-blue text-sm font-semibold">
                      {testimonial.name}
                    </h3>
                    <span className=" text-afruna-gray text-xs">
                      {testimonial.services}
                    </span>
                  </div>
                </div>
              </>
              {/* )} */}
            </div>
          ))}
      </div>
      <div className="absolute -top-[4rem] right-[3rem] text-center flex items-center gap-4">
        {/* {currentIndex > 0 && ( */}
        <button
          onClick={handlePrev}
          className="text-afruna-gold border border-afruna-gold w-[2rem] h-[2rem] rounded-full flex justify-center items-center"
        >
          <ArrowLeft size={16} />
          {/* &lt; */}
        </button>
        {/* )} */}
        {/* {currentIndex + testimonialsPerSlide < testimonialData.length && ( */}
        <button
          onClick={handleNext}
          className=" text-afruna-gold border border-afruna-gold w-[2rem] h-[2rem] rounded-full flex justify-center items-center"
        >
          {/* &gt; */}
          <ArrowRight size={16} />
        </button>
        {/* )} */}
      </div>
    </div>
  );
};

export default TestimonialSlider;
