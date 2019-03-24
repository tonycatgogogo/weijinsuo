$(function ($) {
  banner()
});
var banner = function () {
  /*1.获取轮播图数据    ajax */
  /*2.根据数据动态渲染  根据当前设备  屏幕宽度判断 */
  /*2.1 准备数据*/
  /*2.2 把数据转换成html格式的字符串 （动态创建元素，字符串拼接，模版引擎【artTemplate】*/
  /*2.3 把字符渲染页面当中*/
  /*3.测试功能 页面尺寸发生改变重新渲染*/
  /*4.移动端手势切换  touch*/
  var getData = function (callback) {
    if (window.data) {
      callback && callback(window.data)
    } else {
      $.ajax({
        type: 'get',
        url: 'js/data.json',
        dataType: 'json',
        data: '',
        success: function (data) {
          window.data = data;
          callback && callback(window.data);
        }
      });
    }
  };
  var render = function () {
    getData(function (data) {
      var isMobile = $(window).width() < 768 ? true : false;
      var pointHtml = template('pointTemplate', {list: data});
      var imageHtml = template('imageTemplate', {list: data, isMobile: isMobile});
      $('.carousel-indicators').html(pointHtml);
      $('.carousel-inner').html(imageHtml);
    })
  };
  // 3.当改变屏幕尺寸时监听
  $(window).on('resize', function () {
    render();
  }).trigger('resize');
  // 4.为轮播图添加滑动事件
  var startX = 0;
  var isMove = false;
  var distanceX = 0;
  $('.wjs_banner').on('touchstart', function (e) {
    startX = e.originalEvent.touches[0].clientX;
  }).on('touchmove', function (e) {
    var moveX = e.originalEvent.touches[0].clientX;
    distanceX = moveX - startX;
    isMove = true;
  }).on('touchend', function (e) {
    /*距离足够 50px 一定要滑动过*/
    if(isMove && Math.abs(distanceX) > 50) {
      if(distanceX > 0) {
        $('.carousel').carousel('prev')
      }else{
        $('.carousel').carousel('next')
      }
    }
  });
  startX = 0;
  isMove = false;
  distanceX = 0;
};
