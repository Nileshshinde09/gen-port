import path from "path";
import fs from "fs";
import { VALID_EXTENSIONS } from "../constants.js";

// Function to convert images in a directory to Base64 and store them in a JSON file
export const convertImagesToBase64AndWrite = async (
  inputDir,
  outputFile
) => {
  if (!fs.existsSync(inputDir)) {
    console.error("Input directory does not exist.");
    return;
  }

  const files = fs.readdirSync(inputDir);
  const base64Images= {};

  files.forEach((file) => {
    const filePath = path.join(inputDir, file);
    const fileExtension = path.extname(file).toLowerCase();
    const validExtensions = VALID_EXTENSIONS;

    if (validExtensions.includes(fileExtension)) {
      try {
        const fileData = fs.readFileSync(filePath);
        const base64 = fileData.toString("base64");
        base64Images[file] = `data:image/${fileExtension.slice(
          1
        )};base64,${base64}`;
      } catch (err) {
        console.error(`Failed to process file ${file}:`, (err ).message);
      }
    } else {
      console.warn(`Skipping non-image file: ${file}`);
    }
  });

  try {
    fs.writeFileSync(outputFile, JSON.stringify(base64Images, null, 2), "utf8");
    console.log(`Base64 data saved to ${outputFile}`);
  } catch (err) {
    console.error(`Failed to write JSON file:`, (err ).message);
  }
};

export const convertImagesToBase64 = async (
  inputDir,
  outputFile
) => {
  if (!fs.existsSync(inputDir)) {
    console.error("Input directory does not exist.");
    return;
  }

  const files = fs.readdirSync(inputDir);
  const base64Images = {};

  files.forEach((file) => {
    const filePath = path.join(inputDir, file);
    const fileExtension = path.extname(file).toLowerCase();
    const validExtensions = VALID_EXTENSIONS;

    if (validExtensions.includes(fileExtension)) {
      try {
        const fileData = fs.readFileSync(filePath);
        const base64 = fileData.toString("base64");
        base64Images[file] = `data:image/${fileExtension.slice(
          1
        )};base64,${base64}`;
      } catch (err) {
        console.error(`Failed to process file ${file}:`, (err ).message);
      }
    } else {
      console.warn(`Skipping non-image file: ${file}`);
    }
  });

  try {
    fs.writeFileSync(outputFile, JSON.stringify(base64Images, null, 2), "utf8");
    console.log(`Base64 data saved to ${outputFile}`);
  } catch (err) {
    console.error(`Failed to write JSON file:`, (err).message);
  }
};
