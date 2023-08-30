import mongoose from 'mongoose';
const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    code: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
export const OTPModel = mongoose.model('OTP', otpSchema);
//# sourceMappingURL=otp.js.map