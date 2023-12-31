import express, { Express } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes'

const app: Express = express()

const PORT: string | number = process.env.PORT || 3000

app.use(cors())
app.use(express.json());
app.use(userRoutes)


const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.mkpbn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

async function connect(url: string) {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB")
  } catch (error){
    console.error(error)
  }
  
}
connect(uri)
app.listen(PORT, () => {
  console.log("Server started on")
})

