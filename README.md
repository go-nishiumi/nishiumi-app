# README
本READMEでは、nishiumi-appのローカル環境構築手順とその他詳細事項を記載。

## ローカル環境構築手順

1. パッケージインストール
```
npm ci
```

2. build  
```
npm run build
```  
([build](./build))直下に作成される）

3. アプリの起動  
```
npm start
```  
(localhost:3000で立ち上がる)

## eslintとprettierの実行
eslint
```
npm run lint
```  
prettier
```
npm run fmt
```

## playwrightテストの実行
```
npm run test
```  
なお、テストコードは[tests](tests)フォルダに格納。

## その他
### GitHub Pagesへの公開手順
[https://github.com/go-nishiumi/nishiumi-app/tree/main](https://github.com/go-nishiumi/nishiumi-app/tree/main)へのプッシュをトリガーにCI/CDでデプロイされる。  
設定ファイルは[buildspec.yml](.github\workflows\buildspec.yml)に記載。

### playwrightのコードジェネレーター使用コマンド
```
npm run codegen
```

### 本アプリケーション構築時に使用したvscode拡張機能
- Japanese Language Pack for Visual Studio Code  
https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-ja
- Playwright Test for VSCode  
https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright