<template>

    <header>
        <tab active-color='#88C929' :index.sync="index">
            <tab-item class="tab" active-class="tab-active" :selected="index === 0" v-tap="index = 0">已预约</tab-item>
            <tab-item class="tab" active-class="tab-active" :selected="index === 1" v-tap="index = 1">待选方案</tab-item>
            <tab-item class="tab" active-class="tab-active" :selected="index === 2" v-tap="index = 2">待支付</tab-item>
            <tab-item class="tab" active-class="tab-active" :selected="index === 3" v-tap="index = 3">待施工</tab-item>
            <tab-item class="tab" active-class="tab-active" :selected="index === 4" v-tap="index = 4">施工中</tab-item>
        </tab>   
    </header><!-- /header -->

    <!-- <div class="content">
      <j-order-block v-for="order in zxList" v-tap="viewDetail('zx',order.orderNo)" :img="order.customerImage" :name="order.customerName" :tel="order.customerMobile" :status="Status.zx[order.status].name"></j-order-block>
  </div> -->
  <swiper :index.sync="index" :height="getScreenHeight()+'px'" :show-dots="false">
    <swiper-item height="100%">
        <div class="tab-swiper vux-center content">
            <scroller :height="getScreenHeight()-88+'px'" lock-x scroller-y v-ref:yy>
                <div>
                    <no-data v-if="list0.length==0"></no-data>
                    <div v-else>
                        <j-order-block v-for="order in list0" v-tap="viewDetail('zx',order.orderNo)" :img="order.customerImage" :name="order.customerName" :tel="order.customerMobile" :time="getTime(order.createdAt)"></j-order-block>
                    </div>
                </div>
            </scroller>
        </div>
    </swiper-item>
    <swiper-item height="100%">
        <div class="tab-swiper vux-center content">
            <scroller :height="getScreenHeight()-88+'px'" lock-x scroller-y v-ref:dx>
                <div>
                    <no-data v-if="list1.length==0"></no-data>
                    <div v-else>
                        <j-order-block v-for="order in list1" v-tap="viewDetail('zx',order.orderNo)" :img="order.customerImage" :name="order.customerName" :tel="order.customerMobile" :time="getTime(order.createdAt)"></j-order-block>
                    </div>
                </div>
            </scroller>
        </div>
    </swiper-item>
    <swiper-item height="100%">
        <div class="tab-swiper vux-center content">
            <scroller :height="getScreenHeight()-88+'px'" lock-x scroller-y v-ref:zf>
                <div>
                    <no-data v-if="list2.length==0"></no-data>
                    <div v-else>
                        <j-order-block v-for="order in list2" v-tap="viewDetail('zx',order.orderNo)" :img="order.customerImage" :name="order.customerName" :tel="order.customerMobile" :time="getTime(order.createdAt)"></j-order-block>
                    </div>
                </div>
            </scroller>
        </div>
    </swiper-item>
    <swiper-item height="100%">
        <div class="tab-swiper vux-center content">
            <scroller :height="getScreenHeight()-88+'px'" lock-x scroller-y v-ref:sg>
                <div>
                    <no-data v-if="list3.length==0"></no-data>
                    <div v-else>
                        <j-order-block v-for="order in list3" v-tap="viewDetail('zx',order.orderNo)" :img="order.customerImage" :name="order.customerName" :tel="order.customerMobile" :time="getTime(order.createdAt)"></j-order-block>
                    </div>
                </div>
            </scroller>
        </div>
    </swiper-item>
    <swiper-item height="100%">
        <div class="tab-swiper vux-center content">
            <scroller :height="getScreenHeight()-88+'px'" lock-x scroller-y v-ref:sgz>
                <div>
                    <no-data v-if="list4.length==0"></no-data>
                    <div v-else>
                        <j-order-block v-for="order in list4" v-tap="viewDetail('zx',order.orderNo)" :img="order.customerImage" :name="order.customerName" :tel="order.customerMobile" :time="getTime(order.createdAt)"></j-order-block>
                    </div>
                </div>
            </scroller>
        </div>
    </swiper-item>
</swiper>

<j-footer></j-footer>
</template>

<script>
import Lib from 'assets/Lib.js'
import JFooter from 'components/JFooter.vue'
import axios from 'axios'
import NoData from 'common/components/no-data'
import JOrderBlock from 'common/components/j-order-block'
import Status from 'common/status'
import {Tab, TabItem} from 'vux-components/tab'
import Swiper from 'vux-components/swiper'
import SwiperItem from 'vux-components/swiper-item'
import Scroller from 'vux-components/scroller'
Lib.M.auth(axios, true)

export default {
    data() {
        return {
            Status,
            index: Lib.M.GetRequest().type ? Number(Lib.M.GetRequest().type - 1) : 0,
            list0: [],
            list1: [],
            list2: [],
            list3: [],
            list4: []
        }
    },
    components: {
        JFooter,
        NoData,
        JOrderBlock,
        Tab,
        TabItem,
        Swiper,
        SwiperItem,
        Scroller
    },
    ready() {
        let suc_count = 0
        this.index = (Lib.M.GetRequest().type - 1) || 0
        axios.get(`${Lib.C.orderApi}decorationOrders`, {
            params: {
                filter: `projectManagerId:${JSON.parse(window.localStorage.getItem('user')).userId}|status:[1,6]`
            },
            responseType: 'json'
        }).then((res) => {
            res.data.data.map((e) => {
                switch (e.status) {
                    case 1:
                        this.list0.push(e)
                        break;
                    case 2:
                        this.list1.push(e)
                        break;
                    case 3:
                        this.list1.push(e)
                        break;
                    case 4:
                        this.list2.push(e)
                        break;
                    case 5:
                        this.list3.push(e)
                        break;
                    case 6:
                        this.list4.push(e)
                        break;
                    default:
                        break;
                }
            })
            this.$nextTick(() => {
                this.$refs.yy.reset()
                this.$refs.dx.reset()
                this.$refs.zf.reset()
                this.$refs.sg.reset()
                this.$refs.sgz.reset()
            })
        }).catch((res) => {
            alert("获取订单失败，请稍候再试QAQ")
        })
    },
    methods: {
        getScreenHeight() {
            return document.body.clientHeight
        },
        getTime(timeStamp) {
            var d = new Date(timeStamp * 1000);
            var Y = d.getFullYear() + '-';
            var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-';
            var D = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate());
            return Y + M + D
        },
        viewDetail(type, orderNo) {
            window.location.href=`${type}-order.html?orderNo=${orderNo}`
        }
    }
}
</script>

<style>
html {
    height: 100%;
}

body {
    background-color: #eee;
    height: 100%;
}
</style>
<style lang="less">
.content {
    padding-top: 45px;
}
header {
    position: fixed;
    height: 44px;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 30;
}
.tab-active {
    color: #88C929;
    border-color: #88C929;
}
.tab {
    font-size: 12px;
}
</style>
