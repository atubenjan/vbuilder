import React from 'react';
import PropTypes from 'prop-types';

const SubscriptionPriceCard = ({ card }) => {
  return (
    <div className={`card ${card.cardStyle} p-4 border rounded-lg shadow-md`}>
      <h2 className="text-xl font-semibold mb-4">{card.plan}</h2>
      <p className="text-2xl font-bold mb-4">${card.price}/month</p>
      <ul className="mb-4">
        {card.features.map((feature, index) => (
          <li
            key={index}
            className={`text-sm py-2 flex items-center ${feature.enable ? 'text-black' : 'text-gray-400'}`}
          >
            <span className="mr-2">{feature.enable ? '✓' : 'X'}</span>
            {feature.name}
          </li>
        ))}
      </ul>
      <button className="px-4 py-2 bg-slate-800 hover:bg-slate-400 hover:text-black text-white rounded-md">
        Subscribe
      </button>
    </div>
  );
};

SubscriptionPriceCard.propTypes = {
  card: PropTypes.shape({
    plan: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    cardStyle: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        enable: PropTypes.bool.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default SubscriptionPriceCard;
