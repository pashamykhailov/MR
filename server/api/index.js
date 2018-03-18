import { Router } from "express";

import users from "./users";
import product from "./product";

const router = Router();

// Add USERS Routes
router.use(users);

// Product routes
router.use(product);

export default router;
