[toc]

# Vue的相关blog

@(框架学习)[vue笔记, vue]

### Promise

#### 1.解决异步回调问题

##### 1.1 如何同步异步请求

如果几个异步操作之间并没有前后顺序之分,但需要等多个异步操作都完成后才能执行后续的任务，无法实现并行节约时间

```javascript
const fs = require('fs');
let school = {};
fs.readFile('./name.txt','utf8',function (err,data) {
    school.name = data;
});
fs.readFile('./age.txt','utf8',function (err,data) {
    school.age = data;
});
console.log(school);
```

##### 1.2如何解决回调地狱

在需要多个操作的时候，会导致多个回调函数嵌套，导致代码不够直观，就是常说的回调地狱

```javascript
const fs = require('fs');
fs.readFile('./content.txt','utf8',function (err,data) {
    if(err)console.log(err);
    fs.readFile(data,'utf8',function (err,data) {
        if(err)console.log(err);
        console.log(data);
    })
});
```

#### 2.Promise

Promise本意是承诺，在程序中的意思就是承诺我过一段时间后会给你一个结果。 什么时候会用到过一段时间？答案是异步操作，异步是指可能比较长时间才有结果的才做，例如网络请求、读取本地文件等

#### 3.Promise的三种状态

例如媳妇说想买个包，这时候他就要"等待"我的回复，我可以过两天买，如果买了表示"成功"，如果我最后拒绝表示"失败"，当然我也有可能一直拖一辈子

```javascript
Pending Promise对象实例创建时候的初始状态
Fulfilled 可以理解为成功的状态
Rejected 可以理解为失败的状态
then 方法就是用来指定Promise 对象的状态改变时确定执行的操作，resolve 时执行第一个函数（onFulfilled），reject 时执行第二个函数（onRejected）
```

#### 4.构造一个Promise

##### 4.1 promise的方法会立刻执行

```javascript
let promise = new Promise(()=>{
    console.log('hello');
});
console.log('world');
```

##### 4.2 promise也可以代表一个未来的值

```javascript
const fs = require('fs');
let promise = new Promise((resolve,reject)=>{
    fs.readFile('./content.txt','utf8',function (err,data) {
        if(err)console.log(err);
        resolve(data);
    })
});
promise.then(data =>{
    console.log(data);
});
```

##### 4.3 代表一个用于不会返回的值

```javascript
const fs = require('fs');
let promise = new Promise((resolve,reject)=>{});
promise.then(data =>{
    console.log(data);
});
```

##### 4.4 应用状态实现抛硬币

```javascript
function flip_coin() {
    return new Promise((resolve,reject)=>{
        setTimeout(function () {
            var random =  Math.random();
            if(random > 0.5){
                resolve('正');
            }else{
                resolve('反');
            }
        },2000)
    })
}
flip_coin().then(data=>{
    console.log(data);
},data=>{
    console.log(data);
});
```

#### 5.实现简单的Promise

```javascript
function Promise(fn) {
    fn((data)=>{
        this.resolve(data)

    },(data)=>{
        this.reject(data);
    })
}
Promise.prototype.resolve = function (data) {
    this._success(data)
};
Promise.prototype.reject = function (data) {
    this._error(data);
};
Promise.prototype.then = function (success,error) {
    this._success = success;
    this._error = error;
};
```

#### 6.Error会导致触发Reject

可以采用`then`的第二个参数捕获失败，也可以通过`catch`函数进行捕获

```javascript
function flip_coin() {
    return new Promise((resolve,reject)=>{
        throw Error('没有硬币')
    })
}
flip_coin().then(data=>{
    console.log(data);
}).catch((e)=>{
    console.log(e);
})
```

#### 7.Promise.all实现并行

接受一个数组，数组内都是`Promise`实例，返回一个`Promise`实例，这个`Promise`实例的状态转移取决于参数的`Promise`实例的状态变化。当参数中所有的实例都处于`resolve`状态时，返回的`Promise`实例会变为`resolve`状态。如果参数中任意一个实例处于`reject`状态，返回的`Promise`实例变为`reject`状态

```javascript
const fs = require('fs');
let p1 =  new Promise((resolve,reject)=>{
    fs.readFile('./name.txt','utf8',function (err,data) {
        resolve(data);
    });
})
let p2 = new Promise((resolve,reject)=>{
    fs.redFile('./age.txt','utf8',function (err,data) {
        resolve(data);
    });
})
Promise.all([p1,p2]).then(([res1,res2])=>{
    console.log(res1);
})
```

不管两个`promise`谁先完成，Promise.all 方法会按照数组里面的顺序将结果返回

#### 8.Promise.race实现选择

接受一个数组，数组内都是`Promise`实例,返回一个`Promise`实例，这个`Promise`实例的状态转移取决于参数的`Promise`实例的状态变化。当参数中任何一个实例处于`resolve`状态时，返回的`Promise`实例会变为`resolve`状态。如果参数中任意一个实例处于`reject`状态，返回的`Promise`实例变为`reject`状态。

