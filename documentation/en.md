<!-- ELUCENIA technical documentation · jas-sdldl-sampson · en · no clinical/professional/rights approval -->

# Sampson 2021 · sdLDL-C estimate

[conditions, sources and permissions](https://elucenia.org/en/tools/jas-sdldl-sampson)

## How to use

Use the tool in the portal or open index.html through a local HTTP server. Select the language, complete the fields and calculate.

## Inputs and units

### LDL-C input method

`mode`



- `direct`: Enter measured LDL-C
- `panel`: Calculate LDL-C from the lipid panel

### Triglycerides

`triglyceridesMgDl`

mg/dL · range: 1–800

### Measured LDL-C (direct mode)

`ldlMgDl`

mg/dL · range: 1–500

### Total cholesterol (panel mode)

`tcMgDl`

mg/dL · range: 1–700

### HDL-C (panel mode)

`hdlMgDl`

mg/dL · range: 1–300

## Method edition

Sampson 2021; optional LDL-C calculation by Sampson–NIH 2020

## Documented formula

sdLDL-C = LDL-C − (1.43 × LDL-C − 0.14 × ln(TG) × LDL-C − 8.99), in mg/dL. In panel mode, LDL-C = TC/0.948 − HDL-C/0.971 − (TG/8.56 + TG × (TC − HDL-C)/2140 − TG²/16100) − 9.44. TC, HDL-C and TG in mg/dL. ln denotes the natural logarithm.

## Limits and population

Lipid subfraction estimate; not equivalent to direct measurement. In direct mode enter LDL-C; in panel mode enter total cholesterol and HDL-C. Independent clinical review has not been performed.

## References

- [Sampson et al. 2021](https://doi.org/10.1093/clinchem/hvab048)
- [Sampson et al. 2020 · LDL-C](https://doi.org/10.1001/jamacardio.2020.0013)

## Reproduce the technical tests

Run node test.cjs in the root directory of this repository to repeat the recorded synthetic cases. Original inputs, expectations and tolerances are preserved. Technical tests do not constitute clinical validation.

```sh
node test.cjs
```

tool.json contains sources, edition and review scope. examples.json retains synthetic inputs and expectations; results.json records the obtained results.

[Record and references](../tool.json) · [JavaScript code](../calculator.js) · [Reference cases](../examples.json) · [results.json](../results.json)

## Review and conditions of use

Independent clinical review has not been performed.

This interface is an authorial translation, not an official or certified edition. Independent clinical review, professional language review and instrument rights clearance have not been performed.

Formula or classification result. Interpretation, care and applicability depend on professional assessment and the selected source.

## License and attribution

Apache-2.0 applies only to ELUCENIA code. Rights to instruments, publications, translations and data remain with their respective holders. Preserve LICENSE and NOTICE.

ELUCENIA · Felipe Guedes · Copyright © 2026

## Method edition · Limits and population

The mode that accepts measured LDL-C is a local arithmetic extension. The published 2021 calibration uses LDL-C estimated with the Sampson equation; the same clinical validation is not attributed to the direct mode. The triglyceride limit of 800 mg/dL belongs to the 2020 LDL-C equation and does not, by itself, establish the applicability of the sdLDL-C estimate.

