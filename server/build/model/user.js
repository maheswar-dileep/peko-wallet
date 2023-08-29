import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        min: [3, 'username atleast contain 3 characters'],
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        min: [4, 'password must have fout characters'],
    },
}, {
    timestamps: true,
});
export const User = mongoose.model('User', userSchema);
//# sourceMappingURL=user.js.map