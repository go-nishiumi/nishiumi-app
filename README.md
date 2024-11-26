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

## 課題における自己評価
- good  
基本的に要件通りに作成できた  
TypeScriptでのアプリ実装は初めてだったが、型定義を理解しつつ進めることができ、良い勉強になった  
比較的見やすいコードで、フォルダ構成も理解しやすい構成になったと思う  
CIでlintとprettierの実行をしたこと

- next  
API KEYを秘匿にできなかった(vercelを使おうとしたがうまくいかず、時間的に断念することになった)  
どの県のグラフが表示されているか、分かりづらい  
CIの中にtestフェーズを組み込めなかった
