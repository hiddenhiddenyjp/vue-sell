<template>
<div>
    <div class="header">
        <div class="header_top">
            <div class="img_wrapper">
                <img :src="seller.avatar" width="64" height="64" class="avatar">
            </div>
            <div class="content_wrapper">
               <div class="name_wrapper">
                 <span class="brand"></span>
                 <h1 class="name">{{seller.name}}</h1>
               </div>
               <div class="description">
                 {{seller.description}}/{{seller.deliveryTime}}分钟到达
               </div>
               <div class="text_wrapper" v-if="seller.supports">
                   <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                   <span class="text">{{seller.supports[0].description}}</span>
               </div>
            </div>
            <div class="count_wrapper" v-if="seller.supports" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="header_bottom">
           <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
           <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="header_bg">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <transition name="fade">
          <div class="detail" v-show="detailShow">
              <div class="detail-wrapper clearfix">
                  <div class="detail-main">
                      <h2 class="title">{{seller.name}}</h2>
                      <div class="star-wrapper">
                          <star :size="48" :score="seller.score"></star>
                      </div>
                      <div class="content-wrapper">
                          <div class="discount-wrapper">
                              <span class="discount-line"></span>
                              <span class="discount-text">优惠信息</span>
                              <span class="discount-line"></span>
                          </div>
                          <ul class="discount-detail" v-if="seller.supports">
                              <li v-for="item in seller.supports" class="discount-item">
                                  <span class="icon" :class="classMap[item.type]"></span>
                                  <span class="description">{{item.description}}</span>
                              </li>
                          </ul>
                          <div class="tip-wrapper">
                              <span class="tip-line"></span>
                              <span class="tip-text">商家公告</span>
                              <span class="tip-line"></span>
                          </div>
                          <p class="tip-content">
                              {{seller.bulletin}}
                          </p>
                      </div>
                  </div>
              </div>
              <div class="detail-close" @click="hideDetail">
                  <i class="icon-close"></i>
              </div>
          </div>
        </transition>
    </div>
</div>
</template>

<script type= "text/ecmascript-6">
     import star from 'components/star/star';
     export default {
        props: {
            type: Object,
            seller: {}
        },
        created() {
          this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
        },
        methods: {
          showDetail() {
            this.detailShow = true;
          },
          hideDetail() {
            this.detailShow = false;
          }
        },
        data() {
          return {
            detailShow: false
          }
        },
        components: {
          star
        }
     }
</script>

