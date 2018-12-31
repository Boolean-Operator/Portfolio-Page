function backGround(condCode) {
        switch(condCode) {
          case 1000:
          $('body').css("background-image", "url('assets/sunny-lake.jpg')");
          console.log("sunny");
          break;
          case 1003:
          case 1006:
          case 1009:
          $('body').css("background-image", "url('assets/cloudy-1.jpg')");
          console.log("cloud");
          break;
          case 1063: 
          case 1180: 
          case 1183: 
          case 1186: 
          case 1192: 
          case 1195: 
          case 1198: 
          case 1240: 
          case 1243: 
          case 1246: 
          case 1030: 
          case 1072: 
          case 1150: 
          case 1168: 
          case 1171: 
          $('body').css("background-image", "url('assets/rain-umbrella.jpg')");
          console.log("rain"); 
          break;
          case 1069: 
          case 1198: 
          case 1201: 
          case 1204: 
          case 1204: 
          case 1237: 
          case 1249: 
          case 1252: 
          case 1261: 
          case 1264: 
          $('body').css("background-image", "url('assets/sleet.jpg')");
         console.log(" sleet"); 
          break;
          case 1087: 
          case 1273: 
          case 1276: 
          $('body').css("background-image", "url('assets/lightning.jpg')");
          console.log("thunder"); 
          break;
          case 1066: 
          case 1114: 
          case 1117: 
          case 1210: 
          case 1213: 
          case 1216: 
          case 1219: 
          case 1222: 
          case 1225: 
          case 1250: 
          case 1258: 
          case 1279: 
          case 1282: 
          $('body').css("background-image", "url('assets/blizzard.jpg')");
          console.log("snow"); 
          break;
          case 1135: 
          case 1147:
          $('body').css("background-image", "url('assets/foggy-lake.jpg')");
          console.log("fog"); 
          break;
          default:
          $('body').css("background-image", "url('assets/evening-sky.jpg')");
          console.log("bgDefault");
        }
      };
      // image tester
      // code = prompt( "enter code");
      // code = parseInt(code,10);