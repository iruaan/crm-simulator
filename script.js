const RAW_DATA = [
  { id:'C001', nome:'Ana Souza',    email:'ana.souza@email.com',    telefone:'(11) 99999-0001', segmento:'Enterprise', receita_anual:'R$ 120.000,00', criado_em:'2024-01-15', dirty:false },
  { id:'C002', nome:'joao silva',   email:'JOAO@EMPRESA.COM',        telefone:'11988880002',     segmento:'SMB',        receita_anual:'R$ 45.000,00',  criado_em:'15/03/2024', dirty:true, issues:['nome_lower','email_case','tel_mask','data_fmt'] },
  { id:'C003', nome:'Maria Lima',   email:'maria.lima@corp.io',      telefone:'(21) 97777-0003', segmento:'Enterprise', receita_anual:'R$ 380.000,00', criado_em:'2024-02-20', dirty:false },
  { id:'C004', nome:'Pedro Alves',  email:'pedroalves',              telefone:'(31) 96666-0004', segmento:'Mid-Market', receita_anual:'',              criado_em:'2024-03-01', dirty:true, issues:['email_invalid','receita_null'] },
  { id:'C005', nome:'Carla Mota',   email:'carla.mota@startup.dev',  telefone:'(41) 95555-0005', segmento:'SMB',        receita_anual:'R$ 18.000,00',  criado_em:'2024-03-10', dirty:false },
  { id:'C006', nome:'ROBERTO NETO', email:'roberto@bigcorp.com',     telefone:'48984440006',     segmento:'Enterprise', receita_anual:'R$ 950.000,00', criado_em:'2024-04-05', dirty:true, issues:['nome_upper','tel_mask'] },
  { id:'C007', nome:'Lucia Prado',  email:'lucia.prado@agency.net',  telefone:'(51) 93333-0007', segmento:'Mid-Market', receita_anual:'R$ 72.000,00',  criado_em:'2024-04-18', dirty:false },
  { id:'C008', nome:'Felipe Dias',  email:'felipe.dias@tech.co',     telefone:'(61) 92222-0008', segmento:'SMB',        receita_anual:'R$ 29.000,00',  criado_em:'2024-05-02', dirty:false },
];

