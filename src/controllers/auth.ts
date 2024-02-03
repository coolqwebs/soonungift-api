import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import prisma from "../db";
import { HASH_SALT_ROUNDS } from "../utils/constants";
import jwtGenerator from "../utils/jwtGenerator";

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
    const { email, fullname, password } = req.body;

    const user: IUser = (await prisma.user.findUnique({
      where: { email: email },
    })) as IUser;

    if (user) return res.sendStatus(400);

    const salt = await bcrypt.genSalt(HASH_SALT_ROUNDS);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser: IUser = await prisma.user.create({
      data: {
        email: email,
        fullname: fullname,
        password: hashPassword,
      },
    });

    /* #swagger.responses[201] = {
            description: "Created",
        }   
    */
    res.sendStatus(201);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

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
    const { email, password } = req.body;

    if (!email) {
      /* #swagger.responses[404] = {
            description: "Invalid email or password!",
        }   
      */
      return res.status(404).json("Invalid email or password!");
    }
    if (!password) {
      /* #swagger.responses[404] = {
            description: "Invalid email or password!",
        }   
      */
      return res.status(404).json("Invalid email or password!");
    }

    const user: IUser = (await prisma.user.findUnique({
      where: { email: email },
    })) as IUser;

    if (!user) {
      /* #swagger.responses[400] = {
            description: "Incorrect password or email!",
        }   
      */
      return res.status(400).send("Incorrect password or email!");
    }

    // TODO: remove as string
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!isPasswordValid) {
      /* #swagger.responses[400] = {
            description: "Incorrect password or email!",
        }   
      */
      return res.status(400).send("Incorrect password or email!");
    }

    const tokens = jwtGenerator({ userId: user.id, userEmail: user.email });

    res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });

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
    res.status(200).json(tokens);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const refreshController = async (req: Request, res: Response) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Refresh Token'
  /* #swagger.security = [{
            "bearerAuth": [],
            "cookieAuth": []
    }] */
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      (error: any, user: any) => {
        if (error) return res.status(403).send({ error: error.message });
        const tokens = jwtGenerator({ userId: user.id, userEmail: user.email });
        res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
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
        res.status(201).json(tokens);
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteRefreshController = async (req: Request, res: Response) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Clear refresh token from cookies'
  /* #swagger.security = [{
            "bearerAuth": [],
            "cookieAuth": []
    }] */
  try {
    res.clearCookie("refresh_token");
    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
