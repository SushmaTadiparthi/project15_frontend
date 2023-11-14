import React, { useState, useEffect } from "react";
import axios from "axios";
import RoomCard from "../components/Room";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  function sendUrl(type) {
    if (type === "A")
      return "https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg";
    else if (type === "B")
      return "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    else
      return "https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  }
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://hostel-booking-system-backend.onrender.com/rooms"
      );
      setRooms(response.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>Available Rooms</h1>

      <Container className="container">
        {rooms.map((room) => (
          <Row className="item" key={room.id}>
            <RoomCard
              roomNumber={room.roomNumber}
              roomType={room.roomType}
              pricePerHour={room.pricePerHour}
              imageUrl={sendUrl(room.roomType)}
            />
          </Row>
        ))}
      </Container>
    </>
  );
}

export default RoomList;
