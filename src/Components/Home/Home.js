import React, { useEffect, useState } from "react";
import fakeDta from "../../resources/data/fakedata.json";
import TransportCards from "../TransportCards/TransportCards";
import "./Home.css";

const Home = () => {
  const [tansports, setTansports] = useState([]);
  useEffect(() => {
    setTansports(fakeDta);
  }, []);

  return (
    <>
      <main className="main container">
        <div className="cards container mt-5 p-3 allCard">
          <div className="row">
            <div className="rounded card-deck">
              {tansports.map((tp) => (
                <TransportCards tansports={tp} key={tp.id}></TransportCards>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
