import Block from "../../components/Block/Block.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import Pagination from "../../components/Pagination/Pagination.jsx";

export default function Home({ isAuthenticated }) {
  const [data, setData] = useState([]);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

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
    <>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <div>
        {currentData.map((item, index) => (
          <Block
            key={item.name}
            name={item.name}
            price={item.price}
            description={item.description}
            id={index}
            image={item.image}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </>
  );
}
