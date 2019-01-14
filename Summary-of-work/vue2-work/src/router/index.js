import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home/Home";
import BidirectionalData from "@/components/EditorComponent/VueQuillEditor/BidirectionalData";
import ManuallyControlData from "@/components/EditorComponent/VueQuillEditor/ManuallyControlData";
import ImgUpload from "@/components/ImageComponent/ImgUpload/ImgUpload";
import ImageCropper from "@/components/ImageComponent/ImageCropper/ImageCropper";
import VueQuillEditorImgUpload from "@/components/ImageComponent/VueQuillEditorImgUpload/VueQuillEditorImgUpload";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    },
    {
      path: "/bidirectionalData",
      name: "BidirectionalData",
      component: BidirectionalData
    },
    {
      path: "/manuallyControlData",
      name: "ManuallyControlData",
      component: ManuallyControlData
    },
    {
      path: "/imgUpload",
      name: "ImgUpload",
      component: ImgUpload
    },
    {
      path: "/imageCropper",
      name: "ImageCropper",
      component: ImageCropper
    },
    {
      path: "/vueQuillEditorImgUpload",
      name: "VueQuillEditorImgUpload",
      component: VueQuillEditorImgUpload
    }
  ]
});
