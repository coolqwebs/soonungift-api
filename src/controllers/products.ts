import type { Request, Response } from "express"
import prisma from "../db"

export const getAllProducts = async (req: Request, res: Response) => {
  // #swagger.tags = ['Products']
  // #swagger.summary = 'Get All Products'
  try {
    const products = await prisma.product.findMany({ include: { category: true } })

    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/GetAllProductsResponse"
                    }  
                }          
            }
        }   
    */
    res.status(200).json(products)
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ error: error.message })
  }
}

export const getProductById = async (req: Request, res: Response) => {
  // #swagger.tags = ['Products']
  // #swagger.summary = 'Get Product By Id'
  try {
    const { id } = req.params
    const product = await prisma.product.findUnique({ where: { id } })
    console.log(product)
    // #swagger.responses[404]
    if (!product) return res.status(404).json({ message: `Product with id ${id} doesn't exist` })

    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/GetProductByIdResponse"
                    }  
                }          
            }
        }   
    */
    res.status(200).json(product)
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  // #swagger.tags = ['Products']
  // #swagger.summary = 'Create Product'
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
                            description: {
                                type: "string"
                            },
                            price: {
                                type: "int"
                            },
                            image: {
                                type: "string",
                                format: "binary"
                            },
                            categoryId: {
                                type: "string"
                            },
                            brandId: {
                                type: "string"
                            },
                            occassionId: {
                                type: "string"
                            },
                            deliveryType: {
                                $ref:"#/components/schemas/DeliveryType",
                            }
                        },
                        required: ["name", "description", "price", "categoryId", "deliveryType"]
                    }
                }
            }
        } 
  */
  try {
    const { name, description, categoryId, brandId, occasionId, price } = req.body
    const image = req.file
    console.log(image)
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image: image.path,
        categoryId,
        brandId: brandId || undefined,
        occasionId: occasionId || undefined,
      },
    })
    console.log("created", product)
    res.status(201).json({ message: "Created!" })
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}

export const editProductById = async (req: Request, res: Response) => {
  // #swagger.tags = ['Products']
  // #swagger.summary = 'Edit Product'
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
                            description: {
                                type: "string"
                            },
                            price: {
                                type: "int"
                            },
                            image: {
                                type: "string",
                                format: "binary"
                            },
                            categoryId: {
                                type: "string"
                            },
                            brandId: {
                                type: "string"
                            },
                            occassionId: {
                                type: "string"
                            },
                            deliveryType: {
                                $ref:"#/components/schemas/DeliveryType",
                            }
                        },
                    }
                }
            }
        } 
  */
  try {
    const { id } = req.params
    const { name, description, categoryId, brandId, occasionId, price } = req.body
    const image = req.file

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: name || undefined,
        description: description || undefined,
        price: price || undefined,
        image: image.path || undefined,
        categoryId: categoryId || undefined,
        brandId: brandId || undefined,
        occasionId: occasionId || undefined,
      },
    })
    console.log("updated", updatedProduct)

    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/GetProductByIdResponse"
                    }  
                }          
            }
        }   
    */
    res.status(200).json(updatedProduct)
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}

export const publishProduct = async (req: Request, res: Response) => {
  // #swagger.tags = ['Products']
  // #swagger.summary = 'Publish Product'
  /* #swagger.security = [{
            "bearerAuth": [],
						"cookieAuth": []
  }] */
  try {
    const { id } = req.params
    await prisma.product.update({ where: { id }, data: { published: true } })
    // #swagger.responses[204]
    res.sendStatus(204)
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ error: error.message })
  }
}

export const deleteProductById = async (req: Request, res: Response) => {
  // #swagger.tags = ['Products']
  // #swagger.summary = 'Delete Product'
  /* #swagger.security = [{
            "bearerAuth": [],
						"cookieAuth": []
  }] */
  try {
    const { id } = req.params

    const deletedProduct = await prisma.product.delete({ where: { id } })
    console.log("deleted", deletedProduct)
    // #swagger.responses[204]
    res.sendStatus(204)
  } catch (error: any) {
    // #swagger.responses[500]
    res.status(500).json({ message: error.message })
  }
}
