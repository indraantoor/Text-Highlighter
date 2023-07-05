import express, { Router } from "express";
import DocumentController from "../controllers/documentController";

const router: Router = express.Router();
const documentController: DocumentController = new DocumentController();

// Add a new document
router.post("/", documentController.addDocument);

// Search for documents
router.get("/", documentController.searchDocuments);

export default router;
