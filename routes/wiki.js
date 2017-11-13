const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;



router.get('/', function(req, res, next) {
  res.send('GET');
  // Page.findAll()
  //   .then(pages => {
  //     pages.forEach(page => {
  //       page.url
  //     })
  //   })
  res.redirect('/wiki/');
});



router.post('/', function(req, res, next) {
  // res.json(req.body);
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });
  var user = User.build({
    name: req.body.name,
    email: req.user.email
  })

  page.save()
  .catch(function (err){
    next(err);
  })
  res.json(page);
});

router.get('/add', function(req, res, next) {
  res.render('../views/addpage');
  //As far as we got, still not displaying page with params
});

router.get('/:urlTitle', function (req, res, next) {

  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(page){
    res.render('../views/wikipage');
  })
  .catch(next);

});


module.exports = router;
