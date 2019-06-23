import * as qiniu from "qiniu-js";
import { getImgToken } from "../api/api";

export function upLoadImg(file, fileList, complete, error, next) {
  getImgToken().then(res => {
    if (res && res.data) {
      let observable;
      let key;
      let subscription;
      let token = res.data;
      let config = {
        useCdnDomain: true,
        disableStatisticReport: false,
        retryCount: 6,
        region: qiniu.region
      };

      let putExtra = {
        fname: "",
        params: {},
        mineType: null
      };

      if (file) {
        file.name =
          Number(new Date()) +
          `${/\.(jpg|jpeg|png|gif|JPG|PBG|GIF)$/.exec(file.name)[0]}`;

        key = file.name;
        putExtra.params["x:name"] = key.split(".")[0];
      }

      let subObject = {
        next: next,
        error: error,
        complete: complete
      };

      observable = qiniu.upload(file.raw, key, token, putExtra, config);
      subscription = observable.subscribe(subObject);
    }
  });
}
