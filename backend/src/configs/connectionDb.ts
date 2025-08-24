import 'dotenv/config'
import mongoose from 'mongoose'


const connectDb = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        
        if(!mongoUri) {
            return { erro: "Mongo URI não definido." };
        }

        return await mongoose.connect(mongoUri);
    } catch (err) {
        console.log("erro: ", err);
    }
}

const disconnectDb = async () => {
    await mongoose.disconnect();
}

export { connectDb, disconnectDb }