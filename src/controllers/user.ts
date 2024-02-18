import { Request, Response } from "express"
import prisma from "../db"

export const getAllUsers = async (req: Request, res: Response) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get List of Users'
  try {
    const users = (await prisma.user.findMany({
      select: {
        email: true,
        fullname: true,
        createdAt: true,
        updatedAt: true,
        role: true,
      },
    })) as IUser[]

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
    res.status(200).json(users)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserInfo = async (req: Request, res: Response) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get User Profile'
  /* #swagger.security = [{
            "bearerAuth": []
    }] 
  */
  try {
    const userId = req.user?.id

    if (!userId) {
      return res.status(400).json({ message: "Missing required parameter: id" })
    }

    const user = (await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        fullname: true,
        createdAt: true,
        updatedAt: true,
        role: true,
      },
    })) as IUser

    if (!user) {
      return res.status(404).json({ message: `User with id '${userId}' doesn't exist` })
    }

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
    res.status(200).json(user)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

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
    const { id } = req.params
    const { fullname } = req.body

    const updatedUser = (await prisma.user.update({
      where: { id: id },
      data: {
        fullname: fullname || undefined,
      },
    })) as IUser

    delete updatedUser.password

    res.status(200).json(updatedUser)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
