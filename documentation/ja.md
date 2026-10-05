<!-- ELUCENIA technical documentation · jas-sdldl-sampson · ja · no clinical/professional/rights approval -->

# Sampson 2021 · sdLDL-C推定

[条件・出典・許諾](https://elucenia.org/ja/tools/jas-sdldl-sampson)

## 使い方

ポータルでツールを使用するか、ローカルHTTPサーバー経由でindex.htmlを開いてください。言語を選択し、項目を入力して計算してください。

## 入力項目と単位

### LDL-Cの入力方法

`mode`



- `direct`: 実測LDL-Cを入力
- `panel`: 脂質検査からLDL-Cを計算

### 中性脂肪

`triglyceridesMgDl`

mg/dL · 範囲: 1–800

### 実測LDL-C（直接入力モード）

`ldlMgDl`

mg/dL · 範囲: 1–500

### 総コレステロール（脂質検査モード）

`tcMgDl`

mg/dL · 範囲: 1–700

### HDL-C（脂質検査モード）

`hdlMgDl`

mg/dL · 範囲: 1–300

## 方法の版

Sampson 2021；Sampson–NIH 2020による任意のLDL-C計算

## 記載された計算式

sdLDL-C = LDL-C −（1.43 × LDL-C − 0.14 × ln(TG) × LDL-C − 8.99），mg/dL。パネルモード：LDL-C = CT/0.948 − HDL-C/0.971 −（TG/8.56 + TG ×（CT − HDL-C）/2140 − TG²/16100）−9.44。CT、HDL-C、TGはmg/dL。lnは自然対数を表します。

## 限界・対象集団

脂質亜分画の推定であり、直接測定と同等ではありません。直接モードではLDL-C、パネルモードでは総コレステロールとHDL-Cを入力してください。独立した臨床レビューは未実施です。

## 参考文献

- [Sampson et al. 2021](https://doi.org/10.1093/clinchem/hvab048)
- [Sampson et al. 2020 · LDL-C](https://doi.org/10.1001/jamacardio.2020.0013)

## 技術テストの再現

このリポジトリのルートディレクトリでnode test.cjsを実行すると、記録された合成ケースを再実行できます。元の入力、期待結果、許容誤差は保持されています。技術テストは臨床的検証を意味しません。

```sh
node test.cjs
```

tool.jsonには出典、版、確認範囲が記録されています。examples.jsonには合成入力と期待結果が保持され、results.jsonには実際に得られた結果が記録されています。

[記録・参考文献](../tool.json) · [JavaScriptコード](../calculator.js) · [参照ケース](../examples.json) · [results.json](../results.json)

## 確認状況と使用条件

独立した臨床レビューは実施されていません。

このインターフェースは独自に作成した翻訳であり、公式版や認証済みの版ではありません。独立した臨床レビュー、専門家による言語レビュー、評価尺度等の権利許諾の確認は実施されていません。

式または分類の結果です。解釈、対応、適用可能性は専門家による評価と選択した出典に依存します。

## ライセンスと帰属表示

Apache-2.0はELUCENIAのコードにのみ適用されます。評価尺度等、出版物、翻訳、データの権利は、それぞれの権利者に帰属します。LICENSEとNOTICEを保持してください。

ELUCENIA · Felipe Guedes · Copyright © 2026

## 方法の版 · 限界・対象集団

実測LDL-Cを入力するモードは、独自の算術拡張です。2021年に公表された較正ではSampson式で推定したLDL-Cを使用しており、直接入力モードに同じ臨床的検証があるとはしていません。トリグリセリドの上限800 mg/dLは2020年のLDL-C式に属し、それだけではsdLDL-C推定の適用可能性を証明しません。

