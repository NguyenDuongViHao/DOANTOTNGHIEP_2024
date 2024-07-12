const StarRating = ({ rating, setRating }) => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <span
              key={index}
              className={`star ${ratingValue <= rating ? 'selected' : ''}`}
              onClick={() => setRating(ratingValue)}
            >
              &#9733;
            </span>
          );
        })}
      </div>
    );
  };

export default StarRating;