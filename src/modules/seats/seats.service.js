import ApiError from "../../common/utils/api-error.js";
import pool from "../../common/db/pool.js";

const getSeats = async () => {
  const result = await pool.query("SELECT * FROM seats ORDER BY id ASC");
  return result.rows;
};

export { getSeats };
