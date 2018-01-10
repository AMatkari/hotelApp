/*!
 * hotelDeals Manager
 *
 **/

var https = require('https');

//function to parse json to query params
var getJsonAsParam = function (json) {
    return Object.keys(json).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(json[k])
    }).join('&');
}

module.exports = {
    /*
	 * ! Get All 
     * criteria : object contains filter properties
	 * callback function (error,data)
	 */
    getAll: function (criteria, callback) {
        //adding params to url
        var params = getJsonAsParam(criteria)

        var options = {
            host: 'offersvc.expedia.com',
            path: '/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=foo&productType=Hotel&' + params,
            method: 'GET'
        };


        //get hotel deals
        var req = https.request(options, function (res) {
            var dealObj = "";
            //fill returned data in dealObj
            res.on('data', function (data) {
                dealObj += data;
            });
            res.on('end', function () {
                //parse and return retrieved data from api
                try {
                    dealObj = JSON.parse(dealObj);
                    var offers = dealObj.offers
                    var hotels = [];
                    if (offers && offers.Hotel && offers.Hotel.length > 0)
                        hotels = offers.Hotel
                    callback(null, hotels)
                    return
                } catch (e) {
                    callback(null, [])
                    return
                }
            });
        });
        req.end();
        //handle request error
        req.on('error', function (e) {
            callback(e, null);
            return false
        });
    }

}
