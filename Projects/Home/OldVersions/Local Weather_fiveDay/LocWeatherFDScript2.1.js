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
  var for_sunrise, for_sunset, for_high_F, for_high_C, for_low_F,
        for_low_C, for_cond, for_humid, for_date;     

  // declare hourly report variables
  var hour_time, hour_cond, hour_temp_F, hour_wind_F, hour_temp_C,
       hour_wind_C, hour_windDir, hour_humid, hour, minute;


  //api key - should be moved to server side
  var apiKey = "005811d25da34e949b2170415170305";

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

  // converts JSON date to correct format
  function convertDate(date) {
    var parts = date.toString().split("-");
    var x = parts[0] +","+ (parts[1]) +","+ parts[2];
    return x;
  }

  function convertTime(time) {
    var parts = date.toString().split(" ");
    var x = parts[0] +","+ (parts[1]) +","+ parts[2];
    return x;
  }


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
      "https://api.apixu.com/v1/forecast.json?key="+
      apiKey+
      "&q=" +
      lat +
      "+" +
      lon +
      "&days=5";

    $.getJSON(link, function(data) {
      
      console.log(data);

      city =      data.location.name;
      region =    data.location.region;
      country =   data.location.country;

      descr =     data.current.condition.text;
      descr_i =   data.current.condition.icon;
      code =      data.current.condition.code;
      wind_m =    data.current.wind_mph;
      wind_k =    data.current.wind_kph;
      wind_d =    data.current.wind_dir;
      temp_f =    data.current.temp_f;
      temp_c =    data.current.temp_c;
      feels_f =   data.current.feelslike_f;
      feels_c =   data.current.feelslike_c;
      humidity =  data.current.humidity;
      sunrise =   data.forecast.forecastday["0"].astro.sunrise;
      sunset =    data.forecast.forecastday["0"].astro.sunset;

      var curDate = data.current.last_updated;
      date = (new Date(curDate));
      day = getDayOfWeek(date);
      month = getMonthOfYear(date);
      dayNum = date.getDate();
      fullYear = date.getFullYear();



      //change background image with conditions
      // calls function from BackGroundImage.js
      backGround(code);

      //use selectors to populate document
      $("#dateInfo").html( day + ", <br>" +month+" "+dayNum+", "+fullYear);
      $("#local").html(city + ", " + region);
      $("#cond").html(descr);
      $("#humid").html("Current Humidity : " + humidity + " %");
      $("#sun").html("Sunrise: " +sunrise +"<br> Sunset: " +sunset);


      function forecastFahr() {
        $(".forDay").remove();
        // loop to get 5-day forecast data
        for (var i = 0; i < data.forecast.forecastday.length; i++) {
          i = i.toString(); // forecastday array requires index number to be string
          
          for_date = data.forecast.forecastday[i].date;
          for_sunrise = data.forecast.forecastday[i].astro.sunrise;
          for_sunset = data.forecast.forecastday[i].astro.sunset;
          for_high_F = data.forecast.forecastday[i].day.maxtemp_f;
          for_low_F = data.forecast.forecastday[i].day.mintemp_f;
          for_cond = data.forecast.forecastday[i].day.condition.text;
          for_humid = data.forecast.forecastday[i].day.avghumidity;

          for_date = convertDate(for_date);
          for_date = (new Date(for_date));
          for_day = getDayOfWeek(for_date);

          $(".forecast").append("<div class = 'forDay'><h3>" +for_day+ "</h3><br>" +
                                "<li>High Temp: " +for_high_F + "\xB0 F<br>"+
                                "Low Temp: " +for_low_F + "\xB0 F<br>"+
                                "Humidty: " +for_humid + "%"+"<br>"+
                                "Conditions: " +for_cond+ "<br><br>" +
                                "Sunrise: " +for_sunrise +"<br>"+ 
                                "Sunset: " +for_sunset +
                                "</li></div>")
        }
      }

      function hourlyFahr() {
        $(".hourly").remove();
        // loop to get hourly forecast data
        for (var i = 0; i < 12; i++) {
          i = i.toString(); // forecastday array requires index number to be string
          
          hour_time =     data.forecast.forecastday["0"].hour[i].time;
          hour_cond =     data.forecast.forecastday["0"].hour[i].condition.text;
          hour_temp_F =   data.forecast.forecastday["0"].hour[i].temp_f;
          hour_wind_F =   data.forecast.forecastday["0"].hour[i].wind_mph;
          hour_windDir =  data.forecast.forecastday["0"].hour[i].wind_dir;
          hour_humid =    data.forecast.forecastday["0"].hour[i].humidity;

          hour_time =  convertDate(hour_time);
          hour_time = (new Date(hour_time));
          hour = hour_time.getHours().toString();
          minute = hour_time.getMinutes();

          console.log(typeof hour);

          if (hour<1) {
            hour = 12;
          }
          console.log(hour);

        
          $(".left").append("<div class = 'hourly'><h4 id ='hourTime'>" +hour+":"+minute+ "0 AM</h4>" +
                                "<li>High Temp: " +hour_temp_F + "\xB0 F    "+
                                "Conditions: " +hour_cond+ "<br>" +
                                "Winds from the " +hour_windDir +
                                "@ " +hour_wind_F +" mph"+ 
                                "</li></div>")
        }

        for (var i = 12; i < 24; i++) {
          i = i.toString(); // forecastday array requires index number to be string
          
          hour_time =     data.forecast.forecastday["0"].hour[i].time;
          hour_cond =     data.forecast.forecastday["0"].hour[i].condition.text;
          hour_temp_F =   data.forecast.forecastday["0"].hour[i].temp_f;
          hour_wind_F =   data.forecast.forecastday["0"].hour[i].wind_mph;
          hour_windDir =  data.forecast.forecastday["0"].hour[i].wind_dir;
          hour_humid =    data.forecast.forecastday["0"].hour[i].humidity;

          hour_time =  convertDate(hour_time);
          hour_time = (new Date(hour_time));
          var hour = hour_time.getHours();
          var minute = hour_time.getMinutes();

           if (hour>12) {
            hour = hour - 12;
          }

          $(".right").append("<div class = 'hourly'><h4 id ='hourTime'>" +hour+":"+minute+ "0 PAM</h4>" +
                                "<li>High Temp: " +hour_temp_F + "\xB0 F    "+
                                "Conditions: " +hour_cond+ "<br>" +
                                "Winds from the " +hour_windDir +
                                "@ " +hour_wind_F +" mph"+ 
                                "</li></div>")
        }

      }


      function forecastCel() {
        $(".forDay").remove();
        // loop to get 5-day forecast data
        for (var i = 0; i < data.forecast.forecastday.length; i++) {
          i = i.toString(); // forecastday array requires index number to be string
          
          for_date =    data.forecast.forecastday[i].date;
          for_sunrise = data.forecast.forecastday[i].astro.sunrise;
          for_sunset =  data.forecast.forecastday[i].astro.sunset;
          for_high_C =  data.forecast.forecastday[i].day.maxtemp_c;
          for_low_C =   data.forecast.forecastday[i].day.mintemp_c;
          for_cond =    data.forecast.forecastday[i].day.condition.text;
          for_humid =   data.forecast.forecastday[i].day.avghumidity;

          for_date = convertDate(for_date);
          for_date = (new Date(for_date));
          for_day = getDayOfWeek(for_date);

          $(".forecast").append("<div class = 'forDay'><h3>" +for_day+ "</h3><br>" +
                                "<li>High Temp: " +for_high_C + "\xB0 C<br>"+
                                "Low Temp: " +for_low_C + "\xB0 C<br>"+
                                "Humidty: " +for_humid + "%"+"<br>"+
                                "Conditions: " +for_cond+ "<br>"+ 
                                "Sunrise: " +for_sunrise +"<br>"+ 
                                "Sunset: " +for_sunset + 
                                "</li></div>")
        }
      }


      //convert measurements Celcius/Farhenheit
      function farhen() {
        measure = "C";
        hourlyFahr();
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
