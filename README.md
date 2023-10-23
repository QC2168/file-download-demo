# file-download-demo

## 下载工具函数

### 通过文件流下载文件

```typescript
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
```
### 通过文件URL下载文件

```typescript
function saveFile(url:string,download:string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = download;
  a.target = "_blank";
  a.click();
}
```