import React from "react";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import profile from "../assets/profile.jpg";

const Organization = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content area */}
      <div className="flex-grow">
        <PageTitle text="Organization" image={profile} showSearch={false} />
        <div className="px-2 md:px-4">Organization</div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Organization;
