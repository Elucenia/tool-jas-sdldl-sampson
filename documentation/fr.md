<!-- ELUCENIA technical documentation · jas-sdldl-sampson · fr · no clinical/professional/rights approval -->

# Sampson 2021 · estimation du sdLDL-C

[conditions, sources et autorisations](https://elucenia.org/fr/outils/jas-sdldl-sampson)

## Mode d’emploi

Utilisez l’outil sur le portail ou ouvrez index.html via un serveur HTTP local. Sélectionnez la langue, remplissez les champs et lancez le calcul.

## Données d’entrée et unités

### Méthode de saisie du LDL-C

`mode`



- `direct`: Saisir le LDL-C mesuré
- `panel`: Calculer le LDL-C à partir du bilan lipidique

### Triglycérides

`triglyceridesMgDl`

mg/dL · intervalle: 1–800

### LDL-C mesuré (mode direct)

`ldlMgDl`

mg/dL · intervalle: 1–500

### Cholestérol total (mode bilan lipidique)

`tcMgDl`

mg/dL · intervalle: 1–700

### HDL-C (mode bilan lipidique)

`hdlMgDl`

mg/dL · intervalle: 1–300

## Édition de la méthode

Sampson 2021 ; calcul facultatif du LDL-C par Sampson–NIH 2020

## Formule documentée

sdLDL-C = LDL-C − (1,43 × LDL-C − 0,14 × ln(TG) × LDL-C − 8,99), en mg/dL. En mode bilan, LDL-C = CT/0,948 − HDL-C/0,971 − (TG/8,56 + TG × (CT − HDL-C)/2140 − TG²/16100) − 9,44. CT, HDL-C et TG en mg/dL. ln désigne le logarithme naturel.

## Limites et population

Estimation d’une sous-fraction lipidique ; ne correspond pas à un dosage direct. En mode direct, renseignez le LDL-C ; en mode bilan, le cholestérol total et le HDL-C. Revue clinique indépendante non réalisée.

## Références

- [Sampson et al. 2021](https://doi.org/10.1093/clinchem/hvab048)
- [Sampson et al. 2020 · LDL-C](https://doi.org/10.1001/jamacardio.2020.0013)

## Reproduire les tests techniques

Exécutez node test.cjs dans le répertoire racine de ce dépôt pour reproduire les cas synthétiques enregistrés. Les données d’entrée, les résultats attendus et les tolérances d’origine sont conservés. Les tests techniques ne constituent pas une validation clinique.

```sh
node test.cjs
```

tool.json contient les sources, l’édition et le périmètre de la revue. examples.json conserve les données d’entrée et les résultats attendus des cas synthétiques ; results.json consigne les résultats obtenus.

[Fiche et références](../tool.json) · [Code JavaScript](../calculator.js) · [Cas de référence](../examples.json) · [results.json](../results.json)

## Revue et conditions d’utilisation

Aucune révision clinique indépendante n’a été effectuée.

Cette interface est une traduction réalisée par nos soins, et non une édition officielle ou certifiée. La revue clinique indépendante, la révision linguistique professionnelle et l’autorisation des droits sur les instruments n’ont pas été réalisées.

Résultat de la formule ou de la classification. L’interprétation, la conduite et l’applicabilité dépendent de l’évaluation professionnelle et de la source sélectionnée.

## Licence et attribution

Apache-2.0 s’applique uniquement au code d’ELUCENIA. Les droits sur les instruments, publications, traductions et données restent ceux de leurs titulaires respectifs. Conservez LICENSE et NOTICE.

ELUCENIA · Felipe Guedes · Copyright © 2026

## Édition de la méthode · Limites et population

Le mode qui accepte un LDL-C mesuré est une extension arithmétique locale. La calibration publiée en 2021 utilise un LDL-C estimé par l’équation de Sampson ; la même validation clinique n’est pas attribuée au mode direct. La limite de triglycérides de 800 mg/dL concerne l’équation du LDL-C de 2020 et ne démontre pas, à elle seule, l’applicabilité de l’estimation du sdLDL-C.

