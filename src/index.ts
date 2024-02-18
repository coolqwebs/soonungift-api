import express, { Express } from "express"
import "dotenv/config"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import swaggerUi from "swagger-ui-express"

import swaggerOutput from "./swagger_output.json"
import router from "./routes"
import path from "path"

const PORT: number = parseInt(process.env.PORT as string, 10) || 1448
const app: Express = express()

app.use(express.json())

express.static(path.join(__dirname, "..", "public"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(cors())

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerOutput))

app.use("/api", router)

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
