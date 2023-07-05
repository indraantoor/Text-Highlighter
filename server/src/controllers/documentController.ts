import express, { Request, Response, Router } from "express";
import Document, { IDocument } from "../models/document";

class DocumentController {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/documents", this.addDocument);
    this.router.get("/documents", this.searchDocuments);
  }

  public addDocument = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, content, author, date } = req.body;

      const newDocument: IDocument = new Document({
        name,
        content,
        author,
        date,
      });

      const savedDocument: IDocument = await newDocument.save();

      res.status(201).json(savedDocument);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };

  public searchDocuments = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { query } = req.query;

      const documents: IDocument[] = await Document.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { content: { $regex: query, $options: "i" } },
          { author: { $regex: query, $options: "i" } },
        ],
      });

      if (!documents.length) {
        res.status(200).json({ msg: "No results found" });
        return;
      }

      res.status(200).json(documents);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };
}

export default DocumentController;
