export function toCSV(rows: Record<string, string | number>[], filename = "health-report.csv") {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const escape = (val: string | number) => {
    const s = String(val ?? "");
    return s.includes(",") || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
    };
  const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => escape(r[h] ?? "")).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function printSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return window.print();
  const w = window.open("", "_blank", "width=1000,height=800");
  if (!w) return;
  w.document.write(`<!doctype html><html><head><title>Health Report</title>
  <link rel="stylesheet" href="/index.css" />
  <style>
    body{font-family: Inter, system-ui; padding:24px;}
    h1{margin-bottom:16px}
    .muted{color:#666}
    table{border-collapse:collapse;width:100%}
    th,td{border:1px solid #ddd;padding:8px;font-size:12px}
  </style>
  </head><body>${el.outerHTML}</body></html>`);
  w.document.close();
  w.focus();
  w.print();
  w.close();
}
