<template>
<div>
    <div class="shopcart">
        <div class="cart-content" @click="toggleList">
          <div class="wrapper_left">
              <div class="logo_wrapper">
                  <div class="logo" :class="{'highlight': totalCount>0}">
                      <span class="icon-shopping_cart"></span>
                  </div>
                  <div class="pos-count" v-show="totalCount>0">
                      {{totalCount}}
                  </div>
              </div>
              <div class="price_wrapper">
                  <div class="price">￥{{totalPrice}}</div>
              </div>
              <div class="deliver_wrapper">
                   <div class="deliver">另需配送费￥{{seller.deliveryPrice}}元</div>
              </div>
          </div>
          <div class="wrapper_right" :class="{'enough':totalPrice>=seller.minPrice}" @click.stop.prevent="pay">
              {{payDesc}}
          </div>
        </div>
        <div class="ball-container">
           <div v-for="ball in balls">
            <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
              <div v-show="ball.show"
              class="ball">
                  <div class="inner inner-hook"></div>
              </div>
            </transition>
           </div>
        </div>
        <transition name="fold"> 
          <div class="shopcart-list" v-show="listshow">
              <div class="list-header">
                  <h1 class="title">购物车</h1>
                  <span class="empty" @click="empty">清空</span>
              </div>
              <div class="list-content" ref="shopcartList">
                  <ul>
                      <li class="food" v-for="food in selectFoods">
                          <span class="name">{{food.name}}</span>
                          <div class="price">
                             <span>￥{{food.price*food.count}}</span>
                          </div>
                          <div class="cartcontrol-wrapper">
                             <cartcontrol :good="food" @add="addFood"></cartcontrol> 
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
        </transition>
    </div>
    <transition name="fade">
          <div class="list-mask" v-show="listshow" @click="toggleMask"></div>
    </transition>
    </div>
    </div>
</div>
</template>

<script type= "text/ecmascript-6">
     import cartcontrol from 'components/cartcontrol/cartcontrol';
     import BScroll from 'better-scroll';
     export default {
        props: {
            seller: {
                type: Object,
                seller: {}
            },
            selectFoods: {
                type: Array,
                default() {
                    return [{
                       price: 10,
                       count: 1
                    }];
                }
            }
        },
        components: {
          cartcontrol
        },
        computed: {
            totalCount() {
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                })
                return count;
            },
            totalPrice() {
                let price = 0;
                this.selectFoods.forEach((food) => {
                    price += food.price * food.count;
                });
                return price;
            },
            payDesc() {
                if (this.totalPrice === 0) {
                    return `￥${this.seller.minPrice}元起送`;
                } else if (this.totalPrice < this.seller.minPrice) {
                    let diff = this.seller.minPrice - this.totalPrice;
                    return `还要${diff}元起送`;
                } else {
                    return '去结算';
                }
            },
            listshow() {
              if (!this.totalCount) {
                 this.fold = true;
                 return false;
              }
                 let show = !this.fold;
                 if (show) {
                  this.$nextTick(() => {
                   this._initScroll();
                  })
                 }
                 return show;
            }
            },
        data() {
          return {
            balls: [
               {
                 show: false
               },
               {
                 show: false
               },
               {
                 show: false
               },
               {
                 show: false
               },
               {
                 show: false
               }

            ],
            dropBalls: [],
            fold: true
          }
        },
        methods: {
          drop(el) {
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                   ball.show = true;
                   ball.el = el;
                   this.dropBalls.push(ball);
                   return;
                }
            }
          },
          addFood(target) {
              this.drop(target);
          },
          pay() {
            if (this.totalPrice < this.seller.minPrice) {
              return;
            }
            window.alert(`支付${this.totalPrice}元`);
          },
          empty() {
            this.selectFoods.forEach((food) => {
                  food.count = 0;
            })
          },
          _initScroll() {
            if (!this.shopScroll) {
               this.shopScroll = new BScroll(this.$refs.shopcartList, {
                click: true
              });
            } else {
              this.shopScroll.refresh();
            }
          },
          toggleList() {
            console.log('aaaa');
               if (!this.totalCount) {
                     return;
               }
               console.log('fffff');
               this.fold = !this.fold;
          },
          toggleMask() {
            this.fold = !this.fold;
          },
          beforeDrop(el) {
             let count = this.balls.length;
             while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                  let rect = ball.el.getBoundingClientRect();
                  let x = rect.left - 32;
                  let y = -(window.innerHeight - rect.top - 22);
                  el.style.display = '';
                  el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                  el.style.transform = `translate3d(0,${y}px,0)`;
                  let inner = el.getElementsByClassName('inner-hook')[0];
                  inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                  inner.style.transform = `translate3d(${x}px,0,0)`;
                }
             }
          },
          dropping(el, done) {
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight;
            this.$nextTick(() => {
                  el.style.webkitTransform = 'translate3d(0,0,0)';
                  el.style.transform = 'translate3d(0,0,0)';
                  let inner = el.getElementsByClassName('inner-hook')[0];
                  inner.style.webkitTransform = 'translate3d(0,0,0)';
                  inner.style.transform = 'translate3d(0,0,0)';
                  el.addEventListener('transitionend', done);
            });
          },
          afterDrop(el) {
                 let ball = this.dropBalls.shift();
                 if (ball) {
                    ball.show = false;
                    el.style.display = 'none';
                 }
          }
        }
      }
