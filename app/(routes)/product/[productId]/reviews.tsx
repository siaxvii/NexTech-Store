import React from 'react';
import { FaStar } from "react-icons/fa";

const Reviews: React.FC = () => {
  // Mock review data
  const reviews = [
    { id: 1, author: 'John Doe', date: "10/23/24", rating: 4, comment: 'Great product! The camera quality is excellent and the battery life lasts me all day. However, I wish the screen were a bit brighter.' },
    { id: 2, author: 'Jane Smith', date: "8/9/24", rating: 5, comment: 'I love this product! The sound quality is amazing, and the user interface is very intuitive. It exceeded all my expectations.' },
    { id: 3, author: 'Alex Johnson', date: "9/15/24", rating: 3, comment: 'Decent product overall. The build quality is solid, but I found the software to be a bit buggy. The camera features are impressive, though.' },
    { id: 4, author: 'Emily Brown', date: "7/6/24", rating: 4, comment: 'I\'m quite satisfied with this product. The performance is smooth, and the design is sleek. The only downside is the lack of expandable storage.' },
    { id: 5, author: 'Michael Davis', date: "6/12/24", rating: 5, comment: 'Absolutely fantastic product! The display is stunning, and the camera features are top-notch. The battery life is also impressive, lasting me through a full day of heavy use.' },
  ];

  return (
    <div className="mt-10">
      <h3 className="font-bold text-3xl pb-8" tabIndex={0}>Customer Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded p-4" tabIndex={0}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{review.author}</span>
              <div className="flex">
                {Array.from({ length: review.rating }, (_, index) => (
                    <FaStar key={index} className="h-5 w-5 text-yellow-500" />
                ))}
                
                {Array.from({ length: 5 - review.rating }, (_, index) => (
                    <FaStar key={index + review.rating} className="h-5 w-5 text-gray-400" />
                ))}
              </div>
            </div>
            <span className="flex pb-9">Reviewed On: {review.date}</span>
            <span className="sr-only"> ( ) {review.rating} out of 5 stars.</span>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
