var express = require('express');
var router = express.Router();
var path = require('path');

var hotelDealsManager = require('../manager/hotelDealsManager.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'public/views', 'index.html'));
});

/* GET hotel deals. */
router.get('/hotelDeals', function (req, res) {

  //fill search params in criteria
  var criteria = {};
  if (req.query.destinationCountry && req.query.destinationCountry != "null" && req.query.destinationCountry != "undefined") {
    criteria.destinationCountry = req.query.destinationCountry
  }
  if (req.query.destinationProvince && req.query.destinationProvince != "null" && req.query.destinationProvince != "undefined") {
    criteria.destinationProvince = req.query.destinationProvince
  }
  if (req.query.destinationCity && req.query.destinationCity != "null" && req.query.destinationCity != "undefined") {
    criteria.destinationCity = req.query.destinationCity
  }
  if (req.query.regionIds && req.query.regionIds != "null" && req.query.regionIds != "undefined") {
    criteria.regionIds = req.query.regionIds
  }
  if (req.query.lengthOfStay && req.query.lengthOfStay != "null" && req.query.lengthOfStay != "undefined") {
    criteria.lengthOfStay = req.query.lengthOfStay
  }
  if (req.query.minTripStartDate && req.query.minTripStartDate != "null" && req.query.minTripStartDate != "undefined") {
    criteria.minTripStartDate = req.query.minTripStartDate
  }
  if (req.query.maxTripStartDate && req.query.maxTripStartDate != "null" && req.query.maxTripStartDate != "undefined") {
    criteria.maxTripStartDate = req.query.maxTripStartDate
  }
  if (req.query.minStarRating && req.query.minStarRating != "null" && req.query.minStarRating != "undefined") {
    criteria.minStarRating = req.query.minStarRating
  }
  if (req.query.maxStarRating && req.query.maxStarRating != "null" && req.query.maxStarRating != "undefined") {
    criteria.maxStarRating = req.query.maxStarRating
  }
  if (req.query.minTotalRate && req.query.minTotalRate != "null" && req.query.minTotalRate != "undefined") {
    criteria.minTotalRate = req.query.minTotalRate
  }
  if (req.query.maxTotalRate && req.query.maxTotalRate != "null" && req.query.maxTotalRate != "undefined") {
    criteria.maxTotalRate = req.query.maxTotalRate
  }
  if (req.query.minGuestRating && req.query.minGuestRating != "null" && req.query.minGuestRating != "undefined") {
    criteria.minGuestRating = req.query.minGuestRating
  }
  if (req.query.maxGuestRating && req.query.maxGuestRating != "null" && req.query.maxGuestRating != "undefined") {
    criteria.maxGuestRating = req.query.maxGuestRating
  }

  //call hotel deal manager to search and filter deals
  hotelDealsManager.getAll(criteria, function (error, data) {
    if (error) {
      // hotel deals retrieve failed
      res.send({
        status: false,
        statusCode: 'failed',
        data: error,
        msg: 'failed to retrieve hotel deals'
      });

    } else {
      // hotel deals retrieve successfully
      res.send({
        status: true,
        statusCode: 'success',
        data: data,
        msg: 'hotel deals retrieved successfully'
      });
    }
  });
});
module.exports = router;
