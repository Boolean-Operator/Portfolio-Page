       // ADD FORCAST OR HOURLY CONDITIONS FORCAST
      // To get 5 day weather for US Zipcode 07112: JSON:

$(document).ready(function() {
  // // declare location variables
  var accu, lat, lon, link, time, date, day, city, region, country;
  // // declare weather variables
  var measure, descr, descr_i, wind_k, sunrise, sunset,
      wind_m, wind_d, bearing, humidity, temp_c, temp_f, feels_c, feels_f;
  // // declare forecast vaiables
  // var for_sunrise, for_sunset, for_high_F, for_high_C, for_low_F, for_low_C, for_cond, for_humid, for_date;

  //api key - should be moved to server side
  const secretKey = '2b06ec059a8e5f4b05b3ca2a5468d466';

  function getDayOfWeek(date) {
    var dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  };

  function getMonthOfYear(date) {
  var monthOfYear = new Date(date).getMonth();
  return isNaN(monthOfYear) ? null : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ][monthOfYear];
  };
  //convert bearing in degrees to compass direction
  function degToCompass(num) {
     var val = Math.floor((num / 22.5) + 0.5);
     var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
     return arr[(val % 16)];
     };

  // get location or notify user of problem
  function getLocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather);
    } else {
      alert("There is a problem with Geolocation at this time. ");
      console.log(navigator.geolocation);
    }
  }

  //get weather data for this location
  function getWeather(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    accu = position.coords.accuracy;
    console.log(lat,lon);

    link =
    'https://api.darksky.net/forecast/'+
    secretKey+'/'+
    lat +
    "," +
    lon+
    '?callback=?';

    $.getJSON(link, function(data) {
       console.log(data);

      descr = data.currently.summary;
      bearing = data.currently.windBearing;
      wind_m = data.currently.windSpeed;
      temp = data.currently.temperature;

      date = new Date(Date.now());
      day = getDayOfWeek(date);
      month = getMonthOfYear(date);
      dayNum = date.getDate();
      fullYear = date.getFullYear();

      wind_d = degToCompass(bearing);
      console.log(wind_d);

      // //use selectors to populate document
      $("#dateInfo").html( day + ", " +month+" "+dayNum+", "+fullYear);
      $("#temper").html(temp+ " \xB0 F");
      $("#cond").html(descr);
      $("#wind").html(wind_m+" mph   from the " + wind_d);
    });
  }
  getLocate();
});
