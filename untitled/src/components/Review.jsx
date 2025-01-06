export default function Review({ name, date, rating, text }) {
  const Stars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span>★</span>);
    }
    return stars;
  };
  return (
    <div className="card  mb-4 border-black bg-light w-50 mx-auto">
      <div className="card-body">
        <div className="d-flex align-items-center ">
          <h5 className="fw-bold card-title">{name}</h5>
          <small className="ms-3">{new Date(date).toLocaleDateString()}</small>
        </div>
        <div>{Stars(rating)}</div>
        <p className="fs-5 card-text">{text}</p>
      </div>
    </div>
  );
}
