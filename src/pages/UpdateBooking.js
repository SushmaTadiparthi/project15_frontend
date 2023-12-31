import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

const BookingForm = () => {
  function getDate(date) {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 16);
  }
  function getDate2(date) {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 16);
  }

  const [priceDisplay, setPriceDisplay] = useState(useLocation().state.price);
  const [pricePerHour, setPricePerHour] = useState();
  const navigate = useNavigate();
  const [postUpdate, setPostUpdate] = useState(false);
  const [booking, setBooking] = useState({
    id: useLocation().state._id,
    userEmail: useLocation().state.userEmail,
    userName: useLocation().state.userName,
    roomNumber: useLocation().state.roomNumber,
    startTime: useLocation().state.startTime,
    endTime: useLocation().state.endTime,
    price: useLocation().state.price,
    paymentType: useLocation().state.paymentType,
    tip: useLocation().state.tip,
  });

  useEffect(() => {
    booking.startTime = getDate(booking.startTime);
    booking.endTime = getDate2(booking.endTime);
  }, [booking]);

  useEffect(() => {
    if (postUpdate) {
      navigate("/view");
    }
  }, [postUpdate, navigate]);

  useEffect(() => {
    if (booking.endTime === "" || booking.startTime === "") return;
    const milliseconds = Math.ceil(
      Math.abs(Date.parse(booking.endTime) - Date.parse(booking.startTime))
    );
    const hours = Math.ceil(milliseconds / 36e5);
    const priceDisplay = hours * pricePerHour;
    setPriceDisplay(priceDisplay);
  }, [booking, pricePerHour]);

  useEffect(() => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://hostel-booking-system-backend.onrender.com/rooms/${booking.roomNumber}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setPricePerHour(response.data.pricePerHour);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [booking.roomNumber]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBooking({ ...booking, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const milliseconds = Math.ceil(
      Math.abs(Date.parse(booking.endTime) - Date.parse(booking.startTime))
    );
    const hours = Math.ceil(milliseconds / 36e5);
    const price = hours * pricePerHour;
    const updatedBooking = { ...booking, price };
    var config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `https://hostel-booking-system-backend.onrender.com/bookings/${booking.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: updatedBooking,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.acknowledged === true) {
          toast.success("Booking Updated");
          setPostUpdate(true);
        } else toast.error("Booking Failed");
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Update Booking</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Guest Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={booking.userEmail}
          name="userEmail"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Guest Name</Form.Label>
        <Form.Control
          type="name"
          placeholder="Enter name"
          value={booking.userName}
          name="userName"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Room Number:</Form.Label>
        <Form.Control
          type="text"
          name="roomNumber"
          value={booking.roomNumber}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Start Time:</Form.Label>
        <Form.Control
          type="datetime-local"
          name="startTime"
          value={booking.startTime}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>End Time:</Form.Label>
        <Form.Control
          type="datetime-local"
          name="endTime"
          value={booking.endTime}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price:</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={priceDisplay}
          required
          disabled
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Payment Type:</Form.Label>
        <Form.Control
          type="text"
          name="paymentType"
          value={booking.paymentType}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Tip:</Form.Label>
        <Form.Control
          type="number"
          name="tip"
          value={booking.tip}
          onChange={handleInputChange}
          required
        />
        <Form.Text className="text-muted">
         A tip is not required but is appreciated
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Update Booking
      </Button>
    </Form>
  );
};

export default BookingForm;