```javascript
const fs = require('fs');
let p1 =  new Promise((resolve,reject)=>{
    fs.readFile('./name.txt','utf8',function (err,data) {
        resolve(data);
    });
})
let p2 = new Promise((resolve,reject)=>{
    fs.readFile('./age.txt','utf8',function (err,data) {
        resolve(data);
    });
})
Promise.race([p1,p2]).then(([res1,res2])=>{
    console.log(res1,res2);
})
```

#### 9.Promise.resolve

返回一个`Promise`实例，这个实例处于`resolve`状态。

```javascript
Promise.resolve('成功').then(data=>{
    console.log(data);
})
```

#### 10.Promise.reject

返回一个`Promise`实例，这个实例处于`reject`状态

```javascript
Promise.reject('失败').then(data=>{
    console.log(data);
},re=>{
    console.log(re);
})
```

#### 11.封装ajax

```javascript
function ajax({url=new Error('url必须提供'),method='GET',async=true,dataType='json'}){
  return new Promise(function(resolve,reject){
     var xhr = new XMLHttpRequest();
     xhr.open(method,url,async);
     xhr.responseType = dataType;
     xhr.onreadystatechange = function(){
         if(xhr.readyState == 4){
             if(/^2\d{2}/.test(xhr.status)){
                resolve(xhr.response);
             }else{
                 reject(xhr.response);
             }
         }
     }
      xhr.send();
  });
}
```

#### 12.chain中返回结果

```javascript
Promise.resolve([1,2,3])
.then(arr=>{
    return [...arr,4]
}).then(arr=>{
    return [...arr,5]
}).then(arr=>{
    console.log(arr);
})
```

#### 13.chain中返回promise

`then`中的结果是`promise`的`resolve`后的结果

```javascript
Promise.resolve('user').then(data=>{
    return new Promise(function (resolve,reject) {
        fetch('/'+data).then(res=>res.json().then((json)=>{
            resolve(json)
        }))
    })
}).then(data=>{
    console.log(data);
});

//改写的更简单些

Promise.resolve('user').then(data=>{
    return fetch('/'+data)
}).then(res=>{
    return res.json();
}).then(data=>{
    console.log(data);
})
```

#### 14.async/await

本质是语法糖，`await`与`async`要连用，`await`后只能跟`promise`

```javascript
async function getHello() {
    return new Promise((resolve,reject) => {
        setTimeout(function () {
            resolve('hello');
        },2000);
    })
}
async function getData () {
   var result = await getHello();
   console.log(result);
} ;
getData();
```

### 前端框架的三国时代-Vue.js(一)

#### 1.Vue介绍

- --
核心只关注视图层(view)
易学，轻量，灵活的特点
适用于移动端项目
渐进式框架
渐进式的理解
声明式渲染(无需关心如何实现)
组件系统
客户端路由
大规模状态管理
构建工具
可以根据情况选择，随意搭配组成自己想要的框架结构。
- --

#### 2.Vue的两个核心点

- --
响应的数据变化
当数据发生改变 ->视图的自动更新
组合的视图组件
ui页面映射为组件树
划分组件可维护、可复用、可测试
- --

#### 3.MVVM模式

M：Model数据模型
V: view 视图模板
vm: view-Model 视图模型
将数据绑定到DOM上，监听视图的变化更改数据

#### 4.vue的安装

查看所有版本
`$ npm info vue`
下载并进行安装
`$ npm init -y`
`$ npm install vue --save`
默认下载最新版本使用。

#### 5.hello,vue.js

```javascript
<div id="app">
    {{message}}
</div>
<script>
    var vm = new Vue({
        el:'#app',
        data:{
            message:'hello,vue.js'
        }
    })
</script>
```

#### 6.指令

什么是指令
指令是一种特殊自定义行间属性，在Vue中，指令以`v-`开头

#### 7.双向数据绑定v-model

`<input type="text" v-model="message">`
当你改变数据上的属性，视图也会随之变化。相反视图变化也会影响数据

#### 8.表达式

插值表达式，使用Mustache语法(双大括号)
```
{{message=="hello,vue.js"?"yes":"no"}}
<div v-text="hello,vue.js"?"yes":"no"></div>
```
当数据改变时，插值内容会自动更新,在表达式中可以赋值、三元、和展示返回值

#### 9.v-once/v-html

有时候我们想让数据只绑定一次,当数据在更改时不会更新内容(v-once)
当绑定的数据是html字符串时，展示成正常的html(v-html)
```
<div v-once>{{message}}</div>
<div v-html="html"></div>
data:{
  html:'<h1>hello</h1>'
}
```

#### 10.v-for循环

循环数组
循环的顺序是value,index

```
<ul>
    <li v-for="(phone,index) in phones">{{phone}} {{index}}</li>
</ul>
data:{
    phones:['apple','xiaomi','huawei']
}
```

