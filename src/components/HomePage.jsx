import React from 'react';

const HomePage = () => {
  return (
    <div className="p-3  pt-20">
      <div className="w-full h-fit flex justify-between items-center rounded-lg bg-slate-800">
        <div className="text-white p-3 w-full md:w-4/5 text-center">
          <h2 className="text-2xl md:text-4xl text-center">
            Welcome back to Vbuilder Quizzes
          </h2>
          <p className="text-center pt-5">Prepare . Practice . Learn</p>
        </div>
        <div className="h-full w-1/5 relative overflow-hidden">
          <img
            src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yNl8zZF9pbGx1c3RyYXRpb25fb2ZfYV9ib3lfc2l0dGluZ19vbl90aGVfZmxvb18zMjc1NTFkMC1mMzRiLTQ3NzItYjg4YS1hOGM5Yzg2ODFiMzFfMS5qcGc.jpg"
            alt="Learner"
            className="w-full hidden md:block h-full rounded-r-lg object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
