import React, { useState } from "react";
import { useParams } from "react-router";
import map from "../../resources/images/Map.png";
import trasnporstData from "../../resources/data/fakedata.json";
import { Map, GoogleApiWrapper } from "google-maps-react";

const Destination = () => {
  const { typeId } = useParams();
  const transport = trasnporstData.find((t) => t.id === Number(typeId));
  const [pickFrom, setPickFrom] = useState();
  const [pickTo, setPickTo] = useState();
  const [submited, setSubmited] = useState(false);
  const [date, setDate] = useState();

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

  const mapStyles = {
    width: "100%",
    height: "100%",
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
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Pick TO</label>
                    <input
                      onChange={handleTo}
                      type="text"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="mr-2">Date:</label>
                    <input onChange={hanldeDate} type="date" name="birthday" />
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
                <h2>From : {pickFrom}</h2>
                <h2>To : {pickTo}</h2>
                <h2>Date: {date}</h2>

                <img className="img img-fluid" src={transport.image} alt="" />
              </div>
            </div>
          )}

          <div className="col-md-8 ">
            <Map
              google={this.props.google}
              zoom={8}
              style={mapStyles}
              initialCenter={{ lat: 47.444, lng: -122.176 }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Destination;
