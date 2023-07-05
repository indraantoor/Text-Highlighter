import mongoose, { Document, Schema } from "mongoose";

export interface IDocument extends Document {
  title: string;
  content: string;
  author: string;
  date: Date;
}

const documentSchema = new Schema<IDocument>({
  title: String,
  content: String,
  author: String,
  date: Date,
});

export default mongoose.model<IDocument>("Document", documentSchema);
