"""Independent Decimal references for Bedogni, Tanaka and Sampson equations.

Only primary equation coefficients and explicit software domain policies appear
here. No JavaScript implementation is imported, read or evaluated.
"""
import json
import sys
from decimal import Decimal, getcontext, ROUND_HALF_UP

getcontext().prec = 60
D = Decimal


def rounded(value):
    return float(value.quantize(D('0.1'), rounding=ROUND_HALF_UP))


def fli(inp):
    bmi = D(str(inp['weightKg'])) * D('10000') / D(str(inp['heightCm']))**2
    exponent = (D('0.953') * D(str(inp['triglyceridesMgDl'])).ln()
                + D('0.139') * bmi + D('0.718') * D(str(inp['ggtUl'])).ln()
                + D('0.053') * D(str(inp['waistCm'])) - D('15.745'))
    odds = exponent.exp()
    value = odds / (D('1') + odds) * D('100')
    return {'value': value, 'bmi': bmi, 'sourceLogit': exponent}


def tanaka(inp):
    predicted = (D('14.89') * D(str(inp['weightKg']))
                 + D('16.14') * D(str(inp['heightCm']))
                 - D('2.04') * D(str(inp['ageYears'])) - D('2244.45'))
    if predicted <= 0:
        return {'expectedRejection': True, 'mathematicalReason': 'predicted daily creatinine is nonpositive',
                'predictedCreatinineDecimal': str(predicted)}
    # Sodium is mmol/L; creatinine is mg/dL, multiplied by 10 to obtain mg/L.
    urine_ratio = D(str(inp['sodiumMmolL'])) / (D(str(inp['creatinineMgDl'])) * D('10'))
    xna = urine_ratio * predicted
    sodium = D('21.98') * (xna.ln() * D('0.392')).exp()
    # Sodium valence is one: mmol/day = mEq/day. NaCl equivalent MW 58.44 g/mol.
    salt = sodium * D('58.44') / D('1000')
    return {'value': salt, 'sodiumMmolDay': sodium, 'predictedCreatinineMgDay': predicted,
            'sourceXNa': xna}


def panel_ldl(inp):
    tc, hdl, tg = (D(str(inp[k])) for k in ['tcMgDl', 'hdlMgDl', 'triglyceridesMgDl'])
    if tc <= hdl:
        return {'expectedRejection': True, 'mathematicalReason': 'non-HDL cholesterol is nonpositive'}
    # Expanded quadratic, independent from the implementation's bracket form.
    return tc / D('0.948') - hdl / D('0.971') - tg / D('8.56') - tg * (tc-hdl) / D('2140') + tg**2 / D('16100') - D('9.44')


def sampson(inp):
    ldl = D(str(inp['ldlMgDl'])) if inp['mode'] == 'direct' else panel_ldl(inp)
    if isinstance(ldl, dict):
        return ldl
    if ldl <= 0:
        return {'expectedRejection': True, 'mathematicalReason': 'estimated LDL-C is nonpositive',
                'ldlDecimal': str(ldl)}
    tg = D(str(inp['triglyceridesMgDl']))
    # Algebraically solved sdLDL directly, then lbLDL = LDL - sdLDL.
    small = (D('0.14') * tg.ln() - D('0.43')) * ldl + D('8.99')
    large = ldl-small
    if small < 0 or large < 0:
        return {'expectedRejection': True, 'mathematicalReason': 'negative estimated subfraction',
                'ldlDecimal': str(ldl), 'smallDenseDecimal': str(small), 'largeBuoyantDecimal': str(large)}
    return {'value': small, 'ldlMgDl': ldl, 'largeBuoyantMgDl': large}


def reference(case):
    values = {'fli': fli, 'tanaka': tanaka, 'sampson': sampson}[case['tool']](case['input'])
    if values.get('expectedRejection'):
        return {'id': case['id'], **values}
    output_fields = {'fli': ['value', 'bmi'], 'tanaka': ['value', 'sodiumMmolDay', 'predictedCreatinineMgDay'],
                     'sampson': ['value', 'ldlMgDl', 'largeBuoyantMgDl']}[case['tool']]
    return {'id': case['id'], 'expectedRejection': False,
            'expectedDecimal': {key: str(value) for key, value in values.items()},
            'expectedRounded': {key: rounded(values[key]) for key in output_fields}}


payload = json.load(sys.stdin)
cases = payload['cases']
# Solve the FLI equation independently to exercise just below/above reported
# score cutoffs and rounding transitions, without using implementation output.
for target in ['29.94', '29.96', '30', '49.94', '49.96', '50', '59.94', '59.96', '60']:
    base = {'ageYears': 45, 'heightCm': 170, 'weightKg': 70, 'waistCm': 90, 'triglyceridesMgDl': 150}
    bmi = D('70') * D('10000') / D('170')**2
    logit = (D(target) / (D('100')-D(target))).ln()
    ggt = ((logit-D('0.953')*D('150').ln()-D('0.139')*bmi-D('0.053')*D('90')+D('15.745'))/D('0.718')).exp()
    base['ggtUl'] = str(ggt)
    cases.append({'id': 'fli-solved-target-'+target, 'tool': 'fli', 'input': base,
                  'coverage': ['source-solved FLI target', 'logistic sign and rounding neighbourhood'], 'sourceIds': ['bedogni-2006']})
# Paired branches share the same unrounded LDL estimate. Direct-LDL use remains
# a software extension, not claimed to be the published 2021 validation route.
for tg in [50, 150, 400, 800]:
    inp = {'mode': 'panel', 'triglyceridesMgDl': tg, 'tcMgDl': 250, 'hdlMgDl': 50}
    ldl = panel_ldl(inp)
    cases.append({'id': 'sampson-paired-direct-'+str(tg), 'tool': 'sampson',
                  'input': {'mode': 'direct', 'triglyceridesMgDl': tg, 'ldlMgDl': str(ldl)},
                  'coverage': ['direct/panel arithmetic equivalence, unrounded LDL'], 'sourceIds': ['sampson-2021', 'sampson-2020']})
json.dump({'precision': getcontext().prec, 'rounding': 'ROUND_HALF_UP to one decimal',
           'cases': cases, 'oracles': [reference(case) for case in cases]}, sys.stdout)
