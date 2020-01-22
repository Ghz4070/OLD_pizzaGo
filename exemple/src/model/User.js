import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    birthday:{
        type: Date,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: Array,
        required: true
    },
    tokenPasswordReset:{
        type: String
    },
    tokenActivateAccount:{
        type: String
    }
});

export default mongoose.model('User',userSchema);