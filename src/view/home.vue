<template>
  <div class="map" id="container"></div>
</template>
<script>
  import MapLoader from '../kit/AMap'
  import {mapState} from 'vuex'
  import _ from 'lodash'

  // 初始化地图
  const initAMap = (mapData) =>{
    MapLoader().then(AMap => {
      console.log('地图加载成功');
      // 创建实例
      let map = new AMap.Map('container');
      // 传入经纬度，设置地图中心点
      let position = [121.417136,31.217723];
      map.setCenter(position);
      // 置地图级别，级别为数字  PC上，参数zoom可设范围：[3,18]；  移动端：参数zoom可设范围：[3,19]
      map.setZoom(18);
      // 地图多维度撒点
      mapDistributed(map,mapData);

    }, e => {
      console.log('地图加载失败', e);
    })
  }
  // 地图撒点
  const mapDistributed =(map, mapData) =>{

    _.forEach(mapData, (item, i) => {
      let marker = new AMap.Marker({
        map: map,
        icon: '',
        name: item.name,
        type: item.type,
        status: item.status,
        position: [item.position[0], item.position[1]]
      });
      // 图表信息带入方法
      marker.item = item;
      marker.map = map;
      // 点位触发事件
      marker.on('click', markerClick);
    })
  }
  // 坐标点的点击事件
  const markerClick = (e) =>{
    new AMap.InfoWindow({
      content:e.target.item.name,
    }).open(e.target.map,e.lnglat)
  }

  // 自定义信息化窗体
  const customizeForm = () =>{

  }
  export default {
    name: "home",
    inject: ['reload'],
    computed: {
      ...mapState({
        showLoader: state => state.vux.showLoader,
      })
    },
    data() {
      return {
        map: null,
      }
    },
    created(){
    },
    mounted() {
      let vue = this;
      // 模拟假数据
      const mapData = [
        {name: '中山公园地铁站', type: '2', status: 0, position: [121.415729,31.218003]},
        {name: '联通大厦西门',  type: '2', status: 1, position:[121.416496,31.217338]},
        {name: '上海多媒体产业园',  type: '1', status: 0, position:[121.417762,31.217724]},
        {name: '新华书店', type: '1', status: 1, position:[121.416555,31.217912]},
        {name: '上海龙之梦',  type: '3', status: 1, position: [121.41714,31.218751]}
      ]
      initAMap(mapData);
    },
    methods:{

    }
  }
</script>

<style scoped lang="less">
.map{width: 100%;height: 100%;}
</style>
