import { Router, Request, Response } from 'express';

import * as loginService from './login.service';
import { validateLogin } from './login.validation.middleware';
import { catchError } from '../../utils/catchError';

export const router = Router();

router.route('/').post(
  validateLogin,
  catchError(async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const token = await loginService.signToken(login, password);

    res.json({ token });
  })
);
