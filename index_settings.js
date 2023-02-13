// settings 
    var timedPost;
    // how many milliseconds do we want to scheduled the standard tracking (not the pothole findings):
    // it could be: 200 milliseconds for pothole findings
    var scheduledTimedPostTime=200;
    // it could be: 30000 milliseconds for standard slow tracking
    // var scheduledTimedPostTime=30000;

    var checkPot;
    var PotBurst;
    // var RestApiUrl;
    var DbBaseUrl;
    var NodeBaseUrl;

    function isLocalHost(url) {
      return url.indexOf('localhost') !== -1 || url.indexOf('127.0.0.1') !== -1;
    }

    if (isLocalHost(window.location.href)) {
      DbBaseUrl = 'http://localhost:3002/';
      NodeBaseUrl = 'http://localhost:3002/';
    } else {
      DbBaseUrl = 'https://iot-t52.duckdns.org:3002/';
      NodeBaseUrl = 'https://iot-t52.duckdns.org:3002/';
    }
    // console.log(isLocalHost(window.location.href));