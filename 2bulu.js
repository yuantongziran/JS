let body = $response.body;

if (body) {
    try {
        let obj = JSON.parse(body);

        if (obj.configData) {
            let configData = typeof obj.configData === 'string' 
                ? JSON.parse(obj.configData) 
                : obj.configData;

            const keysToRemove = [
                "adPlatform",
                "adIntertitialShowType",
                "adsConfig",
                "adIntertitialDisplayedLimit",
                "adSplashShowTypeWhenHotStart",
                "adIntertitialDayDisplayedMaxCount",
                "od_adsType",
                "showMeBaiHeAdView"
            ];

            keysToRemove.forEach(key => delete configData[key]);

            obj.configData = JSON.stringify(configData);
        }

        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        console.log("2步路响应解析失败: " + e);
        $done({});
    }
} else {
    $done({});
}
