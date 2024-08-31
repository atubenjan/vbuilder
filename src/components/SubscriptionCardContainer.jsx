import React from 'react';
import SubscriptionPriceCard from './SubscriptionPriceCard';

const cardData = [
  {
    plan: 'FREE',
    price: '0',
    cardStyle: 'free',
    features: [
      { name: 'Multichoice questions', enable: true },
      { name: 'True/False', enable: true },
      { name: 'Short Answers', enable: true },
      { name: 'Fill in the blanks', enable: false },
      { name: 'Matching pairs', enable: false },
      { name: 'Essay questions', enable: false },
      { name: 'Drag and Drop', enable: false },
      { name: 'Crosswords and puzzles', enable: false },
      { name: 'Interactive simulations', enable: false },
      { name: 'Peer review assignments', enable: false },
      { name: 'Case studies', enable: false },
      { name: 'Project-based assignments', enable: false },
    ],
  },
  {
    plan: 'PLUS',
    price: '5',
    cardStyle: 'plus',
    features: [
      { name: 'Multichoice questions', enable: true },
      { name: 'True/False', enable: true },
      { name: 'Short Answers', enable: true },
      { name: 'Fill in the blanks', enable: true },
      { name: 'Matching pairs', enable: true },
      { name: 'Essay questions', enable: true },
      { name: 'Drag and Drop', enable: true },
      { name: 'Crosswords and puzzles', enable: true },
      { name: 'Interactive simulations', enable: false },
      { name: 'Peer review assignments', enable: false },
      { name: 'Case studies', enable: false },
      { name: 'Project-based assignments', enable: false },
    ],
  },
  {
    plan: 'PRO',
    price: '10',
    cardStyle: 'pro',
    features: [
      { name: 'Multichoice questions', enable: true },
      { name: 'True/False', enable: true },
      { name: 'Short Answers', enable: true },
      { name: 'Fill in the blanks', enable: true },
      { name: 'Matching pairs', enable: true },
      { name: 'Essay questions', enable: true },
      { name: 'Drag and Drop', enable: true },
      { name: 'Crosswords and puzzles', enable: true },
      { name: 'Interactive simulations', enable: true },
      { name: 'Peer review assignments', enable: true },
      { name: 'Case studies', enable: true },
      { name: 'Project-based assignments', enable: true },
    ],
  },
];

const SubscriptionCardContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 justify-between items-center lg:grid-cols-3 gap-4">
      {cardData.map((card, index) => (
        <SubscriptionPriceCard key={index} card={card} />
      ))}
    </div>
  );
};

export default SubscriptionCardContainer;