</script>

<style lang= "stylus" rel="stylesheet/stylus">
     .shopcart
        position: fixed;
        bottom: 0
        left: 0
        width: 100%
        height: 46px
        z-index: 50
        .cart-content
          width: 100%
          height: 46px
          display: flex
          background: #141d27
          .wrapper_left
           flex: 1
           padding-left: 12px
           .logo_wrapper
              display: inline-block
              padding: 6px
              position: relative
              border-radius: 50%
              width: 56px
              height: 56px
              box-sizing: border-box
              top: -12px
              position: relative
              background: #141d27
              .logo
                 background: #2b333b
                 text-align: center
                 width: 100%
                 height: 100%
                 border-radius: 50%
                 &.highlight
                     background: rgb(0, 160, 220)
                     .icon-shopping_cart
                         color: rgb(255, 255, 255)
                 .icon-shopping_cart
                    text-align: center
                    font-size: 24px
                    color: rgba(255, 255, 255, 0.4)
                    line-height: 44px
              .pos-count
                  position: absolute
                  right: 0
                  top: 0
                  background: rgb(240, 20, 20)
                  color: rgb(255, 255, 255)
                  font-size: 9px
                  font-weight: 700
                  line-height: 16px
                  height: 16px
                  width: 24px
                  border-radius: 6px 6px
                  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4)
                  text-align: center
           .price_wrapper
             padding: 10px 0
             display: inline-block
             vertical-align: top
             .price
                border-right: 1px solid rgba(255, 255, 255, 0.1)
                font-size: 16px
                color: rgba(255, 255, 255, 0.4)
                font-weight: 700
                line-height: 24px
                padding-right:12px
           .deliver_wrapper
             padding: 10px 0
             display: inline-block
             vertical-align: top
             .deliver
                font-size: 10px
                color: rgba(255, 255, 255, 0.4)
                font-weight: 700
                line-height: 24px
                padding-left: 10px
          .wrapper_right
           flex: 0 0 105px
           font-size: 12px
           background-color: #2b333b
           color: rgba(255, 255, 255, 0.4)
           font-weight: 700
           line-height: 46px
           text-align: center
           &.enough
             background: #00b43c
             color: #fff
        .ball-container
          .ball
            position: fixed
            left: 32px
            bottom: 22px
            z-index: 200
            transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
            .inner
                   width: 16px
                   height: 16px
                   border-radius: 50%
                   background: rgb(0, 160, 220)
                   transition: all 0.4s
        .shopcart-list
           position: absolute;
           top: 0
           left:0
           width: 100%
           z-index: -1          
           transform: translate3d(0, -100%, 0)
           &.fold-enter-active, &.fold-leave-active
              transition: all 0.5s
           &.fold-enter,&.fold-leave-active
              transform: translate3d(0, 0, 0)
           .list-header 
              height: 40px
              background: #f3f5f7
              line-height: 40px
              border-bottom: 1px solid rgba(7, 17, 27, 0.1)
              padding: 0 18px
              .title
                 font-size: 14px
                 font-weight: 200
                 color: rgb(7, 17, 27)
                 float: left
              .empty
                 font-size: 12px
                 color: rgb(0, 160, 220)
                 float: right
           .list-content
             padding: 0 18px
             background: #fff
             max-height: 217px
             overflow: hidden
             .food
               height: 48px
               line-height: 48px
               border-bottom: 1px solid rgba(7, 17, 27, 0.1)
               position: relative
               .name
                 font-size: 14px
                 color: rgb(7, 17, 27)

               .price
                 position: absolute
                 font-size: 14px
                 font-weight: 700
                 color: rgb(240, 20, 20)
                 right: 84px
                 top: 0px
               .cartcontrol-wrapper
                 position: absolute
                 right: 0
                 top:12px
     .list-mask
         position: fixed
         top: 0
         left: 0
         bottom: 0
         right: 0
         z-index: 40
         opacity: 1
         background: rgba(7, 17, 27, 0.6)
         &.fade-enter-active, &.fade-leave-active
            transition: all 0.5s           
         &.fade-enter, &.fade-leave-active
            opacity: 0
            background: rgba(7, 17, 27, 0)          

</style>
