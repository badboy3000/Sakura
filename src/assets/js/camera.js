const requestUrl = encodeURI('https://upload.qiniup.com');
import md5 from 'vendor/md5'

export default {
  selectImages(count = 9) {
    return new Promise((resolve, reject) => {
      ImagePicker.getPictures((result) => {
        try {
          resolve(result.images.map(_ => `file://${_.path}`))
        } catch (e) {
          reject('图片读取失败.')
        }
      }, reject, {
        maximumImagesCount: count,
        width: -1,
        height: -1,
        quality: 80
      });
    })
  },

  async uploadImages(images) {
    const pendding = images.map(imgUrl => {
      return new Promise((resolve, reject) => {
        const ext = imgUrl.split('.').pop() || 'png';
        const filename = `user/uploading/${new Date().getTime()}-${Math.random().toString(36).substring(3, 6)}/${md5(imgUrl.substr(imgUrl.lastIndexOf('/') + 1))}.${ext}`;
        const mimeType = `image/${ext}`;
        const option = new FileUploadOptions();
        option.fileName = filename;
        option.fileKey = 'file';
        option.mimeType = mimeType;
        const uplaoder = new FileTransfer();
        uplaoder.upload(imgUrl, requestUrl, (res) => {
          // success callback
          this.$f7.dialog.alert(JSON.stringify(res), 'image upload success');
          resolve(res);
        }, (err) => {
          // error callback
          this.$f7.dialog.alert(JSON.stringify(err), 'image upload failed');
          reject(err);
        }, option, true);
      })
    });
    return await Promise.all(pendding);
  }
}