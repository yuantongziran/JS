/**
 * 蜻蜓FM 响应体净化脚本 (qtfm.js)
 */

let body = $response.body;
if (!body) $done({});

try {
  let obj = JSON.parse(body);
  const url = $request.url;

  // 1. 隐藏首页签到图标
  if (url.includes('/m-bff/v1/signin/show_homepage_icon')) {
    if (obj.data) obj.data.display_icon = false;
  }
  
  // 2. 热门页面精简 (保留 IconGrid, Channel, Radio, ListenListChannel)
  else if (url.includes('/recommendapi/') && url.includes('/hotpage')) {
    if (obj.data) {
      if (Array.isArray(obj.data.head)) {
        obj.data.head = obj.data.head.filter(item => item.type === "IconGrid");
      }
      if (Array.isArray(obj.data.feeds)) {
        obj.data.feeds = obj.data.feeds.filter(item => 
          item.type === "Channel" || item.type === "Radio" || item.type === "ListenListChannel"
        );
      }
    }
  }
  
  // 3. 播放页去推荐/相关栏目
  else if (/\/m-bff\/v\d\/channel\/\d{6}\/playpage\/\d{8}/.test(url)) {
    if (obj.data) {
      delete obj.data.related_recommend;
      delete obj.data.recommend_bar;
    }
  }
  
  // 4. 我的收听页去 Banner
  else if (url.includes('/m-bff/') && url.includes('/mylistenpage')) {
    if (obj.data) {
      delete obj.data.banner;
    }
  }
  
  // 5. 订阅频道页去推荐
  else if (url.includes('/m-bff/') && url.includes('/subscribed_channels')) {
    if (obj.data) {
      delete obj.data.recommends;
    }
  }
  
  // 6. 频道详情页去 VIP 推荐和投放推荐
  else if (/\/m-bff\/v1\/channelpage\/\d+/.test(url)) {
    if (obj.data) {
      delete obj.data.vip_recommend;
      delete obj.data.recommend_delivery;
    }
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({});
}
