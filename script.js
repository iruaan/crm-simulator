// ─── DATA ────────────────────────────────────────────
const RAW_DATA = [
  { id:'C001', brand_id:'marca-alpha', nome:'Ana Souza',    email:'ana.souza@email.com',   telefone:'(11) 99999-0001', segmento:'Enterprise', receita_anual:'R$ 120.000,00', criado_em:'2024-01-15', dirty:false },
  { id:'C002', brand_id:'marca-beta',  nome:'joao silva',   email:'JOAO@EMPRESA.COM',       telefone:'11988880002',     segmento:'SMB',        receita_anual:'R$ 45.000,00',  criado_em:'15/03/2024', dirty:true, issues:['nome_lower','email_case','tel_mask','data_fmt'] },
  { id:'C003', brand_id:'marca-alpha', nome:'Maria Lima',   email:'maria.lima@corp.io',     telefone:'(21) 97777-0003', segmento:'Enterprise', receita_anual:'R$ 380.000,00', criado_em:'2024-02-20', dirty:false },
  { id:'C004', brand_id:'marca-gamma', nome:'Pedro Alves',  email:'pedroalves',             telefone:'(31) 96666-0004', segmento:'Mid-Market', receita_anual:'',              criado_em:'2024-03-01', dirty:true, issues:['email_invalid','receita_null'] },
  { id:'C005', brand_id:'marca-beta',  nome:'Carla Mota',   email:'carla.mota@startup.dev', telefone:'(41) 95555-0005', segmento:'SMB',        receita_anual:'R$ 18.000,00',  criado_em:'2024-03-10', dirty:false },
  { id:'C006', brand_id:'marca-alpha', nome:'ROBERTO NETO', email:'roberto@bigcorp.com',    telefone:'48984440006',     segmento:'Enterprise', receita_anual:'R$ 950.000,00', criado_em:'2024-04-05', dirty:true, issues:['nome_upper','tel_mask'] },
  { id:'C007', brand_id:'marca-gamma', nome:'Lucia Prado',  email:'lucia.prado@agency.net', telefone:'(51) 93333-0007', segmento:'Mid-Market', receita_anual:'R$ 72.000,00',  criado_em:'2024-04-18', dirty:false },
  { id:'C008', brand_id:'marca-beta',  nome:'Felipe Dias',  email:'felipe.dias@tech.co',    telefone:'(61) 92222-0008', segmento:'SMB',        receita_anual:'R$ 29.000,00',  criado_em:'2024-05-02', dirty:false },
];

const HISTORICAL_DATA = [
  { id:'C001', brand_id:'marca-alpha', snapshot_ts:'2023-06-10T08:00:00Z', nome:'Ana Souza',    email:'ana.souza@email.com',   telefone:'(11) 99999-0001', segmento:'SMB',        receita_anual:'45000.00',  criado_em:'2023-06-10', _source:'initial_load', _batch:'B2023-06' },
  { id:'C001', brand_id:'marca-alpha', snapshot_ts:'2023-11-20T14:22:00Z', nome:'Ana Souza',    email:'ana.souza@email.com',   telefone:'(11) 99999-0001', segmento:'Mid-Market', receita_anual:'85000.00',  criado_em:'2023-06-10', _source:'cdc_update',   _batch:'B2023-11' },
  { id:'C001', brand_id:'marca-alpha', snapshot_ts:'2024-01-15T09:10:00Z', nome:'Ana Souza',    email:'ana.souza@email.com',   telefone:'(11) 99999-0001', segmento:'Enterprise', receita_anual:'120000.00', criado_em:'2024-01-15', _source:'full_refresh', _batch:'B2024-01' },
  { id:'C002', brand_id:'marca-beta',  snapshot_ts:'2023-08-01T10:00:00Z', nome:'joao silva',   email:'JOAO@EMPRESA.COM',      telefone:'11988880002',     segmento:'SMB',        receita_anual:'45000.00',  criado_em:'15/03/2024', _source:'initial_load', _batch:'B2023-08' },
  { id:'C002', brand_id:'marca-beta',  snapshot_ts:'2024-03-15T11:30:00Z', nome:'joao silva',   email:'JOAO@EMPRESA.COM',      telefone:'11988880002',     segmento:'SMB',        receita_anual:'45000.00',  criado_em:'15/03/2024', _source:'incremental',  _batch:'B2024-03' },
  { id:'C003', brand_id:'marca-alpha', snapshot_ts:'2023-07-05T08:00:00Z', nome:'Maria Lima',   email:'maria.lima@corp.io',    telefone:'(21) 97777-0003', segmento:'Mid-Market', receita_anual:'200000.00', criado_em:'2023-07-05', _source:'initial_load', _batch:'B2023-07' },
  { id:'C003', brand_id:'marca-alpha', snapshot_ts:'2024-02-20T16:00:00Z', nome:'Maria Lima',   email:'maria.lima@corp.io',    telefone:'(21) 97777-0003', segmento:'Enterprise', receita_anual:'380000.00', criado_em:'2024-02-20', _source:'cdc_update',   _batch:'B2024-02' },
  { id:'C004', brand_id:'marca-gamma', snapshot_ts:'2024-03-01T09:00:00Z', nome:'Pedro Alves',  email:'pedroalves',            telefone:'(31) 96666-0004', segmento:'Mid-Market', receita_anual:'',          criado_em:'2024-03-01', _source:'initial_load', _batch:'B2024-03' },
  { id:'C005', brand_id:'marca-beta',  snapshot_ts:'2024-03-10T08:00:00Z', nome:'Carla Mota',   email:'carla.mota@startup.dev',telefone:'(41) 95555-0005', segmento:'SMB',        receita_anual:'18000.00',  criado_em:'2024-03-10', _source:'full_refresh', _batch:'B2024-03' },
  { id:'C006', brand_id:'marca-alpha', snapshot_ts:'2024-04-05T08:00:00Z', nome:'ROBERTO NETO', email:'roberto@bigcorp.com',   telefone:'48984440006',     segmento:'Enterprise', receita_anual:'950000.00', criado_em:'2024-04-05', _source:'full_refresh', _batch:'B2024-04' },
  { id:'C007', brand_id:'marca-gamma', snapshot_ts:'2024-04-18T08:00:00Z', nome:'Lucia Prado',  email:'lucia.prado@agency.net',telefone:'(51) 93333-0007', segmento:'Mid-Market', receita_anual:'72000.00',  criado_em:'2024-04-18', _source:'incremental',  _batch:'B2024-04' },
  { id:'C008', brand_id:'marca-beta',  snapshot_ts:'2024-05-02T08:00:00Z', nome:'Felipe Dias',  email:'felipe.dias@tech.co',   telefone:'(61) 92222-0008', segmento:'SMB',        receita_anual:'29000.00',  criado_em:'2024-05-02', _source:'incremental',  _batch:'B2024-05' },
];

