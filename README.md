# Sampson 2021 · estimativa de sdLDL-C

Standalone ELUCENIA implementation of the cited equations. Source and tests run locally; no account, remote calculator, network or portal/dashboard source is required. Technical tests are distinct from clinical validation and professional translation approval, both not performed.

## Run

```sh
node test.cjs
node cli.cjs --locale en < input.json
node cli.cjs --locale ar --localized < input.json
```

Without `--localized`, JSON numbers or canonical dot-decimal numeric strings retain the mathematical module contract. `--locale` controls output presentation. With `--localized`, numeric strings are parsed using the selected locale, including grouping/decimal separators and Arabic digits; machine option values remain unchanged. `canonicalResult` preserves source module output for audit; `display` contains authored localized presentation.

Open `index.html` through a local static HTTP server and select one of the ten languages. Inputs and calculations stay in that browser. Field visibility, required markers and age limits follow the selected equation or direct/panel mode.

## Sources, edition and evidence

- [Method metadata](tool.json), [source](method.cjs), [independent vectors](independent-source-cases.json), [fresh package test results](results.json), [provenance](provenance.json), [rights/scope](rights-and-scope.json).
- [pt-BR](documentation/pt-BR.md) · [en](documentation/en.md) · [es](documentation/es.md) · [fr](documentation/fr.md) · [de](documentation/de.md) · [it](documentation/it.md) · [ar](documentation/ar.md) · [zh](documentation/zh.md) · [ja](documentation/ja.md) · [hi](documentation/hi.md)

The source-derived Decimal60 expectations predate this package replay; replay does not create a new independent oracle. All original synthetic numerical expectations, domain rejections and malformed-input cases are retained, with per-item expected/obtained results. [Original independent oracle](source/original-independent-oracle.py) accepts `{ "cases": [...] }` on stdin and emits Decimal references; for the combined FLI/Tanaka/Sampson script, its original additional generated cases are preserved as original source behavior.

This package includes no patient data, production authentication, .env, account sessions, deployment build or private portal/dashboard source. The previous public README and its immutable commit are retained in [baseline](baseline/README.md) and provenance. The current remote repository is not regarded as implemented until the complete files are published and read back.

## License and review

Apache-2.0 licenses ELUCENIA-authored code only; retain [LICENSE](LICENSE) and [NOTICE](NOTICE). Scientific publications keep their rights and citations. No provider terms are accepted by this package and no third-party endorsement or unrestricted publication license is asserted. Numerical conformance is not clinical calibration, patient suitability, diagnosis, treatment, regulatory approval or a professional language signature.
