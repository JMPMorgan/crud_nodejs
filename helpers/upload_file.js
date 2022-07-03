import path from "path";
import { fileURLToPath } from "url";
import { v4 } from "uuid";
/*
 * This solve the problem whit __dirname en ES Module JS
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const uploadFile = (
  files,
  validExtensions = ["png", "jpg", "jpeg", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    let sampleFile;
    let uploadPath;
    //Get the file
    sampleFile = files.file;
    //Split the name file
    const splitName = sampleFile.name.split(".");
    //Get the extension
    const extension = splitName[splitName.length - 1];

    if (!validExtensions.includes(extension)) {
      return reject(
        `Extension ${extension} invalid, only valid extension :${validExtensions}`
      );
    }
    //Generate an unique name
    const tempName = v4() + "." + extension;
    //Upload the file
    uploadPath = path.join(__dirname, "../uploads/", folder, tempName);
    sampleFile.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve(tempName);
    });
  });
};
