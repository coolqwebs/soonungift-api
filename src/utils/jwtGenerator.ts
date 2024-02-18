import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { Roles } from "../types/types"

dotenv.config()

const jwtGenerator = ({ id, email, role }: { id: string; email: string; role: Roles }) => {
  const user = { id, email, role }

  const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
    expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRE, 10),
  })
  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, {
    expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRE, 10),
  })

  return { accessToken, refreshToken }
}

export default jwtGenerator
