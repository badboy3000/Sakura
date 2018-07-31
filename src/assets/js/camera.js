const requestUrl = encodeURI('https://upload.qiniup.com');
import md5 from 'vendor/md5'

export default {
  selectImages(count = 9) {
    return new Promise((resolve, reject) => {
      ImagePicker.getPictures(async (result) => {
        try {
          const images = [];
          const pendding = result.images.map(_ => {
            const path = `file://${_.path}`;
            const ext = path.split('.').pop() || 'png';
            const filename = `user/uploading/${new Date().getTime()}-${Math.random().toString(36).substring(3, 6)}/${md5(path.substr(path.lastIndexOf('/') + 1))}.${ext}`;
            const mimeType = `image/${ext}`;
            const options = new FileUploadOptions();
            options.fileName = filename;
            options.fileKey = 'file';
            options.mimeType = mimeType;
            return new Promise((success, failed) => {
              const uplaoder = new FileTransfer();
              uplaoder.upload(imgUrl, requestUrl, success, failed, options, true);
              // window.resolveLocalFileSystemURL(path, (file) => {
              //   images.push(path + '~~~' + file.toURL());
              //   success()
              // }, failed);
            })
          });
          await Promise.all(pendding);
          resolve(images)
        } catch (e) {
          reject(e)
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