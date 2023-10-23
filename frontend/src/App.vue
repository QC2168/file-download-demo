<script setup lang="ts">
import axios from 'axios'
function streamToDownloadFile(data: BlobPart, filename: string, type: string = 'application/octet-stream') {
  let blob = new Blob([data], { type });
  let url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  // 重命名文件
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

const download = () => {
  console.log('download');
  axios.get('/api/download/foo').then(res => {
    // 触发浏览器下载机制
    streamToDownloadFile(res.data, 'foo.txt')
  })
}

function saveFile(url:string,download:string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = download;
  a.target = "_blank";
  a.click();
}
const downloadByLink = () => {
  axios.get('/api/download/getLink').then(res => {
    // 触发浏览器下载机制
    saveFile(res.data.url,'docs')
  })
}
</script>

<template>
  <el-button @click="download">下载文件</el-button>
  <el-button @click="downloadByLink">通过链接下载文件</el-button>
</template>

<style scoped></style>

