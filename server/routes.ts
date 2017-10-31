import * as express from 'express';

import BookCtrl from './controllers/book';
import Book from './models/book';

export default function setRoutes(app) {

  const router = express.Router();

  const bookCtrl = new BookCtrl();

  // Books
  router.route('/books').get(bookCtrl.getAll);
  router.route('/books/count').get(bookCtrl.count);
  router.route('/book').post(bookCtrl.insert);
  router.route('/book/:id').get(bookCtrl.get);
  router.route('/book/:id').put(bookCtrl.update);
  router.route('/book/:id').delete(bookCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
