# Mongoose rename _id plugin
[![Build status][travis-svg]][travis]
[![Code coverage][codecov-svg]][codecov]
[![License][license-svg]][license]

[travis]: https://travis-ci.org/tepio/mongoose-rename-id
[travis-svg]: https://img.shields.io/travis/tepio/mongoose-rename-id.svg?style=flat
[codecov]: https://codecov.io/gh/tepio/mongoose-rename-id
[codecov-svg]: https://img.shields.io/codecov/c/github/tepio/mongoose-rename-id.svg
[license]: https://opensource.org/licenses/MIT
[license-svg]: https://img.shields.io/badge/license-MIT-blue.svg

Can change "_id" to "id" for all queries besides `Model.create()`.


```js
var renameIdPlugin = require('mongoose-rename-id');

schema.plugin(renameIdPlugin({newIdName: 'id'}));

Post.create({ _id: id });

Post.find({ id });
Post.update({ id }, {some: true});
Post.findOneAndUpdate({ id }, {some: true});
Post.remove({ id });
```
