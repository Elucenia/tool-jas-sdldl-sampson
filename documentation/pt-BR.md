<!-- ELUCENIA technical documentation · jas-sdldl-sampson · pt-BR · no clinical/professional/rights approval -->

# Sampson 2021 · estimativa de sdLDL-C

[condições, fontes e permissões](https://elucenia.org/pt-br/ferramentas/jas-sdldl-sampson)

## Como usar

Use a ferramenta no portal ou abra index.html em um servidor HTTP local. Selecione o idioma, preencha os campos e calcule.

## Entradas e unidades

### Método de entrada de LDL-C

`mode`



- `direct`: LDL-C medido informado
- `panel`: Calcular LDL-C pelo painel lipídico

### Triglicerídeos

`triglyceridesMgDl`

mg/dL · intervalo: 1–800

### LDL-C medido (modo direto)

`ldlMgDl`

mg/dL · intervalo: 1–500

### Colesterol total (modo painel)

`tcMgDl`

mg/dL · intervalo: 1–700

### HDL-C (modo painel)

`hdlMgDl`

mg/dL · intervalo: 1–300

## Edição do método

Sampson 2021; LDL-C calculado opcional por Sampson–NIH 2020

## Fórmula documentada

sdLDL-C = LDL-C − (1,43 × LDL-C − 0,14 × ln(TG) × LDL-C − 8,99), em mg/dL. No modo painel, LDL-C = CT/0,948 − HDL-C/0,971 − (TG/8,56 + TG × (CT − HDL-C)/2140 − TG²/16100) − 9,44. CT, HDL-C e TG em mg/dL. ln indica logaritmo natural.

## Limites e população

Estimativa de subfração lipídica; não equivale à dosagem direta. No modo direto informe LDL-C; no modo painel informe colesterol total e HDL-C. Revisão clínica independente não realizada.

## Referências

- [Sampson et al. 2021](https://doi.org/10.1093/clinchem/hvab048)
- [Sampson et al. 2020 · LDL-C](https://doi.org/10.1001/jamacardio.2020.0013)

## Reproduzir os testes técnicos

Execute node test.cjs na pasta raiz deste repositório para repetir os casos sintéticos registrados. As entradas, expectativas e tolerâncias originais são preservadas. Testes técnicos não constituem validação clínica.

```sh
node test.cjs
```

tool.json contém fontes, edição e escopo de revisão. examples.json conserva as entradas e expectativas sintéticas; results.json registra os resultados obtidos.

[Ficha e referências](../tool.json) · [Código JavaScript](../calculator.js) · [Casos de referência](../examples.json) · [results.json](../results.json)

## Revisão e condições de uso

Revisão clínica independente não realizada.

Esta interface é uma tradução autoral, não uma edição oficial ou certificada. Revisão clínica independente, revisão linguística profissional e autorização de direitos de instrumentos não foram realizadas.

Resultado da fórmula ou classificação. Interpretação, conduta e aplicabilidade dependem da avaliação profissional e da fonte selecionada.

## Licença e atribuição

Apache-2.0 aplica-se somente ao código da ELUCENIA. Os instrumentos, publicações, traduções e dados mantêm os direitos dos respectivos titulares. Preserve LICENSE e NOTICE.

ELUCENIA · Felipe Guedes · Copyright © 2026

## Edição do método · Limites e população

O modo que recebe LDL-C medido é uma extensão aritmética local. A calibração publicada em 2021 utiliza LDL-C estimado pela equação Sampson; a mesma validação clínica não é atribuída ao modo direto. O limite de triglicerídeos de 800 mg/dL pertence à equação de LDL-C de 2020 e não comprova, por si só, a aplicabilidade da estimativa de sdLDL-C.

