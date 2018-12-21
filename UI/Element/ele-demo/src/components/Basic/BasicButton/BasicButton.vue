<template>
  <div class="container">
    <div class="container-title">
      <h1>Button 按钮</h1>
      <p>常用的操作按钮。</p>
    </div>
    <div class="container-content">
      <!-- 基础用法 -->
      <section class="content-item">
        <div class="item-title">
          <h3>基础用法</h3>
          <p>使用type、plain、round和circle属性来定义 Button 的样式。</p>
          <p>注释：除了默认值以外，还有：medium、small、mini，通过设置 size 属性来配置它们。</p>
        </div>
        <div class="item-demo">
          <el-row>
            <el-button size="medium" @click="showM('默认: type=默认')">默认按钮</el-button>
            <el-button size="medium" type="primary" @click="showM('默认: type=primary')">主要按钮</el-button>
            <el-button size="medium" type="success" @click="showM('默认: type=success')">成功按钮</el-button>
            <el-button size="medium" type="info" @click="showM('默认: type=info')">信息按钮</el-button>
            <el-button size="medium" type="warning" @click="showM('默认: type=warning')">警告按钮</el-button>
            <el-button size="medium" type="danger" @click="showM('默认: type=danger')">危险按钮</el-button>
          </el-row>

          <el-row>
            <el-button size="small" plain @click="showM('plain: type=默认')">朴素按钮</el-button>
            <el-button size="small" type="primary" plain @click="showM('plain: type=primary')">主要按钮</el-button>
            <el-button size="small" type="success" plain @click="showM('plain: type=success')">成功按钮</el-button>
            <el-button size="small" type="info" plain @click="showM('plain: type=info')">信息按钮</el-button>
            <el-button size="small" type="warning" plain @click="showM('plain: type=warning')">警告按钮</el-button>
            <el-button size="small" type="danger" plain @click="showM('plain: type=danger')">危险按钮</el-button>
          </el-row>

          <el-row>
            <el-button size="mini" round @click="showM('round: type=默认')">圆角按钮</el-button>
            <el-button size="mini" type="primary" round @click="showM('round: type=primary')">主要按钮</el-button>
            <el-button size="mini" type="success" round @click="showM('round: type=success')">成功按钮</el-button>
            <el-button size="mini" type="info" round @click="showM('round: type=info')">信息按钮</el-button>
            <el-button size="mini" type="warning" round @click="showM('round: type=warning')">警告按钮</el-button>
            <el-button size="mini" type="danger" round @click="showM('round: type=danger')">危险按钮</el-button>
          </el-row>

          <el-row>
            <el-button icon="el-icon-search" circle @click="showM('circle: type=默认')"></el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="showM('circle: type=primary')"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-check"
              circle
              @click="showM('circle: type=success')"
            ></el-button>
            <el-button
              type="info"
              icon="el-icon-message"
              circle
              @click="showM('circle: type=info')"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-star-off"
              circle
              @click="showM('circle: type=warning')"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="showM('circle: type=danger')"
            ></el-button>
          </el-row>
        </div>
      </section>
      <!-- 禁用状态 -->
      <section class="content-item">
        <div class="item-title">
          <h3>禁用状态</h3>
          <p>你可以使用 disabled 属性来定义按钮是否可用，它接受一个Boolean值。</p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-row>
            <el-button disabled>默认按钮</el-button>
            <el-button type="primary" disabled>主要按钮</el-button>
            <el-button type="success" disabled>成功按钮</el-button>
            <el-button type="info" disabled>信息按钮</el-button>
            <el-button type="warning" disabled>警告按钮</el-button>
            <el-button type="danger" disabled>危险按钮</el-button>
          </el-row>

          <el-row>
            <el-button plain disabled>朴素按钮</el-button>
            <el-button type="primary" plain disabled>主要按钮</el-button>
            <el-button type="success" plain disabled>成功按钮</el-button>
            <el-button type="info" plain disabled>信息按钮</el-button>
            <el-button type="warning" plain disabled>警告按钮</el-button>
            <el-button type="danger" plain disabled>危险按钮</el-button>
          </el-row>
        </div>
      </section>
      <!-- 文字按钮 -->
      <section class="content-item">
        <div class="item-title">
          <h3>文字按钮</h3>
          <p>没有边框和背景色的按钮。</p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-button type="text" @click="showM('type=text')">文字按钮</el-button>
          <el-button type="text" disabled>文字按钮</el-button>
        </div>
      </section>
      <!-- 图标按钮 -->
      <section class="content-item">
        <div class="item-title">
          <h3>图标按钮</h3>
          <p>设置icon属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用 i 标签即可，可以使用自定义图标。</p>
          <p>注释：在 button 组件内 通过 icon 属性定义的 icon 默认在文字的左边</p>
        </div>
        <div class="item-demo">
          <el-button type="primary" icon="el-icon-edit" @click="showM('el-icon-edit')"></el-button>
          <el-button type="primary" icon="el-icon-share" @click="showM('el-icon-share')"></el-button>
          <el-button type="primary" icon="el-icon-delete" @click="showM('el-icon-delete')"></el-button>
          <el-button type="primary" icon="el-icon-search" @click="showM('el-icon-search')">搜索</el-button>
          <el-button type="primary" @click="showM('el-icon-upload right')">
            上传
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </div>
      </section>
      <!-- 按钮组 -->
      <section class="content-item">
        <div class="item-title">
          <h3>按钮组</h3>
          <p>使用 el-button-group 标签来嵌套你的按钮。</p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-button-group>
            <el-button type="primary" icon="el-icon-arrow-left" @click="showM('上一页')">上一页</el-button>
            <el-button type="primary" @click="showM('下一页')">
              下一页
              <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit" @click="showM('编辑')"></el-button>
            <el-button type="primary" icon="el-icon-share" @click="showM('分享')"></el-button>
            <el-button type="primary" icon="el-icon-delete" @click="showM('删除')"></el-button>
          </el-button-group>
        </div>
      </section>
      <!-- 加载中 -->
      <section class="content-item">
        <div class="item-title">
          <h3>加载中</h3>
          <p>要设置为 loading 状态，只要设置loading属性为true即可。</p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-button type="primary" :loading="isLoading" @click="showLoad">{{loadText}}</el-button>
        </div>
      </section>
      <!-- autofocus -->
      <section class="content-item">
        <div class="item-title">
          <h3>autofocus</h3>
          <p>是否默认聚焦</p>
          <p>注释：对 plain,round,circle 类型无效</p>
        </div>
        <div class="item-demo">
          <el-row>
            <el-button :autofocus="true">autofocus</el-button>
            <el-button :autofocus="false">autofocus</el-button>
          </el-row>
          <el-row>
            <el-button plain :autofocus="true">autofocus</el-button>
            <el-button plain :autofocus="false">autofocus</el-button>
          </el-row>
          <el-row>
            <el-button round :autofocus="true">autofocus</el-button>
            <el-button round :autofocus="false">autofocus</el-button>
          </el-row>
          <el-row>
            <el-button circle :autofocus="true" icon="el-icon-delete"></el-button>
            <el-button circle :autofocus="false"  icon="el-icon-delete"></el-button>
          </el-row>
        </div>
      </section>
      <!-- 加载中 -->
      <section class="content-item">
        <div class="item-title">
          <h3>加载中</h3>
          <p>要设置为 loading 状态，只要设置loading属性为true即可。</p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-button type="primary" :loading="isLoading" @click="showLoad">{{loadText}}</el-button>
        </div>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      isLoading: false,
      loadText: '点击加载'
    }
  },
  props: '',
  components: {},
  computed: {},
  watch: {},
  methods: {
    showM(str) {
      alert(str);
    },
    showLoad() {
      this.loadText = '加载中';
      this.isLoading = true;
    }
  },
  beforeCreated() { },
  created() { },
  mounted() { },
}
</script>

<style></style>
<style scoped lang="less">
.el-row {
  .el-button {
    margin-bottom: 30px;
  }
}
</style>
