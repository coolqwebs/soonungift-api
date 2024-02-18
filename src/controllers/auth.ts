import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"

import prisma from "../db"
import { HASH_SALT_ROUNDS } from "../utils/constants"
import jwtGenerator from "../utils/jwtGenerator"
import { Roles } from "../types/types"

export const registerController = async (req: Request, res: Response) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Register'
  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/RegisterBody"
                    }  
                }
            }
        } 
  */
  try {
    const { email, fullname, password } = req.body

    const user: IUser = (await prisma.user.findUnique({
      where: { email: email },
    })) as IUser

    if (user) return res.status(409).json({ message: "User with this email already exists" })

    const salt = await bcrypt.genSalt(HASH_SALT_ROUNDS)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser: IUser = await prisma.user.create({
      data: {
        email: email,
        fullname: fullname,
        password: hashPassword,
        role: Roles.USER,
      },
    })

    /* #swagger.responses[201] = {
            description: "Created",
        }   
    */
    res.status(201).json({ message: "Created!" })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const loginController = async (req: Request, res: Response) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Login'
  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/LoginBody"
                    }  
                }
            }
        } 
  */
  try {
    const { email, password } = req.body

    if (!email) {
      /* #swagger.responses[404] = {
            description: "Invalid email or password!",
        }   
      */
      return res.status(404).json({ message: "Invalid email or password!" })
    }
    if (!password) {
      /* #swagger.responses[404] = {
            description: "Invalid email or password!",
        }   
      */
      return res.status(404).json({ message: "Invalid email or password!" })
    }

    const user: IUser = (await prisma.user.findUnique({
      where: { email: email },
    })) as IUser

    if (!user) {
      /* #swagger.responses[400] = {
            description: "Incorrect password or email!",
        }   
      */
      return res.status(400).send({ message: "Incorrect password or email!" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      /* #swagger.responses[400] = {
            description: "Incorrect password or email!",
        }   
      */
      return res.status(400).send({ message: "Incorrect password or email!" })
    }

    const tokens = jwtGenerator({ id: user.id, email: user.email, role: user.role })

    res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true })

    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/TokensResponse"
                    }
                }           
            }
        }   
    */
    res.status(200).json(tokens)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const refreshController = async (req: Request, res: Response) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Refresh Token'
  /* #swagger.security = [{
            "bearerAuth": [],
            "cookieAuth": []
    }] */
  try {
    const refreshToken = req.cookies["refresh_token"]

    if (!refreshToken) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (error: any, user: any) => {
      if (error) return res.status(403).send({ error: error.message })
      const tokens = jwtGenerator({ id: user.id, email: user.email, role: user.role })
      res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true })
      /* #swagger.responses[201] = {
            description: "Created",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/TokensResponse"
                    }
                }           
            }
          }   
        */
      res.status(200).json(tokens)
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteRefreshController = async (req: Request, res: Response) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Clear refresh token from cookies'
  /* #swagger.security = [{
            "bearerAuth": [],
            "cookieAuth": []
    }] */
  try {
    res.clearCookie("refresh_token")
    res.sendStatus(200)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
