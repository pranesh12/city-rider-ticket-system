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
        <h2 className="text-center mt-5  text-uppercase">
          Buy Your Tickets Here
        </h2>
        <div className="cards container-sm mt-5 p-3 allCard">
          <div className="row justify-content-center">
            <div className="">
              <div className="rounded card-deck">
                {tansports.map((tp) => (
                  <TransportCards tansports={tp} key={tp.id}></TransportCards>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
