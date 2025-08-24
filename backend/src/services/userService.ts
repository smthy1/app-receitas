import { connectDb, disconnectDb } from "../configs/connectionDb.js";
import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt'


async function createUser(name: string, email: string, password: string) {
    await connectDb();

    const existing = await User.findOne({ email: email });
    if (existing) {
        return { erro: "Email já cadastrado" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name: name, email: email, password: hashedPassword });
    await newUser.save();

    await disconnectDb();
    return { message: "Usuário cadastrado." };
}

async function login(email: string, password: string) {
    await connectDb();

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
        return { erro: "Email não cadastrado" };
    }

    const comparePassword = await bcrypt.compare(password, existingUser.password);
    if (!comparePassword) {
        await disconnectDb();
        return { erro: "Credenciais inválidas" }
    }
    await disconnectDb();
    return { message: "Credenciais válidas", user: existingUser };
}

async function getAllUsers() {
    await connectDb();

    const res = await User.find();

    await disconnectDb();
    return res;
}

async function updateUsername(name: string, newName: string) {
    await connectDb();
    
    const query = await User.findOneAndUpdate({ name: name }, { name: newName });
    if (!query) {
        return { erro: "Nome de usuário não cadastrado" };
    }
    await disconnectDb();
    return { message: "Nome de usuário atualizado"};
}


export { createUser, getAllUsers, updateUsername, login }