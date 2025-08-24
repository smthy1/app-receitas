import { Schema, model, Document, Types } from "mongoose";

export interface IFavorite extends Document {
    userId: Types.ObjectId;
    name: string;
    instructions: string;
    youtube: string;
    area: string;
}

const favoriteSchema = new Schema<IFavorite>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true},
    instructions: { type: String, required: true },
    youtube: { type: String, required: true },
    area: { type: String, required: true }
});

export const Favorite = model<IFavorite>("Favorite", favoriteSchema)