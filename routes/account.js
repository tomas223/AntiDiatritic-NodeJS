var express = require('express');
var router = express.Router();
var session = require('client-sessions');
var debug = require('debug')('anti:account');


/* GET home page. */
router.use(session({
  cookieName: 'session1',
  secret: 'random_string_goes_here',
//  duration: 30 * 60 * 1000,
//  activeDuration: 5 * 60 * 1000,
}));

router.get('/', function(req, res, next) {
  // Update views
  debug(req.session1)
  req.session1.views = (req.session1.views || 0) + 1
//  req.session1.reset()
  debug(req.session1)
  
  // Write response 
  res.end(req.session1.views + ' views')
  
});

module.exports = router;
module.exports.com