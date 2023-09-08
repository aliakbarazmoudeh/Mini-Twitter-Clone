const express = require('express');
const router = express.Router();
const {
  addBookMark,
  deleteBookMark,
  getAllBookMark,
} = require('../controllers/bookMrakController');
const { authenticateUser } = require('../middleware/authentication');

router.use(authenticateUser);
router.route('/').get(getAllBookMark).post(addBookMark).delete(deleteBookMark);

module.exports = router;
