

/**
 * 判断当前设备
 * @returns
 */
function currDevice(){
  //设备信息
var u = navigator.userAgent;

  // appVersion 可返回浏览器的平台和版本信息。该属性是一个只读的字符串。
var app = navigator.appVersion;

  //获取浏览器语言
var browserLang = (navigator.browserLanguage || navigator.language).toLowerCase();	

var deviceBrowser = function(){
  return{
    trident: u.includes('Trident') ,  //IE内核
    presto: u.includes('Presto') ,  //opera内核
    webKit: u.includes('AppleWebKit') ,  //苹果、谷歌内核
    gecko: u.includes('Gecko')  && !u.includes('KHTML'),  //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/),  //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.Mac OS X/),  //ios终端
    android: u.includes('Android') || u.includes('Linux'),  //android终端或者uc浏览器
    iPhone: u.includes('iPhone'),  //是否为iPhone或者QQHD浏览器
    iPad: u.includes('iPad'),  //是否iPad
    webApp: !u.includes('Safari'),  //是否web应用程序，没有头部和底部
    weixin: u.includes('MicroMessenger'),  //是否微信
    qq: u.match(/\sQQ/i) == " qq",  //是否QQ
  }
}();

  
  var Device_Data = {"Device":u,
  "app":app,
  "deviceBrowser":deviceBrowser
}
// console.log(Device_Data);
  return Device_Data;

}
/**
* 获取设备、浏览器的宽度和高度
* @returns
*/
function deviceBrowserWH(){
//获取浏览器窗口的内部宽高 - IE9+、chrome、firefox、Opera、Safari：
var w = window.innerWidth;
var h = window.innerHeight;

// HTML文档所在窗口的当前宽高 - IE8.7.6.5
document.documentElement.clientWidth;
document.documentElement.clientHeight;
document.body.clientWidth;
document.body.clientHeight;

var screenW = window.screen.width;//设备的宽度
var screenH = document.body.clientHeight;

//网页可见区域宽高，不包括工具栏和滚动条（浏览器窗口可视区域大小）
var webpageVisibleW = document.documentElement.clientWidth || document.body.clientWidth;
var webpageVisibleH = document.documentElement.clientHeight || document.body.clientHeight;

//网页正文全文宽高(不包括滚动条)
var webpageW = document.documentElement.scrollWidth || document.body.scrollWidth;
var webpageH = document.documentElement.scrollHeight || document.body.scrollHeight;

//网页可见区域宽高，包括滚动条等边线（会随窗口的显示大小改变）
var webpageVisibleW2 = document.documentElement.offsetWidth || document.body.offsetWidth ;
var webpageVisibleH2 = document.documentElement.offsetHeight || document.body.offsetHeight ;

console.log(w+'*'+h);
console.log(screenW+'*'+screenH);
console.log(webpageVisibleW+'*'+webpageVisibleH);
console.log(webpageW+'*'+webpageH);
console.log(webpageVisibleW2+'*'+webpageVisibleH2);
//网页卷去的距离与偏移量
/*
1.scrollLeft:设置或获取位于给定对象左边界与窗口中目前可见内容的最左端之间的距离；
2.scrollTop:设置或获取位于给定对象最顶端与窗口中目前可见内容的最左端之间的距离；
3.offsetLeft:设置或获取位于给定对象相对于版面或由offsetParent属性指定的父坐标的计算左侧位置；
4.offsetTop:设置或获取位于给定对象相对于版面或由offsetParent属性指定的父坐标的计算顶端位置；
*/

}
var Device_ = currDevice();
  if(Device_.deviceBrowser.mobile==true){
      window.location.href="http://127.0.0.1:8081/MessageBox.html";
  }
$("#icon-play").on("click","",function(){
  $("#icon-pause").css("color","#eea95a");
  // $("#icon-link").css("color","#ce819b");
  // $("#icon-prev").css("color","#ce819b");
  // $("#icon-next").css("color","#ce819b");
});

$("#icon-pause").on("click","",function(){
  $("#icon-play").css("color","#697ea3");
  // $("#icon-link").css("color","#acb8cc");
  // $("#icon-prev").css("color","#acb8cc");
  // $("#icon-next").css("color","#acb8cc");

});


new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "风的小径",
          artist: "万能日记",
          cover: "//p1.music.126.net/Z47IFngOl_t1pVCh1PHL_w==/109951165050432631.jpg?param=130y130",
          source: "http://music.163.com/song/media/outer/url?id=1399286389.mp3",
          // url: "https://www.17sucai.com",
          favorited: false
        },
        {
          name: "秒 · 流云",
          artist: "八云轨",
          cover: "//p2.music.126.net/uciXCJdhCk3OnjBia4nQrA==/109951164639730482.jpg?param=130y130",
          source: "http://music.163.com/song/media/outer/url?id=1455273374.mp3",
          // url: "https://www.17sucai.com",
          favorited: false
        },
        {
          name: "Ordinary Day",
          artist: "Melanie Penn",
          cover: "//p2.music.126.net/X023gEyekdsS9_NZ0Nz_6g==/1656964023064581.jpg?param=130y130",
          source: "http://music.163.com/song/media/outer/url?id=3157058.mp3",
          // url: "https://www.17sucai.com",
          favorited: true
        },
        {
          name: "生命诗（A Psalm of Life）",
          artist: "果果 / DJdora / Joanne",
          cover: "//p1.music.126.net/5N7S5vExa4VjgCZzGSnwjg==/109951163923195429.jpg?param=130y130",
          source: "http://music.163.com/song/media/outer/url?id=1351721458.mp3",
          // url: "https://www.17sucai.com",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});

