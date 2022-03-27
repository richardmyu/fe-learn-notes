# HTML5

## 新标签

```js
<header><!--头部-->
    <nav></nav><!--导航-->
    <main><!--主体-->
        <section></section><!--区块-->
        <section></section>
        <article></article><!--文章-->
        <aside></aside><!--侧边栏，广告-->
        <figure><!--配图块-->
            <img src="" alt="">
            <figcaption></figcaption><!--配图说明-->
        </figure>
        <hygroup><!--一组标题-->
            <h1></h1>
            <h2></h2>
        </hygroup>
        <progress max="100" value="50"></progress><!--进度条-->
        <time>12:00</time><!--时间标记-->
        <mark>O(∩_∩)O 哈哈哈~</mark><!--高亮文本-->
        <input type="text" list="i">
        <datalist id="i"><!--配合 input 的隐藏列表，可以输入，也可以选择-->
            <option value="小明"></option><!--选项-->
            <option value="小兰"></option>
            <option value="小写"></option>
        </datalist>
        <details><!--隐藏列表，配合 summary 使用，只能选择，不能输入-->
            <summary>today</summary><!--标题-->
            <ul>
                <li>1</li><!--选项-->
                <li>2</li>
                <li>3</li>
            </ul>
        </details>
    </main>
</header>
<footer></footer><!--尾部-->
```

## 表单元素

- 1.HTML5 表单的属性

`autocomplete`

自动填充（即输入提示（之前输入的内容））

`autofocus`

打开页面自动获取焦点；

`form`

让表单之外的表单元素也属于指定表单；（设置表单元素的 form，指向特定的 form；）

`width,height`

只存在于 type 为 img 的 input 表单元素中；

`list`

可以选择，可以输入；配合`datalist`；

`file`

选择文件；选择多个文件：`multiple`；

`required`

必填选项；

```js
<form autocomplete="on" id="form1">
    <label for="user">用户</label>
    <input name="user" type="text" id="user" autofocus>
    <input type="submit" autofocus>
    <br>
    <input type="image" src="">
    <!--选择-->
    <select name="" id="">
        <option label="11" value="1"></option>
        <option label="22" value="2"></option>
        <option label="33" value="3"></option>
        <option label="44" value="4"></option>
    </select>
    <!--可以输入，也可以选择-->
    <input type="number" list="num_list">
    <datalist id="num_list">
        <option label="11" value=""></option>
        <option label="22" value=""></option>
        <option label="33" value=""></option>
        <option label="44" value=""></option>
    </datalist>
    <input type="file" multiple>
</form>
<input name="age" type="text" form="form1">
```

- 2. 表单元素的 type 类型

```js
    <form action="">
    //action: 跳转地址，不写默认是自身

    // 文本：
    <input type="text"><br>

    // 网址：
    <input type="url"><br>

    // 邮箱：
    <input type="email"><br>

    // 密码：
    <input type="password"><br>

    // 数字：
    <input type="number" max="10" min="0" step="3"><br>

    // 色卡：
    <input type="color"><br>

    // 电话：
    <input type="tel" value=""><br>

    // 日期（年-月-日）:
    <input type="date"><br>

    // 日期（时-分）:
    <input type="time"><br>

    // 日期（年-月-日-时-分）:
    <input type="datetime-local"><br>

    // 日期（年-月）:
    <input type="month"><br>

    // 日期（年-周）:
    <input type="week"><br>

    // 范围：
    <input type="range"><br>

    // 重置：
    <input type="reset"><br>

    // 默认提交按钮：
    <input type="submit"><br>
</form>
```

- 3. 表单元素事件：

  1).`onfocus`

获取焦点

2).`onblur`

失去焦点

3).`pattren`

在表单元素中的正则表达，用来匹配输入的信息是否符合规范；

4).`valid`

匹配符合时为 true；

5).`novalidate`

让表单不作校验

6).`window.location.href`

拿到当前页面的 url 地址；

7).`window.decodeURIComponent`

解析 url 地址

8).`user.setCustomValidity`

("请输入正确用户名");

- 4.HTML5 表单验证属性

  1).`Required`

```js
//Required 属性主要防止域为空时提交表单。该属性不需要设置任何值。

//语法：<input type="text" required />
```

2).`Pattern`

```js
//Pattern 属性的作用是实现元素的验证。它支持使用正则表达式定制验证规则。

//语法：<input type="text" pattern="13[0-9]\d{8}">
```

