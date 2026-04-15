import ApiResponse from "../../common/utils/api-response.js";
import * as bookingServices from "./booking.service.js";

const bookSeat = async (req, res, next) => {
  try {
    const seatId = req.params.id;
    const userId = req.user.id;
    const name = req.user.name;

    const result = await bookingServices.bookSeat(userId, seatId, name);

    ApiResponse.ok(res, "Seat booked successfuly", result);
  } catch (error) {
    next(error);
  }
};

export { bookSeat };
