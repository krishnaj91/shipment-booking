import React, { useState } from "react";
import "./tracking.css";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";

const Tracking = () => {
  const [search, setSearch] = useState<any>("");
  const [searchError, setSearchError] = useState<any>("");
  const [data, setData] = useState<any>({});
  const [display, setDisplay] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [verify, setVerify] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [deleteOrder, setDeleteOrder] = useState(true);
  const [hint, setHint] = useState(false);

  const sessionData: any = sessionStorage.getItem("data");
  const orderID = sessionStorage.getItem("order");

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleChange = (e: any) => {
    setSearch(e);
    setSearchError("");
  };

  const handleVerify = (e: any) => {
    setVerify(e);
    setVerifyError("");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleHint = () => {
    setSearch(orderID);
    setHint(false);
  };

  const validate = () => {
    if (search === "") {
      setSearchError("Please Enter Your Order ID");
    } else if (search.length < 12) {
      setSearchError("Invalid Order ID");
    } else if (
      !sessionStorage.getItem("order") ||
      search !== sessionStorage.getItem("order")
    ) {
      setSearchError("Please Check Your Order ID (Shipment Not Found)");
    } else {
      setSearchError("");
    }
  };

  const validateVerify = () => {
    if (verify === "") {
      setVerifyError("Please enter your mobile number");
    } else if (verify.length < 10) {
      setVerifyError("Invalid mobile number");
    } else if (verify !== data.mobile) {
      setVerifyError("Mobile number does not matched");
    } else {
      setVerifyError("");
    }
  };

  const handleVerifySubmit = () => {
    validateVerify();
    if (verify === data.mobile) {
      setDeleteOrder(false);
    }
  };

  const deleteData = () => {
    sessionStorage.clear();
    handleClose();
    setDisplay(false);
    setSearchError("Shipment cancelled");
    setSearch("");
  };

  const handleSubmit = () => {
    validate();
    if (
      search === sessionStorage.getItem("order") &&
      sessionStorage.getItem("order") !== ""
    ) {
      setData(JSON.parse(sessionData));
      setDisplay(true);
    }
  };

  return (
    <>
      <div className="tracking">
        <h1>Enter your 12 Digit Order ID to check the Status</h1>
        <div className="hint">
          <div className="search">
            <SearchIcon
              className="search-icon"
              fontSize="large"
              onClick={handleSubmit}
            />
            <input
              placeholder="Search......."
              type="search"
              value={search}
              className="search-inpt"
              onChange={(e: any) =>
                handleChange(
                  e.target.value.toString().slice(0, 12).toUpperCase()
                )
              }
              onKeyPress={handleKeyPress}
            />
          </div>
          <span onClick={() => setHint(true)}>Hint :</span>
          {hint === true && (
            <span>
              {" "}
              Recent bookings ID :{" "}
              {sessionStorage.getItem("order") ? (
                <span
                  onClick={() => handleHint()}
                  style={{ textDecoration: "underline" }}
                >
                  {sessionStorage.getItem("order")}
                </span>
              ) : (
                "No records found"
              )}
              <br /> click on order ID to search
            </span>
          )}
        </div>
        <p className="red">{searchError}</p>
      </div>

      {display === true && (
        <div className="track-data">
          <h1>
            Status : Booking <span className="green">CONFORMED</span>
          </h1>

          <div className="row">
            <h2>
              From : <b>{data.from}</b>
            </h2>
            <h2>
              To : <b>{data.to}</b>
            </h2>
          </div>
          <p>
            Tracking ID : <b>{data.id}</b>
          </p>
          <div className="row">
            <input type="checkbox" checked />
            <div>
              <h3>Ordered : {data.date}</h3>
            </div>
          </div>

          <div className="row">
            <input type="checkbox" disabled />
            <h3>
              Shipped : <span className="red">OnGoing</span>
            </h3>
          </div>

          <div className="row">
            <input type="checkbox" disabled />
            <h3>On the Way</h3>
          </div>

          <div className="row">
            <input type="checkbox" disabled />
            <h3>Arriving By : {data.estimatedDelivery}</h3>
          </div>
          <Button variant="outlined" onClick={handleOpen}>
            Cancel Order
          </Button>
          <br />
          <br />
          <hr style={{ width: "90%" }} />
          <h2>Order Summary</h2>
          <h3>Mobile Number : {data.mobile}</h3>
          <h3>Order date : {data.date}</h3>
          <h3>Order time : {data.time}</h3>
          <h3>Shipment Weight : {data.weight} Kg</h3>
          <h3>Total Amount : ₹ {data.amount}</h3>
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography className="cross">
            <h3>Are you Sure ?</h3>
            <CloseIcon onClick={handleClose} />
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Enter your mobile number to cancel your order
          </Typography>

          <div className="delete">
            <TextField
              placeholder="Registered mobile number"
              type="number"
              value={verify}
              onChange={(e: any) =>
                handleVerify(e.target.value.toString().slice(0, 10))
              }
            />
            <Button variant="contained" onClick={handleVerifySubmit}>
              Verify
            </Button>
          </div>

          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            className="err-verify"
          >
            {verifyError}
          </Typography>

          <div className="modal-btn">
            <Button
              variant="contained"
              disabled={deleteOrder}
              onClick={deleteData}
            >
              DELETE
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Tracking;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
