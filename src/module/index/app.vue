<template>
  <no-data v-if="zxList.length==0"></no-data>
<div class="content" v-else>
  <j-order-block v-for="order in zxList" v-tap="viewDetail('zx',order.orderNo)" :img="order.customerImage" :name="order.customerName" :tel="order.customerMobile" :status="Status.zx[order.status].name"></j-order-block>
</div>
<j-footer></j-footer>
</template>

<script>
import Lib from 'assets/Lib.js'
import JFooter from 'components/JFooter.vue'
import axios from 'axios'
import NoData from 'common/components/no-data'
import JOrderBlock from 'common/components/j-order-block'
import Status from 'common/status'
Lib.M.auth(axios, true)

export default {
    data() {
        return {
            index: 0,
            Status,
            zxList: [],
            zcList: [],
            tkList: []
        }
    },
    components: {
        JFooter,
        NoData,
        JOrderBlock
    },
    ready() {
        let suc_count = 0
        this.index = (Lib.M.GetRequest().type - 1) || 0
        axios.get(`${Lib.C.orderApi}decorationOrders`, {
            params: {
                filter: `projectManagerId:${JSON.parse(window.localStorage.getItem('user')).userId}|status:[1,7]`
            },
            responseType: 'json'
        }).then((res) => {
            res.data.data.map((e) => {
                this.zxList.push(e)
            })
        }).catch((res) => {
            alert("获取订单失败，请稍候再试QAQ")
        })
    },
    methods: {
        getTime(timeStamp) {
            var d = new Date(timeStamp * 1000);
            var Y = d.getFullYear() + '-';
            var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-';
            var D = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate());
            return Y + M + D
        },
        viewDetail(type, orderNo) {
            eval(`window.location.href='${type}-order.html?orderNo=${orderNo}'`)
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
<style scoped lang="less">
.content {
    padding-bottom: 45px;
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
    color: #88C929 !important;
    border-color: #88C929 !important;
}
</style>
