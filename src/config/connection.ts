import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/SundaeSocialAPI',)

export default mongoose.connection;