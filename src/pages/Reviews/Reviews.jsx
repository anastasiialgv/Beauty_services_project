import Header from "../../components/Header/Header.jsx";
import Review from "../../components/Review.jsx";

export default function Home() {
  const elements = [
    {
      name: "Anastasiia",
      date: "23-01-2004",
      text: "I dont like it",
      rating: 4,
    },
    { name: "Pasha", date: "23-01-2003", text: "Super", rating: 4 },
    { name: "Alexandr", date: "21-22-1998", text: "Nice", rating: 3 },
    { name: "Alexandr", date: "21-22-1998", text: "Nice", rating: 5 },
    { name: "Alexandr", date: "21-22-1998", text: "Nice", rating: 1 },
    { name: "Alexandr", date: "21-22-1998", text: "Nice", rating: 2 },
  ];
  return (
    <div>
      <Header />
      {elements.map((element, index) => (
        <Review
          key={index}
          name={element.name}
          date={element.date}
          rating={element.rating}
          text={element.text}
        />
      ))}
    </div>
  );
}
