<template>
<div>
   <transition name="appear">
    <div class="food" v-show="showFlag" ref="foodWrapper">
       <div class="food-content">
           <div class="image-header">
               <img :src="food.image" alt="">
               <div class="back" @click="hide">
                    <i class="icon-arrow_lift"></i>
               </div>
           </div>
           <div class="detail-wrapper">
              <div class="detail">
                <div class="title">{{food.name}}</div>
                <div class="description">
                     <span class="sellCount">月售{{food.sellCount}}份</span>
                     <span class="ratPer">好评率{{food.rating}}%</span>
                </div>
                <div class="price-wrapper">
                    <div class="price">￥{{food.price}}</div>
                    <div class="old_price"></div>
                </div>
                <transition name="shop">
                <div class="shop-car" v-show="!food.count || food.count === 0" @click="addFirst">
                    加入购物车
                </div>
                </transition>
                <div class="cartcontrol-wrapper" v-show="food.count">
                    <cartcontrol :good="food" @add="addFood"></cartcontrol>
                </div>
              </div>
           </div>
           <split></split>
           <div class="description-wrapper">
              <h2 class="title">商品介绍</h2>
              <div class="info">{{food.info}}</div>
           </div>
           <split></split>
           <div class="rating">
               <h1 class="title">商品评价</h1>
               <ratingselect  @selected="selectRating" @switchon="toggleContent" :select-type="selectType" 
                        :only-content="onlyContent" :desc="desc"
                        :ratings="food.ratings"></ratingselect>
              <ul class="rate-wrapper" v-show="food.ratings && food.ratings.length">
               <li v-for="good in food.ratings" class="rate" v-show="rateShow(good.rateType,good.text)">
              <div class="rateTime">{{good.rateTime | formatDate}}</div>
              <div class="bottom_wrapper">
                  <span :class="{'icon-thumb_lldown':good.rateType === 1,'icon-thumb_up':good.rateType === 0}" class="thumb"></span>
                  <span class="text"></span>
              </div>
              <div class="right_wrapper">
                  <span class="username">{{good.username}}</span>
                  <div class="avatar-wrapper">
                      <img :src="good.avatar" alt="" width="12" height="12">
                  </div>
              </div>
          </li>
       </ul>     
           </div>
       </div>
    </div>
    </transition>
</div>
</template>

<script type= "text/ecmascript-6">
     import BScroll from 'better-scroll';
     import cartcontrol from 'components/cartcontrol/cartcontrol';
     import Vue from 'vue';
     import split from 'components/split/split';
     import ratingselect from 'components/ratingselect/ratingselect';
     import {formatDate} from 'common/js/date';
     const ALL = 2;
     export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            show() {
                this.showFlag = true;
                this.$nextTick(() => {
                    this._initScroll();
                })
            },
            hide() {
                this.showFlag = false;
            },
            selectRating(type) {
                 this.selectType = type;
                 this.$nextTick(() => {
                     this._initScroll();
                 });
            },
            toggleContent() {
                this.onlyContent = !this.onlyContent;
                this.$nextTick(() => {
                  this._initScroll()
                });
            },
            _initScroll() {
                if (!this.foodScroll) {
                this.foodScroll = new BScroll(this.$refs.foodWrapper, {
                    click: true
                })
                } else {
                    this.foodScroll.refresh();
                }
            },
            addFirst(event) {
               if (!event._constructed) {
                  return;
               }
               Vue.set(this.food, 'count', 1);
               this.$emit('add', event.target);
            },
             addFood(target) {
               this.$emit('add', target);
            },
            rateShow(type, text) {
              if (this.onlyContent && !text) {
                  return false;
              }
              if (this.selectType === ALL) {
                  return true;
              } else {
                  return type === this.selectType;
              }
            }
        },
        data() {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: true,
                desc: {
                  all: '全部',
                  positive: '推荐',
                  negative: '吐槽'
                }
            }
        },
        components: {
            cartcontrol,
            split,
            ratingselect
        },
        filters: {
          formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
          }
        }
     }
</script>

<style lang= "stylus" rel="stylesheet/stylus">
   .food
     position: fixed
     left: 0
     top: 0
     bottom: 46px
     width: 100%
     background: #fff
     z-index: 30
     transform: translate3d(0, 0, 0)
     &.appear-enter-active, &.appear-leave-active
        transition: all 0.5s
     &.appear-enter,&.appear-leave-active
        transform: translate3d(100%, 0, 0)
     .image-header
       position: relative
       width: 100%
       height: 0
       padding-top: 100%
       img
         position: absolute
         top: 0
         left: 0
         height: 100%
         width: 100%
       .back
         position: absolute
         top: 10px
         left: 0
         .icon-arrow_lift
            display: block
            padding: 18px
            font-size: 20px
            color: #fff
     .detail-wrapper
       padding: 18px
       .detail
         position: relative
         .title
             font-size: 14px
             font-weight: 700
             color: rgb(7, 17, 27)
             line-height: 14px
             margin-bottom: 8px
         .description
             font-size: 10px
             color: rgb(147, 153, 159)
             line-height: 10px
             margin-bottom: 18px
             .sellCount
                 margin-right: 12px
         .price-wrapper
             .price
                font-size: 14px
                font-weight: 700
                color: rgb(240, 20, 20)
                line-height: 24px
         .shop-car
             position: absolute
             bottom: 0
             right: 0
             width: 86px
             height: 24px
             border-radius: 12px
             text-align: center
             background: rgb(0, 160, 220)
             line-height: 24px
             font-size: 10px
             color: #fff
             opacity: 1
             &.shop-enter-active, &.shop-leave-active
                transition: all 0.5s
             &.shop-enter, &.shop-leave-active
                opacity: 0
         .cartcontrol-wrapper
             position: absolute
             bottom: 0
             right: 0
     .description-wrapper
       padding: 18px
       .title
         font-size: 14px
         font-weight: 700
         color: rgb(7, 17, 27)
         line-height: 14px
       .info
         font-size: 12px
         font-weight: 200
         color: rgb(77, 85, 93)
         line-height: 24px
         padding: 0 8px
         margin-top: 6px
     .rating
         padding-top: 18px
         .title
             font-size: 14px
             font-weight: 700
             color: rgb(7, 17, 27)
             line-height: 14px
             padding-left: 18px
         .rate-wrapper
            padding: 0 18px
            .rate
               position: relative
               padding: 16px 0
               border-bottom: 1px solid rgba(7, 17, 27, 0.1)
               .bottom_wrapper
                  .thumb
                     font-size: 12px
                     color: rgb(147, 153, 159)
                     line-height: 24px
                  .text
                     font-size: 12px
                     color: rgb(7, 17, 22)
                     line-height: 16px
               .rateTime
                 font-size: 10px
                 color: rgb(147, 153, 159)
                 line-height: 12px
                 margin-bottom: 6px
               .right_wrapper
                 position: absolute
                 top: 16px
                 right: 0
                 font-size: 0
                 .username
                   font-size: 10px
                   color: rgb(147, 153, 159)
                   line-height: 12px
                   display: inline-block
                   margin-right: 6px
                 .avatar-wrapper
                   display: inline-block

</style>