3).`Min` 和 `Max`

```js
//min、max 和 step 属性用于为包含数字或日期的 input 类型规定限定。

//语法：<input type="number" min="1" max="5">
```

4).`Minlength` 和 `Maxlength`

```js
//Minlength 和 Maxlength 属性的作用是定制元素允许的最小字符串和最大字符串。

//语法：<input type="text" minlength="1" maxlength="5">
```

5).`Validity`

```js
//在 HTML5 提供的有关表单验证的新特性中，提供了一个 validity 属性。该属性是利用 ValidityState 对象描述指定元素的有效状态。

//ValidityState 对象代表了有效状态，可以实现对指定元素进行约束验证功能，该对象提供了一系列的属性，这些属性用于描述指定元素的有效状态。

//如何获取 ValidityState 对象，使用其提供的属性内容：
//语法：指定元素 . validity 可以得到 ValidityState 对象
//例子：Ele .validity . valid
```

- 5. 验证状态

  5).`valid`

```js
//执行完毕，我们会得到一个布尔值，它表示表单控件是否已通过了所有的验证约束条件。
//可以把 valid 特性看做是最终验证结果：如果所有约束条件都通过了，Valid 的值就是 true。否则，只要有一项约束没通过，valid 的值都是 false。

    if( username.validity.valid ){
        alert(‘通过‘);
    } else {
        alert(‘用户名称有问题‘);‘
    }
```

6).`valueMissing`

```js
//如果表单控件设置了 required 特性，那么在用户填写完或者通过代码调用方式填值之前，控件会一直处于无效状态。例如：空的文本输入框无法通过必填检查，除非在其中输入任意文本。输入值为空时，valueMissing 会返回 true。

    if (username.validity.valueMissing ){
        alert(‘用户名称不能为空‘);
    } else {
        alert(‘通过‘);
    }
```

7).`typeMismatch`

```js
//如果输入语法不符合指定的类型，那么这个状态就是 true。
//例如：email 类型输入元素的内容不是电子邮件地址。

    if( email.validity.typeMismatch ) {
        alert(‘Email 格式不正确‘);
    } else {
        alert(‘通过‘);
    }
```

8).`pattenMismatch`

```js
//如果输入内容与所设置模式不匹配，那么这个状态就是 true。

    if( phone.validity.patternMismatch ) {
        alert(‘电话号码格式不正确‘);
    } else {
        alert(‘通过‘);
    }
```

9).`tooLong`

```js
//如果输入内容长度大于 maxlength 属性指定值，那么这个状态就是 true。

    if( pwd.validity.tooLong ) {
        alert(‘密码长度不能超过 12 位‘);
    } else {
        alert(‘通过‘);
    }
```

10).`rangeUnderflow`

```js
//如果输入内容小于 min 属性声明的值，那么这个状态就是 true。

    if( age.validity.rangeUnderflow ) {
        alert(‘年龄不符合要求‘);
    } else {
        alert(‘通过‘);
    }
```

11).`stepMismatch`

```js
//如果给定的值与 min，max，step 不一致，那么这个状态就是 true。

    if( elem.validity.setpMismatch ) {
        alert(‘范围设置不正确‘);
    } else {
        alert(‘通过‘);
    }
```

12).`customError`

```js
//如果元素使用 setCustomValidity() 方法设置了自定义错误，那么这个状态就是 true。

    if( uname.value == "" ) {
        uname.setCustomValidity("用户名称不能为空");
    }

    if( uname.validity.customError ) {
        alert(‘验证未通过‘);
    }
```

### 4.audio & video

语法：

```js
<audio src="">您的浏览器不支持 audio 元素</audio>
<video src="" width="300" height="250" controls poster=""></video>
```

由于各家浏览器制造商对标准音视频编解码器支持上为达成一致，通常需要 `<source>` 元素来指定不同格式的媒体源：

```js
<vedio id="">
    <source src="img.mov" type="video/quicktime">
    <source src="img.ogv" type="video/ogg";codes="theora,vorbis">
</vedio>
```

source 元素具有几个属性：src 属性是指播放媒体的 URL 地址；type 表示媒体类型，其属性值为播放文件的 MIME 类型，该属性中的 codes 参数表示所使用的媒体的编码格式。type 属性是可选的，但最好不要省略 type 属性，否则浏览器会从上往下选择时无法判断自己能不能播放而先行下载一小段视频（音频）数据，这样有可能浪费宽带和时间。