循环对象
循环的顺序是value,key

```
<li v-for="(value,key) in json" >
    {{value}}
</li>
data:{
    json:{name:'zfpx'}
}
```

#### 11.v-on事件

`v-on:click`简写`@click`
执行方法时加上()事件源默认不传递，需要手动传入`$event`
methods中的this永远指向Vue的实例

```
<button v-on:click="addFruit">按钮</button>
<ul>
  <li v-for="value in fruits" >
     {{value}}
  </li>
</ul>
var vue = new Vue({
  el:'#box',
  data:{
      fruits:['香蕉','苹果','橘子']
  },
  methods:{
      addFruit(){
          this.fruits.push('苹果');
      }
  }
});
```

#### 12.v-if/v-show

```
v-show 如果为false时通过css样式将元素隐藏
  <div v-show='false'>jw,handsome</div>
v-if 如果为false时移除DOM节点
  <div v-if='false'>jw,handsome</div>
v-if后面可以根v-else-if或者v-else
```


### 前端框架的三国时代-Vue.js(二)

讲解vue的修饰符、声明周期、数据的绑定、监控数据的变化实现TodoList案例

#### 1.事件进阶-修饰符
事件处理函数只有纯粹的逻辑判断，不处理DOM事件的细节
例如: 阻止冒泡、默认行为、判断按键
```
用法
      <div v-on:click.修饰符="handler">
修饰符
事件冒泡(事件不会向上传递)
  <div @click="say">
          parent
          <div @click.stop="say">child</div>
      </div>
阻止默认事件(不触发默认事件)
  <a href="http://www.baidu.com" @click.prevent="say">百度</a>
指定元素触发(不包括子元素)
  <a @click.stop.self.prevent="say" href="http://www.baidu.com" style="border: 10px solid red">
      <span>2</span>
      <span>1</span>
  </a>
事件捕获方式(父->子)
  <div @click.capture="say">
      parent
      <div @click="say1">
          child
      </div>
  </div>
绑定事件一次(触发后移除事件)
  <div @click.once="say">say</div>
按键修饰符
响应按键触发
  <input type="text" @keyup.enter="say">
常见修饰符.enter,.tab,.delete,.esc,.space,.up,.down....,键值
```

#### 2.v-bind绑定动态属性

```
<div id="box">
    <img v-bind:src="msg" v-bind:title="zf" v-bind:width="w">
</div>
new Vue({
     el:'#box',
     data:{
         msg:'http://www.zhufengpeixun.cn/customize/img/logo.png',
         zf:'珠峰培训',
         w:'100px'
     }
 })
写到这里实在受不了了和v-on能简写成@符一样，v-bind可以简写成:
:class绑定style
对象
  :class="{className:表达式}"
         表达式为true添加样式
         表达式为false移除样式
数组
  :class="[className1,className2]"
:style绑定行内样式
对象
  <div :style="{fontSize:'50px'}">你好</div>
数组
  <div :style="[{fontSize:'50px'},{background:'red'}]">你好</div>
```

#### 3.计算属性
computed为可以计算的属性,由get方法和set方法组成,默认调用的是get方法
实现全选反选效果
```
  <div id="app">
      全选：<input type="checkbox" v-model="checkAll" > <br>
      <input type="checkbox" v-for="a in checkList" v-model="a.selected">
  </div>
  data:{
       checkList:[{selected:true},{selected:true},{selected:false}]
  },
  computed:{
   checkAll:{
       set(val){
           for(var arr of this.checkList){
               arr.selected = val;
           }
       },
       get(){
           var obj = this.checkList.find(function (item) {
               return !item.selected
           });
           return obj?false:true;
       }
   }
  }
```
计算属性简单来说，就是根据数据推算出来的值，当给这个值赋值时可以影响其他值的变化。

#### 4.watch监控
和computed不同,watch可以夹杂异步逻辑
当一个值变化时,执行某个动作用watch更加方便
```
  <div id="app">
      <input type="text" v-model="msg">
      {{content}}
  </div>
  var vm = new Vue({
     el:'#app',
      data:{
         msg:'hello',
         content:''
      },
      watch:{
          'msg':function () {
              this.content = 'waiting...';
              setTimeout(()=> {
                  this.content = 'Hello Mrs Jiang!'
              },2000);
          }
      }
  });
```

#### 5.生命周期
vue在组件中的每个环节都提供了钩子函数(生老病死)
当调用vm.$mount()挂载后执行挂载数据
当调用vm.$destroy()后执行删除实例
```
    var vm = new Vue({
        el:'#app',
        data:{
           msg:data,
        },
        beforeCreate(){
            alert('开始创建')
        },
        created(){
            alert('创建完成')
        },
        beforeMount(){
            alert('挂载之前')
        },
        mounted(){
            alert('挂载之后')
        },
        beforeUpdate(){
            alert('开始更新')
        },
        updated(){
            alert('更新完成')
        },
        beforeDestroy(){
            alert('销毁之前')
        },
        destroyed(){
            alert('销毁完成')
        }
    });
```
可以在created函数中实现ajax请求

