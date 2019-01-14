<template>
  <div class="container">
    <el-upload
      class="img_upload"
      :action="serverUrl"
      name="img"
      :show-file-list="false"
      :on-change="handleImgSuccess"
      :auto-upload="false"
    >上传图片</el-upload>

    <img v-if="imgUrl" :src="imgUrl" alt>
  </div>
</template>

<script type="text/ecmascript-6">
import { getImgUrl } from "../../../api/api.js"
import { upLoadImg } from "../../../utility/imgUpload.js"
export default {
  data() {
    return {
      // 图片上传地址
      serverUrl: '',
      imgUrl: ''
    }
  },
  props: '',
  components: {},
  computed: {},
  watch: {},
  methods: {
    handleImgSuccess(file, fileList) {
      let regImgType = /\.(jpg|jpeg|png|gif|JPG|PNG|GIF)$/;
      if (file.name && file.name.match(regImgType)) {
        if (file.size / 1024 / 1024 < 1) {
          file.name = Number(new Date()) + `${regImgType.exec(file.name)[0]}`;
          let _this = this;
          let complete = function (res) {
            if (res.key && res.key.match(regImgType)) {
              getImgUrl(res.key).then(res => {
                if (res && res.data) {
                  _this.$message({
                    message: "上传成功",
                    type: "success"
                  });
                  _this.$nextTick(() => {
                    _this.imgUrl = res.data;
                  })
                  console.log(res.data);
                } else {
                  _this.$message({
                    message: "上传失败",
                    type: "fail"
                  });
                }
              }).catch(err => {
                console.error(err)
              })
            }
          };
          let error = function (err) {
            _this.$message({
              message: "上传失败",
              type: "fail"
            });
          };
          let next = function (res) {
            let total = res.total;
            total.percent.toFixed(2);
          };

          upLoadImg(file, fileList, complete, error.next);
        } else {
          this.$message({
            message: "上传文件大小不能超过 1MB!",
            type: "error"
          });
        }
      } else {
        this.$message({
          message: "请输入jpg,jpeg,png 和 gif 格式的图片",
          type: "error"
        });
      }
    }
  },
  beforeCreated() { },
  created() { },
  mounted() { },
}
</script>

<style></style>
<style scoped>
.img_upload {
  margin-bottom: 30px;
  padding: 10px;
}
.container img {
  width: 600px;
  height: 400px;
}
</style>
