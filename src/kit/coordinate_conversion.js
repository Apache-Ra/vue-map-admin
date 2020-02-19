/**
 * 地图坐标转换
 * AMap为百度转换成高德地图，参数为（aaaa.aa, bb.asdasdsadsad）
 * Bmap为高德转换成百度地图
 * test
 */
class coordinate_conversion {
  constructor() {
  }

  AMap(data) {
    const newData = data.split(',');
    const bd_lat = newData[0], bd_lon = newData[1]
    const PI = 3.14159265358979324 * 3000.0 / 180.0;
    const x = bd_lon - 0.0065, y = bd_lat - 0.006;
    const z = Math.sqrt(x*x + y*y) - 0.00002 * Math.sin(y*PI);
    const theta = Math.atan2(y,x) - 0.000003 * Math.cos(x*PI);
    const gd_lat_lon_X = z*Math.cos(theta);
    const gd_lat_lon_Y = z*Math.sin(theta);
  }
  BMap(data){}
}

export default AMap_conversion