const SILVER_DATA = [
  { id:'C001', brand_id:'marca-alpha', nome:'Ana Souza',    email:'ana.souza@email.com',   telefone:'(11) 99999-0001', segmento:'Enterprise', receita_anual:'120000.00', criado_em:'2024-01-15', _updated_at:'2024-01-15T09:10:00Z', _is_current:true },
  { id:'C002', brand_id:'marca-beta',  nome:'Joao Silva',   email:'joao@empresa.com',      telefone:'(11) 98888-0002', segmento:'SMB',        receita_anual:'45000.00',  criado_em:'2024-03-15', _updated_at:'2024-03-15T11:30:00Z', _is_current:true },
  { id:'C003', brand_id:'marca-alpha', nome:'Maria Lima',   email:'maria.lima@corp.io',    telefone:'(21) 97777-0003', segmento:'Enterprise', receita_anual:'380000.00', criado_em:'2024-02-20', _updated_at:'2024-02-20T16:00:00Z', _is_current:true },
  { id:'C004', brand_id:'marca-gamma', nome:'Pedro Alves',  email:'[INVÁLIDO]',            telefone:'(31) 96666-0004', segmento:'Mid-Market', receita_anual:'0.00',      criado_em:'2024-03-01', _updated_at:'2024-03-01T09:00:00Z', _is_current:true },
  { id:'C005', brand_id:'marca-beta',  nome:'Carla Mota',   email:'carla.mota@startup.dev',telefone:'(41) 95555-0005', segmento:'SMB',        receita_anual:'18000.00',  criado_em:'2024-03-10', _updated_at:'2024-03-10T08:00:00Z', _is_current:true },
  { id:'C006', brand_id:'marca-alpha', nome:'Roberto Neto', email:'roberto@bigcorp.com',   telefone:'(48) 98444-0006', segmento:'Enterprise', receita_anual:'950000.00', criado_em:'2024-04-05', _updated_at:'2024-04-05T08:00:00Z', _is_current:true },
  { id:'C007', brand_id:'marca-gamma', nome:'Lucia Prado',  email:'lucia.prado@agency.net',telefone:'(51) 93333-0007', segmento:'Mid-Market', receita_anual:'72000.00',  criado_em:'2024-04-18', _updated_at:'2024-04-18T08:00:00Z', _is_current:true },
  { id:'C008', brand_id:'marca-beta',  nome:'Felipe Dias',  email:'felipe.dias@tech.co',   telefone:'(61) 92222-0008', segmento:'SMB',        receita_anual:'29000.00',  criado_em:'2024-05-02', _updated_at:'2024-05-02T08:00:00Z', _is_current:true },
];

// ─── RULES: each rule has id, label, sqlSnippet, badge, transform fn ─────────
const RULES = [
  {
    id:'nome_title', label:'Padronizar nomes (Title Case)', badge:'Texto',
    sqlHint:'INITCAP(nome) AS nome',
    fn: r => ({ ...r, nome: toTitle(r.nome) }),
  },
  {
    id:'email_lower', label:'Email em minúsculas', badge:'Texto',
    sqlHint:'LOWER(email) AS email',
    fn: r => ({ ...r, email: r.email.toLowerCase() }),
  },
  {
    id:'email_valid', label:'Validar email (marcar sem @)', badge:'Qualidade',
    sqlHint:"CASE WHEN email NOT LIKE '%@%' THEN '[INVÁLIDO]' ELSE email END",
    fn: r => ({ ...r, email: r.email.includes('@') ? r.email : '[INVÁLIDO]' }),
  },
  {
    id:'tel_mask', label:'Máscara telefone (XX) XXXXX-XXXX', badge:'Formato',
    sqlHint:"REGEXP_REPLACE(telefone, r'(\\d{2})(\\d{5})(\\d{4})', '(\\\\1) \\\\2-\\\\3')",
    fn: r => ({ ...r, telefone: maskPhone(r.telefone) }),
  },
  {
    id:'receita_num', label:'Receita → DECIMAL(10,2)', badge:'Tipo',
    sqlHint:"ROUND(SAFE_CAST(REGEXP_REPLACE(receita_anual, r'[R$\\s.]','') AS FLOAT64), 2)",
    fn: r => ({ ...r, receita_anual: parseReceita(r.receita_anual) }),
  },
  {
    id:'data_iso', label:'Data → ISO 8601 (YYYY-MM-DD)', badge:'Formato',
    sqlHint:"PARSE_DATE('%d/%m/%Y', criado_em) AS criado_em",
    fn: r => ({ ...r, criado_em: toIso(r.criado_em) }),
  },
  {
    id:'receita_null', label:'Receita nula → 0.00', badge:'Qualidade',
    sqlHint:'COALESCE(receita_anual, 0.00) AS receita_anual',
    fn: r => ({ ...r, receita_anual: (!r.receita_anual || r.receita_anual==='') ? '0.00' : r.receita_anual }),
  },
];

const BADGE_CLASS = { 'Texto':'badge-info','Qualidade':'badge-ok','Formato':'badge-warn','Tipo':'badge-purple' };

