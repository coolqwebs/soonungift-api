import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'SoonunGift',
    description: 'Dev Environment',
  },
  servers: [
    {
      url: 'http://localhost:1448',
      description: 'local server',
    },
    {
      url: 'https://soonungift-api.onrender.com/',
      description: 'dev server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        description: 'Enter access token into the field without Bearer',
      },
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'refresh_token',
        description: 'Enter refresh token into the field without Bearer',
      },
    },
    schemas: {
      RegisterBody: {
        $email: 'johndoe@gmail.com',
        $fullname: 'John Doe',
        $password: 'john_doe',
      },
      LoginBody: {
        $email: 'johndoe@gmail.com',
        $password: 'john_doe',
      },
      UpdateUserProfileBody: {
        email: 'sasai_kudasai@gmail.com',
        fullname: 'trahni menya',
      },
      TokensResponse: {
        accessToken: 'string',
        refreshToken: 'string',
      },
      GetAllUsersRespone: [
        {
          email: 'johndoe@gmail.com',
          fullname: 'John Doe',
          password: 'john_doe',
          createdAt: '2024-02-03T13:17:37.878Z',
          updatedAt: '2024-02-03T16:15:37.746Z',
          role: 'USER',
        },
      ],
      GetUserProfileResponse: {
        email: 'johndoe@gmail.com',
        fullname: 'John Doe',
        password: 'john_doe',
        createdAt: '2024-02-03T13:17:37.878Z',
        updatedAt: '2024-02-03T16:15:37.746Z',
        role: 'USER',
      },
    },
  },
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/index.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
