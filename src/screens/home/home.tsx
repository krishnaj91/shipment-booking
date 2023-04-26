import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="home">
        <h1 className="home-title">
          Welcome to Online Shipment Booking Platform
        </h1>
        <div>
          <p>
            An online shipment booking platform is a digital platform for
            booking and managing shipments.
          </p>
          <ul>
            <li>It offers a range of shipping options and carriers to choose from.</li>
            <li>Users can track shipments in real-time, and access additional features</li>
            <li>These platforms are designed to be user-friendly</li>
            <li>Overall, they provide a convenient and efficient way to manage shipping needs, saving time and money</li>
          </ul>
        </div>

        <div>
          <h1>
            FOR BOOKING&nbsp; :{" "}
            <span onClick={() => navigate("/booking")}>click here</span>
          </h1>
          <h1>
            FOR TRACKING :{" "}
            <span onClick={() => navigate("/tracking")}>click here</span>
          </h1>
        </div>
      </div>
      <div className="home-contact">
        <h1>Any Queries ....?</h1>
        <h2>Get in Touch ,</h2>
        <p>
          CALL : <span> +91 ##### #####</span>
        </p>
        <p>
          MAIL : <span> #####@gmail.com</span>
        </p>
        <p style={{ color: "#266c8f" }}>Available 24*7</p>
      </div>
    </>
  );
};

export default Home;
