// mi serve questo
  //{"lng":18.3231221,"lat":39.9732783,"time":1672977529,"dir":61.8,"heading":62,"info":[{"key":"name", "value":"CAR1"},{"key":"temp", "value":20}]},

  async function AlertPressed() {

    var color_array = ["red", "green", "yellow", "blue", "purple", "cyan", "white"]
    var led_color = color_array[Math.floor(Math.random()*color_array.length)];
    console.log('set led color ' + led_color);

    const newAlertLedConfiguration = {
      mode: "breathe",
      color: led_color,
      intensity: 50,
      delay: 1000,
    }
    //changeLed(device, led_color);
    ///await device.led.write(newLedConfiguration);

  }






  function updateRT() {
    var thingyName = document.getElementById("thingyName");
    var thingyBattery = document.getElementById("thingyBattery");
    var thingyTemp = document.getElementById("thingyTemp");
    var thingyGVector = document.getElementById("thingyGVector");
    var thingyHumidity = document.getElementById("thingyHumidity");
    var thingyPressure = document.getElementById("thingyPressure");
    var thingyRed = document.getElementById("thingyRed");
    var thingyGreen = document.getElementById("thingyGreen");
    var thingyBlue = document.getElementById("thingyBlue");
    var thingyGas = document.getElementById("thingyGas");
    var thingyRawdata = document.getElementById("thingyRawdata");
    var thingyGyroX = document.getElementById("thingyGyroX");
    var thingyGyroY = document.getElementById("thingyGyroY");
    var thingyGyroZ = document.getElementById("thingyGyroZ");
    var thingyAccX = document.getElementById("thingyAccX");
    var thingyAccY = document.getElementById("thingyAccY");
    var thingyAccZ = document.getElementById("thingyAccZ");
    //var thingyColor = document.getElementById("thingyColor");
    // var thingyHeading = document.getElementById("thingyHeading");
    var lat = document.getElementById("lat");
    var lng = document.getElementById("lng");
    var heading = document.getElementById("heading");
    var time = document.getElementById("time");
    var dir = document.getElementById("dir");

    var json_to_send = JSON.stringify({ "lng": lng.textContent,"lat":lat.textContent,"time":time.textContent.slice(0, -3),"dir":dir.textContent,"heading":heading.textContent,"info":[{"key":"name", "value":thingyName.textContent},{"key":"temp", "value":thingyTemp.textContent},{"key":"GVector","value":thingyGVector.textContent}] });
    info.innerHTML('"info":[{"key":"name", "value":' + thingyName.textContent+  '},{"key":"temp", "value":'+thingyTemp.textContent+'},{"key":"GVector","value":' + thingyGVector.textContent+'}');
    //startup(json_to_send);
    testsend(json_to_send);
  }

  function testsend(json) {
    socketExample.send(json);
  }
  function updatestatus(data) {
    //console.log("received: " + data);
    //console.log(typeof data);

    /*if (typeof data === "string") {

    if (data !== "something")
    if (
    typeof data === 'object' &&
    !Array.isArray(data) &&
    data !== null
  ) {*/
  if (data != "something") {
    console.log("working on : " + data);
    data = JSON.parse(data);
    // console.log(data);
    //console.log(data.lng);
    //console.log(data.info);
    //console.log(data.info[0]);
    //console.log(data.info[0].value);
    //console.log(data.info[1]);
    //console.log(data.info[1].value);
    var thingyName = document.getElementById("wsthingyName");
    //thingyName.setHTML(data.info[0].value);
    var thingyBattery = document.getElementById("wsthingyBattery");
    //thingyBattery.setHTML(data.info[0].value);
    var thingyTemperature = document.getElementById("wsthingyTemp");
    // thingyTemp.setHTML(data.info[1].value);
    var thingyGVector = document.getElementById("wsthingyGVector");
    // thingyGVector.setHTML(data.info[2].value);
    // TODO check next line for alert
    // if (data.info[2].value != "") {
    //   // change LED COLOR of thingy to RED
    //   // or play sound
    //   // or activate alert
    // }
    var thingyHumidity = document.getElementById("wsthingyHumidity");
    //thingyHumidity.setHTML(data.info[1].value);
    var thingyHeading = document.getElementById("wsheading");
    var thingyPressure = document.getElementById("wsthingyPressure");
    var thingyRed = document.getElementById("wsthingyRed");
    var thingyGreen = document.getElementById("wsthingyGreen");
    var thingyBlue = document.getElementById("wsthingyBlue");
    var thingyGas = document.getElementById("wsthingyGas");
    var thingyRawdata= document.getElementById("wsthingyRawdata");
    var thingyGyroX = document.getElementById("wsthingyGyroX");
    var thingyGyroY = document.getElementById("wsthingyGyroY");
    var thingyGyroZ = document.getElementById("wsthingyGyroZ");
    var thingyAccX = document.getElementById("wsthingyAccX");
    var thingyAccY = document.getElementById("wsthingyAccY");
    var thingyAccZ = document.getElementById("wsthingyAccZ");
    //var thingyColor = document.getElementById("wsthingyColor");
    // var thingy = document.getElementById("wsthingyColor");
    //thingyHeading.setHTML(data.heading);
    // TODO: when we receive DATA we should add pressure and gas info


    var lat = document.getElementById("wslat");
    lat.setHTML(data.lat);
    var lng = document.getElementById("wslng");
    lng.setHTML(data.lng);
    var heading = document.getElementById("wsheading");
    thingyHeading.setHTML(data.heading);
    var time = document.getElementById("wstime");
    time.setHTML(data.time);
    var dir = document.getElementById("wsdir");
    dir.setHTML(data.dir);
    var thingyInfo = document.getElementById("wsinfo");


    try {
      data.info;
      // object exists
      if (Array.isArray(data.info) ) {
        for (i=0; i < data.info.length; i++) {
          switch(data.info[i].key) {
            case "name":
            // update
            thingyName.setHTML(data.info[i].value);
            break;
            case "temp":
            // update
            thingyTemperature.setHTML(data.info[i].value);
            break;
            case "GVector":
            // update
            thingyGVector.setHTML(data.info[i].value);
            break;
            case "Humidity":
            // update
            thingyHumidity.setHTML(data.info[i].value);
            break;
            case "Pressure":
            // update
            thingyPressure.setHTML(data.info[i].value);
            break;
            case "Rawdata":
            // update
            thingyRawdata.setHTML(data.info[i].value);
            break;
            case "GyroX":
            thingyGyroX.setHTML(data.info[i].value);
            break;
            case "GyroY":
            thingyGyroY.setHTML(data.info[i].value);
            break;
            case "GyroZ":
            thingyGyroZ.setHTML(data.info[i].value);
            break;
            case "AccX":
            thingyAccX.setHTML(data.info[i].value);
            break;
            case "AccY":
            thingyAccY.setHTML(data.info[i].value);
            break;
            case "AccZ":
            thingyAccZ.setHTML(data.info[i].value);
            break;
            case "Red":
            // update
            thingyRed.setHTML(data.info[i].value);
            break;
            case "Green":
            // update
            thingyGreen.setHTML(data.info[i].value);
            break;
            case "Blue":
            // update
            thingyBlue.setHTML(data.info[i].value);
            break;
            case "Gas":
            // update
            thingyGas.setHTML(data.info[i].value);
            break;
            // case "Color":
            // // update
            // thingyColor.setHTML(data.info[i].value);
            // break;
            case "Battery":
            // update
            thingyBattery.setHTML(data.info[i].value);
            break;
            default:
            thingyInfo.setHTML(data.info[i].key + " " + data.info[i].value);
            break;
          }
        }
      }
    }
    catch {
      // object does not exist
      console.log('no info');
    }



  }
}

