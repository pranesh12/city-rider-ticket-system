import React from "react";
import { Link } from "react-router-dom";
import "./TransportCards.css";
const TransportCards = ({ tansports }) => {
  const { image, type, id } = tansports;
  return (
    <>
      <div mt-5>
        <Link to={`/destination/${id}`}>
          <div
            className="card pt-4  pl-3 pr-3 shadow border-0"
            style={{ width: "18rem" }}
          >
            <img src={image} className="card-img-top" alt={type} />
            <div className="card-body">
              <h5 className="card-text text-center">{type}</h5>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default TransportCards;
