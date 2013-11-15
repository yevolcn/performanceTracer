![alt logo](chrome-extension/icon128.png "Title")
performanceTracer
=================

查看performance API 耗时统计

##注意事项

__请在所有异步请求完成后再点击chrome上的插件按钮，以确保数据正确__
<br/><br/>
__因为：Navigation Timing stops at the window.onload event<br/>
到目前为止Navigation Timming统计的数据在window.onload事件发生后就直接终止了，而没有统计到所有网络活动完成后的一个事件，应该要有一个类似于 “end of network activity”这样的事件后统计timming__

##使用方法

####1、直接在html文件中引用
<pre><code>"performance-min.js"
</code></pre>

####2、安装chrome插件
由于chrome商店发布应用要收money，本人是穷X，就不发布了
直接从crx文件夹内下载performance-tracer.crx 文件<br/>
打开chrome在地址栏输入chrome://extensions/打开插件管理页<br/>
再将下载的.crx拖到插件管理页内即可安装。<br/>

###效果图
![alt text](screenshot.png "Title")

###performance timming时段结构图参考
<br /><br /><br /><br />

![alt text](timing-overview.png "Title")


