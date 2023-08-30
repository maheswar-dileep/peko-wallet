import { Router } from 'express';
import * as controller from '../controller/payments.js';
const router = Router();
router.route('/add-amount').put(controller.addAmount);
router.route('/transfer-amount').put(controller.transferAmount);
export default router;
//# sourceMappingURL=payment.js.map