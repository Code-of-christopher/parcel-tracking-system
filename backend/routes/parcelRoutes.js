// parcelRouter.js
import { Router } from 'express';
import {
  createParcel,
  getParcels,
  getParcelByTrackingNumber,
  updateParcelStatus,
  getParcelsByClientId,
  getParcelsByDeliveryAgentId
} from '../controllers/parcelController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Create a new parcel
router.post('/createParcel', protect, createParcel);

// Get all parcels
router.get('/getParcels', protect, getParcels);

// Get a parcel by tracking number
router.get('/getParcel/:trackingNumber', protect, getParcelByTrackingNumber);

// Update parcel status by tracking number
router.put('/updateStatus/:trackingNumber', protect, updateParcelStatus);

// Get parcels by client ID
router.get('/getClientParcels/:clientId', protect, getParcelsByClientId);

// Get parcels by delivery agent ID
router.get('/getAgentParcels/:deliveryAgentId', protect, getParcelsByDeliveryAgentId);

export default router;
