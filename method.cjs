'use strict';

// Sampson et al., Clin Chem 2021;67:987–997 (PMID 33876239).
// LDL-C estimation, when selected: Sampson et al., JAMA Cardiol 2020;5:540–548.
function number(value, label, min, max) {
  const scalar=typeof value==='number'||typeof value==='string'&&/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(value.trim());
  const n = scalar ? Number(value) : NaN;
  if (!Number.isFinite(n) || n < min || n > max) throw new Error(`${label}: informe um número entre ${min} e ${max}.`);
  return n;
}
function estimate(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Entrada inválida.');
  const mode = input.mode;
  if (mode !== 'direct' && mode !== 'panel') throw new Error('Selecione o modo de entrada de LDL-C.');
  const triglyceridesMgDl = number(input.triglyceridesMgDl, 'Triglicerídeos', 1, 800);
  let ldlMgDl;
  if (mode === 'direct') ldlMgDl = number(input.ldlMgDl, 'LDL-C direto', 1, 500);
  else {
    const tcMgDl = number(input.tcMgDl, 'Colesterol total', 1, 700);
    const hdlMgDl = number(input.hdlMgDl, 'HDL-C', 1, 300);
    const nonHdlMgDl = tcMgDl - hdlMgDl;
    if (nonHdlMgDl <= 0) throw new Error('Colesterol total deve exceder HDL-C.');
    ldlMgDl = tcMgDl / 0.948 - hdlMgDl / 0.971
      - (triglyceridesMgDl / 8.56 + triglyceridesMgDl * nonHdlMgDl / 2140 - triglyceridesMgDl ** 2 / 16100) - 9.44;
    if (ldlMgDl <= 0) throw new Error('A equação gerou LDL-C não positivo; confira os valores e o método laboratorial.');
  }
  const largeBuoyantMgDl = 1.43 * ldlMgDl - 0.14 * Math.log(triglyceridesMgDl) * ldlMgDl - 8.99;
  const smallDenseMgDl = ldlMgDl - largeBuoyantMgDl;
  if (largeBuoyantMgDl < 0 || smallDenseMgDl < 0) throw new Error('A equação gerou subfração negativa; a entrada está fora do uso plausível do método.');
  const round = n => Math.round(n * 10) / 10;
  return {
    method: 'Sampson 2021 · estimativa de sdLDL-C',
    value: round(smallDenseMgDl), unit: 'mg/dL',
    ldlMgDl: round(ldlMgDl), largeBuoyantMgDl: round(largeBuoyantMgDl),
    ldlMethod: mode === 'panel' ? 'Sampson–NIH 2020 (painel lipídico)' : 'LDL-C medido informado',
    limitations: 'Estimativa de subfração lipídica, não dosagem laboratorial. Triglicerídeos até 800 mg/dL por limite de uso da equação Sampson–NIH; outros limites são técnicos. Não é diagnóstico nem substitui avaliação clínica. Revisão clínica e das traduções pendente.',
    source: 'https://doi.org/10.1093/clinchem/hvab048',
  };
}
module.exports = { estimate };
