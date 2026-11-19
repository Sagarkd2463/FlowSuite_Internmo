import mongoose from "mongoose";
import Membership from "../model/Membership.js";
import Organization from "../model/Organization.js";

export const requireOrganization = async (req, res, next) => {
  try {
    const organizationId =
      req.params.organizationId || req.headers["x-organization-id"];

    if (!organizationId || !mongoose.Types.ObjectId.isValid(organizationId)) {
      return res.status(400).json({
        success: false,
        message: "Valid organization ID is required",
      });
    }

    const organization = await Organization.findOne({
      _id: organizationId,
      isActive: true,
    });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    const membership = await Membership.findOne({
      user: req.user._id,
      organization: organizationId,
      status: "ACTIVE",
    });

    if (!membership) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this organization",
      });
    }

    req.organization = organization;
    req.membership = membership;
    req.organizationId = organization._id;

    next();
  } catch (error) {
    next(error);
  }
};
