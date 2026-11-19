import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },

    role: {
      type: String,
      enum: ["OWNER", "ADMIN", "MANAGER", "MEMBER"],
      default: "MEMBER",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INVITED", "REMOVED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  },
);

membershipSchema.index({ user: 1, organization: 1 }, { unique: true });

const Membership = mongoose.model("Membership", membershipSchema);

export default Membership;
