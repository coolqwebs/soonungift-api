import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const jwtGenerator = ({ userId, userEmail }: { userId: string; userEmail: string }) => {
  const user = { userId, userEmail };

  const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
    expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRE, 10),
  });
  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, {
    expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRE, 10),
  });

  return { accessToken, refreshToken };
};

export default jwtGenerator;
