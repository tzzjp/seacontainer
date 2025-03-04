//wgs84_to_gcj02.js文件
 
//地标 转 国测 常量
// var x_PI = (3.14159265358979324 * 3000.0) / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0; //卫星椭球坐标投影到平面地图坐标系的投影因子。  
var ee = 0.00669342162296594323; //椭球的偏心率。
 
 
//判断是否在国内，在中国国内的经纬度才需要做偏移
function out_of_china(lng, lat) {
    return (
        lng < 72.004 ||
        lng > 137.8347 ||
        (lat < 0.8293 || lat > 55.8271 || false)
    );
}
 
//转化经度
// function transformlng(lng, lat) {
//     var ret =
//         300.0 +
//         lng +
//         2.0 * lat +
//         0.1 * lng * lng +
//         0.1 * lng * lat +
//         0.1 * Math.sqrt(Math.abs(lng));
//     ret +=
//         ((20.0 * Math.sin(6.0 * lng * PI) +
//             20.0 * Math.sin(2.0 * lng * PI)) *
//             2.0) /
//         3.0;
//     ret +=
//         ((20.0 * Math.sin(lng * PI) +
//             40.0 * Math.sin((lng / 3.0) * PI)) *
//             2.0) /
//         3.0;
//     ret +=
//         ((150.0 * Math.sin((lng / 12.0) * PI) +
//             300.0 * Math.sin((lng / 30.0) * PI)) *
//             2.0) /
//         3.0;
//     return ret;
// }
 
// //转化纬度
// function transformlat(lng, lat) {
//     var ret =
//         -100.0 +
//         2.0 * lng +
//         3.0 * lat +
//         0.2 * lat * lat +
//         0.1 * lng * lat +
//         0.2 * Math.sqrt(Math.abs(lng));
//     ret +=
//         ((20.0 * Math.sin(6.0 * lng * PI) +
//             20.0 * Math.sin(2.0 * lng * PI)) *
//             2.0) /
//         3.0;
//     ret +=
//         ((20.0 * Math.sin(lat * PI) +
//             40.0 * Math.sin((lat / 3.0) * PI)) *
//             2.0) /
//         3.0;
//     ret +=
//         ((160.0 * Math.sin((lat / 12.0) * PI) +
//             320 * Math.sin((lat * PI) / 30.0)) *
//             2.0) /
//         3.0;
//     return ret;
// }
 
//wgs84 to gcj02   地球坐标系 转 火星坐标系
// export function wgs84_to_gcj02(lng, lat) {
//     if (out_of_china(lng, lat)) {
//         return [lng, lat];
//     } else {
//         var dlat = transformlat(lng - 105.0, lat - 35.0);
//         var dlng = transformlng(lng - 105.0, lat - 35.0);
//         var radlat = (lat / 180.0) * PI;
//         var magic = Math.sin(radlat);
//         magic = 1 - ee * magic * magic;
//         var sqrtmagic = Math.sqrt(magic);
//         dlat =
//             (dlat * 180.0) /
//             (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
//         dlng =
//             (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
//         var mglat = lat + dlat;
//         var mglng = lng + dlng;
 
//         return [mglng, mglat];
//     }
// }
function transformlat(lon, lat) {
    var PI = 3.14159265358979324;
    var ret = -100.0 + 2.0 * lon + 3.0 * lat + 0.2 * lat * lat + 0.1 * lon * lat + 0.2 * Math.sqrt(Math.abs(lon));
    ret += (20.0 * Math.sin(6.0 * lon * PI) + 20.0 * Math.sin(2.0 * lon * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret;
}

function transformlon(lon, lat) {
    var PI = 3.14159265358979324;
    var ret = 300.0 + lon + 2.0 * lat + 0.1 * lon * lon + 0.1 * lon * lat + 0.1 * Math.sqrt(Math.abs(lon));
    ret += (20.0 * Math.sin(6.0 * lon * PI) + 20.0 * Math.sin(2.0 * lon * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lon * PI) + 40.0 * Math.sin(lon / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lon / 12.0 * PI) + 300.0 * Math.sin(lon / 30.0 * PI)) * 2.0 / 3.0;
    return ret;
}
 
//gcj02 to wgs84  火星坐标系 转 地球坐标系
export function gcj02_to_wgs84(lon, lat) {
    if (out_of_china(lon, lat)) {
        return [lon, lat]
    }
    else {
        
            // var PI = 3.14159265358979324;
            // var a = 6378245.0;
            // var ee = 0.00669342162296594323;
            var dlat = transformlat(lon - 105.0, lat - 35.0);
            var dlon = transformlon(lon - 105.0, lat - 35.0);
            var radlat = lat / 180.0 * PI;
            var magic = Math.sin(radlat);
            magic = 1 - ee * magic * magic;
            var sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
            dlon = (dlon * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
            var mglon = lon + dlon;
            var mglat = lat + dlat;
            
            return [lon * 2 - mglon, lat * 2 - mglat];
        
    }
}
export function convertToBD09(lng, lat) {
    var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    var x = lng, y = lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat];
}