const AllMoviesAndReviews = (props) => {
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Watchlist</h3>
      <table
        style={{ marginRight: "auto", marginLeft: "auto", border: "solid 1px" }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Movie length</th>
            <th>Review</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {props.allMoviesAndReviews.map((movieAndReview) => (
            <MovieAndReviewRow
              key={movieAndReview.movie.id}
              movieAndReview={movieAndReview}
              removeMovie={props.removeMovie}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MovieAndReviewRow = ({ movieAndReview, removeMovie }) => {
  const movie = movieAndReview.movie;
  const review = movieAndReview.review;

  return (
    <tr>
      <td>{movie.title}</td>
      <td>{movie.year}</td>
      <td>{movie.runtime}</td>
      <td>{review.summary_short.substring(0, 15)}</td>
      <td>
        <button onClick={(e) => removeMovie(movie.id, e)}>Remove</button>
      </td>
    </tr>
  );
};

export default AllMoviesAndReviews;
