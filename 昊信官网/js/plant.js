// 加载头部
// $(function () {
//   $('#header').load('../html/header.html');
// })
// // 加载尾部
// $(function () {
//   $('#footer').load('../html/footer.html');
// })
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
    var li = "<a href = './propertyID.html'><li><div><img src = " +
      value.img + "><img src = " + value.img2 + "><span>" + value.imgSpan + "</span></div><div><h3>" +
      value.h3 + "</h3><p>" + value.p1 +
      "</p><p>" + value.p2 + "</p><p><span>" +
      value.p3span1 + "</span><span>" + value.p3span2 +
      "</span><span>" + value.p3span3 + "</span></p></div></li></a>";
    // var a = "<a href = './propertyID.html'><a>";
    $(".estate ul").append(li);
  });
}
eash(List);
// 点击加载更多仓库
$(".estateButton").click(function () {
  console.log($(".estate ul").children("li").length)
  if ($(".estate ul").children("a").length > 6) {
    $(".estateButton").html("已经没有数据了");
  } else {
    eash(List);
  }
});
//   <!-- 区镇,面积，排序,筛选 -->的点击
$(".select>ul>li").click(function () {
  if ($(".shade").hasClass("shadeBlock")) {
    $(".shade").removeClass("shadeBlock");
  }
  // 获取tab ID
  var itemId = Number($(this)[0].className.substr($(this)[0].className.length - 1, 1) - 1);
  if ($(".select .selectDiv .div1").eq(itemId).hasClass("div")) {
    $(".select .selectDiv .div1").eq(itemId).removeClass("div");
    $(".shade").addClass("shadeBlock");
  } else {
    $(".select .selectDiv .div1").eq(itemId).addClass("div").siblings().removeClass("div");
  }
  //img图片的判断
  if ($(this).find(".img01").hasClass("selectNone")) {
    $(this).find(".img01").removeClass("selectNone");
    $(".select ul li span").removeClass("cityColor");
    $(this).find(".img02").addClass("selectNone");
  } else {
    if ($(".select ul li").find(".img01").hasClass("selectNone")) {
      // if ($(this).find("img")[1]) {
      $(".select ul li").find(".img01").removeClass("selectNone");
      $(".select ul li").find(".img02").addClass("selectNone");
      // }
    }
    if (!$(".select ul li").hasClass(".img01")) {
      $(this).find(".img01").addClass("selectNone");
      $(this).find(".img02").removeClass("selectNone");
    }
  }
});
$(".confirm #button").click(function (event) {
  $(".shade").addClass("shadeBlock");
  $(".select .selectDiv .div1").removeClass("div");
  $(".select ul li span").removeClass("cityColor");
  $(".select ul li").find(".img01").removeClass("selectNone");
  $(".select ul li").find(".img02").addClass("selectNone");
})
$(".img").click(function () {

})
//区镇的显示
$(".select div ul li").click(function () {
  var itemId = Number($(this)[0].className.substr($(this)[0].className.length - 1, 1) - 1);
  console.log(itemId)
  if (itemId == -1) {
    return;
  }
  $(this).addClass("cityColor").siblings().removeClass("cityColor");
  $(".selectCity ul li").eq(itemId).removeClass("selectCityLi").siblings().addClass("selectCityLi");
});
// 监听滚动事件
$(".selectCity").mousedown(function () {
  $(document).scroll(function () {
    var scroH = $(document).scrollTop();
    console.log(scroH)
  })
})
// 给字加样式
$(".select ul li span").click(function () {
  $(".select ul li span").removeClass("cityColor");
  $(this).addClass("cityColor");
});