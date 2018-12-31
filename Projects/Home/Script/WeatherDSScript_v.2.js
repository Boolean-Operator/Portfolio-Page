$(document).ready(function() {
  //  declare location variables
  var link, lat, lon, accu, link;
  // current condition weather variables
  var time, temp, wind_s, bearing, wind_d, descr, wind_d;
  // current conditions date variables
  var unixTime, date, day, month, dayNum, fullYear;
  // five day forecast date variables
  var f_data, f_UnixTime, f_date, f_day, f_month, f_dayNum, f_fullYear;
  // five day forecast weather variables
  var tm_month, tm_monthCor, tm_date, f_tempHigh, t_tempLow, f_wind_s, f_summary;

  //api key - should be moved to server side
  const secretKey = '2b06ec059a8e5f4b05b3ca2a5468d466';

  // Return Name of day of week
  function getDayOfWeek(date) {
    var dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  };

  // Return Name of Month of year
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

  // get users location or notify user of problem
  function getLocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather);
    } else {
      alert("There is a problem with Geolocation at this time. ");
      console.log(navigator.geolocation);
    }
  }

  //get weather data for users location
  function getWeather(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    accu = position.coords.accuracy;

    link =
    'https://api.darksky.net/forecast/'+
    secretKey+'/'+
    lat +
    "," +
    lon+
    '?callback=?';

    // Make call to DarkSky weather API
    $.getJSON(link, function(body) {
      console.log(body);

      time = body.currently.time;
      temp = Math.round(body.currently.temperature);
      wind_s = Math.round(body.currently.windSpeed);
      bearing = body.currently.windBearing;
      descr = body.currently.summary;

      wind_d = degToCompass(bearing);

      console.log("Today")
      unixTime = time *1000;
      // console.log(unixTime);
      date = new Date(unixTime);
      console.log(date);
      day = getDayOfWeek(date);
      month = getMonthOfYear(date);
      dayNum = date.getDate();
      fullYear = date.getFullYear();


      $("#dateInfo").html( day + ", " +month+" "+dayNum+", "+fullYear);
      $("#temper").html(temp+ " \xB0 F");
      $("#cond").html(descr);
      $("#wind").html("Wind:<br>"+wind_s+" mph<br>from the " + wind_d);

      for (var i = 1; i < 6; i++) {
        // body.daily.data array requires index number to be converted to a string
        i = i.toString();

        // console.log("Five Day Forecast: ");
        f_data = body.daily.data[i];
        f_UnixTime = f_data.time * 1000;
        f_date = new Date(f_UnixTime);
        f_day = getDayOfWeek(f_date);
        f_month = getMonthOfYear(f_date);
        f_dayNum = f_date.getDate();
        f_fullYear = f_date.getFullYear();

        f_tempHigh = Math.round(f_data.temperatureHigh);
        f_tempLow = Math.round(f_data.temperatureLow);
        f_wind_s = Math.round(f_data.windSpeed);
        f_wind_d = degToCompass(f_data.windBearing);
        f_summary = f_data.summary;

        tm_month = f_date.getMonth();
        tm_monthCor = f_date.getMonth()+1;
        tm_date = (f_fullYear+"-"+tm_monthCor+"-"+f_dayNum).toString();

        $("#forecast").append("<a href = 'https://darksky.net/details/39.1254,-75.5263/"+tm_date+"/us12/en' target = '_blank'<div class = 'day'><p>"
        +f_day+"<br>"+ f_month+" "+f_dayNum+"</p>" +
        "<span>High Temp: " +f_tempHigh + "\xB0 F<br>"+
        "Low Temp: " +f_tempLow + "\xB0 F<br>"+
        "Winds : " +f_wind_s + "   "+ f_wind_d+"<br>"+
        "<br>Summary<br>" +f_summary+
        "</span></div></a>");
      }
    });
  }
  getLocate();
});
