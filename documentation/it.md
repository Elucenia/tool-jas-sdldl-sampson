<!-- ELUCENIA technical documentation · jas-sdldl-sampson · it · no clinical/professional/rights approval -->

# Sampson 2021 · stima di sdLDL-C

[condizioni, fonti e autorizzazioni](https://elucenia.org/it/strumenti/jas-sdldl-sampson)

## Come usare

Usi lo strumento nel portale oppure apra index.html tramite un server HTTP locale. Selezioni la lingua, compili i campi ed esegua il calcolo.

## Dati di ingresso e unità

### Metodo di inserimento del LDL-C

`mode`



- `direct`: Inserisci LDL-C misurato
- `panel`: Calcola LDL-C dal pannello lipidico

### Trigliceridi

`triglyceridesMgDl`

mg/dL · intervallo: 1–800

### LDL-C misurato (modalità diretta)

`ldlMgDl`

mg/dL · intervallo: 1–500

### Colesterolo totale (modalità pannello lipidico)

`tcMgDl`

mg/dL · intervallo: 1–700

### HDL-C (modalità pannello lipidico)

`hdlMgDl`

mg/dL · intervallo: 1–300

## Edizione del metodo

Sampson 2021; calcolo facoltativo di LDL-C con Sampson–NIH 2020

## Formula documentata

sdLDL-C = LDL-C − (1,43 × LDL-C − 0,14 × ln(TG) × LDL-C − 8,99), in mg/dL. In modalità pannello, LDL-C = CT/0,948 − HDL-C/0,971 − (TG/8,56 + TG × (CT − HDL-C)/2140 − TG²/16100) − 9,44. CT, HDL-C e TG in mg/dL. ln indica il logaritmo naturale.

## Limiti e popolazione

Stima di una sottofrazione lipidica; non equivale alla misurazione diretta. In modalità diretta inserire LDL-C; in modalità pannello inserire colesterolo totale e HDL-C. Revisione clinica indipendente non eseguita.

## Riferimenti

- [Sampson et al. 2021](https://doi.org/10.1093/clinchem/hvab048)
- [Sampson et al. 2020 · LDL-C](https://doi.org/10.1001/jamacardio.2020.0013)

## Riprodurre i test tecnici

Esegua node test.cjs nella cartella principale di questo repository per ripetere i casi sintetici registrati. Gli input, i risultati attesi e le tolleranze originali sono conservati. I test tecnici non costituiscono validazione clinica.

```sh
node test.cjs
```

tool.json contiene le fonti, l’edizione e l’ambito della revisione. examples.json conserva gli input e i risultati attesi dei casi sintetici; results.json registra i risultati ottenuti.

[Scheda e riferimenti](../tool.json) · [Codice JavaScript](../calculator.js) · [Casi di riferimento](../examples.json) · [results.json](../results.json)

## Revisione e condizioni d’uso

Non è stata effettuata una revisione clinica indipendente.

Questa interfaccia è una traduzione realizzata dagli autori, non un’edizione ufficiale o certificata. Non sono state eseguite la revisione clinica indipendente, la revisione linguistica professionale né la verifica delle autorizzazioni relative ai diritti sugli strumenti.

Risultato della formula o classificazione. Interpretazione, condotta e applicabilità dipendono dalla valutazione professionale e dalla fonte selezionata.

## Licenza e attribuzione

Apache-2.0 si applica solo al codice di ELUCENIA. I diritti su strumenti, pubblicazioni, traduzioni e dati restano ai rispettivi titolari. Conservi LICENSE e NOTICE.

ELUCENIA · Felipe Guedes · Copyright © 2026

## Edizione del metodo · Limiti e popolazione

La modalità che accetta LDL-C misurato è un’estensione aritmetica locale. La calibrazione pubblicata nel 2021 usa LDL-C stimato con l’equazione di Sampson; alla modalità diretta non viene attribuita la stessa validazione clinica. Il limite dei trigliceridi di 800 mg/dL riguarda l’equazione di LDL-C del 2020 e non dimostra, da solo, l’applicabilità della stima di sdLDL-C.

