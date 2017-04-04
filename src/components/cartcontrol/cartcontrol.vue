<template>
<div>
    <div class="cartcontrol">
        <transition name="move">
        <div class="decrease" @click.stop.prevent="decreaseCount($event)" v-show="good.count>0">
            <span class="icon-remove_circle_outline inner"></span>
        </div>
        </transition>
        <div class="text" v-show="good.count>0"> {{good.count}}</div>
        <div class="add" @click.stop.prevent="addCount($event)">
            <span class="icon-add_circle"></span>
        </div>
    </div>
</div>
</template>

<script type= "text/ecmascript-6">
     import Vue from 'vue';
     export default {
        props: {
            good: {
                type: Object,
                good: {}
            }
        },
        methods: {
            addCount(event) {
               if (!event._constructed) {
                  return;
               };
               if (!this.good.count && this.good.count !== 0) {
                   Vue.set(this.good, 'count', 0);
               };
               this.good.count++;
               this.$emit('add', event.target);
            },

            decreaseCount(event) {
               if (!event._constructed) {
                  return;
               };
               this.good.count--;
            }

        },
        data() {
            return {
                countNum: 0
            }
        }
     }
</script>

<style lang= "stylus" rel="stylesheet/stylus">
      .cartcontrol
          font-size: 0
          .decrease
             width: 24px
             height: 24px
             display: inline-block
             color: rgb(0, 160, 220)           
             opacity: 1
             transform: translate3D(0, 0, 0)
             .inner
                  display: inline-block
                  transition: all 0.4s linear
                  transform: rotate(0)
                  line-height: 24px
                  font-size: 24px
             &.move-enter-active, &.move-leave-active
               transition: all 0.4s linear               
             &.move-enter, &.move-leave-active
               opacity: 0
               transform: translate3D(24px, 0, 0)
               .inner
                  transform: rotate(180deg)
          .add
             width: 24px
             height: 24px
             display: inline-block
             font-size: 24px
             color: rgb(0, 160, 220)
             line-height: 24px
          .text
             display: inline-block
             width: 24px
             text-align: center
             font-size: 10px
             color: rgb(147, 153, 159)
             line-height: 24px
             vertical-align: top   
</style>
