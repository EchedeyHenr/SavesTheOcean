import { Express, RequestHandler, Router } from "express";
import { AuthController } from "../controllers/authC";
import { checkJwt } from "../auth";

export const authRoutes = (app: Express) => {
  const router = Router();
  
  router.post('/login', AuthController.login as RequestHandler);

  router.get('/verify', checkJwt, (req, res) => {
    res.json(req.user);
  });
  
  app.use('/api/auth', router);
};