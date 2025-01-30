import React from 'react';
import './RatingViewer.css';

interface RatingViewerProps {
  totalRating: number;
  interactive?: boolean;
}

const RatingViewer: React.FC<RatingViewerProps> = ({ totalRating }) => {
  const ratingView = 
    <div>
      <span
        className={`star filled`}
      >
        ★
      </span>
      <span>{totalRating}</span>
    </div>
  ;
  return <div className="rating-viewer">{ratingView}</div>;
};

export default RatingViewer;