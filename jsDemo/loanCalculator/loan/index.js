"use strict";

/*这里的脚本定义了calculate()函数，在HTML代码中绑定事件处理程序时会调用它
这个函数从input元素中读取数据，计算贷款赔付信息，并将结果显示在<span>中
同样，这里还保存了用户数据、展示了放贷人链接并绘制出了图标*/

function calculate() {

    //查找文档中用于输入输出的元素
    var amount = document.getElementById("amount");
    var apr = document.getElementById("apr");
    var years = document.getElementById("years");
    var zipcode = document.getElementById("zipcode");
    var payment = document.getElementById("payment");
    var total = document.getElementById("total");
    var totalinterest = document.getElementById("totalinterest");

    //假设所有输入都是合法的，将从input元素中获取数据
    //将百分比格式转换为小数格式，并从年利率转换为月利率
    //将年度赔付转换为月度赔付
    var principal = parseFloat(amount.value);
    var interest = parseFloat(apr.value) / 100 / 12;
    var payments = parseFloat(years.value) * 12;

    //现在计算月度赔付的数据
    var x = Math.pow(1 + interest, payments);
    var monthly = (principal * x * interest) / (x - 1);

    //如果结果没有超过范围并且用户输入正确
    //这里所展示的结果就是合法的
    if (isFinite(monthly)) {

        //将数据填充至输出字段的位置，四舍五入到小数点后两位
        payment.innerHTML = monthly.toFixed(2);
        total.innerHTML = (monthly * payments).toFixed(2);
        totalinterest.innerHTML = ((monthly * payments) - principal).toFixed(2);

        //将用户的输入数据保存下来，这样在下次访问时也能取得数据
        save(amount.value, apr.value, years.value, zipcode.value);

        //找到并展示本地放贷人，但忽略网络错误
        try {
            //捕获这段代码抛出的所有异常
            getLenders(amount.value, apr.value, years.value, zipcode.value);
        } catch (e) {
            /*忽略这些异常*/
        }

        //最后，用图表展示贷款余额、利息和资产收益
        chart(principal, interest, monthly, payments);
    } else {

        //计算结果不是数字或者是无穷大，意味着输入数据是非法或不完整
        //清空之前的输出数据
        payment.innerHTML = "";
        total.innerHTML = "";
        totalinterest.innerHTML = "";
        chart();
    }
}


//将用户的输入保存在localStorage对象的属性中
//这些属性在再次访问时还会继续保存在原来的位置
//如果你在浏览器中按照file://url的方式直接打开本地文件
//则无法在某些浏览器中使用存储功能（比如firefox）
//而通过Http打开文件是可行的

function save(amount, apr, years, zipcode) {
    if (window.localStorage) {

        //只有在浏览器支持的时候才能运行这里的代码
        localStorage.loan_amount = amount;
        localStorage.loan_apr = apr;
        localStorage.loan_years = years;
        localStorage.loan_zipcode = zipcode;
    }
}

//在文档首次加载时，将会尝试还原输入字段
window.onload = function () {
    if (window.localStorage && localStorage.loan_amount) {
        document.getElementById("amount").value = localStorage.loan_amount;
        document.getElementById("apr").value = localStorage.loan_apr;
        document.getElementById("years").value = localStorage.loan_years;
        document.getElementById("zipcode").value = localStorage.loan_zipcode;
    }
};


//将用户的输入发送至服务器端脚本（理论上）将
//放回一个本地存放放贷人的链接列表，本例没有实现这张查找功能
//但如果该服务存在，该函数会调用它
function getLenders(amount, apr, years, zipcode) {

    //如果浏览器不支持XMLHttpRequest对象，则退出
    if (!window.XMLHttpRequest) {
        return;
    }

    //找到要显示的放贷人列表的元素
    var ad = document.getElementById("lenders");
    if (!ad) {
        //如果放回空，则退出
        return;
    }

    //将用户输入的数据进行URL编码，并作为查询参数附在URL上
    var url = "getLenders.php" +
        "?amt=" + encodeURIComponent(amount) +
        "?apr=" + encodeURIComponent(apr) +
        "?yrs=" + encodeURIComponent(years) +
        "?zip=" + encodeURIComponent(zipcode);

    //通过XMLHttpRequest对象来提取返回数据
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.send(null);

    //在返回数据之前，注册一个事件处理函数，这个函数
    //将会在服务器的响应返回至客户端的时候调用
    //这种异步编程模型在客户端JavaScript中是非常常见的

    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {

            //如果代码运行到这里，说明我们得到一个合法且完整的http响应

            var response = req.responseText;

            //解析为数组
            var lenders = JSON.parse(response);

            //将数组中的放贷人对象转换为HTML字符串形式
            var list = "";
            for (var i = 0; i < lenders.length; i++) {
                list += "<li><a href='" + lenders[i].url + "'>" + lenders[i].name + "</a>";
            }

            //将数据在HTML元素中呈现出来
            ad.innerHTML = "<ul>" + list + "</ul>";
        }
    }
}


