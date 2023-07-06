import express, { Request, Response, Router } from "express";
import Document, { IDocument } from "../models/document";
import { getAsync, setAsync } from "../../config/database";
import logger from "../../config/logger";

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

  private searchDocumentsWithCache = async (keywords: any) => {
    // Check if the search results are already in the cache
    const cachedResults = await getAsync(keywords);
    if (cachedResults) {
      logger.info(`Serving from cache for keyword: ${keywords}`);
      return JSON.parse(cachedResults);
    }

    // If not found in cache, perform the actual database search
    const documents: IDocument[] = await Document.find({
      $or: [
        { name: { $regex: keywords, $options: "i" } },
        { content: { $regex: keywords, $options: "i" } },
      ],
    });

    // Cache the search results for future use with a 5-minute expiration (adjust as needed)
    await setAsync(keywords, JSON.stringify(documents), "EX", 300);

    logger.info(`Serving from database for keyword: ${keywords}`);
    return documents;
  };

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
    } catch (error: any) {
      logger.error(error.stack);
      res.status(500).json({ error: "Server error" });
    }
  };

  public searchDocuments = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { query } = req.query;

      const documents: IDocument[] = await this.searchDocumentsWithCache(query);

      if (!documents.length) {
        res
          .status(200)
          .json({ msg: "No results found", data: [], searchQuery: query });
        return;
      }

      res.status(200).json({
        msg: `${documents.length} Results found`,
        data: documents,
        searchQuery: query,
      });
    } catch (error: any) {
      logger.error(error.stack);
      res.status(500).json({ msg: "Server error" });
    }
  };
}

export default DocumentController;
