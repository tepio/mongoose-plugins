const test = require('ava');
const mongoose = require('mongoose');
const _ = require('lodash');
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017/simpleId');

const renameIdPlugin = require('../');

const schema = new mongoose.Schema({some: Boolean});
schema.plugin(renameIdPlugin({newIdName: 'id', mongoose}));
const Post = mongoose.model('post', schema);

const { ObjectId } = require('mongoose').mongo;
const id = new ObjectId();

test('create', async t => {
  const post = await Post.create({ _id: id });
  t.is(String(post.id), String(id));
});

test('findOne', async t => {
  const post = await Post.findOne({ id });
  t.is(String(post.id), String(id));
});

test('findById', async t => {
  const post = await Post.findById(id);
  t.is(String(post.id), String(id));
});

test('find', async t => {
  const posts = await Post.find({ id });
  _.forEach(posts, post => t.is(String(post.id), String(id)));
});

test('update', async t => {
  const post = await Post.update({ id }, {some: true});
  t.is(post.ok, 1);
});

test('findOneAndUpdate', async t => {
  const post = await Post.findOneAndUpdate({ id }, {some: true});
  t.is(String(post.id), String(id));
});

test('findOneAndRemove', async t => {
  const post = await Post.findOneAndRemove({ id }, {some: true});
  t.is(String(post.id), String(id));
});

test('remove', async t => {
  await Post.create({ _id: id });
  const { result } = await Post.remove({ id });
  t.is(result.ok, 1);
});
