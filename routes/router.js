const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
  res.render('index', { title: 'Tracky' });
});

// router.post('/' , day.addAction/*the requesst handlers (controller) */)

module.exports = router;
