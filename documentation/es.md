<!-- ELUCENIA technical documentation · jas-sdldl-sampson · es · no clinical/professional/rights approval -->

# Sampson 2021 · estimación de sdLDL-C

[condiciones, fuentes y permisos](https://elucenia.org/es/herramientas/jas-sdldl-sampson)

## Cómo usar

Utilice la herramienta en el portal o abra index.html mediante un servidor HTTP local. Seleccione el idioma, complete los campos y calcule.

## Entradas y unidades

### Método de entrada del LDL-C

`mode`



- `direct`: Introducir el LDL-C medido
- `panel`: Calcular el LDL-C a partir del panel lipídico

### Triglicéridos

`triglyceridesMgDl`

mg/dL · intervalo: 1–800

### LDL-C medido (modo directo)

`ldlMgDl`

mg/dL · intervalo: 1–500

### Colesterol total (modo panel)

`tcMgDl`

mg/dL · intervalo: 1–700

### HDL-C (modo panel)

`hdlMgDl`

mg/dL · intervalo: 1–300

## Edición del método

Sampson 2021; cálculo opcional de LDL-C con Sampson–NIH 2020

## Fórmula documentada

sdLDL-C = LDL-C − (1,43 × LDL-C − 0,14 × ln(TG) × LDL-C − 8,99), en mg/dL. En modo panel, LDL-C = CT/0,948 − HDL-C/0,971 − (TG/8,56 + TG × (CT − HDL-C)/2140 − TG²/16100) − 9,44. CT, HDL-C y TG en mg/dL. ln indica el logaritmo natural.

## Límites y población

Estimación de una subfracción lipídica; no equivale a medición directa. En modo directo introduzca LDL-C; en modo panel introduzca colesterol total y HDL-C. No se ha realizado revisión clínica independiente.

## Referencias

- [Sampson et al. 2021](https://doi.org/10.1093/clinchem/hvab048)
- [Sampson et al. 2020 · LDL-C](https://doi.org/10.1001/jamacardio.2020.0013)

## Reproducir las pruebas técnicas

Ejecute node test.cjs en el directorio raíz de este repositorio para repetir los casos sintéticos registrados. Se conservan las entradas, los resultados esperados y las tolerancias originales. Las pruebas técnicas no constituyen validación clínica.

```sh
node test.cjs
```

tool.json contiene las fuentes, la edición y el alcance de la revisión. examples.json conserva las entradas y los resultados esperados de los casos sintéticos; results.json registra los resultados obtenidos.

[Ficha y referencias](../tool.json) · [Código JavaScript](../calculator.js) · [Casos de referencia](../examples.json) · [results.json](../results.json)

## Revisión y condiciones de uso

No se ha realizado una revisión clínica independiente.

Esta interfaz es una traducción de elaboración propia, no una edición oficial o certificada. No se han realizado la revisión clínica independiente, la revisión lingüística profesional ni la autorización de derechos de los instrumentos.

Resultado de la fórmula o clasificación. La interpretación, la conducta y la aplicabilidad dependen de la evaluación profesional y de la fuente seleccionada.

## Licencia y atribución

Apache-2.0 se aplica únicamente al código de ELUCENIA. Los derechos de los instrumentos, publicaciones, traducciones y datos permanecen en manos de sus respectivos titulares. Conserve LICENSE y NOTICE.

ELUCENIA · Felipe Guedes · Copyright © 2026

## Edición del método · Límites y población

El modo que acepta LDL-C medido es una extensión aritmética local. La calibración publicada en 2021 utiliza LDL-C estimado mediante la ecuación de Sampson; no se atribuye la misma validación clínica al modo directo. El límite de triglicéridos de 800 mg/dL corresponde a la ecuación de LDL-C de 2020 y no demuestra, por sí solo, la aplicabilidad de la estimación de sdLDL-C.

