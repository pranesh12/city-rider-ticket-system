import React, { useState } from "react";
import { useParams } from "react-router";
import map from "../../resources/images/Map.png";
import trasnporstData from "../../resources/data/fakedata.json";
import SimpleMap from "../GoogleMap/GoogleMap";

const Destination = () => {
  const { typeId } = useParams();
  const transport = trasnporstData.find((t) => t.id === Number(typeId));
  const [pickFrom, setPickFrom] = useState();
  const [pickTo, setPickTo] = useState();
  const [submited, setSubmited] = useState(false);
  const [date, setDate] = useState();
  const [ticketCount, setTicketCount] = useState();

  const handlePick = (e) => {
    setPickFrom(e.target.value);
  };
  const handleTo = (e) => {
    setPickTo(e.target.value);
  };
  const hanldeSubmit = () => {
    setSubmited(true);
  };

  const hanldeDate = (e) => {
    setDate(e.target.value);
  };
  const hanldeTicketCount = (e) => {
    setTicketCount(e.target.value);
  };
  return (
    <>
      <div className="map  container ">
        <div className="row mt-5">
          {!submited ? (
            <div className="col-md-4 map-left">
              <div className="map-form ">
                <form>
                  <div className="form-group">
                    <label>Pick From</label>
                    <input
                      onChange={handlePick}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Pick TO</label>
                    <input
                      onChange={handleTo}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="mr-2">Date:</label>
                    <input onChange={hanldeDate} type="date" name="Date" />
                  </div>
                  <div className="form-group">
                    <label className="mr-2">How Much Ticket?:</label>
                    <input onChange={hanldeTicketCount} name="count" />
                  </div>
                  <button
                    onClick={hanldeSubmit}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="col-md-4 map-left">
              <div className="map-form ">
                <p>From: {pickFrom}</p>
                <p>To: {pickTo}</p>
                <p>Price: {ticketCount * transport.price}</p>
                <p>Date: {date}</p>

                <img className="img img-fluid" src={transport.image} alt="" />
              </div>
            </div>
          )}

          <div className="col-md-8 ">
            {/* <img className="img-fluid" src={map} alt="" /> */}
            <SimpleMap></SimpleMap>
          </div>
        </div>
      </div>
    </>
  );
};

export default Destination;
