import swaggerAutogen from "swagger-autogen"

const doc = {
  info: {
    version: "v1.0.0",
    title: "SoonunGift",
    description: "Dev Environment",
  },
  servers: [
    {
      url: "http://localhost:1448",
      description: "local server",
    },
    // TODO: add dev server url
    {
      url: "https://soonungift-api.onrender.com",
      description: "dev server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        description: "Enter access token into the field without Bearer",
      },
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "refresh_token",
        description: "Enter refresh token into the field without Bearer",
      },
    },
    schemas: {
      DeliveryType: {
        type: "string",
        "@enum": ["eGift", "Delivery"],
      },
      RegisterBody: {
        $email: "johndoe@gmail.com",
        $fullname: "John Doe",
        $password: "john_doe",
      },
      LoginBody: {
        $email: "coolqwebs@gmail.com",
        $password: "12qw!@QW",
      },
      UpdateUserProfileBody: {
        fullname: "trahni menya",
      },
      TokensResponse: {
        accessToken: "string",
        refreshToken: "string",
      },
      GetAllUsersRespone: [
        {
          email: "johndoe@gmail.com",
          fullname: "John Doe",
          createdAt: "2024-02-03T13:17:37.878Z",
          updatedAt: "2024-02-03T16:15:37.746Z",
          role: "USER",
        },
      ],
      GetUserProfileResponse: {
        email: "johndoe@gmail.com",
        fullname: "John Doe",
        createdAt: "2024-02-03T13:17:37.878Z",
        updatedAt: "2024-02-03T16:15:37.746Z",
        role: "USER",
      },
      GetAllProductsResponse: [
        {
          id: "string",
          name: "string",
          description: "string",
          published: false,
          price: 123,
          categoryId: "string",
          brandId: "string",
          occasionId: "string",
          category: {
            id: "string",
            name: "string",
            image: "string",
          },
          brand: {
            id: "string",
            name: "string",
            logo: "string",
          },
          occasion: {
            id: "string",
            name: "string",
            image: "string",
          },
          deliveryType: "string",
          createdAt: "2024-02-03T13:17:37.878Z",
          updatedAt: "2024-02-03T16:15:37.746Z",
        },
      ],
      GetProductByIdResponse: {
        id: "string",
        name: "string",
        description: "string",
        published: false,
        price: 123,
        categoryId: "string",
        brandId: "string",
        occasionId: "string",
        category: {
          id: "string",
          name: "string",
          image: "string",
        },
        brand: {
          id: "string",
          name: "string",
          logo: "string",
        },
        occasion: {
          id: "string",
          name: "string",
          image: "string",
        },
        deliveryType: "string",
        createdAt: "2024-02-03T13:17:37.878Z",
        updatedAt: "2024-02-03T16:15:37.746Z",
      },
      GetAllCategoriesResponse: [
        {
          id: "string",
          name: "string",
          image: "string",
        },
      ],
      GetCategoryResponse: {
        id: "string",
        name: "string",
        image: "string",
      },
      GetAllBrandsResponse: [
        {
          id: "string",
          name: "string",
          logo: "string",
        },
      ],
      GetBrandResponse: {
        id: "string",
        name: "string",
        logo: "string",
      },
      GetAllOccasionsResponse: [
        {
          id: "string",
          name: "string",
          image: "string",
        },
      ],
      GetOccasionResponse: {
        id: "string",
        name: "string",
        image: "string",
      },
    },
  },
}

const outputFile = "./swagger_output.json"
const endpointsFiles = ["./src/index.ts"]

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc)
