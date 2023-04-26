import React, { useEffect, useState  } from "react";
import "./booking.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: "",
    name: "",
    mobile: "",
    from: "",
    to: "",
    weight: "",
    amount: "",
    date: "",
    time: "",
    estimatedDelivery:''
  });
  const [formError, setFormError] = useState({
    id: "",
    name: "",
    mobile: "",
    from: "",
    to: "",
    weight: "",
    amount: "",
  });
  const [open, setOpen] = React.useState(false);
  const [copy, setCopy] = React.useState(false);

  const handleAuto = () => {
    setForm({...form,
      
      name: "krishna",
      mobile: "9898756745",
      from: "Hyderabad",
      to: "New Delhi",
      weight: "10",
      amount: "500",
    
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/tracking");
  };

  const handleChange = (name: any, value: any) => {
    setForm((preValue) => ({ ...preValue, [name]: value }));
    setFormError((preValue) => ({ ...preValue, [name]: "" }));
  };

  const exceptThisSymbols = ["e", "E", "+", "-", "."];
  // const currentDate = new Date().toLocaleString();

  const today = new Date(); // current date
  const daysToAdd = 2; // number of days to add
  const options: any = { day: "2-digit", month: "2-digit", year: "numeric" };
  const date = today.toLocaleDateString("en-IN", options); // outputs the current date in the Indian format DD/MM/YYYY,
  const time = today.toLocaleTimeString(); // outputs the current time in the default format, e.g. 10:30:45 AM

  const endDate = new Date(today);
  endDate.setDate(today.getDate() + daysToAdd);
  const formattedEndDate = endDate.toLocaleDateString("en-IN", options); // outputs the date after adding 2 days in DD/MM/YYYY format

  function generateRandomString(length: any) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = 12;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const validate = () => {
    const tempObj = { ...formError };
    if (form.name === "") {
      tempObj.name = "Please enter your name";
    } else {
      tempObj.name = "";
    }
    if (form.mobile === "") {
      tempObj.mobile = "Please enter your mobile number";
    } else if (form.mobile.length < 10) {
      tempObj.mobile = "Invalid mobile number";
    } else {
      tempObj.mobile = "";
    }
    if (form.from === "") {
      tempObj.from = "Please enter your from";
    }
    if (form.to === "") {
      tempObj.to = "Please enter your to";
    }
    if (form.weight === "") {
      tempObj.weight = "Please enter your weight";
    }
    if (form.amount === "") {
      tempObj.amount = "Please enter your amount";
    }
    setFormError(tempObj);
  };

  const handleSubmit = () => {
    validate();
    if (
      form.name.length > 2 &&
      form.mobile.length >= 10 &&
      form.from.length > 2 &&
      form.to.length > 2 &&
      form.weight &&
      form.amount
    ) {
      setForm({
        ...form,
        id: generateRandomString(12),
        date: date,
        time: time,
        estimatedDelivery: formattedEndDate
      });
      handleOpen();
      sessionStorage.setItem("data", JSON.stringify(form));
    }
    
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(form.id);
    setCopy(true);
  };

  useEffect(() => {
    if (
      form.name.length > 2 &&
      form.mobile.length >= 10 &&
      form.from.length > 2 &&
      form.to.length > 2 &&
      form.weight &&
      form.amount
    ) {
      sessionStorage.setItem("order", form.id);
    }
    if(open===true){
      sessionStorage.setItem("data", JSON.stringify(form));
    }
  });

 

  return (
    <>
      <div className="booking">
        <h1>Fill the Details for booking your order</h1>
        <input
          className="inpt"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            handleChange("name", e.target.value.toString().slice(0, 15))
          }
        />
        <p className="err">{formError.name}</p>
        <input
          className="inpt"
          placeholder="Mobile Number"
          value={form.mobile}
          type="number"
          onWheel={(e: any) => e.target.blur()}
          onKeyDown={(e) =>
            exceptThisSymbols.includes(e.key) && e.preventDefault()
          }
          onChange={(e) =>
            handleChange("mobile", e.target.value.toString().slice(0, 10))
          }
        />
        <p className="err">{formError.mobile}</p>
        <input
          className="inpt"
          placeholder="Origin"
          value={form.from}
          onChange={(e) =>
            handleChange("from", e.target.value.toString().slice(0, 15))
          }
        />
        <p className="err">{formError.from}</p>
        <input
          className="inpt"
          placeholder="Destination"
          value={form.to}
          onChange={(e) =>
            handleChange("to", e.target.value.toString().slice(0, 15))
          }
        />
        <p className="err">{formError.to}</p>
        <input
          className="inpt"
          placeholder="Weight"
          type="number"
          onKeyDown={(e) =>
            exceptThisSymbols.includes(e.key) && e.preventDefault()
          }
          value={form.weight}
          onChange={(e) =>
            handleChange("weight", e.target.value.toString().slice(0, 3))
          }
        />
        <p className="err">{formError.weight}</p>
        <input
          className="inpt"
          type="number"
          onKeyDown={(e) =>
            exceptThisSymbols.includes(e.key) && e.preventDefault()
          }
          placeholder="Amount"
          value={form.amount}
          onChange={(e) =>
            handleChange("amount", e.target.value.toString().slice(0, 4))
          }
        />
        <p className="err">{formError.amount}</p>
        <button onClick={handleSubmit}>SUBMIT</button>
        {/* <span style={{ color: "#266c8f" }} onClick={handleAuto}>
          AUTOFILL (Sample Date)
        </span> */}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography className="cross">
            <h3>
              Shipment Booking <span className="green">SUCCESSFUL</span>
            </h3>
            <CloseIcon onClick={handleClose} />
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your Order ID : <b>{form.id}</b>{" "}
            {copy === false ? (
              <span onClick={() => handleCopy()} className="copy">
                copy
              </span>
            ) : (
              <span className="copy">
                copied
                <DoneIcon />
              </span>
            )}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Order Date : <b className="red">{form.date}</b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Order Time : <b>{form.time}</b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Origin : <b>{form.from}</b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Destination : <b>{form.to}</b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Estimated Delivery : <b className="red">{formattedEndDate}</b>
          </Typography>
          <div className="modal-btn">
            <Button variant="contained" onClick={handleClose}>
              OK
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Booking;

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
