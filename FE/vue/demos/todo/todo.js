const vm = new Vue({
  el:'#app',
  directives:{
      focus(el,bindings){
          //当点击当前li时让内部的输入框获取焦点
          if(bindings.value){
              el.focus(); // 获取焦点
          }
      }
  },
  data:{
      todos:[
          {isSelected:false,title:'睡觉'},
          {isSelected:false,title:'吃饭'}
      ],
      title:'',
      cur:'',
      hash:''
  },
  created(){ // ajax获取 初始化数据
      // 如果localStorage中有数据 就用有的没数据 就用默认的
      this.todos = JSON.parse(localStorage.getItem('data')) || this.todos;
      // 监控hash值的变化, 如果页面以及有hash了 重新刷新页面也要获取hash值
      this.hash = window.location.hash.slice(2) || 'all';
      window.addEventListener('hashchange',()=>{
          // 当hash值变化 重新操作记录的数据
          this.hash = window.location.hash.slice(2);
      },false);
  },
  watch:{
      todos:{ // watch默认只监控一层的数据变化,深度监控
          handler(){ //默认写成函数 就相当于默认写了个handler
              //localStorage默认存的是字符串
              localStorage.setItem('data',JSON.stringify(this.todos));
          },deep:true
      }
  },
  methods:{
      add(){ // keydown/keyup差一个单词，keydown的时候内容没有进入到输入框内
          this.todos.push({
              isSelected:false,
              title:this.title
          });
          this.title = '';
      },
      remove(todo){ //拿到当前点击的和数组里的比对相等则返回false即可
          this.todos = this.todos.filter(item=>item!==todo);
      },
      remember(todo){//当前传递的是todo（当前点击的这一项）
          this.cur = todo;
      },
      cancel(){
          this.cur = ''
      }
  },
  computed:{
      filterTodos(){
          if(this.hash === 'all')  return this.todos;
          if(this.hash === 'finish') return this.todos.filter(item=>item.isSelected);
          if(this.hash === 'unfinish') return this.todos.filter(item=>!item.isSelected);
          window.location.hash = '/all';
      },
      count(){
          return this.todos.filter(item=>!item.isSelected).length
      }
  }
});