#### 6.ToDoList

监控数据的方式，以及组件的生命周期

##### 1.计算属性

computed为可以计算的属性,由get方法和set方法组成,默认调用的是get方法
实现全选反选效果

```
  <div id="app">
      全选：<input type="checkbox" v-model="checkAll" > <br>
      <input type="checkbox" v-for="a in checkList" v-model="a.selected">
  </div>
  data:{
       checkList:[{selected:true},{selected:true},{selected:false}]
  },
  computed:{
   checkAll:{
       set(val){
           for(var arr of this.checkList){
               arr.selected = val;
           }
       },
       get(){
           var obj = this.checkList.find(function (item) {
               return !item.selected
           });
           return obj?false:true;
       }
   }
  }
```

计算属性简单来说，就是根据数据推算出来的值，当给这个值赋值时可以影响其他值的变化。

##### 2.watch监控

和computed不同,watch可以夹杂异步逻辑
当一个值变化时,执行某个动作用watch更加方便

```
  <div id="app">
      <input type="text" v-model="msg">
      {{content}}
  </div>
  var vm = new Vue({
     el:'#app',
      data:{
         msg:'hello',
         content:''
      },
      watch:{
          'msg':function () {
              this.content = 'waiting...';
              setTimeout(()=> {
                  this.content = 'Hello Mrs Jiang!'
              },2000);
          }
      }
  });
```

##### 3. `v-clock`防止闪烁

当vue加载完成后移除`v-cloak`

```
  <div v-cloak>
      {{name}} {{age}}
  </div>
  <style>
      [v-cloak]{display: none}
  </style>
```

##### 4.生命周期

vue在组件中的每个环节都提供了钩子函数(生老病死)
当调用`vm.$mount()`挂载后执行挂载数据
当调用`vm.$destroy()`后执行删除实例

```
    var vm = new Vue({
        el:'#app',
        data:{
           msg:data,
        },
        beforeCreate(){
            alert('开始创建')
        },
        created(){
            alert('创建完成')
        },
        beforeMount(){
            alert('挂载之前')
        },
        mounted(){
            alert('挂载之后')
        },
        beforeUpdate(){
            alert('开始更新')
        },
        updated(){
            alert('更新完成')
        },
        beforeDestroy(){
            alert('销毁之前')
        },
        destroyed(){
            alert('销毁完成')
        }
    });
可以在created函数中实现ajax请求
```

### 3.前端框架的三国时代-Vue.js(三)

#### 1.组件化开发

我们可以很直观的将一个复杂的页面分割成若干个独立组件,每个组件包含自己的逻辑和样式 再将这些独立组件组合完成一个复杂的页面。 这样既减少了逻辑复杂度，又实现了代码的重用。 页面是组件的容器，组件自由组合形成完整的界面，当不需要某个组件时，或者想要替换某个组件时，可以随时进行替换和删除，而不影响整个应用的运行。

组件化开发的好处

- --
提高开发效率
方便重复使用
便于协同开发
更容易被管理和维护

- --

#### 2.Vue中的组件


vue中的组件是自定义的标签，可以扩展原生的html元素，封装可重用的代码

组件的组成
样式结构
逻辑行为
数据绑定

#### 3.定义组件

全局定义
注册后在任意实例的模版中均可使用。

```
<div id="app">
  <zf-component></zf-component>
</div>
Vue.component('zf-component',{
  template:`<div>hello vuejs</div>`
});
```

局部定义
在组件实例中通过选项注册，只有在所注册的作用域中使用

```
var vm = new Vue({
  el:'#app',
  components:{
      'zf-component':{
          template:`<div>hello vuejs</div>`
      }
  }
})
```

在html中使用组件需要使用短横线隔开(kebab-case)命名法

#### 4.组件中的数据

每个组件都是相互独立的，如果共用一个对象，在更改某个组件时会影响其他组件，如果是函数返回自己独立的数据，就可以实现互不影响。所以vue中组件的数据都是函数形式

```
var vm = new Vue({
  el:'#app',
  components:{
      'zf-component':{
          template:`<div>hello {{language}}</div>`,
          data(){
              return {language:'vuejs'}
          }
      },
  }
})
```

#### 5.组件间的通信

父组件要将数据传递给子组件，子组件要将内部发生的事情通知父组件

父组件->子组件
不能在子组件中直接调用父组件中的数据，需要通过父组件的属性传递，并且子组件要显示的通过props声明传递过来的属性。

```
<zf-component :language="language"></zf-component>
components:{
    'zf-component':{
        props:['language'],
        template:`<div>hello {{language}}</div>`,
    },
}
props可以进行属性校验
props:{
    msg:{
        type:[Number,String],
        default:100,
        required:true,
        validator(value){
            return value>100
        }
    }
},
```

可以校验String,Number,Boolean,Function,Object,Array

