<script type="text/javascript">
  // 定义一些公共的属性和方法
  const httpUrl = 'https://www.quatechschool.com:8080/kksy';
  const httpImg = './static/img/';
  const defaultImg = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554813909866&di=e6375af7158c11da47fd012710431d66&imgtype=0&src=http%3A%2F%2Fs1.sinaimg.cn%2Fmw690%2F006IXq7Gzy7aCjWCS1Dcd';
  const defaultUser = './static/img/defaultUser.png';
  const defaultBackground = './static/img/bg_space_1.png';

  /**
   * 用于判断空，Undefined String Array Object
   */
  function isBlank(str) {
    if (Object.prototype.toString.call(str) === '[object Undefined]') {//空
        return true
    } else if (
        Object.prototype.toString.call(str) === '[object String]' ||
        Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
        return str.length == 0 ? true : false
    } else if (Object.prototype.toString.call(str) === '[object Object]') {
        return JSON.stringify(str) == '{}' ? true : false
    } else {
        return true
    }
  }


  // 暴露出这些属性和方法
  export default {
    httpUrl,
    httpImg,
    defaultImg,
    defaultUser,
    defaultBackground,
    isBlank,

  }
</script>


