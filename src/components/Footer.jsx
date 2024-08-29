import React from 'react';

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <div className="flex justify-center w-full py-3 text-lg text-black bg-white">
      <span>&copy; </span>
      <span>{year} Vlearned MCQs </span>
    </div>
  );
};

export default Footer;
