<template>
<div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
           <ul class="wrapper-left">
              <li v-for="(item, index) in goods" class="item" :class="{'current':currentIndex === index}" @click="selectMenu(index, $event)">
                <div class="item-line">
                  <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}
                  </div>
              </li>
           </ul>
      </div>
       <div class="goods-wrapper" ref="goodsWrapper">
           <ul class="wrapper-right">
              <li v-for="item in goods" class="item good-list-hook">
                <h1 class="title">{{item.name}}</h1>
                <ul class="detail-wrapper">
                    <li v-for="foodsitem in item.foods" class="foods-item" @click="selectFood(foodsitem,$event)">
                        <div class="img-wrapper">
                            <img :src="foodsitem.image" width="57" height="57">
                        </div>
                        <div class="text-wrapper">
                            <h2 class="name">{{foodsitem.name}}</h2>
                            <p class="description">{{foodsitem.description}}</p>
                            <div class="count">
                                <span class="sellCount">月售{{foodsitem.sellCount}}份</span>
                                <span class="ratings">好评率{{foodsitem.rating}}%</span>
                            </div>
                            <div class="price">
                                ￥{{foodsitem.price}}
                            </div>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <cartcontrol :good="foodsitem" @add="addFood"></cartcontrol>
                        </div>
                    </li>
                </ul>
              </li>
           </ul>
       </div>
       <shopcart ref="shopcart" :seller="seller" :select-foods="selectFoods"></shopcart>
    </div>
    <food :food="selectedFood" ref="food" @add="addFood"></food>
</div>     
</template>

<script type= "text/ecmascript-6">
    import BScroll from 'better-scroll';
    import shopcart from 'components/shopcart/shopcart';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    import food from 'components/food/food';
    export default{
        props: {
          seller: {
            type: Object,
            seller: {}
          }
        },
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            }
        },

        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
            this.$http.get('static/data.json').then((response) => {
               this.goods = response.body.goods;
               this.$nextTick(() => {
                   this._initScroll();
                   this._calculateHeight();
               })
          })
        },
        computed: {
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                       let height1 = this.listHeight[i];
                       let height2 = this.listHeight[i + 1];
                       if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
                               return i;
                       }
                }
                return 0;
            },
            selectFoods() {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food);
                        }
                    });
                })
                return foods;
            }
        },
        methods: {
            _initScroll() {
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                });
                this.foodsScroll = new BScroll(this.$refs.goodsWrapper, {
                    click: true,
                    probeType: 3
                });
                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                })
            },
            _drop(target) {
              // 体验优化，异步执行下落动画
              this.$nextTick(() => {
                this.$refs.shopcart.drop(target);
              });
            },
            _calculateHeight() {
                let goodList = this.$refs.goodsWrapper.getElementsByClassName('good-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < goodList.length; i++) {
                    let item = goodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            selectMenu(index, event) {
               if (!event._constructed) {
                  return;
               };
               let goodList = this.$refs.goodsWrapper.getElementsByClassName('good-list-hook');
               let el = goodList[index];
               this.foodsScroll.scrollToElement(el, 300);
            },
            selectFood(food, event) {
               if (!event._constructed) {
                  return;
               };
               this.selectedFood = food;
               this.$refs.food.show();
            },
            addFood(target) {
               this._drop(target);
            }
        },
        components: {
            shopcart,
            cartcontrol,
            food
        }
    }
</script>

<style lang= "stylus" rel="stylesheet/stylus">
    .goods
       display: flex
       position: absolute
       top: 176px
       bottom: 46px
       overflow: hidden
       width: 100%
       .menu-wrapper
          flex: 0 0 80px
          width: 80px
          .wrapper-left
             background: #f3f5f7
             .item
                display: table
                padding:0 12px
                &.current
                  position: relative
                  margin-top: -1px
                  z-index: 50
                  background: #fff
                  .item-line
                    border: none
                .item-line
                   border-bottom: 1px solid rgba(7, 17, 27, 0.1)
                   display: table-cell
                   font-size: 12px
                   font-weight: 700
                   line-height: 12px
                   height: 54px
                   width: 54px
                   vertical-align: middle
                   .icon
                      display: inline-block
                      width: 12px
                      height: 12px
                      background-size: 12px 12px
                      background-repeat: no-repeat
                      margin-right: 2px
                      vertical-align: top
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
       .goods-wrapper
          flex: 1
          .wrapper-right 
             .item
                .title
                   height:26px
                   font-size: 12px
                   line-height: 26px
                   color: rgb(147, 153, 159)
                   padding-left: 14px
                   border-left:1px solid #d9dde1
                   background: #f3f5f7
                .detail-wrapper
                   padding:0px 18px
                   .foods-item
                      padding:18px 0
                      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
                      display: flex
                      position: relative
                      .img-wrapper
                          flex: 0 0 57px
                          margin-right: 10px
                          vertical-align: top
                      .text-wrapper
                          flex: 1
                          .name
                            font-size: 14px
                            line-height: 14px
                            color: rgb(7, 17, 27)
                            margin: 2px 0 8px 0
                          .description
                            font-size: 10px
                            color: rgb(147, 153, 159)
                            line-height: 10px
                            margin-bottom: 8px
                          .count
                            font-size: 10px
                            color: rgb(147, 153, 159)
                            line-height: 10px
                            .sellCount
                               margin-right: 6px
                          .price
                            font-size: 14px
                            color: #f01414
                            font-weight: 700
                            line-height: 24px
                            margin-top: 2px
                      .cartcontrol-wrapper
                          position: absolute
                          right: 0
                          bottom: 18px     
       
</style>
