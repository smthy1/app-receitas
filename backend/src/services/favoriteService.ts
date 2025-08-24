import { connectDb, disconnectDb } from "../configs/connectionDb.js";
import { Favorite } from "../models/favoriteModel.js";
import mongoose from "mongoose";


async function getMyFavorites(userId: string) {
    await connectDb();
    const results = await Favorite.find({ userId: userId });

    await disconnectDb();
    return results;
}

async function favRecipe(userId: string, name: string, instructions: string, youtube: string, area: string) {
    await connectDb();
    
    const existingRecipe = await Favorite.findOne({ userId: userId,  name: name });
    if (!existingRecipe) {
        const newFav = new Favorite({ userId: new mongoose.Types.ObjectId(userId), name: name, instructions: instructions, youtube: youtube, area: area });
        await newFav.save();

        await disconnectDb();
        return { message: "Receita favoritada.", recipe: newFav };
    }

    await disconnectDb();
    return { erro: "Receita já favoritada", res: existingRecipe };
}


export { favRecipe, getMyFavorites }