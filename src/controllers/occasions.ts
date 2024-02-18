import type { Request, Response } from "express"
import prisma from "../db"

export const getOccasions = async (req: Request, res: Response) => {
  // #swagger.tags = ['Occasions']
  // #swagger.summary = 'Get All Occasions'
  try {
    const occasions = await prisma.occasion.findMany()

    console.log(occasions)

    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/GetAllOccasionsResponse"
                    }  
                }          
            }
        }   
    */
    res.status(200).json(occasions)
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}

export const getOccasionById = async (req: Request, res: Response) => {
  // #swagger.tags = ['Occasions']
  // #swagger.summary = 'Get Occasion By Id'
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: "Missing required parameter: id" })
    }
    const occasion = await prisma.occasion.findUnique({ where: { id } })
    if (!occasion) {
      return res.status(404).json({ message: `Occasion with id '${id}' doesn't exist` })
    }
    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/GetOccasionResponse"
                    }  
                }          
            }
        }   
    */
    res.status(200).json(occasion)
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}

export const createOccasion = async (req: Request, res: Response) => {
  // #swagger.tags = ['Occasions']
  // #swagger.summary = 'Create Occasion'
  /* #swagger.security = [{
            "bearerAuth": [],
						"cookieAuth": []
  }] */
  /*  #swagger.requestBody = {
            required: true,
            "@content": {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string"
                            },
                            image: {
                                type: "string",
                                format: "binary"
                            }
                        },
                        required: ["name"]
                    }
                }
            }
        } 
  */
  try {
    const { name } = req.body
    const image = req.file

    const newOccasion = await prisma.occasion.create({ data: { name: name, image: image.path } })

    console.log(newOccasion)
    res.status(201).json({ message: "Created!" })
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}

export const updateOccasion = async (req: Request, res: Response) => {
  // #swagger.tags = ['Occasions']
  // #swagger.summary = 'Update Occasion'
  /* #swagger.security = [{
            "bearerAuth": [],
						"cookieAuth": []
  }] */
  /*  #swagger.requestBody = {
            required: true,
               "@content": {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string"
                            },
                            image: {
                                type: "string",
                                format: "binary"
                            }
                        }
                    }
                }
            }
        } 
  */
  try {
    const { id } = req.params
    const { name } = req.body
    const image = req.file

    const updatedOccasion = await prisma.occasion.update({
      where: { id: id },
      data: { name: name || undefined, image: image.path || undefined },
    })

    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/GetOccasionResponse"
                    }  
                }          
            }
        }   
    */
    res.status(200).json(updatedOccasion)
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}

export const deleteOccasion = async (req: Request, res: Response) => {
  // #swagger.tags = ['Occasions']
  // #swagger.summary = 'Delete Occasion'
  /* #swagger.security = [{
            "bearerAuth": [],
						"cookieAuth": []
  }] */
  try {
    const { id } = req.params

    const deletedOccasion = await prisma.occasion.delete({ where: { id: id } })
    console.log(deletedOccasion)

    // #swagger.responses[204]
    res.sendStatus(204)
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}
