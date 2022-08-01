//express server
import express from "express"
import cors from "cors"
//config files
import {config} from "./config.js"
// routes
import priceRouter from "./routes/priceRouter.js"
import sourceRouter from "./routes/sourceRouter.js"
// misc
import { generateInitialTickerPrice,updateNewTickerPrice,sourceTicker } from "./common/tickerPrice.js"
import {CronJob} from "cron"
import {Server} from "socket.io"
import {createServer} from "http"

const environment = process.env.NODE_ENV || 'development'
const port = config[environment].port

export const app = express()
app.use(cors())
app.use('/source',sourceRouter)
app.use('/price', priceRouter)

const httpServer = createServer(app);
// allow the connection from front end
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  }
})
// get the socket io to listen for connections/send data
httpServer.listen(port);
app.listen(port, () => console.log(`Listening on port ${port}!`))

generateInitialTickerPrice()
const job = new CronJob(
	'*/10 * * * * *',
	()=>{
    updateNewTickerPrice()
		io.emit("pipingdata",sourceTicker)
	}
);

// start the job to generate random price and send to client
job.start()
