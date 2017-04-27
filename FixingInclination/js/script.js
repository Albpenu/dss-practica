class FixingInclination {
  constructor(props) {
    this.props = props

    this.magnetometer = document.getElementById("Magnetometer");
    this.currentTime = document.getElementById("CurrentTime");
    this.together = document.getElementById("Together");

    var video = $('<video />', {
        id: 'video',
        width: '100%',
        src: props.video,
        type: 'video/mp4',
        controls: true,
        autoplay: true,
        loop: props.infiniteAttempts
    });

    video.fadeIn(1000, function(){
    });
    video.appendTo($('#FixingInclination'));

    this.video = document.getElementById("video");

    if(window.DeviceOrientationEvent){
      window.addEventListener("deviceorientation", this.orientationChecking.bind(this), false);
    }

    this.hits = 0;

  }

  orientationChecking(event) {
    this.magnetometer.innerHTML = event.gamma;
    var together = Math.abs(Math.floor(this.props.inclination[Math.floor(this.video.currentTime)] + event.gamma));
    if(together <= this.props.errorRange){
      this.together.innerHTML = ++this.hits;
    }
  }

  getName() {
    return this.props.video
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
