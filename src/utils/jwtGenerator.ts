import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const jwtGenerator = ({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) => {
  const user = { userId, userEmail };

  const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "12hr",
  });
  const refreshToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "48hr",
  });

  return { accessToken, refreshToken };
};

export default jwtGenerator;
