import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/recipes', recipeRoutes);


app.listen(3000, ()=>{
    console.log("Servidor rodando");
});