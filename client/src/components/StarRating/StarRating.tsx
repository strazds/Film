import React from 'react';
import './StarRating.css';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  onChange?: (rating: number) => void;
  interactive?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 10, onChange, interactive = false }) => {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    const isFilled = i <= rating;
    stars.push(
      <span
        key={i}
        className={`star ${isFilled ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
        onClick={interactive && onChange ? () => onChange(i) : undefined}
      >
        ★
      </span>
    );
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;