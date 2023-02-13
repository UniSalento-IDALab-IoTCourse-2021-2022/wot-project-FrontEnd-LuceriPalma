

    // variabili di configurazione
    // valore di soglia per la componente y dell'accellerazione
    // se superata.. indica una anomalia della strada
    // valore impostabile da utente tramite dashboard


    var thingyName = document.getElementById("thingyName");
    var thingyBattery = document.getElementById("thingyBattery");
    var thingyTemp = document.getElementById("thingyTemp");
    var thingyGVector = document.getElementById("thingyGVector");
    var thingyHumidity = document.getElementById("thingyHumidity");
    var thingyPressure= document.getElementById("thingyPressure");
    var thingyRed= document.getElementById("thingyRed");
    var thingyGreen= document.getElementById("thingyGreen");
    var thingyBlue= document.getElementById("thingyBlue");
    var thingyGas= document.getElementById("thingyGas");
    //var thingyColor = document.getElementById("thingyColor");
    var thingyHeading= document.getElementById("heading");
    var thingyRawdata= document.getElementById("thingyRawdata");
    var thingyGyroX = document.getElementById("thingyGyroX");
    var thingyGyroY = document.getElementById("thingyGyroY");
    var thingyGyroZ = document.getElementById("thingyGyroZ");
    var thingyAccX = document.getElementById("thingyAccX");
    var thingyAccY = document.getElementById("thingyAccY");
    var thingyAccZ = document.getElementById("thingyAccZ");


    import Thingy from "./index_nordic.js";
    const thingy = new Thingy({logEnabled: true});



    const myLoggerTemperature = data => {
      console.log(data);
      if (data != undefined) {
      const tempData = data.detail;
      // console.log(tempData);
      var Tnewvalue = Math.round((tempData.value + Number.EPSILON) * 10) / 10;
      thingyTemp.innerHTML = Tnewvalue;
      // console.log("impostare " + tempData.value);
      TD.update({temperature:Tnewvalue});
    }
    }


    var rif_y = 0;
    //CHANGE THRESHOLD
    var tval = document.getElementsByClassName("td_val_a")[1].innerHTML;

    // console.log(tval);
    var threshold_y = tval;
    // console.log(threshold_y);
    //console.log("ciao sono la soglia: " + tval);

    const myLoggerGravity = data => {
      const tempData = data.detail;
      //console.log(tempData);
      var tval = document.getElementsByClassName("td_val_a")[0].innerHTML;
      // console.log(tval);
      var threshold_y = parseFloat(tval);
      var threshold_yn = Math.round((threshold_y + Number.EPSILON) * 100) / 100;
      //var threshold_y = tval;
      // console.log(threshold_yn);
      if (isNaN(threshold_yn)) {
      }
      var GVectorY = parseFloat(tempData.value.y);
      var GVectorYn = Math.round((GVectorY + Number.EPSILON) * 100) / 100;
      // console.log(GVectorYn);
      if (isNaN(GVectorYn)) {
        console.log("GVectorYn is not a number");
      }
      var diffVector=GVectorYn - rif_y;


      if (Math.abs(diffVector) > threshold_yn){
        thingyGVector.innerHTML = tempData.value.x + "," + tempData.value.y + "," + tempData.value.z + "";
        console.log("Y vale: " + Math.abs(diffVector) + " ed ha superato la soglia: " + threshold_yn);
        //console.log(" Y );

        // TODO: qui deve andare l-invio info per le buche
        console.log("TODO: qui deve andare l-invio info per le buche");
        //TD.update({log:"Y vale: " + tempData.value.y + " ed ha superato la soglia: " + tval});
        TD.update({GVector:GVectorYn});
        //var Ynewvalue = GVectorYn;
        o.log.log("Y vale: " + Math.abs(diffVector) + " ed ha superato la soglia: " + threshold_yn);

        // se Track Post e' attivo
        var toggles = document.getElementsByClassName("td_toggle");
        for (var i=0;i<toggles.length;i++) {
          //console.log(toggles[i]);
          if (toggles[i].querySelectorAll("span")[0].innerText == "PotFinder") {
            //console.log(toggles[i]);
            if (toggles[i].getAttribute('pressed') == 0) {
              //console.log(toggles[i]);
              console.log('unpressed 0 -> cancello invio buca;')
              //clearInterval(timedPost);
              if (PotBurst) {
                clearPot();
              }
              //  TD.update({sendData: 0});
            }
            else if (toggles[i].getAttribute('pressed') == 1) {
              //console.log(toggles[i]);
              console.log('pressed 1 ->  invio buca;')
              if (PotBurst) {
                sendPot();
              }
              //timedPost=setInterval(sendPost,1000);
              //TD.update({sendData: 1});
            }
          }
        }



        //sendPost();
      }
      rif_y = GVectorYn;
    }

    const myLoggerHumidity = data => {
      const tempData = data.detail;
      //console.log(tempData);
      thingyHumidity.innerHTML = tempData.value + " %";
      TD.update({HumiditySensor:tempData.value + " %"});
    }

    const myLoggerHeading = data => {
      //console.log(data);
      const tempData = data.detail;
      //console.log(tempData);
      var newHeadingvalue =  Math.round((tempData.heading + Number.EPSILON) * 100) / 100;
      thingyHeading.innerHTML = newHeadingvalue;
    }

    const myLoggerPressure = data => {
      const tempData = data.detail;
      //console.log(tempData+ " " + tempData.unit);
      thingyPressure.innerHTML = tempData.value+ " " + tempData.unit;
      TD.update({PressureSensor:tempData.value + " " + tempData.unit});

    }

    const myLoggerColor = data => {
      const tempData = data.detail;
      // console.log(" colore ");
      // console.log(" red:" + tempData.red);
      // console.log(" blue:" + tempData.blue);
      // console.log(" green:" + tempData.green);

      //thingyColor.innerHTML = tempData.value;+ " " + tempData.unit;
      thingyRed.innerHTML = tempData.red;
      TD.update({red:tempData.red});
      thingyBlue.innerHTML = tempData.blue;
      TD.update({blue:tempData.blue});
      thingyGreen.innerHTML = tempData.green;
      TD.update({green:tempData.green});



    }

    const myLoggerGas = data => {
      const tempData = data.detail;
      //console.log(tempData);
      thingyGas.innerHTML = tempData.TVOC.value + " " + tempData.TVOC.unit + " - " + tempData.eCO2.value + " " + tempData.eCO2.unit  ;
      TD.update({GasSensor:tempData.TVOC.value + " " + tempData.TVOC.unit + " - " + tempData.eCO2.value + " " + tempData.eCO2.unit });
    }

    const myLoggerRawData = data => {
      const tempData = data.detail;
      //  console.log("siamo i dati:");
      //console.log(data);
      //console.log("e noi i dettagli dei dati:");
      //  console.log(data.detail);
      thingyRawdata.innerHTML = tempData.accelerometer.x + " " + tempData.accelerometer.y + " " + tempData.accelerometer.z + " " + tempData.gyroscope.x + " " + tempData.gyroscope.y + " " + tempData.gyroscope.z;
      // console.log('Raw data: Accelerometer: ' + tempData.accelerometer.x +' x ' +  tempData.accelerometer.y +' y ' + tempData.accelerometer.z + ' z ' + " G ");
      // console.log('Raw data: Gyroscope: ' + tempData.gyroscope.x +' x ' +  tempData.gyroscope.y +' y ' + tempData.gyroscope.z+ ' z ' + " deg/s " );
      thingyGyroX.innerHTML = tempData.gyroscope.x;
      TD.update({GyroX:tempData.gyroscope.x});
      thingyGyroY.innerHTML = tempData.gyroscope.y;
      TD.update({GyroY:tempData.gyroscope.y});
      thingyGyroZ.innerHTML = tempData.gyroscope.z;
      TD.update({GyroZ:tempData.gyroscope.z});
      thingyAccX.innerHTML = tempData.accelerometer.x;
      TD.update({AccX:tempData.accelerometer.x});
      thingyAccY.innerHTML = tempData.accelerometer.y;
      TD.update({AccY:tempData.accelerometer.y});
      thingyAccZ.innerHTML = tempData.accelerometer.z;
      TD.update({AccZ:tempData.accelerometer.z});

      //console.log(tempData);
      //  thingyGas.innerHTML = tempData.TVOC.value + " " + tempData.TVOC.unit + " - " + tempData.eCO2.value + " " + tempData.eCO2.unit  ;

    }






    async function start(device) {
      try {
        await device.connect();
        // READ DEVICE NAME OK
        var deviceName = await device.name.read();
        console.log(deviceName);
        //console.log(tval[1].innerHTML);
        thingyName.innerHTML = deviceName.name;
        //    l:TD.label({x:10,y:10,width:200,height:130,label:tName}),


        //        console.log("TODO impostare label a" + deviceName.name);
        const tlabel = document.getElementsByClassName("td_label");
        // console.log(tlabel);
        //   tlabel[0].setHTML('<div class="td td_label" style="width: 200px; height: 130px; left: 10px; top: 10px;"><span>'+ deviceName.name + '</span></div>');
        // var NameLabel = tlabel[0].querySelector('span');
        // console.log(NameLabel);
        // tlabel[0].querySelector('span').setHTML(deviceName.name);
        tlabel[0].querySelector('span').innerHTML = deviceName.name;

        // READ LED STATUS
        const currentLedConfiguration = await device.led.read();
        // console.log(currentLedConfiguration);

        
        // set led to green?  or read alarm status from dashboard
        const newLedConfiguration = {
          mode: "breathe",
          color: "green",
          intensity: 50,
          delay: 1000,
        }
        await device.led.write(newLedConfiguration);
        readAlarm(device);


        const newSoundConfiguration = {
          speakerMode: 3
        }
        const newSpeakerData = {
          mode: 3,
          sample: 5
        }
        // thera are 9 samples sounds (from 0 to 8)
        // 0: collect point 1 and 1: collect point 2, 
        // 2: explosion 1  and 3: explosion 2
        // 4: hit 
        // 5: pick up 01, // 6: pick up 02
        // 7: shoot 01, // 8: shoot 2

        await device.soundconfiguration.write(newSoundConfiguration);
        await device.speakerdata.write(newSpeakerData);


        var tbutton = document.querySelector(".td_btn");
        tbutton.style.setProperty('--td-lightcol', '#064');
        //tbutton.style.background = '#64';
        var tbutton_a = document.querySelector(".td_btn_a");
        //tbutton.style.color = '#64';
        tbutton.style.setProperty('--td-lightcol', '#064');
        TD.update({Alertbutton:1});
        //tbutton.setValue(1)

        // READ BATTERY OK
        var currentBatteryLevel = await device.battery.read();
        // console.log('battery: ' + currentBatteryLevel);
        thingyBattery.innerHTML = currentBatteryLevel.status;
        //console.log("TODO impostare battery gauge" + currentBatteryLevel.status);
        TD.update({battery:currentBatteryLevel.status});

        // MOTION sensor




        //function onRawData(raw_data) {







        // READ TEMPERATURE OK
        device.addEventListener("temperature", myLoggerTemperature);
        await device.temperature.start();


        // READ GRAVITY VECTOR OK
        device.addEventListener("gravityvector", myLoggerGravity);
        await device.gravityvector.start();

        // READ HUMIDITY
        device.addEventListener("humidity", myLoggerHumidity);
        await device.humidity.start();

        // READ PRESSURE
        device.addEventListener("pressure", myLoggerPressure);
        await device.pressure.start();

        // READ GAS
        device.addEventListener("gas", myLoggerGas);
        await device.gas.start();

        // READ HEADING
        device.addEventListener("heading", myLoggerHeading);
        await device.heading.start();

        // READ COLOR SENSOR
        device.addEventListener("color", myLoggerColor);
        await device.color.start();

        // READ LED CONFIGURATION OK
        //          const currentLedConfiguration = await device.led.read();
        //          console.log(currentLedConfiguration);

        // READ HUMIDITY
        //device.addEventListener("humidity", myLoggerHumidity);
        //await device.humidity.start();

        // READ RAW DATA  OK
        device.addEventListener("rawdata", myLoggerRawData);
        await device.rawdata.start();

        //    console.log('Raw data: Accelerometer: ' + device.rawdata.accX +' x ' +  device.rawdata.accY +' y ' + device.rawdata.accZ + ' z ');
        //  ta.formattedData.accelerometer.x, formattedData.accelerometer.y, formattedData.accelerometer.z);
        //  console.log('Raw data: Gyroscope: ' + device.rawdata.gyroX +' x ' +  device.rawdata.gyroY +' y ' + device.rawdata.gyroZ + ' z ');
        //console.log('Raw data: Gyroscope: x %d, y %d, z %d',
        //  ta.formattedData.gyroscope.x, formattedData.gyroscope.y, formattedData.gyroscope.z);
        //console.log('Unformatted Raw data: Compass: ' + device.rawdata.compassX +' x ' +  device.rawdata.compassY +' y ' + device.rawdata.compassZ + ' z ');
        //console.log('Raw data: Compass: x %d, y %d, z %d',
        //  ta.formattedData.compass.x, formattedData.compass.y, formattedData.compass.z);
        //}
        // READ GPS INFO FROM SCREEN AND UPDATE MAP


        // WRITE LED OK
        /*
        await device.led.write({
        mode: "breathe",
        color: "red",
        intensity: 50,
        delay: 1000,
      });
      */

      // TODO: automatic disconnect disabled for testing on the road
      // setTimeout(async () => {
      //   await device.disconnect();
      //   console.log("Disconnected from the device");
      // }, 120000);

    } catch (error) {
      console.error(error);
    }
  }


  async function changeLED(device, color="random") {
    //var color_array = ['green', 'yellow','orange','red','purple'];
    var color_array = ["red", "green", "yellow", "blue", "purple", "cyan", "white"]
    if (color == "random") {
      var led_color = color_array[Math.floor(Math.random()*color_array.length)];
      var led_mode="breathe"
      console.log('set RANDOM led color ' + led_color);
    }
    else {
      var led_color = color;
      var led_mode = "breathe"
      console.log('set led color ' + led_color);
    }

    const newAlertLedConfiguration = {
      mode: led_mode,
      color: led_color,
      intensity: 50,
      delay: 1000,
  }
    //console.log("CHANGE LED");
    await device.led.write(newAlertLedConfiguration);
    //TD.update({Connect: 0});
    const tbutton_a = document.querySelector(".td_btn_a");
    //tbutton.style.color = '#64';
    //tbutton_a.style.setProperty('--td-lightcol', '#064');
    tbutton_a.style.setProperty('background-color', led_color);
  }

  function changeAlarm(led_color) {
    const tbutton_a = document.querySelector(".td_btn_a");
    //tbutton.style.color = '#64';
    //tbutton_a.style.setProperty('--td-lightcol', '#064');
    tbutton_a.style.setProperty('background-color', led_color);
  }
  async function readAlarm(device) {
    console.log('read alarm function');
    const tbutton_a = document.querySelector(".td_btn_a");
    // var led_color = tbutton_a.style.background-color;
    const style = getComputedStyle(tbutton_a);
    const led_color = style.backgroundColor;
    console.log(led_color); // rgb(0, 0, 0)
    // console.log(led_color);
    const newAlertLedConfiguration = {
      mode: "breathe",
      color: led_color,
      intensity: 50,
      delay: 1000,
  }
    //console.log("CHANGE LED");
    await device.led.write(newAlertLedConfiguration);
  }

  async function OffPressed(device) {
    const turnLEDoff = {
      mode: "off"
    }

    await device.led.write(turnLEDoff);
    //    const tbutton_a = document.querySelector(".td_btn_a");
    console.log("Led off")
    //  TD.update({LEDoffbutton:1});

  }

  async function MakeSound(device) {
    console.log('make sound alarm');

    const newSoundConfiguration = {
          speakerMode: 3
        }
        const newSpeakerData = {
          mode: 3,
          sample: 0
        }

        await device.soundconfiguration.write(newSoundConfiguration);
        await device.speakerdata.write(newSpeakerData);
  }



  function stop(device) {
    device.disconnect();
    console.log("Disconnected from the device");
  }
  document.querySelector("#connectBtn").addEventListener("click", async () => {
    start(thingy);
    getLocation();
    TD.update({Connect: 1});
    TD.update({Gps: 1});
    startLocation();
  });
  document.querySelector("#gpsBtn").addEventListener("click", async () => {
    // start(thingy);
    getLocation();
    // TD.update({Connect: 1});
    TD.update({Gps: 1});
    startLocation();
  });
  document.querySelector("#disconnectBtn").addEventListener("click", async () => {
    stop(thingy);
    stopLocation();
    TD.update({Connect: 0});
    TD.update({Gps: 0});
  });
  document.querySelector("#changeLED").addEventListener("click", async () => {
    try {
    await changeLED(thingy);
    } catch {
    console.log("Could not changeLED");
    changeAlarm();
    }
  });
  document.querySelector("#changeLEDYellow").addEventListener("click", async () => {
    try {
      await changeLED(thingy, "yellow");
    } catch {
    console.log("Could not changeLED");
    changeAlarm("yellow");
    }
  });
  document.querySelector("#changeLEDRed").addEventListener("click", async () => {
    try {
      await changeLED(thingy, "red");
    } catch {
    console.log("Could not changeLED");
    changeAlarm("red");
    }
  });
  document.querySelector("#changeLEDGreen").addEventListener("click", async () => {
    try {
      await changeLED(thingy, "green");
    } catch {
    console.log("Could not changeLED")
    changeAlarm("green");
    }
  });
  document.querySelector("#changeLEDPurple").addEventListener("click", async () => {
    try {
      await changeLED(thingy, "purple");
    } catch {
    console.log("Could not changeLED");
    changeAlarm("purple");
    }
  });
  document.querySelector("#changeLEDBlue").addEventListener("click", async () => {
    try {
      await changeLED(thingy, "blue");
    } catch {
    console.log("Could not changeLED");
    changeAlarm("blue");
    }
  });

  document.querySelector("#OffPressed").addEventListener("click", async () => {
    await OffPressed(thingy);
  });
  document.querySelector("#MakeSound").addEventListener("click", async () => {
    await MakeSound(thingy);
  });
  document.querySelector("#MakeTestSound").addEventListener("click", async () => {
    await MakeSound(thingy);
  });
  document.querySelector("#sendPost").addEventListener("click", async () => {
    //sendTimedPost();
    TD.update({sendData: 1});
  });
  document.querySelector("#clearPost").addEventListener("click", async () => {
    //clearTimedPost();
    TD.update({sendData: 0});
  });