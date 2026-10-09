import React from "react";

export default function ServicesSecTwo() {
  return (
    <div className="mt-14">
      <div className="max-w-[600px] w-full mx-auto text-center ">
        <h2 className="text-[40px] leading-10 font-sans font-semibold text-gray-900 ">
          Manage your entire community in a single system
        </h2>
        <pre className="text-sm text-gray-800 font-sans mt-1">
          Who is Nextcent suitable for?
        </pre>
      </div>
      <div className="flex flex-col md:flex-row  items-center justify-between gap-4 mt-10">
        <div className="max-w-[300px] w-full h-[265px] flex shadow-md flex-col items-center gap-4 text-center p-3">
          <img
            src="/sec_tion.png"
            alt="organized community"
            className="w-[20%]"
          />
          <article className="flex flex-col gap-2">
            <h3 className="font-sans font-bold text-gray-400 text-4xl ">
              Membership Organisations
            </h3>
            <p>
              Our membership management software provides full automation of
              membership renewals and payments
            </p>
          </article>
        </div>
        <div className="max-w-[280px] h-[265px] w-full  shadow-md flex flex-col items-center gap-4 text-center p-3">
          <img src="/sect_ion.png" alt="association" className="w-[20%]" />
          <article className="flex flex-col gap-2">
            <h3 className="font-sans font-bold text-gray-400 text-4xl ">
              National Associations
            </h3>
            <p>
              Our membership management software provides full automation of
              membership renewals and payments
            </p>
          </article>
        </div>
        <div className="max-w-[300px] w-full  h-[265px] shadow-md flex flex-col items-center gap-4 text-center p-3">
          <img src="/secti_on.png" alt="group" className="w-[20%]" />
          <article className="flex flex-col gap-2">
            <h3 className="font-sans font-bold text-gray-400 text-4xl ">
              Clubs And Groups
            </h3>
            <p>
              Our membership management software provides full automation of
              membership renewals and payments
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
