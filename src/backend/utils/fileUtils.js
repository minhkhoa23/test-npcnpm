const fs = require('fs').promises;
const path = require('path');

exports.readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(path.join(__dirname, filePath), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error reading JSON file: ${error.message}`);
  }
};

exports.writeJsonFile = async (filePath, data) => {
  try {
    await fs.writeFile(path.join(__dirname, filePath), JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error(`Error writing JSON file: ${error.message}`);
  }
};