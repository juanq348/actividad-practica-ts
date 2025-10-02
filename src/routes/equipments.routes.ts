import {Router} from 'express';
import { body, param } from 'express-validator';
import * as controller from '../controllers/equipment.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { allowRole } from '../middlewares/role.middleware.js';

const router = Router();

router.post('/', authenticate, allowRole('admin', 'user'),[body('serialNumber').notEmpty(), body('state').optional().isIn(['disponible', 'en_uso', 'en_reparacion', 'no_disponible'])], controller.create
);

router.get('/', authenticate, allowRole('admin', 'user'), controller.list);

router.get('/:id', authenticate, allowRole('admin','user'), [param('id').isInt()], controller.get);

router.put('/:id', authenticate, allowRole('admin', 'user'), [param('id').isInt()], controller.update);

router.delete('/:id', authenticate, allowRole('admin'), [param('id').isInt()], controller.remove);

export default router;