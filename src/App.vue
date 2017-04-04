<template>
   <div>
     <v-header :seller="seller"></v-header>
     <div class="tab">
        <div class="tab_item">
           <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab_item">
           <router-link to="/ratings">评论</router-link> 
        </div>
        <div class="tab_item">
           <router-link to="/seller">商家</router-link>
        </div>
     </div>
     <div class="content">
        <keep-alive>
           <router-view :seller="seller"></router-view>
        </keep-alive>
     </div>
     
   </div>
</template>

<script type= "text/ecmascript-6">
   import header from 'components/header/header';
   import shopcart from 'components/shopcart/shopcart';
   import {urlParse} from 'common/js/urlParse';
   
   export default{
       data() {
         return {
             seller: {
              id: (() => {
                let queryParam = urlParse('id');
                return queryParam;
              })()
             }
         };
       },
       components: {
         'v-header': header,
         shopcart
       },
       created() {
          this.$http.get('static/data.json?id=' + this.seller.id).then((response) => {
               this.seller = Object.assign({}, this.seller, response.body.seller);
          })
       }
   }
</script>
<style lang= "stylus" rel="stylesheet/stylus">
    .tab
      display: flex
      height: 40px
      line-height: 40px
      border-bottom: 1px solid rgba(7, 17, 27 0.1)
      .tab_item
        flex: 1
        text-align: center
        font-size: 14px
        color: rgb(77, 85, 93)
        & > a
          display: block
          &.active
             color: rgb(240, 20, 20)
</style>