// ─── STATIC SQLX for other files ─────────────────────
const STATIC_SQLX = {
  raw_source: {
    title:'raw_source.sqlx', meta:'type: view',
    deps:[], depClasses:[],
    src:`<span class="tok-cfg">config</span> <span class="tok-op">{</span>
  <span class="tok-cfg">type</span>: <span class="tok-val">"view"</span>,
  <span class="tok-cfg">schema</span>: <span class="tok-val">"dito_cdp"</span>,
<span class="tok-op">}</span>

<span class="tok-cmt">-- View direta sobre a camada raw sem transformações</span>
<span class="tok-kw">SELECT</span>
  id, brand_id, nome, email,
  telefone, segmento,
  receita_anual, criado_em
<span class="tok-kw">FROM</span> <span class="tok-fn">\`dito-cdp.raw.customers\`</span>`,
    compiled:`<span class="tok-cmt">-- Compilado</span>
<span class="tok-kw">CREATE OR REPLACE VIEW</span> <span class="tok-fn">\`dito-cdp.dito_cdp.raw_source\`</span> <span class="tok-kw">AS</span>
<span class="tok-kw">SELECT</span> id, brand_id, nome, email, telefone, segmento, receita_anual, criado_em
<span class="tok-kw">FROM</span> <span class="tok-fn">\`dito-cdp.raw.customers\`</span>`,
  },
  silver_customers: {
    title:'silver_customers.sqlx', meta:'type: incremental · uniqueKey: [id, brand_id]',
    deps:['customers_clean'], depClasses:['dag-clean'],
    src:`<span class="tok-cfg">config</span> <span class="tok-op">{</span>
  <span class="tok-cfg">type</span>: <span class="tok-val">"incremental"</span>,
  <span class="tok-cfg">schema</span>: <span class="tok-val">"dito_cdp"</span>,
  <span class="tok-cfg">uniqueKey</span>: [<span class="tok-val">"id"</span>, <span class="tok-val">"brand_id"</span>],
<span class="tok-op">}</span>

<span class="tok-kw">SELECT</span>
  c.*,
  <span class="tok-fn">CURRENT_TIMESTAMP</span>() <span class="tok-kw">AS</span> _updated_at,
  <span class="tok-kw">TRUE</span>                  <span class="tok-kw">AS</span> _is_current
<span class="tok-kw">FROM</span> <span class="tok-fn">\${ref('customers_clean')}</span> c
<span class="tok-fn">\${when(incremental(), \`WHERE c._ingested_at > (SELECT MAX(_updated_at) FROM \${self()})\`)}</span>`,
    compiled:`<span class="tok-cmt">-- Compilado (modo incremental)</span>
<span class="tok-kw">MERGE</span> <span class="tok-fn">\`dito-cdp.dito_cdp.silver_customers\`</span> T
<span class="tok-kw">USING</span> (
  <span class="tok-kw">SELECT</span> c.*, <span class="tok-fn">CURRENT_TIMESTAMP</span>() <span class="tok-kw">AS</span> _updated_at, <span class="tok-kw">TRUE AS</span> _is_current
  <span class="tok-kw">FROM</span> <span class="tok-fn">\`dito-cdp.dito_cdp.customers_clean\`</span> c
  <span class="tok-kw">WHERE</span> c._ingested_at > (<span class="tok-kw">SELECT MAX</span>(_updated_at) <span class="tok-kw">FROM</span> <span class="tok-fn">\`dito-cdp.dito_cdp.silver_customers\`</span>)
) S <span class="tok-kw">ON</span> T.id = S.id <span class="tok-kw">AND</span> T.brand_id = S.brand_id
<span class="tok-kw">WHEN MATCHED THEN UPDATE SET</span> *
<span class="tok-kw">WHEN NOT MATCHED THEN INSERT</span> *`,
  },
  brand_filter: {
    title:'brand_filter.sqlx', meta:'type: table · partitionBy: brand_id',
    deps:['silver_customers'], depClasses:['dag-silver'],
    src:`<span class="tok-cfg">config</span> <span class="tok-op">{</span>
  <span class="tok-cfg">type</span>: <span class="tok-val">"table"</span>,
  <span class="tok-cfg">schema</span>: <span class="tok-val">"dito_cdp"</span>,
  <span class="tok-cfg">partitionBy</span>: <span class="tok-val">"brand_id"</span>,
<span class="tok-op">}</span>

<span class="tok-cmt">-- ⚠ Sempre filtre por brand_id ao consultar esta tabela</span>
<span class="tok-kw">SELECT</span> *
<span class="tok-kw">FROM</span> <span class="tok-fn">\${ref('silver_customers')}</span>
<span class="tok-kw">WHERE</span> _is_current = <span class="tok-kw">TRUE</span>`,
    compiled:`<span class="tok-cmt">-- Compilado</span>
<span class="tok-kw">CREATE OR REPLACE TABLE</span> <span class="tok-fn">\`dito-cdp.dito_cdp.brand_filter\`</span>
<span class="tok-kw">PARTITION BY</span> brand_id <span class="tok-kw">AS</span>
<span class="tok-kw">SELECT</span> * <span class="tok-kw">FROM</span> <span class="tok-fn">\`dito-cdp.dito_cdp.silver_customers\`</span>
<span class="tok-kw">WHERE</span> _is_current = <span class="tok-kw">TRUE</span>`,
  },
  variables: {
    title:'variables.js', meta:'includes · js helper',
    deps:[], depClasses:[],
    src:`<span class="tok-cmt">// Helpers compartilhados entre todos os modelos SQLX</span>

<span class="tok-kw">const</span> BRAND_IDS = [<span class="tok-val">'marca-alpha'</span>, <span class="tok-val">'marca-beta'</span>, <span class="tok-val">'marca-gamma'</span>];

<span class="tok-kw">function</span> <span class="tok-fn">brandFilter</span>(brandId) {
  <span class="tok-kw">return</span> <span class="tok-val">\`WHERE brand_id = '\${brandId}' AND _is_current = TRUE\`</span>;
}

<span class="tok-kw">function</span> <span class="tok-fn">parseReceita</span>(col) {
  <span class="tok-kw">return</span> <span class="tok-val">\`ROUND(SAFE_CAST(REGEXP_REPLACE(\${col}, r'[R$\\s.]','') AS FLOAT64), 2)\`</span>;
}

module.exports = { BRAND_IDS, brandFilter, parseReceita };`,
    compiled:`<span class="tok-cmt">// Arquivo JS — não gera SQL diretamente.</span>
<span class="tok-cmt">// Exporta funções usadas via \${...} nos modelos .sqlx</span>`,
  },
};

