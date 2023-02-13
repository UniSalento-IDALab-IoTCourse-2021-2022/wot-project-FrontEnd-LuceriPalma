
var data = [];
for (var i=0;i<100;i++) data.push(Math.cos(i/10));
var currentdate = new Date();
var datetime = currentdate.getDate() + "/"
+ (currentdate.getMonth()+1)  + "/"
+ currentdate.getFullYear() + " @ "
+ currentdate.getHours() + ":"
+ currentdate.getMinutes() + ":"
+ currentdate.getSeconds();

var o = {
  name:TD.label({x:10,y:10,width:200,height:60,label: "Nome"}),
  datetime:TD.label({x:10,y:80,width:200,height:60,label: datetime}),
  //m:TD.label({x:10,y:60,width:200,height:40,label: "Timestamp"}),
  //n:TD.label({x:10,y:110,width:200,height:40,label: "Now"}),
  start:TD.toggle({x:10,y:150,width:100,height:60,label:"Start",value:0,name:"Connect", onchange:function(e){o.log.log('connect pressed');ConnectDashboard();}}),
  gps:TD.toggle({x:110,y:150,width:100,height:60,label:"GPS",value:0,name:"Gps", onchange:function(e){o.log.log('connect pressed');document.querySelector("#gpsBtn").click();}}),
  //y:TD.toggle({x:10,y:150,width:200,height:60,label:"Connect",value:0,name:"Connect", onchange:function(e){o.log.log('connect pressed');}}),
  threshold_y:TD.value({x:10,y:220,width:200,height:60,label:"Threshold Y",value:1.2,min:0.1,step:0.1,max:4,onchange:function(e,v){newvalue = Math.round((v + Number.EPSILON) * 100) / 100;o.log.log("soglia changed "+newvalue);}}),
  Gvector:TD.value({x:10,y:290,width:200,height:50,label:"Gravity Vector Y", value:0, name:"GVector"}),
  gas:TD.value({x:10,y:350,width:200,height:50,label:"Gas sensor TVOC or CO2 (eCO2)", value:0, name:"GasSensor"}),
  red:TD.value({x:10,y:410,width:200,height:50,label:"Red", value:0,name:"red"}),
  GyroX:TD.value({x:10,y:470,width:200,height:50,label:"GyroX", value:0,name:"GyroX"}),
  AccX:TD.value({x:10,y:530,width:200,height:50,label:"AccX", value:0,name:"AccX"}),
  temperature:TD.gauge({x:220,y:180,width:200,height:160,label:"Temperature (Celsius)",value:0,min:0,max:100,name:"temperature"}),
  battery:TD.gauge({x:220,y:10,width:200,height:160,label:"Battery (%)",value:0,name:"battery"}),
  //gr:TD.graph({x:220,y:220,width:400,height:170,label:"A Graph",data:data}),
  hum:TD.value({x:220,y:350,width:200,height:50,label:"Humidity sensor", value:0, name:"HumiditySensor"}),
  green:TD.value({x:220,y:410,width:200,height:50,label:"Green", value:0, name:"green"}),
  GyroY:TD.value({x:220,y:470,width:200,height:50,label:"GyroY", value:0,name:"GyroY"}),
  AccY:TD.value({x:220,y:530,width:200,height:50,label:"AccY", value:0,name:"AccY"}),
  log:TD.log({x:430,y:10,width:200,height:160,label:"A Log",text:" "}),
  track:TD.toggle({x:430,y:180,width:100,height:60,label:"Track",value:0,name:"sendData",onchange:sendTimedPost}),
  pot:TD.toggle({x:530,y:180,width:100,height:60,label:"PotFinder",value:0,name:"sendPot",onchange:function(e){togglePot(e.pressed);}}),
  alertbutton:TD.button({x:430,y:250,width:99,height:90,label:"Alert",value:0,name:"Alertbutton",onchange:function(e){o.log.log("Alert Pressed!");document.querySelector("#changeLED").click();}}),
  ledoffbutton:TD.button({x:532,y:250,width:99,height:90,label:"LED Off",value:0,name:"LEDoffbutton",onchange:function(e){o.log.log("LED turned off!");document.querySelector("#OffPressed").click();}}),
  pressuresensor:TD.value({x:430,y:350,width:200,height:50,label:"Pressure sensor", value:0, name:"PressureSensor"}),
  blue:TD.value({x:430,y:410,width:200,height:50,label:"Blue", value:0, name:"blue"}),
  GyroZ:TD.value({x:430,y:470,width:200,height:50,label:"GyroZ", value:0,name:"GyroZ"}),
  AccZ:TD.value({x:430,y:530,width:200,height:50,label:"AccZ", value:0,name:"AccZ"}),
  //modal:TD.modal({x:10,y:10,width:400,height:400,label:"Click to connect",onchange:function(el) {o.log.log("Modal clicked");el.remove()}})
};
o.log.log("Thingy52 IoT dashboard");
for (var i in o) document.getElementById('tinyDash').appendChild(o[i]);
//   setInterval(function() {
//     TD.update({gauge : 40*Math.sin(Date.now()/1000)+50});
// }, 100);
//TD.startEditor();

