import { GET, POST, DELETE, PUT } from "./index";

// 获取图片token
export let getImgToken = () => {
  return GET(`api/v1/getQiniuToken`);
};

// 获取图片url
export let getImgUrl = data => {
  return GET(`api/v1/getImageUrl?fileName=${data}`);
};