// ─── TABLE SCHEMAS ────────────────────────────────────
const TABLE_SCHEMAS = {
  raw_historical:{
    icon:'🗃️',label:'dito_cdp.raw_historical',description:'Histórico completo — todos os snapshots, multi-brand, particionado.',color:'#fca5a5',colCount:11,
    fields:[
      {name:'id',type:'STRING',mode:'REQUIRED',desc:'Identificador único do cliente'},
      {name:'brand_id',type:'STRING',mode:'REQUIRED',desc:'⚠ Filtrar sempre — identifica a marca'},
      {name:'snapshot_ts',type:'TIMESTAMP',mode:'REQUIRED',desc:'Data/hora da captura'},
      {name:'nome',type:'STRING',mode:'NULLABLE',desc:'Nome como recebido na fonte'},
      {name:'email',type:'STRING',mode:'NULLABLE',desc:'Email bruto'},
      {name:'telefone',type:'STRING',mode:'NULLABLE',desc:'Telefone bruto'},
      {name:'segmento',type:'STRING',mode:'NULLABLE',desc:'Segmento de mercado'},
      {name:'receita_anual',type:'STRING',mode:'NULLABLE',desc:'Receita como string (dado cru)'},
      {name:'criado_em',type:'STRING',mode:'NULLABLE',desc:'Data de criação no CRM de origem'},
      {name:'_source',type:'STRING',mode:'REQUIRED',desc:'Tipo de carga'},
      {name:'_batch',type:'STRING',mode:'REQUIRED',desc:'Identificador do batch'},
    ],
    getData:()=>HISTORICAL_DATA,
  },
  silver_customers:{
    icon:'⚗️',label:'dito_cdp.silver_customers',description:'Camada Silver — último snapshot limpo por cliente, multi-brand.',color:'#cbd5e1',colCount:10,
    fields:[
      {name:'id',type:'STRING',mode:'REQUIRED',desc:'Identificador único do cliente'},
      {name:'brand_id',type:'STRING',mode:'REQUIRED',desc:'⚠ Filtrar sempre — identifica a marca'},
      {name:'nome',type:'STRING',mode:'NULLABLE',desc:'Nome padronizado (Title Case)'},
      {name:'email',type:'STRING',mode:'NULLABLE',desc:'Email normalizado'},
      {name:'telefone',type:'STRING',mode:'NULLABLE',desc:'Telefone com máscara'},
      {name:'segmento',type:'STRING',mode:'NULLABLE',desc:'Segmento de mercado'},
      {name:'receita_anual',type:'DECIMAL',mode:'NULLABLE',desc:'Receita com 2 casas decimais'},
      {name:'criado_em',type:'DATE',mode:'NULLABLE',desc:'Data ISO 8601'},
      {name:'_updated_at',type:'TIMESTAMP',mode:'REQUIRED',desc:'Última atualização'},
      {name:'_is_current',type:'BOOLEAN',mode:'REQUIRED',desc:'TRUE = registro mais recente'},
    ],
    getData:()=>SILVER_DATA,
  },
  customers_clean:{
    icon:'✅',label:'dito_cdp.customers_clean',description:'Tabela final do pipeline — resultado das transformações desta sessão.',color:'#c4b5fd',colCount:8,
    fields:[
      {name:'id',type:'STRING',mode:'REQUIRED',desc:'Identificador único'},
      {name:'brand_id',type:'STRING',mode:'REQUIRED',desc:'⚠ Filtrar sempre — identifica a marca'},
      {name:'nome',type:'STRING',mode:'NULLABLE',desc:'Nome padronizado'},
      {name:'email',type:'STRING',mode:'NULLABLE',desc:'Email normalizado'},
      {name:'telefone',type:'STRING',mode:'NULLABLE',desc:'Telefone com máscara'},
      {name:'segmento',type:'STRING',mode:'NULLABLE',desc:'Segmento de mercado'},
      {name:'receita_anual',type:'DECIMAL',mode:'NULLABLE',desc:'Receita decimal (2 casas)'},
      {name:'criado_em',type:'DATE',mode:'NULLABLE',desc:'Data ISO 8601'},
    ],
    getData:()=>transformedData.length?transformedData:RAW_DATA,
  },
};

// ─── STATE ────────────────────────────────────────────
let extractedData   = [...RAW_DATA];
let transformedData = [];
let activeTable     = null;
let activeBrand     = 'todas';
let currentTfFile   = 'customers_clean'; // active file in transformer
let lastChangedRule = null;

