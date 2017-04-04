<template>
<div>
    <div class="seller" ref="sellerScroll">
      <div class="seller-scroll">
       <div class="seller-top">
         <div class="top-wrapper">
           <div class="title">{{seller.name}}</div>
           <div class="star-info">
               <div class="star-wrapper">
                   <star :size="36" :score="seller.score"></star>   
               </div>
               <span class="ratingCount">({{seller.ratingCount}})</span>
               <span class="sellCount">月售{{seller.sellCount}}单</span>
           </div>
           <div class="fav">
               <div class="icon-favorite" :class="{'active':favorite}" @click="toggleFav"></div>
               <div class="local-text">{{favText}}</div>
           </div>
         </div>
         <div class="bottom-wrapper">
               <div class="item minPrice">
                  <p class="text">起送价</p>
                  <div class="count-wrapper">
                      <span class="price">{{seller.minPrice}}</span>元
                   </div>
               </div>
               <div class="item deliveryPrice">
                  <p class="text">商家配送</p>
                  <div class="count-wrapper">
                      <span class="price">{{seller.deliveryPrice}}</span>元
                   </div>
               </div>
               <div class="item deliveryTime">
                  <p class="text">平均配送时间</p>
                  <div class="count-wrapper">
                     <span class="price">{{seller.deliveryTime}}</span>
                     元
                   </div>
               </div>
         </div>
       </div>
       <split></split>
       <div class="seller-tip">
          <h2 class="title">公告与活动</h2>
          <div class="detail">
             {{seller.bulletin}}
          </div>
          <ul class="support-wrapper">
             <li v-for="support in seller.supports" class="support">
                <span class="icon-img" :class="classMap[support.type]"></span>
                <span class="description">{{support.description}}</span>
             </li>
          </ul>
       </div>
       <split></split>
       <div class="address">
           <h2 class="title">商家实景</h2>
           <div class="pics-list" ref="picList">
               <ul class="pics-wrapper" ref="picsWrapper">
                  <li v-for="imgItem in seller.pics" class="pic">
                     <img :src="imgItem" alt="" width="120" height="90">
                  </li>
               </ul>
           </div>
       </div>
       <split></split>
       <div class="seller-bottom">
          <h2 class="title">商家信息</h2>
          <ul class="info-wrapper">
            <li v-for="infoItem in seller.infos" class="item">{{infoItem}}</li>
          </ul>
       </div>
       </div>
    </div>
</div>
</template>

<script type= "text/ecmascript-6">
     import star from 'components/star/star';
     import split from 'components/split/split';
     import BScroll from 'better-scroll';
     import {saveToLocal, loadFromLocal} from 'common/js/store';
     export default {
         components: {
            star,
            split
         },
         data() {
            return {
                classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
                favorite: (() => {
                    return loadFromLocal(this.seller.id, 'favorite', false);
                })()
            }
         },
         props: {
            seller: {
                type: Object
            }
         },
         methods: {
            _initScroll() {
                this.$nextTick(() => {
                   this.scroll = new BScroll(this.$refs.sellerScroll, {click: true})
                })
            },
            toggleFav() {
                this.favorite = !this.favorite;
                saveToLocal(this.seller.id, 'favorite', this.favorite);
            },
            _initPics() {
                let picWidth = 120;
                let margin = 6;
                let width = (picWidth + margin) * this.seller.pics.length - margin;
                this.$refs.picsWrapper.style.width = width + 'px';
                this.$nextTick(() => {
                   this.picScroll = new BScroll(this.$refs.picList, {
                        scrollX: true,
                        eventPassthrough: 'vertical'
                    })
                })
            }
         },
         created() {
            this.$http.get('static/data.json').then((response) => {
                    this._initScroll();
                    this._initPics();
            })
         },
         computed: {
            favText() {
                 return this.favorite ? '已收藏' : '未收藏';
            }
         }
     }
</script>

<style lang= "stylus" rel="stylesheet/stylus">
     .seller
        position: absolute
        top: 176px
        width: 100%
        bottom: 0
        overflow: hidden
        .seller-top
            padding: 0 18px
            .top-wrapper
                border-bottom: 1px solid rgba(7, 17, 27, 0.1)
                padding: 18px 0
                position: relative
                .title
                   font-size: 14px
                   color: rgb(7, 17, 27)
                   line-height: 14px
                   margin-bottom: 8px
                .star-info
                   font-size: 0
                   .star-wrapper
                     margin-right: 8px
                     display: inline-block
                   .ratingCount
                     font-size: 10px
                     color: rgb(77, 85, 93)
                     line-height: 18px
                     margin-right: 12px
                     display: inline-block
                   .sellCount
                     font-size: 10px
                     color: rgb(77, 85, 93)
                     line-height: 18px
                     display: inline-block
                .fav
                   position: absolute
                   top: 18px
                   right: 0
                   text-align: center
                   .icon-favorite
                      font-size: 24px
                      color: #d4d6d9
                      line-height: 24px
                      margin-bottom: 4px
                      &.active
                        color: rgb(240, 20, 20)
                   .local-text
                      font-size: 10px
                      color: rgb(77, 85, 93)
                      line-height: 10px
            .bottom-wrapper
               padding: 18px 0
               display: flex
               .item
                 flex: 1
                 border-right: 1px solid rgba(7, 17, 27, 0.1)
                 text-align: center
                 &:last-child
                    border-right: none
                 .text
                   font-size: 10px
                   color: rgb(147, 153, 159)
                   line-height: 10px
                   margin-bottom: 4px
                 .count-wrapper
                    font-size: 10px
                    font-weight: 200
                    color: rgb(7, 17, 27)
                    line-height: 24px
                    .price
                       font-size: 24px
        .seller-tip
          padding: 18px
          .title
             font-size: 14px
             color: rgb(7, 17, 27)
             line-height: 14px
             margin-bottom: 8px
          .detail
             padding: 0 12px 16px 12px
             font-size: 12px
             font-weight: 200
             color: rgb(240, 20, 20)
             line-height: 24px
          .support-wrapper
             .support
                border-top: 1px solid rgba(7, 17, 27, 0.1)
                padding: 16px 12px
                line-height: 16px
                font-size: 0
                .icon-img
                   width: 16px
                   height: 16px
                   margin-right: 6px
                   display: inline-block
                   background-size: 16px 16px
                   &.decrease
                        background-image: url(decrease_3@2x.png) 
                   &.discount
                        background-image: url(discount_3@2x.png) 
                   &.guarantee
                        background-image: url(guarantee_3@2x.png) 
                   &.invoice
                        background-image: url(invoice_3@2x.png) 
                   &.special
                        background-image: url(special_3@2x.png) 
                .description
                   font-size: 12px
                   font-weight: 200
                   color: rgb(7, 17, 27)
                   line-height: 16px
                   display: inline-block
                   vertical-align: top
        .address
            padding: 18px
            .title
               font-size: 14px
               color: rgb(7, 17, 27)
               line-height: 14px
               margin-bottom: 12px
            .pics-list
                width: 100%
                white-space: nowrap
                overflow: hidden
                .pics-wrapper
                   font-size: 0
                   .pic
                      margin-right: 6px
                      display: inline-block
                      width: 120px
                      height: 90px
        .seller-bottom
           padding: 18px
           .title
               font-size: 14px
               color: rgb(7, 17, 27)
               line-height: 14px
               margin-bottom: 12px
           .info-wrapper
               .item
                  border-top: 1px solid rgba(7, 17, 27, 0.1)
                  font-size: 12px
                  font-weight: 200
                  color: rgb(7, 17, 27)
                  line-height: 16px
                  padding: 16px 12px
</style>
