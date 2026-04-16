import ApiResponse from "../../common/utils/api-response.js";
import * as seatsService from "./seats.service.js";

const getSeats = async (req, res) => {
  try {
    const result = await seatsService.getSeats();
    ApiResponse.ok(res, "Seats fetched", result);
  } catch (error) {
    next(error);
  }
};

export { getSeats };
