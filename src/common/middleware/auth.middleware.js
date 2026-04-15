import pool from "../db/pool.js";
import ApiError from "../utils/api-error.js";
import { verifyToken } from "../utils/jwt.js";

const authenticate = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) throw ApiError.unauthorized("Not Authenticated");

    const decoded = verifyToken(token);

    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      decoded.id,
    ]);

    const user = result.rows[0];

    if (!user) {
      throw ApiError.unauthorized("User no longer exists.");
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export { authenticate };
