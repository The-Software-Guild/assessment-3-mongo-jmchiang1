import mongoose from "mongoose";

const bugSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },

    time: { 
        type: Number, 
        default: new Date().getTime() 
    },
    dates: {
      created: {
           type: Date, default: Date.now 
        },
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
  },
  {
    timestamps: true,
  }
);

const Bug = mongoose.model("Bug", bugSchema);

export default Bug;
