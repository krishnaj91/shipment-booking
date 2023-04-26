import { Button } from "@mui/material";
import React, { useState } from "react";
import "./booking.css";

const Booking = () => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    mobile: "",
    from: "",
    to: "",
    weight: "",
    amount: "",
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

  const handleChange = (name: any, value: any) => {
    setForm((preValue) => ({ ...preValue, [name]: value }));
    setFormError((preValue) => ({ ...preValue, [name]: "" }));
  };

  const exceptThisSymbols = ["e", "E", "+", "-", "."];

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

  function generateRandomString(length: any) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleSubmit = () => {
    validate();
    setForm({ ...form, id: generateRandomString(12) });
  };

  return (
    <div className="booking">
      <h1>Fill the Details for booking your order</h1>
      <input
        className="inpt"
        placeholder="name"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <p className="err">{formError.name}</p>
      <input
        className="inpt"
        placeholder="mobile"
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
        placeholder="origin"
        value={form.from}
        onChange={(e) => handleChange("from", e.target.value)}
      />
      <p className="err">{formError.from}</p>
      <input
        className="inpt"
        placeholder="destination"
        value={form.to}
        onChange={(e) => handleChange("to", e.target.value)}
      />
      <p className="err">{formError.to}</p>
      <input
        className="inpt"
        placeholder="weight"
        value={form.weight}
        onChange={(e) => handleChange("weight", e.target.value)}
      />
      <p className="err">{formError.weight}</p>
      <input
        className="inpt"
        type="number"
        placeholder="amount"
        value={form.amount}
        onChange={(e) => handleChange("amount", e.target.value.toString().slice(0,4))}
      />
      <p className="err">{formError.amount}</p>
      <button onClick={handleSubmit}>SUBMIT</button>
    </div>
  );
};

export default Booking;