```js
    src: 播放地址
    controls: 控制条
    autoplay: 自动播放
    loop: 循环播放
    muted: 静音
    poster: 视频播放之前，用图片掩盖

    currentSrc: 返回当前音视频的地址
    currentTime: 获取或设置当前播放时间

    //获取音视频的总时间（缺解析文件）
    console.log(audio.duration);
    console.log(video.duration);

    ended 返回值：音视频是否播放完成
    paused 返回值：音视频是否暂停

    //设置播放速度
    video.playbackRate

    //已播放时间
    video.played.end()

    //设置或获取音量
    video.volume=0.4（rang:0-1）
```

常用属性和方法：

|        方法         | 说明                                                    |
| :-----------------: | ------------------------------------------------------- |
|     **play()**      | 播放视频音频                                            |
|     **pause()**     | 暂停播放                                                |
|    **autoplay**     | 设置或返回是否在加载完成后随即播放音频/视频             |
|     controller      | 返回表示音频/视频当前媒体控制器的 MediaControl ler 对象 |
|    **controls**     | 设置或返回音频/视频是否显示控件（比如播放/暂停 等）     |
|   **currentSrc**    | 返回当前音频/视频的 URL                                 |
|   **currentTime**   | 设置或返回音频/视频中的当前播放位置（以秒计）           |
|  **defaultMuted**   | 设置或返回音频/视频默认是否静音                         |
| defaultPlaybackRate | 设置或返回音频/视频的默认播放速度                       |
|    **duration**     | 返回当前音频/视频的长度（以秒计）                       |
|        ended        | 返回音频/视频的播放是否已结束                           |
|      **loop**       | 设置或返回音频/视频是否应在结束时重新播放               |
|      **muted**      | 设置或返回音频/视频是否静音                             |
|     **paused**      | 设置或返回音频/视频是否暂停                             |
|  **playbackRate**   | 设置或返回音频/视频播放的速度                           |
|       played        | 返回表示音频/视频已播放部分的 TimeRanges 对象           |
|       preload       | 设置或返回音频/视频是否应该在页面加载后进行加载         |
|     readyState      | 返回音频/视频当前的就绪状态                             |
|      seekable       | 返回表示音频/视频可寻址部分的 TimeRanges 对象           |
|       seeking       | 返回用户是否正在音频/视频中进行查找                     |
|       **src**       | 设置或返回音频/视频元素的当前来源                       |
|      startDate      | 返回表示当前时间偏移的 `Date` 对象                      |
|     **volume**      | 设置或返回音频/视频的音量                               |

### 5. 本地储存和浏览器储存

Web Storage 存储机制是对 HTML4 中 cookies 存储机制的一个改善。而本地数据库是 HTML5 新增的一个功能，使用它可以在客户端本地建立一个数据库------原本必须要保存在服务端数据库中的内容现在可以直接保存在客户端了，这大大减轻了服务器端的负担，同时加快了数据访问的速度。

- Web Storage

Web Storage 功能，顾名思义，就是在 Web 上存储数据的功能，而这里的存储，是针对客户端本地而言。

1).`localStorage`

将数据保存在客户端本地的硬件设备中，即便浏览器被关闭，该数据仍然还在，下次打开浏览器访问网站时仍然可以继续使用。

```js
//localStorage, 只要使用浏览器打开，存在里面的内容会被永久存储，关闭页 面再打开任然存在，在其他的网页也可以获取

    localStorage.zf="珠峰培训";
    alert(localStorage.zf);
    localStorage.setItem("QQ","1144709265");
    localStorage.removeItem("QQ");

//实现一个查看当前浏览次数的方法

    if(!localStorage.getItem("n")){
        localStorage.setItem("n",1)
    }else {
        localStorage.setItem("n",parseInt(localStorage.get Item("n"))+1) }
        alert("这是第"+localStorage.getItem("n")+"次")
```

2).`sessionStorage`

将数据保存到 `session` 对象中。所谓 session 是指用户访问某个网站时，从进入网站到浏览器关闭所进过的这段时间。session 对象可以用来保存这段时间内要求保存的任何数据。

```js
//sessionStorage: 存储在浏览器上，只要浏览器不关闭，就会有，关闭浏览器就是消失，但是在其他的页面中获取不到

     if(!sessionStorage.getItem("code")){
         sessionStorage.setItem("code",1)
     }else {
         sessionStorage.setItem("code",parseInt(sessionStorag e.getItem("code"))+1) }
```
