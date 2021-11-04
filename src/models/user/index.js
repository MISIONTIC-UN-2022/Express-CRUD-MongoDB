import { compare, genSalt, hash } from 'bcrypt';
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    user: {
      type: String,
      unique: true,
      required: [true, 'El usuario es requerido.'],
    },
    password: {
      type: String,
      select: false,
      required: [true, 'La contraseña es requerida.'],
    },
    tokenVersion: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await genSalt(+process.env.BCRYPT_ROUNDS);
  this.password = await hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (plaintext) {
  return await compare(plaintext, this.password);
};

const User = model('User', userSchema);

export default User;
