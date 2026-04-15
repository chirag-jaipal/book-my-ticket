import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware.js";
import * as controller from "./booking.controller.js";

const bookingRoutes = Router();

bookingRoutes.put("/:id", authenticate, controller.bookSeat);

export default bookingRoutes;
