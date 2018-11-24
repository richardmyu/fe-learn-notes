[toc]

### 方法库

@(前端笔记)[javascript, 库]



##### 1.public库
```l
    var $=(function () {
    var flag="getComputedStyle" in window;
    //true:标准浏览器
    //false:低版本浏览器

    //1.toArray:将类数组转数组
    //参数likeArray:类数组
    //返回值return:数组
    function toArray(likeArray) {
        try {
            return [].slice.call(likeArray);
        }catch (e){
            var ary=[];
            for(var i=0;i<likeArray.length;i++){
                ary.push(likeArray[i])
            }
            return ary;
        }
    };

    //2.toJSONObj:将JSON字符串变成JSON对象
    //参数JSONStr:JSON字符串
    //返回值return:JSON对象
    function toJSONObj(JSONStr) {
        try {
            return JSON.parse(JSONStr);
        }catch (e){
            return eval("("+JSONStr+")");
        }
    };

    //3.win:求浏览器的盒子模型
    //参数(attr):获取      有返回值
    //参数(attr,val):设置   没有返回值
    function win(attr,val) {
        if(typeof val =="undefined"){
            return document.documentElement[attr]||document.body[attr]
        }else {
            document.documentElement[attr]=val;
            document.body[attr]=val;
        }
    };

    //4.offset:获取元素距离body的偏移量
    //参数curEle:当前元素
    //返回值return:{left:值,top:值,}
    function offset(curEle) {
        var p=curEle.offsetParent;
        var l=curEle.offsetLeft;
        var t=curEle.offsetTop;
        while (p){
            if(!window.navigator.userAgent.includes("MSIE 8")){
                l+=p.clientLeft;
                t+=p.clientTop;
            }
            l+=p.offsetLeft;
            t+=p.offsetTop;
            p=p.offsetParent;
        }
        return{left:l,top:t};
    };

    //5.getRandom:获取随机数
    //参数(n,m)
    //      n>m:获取m到n的随机数
    //      n,m:其中有一个不是一个数,返回0-1的随机小数
    function getRandom(n,m) {
        n=Number(n);
        m=Number(m);
        if(isNaN(n)||isNaN(m)){
            return Math.random();
        }
        if(n>m){
            // var t=n;
            // n=m;
            // m=t;
            n=m+n;
            m=n-m;
            n=n-m;
        }
        return Math.round(Math.random()*(m-n)+n);
    };

    //6.getCss:获取样式属性值
    //参数(curEle,attr):curEle当前元素,attr样式属性
    //返回值:样式属性值
    function getCss(curEle,attr) {
        var val=null;
        if("getComputedStyle" in window){
            val=window.getComputedStyle(curEle)[attr];
        }else {
            if(attr=="opacity"){
                val=curEle.currentStyle["filter"];
                var reg=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/g;
                val=reg.test(val)?RegExp.$1/100:1;
            }else {
                val=curEle.currentStyle[attr];
            }
        }
        var reg=/^-?\d+(?:\.\d+)?(?:px|pt|pp|rem|em|deg)?$/;
        val=reg.test(val)?parseFloat(val):val;
        return val;
    };

    //7.setCss:设置样式属性值
    //参数(curEle,attr,val):curEle当前元素,attr样式属性,val属性值
    //返回值:无
    function setCss(curEle,attr,val) {
        if(attr==="opacity"){
            curEle.style.opacity=val;
            curEle.style.filter="alpha(opacity="+val*100+")";
            return;
        }
        if(attr==="float"){
            curEle.style.cssFloat=val;
            curEle.style.styleFloat=val;
            return;
        }
        var reg=/^(width|height|top|left|right|bottom|(margin|padding)(Right|Left|Top|Bootom))$/g;
        if(reg.test(attr)&&!isNaN(val)){
            val+="px";
        }
        curEle.style[attr]=val;
    };

    //8.setGroupCss:批量设置CSS样式
    //参数(curEle,cssObj)
    //返回值:无
    function setGroupCss(curEle,cssObj) {
        cssObj=cssObj||[];
        if(cssObj.toString()==="[object Object]"){
            for(var key in cssObj){
                this.setCss(curEle,key,cssObj[key]);
            }
        }
    };

    //9.css:获取/设置css属性
    //三个参数:设置
    //俩个参数: 第二个参数是个对象   --> 批量设置
    //         第二个参数不是个对象 --> 获取 有返回值
    function css() {
        if(arguments.length===3){
            //apply不仅可以传数组还可以传类数组,比如:arguments
            this.setCss.apply(this,arguments);
            return;
        }
        if(arguments.length==2){
            if(arguments[1].toString()=="[object Object]"){
                this.setGroupCss.apply(this,arguments);
                return;
            }else {
                return this.getCss.apply(this,arguments);
            }
        }
    };

    //10.hasClass()判断元素中有没有某个类名
    //参数(curEle,classStr)
    //返回值:true/false
    function hasClass(curEle,classStr) {
        return new RegExp("(^| +)"+classStr+"( +|$)").test(curEle.className);
    };

    //11addClass:给一个元素增加一个或者多个class名
    function addClass(curEle,classStr) {
        var ary=classStr.replace(/^ +| +$/g,'').split(/ +/g);
        ary.forEach(function (item) {
            if(!this.hasClass(curEle,item)){
                curEle.className+=(" "+item);
            }
        },this)
    }

    //12:removeClass:删除Class名
    function removeClass(curEle,classStr) {
        var ary=classStr.replace(/^ +| +$/g,'').split(/ +/g);
        ary.forEach(function (item) {
            if(this.hasClass(curEle,item)){
                curEle.className=curEle.className.replace(item,"")
            }
        },this)
    }

    //13.toggleClass:之前有是删除,没有是增加
    function toggleClass(curEle,classStr) {
        var ary=classStr.replace(/^ +| +$/g).split(/ +/g);
        ary.forEach(function (item) {
            this.hasClass(curEle,item)?this.removeClass(curEle,item):this.addClass(curEle,item);
        },this)
    }

    //14.prev:获取哥哥元素节点
    function prev(curEle) {
        if(flag){
            return curEle.previousElementSibling;
        }
        var pre=curEle.previousSibling;
        //只有元素节点的nodeType是1
        while (pre&&pre.nodeType!==1){
            pre=pre.previousSibling;
        }
        return pre;
    }

    //15.获取弟弟元素节点
    function next(curEle) {
        if(flag){
            return curEle.nextElementSibling;
        }else {
            var nex=curEle.nextSibling;
            while (nex&&nex.nodeType!==1){
                nex=nex.nextSibling;
            }
            return nex;
        }
    }

    //16.获取所有的哥哥
    function prevAll(curEle) {
        var ary=[];
        var pre=this.prev(curEle);
        while (pre){
            ary.unshift(pre);
            pre=this.prev(pre);
        }
        return ary;
    }

    //17.获取所有的弟弟
    function nextAll(curEle) {
        var ary=[];
        var nex=this.next(curEle);
        while (nex){
            ary.push(nex);
            nex=this.next(nex);
        }
        return ary;
    }

    //18.获取相邻的兄弟 上一个哥哥+下一个弟弟
    function sibling(curEle) {
        var ary=[];
        var pre=this.prev(curEle);
        var nex=this.next(curEle);
        pre?ary.push(pre):null;
        nex?ary.push(nex):null;
        return ary;
    }

    //19.获取所有的兄弟  所有的哥哥+所有的弟弟
    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle));
    }

    //20.获取当前元素的索引,哥哥的个数
    function index(curEle) {
        return this.prevAll(curEle).length;
    }

    return{
        toArray:toArray,
        toJSONObj:toJSONObj,
        win:win,
        offset:offset,
        getRandom:getRandom,
        getCss:getCss,
        setCss:setCss,
        setGroupCss:setGroupCss,
        css:css,
        hasClass:hasClass,
        addClass:addClass,
        removeClass:removeClass,
        toggleClass:toggleClass,
        prev:prev,
        next:next,
        prevAll:prevAll,
        nextAll:nextAll,
        sibling:sibling,
        siblings:siblings,
        index:index,
    }
})();
```

