import Block from "../../components/Block.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

export default function Home({ isAuthenticated }) {
  const [data, setData] = useState([]);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
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
      <div className="pagination">
        {currentPage > 1 && (
          <button
            className="btn btn-outline-dark btn-sm me-2 bp"
            onClick={goToPreviousPage}
          >
            <img src="src/assets/left.png" />
          </button>
        )}
        <strong>
          {currentPage} of {totalPages}
        </strong>
        {currentPage < totalPages && (
          <button
            className="btn btn-outline-dark btn-sm ms-2 bp"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <img src="src/assets/right.png" />
          </button>
        )}
      </div>
      <div>
        {currentData.map((item, index) => (
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
