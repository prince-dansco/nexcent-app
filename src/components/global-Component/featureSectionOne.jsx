import React from "react";

export default function FeatureSectionOne() {
  return (
    <div className="max-w-7xl mx-auto md:px-[55px] px-3 py-7">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="">
          <img src="/landing.png" alt="" />
        </div>
        <div className="max-w-[500px] w-full text-center md:text-start">
          <article>
            <h3 className="text-lg md:text-3xl font-sans font-bold text-gray-500">
              The unseen of spending three years at Pixelgrade
            </h3>
            <p className="text-xs text-gray-400 my-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
              amet justo ipsum. Sed accumsan quam vitae est varius fringilla.
              Pellentesque placerat vestibulum lorem sed porta. Nullam mattis
              tristique iaculis. Nullam pulvinar sit amet risus pretium auctor.
              Etiam quis massa pulvinar, aliquam quam vitae, tempus sem. Donec
              elementum pulvinar odio.
            </p>
            <button className="px-4 py-3 rounded-lg bg-green-500 text-base font-sans font-semibold text-white hover:bg-green-800 hover:text-black hover:opacity-55">
              Learn more
            </button>
          </article>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between my-14">
        <div className="">
          <h3 className=" text-2xl   md:text-5xl font-sans font-bold text-center md:text-start">
            Helping a local{" "}
            <span className="block text-green-500">
              business reinvent itself
            </span>{" "}
          </h3>
          <p className="text-sm text-gray-400 mt-3">
            We reached here with our hard work and dedication
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 md:mt-0">
          <div className="flex  gap-2 ">
            <img src="/group_four.png" alt="" />
            {/* <img src="/goup_one.png" alt="" /> */}
            <div className="">
              <h3 className="text-3xl font-sans font-bold"> 2,245,341 </h3>
              <span className="block text-sm font-bold text-gray-500">
                members
              </span>
            </div>
          </div>
          <div className="flex   gap-2">
            <img src="/goup_one.png" alt="" />
            <div className="">
              <h3 className="text-3xl font-sans font-bold"> 46,328 </h3>
              <span className="block text-sm font-bold text-gray-500">
                clubs
              </span>
            </div>
          </div>
          <div className="flex   gap-2">
            <img src="/goup_three.png" alt="" />
            <div className="">
              <h3 className="text-3xl font-sans font-bold"> 828,867 </h3>
              <span className="block text-sm font-bold text-gray-500">
                Event Bookings
              </span>
            </div>
          </div>
          <div className="flex  gap-2 ">
            {/* <img src="/goup_one.png" alt="" /> */}
            <img src="/group.png" alt="" />
            <div className="">
              <h3 className="text-3xl font-sans font-bold"> 1,926,436 </h3>
              <span className="block text-sm font-bold text-gray-500">
                payments
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
