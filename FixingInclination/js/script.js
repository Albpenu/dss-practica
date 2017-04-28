
class FixingInclination {
  constructor(props) {
    this.props = props;
    this.magnetometer = document.getElementById("Magnetometer");
    this.fixing = document.getElementById("fixing");

    this.hits = 0;


    this.renderVideo = this.renderVideo.bind(this);
    this.detectOrientation = this.detectOrientation.bind(this);
  }


  start() {
    this.renderVideo();           // create a video according to props.video
    this.detectOrientation();     // add device orientation listener

  }

  renderVideo() {
    var video = document.createElement("video");
        video.src = this.props.video.src;
        video.type = this.props.video.format;
        video.autoplay  = this.props.video.autoplay;
        video.controls = this.props.video.controls;
        video.loop = this.props.video.loops;
    this.fixing.appendChild(video);
  }


  detectOrientation(){
    if(window.DeviceOrientationEvent, function(event){
      window.addEventListener("deviceorientation", orientationChecking.bind(this), false);
      console.log(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
    });
}


  orientationChecking(event) {
    this.magnetometer.innerHTML = event.gamma;
  }

}


  

/*var video = document.querySelector('video');

    video.addEventListener('timeupdate', function() {
      // don't have set the startTime yet? set it to our currentTime
      if (!this._startTime) this._startTime = this.currentTime;

      var playedTime = this.currentTime - this._startTime;

      if (playedTime <= 4) this.pause();
    });

    video.addEventListener('seeking', function() {
      // reset the timeStart
      this._startTime = undefined;
    });
*/
