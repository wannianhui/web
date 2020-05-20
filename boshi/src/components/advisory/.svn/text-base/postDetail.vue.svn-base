<template>
  <div class="postBox">
    <div class="floatTop">
      <div class="jinhua" v-if="topicData.elite_post === 1"></div>
      <div class="guanfan" v-if="topicData.elite_post_sort === 1"></div>
    </div>
    <!-- 帖子标题部分 -->
    <div class="title">
      <p><span>{{topicData.title}}</span><span v-show="topicData.state==1">【{{topicData.price}}乐豆】</span></p>
      <ul>
        <li v-if="!isLandlord" @click="status('landlord')">只看楼主</li>
        <li v-else @click="status('landlord')">取消只看楼主</li>
        <li v-if="topicData.isTopicCollect == 1" @click="status('collect')">已收藏</li>
        <li v-else @click="status('collect')">收藏</li>
        <li @click="goBottom()">回复</li>
        <li @click="reportTopicBtn('reportTopic', topicData.content)" v-if="userId !== tieUserid">举报</li>
      </ul>
    </div>

    <!-- 帖子详细部分 -->
    <ul>
      <!-- 楼主 -->
      <li v-show="pageNumber == 1">
        <div class="left">
          <router-link :to="{ path: 'mineOthers', query: { byUserId: topicData.user_id }}">
            <img :src="topicData.user.head == null ? morenHead : apiImg + topicData.user.head" alt="">
          </router-link>
          <router-link :to="{ path: 'mineOthers', query: { byUserId: topicData.user_id }}">
            <h3>{{topicData.user.name || topicData.user.nick}}</h3>
          </router-link>
          <h4 title="经验值xxx，点击进入等级说明页" @click="jump(8)">等级：K2</h4>
          <ul>
            <li v-if="topicData.user.is_v_i_p_member == 1">
              <img src="../../../static/img/icon_man_aut_gray1.png"
                   alt="会员VIP"
                   title="会员VIP"
                   @click="jump({index:9,type:'vip'})">
            </li>
            <li v-if="topicData.user.is_official_certification_specialist == 1">
              <img src="../../../static/img/icon_man_aut_gray2.png"
                   alt="官方认证人员"
                   title="官方认证人员"
                   @click="jump({index:9,type:'official'})">
            </li>
            <li v-if="topicData.user.is_relevant_product_specialist == 1">
              <img src="../../../static/img/icon_man_aut_gray3.png"
                   alt="产品专员"
                   title="产品专员"
                   @click="jump({index:9,type:'product'})">
            </li>
          </ul>
          <img src="../../../static/img/pic_writer.png" alt="">
        </div>
        <div class="right">

          <div class="content" v-html="topicData.content">

          </div>
          <div class="other">
            <div class="like">
              <span class="button" @click="praiseBtn()">{{topicData.praise}}</span>
            </div>
            <p class="share">
              <span>分享到：</span>
              <img src="../../../static/img/icon_blog.png" alt=""
                   @click="share({title:topicData.title,type:'sina',image:apiImg+topicData.image1})">
              <img src="../../../static/img/icon_space.png" alt=""
                   @click="share({title:topicData.title,type:'qqZone',image:apiImg+topicData.image1,remark:topicData.content})">
            </p>
            <div class="features">
              <p>
                <span>1楼</span>
                <span>{{topicData.create_time}}</span>
              </p>
              <ul>
                <!-- <li @click="popUps('delete')">删除</li> -->
                <li class="showBlack" style="color: #333333;" @click="goBottom()">回复</li>
              </ul>
            </div>
          </div>
        </div>
      </li>

      <!-- 楼层 -->
      <li v-for="(item, index) in topicReplyData" :key="index">
        <!-- 楼层左侧信息框 -->
        <div class="left">
          <router-link :to="{ path: 'mineOthers', query: { byUserId: item.user_id }}">
            <img :src="item.head == null ? morenHead : apiImg + item.head" alt="">
          </router-link>
          <router-link :to="{ path: 'mineOthers', query: { byUserId: item.user_id }}">
            <h3>{{item.nick}}</h3>
          </router-link>
          <h4 title="经验值xxx，点击进入等级说明页" @click="jump({index:8})">等级：K2</h4>
          <ul>
            <li v-if="item.is_v_i_p_member != 0">
              <img src="../../../static/img/icon_man_aut_gray1.png"
                   alt="会员VIP"
                   title="会员VIP"
                   @click="jump({index:9,type:'vip'})">
            </li>
            <li v-if="item.is_official_certification_specialist != 0">
              <img src="../../../static/img/icon_man_aut_gray2.png"
                   alt="官方认证人员"
                   title="官方认证人员"
                   @click="jump({index:9,type:'official'})">
            </li>
            <li v-if="item.is_relevant_product_specialist != 0">
              <img src="../../../static/img/icon_man_aut_gray3.png"
                   alt="产品专员"
                   title="产品专员"
                   @click="jump({index:9,type:'product'})"></li>
          </ul>
        </div>
        <!-- 楼层右侧内容框 -->
        <div class="right">
          <!-- 跟帖内容 -->
          <div class="contentTwo" v-html="item.remark">

          </div>
          <div class="other">
            <!-- 跟帖操作区 -->
            <div class="features">
              <p>
                <span>{{pageNumber == 1 ? index + 2 : 10 * (pageNumber - 1) + 2 + index}}楼</span>
                <span>{{item.create_time}}</span>
              </p>
              <ul>
                <li v-if="userId == item.user_id" @click="deleteTopicBtn('deleteTopic', item.id)">删除</li>
                <li @click="replyBanned(item.user_id)"
                    v-show="topicData.user_id == userId && !isBanned && item.user_id != userId">禁言
                </li>
                <li @click="replyBanned(item.user_id)" v-show="topicData.user_id == userId && isBanned" class="showBlack">已禁言</li>
                <li v-if="userId !== item.user_id"
                    @click="reportCircleBtn('reportCircle', item.remark, item.id, item.nick)">举报
                </li>
                <li class="showBlack" @click="showReply(index)" v-show="!item.showReplyList"
                    style="color:#333333;margin-right:0;">收起回复
                </li>
                <li class="showBlack" @click="showReply(index)" v-show="item.showReplyList" style="color:#333333;">
                  回复{{item.pageCommentsLowerLevel.list.length == 0 ? '' : '(' + item.pageCommentsLowerLevel.list.length
                  + ')'}}
                </li>
              </ul>
            </div>

            <!-- 回复列表 -->
            <div class="replyList" v-show="!item.showReplyList">
              <ul>
                <li v-for="(replyItem, replyIndex) in item.pageCommentsLowerLevel.list" :key="replyIndex"
                    v-show="replyIndex < num">
                  <img :src="apiImg + replyItem.head" alt="">
                  <!-- 存在上级回复 -->
                  <div v-if="replyItem.reply_user_id">
                    <span class="name">
                      <router-link :to="{ path: 'mineOthers', query: { byUserId: replyItem.user_id }}">{{replyItem.nick}}</router-link></span>&nbsp;回复&nbsp;<span
                    class="name"><router-link
                    :to="{ path: 'mineOthers', query: { byUserId: replyItem.reply_user_id }}">{{replyItem.reply_nick}}</router-link></span>&nbsp;:&nbsp;<span
                    class="replyCon" v-html="emoji(replyItem.content)"></span>
                  </div>
                  <!-- 没有上级回复 -->
                  <div v-else>
                    <span class="name"><router-link :to="{ path: 'mineOthers', query: { byUserId: replyItem.user_id }}">{{replyItem.nick}}</router-link></span>&nbsp;:&nbsp;
                    <span class="replyCon" v-html="emoji(replyItem.content)"></span>
                  </div>
                  <ol>
                    <li class="button"
                        v-if="replyItem.reply_user_id == userId || replyItem.user_id == userId"
                        @click="deleteUserBtn('deleteUser', replyItem.circle_id, replyItem.id)">删除
                    </li>
                    <li class="button"
                        v-if="replyItem.reply_user_id != userId && replyItem.user_id != userId"
                        @click="reportUserBtn('reportUser',replyItem.content, replyItem.circle_id, replyItem.id, replyItem.nick)">
                      举报
                    </li>
                    <li>{{replyItem.create_time}}</li>
                    <li class="button" @click="replyUserBtn(replyItem)">回复</li>
                  </ol>
                </li>
                <!-- 超过5条 -->
                <!--<li v-show="floorShowMore">-->
                <!--<img :src="httpImg+'hotPost2.png'" alt="">-->
                <!--<div>-->
                <!--<span class="name"><a href="">天字一号菊花</a></span>&nbsp;:&nbsp;<span-->
                <!--class="replyCon">小孩子才做选择，我全都要！！</span>-->
                <!--</div>-->
                <!--<ol>-->
                <!--<li>举报</li>-->
                <!--<li>2018-12-27 14:20</li>-->
                <!--<li>回复</li>-->
                <!--</ol>-->
                <!--</li>-->
              </ul>
              <div class="more">
                <p v-show="item.pageCommentsLowerLevel.list.length > 10 && item.showMoreReply == false">
                  还有{{item.pageCommentsLowerLevel.list.length - 10}}条回复，<span @click="showMoreBtn(index)">点击查看</span></p>
                <button @click="replyFloorBtn()">我也说一句</button>
              </div>

              <!-- 回复帖子评论 -->
              <div class="replyFloor" v-show="replyFloorShow">
                <textarea v-model="replyFloorContent"></textarea>

                <p><img :src="httpImg+'icon_expression.png'" alt="" @click="showEmojiBox()">
                  <button @click="replyFloor(item.id)">发表</button>
                </p>
                <!-- emoji弹窗 -->
                <transition name="fade" mode="">
                  <div class="emoji-box" v-if="showEmoji">
                    <vue-emoji
                      @select="selectEmoji">
                    </vue-emoji>
                    <span class="pop-arrow arrow"></span>
                  </div>
                </transition>
              </div>

              <!-- 回复用户评价 -->
              <div class="replyFloor" v-show="replyFloorUserShow">
                <textarea v-model="replyFloorUserContent" :placeholder="replyFloorUserContentPlaceholder"></textarea>
                <p><img :src="httpImg + 'icon_expression.png'" alt="" @click="showEmojiBox()">
                  <button @click="replyUser()">发表</button>
                </p>
                <!-- emoji弹窗 -->
                <transition name="fade" mode="">
                  <div class="emoji-box" v-if="showEmoji">
                    <vue-emoji
                      @select="selectEmoji">
                    </vue-emoji>
                    <span class="pop-arrow arrow"></span>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <!-- 删除弹窗 -->
    <div class='deletePop ' v-show="showDeletePop">
      <div>
        <h3>提示<img :src="httpImg+'icon_cancle_card_black.png'" alt="" @click="showDeletePop = false"></h3>
        <p>确定删除评论？</p>
        <button @click="deleteType == 'deleteTopic' ? deleteTopic() : deleteUser()">确定</button>
      </div>
    </div>

    <!-- 举报弹窗 -->
    <div class='deletePop' v-show="showReportPop">
      <div class="report">
        <h3>举报<img :src="httpImg+'icon_cancle_card_black.png'" alt="" @click="showReportPop = false"></h3>
        <h4 v-if="(reportType == 'reportCircle') || (reportType == 'reportUser')">举报对象：<span>{{reportType == 'reportCircle' ? reportCircleObject.nick : reportUserObject.nick}}</span>
        </h4>
        <ul>
          <li v-for="(item, index) in reportlist" :key="index">
            <label>
              <input type="radio"
                     class="selAllType"
                     :value="item.value"
                     v-model="hobbies">
              <span>{{item.value}}</span>
            </label>
          </li>
        </ul>
        <button @click="reportTypeBtn()">确定</button>
      </div>
    </div>

    <!-- 分页器 -->
    <div class="pager">
      <v-pagination :total="total" :display="display" :current-page='current' @pagechange="pagechange"></v-pagination>
    </div>

    <!-- 底部回复帖子部分 -->
    <div class="replyPost">
      <div>
        <!-- 左侧 -->
        <div>
          <img :src="apiImg + userHead" alt="">
        </div>
        <!-- 右侧 -->
        <div>
          <!--<textarea v-model="replyTopicContent"></textarea>-->
          <Editor v-model="replyTopicContent"></Editor>
          <!--<VueEmoji :value="myEmoji" @input="emojiInput" class="textarea"></VueEmoji>-->
          <button @click="replyTopic()">发表回复</button>
        </div>
      </div>

      <h3>热帖推荐</h3>
      <!-- 热帖推荐 -->
      <ul>
        <li v-for="(item, index) in hotPost" v-if="index < 3">
          <div>
            <span class="listItem"
                  @click="toPostDetail({topicId: item.id, state: item.state, isOrderTopic: item.isOrderTopic})">
              <span>{{item.comment_number}}</span>
              <div class="postsSortTitle">
                <p>{{item.title}}</p>
                <ul>
                  <li class="ledou" v-if="item.state == 1"><img src="../../../static/img/icon_bean.png" alt=""><span>{{item.price}}</span>
                  </li>
                  <li v-if="item.top == 1"><span class="topping">置顶</span></li>
                  <li v-if="item.elite_post == 1"><span class="significant">精</span></li>
                  <li v-if="item.official_certification == 1"><span class="official">官</span></li>
                </ul>
              </div>
              <ul>
                <li>
                  <p>{{item.name}}</p>
                  <span>{{item.create_time}}</span>
                </li>
                <li>
                  <p>{{item.enduser ? item.enduser.nick : item.name}}</p>
                  <span>{{item.enduser ? item.enduser.create_time : item.create_time}}</span>
                </li>
              </ul>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import pagination from '@/common/pagination';
  import {mapState} from 'vuex';
  // import VueEmoji from 'emoji-vue'
  import vueEmoji from '../emoji.vue'
  import Editor from '../../common/Editor'
  import qs from 'qs'



  export default {
    data() {
      return {
        tieUserid: '',
        userId: '', //用户Id
        userHead: '', //用户头像
        total: 0, // 记录总条数
        display: 10, // 每页显示条数
        current: 1, // 当前的页数
        pageNumber: 1, //当前页数
        count: '', //传过去的页面数量
        topicId: '',//帖子id
        topicData: {
          user: {
            head: ''
          }
        },//帖子详情
        topicReplyData: '', //贴子评价详情
        titleCli: false,
        isLandlord: false, //是否只看楼主
        httpImg: this.global.httpImg, //全局的图片路径
        apiImg: this.$httpImg, //全局的图片路径
        morenHead: './static/img/userImg.png',//默认头像
        replyFloorShow: false, //回复的层数显示
        replyFloorContent: '', //回复楼层内容
        replyFloorUserShow: false, //回复下级用户显示
        replyFloorUserContent: '', //回复下级用户内容
        replyFloorUserContentPlaceholder: '', //回复下级用户默认显示内容
        replyFloorUserItem: { //回复下级用户获取对象
          circleId: '',
          byReplyUserId: '',
          parentId: ''
        },
        reportType: '', //举报类型
        reportTopicObject: { //举报帖子对象
          content: '',
          topicId: '',
        },
        reportCircleObject: { //举报跟帖获取对象
          content: '',
          circleId: '',
          nick: '',
        },
        reportUserObject: { //举报跟帖回复获取对象
          content: '',
          circleId: '',
          circleCommentId: '',
          nick: ''
        },
        deleteType: '', //删除类型
        deleteTopicObject: { //删除跟帖获取对象
          circleId: '',
        },
        deleteUserObject: { //删除跟帖回复获取对象
          circleId: '',
          circleCommentId: '',
        },
        isBanned: false, //是否禁言
        floorShowMore: 0, //层数展示更多,0显示查看更多，1显示分页器，2隐藏
        showDeletePop: false, //展示删除的框
        showReportPop: false, //展示举报的框
        hobbies: '', //返回选中的举报的数组
        //举报列表的数据
        reportlist: [
          {"id": 1, "value": "广告垃圾",},
          {"id": 2, "value": "色情低俗",},
          {"id": 3, "value": "恶意灌水",},
          {"id": 4, "value": "涉嫌赌博",},
          {"id": 3, "value": "重复发帖",},
          {"id": 4, "value": "人身攻击",},
          {"id": 3, "value": "内容令我反感",},
          {"id": 4, "value": "违法违规",},
        ],
        replyTopicContent: '', //回复帖子内容
        num: 10, //显示回复的条数
        hotPost: [], //热帖列表
        showEmoji: false, //显示emoji输入框
        value: '', //emoji内容
      }
    },

    mounted: function () {
      let that = this;
      that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"] || '';
      that.topicId = that.$route.query.topicId;
      // this.postsShow = this.latestRanking;
      console.log(that.userInfo, 405);
      that.userId = that.userInfo.id;
      //分页bug
      if(that.userHead){
        that.userHead = that.userInfo.userExtend.head;
      }
      // that.userHead = that.userInfo.userExtend.head;
      //请求贴子详情
      that.getTopicDetail();

      //请求贴子评价
      that.getCirclePage(that.pageNumber);

      //请求热帖推荐
      if (that.hotPostLbs.length === 0) {
        that.getHotPost();
      } else {
        that.hotPost = that.hotPostLbs;
        console.log(that.hotPost, 431)
      }

    },

    components: {
      'v-pagination': pagination,
      // VueEmoji
      vueEmoji,
      Editor,
    },
    computed: {
      ...mapState([
        "userInfo",
        "hotPostLbs"
      ]),
    },
    methods: {

      //分享
      share({
              type = '',
              title = '',
              image = '',
              remark = '',
              source = '',
            } = {}) {
        const that = this;
        const url = window.location.href;
        if (type == 'qqfriends') {
          source = '来源:' + source;
          let shareqqstring = `http://connect.qq.com/widget/shareqq/index.html?url=${url}&sharesource=qzone&title=${title}&pics=${image}&summary=${source}&desc=${remark}`;
          window.open(shareqqstring, 'newwindow', 'height=600,width=800,top=100,left=100');
        } else if (type == 'sina') {
          let shareSinaString = `http://service.weibo.com/share/share.php?url=${url}&sharesource=weibo&title=${title}&pic=${image}&appkey=2706825840`;
          window.open(shareSinaString, 'newwindow', 'height=600,width=800,top=100,left=100');
        } else if (type == 'qqZone') {
          let shareqqZone = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&sharesource=qzone&title=${title}&pics=${image}&summary=${remark}`;
          window.open(shareqqZone, 'newwindow', 'height=600,width=800,top=100,left=100');
        }
      },
      //获取热门帖子
      getHotPost() {
        const that = this;
        that.$http.get(that.$api + "/topic/listHot", {
          params: {
            sessionId: that.sessionId,
          }
        }).then((res) => {
          console.log('%c 首页热门帖子', 'color:green', res);
          let list = res.data.data;
          that.hotPost = list;
          that.$store.dispatch('hotPostLbs', list);
        }).catch(function (error) {
          that.$layer.msg(error)
        });
      },
      /*
      * 请求贴子详情
      * */
      getTopicDetail() {
        const that = this;
        this.$http.get(this.$api + "/topic/detail?sessionId=" + that.sessionId + "&topicId=" + that.topicId).then((res) => {
          console.log('%c 帖子详情', 'color:green', res.data.data);
          res.data.code === 1 ? that.topicData = res.data.data : console.log('网络错误，请重试');
          that.tieUserid = res.data.data.user_id;
        });
      },
      /*
      * 请求贴子评价
      * */
      getCirclePage(pageNumber) {
        const that = this;
        let isLandlord = that.isLandlord;
        let topicUserId = '';
        isLandlord ? topicUserId = that.topicData.user_id : '';
        if (isLandlord && that.sessionId == '') {
          this.$store.dispatch('sendTips', {
            isTip: true, content: '请先登录'
          });
          that.isLandlord = !isLandlord;
          return;
        }
        this.$http.get(this.$api
          + "/circle/page?sessionId=" + that.sessionId
          + "&topicId=" + that.topicId
          + "&topicUserId=" + topicUserId
          + '&pageNumber=' + pageNumber).then((res) => {
          console.log('%c 帖子评价', 'color:green', res);
          if (res.data.code === 1) {
            res.data.data.list.forEach(function (value) {
              value.showReplyList = false; //显示回复内容
              value.showMoreReply = false; //查看更多按钮
            });
            console.log(res.data.data.list, 461)
            that.topicReplyData = res.data.data.list;
            // that.tieUserid = that.topicReplyData[0].user_id;
            //更新分页器
            that.total = res.data.data.totalRow;
            that.display = res.data.data.pageSize;
          }
        })
      },

      /*
      * 分页事件
      * */
      pagechange: function (currentPage) {
        const that = this;
        // ajax请求, 向后台发送 currentPage, 来获取对应的数据
        that.pageNumber = currentPage;
        that.getCirclePage(currentPage);
      },
      /*
      * 贴子相关操作
      * */
      status(type) {
        const that = this;
        if (type == 'landlord') {
          this.isLandlord = !this.isLandlord;
          that.getCirclePage(that.pageNumber)
        }
        else if (type == 'collect') {
          //请求web接口 - 收藏帖子
          this.$http.get(this.$api + '/topic/saveCollect?sessionId=' + that.sessionId + '&topicId=' + that.topicId).then((res) => {
            console.log('%c 收藏帖子', 'color: blue', res);

            if (res.data.code === 1) {
              let isTopicCollect = that.topicData.isTopicCollect;
              isTopicCollect == 1 ? isTopicCollect = 0 : isTopicCollect = 1;
              that.topicData.isTopicCollect = isTopicCollect;
              that.$layer.msg(res.data.desc);
            }
          })
        }
      },
      /*  
      * 回复楼主
      * */
      replyTopic() {
        const that = this;
        let form = {
          sessionId: this.sessionId,
          topicId: this.topicId,
          content: this.replyTopicContent,
        }
        console.log(form)
        this.$http.post(this.$api + '/circle/save', qs.stringify(form) ).then((res) => {
          console.log('%c 评论贴子', 'color: green', res);
          console.log(res);
          if (res.data.code === 1) {
            that.$store.dispatch('sendTips', {isTip: true, content: '回复成功'});
            setTimeout(function () {
              that.replyTopicContent = ''; //初始化输入框内容
              that.getTopicDetail();
              that.getCirclePage(that.pageNumber);
            }, 1000);
          } else {
            that.$store.dispatch('sendTips', {isTip: true, content: res.data.desc});
          }
        })
      },
      /*
      * 回复帖子评论按钮
      * */
      showReply(index) {
        const that = this;
        //首先把所有的回复列表收回去
        for (let i = 0; i < that.topicReplyData.length; i++) {
          if (i === index) {
            continue;
          } else {
            that.topicReplyData[i].showReplyList = false;
          }
        }
        //再把相对应的列表展示出来
        that.topicReplyData[index].showReplyList = !that.topicReplyData[index].showReplyList;
        that.replyFloorContent = ''; //清空输入框内容
        // if (!that.replyFloorShow && that.topicReplyData[index].pageCommentsLowerLevel.list.length == 0) {
        //   that.replyFloorShow = !that.replyFloorShow;
        // }
        that.replyFloorShow = !that.replyFloorShow;
        if (that.replyFloorUserShow) {
          that.replyFloorUserShow = !that.replyFloorUserShow;
        }
        //this.showMoreBtn(2);
      },
      /*
      * 回复楼层跟帖按钮
      * */
      replyFloorBtn() {
        const that = this;
        that.replyFloorShow = !that.replyFloorShow;
        that.replyFloorUserContent = '';
        if (that.replyFloorUserShow) {
          that.replyFloorUserShow = !that.replyFloorUserShow;
        }
      },
      /*
      * 回复楼层跟帖
      * */
      replyFloor(circleId) {
        const that = this;
        that.replyFloorShow = !that.replyFloorShow;

        this.$http.get(this.$api + '/circle/comment/save?sessionId=' + this.sessionId + '&circleId=' + circleId + '&content=' + this.replyFloorContent).then((res) => {
          console.log('%c 评论楼层', 'color: green', res);

          if (res.data.code === 1) {
            that.$store.dispatch('sendTips', {isTip: true, content: '回复成功'});

            setTimeout(function () {
              that.replyFloorContent = ''; //初始化输入框内容
              that.getTopicDetail();
              that.getCirclePage(that.pageNumber);
            }, 1000);
          } else {
            that.$store.dispatch('sendTips', {isTip: true, content: res.data.desc});
          }
        })
      },
      /*
      * 回复跟帖用户按钮
      * */
      replyUserBtn(replyItem) {
        const that = this;
        if (!that.replyFloorUserShow) {
          that.replyFloorUserShow = !that.replyFloorUserShow;
        }
        if (that.replyFloorShow) {
          that.replyFloorShow = !that.replyFloorShow;
        }

        that.replyFloorUserItem = {
          circleId: replyItem.circle_id,
          byReplyUserId: replyItem.user_id,
          parentId: replyItem.parent_id == null ? replyItem.id : replyItem.parent_id
        };

        that.replyFloorUserContentPlaceholder = '回复' + replyItem.nick + '：';
      },
      /*
      * 回复跟帖用户
      * */
      replyUser() {
        const that = this;
        let replyUserId = that.userId; //回复评论用户Id
        let content = that.replyFloorUserContent; //评论内容
        let replyFloorUserItem = that.replyFloorUserItem; //评论需要的参数

        this.$http.get(that.$api
          + '/circle/comment/saveLevel?sessionId=' + that.sessionId
          + '&circleId=' + replyFloorUserItem.circleId
          + '&replyUserId=' + replyUserId
          + '&byReplyUserId=' + replyFloorUserItem.byReplyUserId
          + '&parentId=' + replyFloorUserItem.parentId +
          '&content=' + content).then((res) => {
          console.log('%c 回复跟帖用户', 'color: green', res);

          if (res.data.code === 1) {
            that.$store.dispatch('sendTips', {isTip: true, content: '回复成功'});

            setTimeout(function () {
              that.replyFloorUserContent = ''; //初始化输入框内容
              that.getTopicDetail();
              that.getCirclePage(that.pageNumber);
            }, 1000);
          }
        })
      },
      /*
      * 删除跟帖按钮
      * */
      deleteTopicBtn(type, circleId) {
        const that = this;

        that.deleteType = type;
        that.deleteTopicObject = {
          circleId: circleId
        };
        that.showDeletePop = !that.showDeletePop;
      },
      /*
      * 删除跟帖回复按钮
      * */
      deleteUserBtn(type, circleId, circleCommentId) {
        const that = this;

        that.deleteType = type;
        that.deleteUserObject = {
          circleId: circleId,
          circleCommentId: circleCommentId
        };
        that.showDeletePop = !that.showDeletePop;
      },
      /*
      * 删除跟帖
      * */
      deleteTopic() {
        const that = this;
        let deleteTopicObject = that.deleteTopicObject;

        this.$http.get(that.$api
          + '/circle/delete?sessionId=' + that.sessionId
          + '&circleId=' + deleteTopicObject.circleId).then((res) => {
          console.log('%c 删除跟帖', 'color: green', res);

          if (res.data.code === 1) {
            that.$store.dispatch('sendTips', {isTip: true, content: '删除成功'});

            that.getTopicDetail();
            that.getCirclePage(that.pageNumber);

            that.showDeletePop = !that.showDeletePop;
          }
        })
      },
      /*
      * 删除跟帖回复
      * */
      deleteUser() {
        const that = this;
        let deleteUserObject = that.deleteUserObject;

        this.$http.get(that.$api
          + '/circle/comment/delete?sessionId=' + that.sessionId
          + '&circleId=' + deleteUserObject.circleId
          + '&circleCommentId=' + deleteUserObject.circleCommentId).then((res) => {
          console.log('%c 删除跟帖回复', 'color: green', res);

          if (res.data.code === 1) {
            that.$store.dispatch('sendTips', {isTip: true, content: '删除成功'});

            that.getTopicDetail();
            that.getCirclePage(that.pageNumber);

            that.showDeletePop = !that.showDeletePop;
          }
        })
      },
      /*
      * 举报帖子类型
      * */
      reportTypeBtn() {
        const that = this;
        console.log(that.reportType,'reportType');
        
        let type = that.reportType;
        console.log(type,'type');
        
        if (type == 'reportTopic') {
          that.reportTopic();
        } else if (type == 'reportCircle') {
          that.reportCircle();
        } else {
          that.reportUser();
        }
      },
      /*
      * 举报帖子按钮
      * */
      reportTopicBtn(type, content) {
        const that = this;
        console.log('进入reportTopicBtn');
        
        that.reportType = type;

        that.showReportPop = !that.showReportPop;
        that.reportTopicObject = {
          content: content,
          topicId: that.topicId
        };
      },
      /*
      * 举报帖子
      * */ 
      reportTopic() {
        const that = this;
        let reportTopicObject = that.reportTopicObject;
        let title = that.hobbies;
        console.log(reportTopicObject.content,'reportTopicObject');
        console.log(title,'title');
        let obj = {
          sessionId:that.sessionId,
          topicId:reportTopicObject.topicId,   
          content:"举报",
          name:title
        }
        //请求web接口 - 举报帖子
        that.$http.post(that.$api+
          '/topic/saveReport',that.$qs.stringify(obj)).then((res) => {
          console.log('%c 举报帖子', 'color: green', res);

          if (res.data.code === 1) {
            that.$store.dispatch('sendTips', {isTip: true, content: '举报成功'});

            that.showReportPop = false;
          }
        })
      },
      /*
      * 举报跟帖按钮
      * */
      reportCircleBtn(type, content, circleId, nick) {
        const that = this;

        that.reportType = type;

        that.showReportPop = !that.showReportPop;
        that.reportCircleObject = {
          content: content,
          circleId: circleId,
          nick: nick
        }
      },
      /*
      * 举报跟帖
      * */
      reportCircle() {
        const that = this;
        let reportCircleObject = that.reportCircleObject;
        let title = that.hobbies;

        this.$http.get(that.$api
          + '/circle/saveReport?sessionId=' + that.sessionId
          + '&circleId=' + reportCircleObject.circleId
          + '&content=' + reportCircleObject.content
          + '&title=' + title).then((res) => {
          console.log('%c 举报跟帖', 'color: green', res);

          if (res.data.code === 1) {
            that.$store.dispatch('sendTips', {isTip: true, content: '举报成功'});

            that.showReportPop = false;
          }
        })
      },
      /*
      * 举报跟帖评价按钮
      * */
      reportUserBtn(type, content, circleId, circleCommentId, nick) {
        const that = this;

        that.reportType = type;

        that.showReportPop = !that.showReportPop;
        that.reportUserObject = {
          content: content,
          circleId: circleId,
          circleCommentId: circleCommentId,
          nick: nick
        }
      },
      /*
      * 举报跟帖评价
      * */
      reportUser() {
        const that = this;
        let reportUserObject = that.reportUserObject;
        let name = that.hobbies;

        this.$http.get(that.$api
          + '/circle/comment/saveReport?sessionId=' + that.sessionId
          + '&circleId=' + reportUserObject.circleId
          + '&circleCommentId=' + reportUserObject.circleCommentId
          + '&content=' + reportUserObject.content
          + '&name=' + name).then((res) => {
          console.log('%c 举报跟帖回复', 'color: green', res);

          if (res.data.code === 1) {
            that.$store.dispatch('sendTips', {isTip: true, content: '举报成功'});

            that.showReportPop = false;
          }
        })
      },
      /*
      * 禁言
      * */
      replyBanned(byUserId) {
        const that = this;

        this.$http.get(this.$api + '/topic/saveTopicForbidden?sessionId=' + this.sessionId + '&topicId=' + that.topicId + '&byUserId=' + byUserId).then((res) => {
          console.log('%c 禁言', 'color: green', res);

          if (res.data.code === 1) {
            that.$store.dispatch('sendTips', {isTip: true, content: res.data.desc});
            if (res.data.desc == '已禁用'){
              this.isBanned = true;
            } else {
              this.isBanned = false;
            }

            setTimeout(function () {
              that.replyFloorContent = ''; //初始化输入框内容
              that.getTopicDetail();
              that.getCirclePage(that.pageNumber);
            }, 1000);
          }
        })
      },
      /*
      * 查看更多按钮
      * */
      showMoreBtn(index) {
        const that = this;
        console.log(index);

        that.topicReplyData[index].showMoreReply = true;

        if (that.topicReplyData[index].showMoreReply) {
          that.num = that.topicReplyData[index].pageCommentsLowerLevel.list.length;
        } else {
          that.num = 10;
        }
        //this.getCirclePage(index);
        console.log(that.num);
      },
      /*
      * 跳转页面
      * */
      jump({index = '', type = '', id = ''} = {}) {
        this.$store.dispatch('reActive', index);
        this.searchDataShow = false;
        if (index == 9) {
          if (type == 'vip') {
            this.$router.push({
              path: 'userGroup',
              query: {isActive: 3},
            })
          }
          else if (type == 'official') {
            this.$router.push({
              path: 'userGroup',
              query: {isActive: 2},
            })
          }
          else if (type == 'product') {
            this.$router.push({
              path: 'userGroup',
              query: {isActive: 1},
            })
          }

        }
        else if (index == 4) {
          this.$router.push({
            path: 'collection',
          })
        }
        else if (index == 3) {
          this.$router.push({
            path: 'message',
          })
        }
        else if (index == 0) {
          this.$router.push({
            path: 'basicInfo',
          })
        }
        else if (index == 1) {
          this.$router.push({
            path: 'setting',
          })
        }
        else if (index == 8) {
          this.$router.push({
            path: 'integral',
            query: {isActive: 1},
          })
        }
        else if (type == 'recharge' && index == 6) {
          console.log("ok")
          this.$router.push({
            path: 'wealth',
            query: {isActive: 3},
          })
        }
        else if (index == 6) {
          this.$router.push({
            path: 'wealth',
          })
        }
        else if (type == 'forumCenter') {
          this.$router.push({
            path: 'forumCenter',
          })
        }
        else if (type == 'mineOthers') {
          this.$router.push({
            path: 'mineOthers',
            query: {byUserId: id},
          })
        }
      },
      /*
      * 点赞按钮
      * */
      praiseBtn() {
        const that = this;
        if (that.sessionId == '') {
          that.$store.dispatch('sendTips', {
            isTip: true, content: '请先登录'
          });
          return;
        }
        let praiseState = that.topicData.isTopicPraise; //获取点赞状态
        let state = praiseState == 0 ? state = 0 : state = 2; //点赞的状态
        let praise = that.topicData.praise; //点赞的数量
        console.log(praiseState, state, 907)
        that.$http.get(that.$api + '/topic/savePraise?sessionId=' + that.sessionId + '&topicId=' + that.topicId + '&state=' + state).then((res) => {
          console.log('%c 点赞贴子', 'color: green', res);
          // 0点赞 1踩 2取消
          praiseState == 1 ? praiseState = 0 : praiseState = 1;
          praiseState == 0 ? praise-- : praise++;
          that.topicData.isTopicPraise = praiseState;
          that.topicData.praise = praise;
          if (res.data.desc === "点赞成功") {
            that.$store.dispatch('sendTips', {isTip: true, content: res.data.desc});
          } else {
            that.$store.dispatch('sendTips', {isTip: true, content: "已取消点赞o(╥﹏╥)o"});
          }
        })
      },
      /*
      * 跳转到页面最底部
      * */
      goBottom() {
        window.scrollTo(0, document.documentElement.scrollHeight - document.documentElement.clientHeight);
      },
      /*
      * emoji输入事件
      * */
      showEmojiBox() {
        console.log(this.showEmoji);
        this.showEmoji = !this.showEmoji;
      },
      selectEmoji(code) {
        this.showEmoji = false;
        this.replyFloorContent += code;
      },
      /*
      * 跳转到帖子详情
      * */
      toPostDetail({
                     topicId = '',
                     state = '',
                     isOrderTopic = '',
                   } = {}) { //跳转到论坛详情
        console.log(topicId, state, isOrderTopic);
        const that = this;
        that.topicId = topicId;
        if (state == 0) { //免费
          let href = that.$router.resolve({
            path: 'postDetail',
            query: {topicId: topicId},
          });
          window.open(href.href, '_blank');
        } else { //收费
          if (isOrderTopic == 0) {
            that.isPayLd = true;
          } else {
            let href = that.$router.resolve({
              path: 'postDetail',
              query: {topicId: topicId},
            })
            window.open(href.href, '_blank');
          }
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";

  .deletePop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.1);
    & > div {
      width: 372px;
      height: 163px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 10px 40px 0px rgba(63, 63, 63, 0.71);
      box-sizing: border-box;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      font-family: MicrosoftYaHei-Bold;
      color: rgba(51, 51, 51, 1);
      & > h3 {
        height: 44px;
        line-height: 44px;
        background: rgba(242, 242, 242, 1);
        border-radius: 2px;
        position: relative;
        padding-left: 28px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        img {
          width: 16px;
          height: 16px;
          cursor: pointer;
          position: absolute;
          top: 15px;
          right: 20px;
        }
      }
      & > h4 {
        height: 41px;
        line-height: 41px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        padding-left: 28px;
        color: rgba(51, 51, 51, 1);
        border-bottom: 1px solid #EFF3F5;
        box-sizing: border-box;
        span {
          color: #E43D3D;
        }
      }
      & > ul {
        font-size: 0;
        padding: 24px 24px 20px 24px;
        li {
          font-size: 16px;
          @include ibMid();
          width: 50%;
          margin: 0 0 20px 0;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          &:nth-last-child(1) {
            margin-bottom: 0;
          }
          &:nth-last-child(2) {
            margin-bottom: 0;
          }
          input[type='radio'] {
            width: 16px;
            height: 16px;
            background: url("../../../static/img/icon_nochoice.png") no-repeat center;
            -webkit-appearance: none;
            outline: none;
          }
          input[type=radio]:checked {
            background: url("../../../static/img/icon_choice.png") no-repeat center;
            background-size: 100% 100%;

          }
          label {
            input {
              @include ibMid();
              margin-right: 6px;
              cursor: pointer;
            }
            span {
              @include ibMid();
              &:hover {
                color: #49BDFF;
              }
            }
          }
        }
      }
      & > p {
        margin: 30px 0 21px 28px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(228, 61, 61, 1);
      }

      & > button {
        border: none;
        outline: none;
        width: 72px;
        height: 30px;
        background: #E5E5E5;
        border-radius: 2px;
        color: white;
        cursor: pointer;
        display: block;
        float: right;
        margin-right: 20px;
        &:hover {
          background: #69C9FF;
        }
      }

    }
    .report {
      height: 330px;
    }
  }

  .postBox {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(45, 45, 45, 0.36);
    border-radius: 4px;
    margin-bottom: 60px;
    position: relative;
    .floatTop{
      position: absolute;
      top: 20px;
      left: 50%;
      width: 132px;
      height: 98px;
      .guanfan,
      .jinhua{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url("../../../static/img/icon_essence.png") no-repeat 100% 100%;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
      }
      .guanfan{
        background: url("../../../static/img/icon_official.png") no-repeat 100% 100%;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
      }
    }
    .title {
      height: 66px;
      line-height: 66px;
      font-size: 0;
      padding: 0 42px 0 58px;
      border-bottom: 1px solid #e0e0e0;
      box-sizing: border-box;
      p {
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        @include ibMid();
        span {
          &:nth-of-type(2) {
            font-size: 16px;
            font-family: MicrosoftYaHei-Bold;
            font-weight: bold;
            color: rgba(228, 61, 61, 1);
          }
        }
      }
      ul {
        font-size: 0;
        @include ibMid();
        float: right;
        li {
          @include ibMid();
          padding: 0 8px;
          height: 30px;
          line-height: 30px;
          box-sizing: border-box;
          background: rgba(55, 162, 241, 0);
          border: 1px solid rgba(202, 202, 202, 1);
          border-radius: 2px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(175, 175, 175, 1);
          cursor: pointer;
          margin-right: 16px;
          &:last-child {
            margin-right: 0;
          }
          &:hover {
            border: 1px solid rgba(73, 189, 255, 1);
            color: #49BDFF;
          }

        }
      }
    }
    & > ul {
      & > li {
        overflow: hidden;
        border-bottom: 1px solid #C0C0C0;
        box-sizing: border-box;
        &:last-child {
          border-bottom: 0;
          .replyList {
            margin: 0 auto 0 auto !important;
          }
        }
        .left {
          float: left;
          width: 244px;
          padding-bottom: 9000px;
          margin-bottom: -9000px;
          background: rgba(249, 249, 249, 1);
          text-align: center;
          position: relative;
          & > img {
            position: absolute;
            top: 0;
            right: 0;
          }
          & > a {
            img {
              margin-top: 43px;
              width: 110px;
              height: 110px;
              border: 1px solid rgba(219, 219, 219, 1);
              box-sizing: border-box;
              border-radius: 50%;
            }
          }
          h3 {
            font-size: 16px;
            font-family: MicrosoftYaHei-Bold;
            font-weight: bold;
            color: rgba(73, 189, 255, 1);
            margin: 10px 0 8px 0;
            cursor: pointer;
          }
          h4 {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(112, 112, 112, 1);
            margin-bottom: 8px;
            cursor: pointer;
          }
          ul {
            font-size: 0;
            margin-bottom: 40px;
            li {
              @include ibMid();
              margin-right: 5px;
              &:last-child {
                margin-right: 0;
              }
              img {
                width: 22px;
                height: 20px;
                cursor: pointer;
              }
            }
          }
        }
        .right {
          float: left;
          width: calc(100% - 244px);
          padding-bottom: 9000px;
          margin-bottom: -9000px;
          position: relative;
          // .reply {
          //   background:#EFF3F5;
          //   margin:13px 25px 0 25px;
          //   padding:13px 11px;
          //   &>p {
          //     font-size:15px;
          //     font-family:MicrosoftYaHei-Bold;
          //     font-weight:bold;
          //     color:rgba(51,51,51,1);
          //     span {
          //       color:#49BDFF;
          //       margin:0 6px 0 8px;
          //     }
          //   }
          //   &>div {
          //     margin-top:18px;
          //     colro:#8D8D8D;
          //   }
          // }
          .content {
            padding: 40px 24px 40px 24px;
          }
          .contentTwo {
            padding: 16px 24px 40px 24px;
            min-height: 220px;
            box-sizing: border-box;
          }
          .other {
            padding: 0 22px;
            .like {
              width: 56px;
              height: 52px;
              background-image: url('../../../static/img/icon_forum_fab.png');
              background-size: 100% 100%;
              margin: 0 auto 0 auto;
              position: relative;
              span {
                font-size: 15px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(244, 137, 99, 1);
                display: block;
                width: 30px;
                text-align: center;
                position: absolute;
                top: 62%;
                left: 40%;
                transform: translateY(-50%);
              }
            }
            .share {
              text-align: center;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(192, 192, 192, 1);
              font-size: 0;
              margin: 35px 0 0 0;
              padding-bottom: 24px;
              span, img {
                @include ibMid();
              }
              img {
                cursor: pointer;
              }
              span {
                font-size: 15px;
              }
              img:nth-of-type(1) {
                margin: 0 7px 0 11px;
              }
            }
            .features {
              padding: 13px 0 21px 0;
              border-top: 1px dashed #e0e0e0;
              p {
                float: left;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(165, 165, 165, 1);
                span:nth-of-type(2) {
                  margin: 0 18px 0 11px;
                }
              }
              ul {
                float: right;
                font-size: 0;
                li {
                  @include ibMid();
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #8D8D8D;
                  cursor: pointer;
                  margin-right: 25px;
                  &:last-child {
                    margin-right: 0;
                  }
                }
                .showBlack {
                  color: #333 !important;
                }
              }
              @include clearFloat();
            }
            .replyList {
              width: 900px;
              box-sizing: border-box;
              padding: 21px 22px 27px 14px;
              margin: 0 auto 20px auto;
              background: rgba(252, 252, 252, 1);
              border: 1px solid rgba(229, 229, 229, 1);
              & > ul {
                & > li {
                  margin-bottom: 10px;
                  font-size: 0;
                  &:last-child {
                    margin-bottom: 0;
                  }
                  & > img {
                    @include ibMid();
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 15px;
                  }
                  & > div {
                    width: 806px;
                    @include ibMid();
                    vertical-align: top;
                    font-size: 15px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                    .name {
                      a {
                        color: #49BDFF;
                      }
                    }
                    .replyCon {

                    }
                    & > div {

                    }
                  }
                  & > ol {
                    font-size: 0;
                    float: right;
                    margin-top: 5px;
                    li {
                      @include ibMid();
                      font-size: 12px;
                      font-family: MicrosoftYaHei;
                      font-weight: 400;
                      color: rgba(141, 141, 141, 1);
                      margin-right: 10px;
                      &:last-child {
                        margin-right: 0;
                      }
                    }
                  }
                  @include clearFloat();
                }
              }
              .more {
                margin: 10px 0 10px 0;
                p {
                  font-size: 13px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  float: left;
                  margin-top: 4px;
                  color: rgba(141, 141, 141, 1);
                  span {
                    margin-left: 4px;
                    color: #49BDFF;
                    cursor: pointer;
                  }
                }
                button {
                  border: none;
                  outline: none;
                  float: right;
                  width: 90px;
                  height: 26px;
                  cursor: pointer;
                  background: rgba(255, 255, 255, 1);
                  border: 1px solid rgba(229, 229, 229, 1);
                  border-radius: 2px;
                  &:hover {
                    border: 1px solid rgba(73, 189, 255, 1);
                    color: #49BDFF;
                  }
                }
                @include clearFloat();
              }
              .replyFloor {
                position: relative;
                textarea {
                  width: 100%;
                  border: none;
                  outline: none;
                  resize: none;
                  padding: 9px;
                  max-width: 100%;
                  box-sizing: border-box;
                  border: 1px solid rgba(229, 229, 229, 1);
                }
                & > p {
                  float: right;
                  font-size: 0;
                  margin-top: 10px;
                  img {
                    width: 16px;
                    height: 16px;
                    @include ibMid();
                    margin-right: 18px;
                    cursor: pointer;
                  }
                  button {
                    @include ibMid();
                    border: none;
                    outline: none;
                    width: 54px;
                    height: 26px;
                    background: rgba(73, 189, 255, 1);
                    border-radius: 2px;
                    font-size: 13px;
                    color: white;
                    cursor: pointer;
                    &:hover {
                      background: rgba(105, 201, 255, 1);
                    }
                  }
                }
                @include clearFloat();
              }
            }

          }

        }
      }
    }
    .pager {
      height: 80px;
      font-size: 14px;
      color: white;
      text-align: center;
      background: white;
      position: relative;
    }
    .replyPost {
      padding: 0 29px 0 29px;
      & > div {
        & > div:nth-of-type(1) {
          float: left;
          width: 215px;
          height: 203px;
          position: relative;
          & > img {
            float: left;
            width: 111px;
            height: 111px;
            border-radius: 50%;
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        & > div:nth-of-type(2) {
          float: right;
          width: 927px;
          & > textarea {
            width: 100%;
            border: none;
            outline: none;
            resize: none;
            border: 1px solid rgba(226, 226, 226, 1);
            box-sizing: border-box;
            padding: 10px;
            height: 150px;
          }
          & > button {
            border: none;
            outline: none;
            cursor: pointer;
            display: inline-blcok;
            margin-top: 80px;
            text-align: center;
            padding: 8px 14px;
            background: rgba(73, 189, 255, 1);
            border-radius: 2px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(254, 254, 254, 1);
            &:hover {
              background: #69C9FF;
            }
          }
        }
        @include clearFloat();
      }

      & > h3 {
        padding: 10px 0;
        border-bottom: 1px solid #ECF0F0;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }

      & > ul {
        background: white;
        padding-bottom: 26px;
        box-sizing: border-box;
        & > li {
          min-height: 56px;
          margin: 0;
          position: relative;
          box-sizing: border-box;
          padding: 0 21px 0 32px;
          &:hover {
            background: #f4f8f9;
          }
          & > div {
            height: 100%;
            border-bottom: 1px solid #EFF3F5;
            box-sizing: border-box;
            .listItem {
              display: block;
              height: 100%;
              font-size: 0;
              line-height: 56px;
              cursor: pointer;
              & > span {
                display: inline-block;
                width: 44px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                background: #EFF3F5;
                font-size: 12px;
                margin-right: 20px;
                @include ibMid();
                // @include posiVertical();
              }
              .postsSortTitle {
                p {
                  max-width: 450px;
                  font-size: 14px;
                  color: #333333;
                  @include sLineOF();
                  @include ibMid();
                }
                ul {
                  @include ibMid();
                  margin-left: 14px;
                  .ledou {
                    font-size: 0;
                    img {
                      @include ibMid();
                      margin-right: 4px;
                    }
                    span {
                      @include ibMid();
                      font-size: 14px;
                      color: #E43D3D;
                    }
                  }
                  li {
                    float: left;
                    margin-right: 6px;
                    font-size: 12px;
                    @include clearFloat();
                    &:last-child {
                      margin-right: 0;
                    }
                    img {
                      width: 16px;
                      height: 16px;
                    }
                    .significant, .topping, .official {
                      font-size: 12px;
                      color: white;
                      padding: 4px;
                      border-radius: 2px;
                    }
                    .topping {
                      background: #37A2F1;
                    }
                    .significant {
                      background: #FF5757;
                    }
                    .official {
                      background: #E40A37;
                    }
                  }
                }
                @include ibMid();
                // @include posiVertical();
                // left:96px;
              }
              & > ul {
                // @include posiVertical();
                margin-right: 7px;
                @include ibMid();
                float: right;
                li {
                  float: left;
                  font-size: 12px;
                  text-align: center;
                  margin-right: 10px;
                  line-height: 100%;
                  &:last-child {
                    margin-right: 0;
                  }
                  p {
                    color: #8D8D8D;
                    margin: 14px 0 8px 0;
                    &:hover {
                      color: #E43D3D;
                    }
                    line-height: 100%;
                  }
                  span {
                    color: #C0C0C0;
                    line-height: 100%;
                  }
                }
                @include clearFloat();
              }
              @include clearFloat();

            }
            & > ol {
              margin-bottom: 36px;

              li {
                float: left;
                margin-right: 6px;
                &:last-child {
                  margin-right: 0;
                }
                img {
                  max-height: 124px;
                }
              }
              @include clearFloat();
            }
          }
          &:last-child {
            & > div {
              border-bottom: 0;
            }
          }
        }
      }
    }
  }

  .emoji-box {
    position: absolute;
    z-index: 10;
    right: 100px;
    bottom: 0;
    box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
    background: white;
    .el-button {
      position: absolute;
      border: none;
      color: #FF4949;
      right: 12px;
      top: 12px;
      z-index: 10;
    }
    .arrow {
      left: 10px;
    }
  }

  .button {
    cursor: pointer;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .fade-move {
    transition: transform .4s;
  }

  .list-enter-active, .list-leave-active {
    transition: all .5s;
  }

  .list-enter, .list-leave-active {
    opacity: 0;
    transform: translateX(30px);
  }

  .list-leave-active {
    position: absolute !important;
  }

  .list-move {
    transition: all .5s;
  }
</style>
