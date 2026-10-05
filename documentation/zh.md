<!-- ELUCENIA technical documentation · jas-sdldl-sampson · zh · no clinical/professional/rights approval -->

# Sampson 2021 · sdLDL-C估算

[条件、来源与许可](https://elucenia.org/zh/tools/jas-sdldl-sampson)

## 使用方法

在门户中使用工具，或通过本地 HTTP 服务器打开 index.html。选择语言，填写各字段，然后计算。

## 输入与单位

### LDL-C 输入方式

`mode`



- `direct`: 输入测定 LDL-C
- `panel`: 根据血脂面板计算 LDL-C

### 甘油三酯

`triglyceridesMgDl`

mg/dL · 范围: 1–800

### 测定 LDL-C（直接输入模式）

`ldlMgDl`

mg/dL · 范围: 1–500

### 总胆固醇（血脂面板模式）

`tcMgDl`

mg/dL · 范围: 1–700

### HDL-C（血脂面板模式）

`hdlMgDl`

mg/dL · 范围: 1–300

## 方法版本

Sampson 2021；可选择用Sampson–NIH 2020计算LDL-C

## 已记录的公式

sdLDL-C = LDL-C −（1.43 × LDL-C − 0.14 × ln(TG) × LDL-C − 8.99），单位mg/dL。面板模式：LDL-C = CT/0.948 − HDL-C/0.971 −（TG/8.56 + TG ×（CT − HDL-C）/2140 − TG²/16100）−9.44。CT、HDL-C和TG的单位均为mg/dL。ln表示自然对数。

## 限制与适用人群

血脂亚组分的估算，不等于直接测定。直接模式输入LDL-C；面板模式输入总胆固醇和HDL-C。尚未进行独立临床审核。

## 参考文献

- [Sampson et al. 2021](https://doi.org/10.1093/clinchem/hvab048)
- [Sampson et al. 2020 · LDL-C](https://doi.org/10.1001/jamacardio.2020.0013)

## 复现技术测试

在此仓库的根目录中运行 node test.cjs，以重复已记录的合成案例。原始输入、预期结果和容差保持不变。技术测试不构成临床验证。

```sh
node test.cjs
```

tool.json 包含来源、版本和审查范围。examples.json 保留合成输入与预期结果；results.json 记录实际得到的结果。

[记录与参考文献](../tool.json) · [JavaScript代码](../calculator.js) · [参考案例](../examples.json) · [results.json](../results.json)

## 审查与使用条件

尚未开展独立临床审查。

此界面为自主编写的翻译，并非官方或认证版本。尚未完成独立临床审查、专业语言审查或工具权利授权。

公式或分类结果。解释、处理及适用性须结合专业评估和所选来源。

## 许可与署名

Apache-2.0 仅适用于 ELUCENIA 代码。工具、出版物、翻译和数据的权利仍归各自权利人所有。请保留 LICENSE 和 NOTICE。

ELUCENIA · Felipe Guedes · Copyright © 2026

## 方法版本 · 限制与适用人群

输入实测LDL-C的模式是本地算术扩展。2021年发表的校准采用Sampson方程估算的LDL-C；直接输入模式不被赋予同等的临床验证。800 mg/dL的甘油三酯上限属于2020年的LDL-C方程，本身不能证明sdLDL-C估算的适用性。