子组件->父组件
子组件需要通过事件发射($emit)触发父组件的自定义事件

```
<zf-component @custom-event="receive"></zf-component>
var vm = new Vue({
    el:'#app',
    methods:{
        receive(data){alert(data);}
    },
    components:{
        'zf-component':{
            template:`<button @click="run">发射</button>`,
            methods:{
                run(){
                    this.$emit('custom-event','我好饿')
                }
            }
        }
    }
})
```

平级组件间的通信
通过事件的方式传递数据

```
var bus = new Vue();
var vm = new Vue({
  el:'#app',
  created(){
      bus.$on('child',function (data) {
          console.log(data);
      })
  },
  components:{
      child:{
          data(){
              return {child:'vuejs'}
          },
          template:'<div><button @click="up">ok</button></div>',
          methods:{
              up(){
                  bus.$emit('child',this.child);
              }
          }
      }
  }
})
```

模版中的html元素的根节点只能有一个。

#### 6.单向数据流

数据从父组件流向子组件, 只能单向绑定，在子组件内不应该直接修改父组件传递的数据

```
{{language}}  <!--在这里你会发现子组件改变了数据父组件不会更新-->
<zf-component :language="language"></zf-component>
components:{
    'zf-component':{
        props:['language'],
        template:`<div>hello {{language}}
            <button @click="language='angularjs'">点我变ng</button>
        </div>`,
    },
}
```

子组件更改数据方式
可以作为数据的初始值使用

```
data(){
return {msg:this.language + 'hello'}
},
作为子组件的computed属性
computed: {
  msg(){
     return this.language + 'hello'
  }
},
```

父子组件相互影响
父组件传递的数据，在子组件中发生变化并且父组件要更新数据。

通过事件的方式传递给父组件

```
var vm = new Vue({
    el:'#app',
    data:{language:'vuejs'},
    methods:{
        change(data){
            this.language = data
        }
    },
    components:{
        'zf-component':{
            props:['language'],
            data(){
              return {msg:this.language}
            },
            template:`<div>hello {{msg}}
                <button @click="changeParent()">点我变ng</button>
            </div>`,
            methods:{
                changeParent(){
                    this.msg = 'angularjs';
                    this.$emit('change',this.msg);
                }
            }
        },
    }
})

```

父子组件使用相同data

```
{{language.language}}
<!--在这里传入对象格式，子组件修改这个对象的属性，可以导致父组件更新-->
<zf-component :language="language"></zf-component>
var vm = new Vue({
  el:'#app',
  data:{language:{language:'vuejs'}},
  components:{
      'zf-component':{
          props:['language'],
          data(){
            return {msg:this.language}
          },
          template:`<div>哈哈 {{language.language}}
              <button @click="language.language='angularjs'">更改</button>
          </div>`
      },
  }
})
```


#### 7.slot插槽

可以在组件内定制模板,在使用组件时会将中间传递的内容替换掉定制的模板。

单个slot

```
<zf-component>
    <!--这里不传入内容时默认会使用模板中定制的内容，传入后则会覆盖掉定制的内容-->
    <div>用这个盒子替换掉slot</div>
</zf-component>
components:{
    'zf-component':{
        template:`<div>
            <slot>
                <h1>这是个小标题</h1>
                <p>这是内容</p>
            </slot>
        </div>`
    }
}
```

具名slot

```
<zf-component>
    <template slot="header">footer</template>
    <template>这是新内容</template>
    <template slot="footer">header</template>
</zf-component>
components:{
    'zf-component':{
        template:`<div>
            <slot name="header">header</slot>
            <slot>这是默认内容</slot>
            <slot name="footer">footer</slot>
        </div>`
    }
}
```

不指定slot名字默认名字为default,可以和具名slot同时使用

#### 8.is模板

可以使用is指定动态模板的渲染，增加keep-alive可以保存组件上一次的状态

```
<input type="radio" v-model="com" value="com1">
<input type="radio" v-model="com" value="com2">
<keep-alive>
<component :is="com"></component>
</keep-alive>
var vm = new Vue({
    el:'#app',
    data:{
      com:'com1'
    },
    components:{
        com1:{
            data(){
                return {msg:'hello'}
            },
            template:'<div @click="changeColor">{{msg}}</div>',
            methods:{
                changeColor(){
                    this.msg = 'hello vue'
                }
            }
        },
        com2:{
            template:'<div>world</div>'
        }
    }
})
```

#### 9.自定义panel组件


应用slot,events,props

使用bootstrap样式构建panel组件
将html封装到template中
在组件内部定制想要的模板
可以通过传入标题,模板更改组件的状态
定义模板

```
<template id="panel">
    <div class="panel" :class="[style]">
        <div class="panel-heading">
            {{header}}
        </div>
        <div class="panel-body">
            <slot name="body">这是默认内容</slot>
        </div>
        <div class="panel-footer">
            <slot name="footer">作者:Mrs Jiang</slot>
            <button v-if="flag" @click="say">点我出标题</button>
        </div>
    </div>
</template>

```

