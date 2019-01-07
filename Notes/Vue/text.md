# Vue案例

##### 案例一

```javascript
//bootstrap 栅格化布局 默认12列 （有一些框架可能是24列）
//常见的样式 基本样式 + 增强样式
//default 灰色 success 绿色 danger 红色 warning 警告色 info浅蓝色 primary 蓝色
//vue的ui框架 iview,mintui,elementui
<div id="app">
  <div class="container">
    <!--每一行又会拥有12列-->
    <div class="row">
      <table class="table table-hover table-bordered">
        <caption class="h2 text-warning text-center">珠峰购物车</caption>
        <tr>
          <!--click点击时,checkbox的状态还没有改变,所以拿到的总是相反的，change可以保证只有当值变化后再触发函数-->
          <th>全选 <input type="checkbox" v-model="checkAll" @change="change"></th>
          <td>商品</td>
          <td>单价</td>
          <td>数量</td>
          <td>小计</td>
          <td>操作</td>
        </tr>
        <tr v-for="(product,index) in products">
          <td>
            <input type="checkbox"
                   v-model="product.isSelected"
                   @change="checkOne"
            >
          </td>
          <td>
            <!--:和v-bind等价 指令：动态绑定数据-->
            <img :src="product.productCover" :title="product.productName">
            {{product.productInfo}}
          </td>
          <td>
            {{product.productPrice}}
          </td>
          <td>
            <!--.number是让输入框的值自动转换成数值;.lazy当输入框失去焦点时更新数据(延迟了同步更新属性值的时机，即将原本绑定在 input 事件的同步逻辑转变为绑定在 change 事件上)-->
            <input type="number" v-model.number="product.productCount" min="1">
          </td>
          <td>
            <!--过滤器 原数据不变的情况，只是改变显示的效果;管道符"|"-->
            <!--toFixed()方法可把 Number 四舍五入为指定小数位数的数字-->
            {{product.productCount*product.productPrice | toFixed(2)}}
          </td>
          <td><button class="btn btn-danger" @click="remove(product)">删除</button></td>
        </tr>
        <tr>
          <!--{{sum()}} 数据一变化就会重新调用此函数 算出最新的结果,不会缓存上一次的结果computed可以解决这个问题-->
          <td colspan="6">总价格:{{sum() | toFixed(2)}}</td>
        </tr>
      </table>
    </div>
  </div>
</div>

let vm = new Vue({
      el:'#app',
      // 专门用来发送ajax的方法
      filters:{
          //可以自定义过滤器
          toFixed(input,param1){
              // 这里的this指向的是window
              return '￥'+input.toFixed(param1);
              // input代表的是管道符前面的内容;param1代表的是toFixed中传递的参数
          }
      },
      created(){
          // 在数据被初始化后会调用，this指向指的也是vm实例,钩子函数
          this.getData();
      },
      methods:{
          sum(){
              return  this.products.reduce((prev,next)=>{
                  if(!next.isSelected)return prev; // 如果当前没被选中，就不加当前这一项
                  return prev+next.productPrice*next.productCount;
              },0);
          },
          checkOne(){
              this.checkAll = this.products.every(item=>item.isSelected);
          },
          change(){
              // 根据当前状态设置选项的状态,可以实现全选和反选
              this.products.forEach(item=>item.isSelected=this.checkAll);
          },
          remove(p){
              this.products = this.products.filter(item=>item!==p);
          },
          getData(){ // 初始化方法
              // Promise 解决回调问题的
              axios.get('./carts.json').then(res=>{
                  this.products = res.data; //获取数据 需要的是res.data
                  this.checkOne(); //数据获取完成后给 checkAll赋予默认值
              },err=>{
                  console.log(err);
              });
          }
      },
      data:{
          products:[],
          checkAll:false  //默认不全选
      }
  })
```

##### 案例二

```javascript
    let vm = new Vue({
        el:'#app',
        // 根据下面的checkbox计算出来的结果给全选赋值
        computed:{
            //放在computed中最后也会放在vm上，方法不能和methods与data重名
            checkAll:{
                // 当products值变化时会重新计算
                get(){
                    // 默认v-model会获取checkAll的值,所以会调用get方法
                    return this.products.every(p=>p.isSelected);
                },
                set(val){
                    //当我们给checkbox赋值的时候
                    this.products.forEach(p=>p.isSelected = val);
                }
            },
            sum(){
                //如果计算属性写成函数,默认调用的就是get方法
                //sum的结果会被缓存 如果依赖的数据没有变化就不会重新执行???
                return this.products.reduce((prev,next)=>{
                    if(!next.isSelected)return prev;
                    return prev+next.productPrice*next.productCount;
                },0);
            }
        },
        filters:{
            toFixed(input,param1){
                return '￥'+input.toFixed(param1);
            }
        },
        created(){
            this.getData();
        },
        methods:{
            remove(p){
                this.products = this.products.filter(item=>item!==p);
            },
            getData(){
                axios.get('./carts.json').then(res=>{
                    this.products = res.data;
                },err=>{
                    console.log(err);
                });
            }
        },
        data:{
            products:[],
        }
    })
```