//在HTML<canvas>元素中通图标展示月度贷款余额、利息和资产收益
//如果不传入参数，则清空之前的图表数据

function chart(principal, interest, monthly, payments) {
    var graph = document.getElementById("graph");

    //用一种巧妙的手法清除并重置画布
    graph.width = graph.width;

    //如果不传入参数，或者浏览器不支持画布，则直接返回
    if (arguments.length == 0 || !graph.getContext) {
        return;
    }

    //获得画布元素的"context"对象，这个对象定义了一组绘画api
    //所有绘画都基于这个API
    var g = graph.getContext("2d");
    var width = graph.width,
        height = graph.height;

    //这里的函数作用是将付款数字和美元数据转换为像素
    function paymentToX(n) {
        return n * width / payments;
    }

    function amountToY(a) {
        return height - (a * height / (monthly * payments * 1.05));
    }

    //付款数据是一条从（0,0）到（payments,monthly*payments）的直线
    g.moveTo(paymentToX(0), amountToY(0)); //从左下方开始
    g.lineTo(paymentToX(payments), amountToY(monthly * payments)); //绘至右上方
    g.lineTo(paymentToX(payments), amountToY(0)); //再至右下方
    g.closePath(); //将结尾连接至开头
    g.fillStyle = "#f88";
    g.fill();
    g.font = "bold 12px sans-serif";
    g.fillText("Total Interest Payments", 20, 20);

    //很多资产数据并不是线性的，很难将其反应至图表中
    var equity = 0;
    g.beginPath(); //绘制新图形
    g.moveTo(paymentToX(0), amountToY(0)); //从左下方开始
    for (var p = 1; p < payments; p++) {
        //计算出每一笔赔付的利息
        var thisMonthsInterest = (principal - equity) * interest;
        equity += (monthly - thisMonthsInterest);  //得到资产额
        g.lineTo(paymentToX(p), amountToY(equity));//将数据绘制到画布上
    }

    g.lineTo(paymentToX(payments), amountToY(0));  //将数据绘制至X轴
    g.closePath();  //将线条结尾连接至线条开头
    g.fillStyle = "green";
    g.fill();
    g.fillText("Total Equity", 20, 35);

    //再次循环，余额数据显示为黑色粗线条
    var bal = principal;
    g.beginPath();
    g.moveTo(paymentToX(0), amountToY(bal));
    for (var p = 1; p <= payments; p++) {
        var thisMonthsInterest = bal * interest;
        bal -= (monthly - thisMonthsInterest); //得到资产额
        g.lineTo(paymentToX(p), amountToY(bal));//将直线连接至某点
    }
    g.lineWidth = 3;
    g.stroke();
    g.fillStyle = "red";
    g.fillText("Loan Balance", 20, 50);

    //将年度数据放在X轴做标记
    g.textAlign = "center";  //文字居中
    var y = amountToY(0);  //Y坐标设为0
    for (var year = 1; year * 12 <= payments; year++) {
        //遍历每年
        var x = paymentToX(year * 12); //计算标记位置
        g.fillRect(x - 0.5, y - 3, 1, 3);  //开始绘制标记
        if (year == 1) {
            g.fillText("Year", x, y - 5); //在坐标轴做标记
        }
        if (year % 5 == 0 && year * 12 !== payments) {
            g.fillText(String(year), x, y - 5);
        }
    }

    //将赔付数额标记在右边界
    g.textAlign = "right";
    g.textBaseline = "middle";
    var ticks = [monthly * payments, principal]; //我们将要用到的两个点
    var rightEdge = paymentToX(payments); //设置X轴
    for (var i = 0; i < ticks.length; i++) {
        var y = amountToY(ticks[i]); //计算每个标记的Y坐标
        g.fillRect(rightEdge - 3, y - 0.5, 3, 1);//绘制标记
        g.fillText(String(ticks[i].toFixed(0)), rightEdge - 5, y); //绘制文本
    }
}