在模板需要传入的内容有header(标题)、flag(是否显示按钮)、style(panel颜色)
使用组件的理想用法


```
<panel type="info" header="angularJs" :flag="true" @say="say">
    <div slot="body">
        <h1>初探angularJs</h1>
    </div>
    <div slot="footer">
        <timer>时间 2017.5.2</timer>
        <auth>作者：Mrs Jiang </auth>
    </div>
</panel>
设置组件
var vm = new Vue({
    el:'#app',
    methods:{
        say(data){ //点击按钮需要执行的方法
            alert(data);
        }
    },
    components:{
        panel:{
            computed:{
                style(){ //计算panel的样式
                    return 'panel-'+this.type;
                }
            },
            props:{
                type:{type:[String],default:'primary'},
                header:{type:[String],default:'README.md'},
                flag:{type:Boolean,default:true}
            },
            template:'#panel',
            methods:{
                say(){
                    this.$emit('say',this.header);
                }
            }
        }
    }
})

```


就此我们已经创建了可复用的panel组件


#### 10.递归组件


在组件内部调用自己;应用场景:树状菜单

定制静态结构

````
<ul>
    <li>父亲
        <ul>
            <li>
                大儿子
                <ul>
                    <li>孙子
                        <ul>
                            <li>大曾孙</li>
                            <li>小曾孙</li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>小儿子</li>
        </ul>
    </li>
</ul>

```

我们发现结构的ul,li 是可以复用的
结构->数据
将结构的展示结果，更改为数据格式

```
list:{
    name:'父亲',
    children:[
        {
            name:'大儿子',
            children:[
                {
                    name:'孙子',
                    children:[{name:'大曾孙'},{name:'小曾孙'}]
                }
            ]
        },
        {
            name:'小儿子'
        }
    ]
}
```

定制递归组件

```
<tree :data="list"></tree>
components:{
    tree:{
        props:['data'],
        name:'tree',
        template:`
            <ul>
                <li>
                    {{data.name}}
                    <tree v-for="c in data.children" :data="c" :key="c"></tree>
                </li>
            </ul>
        `
    }
}
```

递归组件要指定name属性,才会开始递归。全局注册的组件会自动指定name属性


### 前端框架的三国时代-Vue.js(五)

#### 路由

单页Web应用（single page web application，SPA），就是只有一张Web页面的应用，是加载单个HTML 页面并在用户与应用程序交互时动态更新该页面的Web应用程序。

#### 1.vue-router介绍


可以配置组件和路由映射,可以使用 Vue.js + vue-router 创建单页应用。

#### 2.vue-router安装


`npm install vue-router --save`

#### 3.初探vue-router

默认配好的映射组件会加载到router-view中，可以使用router-link进行页面跳转

```
<router-link to="/">首页</router-link>
<router-link to="/list">列表页</router-link>
<router-view></router-view>
var Hello = {template:'<div>Hello</div>'};
var List = {template:'<div>List</div>'};
const routes = [
  {path:'/',component:Hello},
  {path:'/list',component:List},
];
const router = new VueRouter({
  routes
});
var vm = new Vue({
  el:'#app',
  router
})
```

#### 4.路由参数

vue-router提供了一个$route对象，如果要获取路径传递参,数据会全部存放在params对象中

```
<router-link to="/article/1">文章1</router-link>
<router-link to="/article/2">文章2</router-link>
const routes = [
    {path:'/article/:sid',component:Article}
];
var Article = {
    template:'<div>这是第{{$route.params.sid}}篇文章</div>',
    watch:{
        $route(to,from){
            //to代表要去的路由
            //from代表从哪里来的
            var id = to.params.sid;
            console.log(id);
        }
    }
};
```

想监控路径参数变化只能使用watch

#### 5.路由嵌套

可以嵌套路由，可以指定父子关系，实现多router-view

```
访问关系
/foods  食物
/foods/fruit  食物 水果类
/foods/greens  食物 蔬菜类
<div id="app">
  <router-view></router-view>
</div>
let Foods = {
  template:`
      <div>
          <router-link to="/foods/fruit">水果</router-link>
          <router-link to="/foods/greens">蔬菜</router-link>
          <div>食物</div>
          <router-view></router-view>
      </div>
  `
};
let Fruit = {template:'<div>foods</div>'};
let Greens = {template:'<div>greens</div>'};
const routes = [
  {
      path:'/foods',
      component:Foods,
      children:[
          {path:'',component:Tip}, //增加默认展示内容
          {path:'fruit',component:Fruit},
          {path:'greens',component:Greens},
      ]
  }
];
```

#### 6.路由跳转

跳转新的路由(会产生历史记录)
  `router.push({path:'/foods/fruit',query:{name:1}});`

替换当前路由并跳转(不产生历史记录)
  `router.replace('/foods/fruit');`

前进和后退
  `router.go(n); //n是数字类型表示前进/后退几个`

