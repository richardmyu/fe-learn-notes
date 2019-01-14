<template>
  <div class="container">
    <div class="vue-cropper-container">
      <div class="vue-cropper-content">
        <vueCropper
          ref="croppre"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="option.info"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :centerBox="option.centerBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :canScale="option.canScale"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixed="option.fixed"
          :fixedBox="option.fixedBox"
          :fixedNumber="option.fixedNumber"
          :cropBoxMovable="option.cropBoxMovable"
          @realTime="realTime"
          @imgLoad="imgLoad"
        ></vueCropper>
      </div>

      <div
        class="show_preview"
        :style="{'width':previews.w+'px','height':previews.h+'px','overflow':'hidden'}"
      >
        <div class="preview" :style="previews.div">
          <img :src="previews.url" :style="previews.img" alt>
        </div>
      </div>
    </div>

    <div class="clip_btns">
      <div class="scope_btn">
        <label class="btn" for="uploads">选择</label>
        <input
          type="file"
          id="uploads"
          style="position:absolute;clip:rect(0 0 0 0);"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          @change="uploadImg($event,1)"
        >
        <button class="style_btn" @click="changeScale(1)">+</button>
        <button class="style_btn" @click="changeScale(-1)">-</button>
        <button class="style_btn" @click="rotateLeft">↺</button>
        <button class="style_btn" @click="rotateRight">↻</button>
        <button class="btn" @click="finish">上传</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// error ???
// template or render function not defined.
// Vue项目图片剪切上传——vue-cropper的使用(https://www.cnblogs.com/libo0125ok/p/9296011.html)
import vueCropper from "vue-cropper"
import { getImgToken } from "../../../api/api.js"
export default {
  name: 'ImageCropper',
  data() {
    return {
      previews: {},
      // config
      option: {
        img: "",
        outputType: 'png',
        info: false,
        canScale: true,
        autoCrop: true,
        autoCropWidth: 180,
        autoCropHeight: 120,
        fixed: true,
        fixedNumber: [3, 2],
        full: false,
        fixedBox: true,
        canMove: true,
        canMoveBox: false,
        original: false,
        centerBox: true,
        cropBoxMovable: false,
        stric: false
      },
      // isUploadClipImg: false,
      clipImgUrl: "http://cdn.juliancj.com/",
      regImgType: /\.(jpg|jpeg|png|gif|JPG|PNG|GIF)$/
    }
  },
  props: '',
  components: {
    vueCropper
  },
  computed: {},
  watch: {},
  methods: {
    // 放缩
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num)
    },

    // 左旋
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },

    // 右旋
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },

    // 上传服务器
    finish(type) {
      let _this = this;
      let formData = new FormData();
      this.$refs.cropper.getCropData((data) => {
        if (!data) {
          this.$message({
            message: "请先上传本地图片在上传",
            type: "error"
          })
        }
        this.model = true;
        this.modelSrc = data;

        // 将 base64图片 转为 file 对象
        let arr = data.split(",");
        let mime = arr[0].match(/:(.*?);/)[1];
        let imgFileName = Number(new Date()) + ".png";
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        let imgFile = new File([u8arr], imgFileName, { type: mime });

        // 上传服务器
        let Qiniu_UploadUrl = "http://up-z1.qiniup.com";
        let Qiniu_upload = function (file, token, key) {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', Qiniu_UploadUrl, true);
          var formData, startDate;
          formData = new FormData();
          if (key !== null && key !== undefined) {
            formData.append('key', key);
          }
          formData.append('token', token);
          formData.append('file', file);
          var taking;
          xhr.upload.addEventListener("progress", function (evt) {
            if (evt.lengthComputable) {
              var nowDate = new Date().getTime();
              taking = nowDate - startDate;
              var x = (evt.loaded) / 1024;
              var y = taking / 1000;
              var uploadSpeed = (x / y);
              var formatSpeed;
              if (uploadSpeed > 1024) {
                formatSpeed = (uploadSpeed / 1024).toFixed(2) + "Mb\/s";
              } else {
                formatSpeed = uploadSpeed.toFixed(2) + "Kb\/s";
              }
              var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            }
          }, false);

          xhr.onreadystatechange = function (response) {
            if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
              var blkRet = JSON.parse(xhr.responseText);
              if (blkRet) {
                _this.$message({
                  message: "上传成功",
                  type: "success"
                })
                // 将数据发送到父组件
                _this.$emit("clipImgUrl", _this.clipImgUrl + blkRet.key)
              }
            }
          };
          startDate = new Date().getTime();
          xhr.send(formData);
        };
        getImgToken().then(res => {
          if (res) {
            Qiniu_upload(imgFile, res.data);
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },

    // 预览
    realTime(data) {
      this.previews = data
    },

    // 本地上传
    uploadImg(event, num) {
      this.option.img;
      let file = event.target.files[0];
      if (!this.regImgType.test(event.target.value)) {
        this.$message({
          message: "图片只限于 .jpg,.jpeg,.png 以及 .gif 类型",
          type: "error"
        })
        return false;
      }
      let reader = new FileReader();
      reader.onload = (event) => {
        let data;
        if (typeof event.target.result === "object" && event.target.result !== null) {
          data = window.URL.createObjectURL(new Blob([event.target.result]))
        } else {
          data = event.target.result;
        }
        // 原图
        this.option.img = data;
      }
      // 转化 base64
      reader.readAsDataURL(file)
    },

    imgLoad(msg) { },
  },
  beforeCreated() { },
  created() { },
  mounted() { },
}
</script>

<style>
.vue-cropper-container .vue-cropper-content .vue-cropper {
  background-image: none;
}

button {
  outline: none;
  border: none;
}
</style>

<style scoped>
.container {
}

.vue-cropper-container {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.vue-cropper-container .vue-cropper-content {
  width: 360px;
  height: 240px;
  border: 1px solid #cccccc;
  margin-right: 50px;
}

.vue-cropper-container .show_preview .preview {
  overflow: hidden;
  /* border: 1px solid #cccccc; */
  margin-left: 40px;
}

/* button */
.clip_btns {
  margin-top: 10px;
}

.clip_btns .scope_btn {
  width: 360px;
  display: flex;
  justify-content: space-between;
}

.clip_btns .scope_btn .btn {
  outline: none;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 8px 15px;
  font-size: 12px;
  border-radius: 3px;
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}

.clip_btns .scope_btn .style_btn {
  width: 28px;
  line-height: 28px;
  outline: none;
  display: inline-block;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  font-size: 18px;
  border-radius: 3px;
  text-align: center;
}
</style>
