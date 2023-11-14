import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function BookingCard({ booking }) {
  function getDate(date) {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", options);
  }
  const newPrice = booking.price.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
  return (
    <Card style={{ width: "27rem" }}>
      <Card.Body>
        <Card.Title>{`Room Number: ${booking.roomNumber}`}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {/* {`Guest's Name: ${booking.userName}`} */}
        </Card.Subtitle>
        <Card.Text>

          <strong>Price: </strong>
          {`${newPrice}`}

        </Card.Text>

        <Card.Text>
          <strong>Booking Start Date: </strong>
          {`${getDate(booking.startTime)}`}
        </Card.Text>

        <Card.Text>
          <strong>Booking End Date: </strong>
          {`${getDate(booking.endTime)}`}
        </Card.Text>

        <Link to="/update" state={booking}>
          <button className="btn btn-secondary btn1">Update</button>
        </Link>

      </Card.Body>
      
    </Card>
  );
}

export default BookingCard;
