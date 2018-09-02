const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const mongoose = require('mongoose');

const mongodbURL = 'mongodb://pwdk:password99@ds139632.mlab.com:39632/pwdk_blog'

/**
 * Connecting to database
 */
mongoose.connect(mongodbURL, () => {
  console.log('Connected to mongodb')
});

const db = mongoose.connection

db.on('error', () => {
  console.log('Connection Error')
})

const app = express();
app.use(parser())
app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  res.send('I just built a server')
});

app.get('/pwdk', (req, res) => res.send('Hello Purwadhika'));
app.post('/testpost', (req, res) => {
  console.log(req.body) 
  res.send('Berhasil')
});
app.get('/blogs', (req, res) =>
  res.json({
    title: 'Blog',
    subtitle: 'Subtitle',
    text:
      'Incididunt aute ut eiusmod aute nostrud aliquip fugiat elit sit est nostrud ullamco deserunt velit. Veniam ipsum ad voluptate eu dolor irure. Cillum reprehenderit dolor adipisicing tempor deserunt sit. Amet dolor incididunt fugiat enim quis proident do cillum elit. Nulla qui laboris occaecat aliqua minim nostrud tempor in id. Enim aute et sunt sit eu eiusmod magna cillum nulla incididunt nostrud. Mollit tempor commodo ad in Lorem sit fugiat fugiat proident culpa dolore amet aute.'
  })
);

app.listen(5000, () => console.log('Example app listening on port 5000!'));
