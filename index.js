// How to install library
// $ npm install --save libraryName
const express = require('express');
const cors = require('cors');
const mongoClient = require('mongodb').MongoClient;

const app = express();

const mongodbURL = 'mongodb://pwdk:password99@ds139632.mlab.com:39632/pwdk_blog'

/**
 * Connecting to database
 */
mongoClient.connect(mongodbURL, (err, db) => {
  console.log('Connected to mongodb');
  inputBlog(db, (res) => {
    console.log(res);
    db.close()
  })
})

const inputBlog = (db, callback) => {
  const collection = db.collection('blogs');
  collection.insertMany([{
    title: 'Blog title',
    subtitle: 'New blog post from nodejs',
    text: 'Fugiat voluptate officia sunt sunt esse dolor laborum proident dolore magna sunt proident ea.',
    active: true,
  }], (err, res) => {
    console.log('Successfuly saved the blog');
    callback(res);
  })
}



app.use(cors({
  origin: '*'
}));

const port = 8000;
app.listen(port, () => console.log(`Server is up in port ${port}`));
