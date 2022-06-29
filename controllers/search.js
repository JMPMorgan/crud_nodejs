import mongoose from "mongoose";
import Category from "../models/category.js";
import Product from "../models/product.js";
import User from "../models/user.js";

const colectionsAllowed = ["users", "categories", "products", "roles"];

const ObjectId = mongoose.Types.ObjectId;

const searchUsers = async (term = "", res) => {
  const isMongoid = ObjectId.isValid(term);
  if (isMongoid) {
    const users = await User.findById(term);
    return res.status(200).json({
      results: users ? [users] : [],
    });
  } else {
    const regex = new RegExp(term, "i");
    const users = await User.find({
      $or: [{ name: regex }, { mail: regex }],
      $and: [{ status: true }],
    });
    return res.status(200).json({
      results: users ? [users] : [],
    });
  }
};

const searchProdutcs = async (term = "", res) => {
  const isMongoid = ObjectId.isValid(term);
  if (isMongoid) {
    const product = await Product.findById(term);
    return res.status(200).json({
      results: product ? [product] : [],
    });
  } else {
    const regex = new RegExp(term, "i");
    const product = await Product.find({
      name: regex,
      $and: [{ status: true }],
    });
    return res.status(200).json({
      results: product ? [product] : [],
    });
  }
};

const searchCategories = async (term = "", res) => {
  const isMongoid = ObjectId.isValid(term);
  if (isMongoid) {
    const category = await Category.findById(term);
    return res.status(200).json({
      results: category ? [category] : [],
    });
  } else {
    const regex = new RegExp(term, "i");
    const category = await Category.find({
      name: regex,
      $and: [{ status: true }],
    });
    return res.status(200).json({
      results: category ? [category] : [],
    });
  }
};

export const search = (req, res) => {
  const { colection, term } = req.params;
  if (!colectionsAllowed.includes(colection)) {
    return res.status(400).json({
      msg: `Collections Allowed are :${colectionsAllowed}`,
    });
  }

  switch (colection) {
    case "users":
      searchUsers(term, res);
      break;
    case "categories":
      searchCategories(term, res);
      break;
    case "products":
      searchProdutcs(term, res);
      break;
    default:
      return res.status(500).json({
        msg: `Error in Search`,
      });
      break;
  }
};
