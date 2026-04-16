import { Router } from "express";
import * as controller from "./seats.controller.js";

const seatRoutes = Router();

seatRoutes.get("/", controller.getSeats);

export default seatRoutes;
