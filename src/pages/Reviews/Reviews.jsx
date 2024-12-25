import Header from "../../components/Header/Header.jsx";
import "./Reviews.css";

export default function Home() {
  const elements = [
    {
      imie: "Anastasiia",
      data: "23-01-2004",
      text: "I dont like it",
      rating: 4,
    },
    { imie: "Pasha", data: "23-01-2003", text: "Super", rating: 4 },
    { imie: "Alexandr", data: "21-22-1998", text: "Nice", rating: 3 },
    { imie: "Alexandr", data: "21-22-1998", text: "Nice", rating: 5 },
    { imie: "Alexandr", data: "21-22-1998", text: "Nice", rating: 1 },
    { imie: "Alexandr", data: "21-22-1998", text: "Nice", rating: 2 },
  ];
  const Stars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span>★</span>);
    }
    return stars;
  };
  return (
    <div>
      <Header />
      {elements.map((element, index) => (
        <div
          className="card  mb-4 border-black bg-light w-50 mx-auto"
          key={index}
        >
          <div className="card-body">
            <div className="d-flex align-items-center ">
              <h5 className="fw-bold card-title">{element.imie}</h5>
              <small className="ms-3">{element.data}</small>
            </div>
            <div>{Stars(element.rating)}</div>
            <p className="fs-5 card-text">{element.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
