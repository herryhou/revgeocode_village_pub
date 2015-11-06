# 使用說明

### 安裝

1. 安裝 packages 
    ```npm install --production```
2. 執行 web
    ```npm start```

### 重建資料庫

1. 下載最新的台灣村里界圖 (wgs84 經緯度版本 http://data.gov.tw/node/7438, 檔案格式：shp）解壓縮後把檔案都放到 ./builddb/data/Village_NLSC/*
2. 執行  ```npm run builddb```

### 檢視資料
  執行  ```npm run dumpdb```