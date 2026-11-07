# 07 · Cifras de uso de CoDi (con fecha)

> Consultado el 2026-11-07. Cada cifra lleva su fecha de corte. ⚪ = interpretación no confirmada. Para el pitch, cita la fuente y la fecha tal cual.

## Últimos datos diarios de Banxico (SIE, corte 20-oct-2026)

| Cuadro | 18-oct-2026 | 19-oct-2026 | 20-oct-2026 (preliminar) | Qué mide |
|---|---|---|---|---|
| **CF881** Cuentas validadas | 7,154 | 8,220 | 7,988 | Cuentas **nuevas** validadas ese día (flujo) |
| **CF884** Operaciones | 8,273 | 14,298 | 11,375 | Operaciones CoDi del día (enviadas = recibidas) |
| **CF885** Monto procesado | $5,057,935 | $13,926,706 | $9,892,381 | Pesos del día (no miles) |
| **CF882** Cuentas con al menos un pago | 2,910,134 | 2,911,718 | 2,913,322 | ⚪ Parece acumulado: sube poco cada día |
| **CF882** Cuentas con al menos un cobro | 1,141,070 | 1,141,303 | 1,141,539 | ⚪ Igual |

- **Cálculo propio:** el ticket promedio, monto entre operaciones, fue de $611.38 el 18-oct, $974.03 el 19-oct y $869.66 el 20-oct-2026.
- **Notas de Banxico:**
  - El último día de cada cuadro es preliminar y puede corregirse.
  - CF881 solo cuenta cuentas asociadas a un dispositivo enrolado (desde el 8-jun-2020) y, desde el 25-ago-2020, solo altas nuevas; las cifras negativas son cuentas que dejaron de estar validadas.
  - CF882 se calcula por día operativo SPEI, de 18:00 a 18:00 h.
- **Por banco (20-oct-2026):** en operaciones **enviadas**, BBVA lidera con 2,948, seguido de Banco Azteca con 2,795. En **recibidas**, lidera HSBC con 3,665, seguido de BBVA con 2,532 e Inbursa con 2,516.
- ⚪ La consulta solo mostró tres días. Para series largas, cambia el periodo en el SIE o descarga el Excel de codi.org.mx.

Fuente: [Banxico SIE: CF881 Cuentas validadas](https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF881&locale=es) · [CF882](https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF882&locale=es) · [CF884 Operaciones](https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF884&locale=es) · [CF885 Monto](https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF885&locale=es) · consultado 2026-11-07

## Acumulados y contexto

| Dato | Cifra | Corte | Fuente |
|---|---|---|---|
| Cuentas validadas acumuladas | 2,643,974 | 23-may-2020 | Nota del cuadro CF881 (Banxico) |
| Cuentas validadas acumuladas | 21.79 millones | sep-2025 | La Razón, con datos de Banxico |
| Cuentas que han pagado al menos una vez | 2.47 millones | ⚪ sin fecha en la nota (2025) | La Razón |
| Cuentas que han recibido al menos un pago | 1.08 millones | ⚪ sin fecha en la nota (2025) | La Razón |

- **Lectura:** se validaron más de 21 millones de cuentas, pero solo unos 2.9 millones han pagado y unos 1.1 millones han cobrado (CF882, oct-2026). Hay muchas cuentas registradas y poco uso. Esto es lo que un producto puede atacar: hacer más fácil cobrar.
- La Razón dice que las validaciones van a la baja.

Fuente: [Banxico SIE: CF881](https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF881&locale=es) · [La Razón: Acusan falta de promoción y voluntad en impulso de CoDi (30-sep-2025)](https://www.razon.com.mx/negocios/2025/09/30/acusan-falta-de-promocion-y-voluntad-en-impulso-de-codi/) · consultado 2026-11-07

## Contradicción: la tabla de "cifras estimadas" en la página de Banxico

- La página de CoDi de Banxico muestra una tabla rotulada "cifras estimadas":
  - dic-2019: **1,389** miles de usuarios registrados y **1,886** miles de transferencias;
  - sep-2020: **18,121** miles de usuarios y **27,934** miles de transferencias.
- La Razón (2025) dice que las metas del lanzamiento eran **18.1 millones de usuarios en 2020** y **28 millones de transferencias** un año después, y que **no se cumplieron**.
- ⚪ Todo indica que la tabla de Banxico son proyecciones, no datos observados. **No la uses como uso real.** Para uso real, usa los cuadros del SIE de arriba.

Fuente: [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · [La Razón (30-sep-2025)](https://www.razon.com.mx/negocios/2025/09/30/acusan-falta-de-promocion-y-voluntad-en-impulso-de-codi/) · consultado 2026-11-07

## Dónde actualizar las cifras

- **Cuadros SIE:**
  - CF881: cuentas validadas.
  - CF882: cuentas con al menos una transacción.
  - CF883: apps de participantes enrolados.
  - CF884: operaciones.
  - CF885: monto.
- **Excel de cuentas validadas por cada mil habitantes**, por entidad, acumulado al cierre de cada trimestre: ver la página de estadísticas de codi.org.mx.
- **Recomendación:** si la app muestra una cifra de CoDi, guárdala con su fecha de corte y su cuadro, por ejemplo: "11,375 operaciones el 20-oct-2026 (Banxico, CF884, preliminar)".

Fuente: [codi.org.mx: Estadísticas](https://www.codi.org.mx/secundarias/estadisticas.html) · [Banxico: Excel de cuentas validadas por entidad](https://www.banxico.org.mx/sistemas-de-pago/d/%7BE50C9EF7-B0D3-99A9-0B62-F95B57CF0529%7D.xlsx) · [Banxico SIE: CF883](https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF883&locale=es) · consultado 2026-11-07
