var app = angular.module('hotelApp', [
    '720kb.datepicker'
]);
//directive to handle search by enter key 
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
app.controller('hotelDealController', function ($scope, $http) {
    $scope.hotelDeals = [];
    $scope.minDate = new Date().toDateString();
    $scope.searchObj = {
        destinationCountry: '',
        destinationProvince: '',
        destinationCity: '',
        regionIds: '',
        lengthOfStay: '',
        minTripStartDate: '',
        maxTripStartDate: '',
        minStarRating: '',
        maxStarRating: '',
        minTotalRate: '',
        maxTotalRate: '',
        minGuestRating: '',
        maxGuestRating: ''
    };

    //function get hotel deals from api
    $scope.search = function () {
        $scope.errorAccured = false;
        if (!isValidForm()) {
            return false;
        }
        $scope.hotelDeals = [];
        $scope.btnShowLoading = true
        var request = $http.get('/hotelDeals?' + getJsonAsParam($scope.searchObj));
        request.success(function (data) {
            $scope.btnShowLoading = false
            //data retrieved successfully 
            if (data.status) {
                $scope.hotelDeals = data.data;
                //data retrieved failed 
            } else {
                $scope.errorAccured = true;
            }
        });
        request.error(function (data) {
                $scope.errorAccured = true;
        });
    }
    //function to reset search data
    $scope.reset = function () {
        $scope.searchObj = {
            destinationCountry: '',
            destinationProvince: '',
            destinationCity: '',
            regionIds: '',
            lengthOfStay: '',
            minTripStartDate: '',
            maxTripStartDate: '',
            minStarRating: '',
            maxStarRating: '',
            minTotalRate: '',
            maxTotalRate: '',
            minGuestRating: '',
            maxGuestRating: ''
        };
    }
    //function to validate search data
    var isValidForm = function () {
        var valid = true;

        $scope.invalidLengthOfStay = false
        $scope.invalidMinStarRating = false
        $scope.invalidMaxStarRating = false
        $scope.invalidMinTotalRate = false
        $scope.invalidMaxTotalRate = false
        $scope.invalidMinGuestRating = false
        $scope.invalidMaxGuestRating = false

        $scope.invalidMinMaxStarRating = false
        $scope.invalidMinMaxTotalRate = false
        $scope.invalidMinMaxGuestRating = false
        $scope.invalidMinMaxStartDate = false

        if (!$scope.isEmpty($scope.searchObj.lengthOfStay) && (isNaN($scope.searchObj.lengthOfStay) || $scope.searchObj.lengthOfStay <= 0)) {
            $scope.invalidLengthOfStay = true
            valid = false;
        }


        if (!$scope.isEmpty($scope.searchObj.minStarRating) && (isNaN($scope.searchObj.minStarRating) || $scope.searchObj.minStarRating < 0 || $scope.searchObj.minStarRating > 5)) {
            $scope.invalidMinStarRating = true
            valid = false;
        }
        if (!$scope.isEmpty($scope.searchObj.maxStarRating) && (isNaN($scope.searchObj.maxStarRating) || $scope.searchObj.maxStarRating <= 0 || $scope.searchObj.maxStarRating > 5)) {
            $scope.invalidMaxStarRating = true
            valid = false;
        }
        if ($scope.searchObj.minStarRating && $scope.searchObj.maxStarRating && $scope.searchObj.minStarRating > $scope.searchObj.maxStarRating) {
            $scope.invalidMinMaxStarRating = true
            valid = false;
        }

        if (!$scope.isEmpty($scope.searchObj.minTotalRate) && (isNaN($scope.searchObj.minTotalRate) || $scope.searchObj.minTotalRate < 0)) {
            $scope.invalidMinTotalRate = true
            valid = false;
        }
        if (!$scope.isEmpty($scope.searchObj.maxTotalRate) && (isNaN($scope.searchObj.maxTotalRate) || $scope.searchObj.maxTotalRate <= 0)) {
            $scope.invalidMaxTotalRate = true
            valid = false;
        }
        if ($scope.searchObj.minTotalRate && $scope.searchObj.maxTotalRate && $scope.searchObj.minTotalRate > $scope.searchObj.maxTotalRate) {
            $scope.invalidMinMaxTotalRate = true
            valid = false;
        }


        if (!$scope.isEmpty($scope.searchObj.minGuestRating) && (isNaN($scope.searchObj.minGuestRating) || $scope.searchObj.minGuestRating < 0 || $scope.searchObj.minGuestRating > 5)) {
            $scope.invalidMinGuestRating = true
            valid = false;
        }
        if (!$scope.isEmpty($scope.searchObj.maxGuestRating) && (isNaN($scope.searchObj.maxGuestRating) || $scope.searchObj.maxGuestRating <= 0 || $scope.searchObj.maxGuestRating > 5)) {
            $scope.invalidMaxGuestRating = true
            valid = false;
        }
        if ($scope.searchObj.minGuestRating && $scope.searchObj.maxGuestRating && $scope.searchObj.minGuestRating > $scope.searchObj.maxGuestRating) {
            $scope.invalidMinMaxGuestRating = true
            valid = false;
        }
        if ($scope.searchObj.minGuestRating && $scope.searchObj.maxGuestRating && $scope.searchObj.minGuestRating > $scope.searchObj.maxGuestRating) {
            $scope.invalidMinMaxGuestRating = true
            valid = false;
        }
        if ($scope.searchObj.maxTripStartDate && $scope.searchObj.minTripStartDate && (new Date($scope.searchObj.maxTripStartDate) < new Date($scope.searchObj.minTripStartDate))) {
            $scope.invalidMinMaxStartDate = true
            valid = false;
        }




        return valid
    };
    //function to parse obj to params
    var getJsonAsParam = function (json) {
        return Object.keys(json).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(json[k])
        }).join('&');
    }
    //function to check if value is empty
    $scope.isEmpty = function (val) {
        return val == null || val == undefined || val.toString().trim() == '';
    }
    //call search function
    $scope.search();
});