/**
 * performanceTracer.js
 * author: willian.xiaodong
 * email: willian12345@126.com
 * Date: 2013-11-09
 */

;+function(host){
    'use strict';
    var performance = host.performance
    , timing, readyStart, redirectTime,appcacheTime
    ,unloadEventTime,lookupDomainTime,connectTime
    ,requestTime,initDomTreeTime,domReadyTime,loadEventTime,loadTime
    ,getEl
    ,setPercent
    ,initDom
    ,domStr = '<style type="text/css">.anim{-moz-transform: translateX(900px);-ms-transform: translateX(900px);-webkit-transform: translateX(900px);transform: translateX(900px);-webkit-transition: -webkit-transform .5s;-moz-transition: -moz-transform .5s;-ms-transition: -ms-transform .5s;transition: transform .5s;}.performanceTracer{position: absolute;z-index: 20000;top: 0;left: -900px;height: 400px;width: 900px;background: rgba(0,0,0,.8);font-size: 14px;color: white;font-weight: bold;text-shadow: 2px 2px 2px black, -2px -2px 2px black;}#performanceTracer-close{position: absolute;top: 0;right: 0;border: 3px solid white;width: 20px;height: 20px;border-radius: 20px;line-height: 20px;text-align: center;font-family: \'Open Sans\',arial,sans-serif;font-size: 16px;background: white;color: black;text-shadow: none;cursor: pointer;}.performanceTracer h1{text-align: center;}.performanceTracer h2{position: absolute; top:30px; margin:0; right: 20px;opacity: .3;text-shadow: none;font-style: italic;}.performanceTracer-wrap{position: absolute;top: 50%;left: 50%;width: 96%;height: 96%;color: white;}.performanceTracer-content{position: absolute;top: -50%;left: -50%;width: 100%;height: 100%;}.performanceTracer ul{list-style: none;margin: 30px;padding: 0;}.performanceTracer li{clear: both;line-height: 20px;height: 20px;}.performanceTracer-lab, .performanceTracer-bar{display: inline-block;height: 16px;float: left;}.performanceTracer-lab{width: 30%;text-align: right;margin-right: 20px;}.performanceTracer-bar{width: 50%;}.performanceTracer-color{display: inline-block;height: 16px;width: 0%;background: #666;box-shadow: 2px 2px 2px black;border-radius: 0 2px 2px 0;-webkit-transition: width .5s .6s;-moz-transition: width .5s .6s;-ms-transition: width .5s .6s;transition: width .5s .6s;float: left;}.performanceTracer-bar-value{float: left;margin-left: 10px;}.performanceTracer-color-b{background: #2D8ED0;}.performanceTracer-color-r{background: #F40F03;}.performanceTracer-color-r1{background: #F66603;}.performanceTracer-color-o{background: #F89F05;}.performanceTracer-color-o1{background: #FAD304;}.performanceTracer-color-y{background: #FAD304;}.performanceTracer-color-g1{background: #F8FE03;}.performanceTracer-color-g2{background: #B1DF06;}.performanceTracer-color-g{background: #44D10F;}.performanceTracer-color-p{background: #AB76E0;}</style><div class="performanceTracer" id="performanceTracer"><div class="performanceTracer-wrap"><div class="performanceTracer-content"><ul><li id="performanceTracer-readyStart"><span class="performanceTracer-lab">准备新页面时间耗时: </span><span class="performanceTracer-bar"><em class="performanceTracer-color performanceTracer-color-b"></em><span class="performanceTracer-bar-value">0ms</span></span></li><li id="performanceTracer-redirectTime"><span class="performanceTracer-lab">redirect 重定向耗时: </span><span class="performanceTracer-bar"><em class="performanceTracer-color performanceTracer-color-r"></em><span class="performanceTracer-bar-value">0ms</span></span></li><li id="performanceTracer-appcacheTime"><span class="performanceTracer-lab">Appcache 耗时: </span><span class="performanceTracer-bar"><em class="performanceTracer-color performanceTracer-color-r1"></em><span class="performanceTracer-bar-value">0ms</span></span></li><li id="performanceTracer-unloadEventTime"><span class="performanceTracer-lab">unload 前文档耗时: </span><span class="performanceTracer-bar"><em class="performanceTracer-color performanceTracer-color-o"></em><span class="performanceTracer-bar-value">0ms</span></span></li><li id="performanceTracer-lookupDomainTime"><span class="performanceTracer-lab">DNS 查询耗时: </span><span class="performanceTracer-bar"><em class="performanceTracer-color performanceTracer-color-o1"></em><span class="performanceTracer-bar-value">0ms</span></span></li><li id="performanceTracer-connectTime"><span class="performanceTracer-lab">TCP连接耗时: </span><span class="performanceTracer-bar"><em class="performanceTracer-color performanceTracer-color-y"></em><span class="performanceTracer-bar-value">0ms</span></span></li><li id="performanceTracer-requestTime"><span class="performanceTracer-lab">request请求耗时: </span><span class="performanceTracer-bar"><em class="performanceTracer-color performanceTracer-color-g1"></em><span class="performanceTracer-bar-value">0ms</span></span></li><li id="performanceTracer-initDomTreeTime"><span class="performanceTracer-lab">请求完毕至DOM加载: </span><span class="performanceTracer-bar"><em class="performanceTracer-color performanceTracer-color-g2"></em><span class="performanceTracer-bar-value">0ms</span></span></li><li id="performanceTracer-domReadyTime"><span class="performanceTracer-lab">dom processing dom树耗时: </span><span class="performanceTracer-bar"><em class="performanceTracer-color performanceTracer-color-g"></em><span class="performanceTracer-bar-value">0ms</span></span></li><li id="performanceTracer-loadEventTime"><span class="performanceTracer-lab">dom load事件耗时: </span><span class="performanceTracer-bar"><em class="performanceTracer-color performanceTracer-color-p"></em><span class="performanceTracer-bar-value">0ms</span></span></li></ul><h1>总耗时: <em id="performanceTracer-loadTime"></em></h1><h2>performanceTracer (alpha)</h2><div id="performanceTracer-close">x</div></div></div></div>'
    ,panel
    ;
    getEl = function(str){
        return document.getElementById(str);
    };
    setPercent = function (id, minSec) {
        var el = getEl('performanceTracer-'+id);
        var per = Math.round(minSec/loadTime * 100);
        if(per){
            per = per * .8;
        }
        el.querySelector('.performanceTracer-color').style.width = per + '%';
        el.querySelector('.performanceTracer-bar-value').innerHTML = minSec + 'ms';
    };
    initDom = function (){
        var c;
        panel = getEl('performanceTracer');
        if(!panel){
            c = document.createElement('div');
            c.innerHTML = domStr;
            document.body.appendChild(c);
            panel = getEl('performanceTracer');
        }
    };
    setTimeout(function(){
        if(performance){
            timing = performance.timing;
            console.log(performance.timing);
            readyStart = timing.fetchStart - timing.navigationStart;
            redirectTime = timing.redirectEnd  - timing.redirectStart;
            appcacheTime = timing.domainLookupStart  - timing.fetchStart;
            unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
            lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;
            connectTime = timing.connectEnd - timing.connectStart;
            requestTime = timing.responseEnd - timing.requestStart;
            initDomTreeTime = timing.domInteractive - timing.responseEnd;
            domReadyTime = timing.domComplete - timing.domInteractive;
            loadEventTime = timing.loadEventEnd - timing.loadEventStart;
            loadTime = timing.loadEventEnd - timing.navigationStart;

            initDom();

            getEl('performanceTracer-loadTime').innerHTML = '('+ loadTime +')ms';

            console.log('准备新页面时间耗时: ' + readyStart);
            console.log('redirect 重定向耗时: ' + redirectTime);
            console.log('Appcache 耗时: ' + appcacheTime);
            console.log('unload 前文档耗时: ' + unloadEventTime);
            console.log('DNS 查询耗时: ' + lookupDomainTime);
            console.log('TCP连接耗时: ' + connectTime);
            console.log('request请求耗时: ' + requestTime);
            console.log('请求完毕至DOM加载: ' + initDomTreeTime);
            console.log('解释dom树耗时: ' + domReadyTime);
            console.log('load事件耗时: ' + loadEventTime);
            console.log('从开始至load总耗时: ' + loadTime);

            setTimeout(function () {
                document.querySelector('.performanceTracer').classList.add('anim');
                setPercent('readyStart', readyStart);
                setPercent('redirectTime', redirectTime);
                setPercent('appcacheTime', appcacheTime);
                setPercent('unloadEventTime', unloadEventTime);
                setPercent('lookupDomainTime', lookupDomainTime);
                setPercent('connectTime', connectTime);
                setPercent('requestTime', requestTime);
                setPercent('initDomTreeTime', initDomTreeTime);
                setPercent('domReadyTime', domReadyTime);
                setPercent('loadEventTime', loadEventTime);
                getEl('performanceTracer-close').addEventListener('click', function(){
                    panel.parentNode.parentNode.removeChild(panel.parentNode);
                });
            }, 20);
        }else{
            console.log('no performance api');
        }
    }, 500);
}(this);