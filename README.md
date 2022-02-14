# BMI-caculator-demo

Outline
* **建立ＧitHup 新專案： 使用 Create React App**
* **安裝 Githup Pages**
* **打包部署：修改路徑**</br>
---------


**1. 建立 Ｇithup 新專案, 建立新的 Create React App**
```
$ npx create-react-app my-app
$ cd my-app
$ npm start
```

**2. 安裝 Github Pages**
```
//coding好之後, 安裝 gh-pages
npm install gh-pages
```
  ps:！！！必須取消勾選 keep this code private 才能使用 Github Pages(隱私權要設public公開)
  

**3. 在 Package.json 加入**
```
"scripts": {
  "deploy": "gh-pages -d build"
}
```

**4. 將coding好的project `push`至github repository**</br>

**5. 打包部署, 產生 `bundle` 檔案**
```
npm run build
```

**6. 將Code deploy上去**
```
npm run deploy
```

**7. 進入 Github > 專案的 Repository > Settings 頁面 > 下滑至 GitHub Pages > 出現 Publish 的連結 > source選擇branch:gh-pages/root**
  
**8. 連結打開會呈現一片空白，因為路徑指向錯誤，此時從 Github Project 切換到 Branch gh-pages 找到 index.html 更改 css 及 js 的連結路徑**
```
<!doctype html>
<html lang="en">
<head>
//...
<script defer="defer" src="/這裡加上repository名稱/static/js/main.c5e56371.js"></script>
<link href="/這裡加上repository名稱/static/css/main.f807c8cc.css" rel="stylesheet">
</head>

<body>
//...
</body>
</html>
```

**9. 如果code有修改就要重新部署, 重新執行一次5~8步驟**

[參考ref](https://medium.com/itsoktomakemistakes/create-react-app-deploy-github-pages-95a62d29ca02)