// ─── HELPERS ────────────────────────────────────────
function toTitle(s) {
  return s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

function maskPhone(t) {
  const d = t.replace(/\D/g,'');
  if (d.length === 11) return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  return t;
}

// Parse "R$ 120.000,00" or "120000" → float with 2 decimal places as string
function parseReceita(v) {
  if (!v || v.trim() === '') return '';
  // Remove R$, spaces, dots (thousands), then replace comma with dot
  const cleaned = v.replace(/R\$\s*/,'').replace(/\./g,'').replace(',','.').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? '' : num.toFixed(2);
}

function toIso(d) {
  if (!d) return d;
  const m = d.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (m) return `${m[3]}-${m[2]}-${m[1]}`;
  return d;
}

// ─── RULES ──────────────────────────────────────────
const RULES = [
  { id:'nome_title',  label:'Padronizar nomes (Title Case)',              badge:'Texto',    fn: r => ({ ...r, nome: toTitle(r.nome) }) },
  { id:'email_lower', label:'Email em minúsculas',                        badge:'Texto',    fn: r => ({ ...r, email: r.email.toLowerCase() }) },
  { id:'email_valid', label:'Remover emails inválidos (sem @)',            badge:'Qualidade',fn: r => ({ ...r, email: r.email.includes('@') ? r.email : '[INVÁLIDO]' }) },
  { id:'tel_mask',    label:'Máscara de telefone (XX) XXXXX-XXXX',        badge:'Formato',  fn: r => ({ ...r, telefone: maskPhone(r.telefone) }) },
  { id:'receita_num', label:'Receita → número (2 casas decimais)',         badge:'Tipo',     fn: r => ({ ...r, receita_anual: parseReceita(r.receita_anual) }) },
  { id:'data_iso',    label:'Datas para ISO 8601 (YYYY-MM-DD)',            badge:'Formato',  fn: r => ({ ...r, criado_em: toIso(r.criado_em) }) },
  { id:'receita_null',label:'Preencher receita nula com 0.00',             badge:'Qualidade',fn: r => ({ ...r, receita_anual: (r.receita_anual === '' || r.receita_anual === null || r.receita_anual === undefined) ? '0.00' : r.receita_anual }) },
];

const RULE_BADGE_CLASS = {
  'Texto': 'badge-info',
  'Qualidade': 'badge-ok',
  'Formato': 'badge-warn',
  'Tipo': 'badge-purple',
};

// ─── STATE ───────────────────────────────────────────
let currentStage = 0;
let extractedData = [...RAW_DATA];
let transformedData = [];

// ─── NAVIGATION ──────────────────────────────────────
function goStage(n) {
  document.querySelectorAll('[id^="stage-"]').forEach((el, i) => el.classList.toggle('hidden', i !== n));
  document.querySelectorAll('.stage-btn').forEach((el, i) => el.classList.toggle('active', i === n));
  currentStage = n;
  if (n === 0) renderRawTable();
  if (n === 1) renderExtractStage();
  if (n === 2) renderTransformStage();
  if (n === 3) renderBQStage();
}
window.goStage = goStage;

// ─── STAGE 0: SOURCE ─────────────────────────────────
function renderRawTable() {
  const tb = document.getElementById('raw-body');
  tb.innerHTML = RAW_DATA.map(r => {
    const issues = r.issues || [];
    return `
      <tr class="${r.dirty ? 'dirty' : ''}">
        <td>${r.id}</td>
        <td class="${issues.includes('nome_lower') || issues.includes('nome_upper') ? 'err-cell' : ''}">${r.nome}</td>
        <td class="${issues.includes('email_case') || issues.includes('email_invalid') ? 'err-cell' : ''}">${r.email}</td>
        <td class="${issues.includes('tel_mask') ? 'err-cell' : ''}">${r.telefone}</td>
        <td>${r.segmento}</td>
        <td class="${issues.includes('receita_null') ? 'err-cell' : ''}">${r.receita_anual || '<em>NULL</em>'}</td>
        <td class="${issues.includes('data_fmt') ? 'err-cell' : ''}">${r.criado_em}</td>
      </tr>`;
  }).join('');
}

// ─── STAGE 1: EXTRACT ────────────────────────────────
function renderExtractStage() {
  document.getElementById('extract-log').innerHTML = '<span class="log-info">// aguardando execução...</span>';
  document.getElementById('schema-log').innerHTML  = '<span class="log-info">// aguardando extração...</span>';
  document.getElementById('st-total').textContent  = '—';
  document.getElementById('st-ok').textContent     = '—';
  document.getElementById('st-err').textContent    = '—';
}

function runExtract() {
  const anim = document.getElementById('run-anim');
  const btn  = document.getElementById('btn-run-extract');
  anim.classList.remove('hidden');
  btn.disabled = true;
  btn.textContent = 'Extraindo...';

  setTimeout(() => {
    anim.classList.add('hidden');
    btn.disabled = false;
    btn.textContent = 'Executar extração ↗';

    const n     = parseInt(document.getElementById('rec-count').value);
    const dirty = RAW_DATA.filter(r => r.dirty).length;
    const ok    = RAW_DATA.length - dirty;
    const total = n <= 8 ? RAW_DATA.length : n;

    document.getElementById('st-total').textContent = total;
    document.getElementById('st-ok').textContent    = n <= 8 ? ok    : Math.round(n * (ok / RAW_DATA.length));
    document.getElementById('st-err').textContent   = n <= 8 ? dirty : Math.round(n * (dirty / RAW_DATA.length));

    const src = document.getElementById('source-type').value;
    const tbl = document.getElementById('source-table').value;

    document.getElementById('extract-log').innerHTML = [
      `<span class="log-ok">✓  Conectando a ${src}...</span>`,
      `<span class="log-ok">✓  Autenticação realizada</span>`,
      `<span class="log-ok">✓  Lendo tabela "${tbl}"</span>`,
      `<span class="log-ok">✓  ${total} registros lidos</span>`,
      `<span class="log-warn">⚠  ${dirty} registros com inconsistências</span>`,
      `<span class="log-ok">✓  Extração concluída em 1.3s</span>`,
    ].join('<br>');

    document.getElementById('schema-log').innerHTML = [
      '<span class="log-ok">id             STRING      ✓</span>',
      '<span class="log-ok">nome           STRING      ✓</span>',
      '<span class="log-ok">email          STRING      ✓</span>',
      '<span class="log-ok">telefone       STRING      ✓</span>',
      '<span class="log-ok">segmento       STRING      ✓</span>',
      '<span class="log-warn">receita_anual  STRING   ⚠ esperado: DECIMAL(2)</span>',
      '<span class="log-warn">criado_em      STRING   ⚠ esperado: DATE</span>',
    ].join('<br>');

    document.getElementById('btn-0').classList.add('done');
    document.getElementById('btn-1').classList.add('done');
    extractedData = [...RAW_DATA];

    // Show "next step" button
    document.getElementById('go-transform-btn').classList.remove('hidden');
  }, 1400);
}
window.runExtract = runExtract;

// ─── STAGE 2: TRANSFORM ──────────────────────────────
function renderTransformStage() {
  const list = document.getElementById('rules-list');
  list.innerHTML = RULES.map(r => `
    <div class="rule-row">
      <input type="checkbox" class="rule-check" id="rule-${r.id}" checked>
      <label for="rule-${r.id}" class="rule-name">${r.label}</label>
      <span class="badge ${RULE_BADGE_CLASS[r.badge] || 'badge-info'}">${r.badge}</span>
    </div>`).join('');

  document.querySelectorAll('.rule-check').forEach(cb => cb.addEventListener('change', previewTransform));
  previewTransform();
}

function applyRules(data) {
  const checked = RULES.filter(r => {
    const el = document.getElementById('rule-' + r.id);
    return el && el.checked;
  });
  return data.map(row => {
    let r = { ...row };
    checked.forEach(rule => { r = rule.fn(r); });
    return r;
  });
}

function previewTransform() {
  const cols = ['nome', 'email', 'telefone', 'receita_anual', 'criado_em'];
  const transformed = applyRules(extractedData);

  const head = `<tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr>`;
  const makeRows = (data) => data.map(r =>
    `<tr>${cols.map(c => `<td>${r[c] !== undefined && r[c] !== '' ? r[c] : '<em>NULL</em>'}</td>`).join('')}</tr>`
  ).join('');

  document.getElementById('before-body').innerHTML = head + makeRows(extractedData);
  document.getElementById('after-body').innerHTML  = head + makeRows(transformed);
  transformedData = transformed;
}
window.previewTransform = previewTransform;

function runTransform() {
  transformedData = applyRules(extractedData);
  document.getElementById('btn-2').classList.add('done');
  document.getElementById('btn-3').classList.add('done');
  goStage(3);
}
window.runTransform = runTransform;

// ─── STAGE 3: BIGQUERY ───────────────────────────────
const BQ_QUERIES = {
  all:     'SELECT * FROM `crm_dataset.customers_clean` LIMIT 100;',
  seg:     'SELECT segmento, COUNT(*) AS total,\n  SUM(CAST(receita_anual AS DECIMAL)) AS receita\nFROM `crm_dataset.customers_clean`\nGROUP BY segmento\nORDER BY receita DESC;',
  issues:  "SELECT * FROM `crm_dataset.customers_clean`\nWHERE email = '[INVÁLIDO]'\n   OR receita_anual = ''\n   OR receita_anual IS NULL;",
  revenue: 'SELECT id, nome, segmento,\n  CAST(receita_anual AS DECIMAL) AS receita\nFROM `crm_dataset.customers_clean`\nORDER BY receita DESC\nLIMIT 5;',
};

function setQuery(k) {
  document.getElementById('bq-query').value = BQ_QUERIES[k];
}
window.setQuery = setQuery;

function renderBQStage() {
  const n = parseInt(document.getElementById('rec-count').value);
  document.getElementById('bq-loaded').textContent = n <= 8 ? transformedData.length : n;
  document.getElementById('bq-time').textContent   = (Math.random() * 1.5 + 0.5).toFixed(2) + 's';
  setQuery('all');
  runQuery();
}

function fmtDecimal(v) {
  const n = parseFloat(v);
  if (isNaN(n)) return v;
  return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function runQuery() {
  const q = document.getElementById('bq-query').value.trim().toLowerCase();
  let cols, rows;

  if (q.includes('group by')) {
    cols = ['segmento', 'total', 'receita'];
    const groups = {};
    transformedData.forEach(r => {
      const seg = r.segmento;
      if (!groups[seg]) groups[seg] = { total: 0, receita: 0 };
      groups[seg].total++;
      groups[seg].receita += parseFloat(r.receita_anual) || 0;
    });
    rows = Object.entries(groups)
      .map(([seg, v]) => [seg, v.total, fmtDecimal(v.receita.toFixed(2))])
      .sort((a, b) => parseFloat(b[2].replace(/\./g,'').replace(',','.')) - parseFloat(a[2].replace(/\./g,'').replace(',','.')));
  } else if (q.includes('email') && (q.includes('inválido') || q.includes("'[inválido]'"))) {
    cols = ['id', 'nome', 'email', 'receita_anual'];
    rows = transformedData
      .filter(r => r.email === '[INVÁLIDO]' || !r.receita_anual || r.receita_anual === '')
      .map(r => [r.id, r.nome, r.email, r.receita_anual || 'NULL']);
  } else if (q.includes('order by receita')) {
    cols = ['id', 'nome', 'segmento', 'receita'];
    rows = [...transformedData]
      .filter(r => r.receita_anual)
      .sort((a, b) => (parseFloat(b.receita_anual) || 0) - (parseFloat(a.receita_anual) || 0))
      .slice(0, 5)
      .map(r => [r.id, r.nome, r.segmento, fmtDecimal(r.receita_anual)]);
  } else {
    cols = ['id', 'nome', 'email', 'telefone', 'segmento', 'receita_anual', 'criado_em'];
    rows = transformedData.map(r => [
      r.id, r.nome, r.email, r.telefone, r.segmento,
      r.receita_anual ? fmtDecimal(r.receita_anual) : 'NULL',
      r.criado_em
    ]);
  }

  document.getElementById('bq-result-head').innerHTML = `<tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr>`;
  document.getElementById('bq-result-body').innerHTML = rows.map(r =>
    `<tr>${r.map(v => `<td>${v}</td>`).join('')}</tr>`
  ).join('');
  document.getElementById('bq-summary').textContent = `${rows.length} linha(s) retornada(s)`;
}
window.runQuery = runQuery;

// ─── INIT ─────────────────────────────────────────────
renderRawTable();