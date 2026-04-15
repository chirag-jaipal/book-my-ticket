import pool from "../../common/db/pool.js";
import ApiError from "../../common/utils/api-error.js";

const bookSeat = async (userId, seatId, name) => {
  const conn = await pool.connect();

  try {
    await conn.query("BEGIN");

    // lock seat
    const result = await conn.query(
      "SELECT * FROM seats WHERE id = $1 AND isbooked = 0 FOR UPDATE",
      [seatId],
    );

    if (result.rowCount === 0) {
      throw ApiError.conflict("Seat already booked");
    }

    // insert booking
    await conn.query(
      "INSERT INTO bookings (user_id, seat_id) VALUES ($1, $2)",
      [userId, seatId],
    );

    // update seat
    const updateResult = await conn.query(
      "UPDATE seats SET isbooked = 1, name = $2 WHERE id = $1 RETURNING *",
      [seatId, name],
    );

    await conn.query("COMMIT");

    return updateResult.rows[0];
  } catch (err) {
    await conn.query("ROLLBACK");
    throw err;
  } finally {
    conn.release();
  }
};

export { bookSeat };
