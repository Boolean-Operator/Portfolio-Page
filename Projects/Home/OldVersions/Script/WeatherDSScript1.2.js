       // ADD FORCAST OR HOURLY CONDITIONS FORCAST

      // To get 5 day weather for US Zipcode 07112: JSON:
      // https://api.apixu.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7
      // To get 5 day forcast for GeoLocation: JSON
      // https://api.apixu.com/v1/forecast.json?key=005811d25da34e949b2170415170305&q=39.12,-75.52&days=5


$(document).ready(function() {
  // declare location variables
  var accu, lat, lon, link, time, date, day, city, region, country;
  // declare weather variables
  var measure, descr, descr_i, wind_k, sunrise, sunset,
      wind_m, wind_d, humidity, temp_c, temp_f, feels_c, feels_f;
  // declare forecast vaiables
  var for_sunrise, for_sunset, for_high_F, for_high_C, for_low_F, for_low_C, for_cond, for_humid, for_date;

  //api key - should be moved to server side
  var apiKey = '2b06ec059a8e5f4b05b3ca2a5468d466';

  //var date1 = "2017-07-12"; // =uses given date
  //var date2 = new Date(); // uses todays date


  function getDayOfWeek(date) {
    var dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  };


  function getMonthOfYear(date) {
  var monthOfYear = new Date(date).getMonth();
  return isNaN(monthOfYear) ? null : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ][monthOfYear];
  };


  // get location or notify user of problem
  function getLocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather);
    } else {
      alert("There is a problem with Geolocation at this time. ");
    }
  }

  //get weather data for this location
  function getWeather(position) {
    console.log(position);
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    accu = position.coords.accuracy;

    link =
    'https://api.darksky.net/forecast/'+
    secretKey+'/'+
    lat +
    "," +
    lon +;

    $.getJSON(link, function(data) {

      console.log(data);

      city = data.location.name;
      region = data.location.region;
      country = data.location.country;

      descr = data.current.condition.text;
      descr_i = data.current.condition.icon;
      code = data.current.condition.code;
      wind_m = data.current.wind_mph;
      wind_k = data.current.wind_kph;
      wind_d = data.current.wind_dir;
      temp_f = data.current.temp_f;
      temp_c = data.current.temp_c;
      feels_f = data.current.feelslike_f;
      feels_c = data.current.feelslike_c;
      humidity = data.current.humidity;
      sunrise = data.forecast.forecastday["0"].astro.sunrise;
      sunset = data.forecast.forecastday["0"].astro.sunset;

      var curDate = data.current.last_updated;
      // date = data.forecast.forecastday["0"].date;
      date = (new Date(curDate));
      day = getDayOfWeek(date);
      month = getMonthOfYear(date);
      dayNum = date.getDate();
      fullYear = date.getFullYear();



      //change background image with conditions
      // calls function from BackGroundImage.js

      // backGround(code);

      //use selectors to populate document
      $("#dateInfo").html( day + ", <br>" +month+" "+dayNum+", "+fullYear);
      $("#local").html(city + ", " + region);
      $("#cond").html(descr);
      $("#humid").html("Current Humidity : " + humidity + " %");
      $("#sun").html("Sunrise: " +sunrise +"<br> Sunset: " +sunset);

      //
      // function forecastFahr() {
      //   $(".forDay").remove();
      //   // loop to get 5-day forecast data
      //   for (var i = 0; i < data.forecast.forecastday.length; i++) {
      //     i = i.toString(); // forecastday array requires index number to be string
      //
      //     for_date = data.forecast.forecastday[i].date;
      //     for_sunrise = data.forecast.forecastday[i].astro.sunrise;
      //     for_sunset = data.forecast.forecastday[i].astro.sunset;
      //     for_high_F = data.forecast.forecastday[i].day.maxtemp_f;
      //     for_low_F = data.forecast.forecastday[i].day.mintemp_f;
      //     for_cond = data.forecast.forecastday[i].day.condition.text;
      //     for_humid = data.forecast.forecastday[i].day.avghumidity;
      //     console.log(for_date);
      //     for_date = (new Date(for_date));
      //     console.log(for_date);
      //     for_day = getDayOfWeek(for_date);
      //     console.log(for_day);
      //
      //     var parts = for_date.split("-");
      //     var x = parts[0] +","+ (parts[1]).toString() +","+ parts[2];
      //     for_date = (new Date(x));
      //
      //     $(".forecast").append("<div class = 'forDay'><h3>" +for_day+ "</h3><br>" +
      //                           "<li>High Temp: " +for_high_F + "\xB0 F<br>"+
      //                           "Low Temp: " +for_low_F + "\xB0 F<br>"+
      //                           "Humidty: " +for_humid + "%"+"<br>"+
      //                           "Conditions: " +for_cond+ "<br>" +
      //                           "Sunrise: " +for_sunrise +"<br>"+
      //                           "Sunset: " +for_sunset +
      //                           "</li></div>")
      //   }
      // }
      //
      // // forecastFahr();
      //
      // function forecastCel() {
      //   $(".forDay").remove();
      //   // loop to get 5-day forecast data
      //   for (var i = 0; i < data.forecast.forecastday.length; i++) {
      //     i = i.toString(); // forecastday array requires index number to be string
      //
      //     for_date = data.forecast.forecastday[i].date;
      //     for_sunrise = data.forecast.forecastday[i].astro.sunrise;
      //     for_sunset = data.forecast.forecastday[i].astro.sunset;
      //     for_high_C = data.forecast.forecastday[i].day.maxtemp_c;
      //     for_low_C = data.forecast.forecastday[i].day.mintemp_c;
      //     for_cond = data.forecast.forecastday[i].day.condition.text;
      //     for_humid = data.forecast.forecastday[i].day.avghumidity;
      //
      //     for_date = (new Date(for_date));
      //     for_day = getDayOfWeek(for_date);
      //     console.log(for_day);
      //
      //     $(".forecast").append("<div class = 'forDay'><h3>" +for_day+ "</h3><br>" +
      //                           "<li>High Temp: " +for_high_C + "\xB0 C<br>"+
      //                           "Low Temp: " +for_low_C + "\xB0 C<br>"+
      //                           "Humidty: " +for_humid + "%"+"<br>"+
      //                           "Conditions: " +for_cond+ "<br>"+
      //                           "Sunrise: " +for_sunrise +"<br>"+
      //                           "Sunset: " +for_sunset +
      //                           "</li></div>")
      //   }
      // }
      //
      //
      //convert measurements Celcius/Farhenheit
      function farhen() {
        measure = "C";
        forecastFahr();
        $("#temper").html(
          "Temperature: " +
            temp_f +
            "\xB0 F <br> Feels like : " +
            feels_f +
            "\xB0 F"
        );
        $("#wind").html(
          "Winds from the " + wind_d + "<br> @ " + wind_m + " miles per hour"
        );
        $(".btn-default").html("Convert to <br> Celcius <br> \xB0 " + measure);
      }

      function celc() {
        measure = "F";
        forecastCel();
        $("#temper").html(
          "Temperature: " +
            temp_c +
            "\xB0 C <br> It feels like : " +
            feels_c +
            "\xB0 C"
        );
        $("#wind").html(
          "Winds from the " +
            wind_d +
            "<br> @ " +
            wind_k +
            " kilometers per hour"
        );
        $(".btn-default").html("Convert to <br> Farhenheit <br> \xB0" + measure);
      }

      farhen();

      // to display measurements in farhen() or celc()
      $(".btn-default").on("click", function() {
        measure === "C" ? celc(): farhen();
      });

    });
  }
  getLocate();
});
