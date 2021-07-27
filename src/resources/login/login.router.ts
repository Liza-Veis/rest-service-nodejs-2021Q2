import { Router, Request, Response } from 'express';
import * as loginService from './login.service';
import { LoginSchema } from '../../schemas/login.schema';
import { validate } from '../../middlewares/validation.middleware';
import { catchError } from '../../utils/catchError';

export const router = Router();
const validationMiddleware = validate(LoginSchema);

router.route('/').post(
  validationMiddleware,
  catchError(async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const token = await loginService.signToken(login, password);

    res.json({ token });
  })
);
