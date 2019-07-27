<template>
	<div class="">
		<blog-post
		  :title="blog.title"
			:likes="blog.likes"
			:isPublished="blog.isPublished"
			:commentIds="blog.commentIds"
			:author="blog.author"
			:logTime="blog.logTime"
		></blog-post>
		<hr>
		<blog-post-all :post="blog"></blog-post-all>
		<hr>
		<my-component
		  :propA="2"
			:propB="'h12'"
			:propC="'ghjkl'"
			:propD="23"
			:propE="{msg:'ok'}"
			:propF="'danger'"
			:propG="protoFn('jack','Ma')"
		></my-component>
		<hr>
		<my-component
		  :propA="2"
			:propB="12"
		></my-component>
	</div>
</template>

<script>
import Vue from "vue";
Vue.component("blog-post", {
  props: {
    title: String,
    likes: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    logTime: Function,
    contactsPromise: Promise
  },
  methods: {
    handleCallback() {
      this.logTime();
    }
  },
  template: `<div>
	<h3>{{title}}</h3>
	<p>{{likes}}</p>
	<p>{{isPublished?'两周前':new Date()}}</p>
	<ul>
		<li v-for="(item,index) of commentIds" :key="index">{{item}}</li>
	</ul>
	<p>{{author.name }} - {{author.sex }} - {{author.age}}</p>
	<button @click="handleCallback">click</button>
	</div>`
});

Vue.component("blog-post-all", {
  props: {
    post: {
      title: String,
      likes: Number,
      isPublished: Boolean,
      commentIds: Array,
      author: Object,
      logTime: Function,
      contactsPromise: Promise
    }
  },
  methods: {
    handleCallback() {
      console.log(this.post);
      this.post.logTime();
    }
  },
  template: `<div>
	<h3>{{post.title}}</h3>
	<p>{{post.likes}}</p>
	<p>{{post.isPublished?'两周前':new Date()}}</p>
	<ul>
		<li v-for="(item,index) of post.commentIds" :key="index">{{item}}</li>
	</ul>
	<p>{{post.author.name }} - {{post.author.sex }} - {{post.author.age}}</p>
	<button @click="handleCallback">click</button>
	</div>`
});

function Person(fn, ln) {
  this.firstName = fn;
  this.lastName = ln;
}

Vue.component("my-component", {
  props: {
    propA: Number,
    propB: [String, Number],
    propC: {
      type: String,
      require: true
    },
    propD: {
      type: Number,
      default: 100
    },
    propE: {
      type: Object,
      default: function() {
        return { message: "no params" };
      }
    },
    propF: {
      validator: function(value) {
        return ["success", "warning", "danger"].indexOf(value) !== -1;
      }
    },
    propG: Person
  },
  template: `
	<li>
	<p>{{propA}}</p>
	<p>{{propB}}</p>
	<p>{{propC}}</p>
	<p>{{propD}}</p>
	<p>{{propE}}</p>
	<p>{{propF}}</p>
	<p>{{propG}}</p>
	</li>
	`
});
export default {
  name: "PropCom",
  components: {},
  props: {},
  data() {
    return {
      blog: {
        title: "按时将碍事",
        likes: 23,
        isPublished: true,
        commentIds: [12, 45, 67],
        author: {
          name: "jack",
          sex: "男",
          age: 34
        },
        logTime() {
          console.log("now time", new Date());
        }
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    protoFn(fn, ln) {
      return new Person(fn, ln);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>
