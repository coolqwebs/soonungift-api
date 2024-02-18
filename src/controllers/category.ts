import type { Request, Response } from "express"
import prisma from "../db"

export const getCategories = async (req: Request, res: Response) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Get All Categories'
  try {
    const categories = await prisma.category.findMany()

    console.log(categories)

    // #swagger.responses[404]
    if (!categories) return res.sendStatus(404)

    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/GetAllCategoriesResponse"
                    }  
                }          
            }
        }   
    */
    res.status(200).json(categories)
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}

export const getCategoryById = async (req: Request, res: Response) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Get Category By Id'
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: "Missing required parameter: id" })
    }
    const category = await prisma.category.findUnique({ where: { id } })
    if (!category) {
      return res.status(404).json({ message: `Category with id '${id}' doesn't exist` })
    }
    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/GetCategoryResponse"
                    }  
                }          
            }
        }   
    */
    res.status(200).json(category)
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}
export const createCategory = async (req: Request, res: Response) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Create Category'
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

    const newCategory = await prisma.category.create({ data: { name: name, image: image.path } })

    console.log(newCategory)
    res.status(201).json({ message: "Created!" })
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}
export const updateCategory = async (req: Request, res: Response) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Update Category'
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

    const updatedCategory = await prisma.category.update({
      where: { id: id },
      data: { name: name || undefined, image: image.path || undefined },
    })

    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/GetCategoryResponse"
                    }  
                }          
            }
        }   
    */
    res.status(200).json(updatedCategory)
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}
export const deleteCategory = async (req: Request, res: Response) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Delete Category'
  /* #swagger.security = [{
            "bearerAuth": [],
						"cookieAuth": []
  }] */
  try {
    const { id } = req.params

    const deletedCategory = await prisma.category.delete({ where: { id: id } })
    console.log(deletedCategory)

    // #swagger.responses[204]
    res.sendStatus(204)
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}
