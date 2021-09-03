import { axiosInstance } from './axiosInstance';

function getDB() {
  return axiosInstance
    .get('/getDB')
    .then(response => {
      const res = JSON.parse(response.request.response);
      return res;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

function mergeAudio(tracks, songName) {
  return axiosInstance
    .post('/mergeAudio', { tracks: tracks, name: songName })
    .then(response => {
      const res = JSON.parse(response.request.response);
      return res;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

function addAudio(fileName, nft) {
  return axiosInstance
    .post('/addAudio', { fileName: fileName, NFT: nft })
    .then(response => {
      const res = JSON.parse(response.request.response);
      return res;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

function uploadAudio() {
  return axiosInstance
    .post('/uploadAudio')
    .then(response => {
      const res = JSON.parse(response.request.response);
      return res;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

export { addAudio, getDB, mergeAudio, uploadAudio };
