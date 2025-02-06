import React from 'react';
import './RatingViewer.css';

interface RatingViewerProps {
  totalRating: number;
  interactive?: boolean;
}

const RatingViewer: React.FC<RatingViewerProps> = ({ totalRating }) => {
  const ratingView = 
    <div className='rating'>
      <span
        className={`star filled`}
      >
        ★
      </span>
      <span className="value">{totalRating}</span>
    </div>
  ;
  return <div className="rating-viewer">{ratingView}</div>;
};

export default RatingViewer;