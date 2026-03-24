import express from 'express'
import mongoose from 'mongoose'

/*
Contenedor MongoDB:
docker create -p27017:27017 --name monguito --network mired -e MONGO_INITDB_ROOT_USERNAME=julio -e MONGO_INITDB_ROOT_PASSWORD=contra123 mongo

Contenedor NodeJS:
docker create -p3000:3000 --name chanchitoapi --network mired miapp:1
*/

const Animal = mongoose.model('Animal', new mongoose.Schema({
  tipo: String,
  estado: String,
}))

const app = express()

// Sin una red definida
// mongoose.connect(
//   "mongodb://julio:contra123@localhost:27017/miappdocker?authSource=admin",
// );

// Usando una red
mongoose.connect(
  "mongodb://julio:contra123@monguito:27017/miappdocker?authSource=admin",
);

app.get('/', async (_req, res) => {
  console.log('listando putas...')
  const animales = await Animal.find();
  return res.send(animales)
})
app.get('/crear', async (_req, res) => {
  console.log('creando chanchito...')
  await Animal.create({ tipo: 'Chanchito', estado: 'Feliz' })
  return res.send('chanchito ok')
})

app.listen(3000, () => console.log('listening...'))