命名路由
  `{path:'/home', component:Home,name:'home'}
  router.push({name:'home');`

重定向路由
  `{path:'*',redirect:'/home'}`

配置导航别名
  `{path:'*',redirect:'/home',alias:'/jw'}`

#### 7.多视图

一个路径下需要视同多个router-view,通过name属性展现不同的组件

```
<router-link to="/home">home</router-link>
<router-view name="home"></router-view>
<router-view name="menu"></router-view>
const routes  = [
    {path:'/home',components:{home:Home,menu:Menu},},
]
```

#### 8.监控路由变化

to去哪个路由
from是从哪个路由来
next是决定是否继续执行
全局监控

```
router.beforeEach((to,from,next)=> {
    if(to.path == '/home'){
        next({path:'/list'});//如果路由是home则跳转到list
    }
    next();//调用next会继续向下执行
});
```

每个导航中也可以增加自己的钩子函数叫beforeEnter用法同beforeEach
在组件中监控

```
beforeRouteEnter(to,from,next){
    //在加载某个组件，路由进入之前，可以执行ajax操作
    setTimeout(function () {
        next(vm=>{
            vm.msg = 'world';
        })
    },2000);
})
```

#### 9.ajax获取数据


导航完成之前获取

```
beforeRouteEnter(to,from,next){ //在有路径参数情况时切换只调用一次，不会多次调用
    alert('获取数据');
    setTimeout(function () {
        next();
    },2000)
},
watch:{ //路径参数需要watch来监控
    $route(){
        alert('获取数据')
    }
}
```

导航完成之后获取
使用生命周期在组件实例创建完成后获取数据

```
created(){
    setTimeout(()=>{
        this.msg = 'world'
    },2000)
},
watch:{
    $route(){
        alert('获取数据')
    }
}
```

#### 10.使用browserHistory


使用浏览器自带的history api实现

`routes:[],`
`mode:'histroy'`

#### 11.滚动行为

每次切换导航时回到页面顶部，当后退时实现浏览器自动记录功能

```
scrollBehavior(to, from, save){
    if (save) {
        return save
    } else {
        return {x: 0, y: 0}
    }
}

```



### 前端框架的三国时代-Vue.js(六)


#### 1.过渡css类名


会有 4 个(CSS)类名在 enter/leave 的过渡中切换

`v-enter`: 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
`v-enter-active`: 定义进入过渡的结束状态。在元素被插入时生效，在 transition/animation 完成之后移除。
`v-leave`: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。
`v-leave-active`: 定义离开过渡的结束状态。在离开过渡被触发时生效，在 transition/animation 完成之后移除。

#### 2.单元素的过渡

定义动画过渡阶段，一般不用设置v-leave,默认离开时就是当前状态

```
<style>
  .box{width: 100px;height: 100px;background: red}
  .v-enter{opacity: 0}
  .v-enter-active{-webkit-transition: all 1s}
  .v-leave-active{-webkit-transition: all 1s;opacity: 0}
</style>
<div id="app">
  <button @click="isShow=!isShow">{{isShow?'隐藏':'显示'}}</button>
  <transition>
      <div class="box" v-if="isShow"></div>
  </transition>
</div>
var vm = new Vue({
  el:'#app',
  data:{
      isShow:true
  }
});
```

可以指定name属性，替换v-

#### 3.自定义过渡类名

我们可以通过以下特性来自定义过渡类名与第三方库结合(animate.css)

enter-class
enter-active-class
leave-class
leave-active-class

下载animate.css
`$ npm install animate.css --save`

```
<link rel="stylesheet" href="node_modules/animate.css/animate.css">
<transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
    <div class="box" v-if="isShow"></div>
</transition>
```

#### 4.列表过渡

通过输入的内容筛选出留下的列表

```
<input type="text" v-model="query">
<li v-for="l in compList">{{l}}</li>
var vm = new Vue({
    el:'#app',
    data:{
        isShow:true,
        list:[1,2,3,4,5],
        query:''
    },
    computed:{
        compList(){
            return this.list.filter(item=>{
                return item.toString().includes(this.query)
            })
        }
    }
})
```

设置动画组

```
<transition-group tag="ul" name="flip-list" leave-active-class="animated zoomOut" enter-active-class="animated zoomIn">
     <li v-for="l in compList" :key="l">{{l}}</li>
</transition-group>
```

设置name指定v-move设置位移动画，设置tag将transition标签转换为想要使用的标签


### 前端框架的三国时代-Vue.js(七)


#### 1.构建项目

安装下载
`$ npm init -y`

安装webpack
`$ npm install webpack webpack-dev-server --save-dev`

安装loader + presets
`$ npm install babel-core babel-loader babel-preset-es2015 babel-preset-stage-0 css-loader style-loader vue-loader --save-dev`

安装plugins
`$ npm install html-webpack-plugin vue-template-compiler --save-dev`

