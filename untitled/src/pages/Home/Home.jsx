import Header from "../../components/Header/Header.jsx";
import Block from "../../components/Block.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home({ isAuthenticated }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/getservices")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error("Error /getservices", err);
      });
  }, []);
  return (
    <div>
      <Header />
      <div className="container">
        {data.map((item, index) => (
          <Block
            key={index}
            name={item.name}
            price={item.price}
            description={item.description}
            id={index}
            image={item.image}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
}
