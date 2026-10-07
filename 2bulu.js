// 两步路广告字段剔除脚本
let body = JSON.parse($response.body);
if (body && body.configData) {
  let config = typeof body.configData === 'string' ? JSON.parse(body.configData) : body.configData;

  delete config.adPlatform;
  delete config.adIntertitialShowType;
  delete config.adsConfig;
  delete config.adIntertitialDisplayedLimit;
  delete config.adSplashShowTypeWhenHotStart;
  delete config.adIntertitialDayDisplayedMaxCount;
  delete config.od_adsType;
  delete config.showMeBaiHeAdView;

  body.configData = JSON.stringify(config);
}
$done({ body: JSON.stringify(body) });
