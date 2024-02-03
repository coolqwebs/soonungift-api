import { Request, Response } from 'express';
import prisma from '../db';

export const getAllUsers = async (req: Request, res: Response) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get List of Users'
  try {
    const users = (await prisma.user.findMany()) as IUser[];

    users.forEach((user) => {
      delete user.password;
    });

    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/GetAllUsersRespone"
                    }
                }           
            }
       }   
    */
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserInfo = async (req: Request, res: Response) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get User Profile'
  /* #swagger.security = [{
            "bearerAuth": []
    }] 
  */
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.sendStatus(400);
    }

    const user = (await prisma.user.findUnique({
      where: { id: userId },
    })) as IUser;

    if (!user) {
      return res.sendStatus(404);
    }

    delete user.password;
    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/GetUserProfileResponse"
                    }
                }           
            }
       }   
    */
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserInfo = async (req: Request, res: Response) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Update User Profile'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  //  #swagger.parameters['id'] = { description: 'User id' }
  /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'User id',
            required: true,
            type: 'string'
      } 
  */
  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UpdateUserProfileBody"
                    }  
                }
            }
        } 
  */
  try {
    const { id } = req.params;

    const updatedUser = (await prisma.user.update({
      where: { id: id },
      data: req.body,
    })) as IUser;

    delete updatedUser.password;

    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
