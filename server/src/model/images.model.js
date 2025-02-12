import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({
  userId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:[true,"user ID required"]

  },
  bookId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Books",
    required:[true,"books ID required"]

  },
  imageFile: {
    type: String,
    required:[true,"image base64 format required"]
  }
});
export const Images = mongoose.model("Images", imageSchema);
