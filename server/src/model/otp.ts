import mongoose, { Schema, Model } from 'mongoose';

const otpSchema: Schema<IOTP> = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export const OTPModel: Model<IOTP> = mongoose.model<IOTP>('OTP', otpSchema);
