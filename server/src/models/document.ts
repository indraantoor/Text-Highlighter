import mongoose, { Document, Schema } from "mongoose";

export interface IDocument extends Document {
  name: string;
  content: string;
  author: string;
  date: Date;
}

const documentSchema = new Schema<IDocument>({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IDocument>("Document", documentSchema);
