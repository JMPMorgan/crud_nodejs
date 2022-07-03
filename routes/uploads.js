import { Router } from "express";
import { check } from "express-validator";
import {
  showImage,
  updateImage,
  updateImageCloudinary,
  uploadDocument,
} from "../controllers/uploads.js";
import { validateColections } from "../helpers/db_validators.js";
import { exitsFile } from "../middlewares/validateFile.js";
import { inputValidation } from "../middlewares/validateinputs.js";

export const router = Router();

router.post("/", [exitsFile, inputValidation], uploadDocument);

router.get(
  "/:colection/:id",
  [
    check("id", "The Param would be a ID").isMongoId(),
    check("colection").custom((c) =>
      validateColections(c, ["users", "products"])
    ),
    inputValidation,
  ],
  showImage
);

router.put(
  "/:colection/:id",
  [
    exitsFile,
    check("id", "The Param would be a ID").isMongoId(),
    check("colection").custom((c) =>
      validateColections(c, ["users", "products"])
    ),
    inputValidation,
  ],
  updateImageCloudinary
);
