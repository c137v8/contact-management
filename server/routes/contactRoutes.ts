import { Router, Request, Response } from "express";
import Contact from "../models/Contact";

const router = Router();

/**
 * POST /api/contacts
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * GET /api/contacts
 */
router.get("/", async (_req: Request, res: Response) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

/**
 * DELETE /api/contacts/:id
 */
router.delete("/:id", async (req: Request, res: Response) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
