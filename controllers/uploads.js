import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import v2 from "cloudinary";

const cloudinary = v2.v2;
cloudinary.config(process.env.CLOUDINARY_URL);

import { uploadFile } from "../helpers/upload_file.js";
import Product from "../models/product.js";
import User from "../models/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadDocument = async (req, res) => {
  // Ask if exits a file in req

  try {
    const nameFile = await uploadFile(req.files);
    res.json({
      nameFile,
    });
  } catch (error) {
    res.status(400).json({
      msg: error,
    });
  }
};

export const updateImage = async (req, res) => {
  try {
    const { colection, id } = req.params;

    let model;
    switch (colection) {
      case "users":
        model = await User.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: `User dont exits`,
          });
        }
        break;
      case "products":
        model = await Product.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: `Product dont exits`,
          });
        }
        break;

      default:
        break;
    }
    if (model.img) {
      const pathImage = path.join(
        __dirname,
        "../uploads",
        colection,
        model.img
      );
      if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
      }
    }

    const nameFile = await uploadFile(req.files, undefined, colection);
    model.img = nameFile;
    await model.save();

    res.json({
      msg: `ok`,
    });
  } catch (error) {
    res.status(400).json({
      msg: error,
    });
  }
};

export const showImage = async (req, res) => {
  try {
    const { colection, id } = req.params;

    let model;
    switch (colection) {
      case "users":
        model = await User.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: `User dont exits`,
          });
        }
        break;
      case "products":
        model = await Product.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: `Product dont exits`,
          });
        }
        break;

      default:
        break;
    }

    //Delete image previous
    if (model.img) {
      const pathImage = path.join(
        __dirname,
        "../uploads",
        colection,
        model.img
      );
      if (fs.existsSync(pathImage)) {
        return res.sendFile(pathImage);
      }
    }
    const noImagePath = path.join(__dirname, "../assets/no-image.jpg");
    return res.sendFile(noImagePath);
  } catch (error) {
    res.status(400).json({
      msg: error,
    });
  }
};

export const updateImageCloudinary = async (req, res) => {
  try {
    const { colection, id } = req.params;
    let model;
    switch (colection) {
      case "users":
        model = await User.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: `User dont exits`,
          });
        }
        break;
      case "products":
        model = await Product.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: `Product dont exits`,
          });
        }
        break;

      default:
        return res.status(400).json({ msg: "Hola" });
        break;
    }
    if (model.img) {
      const imgArr = model.img.split("/");
      const name = imgArr[imgArr.length - 1];
      const [public_id] = name.split(".");
      await cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.img = secure_url;
    await model.save();

    return res.json({
      msg: model,
    });
  } catch (error) {
    res.status(400).json({
      msg: error,
    });
  }
};