安装vue
`$ npm install vue vue-router --save`

配置.babelrc

```
{
  "presets": ["es2015","stage-0"]
}
配置webpack.config.js
let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
module.exports  = {
    entry:'./src/main.js',
    output:{
        path:path.resolve('./dist'),
        filename:'bundle.js'
    },
    module:{
        rules:[
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.vue$/,use:'vue-loader'}
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template:'src/index.html'
        })
    ]
};
```

配置package.json

```
"scripts": {
    "dev": "webpack-dev-server --port 3000 --open",
    "build": "webpack"
},
```

配置项目结构
main为入口文件，在此文件下创建vue的实例

`$ mkdir src && cd src`
`$ touch main.js`

如果直接使用vue文件，不能使用template,默认引用文件是vue.common.js

```
import Vue from 'vue';
import App from './App.vue'
new Vue({
    el:'#app',
    ...App
});
```

引入vue-router
use引用插件,可以默认调用install方法装载我们的插件

```
import jwButton from './plugins'
Vue.use(jwButton);
import Vue from 'vue';
export default  {
    install(){
        Vue.component('jw-button',{
            render:(h)=>h('button','jw')
        })
    }
}
```

使用vue-router

```
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const routes = [
    {path:'/',component:Home}
]
const router = new VueRouter({
    routes
});
new Vue({
    el:'#app',
    ...App,
    router
});
```

我们可以使用.vue的文件来书写我们的组建了



### 前端框架的三国时代-Vue.js(八)


#### Vuex-状态管理---

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态。

#### 1.安装vue-cli

安装命令行工具
`npm install vue-cli -g`

选择模板
webpack
webpack-simple
browserify
browserify-simple
simple

#### 2.生成项目

`vue init <template-name>#版本号 <product-name>`

#### 3.安装依赖并启动

```
$ cd myApp && npm install
$ npm run dev
$ npm install vuex --save
```

#### 4.安装调试工具dev-tool


`https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd`


#### 5.单向数据流


state，驱动应用的数据源；
view，以声明方式将state映射到视图；
actions，响应在view上的用户输入导致的状态变化。

#### 6.组件共享状态


多个视图依赖于同一状态。
来自不同视图的行为需要变更同一状态。

#### 7.State-状态

单一状态树:用一个对象就包含了全部的应用层级状态。这个对象就是State，整个应用只能包含一个store的实例。
使用vuex创建状态,在App.vue下实现计数功能

```
<div id="app">
       <!--count应该归state管理-->
       计数器 {{count}}
       <button>增加</button>
</div>
```

创建store

```
$ cd src && mkdir store
$ cd store && touch index.js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
  count:0
};
export const store = new Vuex.Store({
  state
});
```

在main.js中引入store

```
import {store} from './store'
new Vue({
  el: '#app',
  router,
  store,
  ...App
});
```

在页面上展示count

```
computed:{
    count(){
        return this.$store.state.count;
    }
}
//辅助函数mapState可以简化写法

computed:{
    ...mapState([ // 不更改数据名
        'count'
    ])
    ...mapState({ // 更改数据名
      count:'count'
    })
}
```

#### 8.Mutations-突变

更改Vuex中store的数据，只能通过提交mutation，每个mutation都有一个type和回调函数，回调函数中的参数就是当前store中的state
创建mutations

```
const INCREMENT = 'increment';
const mutations = {
  [INCREMENT](state,n){
    state.count += n;
  }
};
export const store = new Vuex.Store({
  state,
  mutations
});
```

更改页面count

```
<button @click="add">增加</button>
methods:{
    add(){
        this.$store.commit('increment',1);
    }
}
//辅助函数`mapMutations可以简化写法

import {mapState,mapMutations} from 'vuex';
methods:{
    add(){
        this.increment(2);
    },
    ...mapMutations([
      'increment'
    ])
}
```

mutation只能写同步方法，一般是通过action中的commit提交到mutation中，我们一般只需派发action即可

#### 9.Actions

Action提交的是mutation，不能直接更改状态
Action可以包含异步操作
通过action提交到mutation中

```
const actions = {
  [INCREMENT]({commit},n){
    commit(INCREMENT,n)
  }
};
export const store = new Vuex.Store({
  state,
  mutations,
  actions
});
```

直接使用mapActions简化操作

```
import {mapState,mapMutations,mapActions} from 'vuex';
methods:{
    add(){
        this.increment(1);
    },
    ...mapActions([
        'increment'
    ])
}
```

#### 10.Getters

Vuex 允许我们在 store 中定义『getters』（可以认为是 store 的计算属性）。Getters 接受 state 作为其第一个参数：

想判断当前count是奇数还是偶数

```
const getters = {
  computeCount(state){
    return state.count%2==0?'偶数':'奇数'
  }
};
export const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
```

直接使用mapGetters简化操作

```
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
computed:{
    ...mapGetters([
        'computeCount'
    ])
},
在页面上将变量取出

{{count}}
```





