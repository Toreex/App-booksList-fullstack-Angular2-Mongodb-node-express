import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test2';
import { app } from '../app';
import Book from '../models/book';

const should = chai.use(chaiHttp).should();

describe('Books', () => {

  beforeEach(done => {
    Book.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for books', () => {

    it('should get all the books', done => {
      chai.request(app)
        .get('/api/books')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get books count', done => {
      chai.request(app)
        .get('/api/books/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new book', done => {
      const book = { title: 'Fluffy', author: 'Pere', price: '5€' };
      chai.request(app)
        .post('/api/book')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('title');
          res.body.should.have.a.property('author');
          res.body.should.have.a.property('price');
          done();
        });
    });

    it('should get a book by its id', done => {
      const book = new Book({ title: 'Book', author: 'Pere', price: '5€' });
      book.save((error, newBook) => {
        chai.request(app)
          .get(`/api/book/${newBook.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            res.body.should.have.property('author');
            res.body.should.have.property('price');
            res.body.should.have.property('_id').eql(newBook.id);
            done();
          });
      });
    });

    it('should update a book by its id', done => {
      const book = new Book({ title: 'Book', author: 'Pere', price: '5€' });
      book.save((error, newBook) => {
        chai.request(app)
          .put(`/api/book/${newBook.id}`)
          .send({ weight: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a book by its id', done => {
      const book = new Book({ title: 'Book', author: 'Pere', price: '5€' });
      book.save((error, newBook) => {
        chai.request(app)
          .delete(`/api/book/${newBook.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});


