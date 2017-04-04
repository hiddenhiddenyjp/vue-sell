<template>
<div>
    <div class="ratings" ref="ratingsWrapper">
      <div class="rating-wrapper">
       <div class="rating-content">
           <div class="content-left">
                <div class="score">{{seller.score}}</div>
                <div class="comp-score">综合评分</div>
                <div class="info-score">高于周边商家</div>
           </div>
           <div class="content-right">
                <div class="star-wrapper">
                    <span class="score-detail">服务态度</span>
                    <div class="star-style">
                    <star :size="36" :score="seller.serviceScore"></star>
                    </div>
                </div>
                <div class="star-wrapper">
                    <span class="score-detail">商品评分</span>
                    <div class="star-style">
                    <star :size="36" :score="seller.foodScore"></star>
                    </div>
                </div>
                <div class="time-wrapper">
                    <span class="score-detail">送达时间</span>
                    <span class="time">{{seller.deliveryTime}}分钟</span>
                </div>
           </div>
       </div>
       <split></split>
       <div class="rating-list">
          <ratingselect :select-type="selectType" :only-content="onlyContent" 
          @selected="selectRating" @switchon="toggleContent" :ratings="ratings"></ratingselect>
       </div>
       <ul class="detail-list">
          <li v-for="rating in ratings" class="item" v-show="needShow(rating)">
              <div class="avatar-wrapper">
                   <img :src="rating.avatar" alt="" width="28" height="28"> 
              </div>
              <div class="detail-wrapper">
                   <div class="name">{{rating.username}}</div>
                   <div class="star-wrapper">
                        <div class="star-style">
                           <star :size="24" :score="rating.score"></star>
                        </div>
                        <span class="deliveryTime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达
                        </span>
                   </div>
                   <div class="text">
                        {{rating.text}}
                   </div>
                   <div class="detail-bottom">
                        <div class="icon-wrapper">
                            <span :class="{'icon-thumb_down':rating.rateType===1,'icon-thumb_up':rating.rateType===0}">
                            </span>
                        </div>
                        <div class="recommend-wrapper">
                            <span v-for="cmItem in rating.recommend" class="recommend">{{cmItem}}                               
                            </span>
                        </div>
                   </div>
                   <div class="rateTime">
                        {{rating.rateTime | formatDate}}
                   </div>
              </div>
          </li>
       </ul>
      </div>
    </div>
</div>
</template>

<script type= "text/ecmascript-6">
import star from 'components/star/star';
import split from 'components/split/split';
import ratingselect from 'components/ratingselect/ratingselect';
import BScroll from 'better-scroll';
import {formatDate} from 'common/js/date';
     const ALL = 2;
     export default {
        created() {
           this.$http.get('static/data.json').then((response) => {
                    this.ratings = response.body.ratings;
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.ratingsWrapper, {
                                click: true
                    });
                 })
           })
        },
        data() {
            return {
                ratings: [],
                selectType: ALL,
                onlyContent: true
            }
        },
        props: {
            seller: {
                type: Object,
                seller: {}
            }
        },
        components: {
            star,
            split,
            ratingselect
        },
        filters: {
            formatDate(time) {
               let date = new Date(time);
               return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        },
        methods: {
            selectRating(type) {
              this.selectType = type;
              this.$nextTick(() => {
                  if (!this.scroll) {
                      this.scroll = new BScroll(this.$refs.ratingsWrapper, {
                                  click: true
                      });
                  }
                  this.scroll.refresh();
              });
            },
            toggleContent() {
              console.log('aabbb');
               this.onlyContent = !this.onlyContent;
               this.$nextTick(() => {
                  if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.ratingsWrapper, {
                                click: true
                    });
                  }
                  this.scroll.refresh();
               });
            },
            needShow(rating) {
               if (this.onlyContent && !rating.text) {
                    return false;
               }
               if (this.selectType === ALL) {
                    return true;
               } else {
                    return rating.rateType === this.selectType;
               }
           }
        }
     }
</script>

<style lang= "stylus" rel="stylesheet/stylus">
     .ratings
        position: absolute
        top: 176px
        bottom: 0
        overflow: hidden
        width: 100%
        .rating-wrapper
            .rating-content
                display: flex
                padding: 18px 0
                .content-left
                    flex: 138px 0 0
                    width: 138px
                    border-right: 1px solid #93999f
                    text-align: center
                    .score
                      font-size: 24px
                      color: rgb(255, 153, 0)
                      line-height: 28px
                      margin-bottom: 6px
                    .comp-score
                      font-size: 12px
                      color: rgb(7, 17, 27)
                      line-height: 12px
                      margin-bottom: 8px
                    .info-score
                      font-size: 10px
                      color: #93999f
                      line-height: 10px
                .content-right
                    flex: 1
                    padding-left: 24px
                    .star-wrapper
                      margin-bottom: 8px
                      font-size: 0
                      .score-detail
                         font-size: 12px
                         color: rgb(7, 17, 27)
                         line-height: 18px
                         margin-right: 12px
                         display: inline-block
                         font-weight: 700
                      .star-style
                         display: inline-block
                         vertical-align: top
                    .time-wrapper
                         font-size: 0
                         .score-detail
                             font-size: 12px
                             color: rgb(7, 17, 27)
                             line-height: 18px
                             margin-right: 12px
                         .time
                             font-size: 12px
                             color: rgb(147, 153, 159)
                             line-height: 18px
            .detail-list
               padding:0 18px
               .item
                  padding:18px 0
                  font-size: 0
                  display: flex
                  border-bottom: 1px solid rgba(7, 17, 27, 0.1)
                  .avatar-wrapper
                        flex: 0 0 28
                        border-radius: 50%
                        overflow:hidden
                        margin-right: 12px
                        display: inline-block
                  .detail-wrapper
                        flex: 1
                        display: inline-block
                        position: relative
                        font-size: 0
                        .name
                           font-size: 10px
                           color: rgb(7, 17, 27)
                           line-height: 12px
                           margin-bottom: 4px
                        .star-wrapper
                           fonr-size: 0
                           margin-bottom: 6px
                           .star-style
                              display: inline-block
                           .deliveryTime
                              display: inline-block
                              font-size: 10px
                              font-weight: 200
                              color: rgb(147, 153, 159)
                              line-height: 12px
                              margin-left: 6px
                        .text
                           font-size: 12px
                           color: rgb(7, 17,27)
                           line-height: 18px
                           margin-bottom: 8px
                        .detail-bottom
                           font-size: 0
                           display: flex
                           .icon-wrapper
                             display: inline-block
                             font-size: 12px
                             line-height: 16px
                             flex: 0, 0, 10
                             .icon-thumb_up
                                color: rgb(0, 160, 220)
                             .icon-thumb_down
                                color: rgb(183, 187, 191)
                           .recommend-wrapper
                             display: inline-block
                             flex: 1
                             .recommend
                                display: inline-block
                                padding: 0 6px
                                height:16px
                                font-size: 9px
                                line-height: 16px
                                color: rgb(147, 153, 159)
                                border: 1px solid rgba(7, 17, 27, 0.1)
                                margin-left: 8px
                        .rateTime
                            position: absolute
                            right: 0
                            top: 0
                            font-size: 10px
                            font-weight: 200
                            color: rgb(147, 153, 159)
                            line-height: 12px
</style>
