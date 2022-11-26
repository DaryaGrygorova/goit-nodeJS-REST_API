const {
    createNotFoundHttpError,
    createValidationError,
    createEmailExistError,
    createAuthError,
    createCustomError
  } = require('./errorHelpers');

const {avatarImgAdapter} = require('./avatarImgAdapter');
const {createFolderIsNotExist} = require('./createFolderIsNotExist');
const {sendMail, sendVerificationMail} = require('./mailSender');

module.exports = {
    createNotFoundHttpError,
    createValidationError,
    createEmailExistError,
    createAuthError,
    createCustomError,
    avatarImgAdapter,
    createFolderIsNotExist,
    sendMail,
    sendVerificationMail,
  };
  