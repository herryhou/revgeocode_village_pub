# 前言

處理  reverse geocodeing 時，輸入一個座標點，回應這個位置的名稱，幾種可能的回應

1. 地址 － ‘點’類型問題
2. 道路名稱 － ‘線’類型問題
3. 所在鄉鎮名稱  － ‘面’類型問題
    
這個 project 使用 google S2 geometry library，來試著處理‘面’類型的 reverse geocodeing 問題。


# 使用說明

### 安裝

1. 安裝 packages 
    ```npm install --production```
2. 執行 web
    ```npm start```

### 重建資料庫

1. 下載最新的[村里界圖(WGS84經緯度) shp 格式](http://data.moi.gov.tw/MoiOD/Data/DataDetail.aspx?oid=A9A30724-C3EF-4553-AC3F-2D53A606DABC).解壓縮後把檔案都放到 ./builddb/data/Village_NLSC/*
2. 執行  ```npm run builddb```

### 檢視資料
  執行  ```npm run dumpdb```
  
  
### 基本資料
1. ／build/db/data/villageUTF8.js  行政院主計總處[公布](http://www.dgbas.gov.tw/ct.asp?xItem=951&ctNode=5485), 編碼為 UTF8, 較為正確，但是收錄不完整,有些鄉鎮未列入。
[檔案下載來源](http://www.dgbas.gov.tw/public/data/dgbas03/bs1/%E8%A1%8C%E6%94%BF%E5%8D%80%E5%9F%9F%E5%8F%8A%E6%9D%91%E9%87%8C%E4%BB%A3%E7%A2%BC/%E5%90%84%E7%B8%A3%E5%B8%82%E5%8F%8A%E7%9B%B4%E8%BD%84%E5%B8%82/%E6%9D%91%E9%87%8C-all.xls)

2. ／build/db/data/village.js - 由上述 [村里界圖(WGS84經緯度) shp 格式](http://data.moi.gov.tw/MoiOD/Data/DataDetail.aspx?oid=A9A30724-C3EF-4553-AC3F-2D53A606DABC) 裡面取出的，編碼為 big5, 資料完整，但是 big5 缺碼的字會出現？。
    
        
  

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
