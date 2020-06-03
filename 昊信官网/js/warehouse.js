// 加载头部
$(function () {
  $('#header').load('../html/header.html');
})
// 加载尾部
$(function () {
  $('#footer').load('../html/footer.html');
})
// 立即执行渲染地产数据
//  遍历添加地产数据
var List = [{
  img: "../img/header/home_list_image.png",
  img2: "../img/header/home_list_tag.png",
  imgSpan: "番禺",
  h3: "急租!南沙22000方笋厂房出租， 证照齐全，超大空地，独门独院",
  p1: "标准厂房 / 22000㎡ / XX工业园",
  p2: "面议",
  p3span1: "独门独院",
  p3span2: "超大空地",
  p3span3: "证件齐全"
}, {
  img: "../img/header/home_list_image.png",
  img2: "../img/header/home_list_tag.png",
  imgSpan: "番禺",
  h3: "急租!南沙22000方笋厂房出租， 证照齐全，超大空地，独门独院",
  p1: "标准厂房 / 22000㎡ / XX工业园",
  p2: "面议",
  p3span1: "独门独院",
  p3span2: "超大空地",
  p3span3: "证件齐全"
}, {
  img: "../img/header/home_list_image.png",
  img2: "../img/header/home_list_tag.png",
  imgSpan: "番禺",
  h3: "急租!南沙22000方笋厂房出租， 证照齐全，超大空地，独门独院",
  p1: "标准厂房 / 22000㎡ / XX工业园",
  p2: "面议",
  p3span1: "独门独院",
  p3span2: "超大空地",
  p3span3: "证件齐全"
}];

function eash(data) {
  $.each(data, function (key, value) {
    var li = "<li><div><img src = " +
      value.img + "><img src = " + value.img2 + "><span>" + value.imgSpan + "</span></div><div><h3>" +
      value.h3 + "</h3><p>" + value.p1 +
      "</p><p>" + value.p2 + "</p><p><span>" +
      value.p3span1 + "</span><span>" + value.p3span2 +
      "</span><span>" + value.p3span3 + "</span></p></div></li>";
    $(".estate ul").append(li);
  });
}
eash(List);
// 点击加载更多仓库
// $(".estateButton").click(function () {
//   console.log($(".estate ul").children("li").length)
//   if($(".estate ul").children("li").length>6){
//     $(".estateButton").html("已经没有数据了");
//   }else{
//     eash(List);
//   }
// });
//   <!-- 区镇,面积，排序,筛选 -->的点击
var selectOne = true;
var selectTwo = true;
var selectThree = true;
$(".select ul li img").click(function () {
  //  $(this).removeClass('selectNone') 
  $(this).addClass("selectNone").siblings().removeClass("selectNone");
});