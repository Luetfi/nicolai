export interface ClassTableRow {
  /** Klassenbezeichnung, z. B. „A2" — wird als Zeilenkopf gesetzt. */
  klasse: string;
  cells: string[];
  /** Hebt die Zeile farblich hervor (z. B. die gängigste Klasse). */
  highlight?: boolean;
}

type ClassTableProps = {
  caption: string;
  columns: string[];
  rows: ClassTableRow[];
};

/**
 * Vergleichstabelle der Führerscheinklassen als echte <table> mit <caption>,
 * <th scope> und Zeilenköpfen. Bewusst keine Karten-Optik: Tabellen sind für
 * Screenreader, Google und KI-Dienste die verlässlichste Struktur für
 * Vergleichsdaten — genau die Form, aus der Antworten zitiert werden.
 */
export function ClassTable({ caption, columns, rows }: ClassTableProps) {
  return (
    <div className="relative">
      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-secondary-light shadow-xl shadow-black/40">
        <table className="w-full min-w-[44rem] border-collapse text-left">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="bg-gradient-to-r from-primary/15 via-primary/5 to-transparent">
              <th
                scope="col"
                className="px-5 py-4 font-display text-xl text-primary tracking-wide whitespace-nowrap"
              >
                Klasse
              </th>
              {columns.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-gray-300 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((row) => (
              <tr
                key={row.klasse}
                className={`transition-colors hover:bg-white/[0.03] ${
                  row.highlight ? 'bg-primary/[0.06]' : ''
                }`}
              >
                <th scope="row" className="px-5 py-5 align-top whitespace-nowrap">
                  <span
                    className={`inline-flex items-center justify-center min-w-[3.25rem] px-3 py-1.5 rounded-xl font-display text-2xl ${
                      row.highlight
                        ? 'bg-gradient-to-br from-primary to-primary-dark text-secondary'
                        : 'bg-white/5 text-white border border-white/10'
                    }`}
                  >
                    {row.klasse}
                  </span>
                </th>
                {row.cells.map((cell, i) => (
                  <td key={`${row.klasse}-${i}`} className="px-5 py-5 align-top text-gray-300">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-gray-500 text-sm sm:hidden">Tabelle seitlich scrollen →</p>
    </div>
  );
}
