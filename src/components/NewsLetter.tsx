import { FC } from "react";

interface NewsLetterProps {}

export const NewsLetter: FC<NewsLetterProps> = ({}) => {
  return (
    <section className="text-center py-10 lg:py-14 px-6 bg-gradient-newsletter">
      <h1 className="text-primaryGreen text-xl font-extrabold md:text-2xl">
        Subcribe on our newsletter
      </h1>
      <p className="text-[#606060] leading-5 font-normal text-sm mt-1">
        Get daily news on upcoming offers from many supplers all over the world
      </p>
      <form className="max-w-[27rem] mx-auto mt-6 rounded-md border border-[#D3D3D3] overflow-hidden flex justify-center items-center">
        <input
          type="text"
          // disabled
          placeholder="Enter your email address..."
          className="w-full px-3 py-3 bg-white h-full placeholder:text-[#D3D3D3]"
        />
        <button type='button' className="px-6 py-3 text-white bg-afruna-blue">
          Subcribe
        </button>
      </form>
    </section>
  );
};