function startup() {
  if (isLocalHost(window.location.href)) {
    var socketExample = new WebSocket("ws://localhost:3002");
  } else {
    var socketExample = new WebSocket("wss://iot-t52.duckdns.org:3002");
  }
  try {
    socketExample.onopen = function (event) {
      socketExample.send('json_to_send');
    };
    socketExample.onmessage = function (event) {
      //console.log(event.data);
      document.getElementById("demo").innerHTML = event.data;
      //console.log('update status');
      updatestatus(event.data);
    }
  } catch (error) {
    console.error(error);
  }
}


//var json_to_send = JSON.stringify({ "lng": lng.textContent,"lat":lat.textContent,"time":time.textContent.slice(0, -3),"dir":dir.textContent,"heading":heading.textContent,"info":[{"key":"name", "value":thingyName.textContent},{"key":"temp", "value":thingyTemp.textContent},{"key":"GVector","value":thingyGVector.textContent}] });
//startup(json_to_send);
//testsend(json_to_send);


function testsend(json) {
  socketExample.send(json);
}

function sendTimedPost() {
  var toggles = document.getElementsByClassName("td_toggle");
  for (var i=0;i<toggles.length;i++) {
    //console.log(toggles[i]);
    if (toggles[i].querySelectorAll("span")[0].innerText == "Track") {
      //console.log(toggles[i]);
      if (toggles[i].getAttribute('pressed') == 0) {
        //console.log(toggles[i]);
        console.log('pressed -> cancello;')
        clearInterval(timedPost);
        //  TD.update({sendData: 0});
      }
      else if (toggles[i].getAttribute('pressed') == 1) {
        //console.log(toggles[i]);
        console.log('unpressed -> parte;')
        timedPost=setInterval(sendPost,scheduledTimedPostTime);
        //TD.update({sendData: 1});
      }
    }
  }
}

