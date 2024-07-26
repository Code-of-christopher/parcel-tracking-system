import Parcel from '../models/Parcel.js';

// Create Parcel
export async function createParcel(req, res) {
  const { trackingNumber, deliveryAgent } = req.body;
  const client = req.user._id;

  try {
    const existingParcel = await Parcel.findOne({ trackingNumber });
    if (existingParcel) {
      return res.status(400).json({ message: 'Tracking number already exists' });
    }

    const parcel = await Parcel.create({
      client,
      trackingNumber,
      deliveryAgent
    });

    res.status(201).json(parcel);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Get all parcels
export async function getParcels(req, res) {
  try {
    const parcels = await Parcel.find().populate('client').populate('deliveryAgent');
    res.json(parcels);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Get parcels by client ID
export async function getParcelsByClientId(req, res) {
  const { clientId } = req.params;

  try {
    const parcels = await Parcel.find({ client: clientId }).populate('client').populate('deliveryAgent');
    if (parcels.length === 0) {
      return res.status(404).json({ message: 'No parcels found for this client' });
    }
    res.json(parcels);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Get parcels by delivery agent ID
export async function getParcelsByDeliveryAgentId(req, res) {
  const { deliveryAgentId } = req.params;

  try {
    const parcels = await Parcel.find({ deliveryAgent: deliveryAgentId }).populate('client').populate('deliveryAgent');
    if (parcels.length === 0) {
      return res.status(404).json({ message: 'No parcels found for this delivery agent' });
    }
    res.json(parcels);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Get parcel by tracking number
export async function getParcelByTrackingNumber(req, res) {
  try {
    const parcel = await Parcel.findOne({ trackingNumber: req.params.trackingNumber })
      .populate('client')
      .populate('deliveryAgent');
    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }
    res.json(parcel);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Update parcel status
export async function updateParcelStatus(req, res) {
  const { status } = req.body;
  const userId = req.user.id; // Assuming you have the agent's ID in req.user

  try {
    const parcel = await Parcel.findOne({ trackingNumber: req.params.trackingNumber });

    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }

    // Check if the agent is allowed to update the parcel
    if (parcel.deliveryAgent.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this parcel' });
    }

    parcel.status = status;
    parcel.updates.push({ status });

    await parcel.save();

    res.json(parcel);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}
