import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username:{
        type: String, 
        required: true, 
        unique: true,
    },
    email:{
        type: String, 
        required: true, 
        unique: true,
    },
    password:{
        type: String, 
        required: true,
    },
    profilePicture:{
        type: String, 
        default: "",
    },   
},
{
    timestamps: true,
}
);

UserSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) user.password = bcrypt.hashSync(user.password, 8)
    next()
});

UserSchema.statics.FindByCredentials = async function (email, password) {
    
    try {
      const user = await UserModel.findOne({email: email});
      if(!user) throw new Error('Invalid email');
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch) throw new Error('Invalid password');
  
      return user;
    } catch (error) {
      console.log(error);
    }
};
export const UserModel = mongoose.model("User", UserSchema);