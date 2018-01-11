Instructions for setting site in local sandbox:
1. clone the project into your device from github (https://github.com/AMatkari/hotelApp)
2. from command line move to the project folder ( cd *app Directory Path*/hotelApp)
3. install npm packages ( npm install )
4. install bower component ( bower install )
5. start the application ( node bin/www )

assumptions and issues
1. RegionIds parameter is not usable for users, but i didn't find parameter to pass instead like (region         names or a list of region names and ids)  
2. i assumed that minTotalRate & maxTotalRate is the price, depending on returned values when search