function ConnectDashboard() {
  var toggles = document.getElementsByClassName("td_toggle");
  for (var i=0;i<toggles.length;i++) {
    //console.log(toggles[i]);
    if (toggles[i].querySelectorAll("span")[0].innerText == "Start") {
      //console.log(toggles[i]);
      if (toggles[i].getAttribute('pressed') == 0) {
        //console.log(toggles[i]);
        console.log('Start pressed -> cancello;')
        document.querySelector("#disconnectBtn").click();
        //clearInterval(timedPost);
        //  TD.update({sendData: 0});
      }
      else if (toggles[i].getAttribute('pressed') == 1) {
        //console.log(toggles[i]);
        console.log('Start unpressed -> parte;')
        document.querySelector("#connectBtn").click();
        //timedPost=setInterval(sendPost,1000);
        //TD.update({sendData: 1});
      }
    }
  }
}



function clearTimedPost() {
  clearInterval(timedPost);
}

function clearPot(url=PotBurst) {
  console.log('Clear Pot ' + url);
  TD.update({sendPot: 0});
  clearInterval(url);
}

function logPot(url='') {
  console.log('Pot Burst ' + url);
}
function togglePot(val) {
  if (val) sendPot();
  else clearPot();
}
function sendPot(DBitems = 'potfinds/') {
  // var DBUrl = DbBaseUrl + 'potfinds/';
  // setTimeout(clearPot, 10000);
  // PotBurst = setInterval(logPot, 200, DBitems);
  PotBurst = setInterval(sendPost, 200, 'potfinds/');
  setTimeout(clearPot, 2000, PotBurst);
  console.log("sendPOT");

}
function sendPost(DBitems = 'points/') {
  var DBUrl = DbBaseUrl + DBitems;
  var ApiUrl = NodeBaseUrl + 'thingy52/';
  //
  // if (isLocalHost(window.location.href)) {
  //   var RestApiUrl = 'http://localhost:3002/thingy52';
  // } else {
  //   var RestApiUrl = 'https://iot-t52.duckdns.org:3002/thingy52';
  // }
  // if (isLocalHost(window.location.href)) {
  //   var RestDBUrl = 'http://localhost:3000/points';
  // } else {
  //   //const RestApiUrl = '';
  //   var RestDBUrl = 'https://iot-t52.duckdns.org/iot/proxy/proxy.php?url=http://localhost:3000/points&send_session=1&send_cookies=1&mode=native';
  // }
  var thingyName = document.getElementById("thingyName");
  var thingyBattery = document.getElementById("thingyBattery");
  var thingyTemp = document.getElementById("thingyTemp");
  var thingyGVector = document.getElementById("thingyGVector");
  var thingyHumidity = document.getElementById("thingyHumidity");
  var thingyPressure = document.getElementById("thingyPressure");
  var thingyRawdata = document.getElementById("thingyRawdata");
  var thingyRed = document.getElementById("thingyRed");
  var thingyGreen = document.getElementById("thingyGreen");
  var thingyBlue = document.getElementById("thingyBlue");
  var thingyGas = document.getElementById("thingyGas");
  var thingyRawdata= document.getElementById("thingyRawdata");
  var thingyGyroX = document.getElementById("thingyGyroX");
  var thingyGyroY = document.getElementById("thingyGyroY");
  var thingyGyroZ = document.getElementById("thingyGyroZ");
  var thingyAccX = document.getElementById("thingyAccX");
  var thingyAccY = document.getElementById("thingyAccY");
  var thingyAccZ = document.getElementById("thingyAccZ");
  //var thingyColor = document.getElementById("thingyColor");
  // var thingyHeading = document.getElementById("thingyHeading");
  var lat = document.getElementById("lat");
  var lng = document.getElementById("lng");
  var thingyHeading = document.getElementById("heading");
  // time can be :
  // timeA. read from the timestamp field (updated by change on the gps position) 
  // in this way:
  // var timeA = document.getElementById("time");
  // var time = timea.textContent;
  //
  // or timeB can be updated directly on sending
  var timeB = Date.now();
  var time = timeB + '';

  var dir = document.getElementById("dir");



  //var jsontosend = ;

  fetch(DBUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic '+btoa('uni:salento')
    },
    body: JSON.stringify({ "lng":lng.textContent,"lat":lat.textContent,"time":time,"dir":dir.textContent,"heading":thingyHeading.textContent,"info":[{"key":"name","value":thingyName.textContent},{"key":"temp","value":thingyTemp.textContent},{"key":"GVector","value":thingyGVector.textContent},{"key":"Humidity","value":thingyHumidity.textContent},{"key":"Pressure","value":thingyPressure.textContent},{"key":"Red","value":thingyRed.textContent},{"key":"Green","value":thingyGreen.textContent},{"key":"Blue","value":thingyBlue.textContent},{"key":"Gas","value":thingyGas.textContent},{"key":"Battery","value":thingyBattery.textContent},{"key":"GyroX","value":thingyGyroX.textContent},{"key":"GyroY","value":thingyGyroY.textContent},{"key":"GyroZ","value":thingyGyroZ.textContent},{"key":"AccX","value":thingyAccX.textContent},{"key":"AccY","value":thingyAccY.textContent},{"key":"AccZ","value":thingyAccZ.textContent}] })
  })
  .then(response => response)
  // .then(response => console.log(JSON.stringify(response)))

  fetch(ApiUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic '+btoa('uni:salento')
    },
    body: JSON.stringify({ "lng":lng.textContent,"lat":lat.textContent,"time":time.textContent,"dir":dir.textContent,"heading":thingyHeading.textContent,"info":[{"key":"name","value":thingyName.textContent},{"key":"temp","value":thingyTemp.textContent},{"key":"GVector","value":thingyGVector.textContent},{"key":"Humidity","value":thingyHumidity.textContent},{"key":"Pressure","value":thingyPressure.textContent},{"key":"Red","value":thingyRed.textContent},{"key":"Green","value":thingyGreen.textContent},{"key":"Blue","value":thingyBlue.textContent},{"key":"Gas","value":thingyGas.textContent},{"key":"Battery","value":thingyBattery.textContent},{"key":"GyroX","value":thingyGyroX.textContent},{"key":"GyroY","value":thingyGyroY.textContent},{"key":"GyroZ","value":thingyGyroZ.textContent},{"key":"AccX","value":thingyAccX.textContent},{"key":"AccY","value":thingyAccY.textContent},{"key":"AccZ","value":thingyAccZ.textContent}] })
  })
  .then(response => response)
  // .then(response => console.log(JSON.stringify(response)))
} // fine sendPost