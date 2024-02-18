import type { Request, Response } from "express"
import prisma from "../db"

export const getBrands = async (req: Request, res: Response) => {
  // #swagger.tags = ['Brands']
  // #swagger.summary = 'Get All Brands'
  try {
    const brands = await prisma.brand.findMany()

    console.log(brands)

    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/GetAllBrandsResponse"
                    }  
                }          
            }
        }   
    */
    res.status(200).json(brands)
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}

export const getBrandById = async (req: Request, res: Response) => {
  // #swagger.tags = ['Brands']
  // #swagger.summary = 'Get Brand By Id'
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: "Missing required parameter: id" })
    }
    const brand = await prisma.brand.findUnique({ where: { id } })
    if (!brand) {
      return res.status(404).json({ message: `Brand with id '${id}' doesn't exist` })
    }
    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/GetBrandResponse"
                    }  
                }          
            }
        }   
    */
    res.status(200).json(brand)
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}

export const createBrand = async (req: Request, res: Response) => {
  // #swagger.tags = ['Brands']
  // #swagger.summary = 'Create Brand'
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
                            logo: {
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
    const logo = req.file

    const newBrand = await prisma.brand.create({ data: { name: name, logo: logo.path } })

    console.log(newBrand)
    res.status(201).json({ message: "Created!" })
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}
export const updateBrand = async (req: Request, res: Response) => {
  // #swagger.tags = ['Brands']
  // #swagger.summary = 'Update Brand'
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
                            logo: {
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
    const logo = req.file

    const updatedBrand = await prisma.brand.update({
      where: { id: id },
      data: { name: name || undefined, logo: logo.path || undefined },
    })

    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/GetBrandResponse"
                    }  
                }          
            }
        }   
    */
    res.status(200).json(updatedBrand)
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}
export const deleteBrand = async (req: Request, res: Response) => {
  // #swagger.tags = ['Brands']
  // #swagger.summary = 'Delete Brand'
  /* #swagger.security = [{
            "bearerAuth": [],
						"cookieAuth": []
  }] */
  try {
    const { id } = req.params

    const deletedBrand = await prisma.brand.delete({ where: { id: id } })
    console.log(deletedBrand)

    // #swagger.responses[204]
    res.sendStatus(204)
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}
