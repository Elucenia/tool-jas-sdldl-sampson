<!-- ELUCENIA technical documentation · jas-sdldl-sampson · de · no clinical/professional/rights approval -->

# Sampson 2021 · sdLDL-C-Schätzung

[Bedingungen, Quellen und Berechtigungen](https://elucenia.org/de/werkzeuge/jas-sdldl-sampson)

## Verwendung

Verwenden Sie das Werkzeug im Portal oder öffnen Sie index.html über einen lokalen HTTP-Server. Wählen Sie die Sprache, füllen Sie die Felder aus und berechnen Sie das Ergebnis.

## Eingaben und Einheiten

### Methode der LDL-C-Eingabe

`mode`



- `direct`: Gemessenes LDL-C eingeben
- `panel`: LDL-C aus dem Lipidprofil berechnen

### Triglyzeride

`triglyceridesMgDl`

mg/dL · Bereich: 1–800

### Gemessenes LDL-C (Direktmodus)

`ldlMgDl`

mg/dL · Bereich: 1–500

### Gesamtcholesterin (Lipidprofilmodus)

`tcMgDl`

mg/dL · Bereich: 1–700

### HDL-C (Lipidprofilmodus)

`hdlMgDl`

mg/dL · Bereich: 1–300

## Fassung der Methode

Sampson 2021; optionale LDL-C-Berechnung nach Sampson–NIH 2020

## Dokumentierte Formel

sdLDL-C = LDL-C − (1,43 × LDL-C − 0,14 × ln(TG) × LDL-C − 8,99), in mg/dL. Im Panelmodus: LDL-C = TC/0,948 − HDL-C/0,971 − (TG/8,56 + TG × (TC − HDL-C)/2140 − TG²/16100) − 9,44. TC, HDL-C und TG in mg/dL. ln bezeichnet den natürlichen Logarithmus.

## Grenzen und Population

Schätzung einer Lipidunterfraktion; nicht gleichwertig mit direkter Messung. Im Direktmodus LDL-C eingeben, im Panelmodus Gesamtcholesterin und HDL-C. Keine unabhängige klinische Prüfung durchgeführt.

## Referenzen

- [Sampson et al. 2021](https://doi.org/10.1093/clinchem/hvab048)
- [Sampson et al. 2020 · LDL-C](https://doi.org/10.1001/jamacardio.2020.0013)

## Technische Tests reproduzieren

Führen Sie node test.cjs im Stammverzeichnis dieses Repositorys aus, um die dokumentierten synthetischen Fälle zu wiederholen. Ursprüngliche Eingaben, erwartete Ergebnisse und Toleranzen bleiben erhalten. Technische Tests stellen keine klinische Validierung dar.

```sh
node test.cjs
```

tool.json enthält Quellen, Ausgabe und Umfang der Überprüfung. examples.json bewahrt die synthetischen Eingaben und erwarteten Ergebnisse; results.json dokumentiert die tatsächlich erhaltenen Ergebnisse.

[Eintrag und Referenzen](../tool.json) · [JavaScript-Code](../calculator.js) · [Referenzfälle](../examples.json) · [results.json](../results.json)

## Überprüfung und Nutzungsbedingungen

Eine unabhängige klinische Prüfung wurde nicht durchgeführt.

Diese Benutzeroberfläche ist eine selbst erstellte Übersetzung und keine offizielle oder zertifizierte Ausgabe. Eine unabhängige klinische Überprüfung, eine professionelle sprachliche Prüfung und eine Klärung der Rechte an den Instrumenten wurden nicht durchgeführt.

Ergebnis der Formel oder Klassifikation. Interpretation, Vorgehen und Anwendbarkeit hängen von der fachlichen Beurteilung und der ausgewählten Quelle ab.

## Lizenz und Urheberangaben

Apache-2.0 gilt nur für den ELUCENIA-Code. Die Rechte an Instrumenten, Veröffentlichungen, Übersetzungen und Daten verbleiben bei den jeweiligen Rechteinhabern. Bewahren Sie LICENSE und NOTICE auf.

ELUCENIA · Felipe Guedes · Copyright © 2026

## Fassung der Methode · Grenzen und Population

Der Modus mit gemessenem LDL-C ist eine lokale arithmetische Erweiterung. Die 2021 veröffentlichte Kalibrierung verwendet nach der Sampson-Gleichung geschätztes LDL-C; dem direkten Modus wird nicht dieselbe klinische Validierung zugeschrieben. Die Triglyzeridgrenze von 800 mg/dL gehört zur LDL-C-Gleichung von 2020 und belegt für sich allein nicht die Anwendbarkeit der sdLDL-C-Schätzung.

