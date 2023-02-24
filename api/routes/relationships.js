import express from "express";
import { getRelationships, deleteRelationship, addRelationship } from "../controllers/relationships.js";

const router = express.Router();

router.get('/', getRelationships)
router.post('/', addRelationship)
router.delete('/', deleteRelationship)

export default router;