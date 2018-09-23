// How to install library
// $ npm install --save libraryName
const express = require('express');
const cors = require('cors');
const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const parser = require('body-parser');
const app = express();

const dbURL = 'mongodb://pwdk:password99@ds139632.mlab.com:39632/pwdk_blog'

app.use(parser());

app.use(cors({
  origin: '*'
}));
/**
 * Get all blogs
 */
app.get('/blogs', (req, res) => {
  mongoClient.connect(dbURL, (err, db) => {
    if(err) {
      return res.json({
        status: 'ERROR',
        error: err.message,
      })
    }
    const blogs = db.collection('blogs');
    blogs.find({}).toArray((err, blogs) => {
      if(err) {
        return res.json({
          status: 'ERROR',
          error: err.message,
        })
      }
      return res.json({
        status: 'SUCCESS',
        totalData: blogs.length,
        blogs
      });
    })
  })
})
/**
 * Find by Id
 */
app.get('/blog/:id', (req, res) => {
  mongoClient.connect(dbURL, (err, db) => {
    if(err) {
      return res.json({
        status: 'error',
        error: err.message
      })
    }
    const blogs = db.collection('blogs');
    return blogs.findOne({_id: ObjectId(req.params.id)}, (err, data) => res.json({
      data
    }))
  })
})
/**
 * Post new blog
 */
app.post('/blog', (req, res) => {
  mongoClient.connect(dbURL, (err, db) => {
    if(err) {
      return res.json({
        status: 'error',
        error: err.message
      })
    }
    const blogs = db.collection('blogs');
    const data = {
      ...req.body,
      date_updated: Date.now(),
      date_created: Date.now(),
    }
    blogs.insert(data, (err, response) => {
      if(err) {
        return res.json({
          status: 'error',
          error: err.message
        })
      }
      return res.json({
        status: 'SUCCESS',
        blog: response.ops[0],
        message: 'Blog saved'
      })
    })
  })
})



const port = 8000;

app.listen(port, () => console.log(`Server is up in port ${port}`));