##### 2.animation库

```l
    Element.prototype.animation=function () {
    //this,当前执行动画的元素

    var _this=this;
    var target,begin={},duration,interval,time=0,timer=null,effect,cbAry=[],numAry=[];
    for (var i=0;i<arguments.length;i++){
        if (arguments[i].toString()=="[object Object]"){
            target=arguments[i];
        }else if(typeof arguments[i]=="function"){
            cbAry.push(arguments[i])
        }else if(typeof arguments[i]=="number"){
            numAry.push(arguments[i])
        }
    }
    target=target||{};
    for(var i=0;i<numAry.length;i++){
        if (numAry[i]>100){
            duration=numAry[i];
            numAry.splice(i,1);
            i--;
        }
    }
    duration=duration||2000;
    interval=numAry[0]||17;

    effect=(isNaN(numAry[1])||numAry[1]>24)?0:numAry[1];
    for (var key in target){
        begin[key]=$.css(this,key)
    }

    var Effect = {
       ...
    };

    var effectAry=[];
    for (var key in Effect ){
        effectAry.push(Effect[key])
    };

    timer=window.setInterval(function () {
        time+=interval;
        if(time>=duration){
            window.clearInterval(timer);
            for (var key in target){
                $.css(_this,key,target[key]);
            }
            cbAry.forEach(function (item) {
                item.call(this);
            },_this);
            return;
        }
        for(var key in target){
            $.css(_this,key,effectAry[effect](time,begin[key],target[key]-begin[key],duration));
        }
    },interval);
    return this;//链式写法原理 return this
};
```