// function AggiornaSoglia() {
//      console.log("ciao");
//   }
var tbutton_a = document.querySelector(".td_btn_a");
tbutton_a.style.setProperty('background-color', 'blue');

//var map = L.map('Lmap').setView([51.505, -0.09], 13);

var map_init = L.map('Lmap', {
  center: [39.9732783, 18.3231221],
  zoom: 9
});
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map_init);
L.Control.geocoder().addTo(map_init);
if (!navigator.geolocation) {
  console.log("Your browser doesn't support geolocation feature!")
  TD.update({gps:0});
} else {
  // setInterval(() => {
  //     navigator.geolocation.getCurrentPosition(getMapPosition)
  // }, 5000);
};
var marker, circle, lat, long, accuracy;
var potholes;
var Lbuche;
var curposition;
var currentPos;
var distance;
var min_distance =0;
var nearest_hole;

function getOriginalMapPosition(position) {
  // console.log(position)
  lat = position.coords.latitude
  long = position.coords.longitude
  accuracy = position.coords.accuracy
  curposition = position;
  currentPos = position;

  if (marker) {
    map_init.removeLayer(marker)
  }

  if (circle) {
    map_init.removeLayer(circle)
  }

  marker = L.marker([lat, long])
  circle = L.circle([lat, long], { radius: accuracy })

  var featureGroup = L.featureGroup([marker, circle]).addTo(map_init)

  map_init.fitBounds(featureGroup.getBounds())

  console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy)
  queryDistance();
  if (min_distance < 1000 && min_distance > 500) {
    console.log("ALERT!");
    console.log("minimal distance to the nearest pothole: " + min_distance );
    console.log("nearest pothole id: " + nearest_hole );
    // changeLED(thingy, "yellow");
    const myAlarmTimeout = setTimeout(function() { 
      document.querySelector("#changeLEDYellow").click();
      document.querySelector("#MakeSound").click();
      setTimeout(function() {  
        document.querySelector("#MakeSound").click();
    }, 1000);
    setTimeout(function() {
      document.querySelector("#MakeSound").click();
    }, 2000);
    }, 10000);
  }
  else if (min_distance < 500) {
    console.log("ALERT!");
    console.log("minimal distance to the nearest pothole: " + min_distance );
    console.log("nearest pothole id: " + nearest_hole );
    // changeLED(thingy, "purple");
    // document.querySelector("#changeLEDPurple").click();
    const myAlarmTimeout = setTimeout(function() { 
      document.querySelector("#changeLEDPurple").click();
      // document.querySelector("#MakeSound").click();
      setTimeout(function() {
      document.querySelector("#MakeSound").click();
    }, 1000);
    setTimeout(function() {
      document.querySelector("#MakeSound").click();
    }, 2000);
    setTimeout(function() {
      document.querySelector("#MakeSound").click();
    }, 3000);
    }, 8000);
  }
  else {
    const myAlarmTimeout = setTimeout(function() { 
      document.querySelector("#changeLEDGreen").click();
    }, 10000);
  }
}

const pxhr = new XMLHttpRequest();
if (isLocalHost(window.location.href)) {
  pxhr.open('GET', 'http://localhost:3002/potholes', true);
} else {
  pxhr.open('GET', 'https://iot-t52.duckdns.org:3002/potholes', true);
}
pxhr.onreadystatechange = pxhrCallback;
pxhr.send();
function queryDistance() {
  //console.log(Lbuche);
  var distance = 0;
  min_distance = 100000;
  if (currentPos) {
    Lbuche.eachLayer(function(l) {
      distance = L.latLng(currentPos.coords.latitude,currentPos.coords.longitude).distanceTo(l.getLatLng());
      if (distance < min_distance) {
        min_distance = distance;
        nearest_hole = l.feature.properties.id;
        // console.log(l.feature.properties.id);
      }
    });
  }
  console.log("distance: " + distance);
}
function pxhrCallback() {
  if (pxhr.readyState === 4 && pxhr.status === 200) {
    const pdata = JSON.parse(pxhr.responseText);
    // console.log(pdata);

    var buche = GeoJSON.parse(pdata, {Point: ['lat', 'lng']});
    var redIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    var greenIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    var MyIcon = L.icon({
      iconUrl: 'leaf-green.png',
      iconSize:     [38, 95], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    potholes = buche.features;
    // console.log(buche.features);
    // console.log(potholes);
    Lbuche = L.geoJSON(buche, {
      pointToLayer: function(feature,latlng){
        return L.marker(latlng,{icon: redIcon});
      },
      onEachFeature: onEachBuca,
      // icon: greenIcon
    }).addTo(map_init);
    // console.log(rotas);
    // markers = rotas;


    function onEachBuca(feature, layer) {
      layer.on('click', function(e) {
        console.log(feature.properties);
      });
    }
    // queryDistance();
  }








}


