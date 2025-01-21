import Header from "../../components/Header/Header.jsx";
import Review from "../../components/Review.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Reviews(isAuthenticated) {
  const [data, setData] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/getreviews")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error("Error /getservices", err);
      });
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating < 0 || rating > 5) {
      setError("Rating must be between 0 and 5");
      return;
    }
    if (review.trim() === "") {
      setError("Review text cannot be empty");
      return;
    }
    setError("");

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User not authenticated");
      return;
    }
    axios
      .post(
        "http://localhost:5000/createreview",
        {
          text: review,
          rating: rating,
          date: formattedDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        setReview("");
        setRating(0);
      })
      .catch((err) => {
        console.error(
          "Error creating review(1)",
          err,
          err.response ? err.response.data : err.message,
        );
      });
  };
  return (
    <div>
      {data.map((element) => (
        <Review
          key={element.idreview}
          name={element.user_email}
          date={element.date}
          rating={element.rating}
          text={element.text}
        />
      ))}
      <div className="card  mb-4 border-black bg-light w-50 mx-auto background">
        <div className="card-body background">
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label htmlFor={"reviewText"} className="form-label text-info ">
                **Login to write a review**
              </label>
              <textarea
                className="form-control"
                id="reviewText"
                rows="3"
                value={review}
                placeholder={"Write your review here"}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="0"
                max="5"
              />
            </div>
            {error && <div className="text-danger mt-2">{error}</div>}
            <button
              type="submit"
              className="btn btn-dark w-100"
              disabled={!isAuthenticated.isAuthenticated}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
