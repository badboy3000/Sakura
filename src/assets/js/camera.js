import md5 from 'vendor/md5'
import store from 'src/store'
import { host } from 'env'
const requestUrl = encodeURI('https://upload.qiniup.com');

export default {
  selectImages(count = 9) {
    return new Promise((resolve, reject) => {
      ImagePicker.getPictures(async (result) => {
        try {
          const images = [];
          const user = store.state.user;
          const pendding = result.images.map(_ => {
            const path = `file://${_.path}`;
            const ext = path.split('.').pop() || 'png';
            const filename = `user/${user.id}/uploading/${new Date().getTime()}-${Math.random().toString(36).substring(3, 6)}/${md5(path.substr(path.lastIndexOf('/') + 1))}.${ext}`;
            const mimeType = `image/${ext}`;
            const params = {};
            params.token = user.uptoken.upToken;
            params.key = filename;
            const options = new FileUploadOptions();
            options.fileName = filename;
            options.fileKey = 'file';
            options.mimeType = mimeType;
            options.params = params;
            return new Promise((success, failed) => {
              const uplaoder = new FileTransfer();
              uplaoder.upload(path, requestUrl, (res) => {
                try {
                  images.push(JSON.parse(res.response).data)
                } catch (e) {
                  failed(e)
                }
                success()
              }, failed, options, true);
            })
          });
          await Promise.all(pendding);
          resolve(images.map(_ => Object.assign(_, {
            url: `${host.image}${_.key}`
          })))
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
  }
}