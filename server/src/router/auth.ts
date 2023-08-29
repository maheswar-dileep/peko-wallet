import { Router } from 'express';
import * as controller from '../controller/auth.js';

const router = Router();

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);
router.route('/refresh').get(controller.refresh);
router.route('/signout').get(controller.signout);

export default router;
    