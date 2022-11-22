const fs = require("fs/promises");

const createFolderIsNotExist = async (dirPath) => {
  try {
    const isExist = fs
      .access(dirPath)
      .then(() => true)
      .catch(() => false);
    
    if (!(await isExist)) {
      await fs.mkdir(dirPath);
    }
  } catch (err) {
    throw new Error(`Can't create new folder ${dirPath}`);
  }
};

module.exports = {
  createFolderIsNotExist,
};