<style lang = "stylus" rel="stylesheet/stylus"> 
     .header
        position: relative
        overflow: hidden
        color: #fff
        z-index: auto
        background-color: rgba(7, 17, 27, 0.5)
        .header_top
           padding: 24px 12px 18px 24px
           position: relative
           font-size:0
           .img_wrapper
               border-radius: 4px
               display: inline-block
               margin-right: 16px
           .content_wrapper
              display: inline-block
              .name_wrapper
                margin: 2px 0 8px 0
                font-size: 0
                .brand
                  display: inline-block
                  background-image: url(brand@2x.png)
                  width: 30px
                  height: 18px
                  background-size: 30px 18px
                  background-repeat: no-repeat
                  margin-right: 6px
                .name
                  display: inline-block
                  font-size: 16px
                  vertical-align: top
                  font-weight: bold
                  color: rgb(255, 255, 255)
                  line-height: 18px
              .description
                font-size: 12px
                font-weigth: bold
                line-height: 12px
                color:rgb(255, 255, 255)
              .text_wrapper
                font-size: 0
                margin: 10px 0 2px 0
                .icon
                  display: inline-block
                  width: 12px
                  height: 12px
                  background-size: 12px 12px
                  background-repeat: no-repeat
                  margin-right: 4px
                  &.decrease
                    background-image: url(decrease_2@2x.png) 
                  &.discount
                    background-image: url(discount_2@2x.png) 
                  &.guarantee
                    background-image: url(guarantee_2@2x.png) 
                  &.invoice
                    background-image: url(invoice_2@2x.png) 
                  &.special
                    background-image: url(special_2@2x.png) 
                .text
                  font-size: 10px
                  color: rgb(255, 255, 255)
                  font-weight: 200
                  line-height: 12px
                  vertical-align: top
           .count_wrapper
               background-color: rgba(0, 0, 0, 0.2)
               position: absolute
               bottom: 18px
               right: 12px
               border-radius: 14px
               padding: 0 8px
               height: 24px
               font-size: 0
               .count
                 font-size: 10px
                 color: rgb(255, 255, 255)
                 font-weight: 200
                 line-height: 24px
                 margin-right: 2px
                 display: inline-block
               .icon
                 display: inline-block
                 font-size: 10px
                 color: rgb(255, 255, 255)
        .header_bottom
           position:relative
           height: 28px
           line-height: 28px
           padding: 0 22px 0 12px
           background-color: rgba(7, 17, 27, 0.2)
           overflow: hidden
           white-space: nowrap
           text-overflow: ellipsis
           color: #fff
           .bulletin-title
              display: inline-block
              width: 22px
              height: 12px
              background-image: url(bulletin@2x.png)
              background-size: 22px 12px
              background-repeat: no-repeat
              margin-right: 4px
              vertical-align: middle
           .bulletin-text
              font-size: 10px
              color: rgb(255, 255, 255)
              font-weight: 200
              line-height: 28px
           .icon-keyboard_arrow_right
              position: absolute
              font-size: 10px
              right:16px
              bottom: 6px
              color: #fff
        .header_bg
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          z-index: -1
          filter: blur(10px)
        .detail
          position: fixed
          z-index: 100
          top: 0
          left: 0
          width: 100%
          height: 100%
          overflow: auto          
          opacity: 1
          background: rgba(7, 17, 27, 0.8)
          &.fade-enter-active, &.fade-leave-active
             transition: all 0.5s             
          &.fade-enter,&.fade-leave-active
             opacity: 0
             background: rgba(7, 17, 27, 0)
          .detail-wrapper
            min-height: 100%
            width: 100%
            .detail-main
               margin-top: 64px
               padding-bottom: 64px
               .title
                 text-align: center
                 font-weight: 700
                 font-size: 16px
                 color: rgb(255, 255, 255)
                 line-height: 16px
                 margin-bottom: 16px
                 text-align: center
               .star-wrapper
                 text-align: center
               .content-wrapper
                 padding: 0 36px
                 margin-top: 28px
                 .discount-wrapper
                    display: flex
                    margin-bottom: 24px
                    .discount-line
                      flex: 1
                      position: relative
                      top: -6px
                      border-bottom: 1px solid rgba(255, 255, 255, 0.2)
                    .discount-text
                      font-size: 14px
                      margin: 0 12px
                      font-weight: 700
                 .tip-wrapper
                    margin-top: 16px
                    font-size: 0
                    display: flex
                    .tip-line
                       flex: 1
                       position: relative
                       top: -6px
                       border-bottom: 1px solid rgba(255, 255, 255, 0.2)
                    .tip-text
                       font-size: 14px
                       margin: 0 12px
                       font-weight: 700
                 .tip-content
                    padding:0 12px
                    margin-top: 24px
                    font-size: 12px
                    font-weight: 200
                    color: rgb(255, 255, 255)
                    line-height: 24px
          .discount-detail
            .discount-item
               line-height: 16px
               padding: 0 0 12px 12px
               .icon
                    display: inline-block
                    width: 16px
                    height: 16px
                    background-size: 16px 16px
                    background-repeat: no-repeat
                    margin-right: 6px
                    &.decrease
                      background-image: url(decrease_2@2x.png) 
                    &.discount
                      background-image: url(discount_2@2x.png) 
                    &.guarantee
                      background-image: url(guarantee_2@2x.png) 
                    &.invoice
                      background-image: url(invoice_2@2x.png) 
                    &.special
                      background-image: url(special_2@2x.png)
               .description
                 font-size: 12px
                 font-weight: 200
                 color: rgb(255, 255, 255)
                 line-height: 12px
                 vertical-align: top
          .detail-close
             positive: relative
             text-align: center
             width: 32px
             height: 32px
             margin: -64px auto 0 
             clear: both
             font-size: 32px
             color: rgba(255, 255, 255, 0.5)

</style>   