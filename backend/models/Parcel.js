import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const parcelSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  trackingNumber: { type: String, required: true, unique: true },
  deliveryAgent: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'Pending' },
  updates: [{ status: String, date: { type: Date, default: Date.now } }]
});

export default model('Parcel', parcelSchema);
