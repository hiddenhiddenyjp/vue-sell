<template>
<div>
    <div class="ratingselect">
       <div class="rating-type">
          <div class="wrapper positive-wrapper" @click="selected(2,$event)" :class="{'active':selectType === 2}">
              <span class="all rateType">{{desc.all}}</span>
              <span class="price">{{ratings.length}}</span>
          </div>
          <div class="positive-wrapper wrapper" @click="selected(0,$event)" :class="{'active':selectType === 0}">
               <span class="positive rateType">{{desc.positive}}</span>
               <span class="price">{{positives.length}}</span>
          </div>
          <div class="negative-wrapper wrapper" @click="selected(1,$event)" :class="{'active':selectType === 1}">
               <span class="negative rateType">{{desc.negative}}</span>
               <span class="price">{{negatives.length}}</span>
          </div>
       </div>
       <div class="switch" @click="switchon">
          <span class="icon-check_circle" :class="{'active':onlyContent === true}"></span>
          <span class="text">只看有内容的评价</span>
       </div>
    </div>
</div>
</template>

<script type= "text/ecmascript-6">
     const POSITIVE = 0;
     const NEGATIVE = 1;
     const ALL = 2;
     export default {
        props: {
            ratings: {
                type: Array,
                default() {
                    return [];
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default() {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    }
                }
            }
        },
        methods: {
            selected(type, event) {
                this.$emit('selected', type);
            },
            switchon(event) {
                this.$emit('switchon');
            }
        },
        computed: {
           positives() {
              return this.ratings.filter((rating) => {
                  return rating.rateType === POSITIVE;
              })
           },
           negatives() {
              return this.ratings.filter((rating) => {
                return rating.rateType === NEGATIVE;
              })
           }
        }
     }
</script>

<style lang= "stylus" rel="stylesheet/stylus">
    .ratingselect
       .rating-type
          padding: 18px 0
          margin:0 18px
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          .wrapper
            padding: 8px 12px
            display: inline-block
            margin-right: 8px
            &.positive-wrapper
              background: rgba(0, 160, 220, 0.2)
              color: rgb(77, 85, 93)
              &.active
                  background: rgb(0, 160, 220)
                  color:#fff
            &.negative-wrapper
              background: rgba(77, 85, 93, 0.2)
              color: rgb(77, 85, 93)
              &.active
                  background: rgb(77, 85, 93,)
                  color:#fff
            .rateType
                 font-size: 12px
            .price
                 font-size: 8px
       .switch
            padding: 12px 18px
            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            color: rgb(147, 153, 159)
            line-height: 24px
            .icon-check_circle
               font-size: 24px
               vertical-align: top
               &.active
                 color: #00c850
            .text
               font-size: 12px
               vertical-align: top
</style>