// ─── HELPERS ─────────────────────────────────────────
function toTitle(s){ return s.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase()); }
function maskPhone(t){
  const d=t.replace(/\D/g,'');
  if(d.length===11) return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
  if(d.length===10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  return t;
}
function parseReceita(v){
  if(!v||v.trim()==='') return '';
  const c=v.replace(/R\$\s*/,'').replace(/\./g,'').replace(',','.').trim();
  const n=parseFloat(c);
  return isNaN(n)?'':n.toFixed(2);
}
function toIso(d){
  if(!d) return d;
  const m=d.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if(m) return `${m[3]}-${m[2]}-${m[1]}`;
  return d;
}
function fmtDecimal(v){
  const n=parseFloat(v);
  if(isNaN(n)) return v;
  return n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
}
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ─── NAVIGATION ───────────────────────────────────────
function goStage(n){
  document.querySelectorAll('[id^="stage-"]').forEach((el,i)=>el.classList.toggle('hidden',i!==n));
  document.querySelectorAll('.stage-btn').forEach((el,i)=>el.classList.toggle('active',i===n));
  if(n===0) renderRawTable();
  if(n===1) resetExtractStage();
  if(n===2) initTransformStage();
  if(n===3) renderBQStage();
}
window.goStage=goStage;

// ─── STAGE 0 ──────────────────────────────────────────
function renderRawTable(){
  document.getElementById('raw-body').innerHTML=RAW_DATA.map(r=>{
    const iss=r.issues||[];
    return `<tr class="${r.dirty?'dirty':''}">
      <td>${r.id}</td>
      <td><span class="badge badge-gray" style="font-size:9px">${r.brand_id}</span></td>
      <td class="${iss.includes('nome_lower')||iss.includes('nome_upper')?'err-cell':''}">${r.nome}</td>
      <td class="${iss.includes('email_case')||iss.includes('email_invalid')?'err-cell':''}">${r.email}</td>
      <td class="${iss.includes('tel_mask')?'err-cell':''}">${r.telefone}</td>
      <td>${r.segmento}</td>
      <td class="${iss.includes('receita_null')?'err-cell':''}">${r.receita_anual||'<em>NULL</em>'}</td>
      <td class="${iss.includes('data_fmt')?'err-cell':''}">${r.criado_em}</td>
    </tr>`;
  }).join('');
}

// ─── STAGE 1 ──────────────────────────────────────────
function resetExtractStage(){
  document.getElementById('extract-log').innerHTML='<span class="log-info">// aguardando execução...</span>';
  document.getElementById('schema-log').innerHTML='<span class="log-info">// aguardando extração...</span>';
  ['st-total','st-ok','st-err'].forEach(id=>document.getElementById(id).textContent='—');
}

function runExtract(){
  const anim=document.getElementById('run-anim');
  const btn=document.getElementById('btn-run-extract');
  anim.classList.remove('hidden'); btn.disabled=true; btn.textContent='Extraindo...';
  setTimeout(()=>{
    anim.classList.add('hidden'); btn.disabled=false; btn.textContent='Executar extração ↗';
    const n=parseInt(document.getElementById('rec-count').value);
    const dirty=RAW_DATA.filter(r=>r.dirty).length, ok=RAW_DATA.length-dirty;
    const total=n<=8?RAW_DATA.length:n;
    document.getElementById('st-total').textContent=total;
    document.getElementById('st-ok').textContent=n<=8?ok:Math.round(n*(ok/RAW_DATA.length));
    document.getElementById('st-err').textContent=n<=8?dirty:Math.round(n*(dirty/RAW_DATA.length));
    const src=document.getElementById('source-type').value;
    const tbl=document.getElementById('source-table').value;
    document.getElementById('extract-log').innerHTML=[
      `<span class="log-ok">✓  Conectando a ${src}...</span>`,
      `<span class="log-ok">✓  Autenticação realizada</span>`,
      `<span class="log-ok">✓  Lendo tabela "${tbl}"</span>`,
      `<span class="log-ok">✓  ${total} registros lidos</span>`,
      `<span class="log-warn">⚠  ${dirty} registros com inconsistências</span>`,
      `<span class="log-ok">✓  Extração concluída em 1.3s</span>`,
    ].join('<br>');
    document.getElementById('schema-log').innerHTML=[
      '<span class="log-ok">id             STRING   ✓</span>',
      '<span class="log-ok">brand_id       STRING   ✓</span>',
      '<span class="log-ok">nome           STRING   ✓</span>',
      '<span class="log-ok">email          STRING   ✓</span>',
      '<span class="log-ok">telefone       STRING   ✓</span>',
      '<span class="log-ok">segmento       STRING   ✓</span>',
      '<span class="log-warn">receita_anual  STRING   ⚠ esperado: DECIMAL(2)</span>',
      '<span class="log-warn">criado_em      STRING   ⚠ esperado: DATE</span>',
    ].join('<br>');
    document.getElementById('btn-0').classList.add('done');
    document.getElementById('btn-1').classList.add('done');
    extractedData=[...RAW_DATA];
    document.getElementById('go-transform-btn').classList.remove('hidden');
  },1400);
}
window.runExtract=runExtract;

// ══════════════════════════════════════════════════════
//  STAGE 2: UNIFIED TRANSFORMER
// ══════════════════════════════════════════════════════

function initTransformStage(){
  renderRulesList();
  tfSelectFile('customers_clean');
}

// render rules in the left panel
function renderRulesList(){
  document.getElementById('tf-rules-list').innerHTML=RULES.map(r=>`
    <label class="tf-rule-row active" id="rulerow-${r.id}">
      <input type="checkbox" id="rule-${r.id}" checked onchange="onRuleChange('${r.id}')">
      <div class="tf-rule-info">
        <span class="tf-rule-name">${r.label}</span>
        <span class="tf-rule-sql">${esc(r.sqlHint)}</span>
      </div>
      <span class="badge ${BADGE_CLASS[r.badge]||'badge-info'} tf-rule-badge">${r.badge}</span>
    </label>`).join('');
  updatePreview();
}

function onRuleChange(ruleId){
  lastChangedRule=ruleId;
  const cb=document.getElementById('rule-'+ruleId);
  document.getElementById('rulerow-'+ruleId).classList.toggle('active',cb.checked);
  updatePreview();
  if(currentTfFile==='customers_clean'){
    tfRenderSqlx('customers_clean');
    flashRunStatus();
  }
}
window.onRuleChange=onRuleChange;

function updatePreview(){
  const cols=['brand_id','nome','email','telefone','receita_anual','criado_em'];
  const transformed=applyRules(extractedData);
  const head=`<tr>${cols.map(c=>`<th>${c}</th>`).join('')}</tr>`;
  const mkRows=d=>d.map(r=>`<tr>${cols.map(c=>`<td>${r[c]!==undefined&&r[c]!==''?r[c]:'<em>NULL</em>'}</td>`).join('')}</tr>`).join('');
  document.getElementById('tf-before-body').innerHTML=head+mkRows(extractedData);
  document.getElementById('tf-after-body').innerHTML=head+mkRows(transformed);
  transformedData=transformed;
}

function applyRules(data){
  const checked=RULES.filter(r=>{ const el=document.getElementById('rule-'+r.id); return el&&el.checked; });
  return data.map(row=>{ let r={...row}; checked.forEach(rule=>{r=rule.fn(r);}); return r; });
}

// file tree selection
function tfSelectFile(key){
  currentTfFile=key;
  document.querySelectorAll('.tf-file').forEach(el=>el.classList.remove('active'));
  const fileMap={
    raw_source:'tffile-raw', customers_clean:'tffile-clean',
    silver_customers:'tffile-silver', brand_filter:'tffile-brand', variables:'tffile-vars'
  };
  document.getElementById(fileMap[key])?.classList.add('active');

  // show/hide rules panel — only relevant for customers_clean
  const rulesCol=document.getElementById('tf-rules-col');
  rulesCol.style.display=(key==='customers_clean')?'flex':'none';
  // adjust grid: 3-col or 2-col
  document.querySelector('.tf-layout').style.gridTemplateColumns=
    key==='customers_clean'?'180px 1fr 1fr':'180px 0 1fr';

  if(key==='customers_clean'){
    tfRenderSqlx('customers_clean');
    tfSetDag(['raw_source'],['dag-raw'],'customers_clean');
  } else {
    const s=STATIC_SQLX[key];
    document.getElementById('tsqlx-body-src').innerHTML=s.src;
    document.getElementById('tsqlx-body-compiled').innerHTML=s.compiled;
    document.getElementById('tf-sqlx-filename').textContent=s.title;
    document.querySelector('.tf-col-header .tf-col-sub') && (()=>{})();
    tfSetDag(s.deps,s.depClasses,key);
  }
  tfSwitchTab('src');
  resetRunStatus();
}
window.tfSelectFile=tfSelectFile;

function tfSetDag(deps,depClasses,currentKey){
  const keyLabels={raw_source:'raw_source',customers_clean:'customers_clean',silver_customers:'silver_customers',brand_filter:'brand_filter',variables:'variables'};
  const keyClass ={raw_source:'dag-raw',customers_clean:'dag-clean',silver_customers:'dag-silver',brand_filter:'dag-clean'};
  const nodes=document.getElementById('tf-dag-nodes');
  if(deps.length===0){
    nodes.innerHTML=`<span style="font-size:10px;color:var(--c-text-3);font-family:var(--font-mono)">nenhuma — modelo raiz</span>`;
  } else {
    nodes.innerHTML=deps.map((d,i)=>
      `<span class="dag-node ${depClasses[i]||''}">${keyLabels[d]||d}</span><span class="dag-arrow">→</span>`
    ).join('')+`<span class="dag-node ${keyClass[currentKey]||''}">${keyLabels[currentKey]||currentKey}</span>`;
  }
}

// ── generates customers_clean SQLX dynamically from active rules ──
function tfRenderSqlx(key){
  if(key!=='customers_clean') return;
  const checkedRules=RULES.filter(r=>{ const el=document.getElementById('rule-'+r.id); return el&&el.checked; });
  const uncheckedRules=RULES.filter(r=>{ const el=document.getElementById('rule-'+r.id); return el&&!el.checked; });

  const colLines=[];

  // always pass through these columns raw
  colLines.push(
    `  id,`,
    `  brand_id,`,
  );

  // nome
  const nomeRule=checkedRules.find(r=>r.id==='nome_title');
  const nomeLine=nomeRule
    ? `  <span class="tok-fn${lastChangedRule==='nome_title'?' tok-hi':''}">INITCAP</span>(nome)   <span class="tok-kw">AS</span> nome,`
    : `  nome,   <span class="tok-cmt">-- sem transformação</span>`;
  colLines.push(nomeLine);

  // email
  const emailLower=checkedRules.find(r=>r.id==='email_lower');
  const emailValid=checkedRules.find(r=>r.id==='email_valid');
  let emailExpr='email';
  if(emailLower) emailExpr=`<span class="tok-fn${lastChangedRule==='email_lower'?' tok-hi':''}">LOWER</span>(email)`;
  if(emailValid){
    const hi=lastChangedRule==='email_valid'?' tok-hi':'';
    emailExpr=`<span class="tok-kw${hi}">CASE</span> <span class="tok-kw">WHEN</span> email <span class="tok-kw">NOT LIKE</span> <span class="tok-str">'%@%'</span>\n       <span class="tok-kw">THEN</span> <span class="tok-str">'[INVÁLIDO]'</span>\n       <span class="tok-kw">ELSE</span> ${emailLower?`<span class="tok-fn">LOWER</span>(email)`:'email'} <span class="tok-kw">END</span>`;
  }
  colLines.push(`  ${emailExpr} <span class="tok-kw">AS</span> email,`);

  // telefone
  const telRule=checkedRules.find(r=>r.id==='tel_mask');
  const telLine=telRule
    ? `  <span class="tok-fn${lastChangedRule==='tel_mask'?' tok-hi':''}">REGEXP_REPLACE</span>(telefone, <span class="tok-str">r'(\\d{2})(\\d{5})(\\d{4})'</span>, <span class="tok-str">'(\\1) \\2-\\3'</span>) <span class="tok-kw">AS</span> telefone,`
    : `  telefone,   <span class="tok-cmt">-- sem máscara</span>`;
  colLines.push(telLine);

  // segmento — pass through
  colLines.push(`  segmento,`);

  // receita
  const recNum=checkedRules.find(r=>r.id==='receita_num');
  const recNull=checkedRules.find(r=>r.id==='receita_null');
  let recExpr='receita_anual';
  if(recNum){
    const hi=lastChangedRule==='receita_num'?' tok-hi':'';
    recExpr=`<span class="tok-fn${hi}">ROUND</span>(<span class="tok-fn">SAFE_CAST</span>(\n      <span class="tok-fn">REGEXP_REPLACE</span>(receita_anual, <span class="tok-str">r'[R$\\s.]'</span>, <span class="tok-str">''</span>)\n    <span class="tok-kw">AS</span> FLOAT64), <span class="tok-num">2</span>)`;
  }
  if(recNull){
    const hi=lastChangedRule==='receita_null'?' tok-hi':'';
    recExpr=`<span class="tok-fn${hi}">COALESCE</span>(${recExpr}, <span class="tok-num">0.00</span>)`;
  }
  colLines.push(`  ${recExpr} <span class="tok-kw">AS</span> receita_anual,`);

  // data
  const dataRule=checkedRules.find(r=>r.id==='data_iso');
  const dataLine=dataRule
    ? `  <span class="tok-fn${lastChangedRule==='data_iso'?' tok-hi':''}">PARSE_DATE</span>(<span class="tok-str">'%d/%m/%Y'</span>, criado_em) <span class="tok-kw">AS</span> criado_em`
    : `  criado_em   <span class="tok-cmt">-- sem conversão de data</span>`;
  colLines.push(dataLine);

  const unusedNote=uncheckedRules.length>0
    ? `\n\n<span class="tok-cmt">-- Regras desativadas: ${uncheckedRules.map(r=>r.id).join(', ')}</span>`
    : '';

  const srcHtml=
`<span class="tok-cfg">config</span> <span class="tok-op">{</span>
  <span class="tok-cfg">type</span>: <span class="tok-val">"table"</span>,
  <span class="tok-cfg">schema</span>: <span class="tok-val">"dito_cdp"</span>,
  <span class="tok-cfg">tags</span>: [<span class="tok-val">"silver"</span>, <span class="tok-val">"customers"</span>],
<span class="tok-op">}</span>

<span class="tok-kw">SELECT</span>
${colLines.join('\n')}

<span class="tok-kw">FROM</span> <span class="tok-fn">\${ref('raw_source')}</span>${unusedNote}`;

  const compiledHtml=
`<span class="tok-cmt">-- Compilado pelo Dataform Core 3.0.4</span>
<span class="tok-kw">CREATE OR REPLACE TABLE</span> <span class="tok-fn">\`dito-cdp.dito_cdp.customers_clean\`</span> <span class="tok-kw">AS</span>
<span class="tok-kw">SELECT</span>
${colLines.join('\n')}
<span class="tok-kw">FROM</span> <span class="tok-fn">\`dito-cdp.dito_cdp.raw_source\`</span>`;

  document.getElementById('tsqlx-body-src').innerHTML=srcHtml;
  document.getElementById('tsqlx-body-compiled').innerHTML=compiledHtml;
  document.getElementById('tf-sqlx-filename').textContent='customers_clean.sqlx';
  tfSetDag(['raw_source'],['dag-raw'],'customers_clean');
}

function tfSwitchTab(tab){
  document.getElementById('tsqlx-tab-src').classList.toggle('active',tab==='src');
  document.getElementById('tsqlx-tab-compiled').classList.toggle('active',tab==='compiled');
  document.getElementById('tsqlx-body-src').classList.toggle('hidden',tab!=='src');
  document.getElementById('tsqlx-body-compiled').classList.toggle('hidden',tab!=='compiled');
}
window.tfSwitchTab=tfSwitchTab;

function flashRunStatus(){
  const st=document.getElementById('tf-run-status');
  st.className='tf-run-status running'; st.textContent='● SQLX atualizado — pronto para compilar';
}
function resetRunStatus(){
  const st=document.getElementById('tf-run-status');
  st.className='tf-run-status'; st.textContent='Selecione um arquivo ou edite uma regra';
}

function tfCompile(){
  const st=document.getElementById('tf-run-status');
  st.className='tf-run-status running'; st.textContent='⚙ Compilando...';
  setTimeout(()=>{
    st.className='tf-run-status ok'; st.textContent='✓ Compilado com sucesso — sem erros';
    tfSwitchTab('compiled');
  },700);
}
window.tfCompile=tfCompile;

function tfRunAll(){
  const st=document.getElementById('tf-run-status');
  st.className='tf-run-status running'; st.textContent='▶ Executando no BigQuery...';
  transformedData=applyRules(extractedData);
  setTimeout(()=>{
    st.className='tf-run-status ok';
    st.textContent=`✓ ${transformedData.length} linhas escritas em ${(Math.random()*1.5+0.4).toFixed(2)}s`;
    document.getElementById('btn-2').classList.add('done');
  },1100);
}
window.tfRunAll=tfRunAll;

function runTransform(){
  transformedData=applyRules(extractedData);
  document.getElementById('btn-2').classList.add('done');
  document.getElementById('btn-3').classList.add('done');
  goStage(3);
}
window.runTransform=runTransform;

// ─── STAGE 3: BIGQUERY ────────────────────────────────
function renderBQStage(){
  const n=parseInt(document.getElementById('rec-count').value);
  document.getElementById('bq-loaded').textContent=n<=8?transformedData.length||RAW_DATA.length:n;
  document.getElementById('bq-time').textContent=(Math.random()*1.5+0.4).toFixed(2)+'s';
  document.getElementById('bq-cols').textContent='—';
  activeTable=null; activeBrand='todas';
  document.getElementById('bq-active-label').textContent='Selecione uma tabela na barra lateral';
  document.getElementById('bq-active-icon').textContent='📋';
  document.getElementById('bq-schema-section').classList.add('hidden');
  document.getElementById('bq-empty-state').classList.remove('hidden');
  document.querySelectorAll('.table-item').forEach(el=>el.classList.remove('selected'));
  document.querySelectorAll('.brand-pill').forEach(el=>el.classList.toggle('active',el.dataset.brand==='todas'));
}

function toggleProject(){
  const ch=document.getElementById('proj-children'),ar=document.getElementById('proj-arrow');
  const open=!ch.classList.contains('hidden');
  ch.classList.toggle('hidden',open); ar.style.transform=open?'rotate(-90deg)':'';
}
window.toggleProject=toggleProject;

function toggleDataset(id){
  const ch=document.getElementById(id+'-children'),ar=document.getElementById(id+'-arrow');
  const open=!ch.classList.contains('hidden');
  ch.classList.toggle('hidden',open); ar.style.transform=open?'rotate(-90deg)':'';
}
window.toggleDataset=toggleDataset;

function selectTable(key){
  activeTable=key;
  const schema=TABLE_SCHEMAS[key];
  document.querySelectorAll('.table-item').forEach(el=>el.classList.remove('selected'));
  const idMap={raw_historical:'tbl-raw-hist',silver_customers:'tbl-silver',customers_clean:'tbl-clean'};
  document.getElementById(idMap[key])?.classList.add('selected');
  document.getElementById('bq-active-icon').textContent=schema.icon;
  document.getElementById('bq-active-label').innerHTML=
    `<div><strong style="color:${schema.color};font-size:12px">${schema.label}</strong><br><span style="font-size:10px;color:var(--c-text-3)">${schema.description}</span></div>`;
  document.getElementById('bq-cols').textContent=schema.colCount;
  document.getElementById('bq-schema-body').innerHTML=schema.fields.map(f=>`
    <tr>
      <td><strong${f.name==='brand_id'?' style="color:#fcd34d"':''}>${f.name}</strong></td>
      <td><span class="badge badge-info" style="font-size:9px">${f.type}</span></td>
      <td><span class="badge ${f.mode==='REQUIRED'?'badge-err':'badge-ok'}" style="font-size:9px">${f.mode}</span></td>
      <td style="color:var(--c-text-2)">${f.desc}</td>
    </tr>`).join('');
  document.getElementById('bq-empty-state').classList.add('hidden');
  document.getElementById('bq-schema-section').classList.remove('hidden');
  switchTab('schema');
  document.getElementById('bq-query').value=
    `SELECT *\nFROM \`dito-cdp.dito_cdp.${key}\`\nWHERE brand_id = 'marca-alpha'\n  AND _is_current = TRUE\nLIMIT 100;`;
}
window.selectTable=selectTable;

function switchTab(tab){
  document.getElementById('tab-schema').classList.toggle('active',tab==='schema');
  document.getElementById('tab-query').classList.toggle('active',tab==='query');
  document.getElementById('bq-tab-schema').classList.toggle('hidden',tab!=='schema');
  document.getElementById('bq-tab-query').classList.toggle('hidden',tab!=='query');
}
window.switchTab=switchTab;

function selectBrand(el,brand){
  activeBrand=brand;
  document.querySelectorAll('.brand-pill').forEach(p=>p.classList.toggle('active',p===el));
  if(!activeTable) return;
  const ref=`\`dito-cdp.dito_cdp.${activeTable}\``;
  document.getElementById('bq-query').value=brand==='todas'
    ?`SELECT *\nFROM ${ref}\nLIMIT 100;`
    :`SELECT *\nFROM ${ref}\nWHERE brand_id = '${brand}'\n  AND _is_current = TRUE\nLIMIT 100;`;
}
window.selectBrand=selectBrand;

function copyBrandQuery(){
  const snippet=`WHERE brand_id = '{{brand_id}}'\n  AND _is_current = TRUE`;
  navigator.clipboard?.writeText(snippet).catch(()=>{});
  const el=document.querySelector('.bt-code');
  if(el){ el.textContent='✓ Copiado!'; setTimeout(()=>el.textContent=snippet,1300); }
}
window.copyBrandQuery=copyBrandQuery;

const BQ_QUERIES={
  all:    ()=>`SELECT *\nFROM \`dito-cdp.dito_cdp.${activeTable||'customers_clean'}\`\nLIMIT 100;`,
  brand:  ()=>`SELECT *\nFROM \`dito-cdp.dito_cdp.${activeTable||'customers_clean'}\`\nWHERE brand_id = 'marca-alpha'\n  AND _is_current = TRUE\nLIMIT 100;`,
  seg:    ()=>`SELECT brand_id, segmento, COUNT(*) AS total,\n  SUM(CAST(receita_anual AS DECIMAL)) AS receita\nFROM \`dito-cdp.dito_cdp.${activeTable||'customers_clean'}\`\nWHERE brand_id = 'marca-alpha'\nGROUP BY brand_id, segmento ORDER BY receita DESC;`,
  issues: ()=>`SELECT *\nFROM \`dito-cdp.dito_cdp.${activeTable||'customers_clean'}\`\nWHERE (email = '[INVÁLIDO]' OR receita_anual IS NULL)\n  AND brand_id = 'marca-alpha';`,
  revenue:()=>`SELECT id, nome, brand_id, segmento,\n  CAST(receita_anual AS DECIMAL) AS receita\nFROM \`dito-cdp.dito_cdp.${activeTable||'customers_clean'}\`\nWHERE brand_id = 'marca-alpha'\nORDER BY receita DESC LIMIT 5;`,
};
function setQuery(k){ switchTab('query'); document.getElementById('bq-query').value=BQ_QUERIES[k](); }
window.setQuery=setQuery;

function runQuery(){
  if(!activeTable) return;
  switchTab('query');
  const schema=TABLE_SCHEMAS[activeTable];
  let data=schema.getData();
  const q=document.getElementById('bq-query').value.trim().toLowerCase();
  const brandMatch=q.match(/brand_id\s*=\s*'([^']+)'/);
  if(brandMatch) data=data.filter(r=>r.brand_id===brandMatch[1]);
  let cols, rows;
  if(q.includes('group by')&&q.includes('segmento')){
    cols=['brand_id','segmento','total','receita'];
    const groups={};
    data.forEach(r=>{
      const k=`${r.brand_id}||${r.segmento}`;
      if(!groups[k]) groups[k]={brand_id:r.brand_id,segmento:r.segmento,total:0,receita:0};
      groups[k].total++; groups[k].receita+=parseFloat(r.receita_anual)||0;
    });
    rows=Object.values(groups).map(v=>[v.brand_id,v.segmento,v.total,fmtDecimal(v.receita.toFixed(2))]);
    rows.sort((a,b)=>parseFloat(b[3].replace(/\./g,'').replace(',','.'))-parseFloat(a[3].replace(/\./g,'').replace(',','.')));
  } else if(q.includes('email')&&q.includes('inválido')){
    cols=['id','brand_id','nome','email','receita_anual'];
    rows=data.filter(r=>r.email==='[INVÁLIDO]'||!r.receita_anual||r.receita_anual==='').map(r=>[r.id,r.brand_id,r.nome,r.email,r.receita_anual||'NULL']);
  } else if(q.includes('order by receita')){
    cols=['id','nome','brand_id','segmento','receita'];
    rows=[...data].filter(r=>r.receita_anual).sort((a,b)=>(parseFloat(b.receita_anual)||0)-(parseFloat(a.receita_anual)||0)).slice(0,5).map(r=>[r.id,r.nome,r.brand_id,r.segmento,fmtDecimal(r.receita_anual)]);
  } else {
    cols=schema.fields.map(f=>f.name);
    rows=data.slice(0,100).map(r=>cols.map(c=>{
      const v=r[c];
      if(v===undefined||v===null||v==='') return 'NULL';
      if(schema.fields.find(f=>f.name===c&&f.type==='DECIMAL')) return fmtDecimal(v);
      if(typeof v==='boolean') return String(v).toUpperCase();
      return String(v);
    }));
  }
  document.getElementById('bq-result-head').innerHTML=`<tr>${cols.map(c=>`<th${c==='brand_id'?' style="color:#fcd34d"':''}>${c}</th>`).join('')}</tr>`;
  document.getElementById('bq-result-body').innerHTML=rows.map(r=>`<tr>${r.map((v,i)=>`<td${cols[i]==='brand_id'?' style="color:#fcd34d"':''}>${v}</td>`).join('')}</tr>`).join('');
  document.getElementById('bq-summary').textContent=`${rows.length} linha(s) retornada(s)${brandMatch?` · brand: ${brandMatch[1]}`:''}`;
}
window.runQuery=runQuery;

// ─── INIT ─────────────────────────────────────────────
renderRawTable();