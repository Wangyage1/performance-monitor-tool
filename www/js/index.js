
window.onload = () => {
    const pMonitor = {};
    //获取页面的加载时长
    pMonitor.getDomComplete = () => {
        const navigation = performance.getEntriesByType('navigation')[0];
        //页面加载时长
        const domComplete = navigation.domComplete;
        //解析dom树耗时
        const parseDom = navigation.domComplete - navigation.domInteractive;
        return domComplete;
    }

    //获取超时请求, 请求详情
    pMonitor.getOvertimeResource = (overtime) => {

        const resource = performance.getEntriesByType('resource');
        let overtimeResource = [], time;
        for(var i = 0; i < resource.length; i++) {
            //获取到每一条请求的加载时长
            time = resource[i].duration;
            if (time > overtime) { //如果超时
                overtimeResource.push({
                    name: resource[i].name,
                    loadTime: time, //请求时长
                    tcp: resource[i].connectEnd - resource[i].connectStart, //TCP 建立连接到完成握手的时长
                    dns: resource[i].domainLookupEnd - resource[i].domainLookupStart, // DNS 解析时长
                    download: resource[i].responseEnd - resource[i].responseStart 
                });
            }
            
        }
        return overtimeResource;
    }

    //发送一个ajax请求上报到服务器端
    $.ajax({
        url: '/abnormal',
        type: 'POST',
        data: {
            domComplete: pMonitor.getDomComplete,
            overtimeResource: pMonitor.getOvertimeResource(300)
        },
        success: (data) => {
            console.log('ajax success');
        },
        error: (data) => {
            console.log('ajax error');
        }
    })
    
}
