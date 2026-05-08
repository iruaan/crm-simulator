// ═══════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════
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
  { id:'C001', brand_id:'marca-alpha', snapshot_ts:'2023-06-10T08:00:00Z', nome:'Ana Souza',    segmento:'SMB',        receita_anual:'45000.00',  _source:'initial_load' },
  { id:'C001', brand_id:'marca-alpha', snapshot_ts:'2023-11-20T14:22:00Z', nome:'Ana Souza',    segmento:'Mid-Market', receita_anual:'85000.00',  _source:'cdc_update'   },
  { id:'C001', brand_id:'marca-alpha', snapshot_ts:'2024-01-15T09:10:00Z', nome:'Ana Souza',    segmento:'Enterprise', receita_anual:'120000.00', _source:'full_refresh' },
  { id:'C002', brand_id:'marca-beta',  snapshot_ts:'2023-08-01T10:00:00Z', nome:'joao silva',   segmento:'SMB',        receita_anual:'45000.00',  _source:'initial_load' },
  { id:'C002', brand_id:'marca-beta',  snapshot_ts:'2024-03-15T11:30:00Z', nome:'joao silva',   segmento:'SMB',        receita_anual:'45000.00',  _source:'incremental'  },
  { id:'C003', brand_id:'marca-alpha', snapshot_ts:'2023-07-05T08:00:00Z', nome:'Maria Lima',   segmento:'Mid-Market', receita_anual:'200000.00', _source:'initial_load' },
  { id:'C003', brand_id:'marca-alpha', snapshot_ts:'2024-02-20T16:00:00Z', nome:'Maria Lima',   segmento:'Enterprise', receita_anual:'380000.00', _source:'cdc_update'   },
  { id:'C004', brand_id:'marca-gamma', snapshot_ts:'2024-03-01T09:00:00Z', nome:'Pedro Alves',  segmento:'Mid-Market', receita_anual:'',          _source:'initial_load' },
  { id:'C005', brand_id:'marca-beta',  snapshot_ts:'2024-03-10T08:00:00Z', nome:'Carla Mota',   segmento:'SMB',        receita_anual:'18000.00',  _source:'full_refresh' },
  { id:'C006', brand_id:'marca-alpha', snapshot_ts:'2024-04-05T08:00:00Z', nome:'ROBERTO NETO', segmento:'Enterprise', receita_anual:'950000.00', _source:'full_refresh' },
  { id:'C007', brand_id:'marca-gamma', snapshot_ts:'2024-04-18T08:00:00Z', nome:'Lucia Prado',  segmento:'Mid-Market', receita_anual:'72000.00',  _source:'incremental'  },
  { id:'C008', brand_id:'marca-beta',  snapshot_ts:'2024-05-02T08:00:00Z', nome:'Felipe Dias',  segmento:'SMB',        receita_anual:'29000.00',  _source:'incremental'  },
];

const SILVER_DATA = [
  { id:'C001', brand_id:'marca-alpha', nome:'Ana Souza',    email:'ana.souza@email.com',   telefone:'(11) 99999-0001', segmento:'Enterprise', receita_anual:'120000.00', criado_em:'2024-01-15', _is_current:true },
  { id:'C002', brand_id:'marca-beta',  nome:'Joao Silva',   email:'joao@empresa.com',      telefone:'(11) 98888-0002', segmento:'SMB',        receita_anual:'45000.00',  criado_em:'2024-03-15', _is_current:true },
  { id:'C003', brand_id:'marca-alpha', nome:'Maria Lima',   email:'maria.lima@corp.io',    telefone:'(21) 97777-0003', segmento:'Enterprise', receita_anual:'380000.00', criado_em:'2024-02-20', _is_current:true },
  { id:'C004', brand_id:'marca-gamma', nome:'Pedro Alves',  email:'[INVÁLIDO]',            telefone:'(31) 96666-0004', segmento:'Mid-Market', receita_anual:'0.00',      criado_em:'2024-03-01', _is_current:true },
  { id:'C005', brand_id:'marca-beta',  nome:'Carla Mota',   email:'carla.mota@startup.dev',telefone:'(41) 95555-0005', segmento:'SMB',        receita_anual:'18000.00',  criado_em:'2024-03-10', _is_current:true },
  { id:'C006', brand_id:'marca-alpha', nome:'Roberto Neto', email:'roberto@bigcorp.com',   telefone:'(48) 98444-0006', segmento:'Enterprise', receita_anual:'950000.00', criado_em:'2024-04-05', _is_current:true },
  { id:'C007', brand_id:'marca-gamma', nome:'Lucia Prado',  email:'lucia.prado@agency.net',telefone:'(51) 93333-0007', segmento:'Mid-Market', receita_anual:'72000.00',  criado_em:'2024-04-18', _is_current:true },
  { id:'C008', brand_id:'marca-beta',  nome:'Felipe Dias',  email:'felipe.dias@tech.co',   telefone:'(61) 92222-0008', segmento:'SMB',        receita_anual:'29000.00',  criado_em:'2024-05-02', _is_current:true },
];

// ═══════════════════════════════════════════════
//  RULES
// ═══════════════════════════════════════════════
const RULES = [
  { id:'nome_title',   label:'Padronizar nomes',        hint:'INITCAP(nome) AS nome',                              badge:'Texto',    bc:'tb-blue',
    fn: r => ({...r, nome: r.nome.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase()) }) },
  { id:'email_lower',  label:'Email em minúsculas',      hint:'LOWER(email) AS email',                              badge:'Texto',    bc:'tb-blue',
    fn: r => ({...r, email: r.email.toLowerCase() }) },
  { id:'email_valid',  label:'Validar e-mails',          hint:"CASE WHEN email NOT LIKE '%@%' THEN '[INVÁLIDO]'",   badge:'Qualidade',bc:'tb-teal',
    fn: r => ({...r, email: r.email.includes('@') ? r.email : '[INVÁLIDO]' }) },
  { id:'tel_mask',     label:'Formatar telefone',        hint:"REGEXP_REPLACE(telefone, …) AS telefone",            badge:'Formato',  bc:'tb-amber',
    fn: r => ({...r, telefone: maskPhone(r.telefone) }) },
  { id:'receita_num',  label:'Receita → número decimal', hint:"ROUND(SAFE_CAST(…receita_anual… AS FLOAT64), 2)",    badge:'Tipo',     bc:'tb-violet',
    fn: r => ({...r, receita_anual: parseReceita(r.receita_anual) }) },
  { id:'data_iso',     label:'Data → formato ISO',       hint:"PARSE_DATE('%d/%m/%Y', criado_em)",                  badge:'Formato',  bc:'tb-amber',
    fn: r => ({...r, criado_em: toIso(r.criado_em) }) },
  { id:'receita_null', label:'Receita vazia → 0.00',     hint:'COALESCE(receita_anual, 0.00) AS receita_anual',     badge:'Qualidade',bc:'tb-teal',
    fn: r => ({...r, receita_anual: (!r.receita_anual||r.receita_anual==='') ? '0.00' : r.receita_anual }) },
];

// ═══════════════════════════════════════════════
//  TABLE SCHEMAS
// ═══════════════════════════════════════════════
const SCHEMAS = {
  raw_historical: {
    label:'raw_historical', icon:'🗃️', color:'#e11d48', colorCls:'tb-rose',
    desc:'Histórico completo — todos os snapshots de todos os clientes, sem transformação.',
    cols:8,
    fields:[
      {n:'id',          t:'STRING',    req:true,  d:'Código único do cliente'},
      {n:'brand_id',    t:'STRING',    req:true,  d:'⚠️ Marca do cliente — sempre filtre por aqui'},
      {n:'snapshot_ts', t:'TIMESTAMP', req:true,  d:'Data e hora exata deste snapshot'},
      {n:'nome',        t:'STRING',    req:false, d:'Nome como veio do sistema de origem'},
      {n:'segmento',    t:'STRING',    req:false, d:'Classificação do cliente (SMB, Enterprise…)'},
      {n:'receita_anual',t:'STRING',   req:false, d:'Receita em texto bruto (ex: "R$ 120.000,00")'},
      {n:'_source',     t:'STRING',    req:true,  d:'Como este dado chegou (full_refresh, incremental…)'},
    ],
    getData: () => HISTORICAL_DATA,
  },
  silver_customers: {
    label:'silver_customers', icon:'⚗️', color:'#94a3b8', colorCls:'tb-gray',
    desc:'Camada Silver — um registro por cliente, limpo e atualizado.',
    cols:9,
    fields:[
      {n:'id',          t:'STRING',    req:true,  d:'Código único do cliente'},
      {n:'brand_id',    t:'STRING',    req:true,  d:'⚠️ Marca do cliente — sempre filtre por aqui'},
      {n:'nome',        t:'STRING',    req:false, d:'Nome padronizado em Title Case'},
      {n:'email',       t:'STRING',    req:false, d:'Email em minúsculas e validado'},
      {n:'telefone',    t:'STRING',    req:false, d:'Telefone com máscara (XX) XXXXX-XXXX'},
      {n:'segmento',    t:'STRING',    req:false, d:'Segmento de mercado'},
      {n:'receita_anual',t:'DECIMAL',  req:false, d:'Receita como número com 2 casas decimais'},
      {n:'criado_em',   t:'DATE',      req:false, d:'Data de criação no formato ISO 8601'},
      {n:'_is_current', t:'BOOLEAN',   req:true,  d:'TRUE = registro mais recente do cliente'},
    ],
    getData: () => SILVER_DATA,
  },
  customers_clean: {
    label:'customers_clean', icon:'✅', color:'#7c3aed', colorCls:'tb-violet',
    desc:'Resultado do pipeline desta sessão — dados após as regras de limpeza.',
    cols:8,
    fields:[
      {n:'id',           t:'STRING',  req:true,  d:'Código único do cliente'},
      {n:'brand_id',     t:'STRING',  req:true,  d:'⚠️ Marca do cliente — sempre filtre por aqui'},
      {n:'nome',         t:'STRING',  req:false, d:'Nome padronizado'},
      {n:'email',        t:'STRING',  req:false, d:'Email normalizado'},
      {n:'telefone',     t:'STRING',  req:false, d:'Telefone com máscara'},
      {n:'segmento',     t:'STRING',  req:false, d:'Segmento de mercado'},
      {n:'receita_anual',t:'DECIMAL', req:false, d:'Receita decimal (2 casas)'},
      {n:'criado_em',    t:'DATE',    req:false, d:'Data ISO 8601'},
    ],
    getData: () => transformedData.length ? transformedData : RAW_DATA,
  },
};

// ═══════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════
let extractedData   = [...RAW_DATA];
let transformedData = [];
let activeTable     = null;
let activeBrand     = 'todas';
let lastRule        = null;

// ═══════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════
function maskPhone(t){
  const d=t.replace(/\D/g,'');
  if(d.length===11) return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
  if(d.length===10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  return t;
}
function parseReceita(v){
  if(!v||v.trim()==='') return '';
  const n=parseFloat(v.replace(/R\$\s*/,'').replace(/\./g,'').replace(',','.').trim());
  return isNaN(n)?'':n.toFixed(2);
}
function toIso(d){
  if(!d) return d;
  const m=d.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return m?`${m[3]}-${m[2]}-${m[1]}`:d;
}
function fmtMoney(v){
  const n=parseFloat(v);
  if(isNaN(n)) return v;
  return n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
}
function applyRules(data){
  const on=RULES.filter(r=>{ const el=document.getElementById('rule-'+r.id); return el&&el.checked; });
  return data.map(row=>{ let r={...row}; on.forEach(rule=>{r=rule.fn(r);}); return r; });
}

// ═══════════════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════════════
function goStep(n){
  document.querySelectorAll('[id^="step-"]').forEach((el,i)=>el.classList.toggle('hidden',i!==n));
  document.querySelectorAll('.tab-btn').forEach((el,i)=>el.classList.toggle('active',i===n));
  document.querySelectorAll('.mini-step').forEach((el,i)=>el.classList.toggle('active-mini',i===n));
  if(n===0) renderRawTable();
  if(n===2) initTransform();
  if(n===3) initBQ();
  window.scrollTo({top:document.getElementById('tab-nav').offsetTop-10,behavior:'smooth'});
}
window.goStep=goStep;

// ═══════════════════════════════════════════════
//  STEP 0 – SOURCE
// ═══════════════════════════════════════════════
function renderRawTable(){
  document.getElementById('raw-body').innerHTML=RAW_DATA.map(r=>{
    const iss=r.issues||[];
    return `<tr class="${r.dirty?'dirty':''}">
      <td>${r.id}</td>
      <td><span class="tb tb-gray">${r.brand_id}</span></td>
      <td class="${iss.includes('nome_lower')||iss.includes('nome_upper')?'err-cell':''}">${r.nome}</td>
      <td class="${iss.includes('email_case')||iss.includes('email_invalid')?'err-cell':''}">${r.email}</td>
      <td class="${iss.includes('tel_mask')?'err-cell':''}">${r.telefone}</td>
      <td>${r.segmento}</td>
      <td class="${iss.includes('receita_null')?'err-cell':''}">${r.receita_anual||'<em style="opacity:.4">NULL</em>'}</td>
      <td class="${iss.includes('data_fmt')?'err-cell':''}">${r.criado_em}</td>
    </tr>`;
  }).join('');
}

// ═══════════════════════════════════════════════
//  STEP 1 – EXTRACT
// ═══════════════════════════════════════════════
function runExtract(){
  const anim=document.getElementById('extract-run-anim');
  const btn=document.getElementById('btn-run-extract');
  anim.classList.remove('hidden'); btn.disabled=true; btn.textContent='Extraindo…';

  setTimeout(()=>{
    anim.classList.add('hidden'); btn.disabled=false; btn.textContent='▶ Executar extração';
    const n=parseInt(document.getElementById('rec-count').value);
    const dirty=RAW_DATA.filter(r=>r.dirty).length, ok=RAW_DATA.length-dirty;
    const total=n<=8?RAW_DATA.length:n;
    document.getElementById('sb-total').querySelector('.stat-val').textContent=total;
    document.getElementById('sb-ok').querySelector('.stat-val').textContent=n<=8?ok:Math.round(n*(ok/RAW_DATA.length));
    document.getElementById('sb-err').querySelector('.stat-val').textContent=n<=8?dirty:Math.round(n*(dirty/RAW_DATA.length));

    const src=document.getElementById('source-type').value;
    const tbl=document.getElementById('source-table').value;
    document.getElementById('extract-log').innerHTML=[
      `<span class="log-ok">✓  Conectando a ${src}…</span>`,
      `<span class="log-ok">✓  Autenticação realizada</span>`,
      `<span class="log-ok">✓  Lendo "${tbl}"</span>`,
      `<span class="log-ok">✓  ${total} registros lidos</span>`,
      `<span class="log-warn">⚠  ${dirty} registros com inconsistências de schema</span>`,
      `<span class="log-ok">✓  Extração concluída em 1.3s</span>`,
    ].join('<br>');
    document.getElementById('schema-log').innerHTML=[
      '<span class="log-ok">id              STRING      ✓</span>',
      '<span class="log-ok">brand_id        STRING      ✓</span>',
      '<span class="log-ok">nome            STRING      ✓</span>',
      '<span class="log-ok">email           STRING      ✓</span>',
      '<span class="log-ok">telefone        STRING      ✓</span>',
      '<span class="log-ok">segmento        STRING      ✓</span>',
      '<span class="log-warn">receita_anual   STRING      ⚠ esperado: DECIMAL</span>',
      '<span class="log-warn">criado_em       STRING      ⚠ esperado: DATE</span>',
    ].join('<br>');
    extractedData=[...RAW_DATA];
    document.getElementById('btn-go-transform').classList.remove('hidden');
  },1400);
}
window.runExtract=runExtract;

// ═══════════════════════════════════════════════
//  STEP 2 – TRANSFORM
// ═══════════════════════════════════════════════
function initTransform(){
  if(document.getElementById('rules-list').children.length===0) buildRules();
  renderSqlx(); updatePreview();
}

function buildRules(){
  document.getElementById('rules-list').innerHTML=RULES.map(r=>`
    <label class="rule-item on" id="rulerow-${r.id}">
      <input type="checkbox" id="rule-${r.id}" checked onchange="onRule('${r.id}')">
      <div class="rule-info">
        <div class="rule-name">${r.label}</div>
        <div class="rule-hint">${r.hint}</div>
      </div>
      <span class="rule-badge ${r.bc}">${r.badge}</span>
    </label>`).join('');
}
window.buildRules=buildRules;

function onRule(id){
  lastRule=id;
  const cb=document.getElementById('rule-'+id);
  document.getElementById('rulerow-'+id).classList.toggle('on',cb.checked);
  updatePreview(); renderSqlx();
  const st=document.getElementById('sqlx-status');
  st.className='sqlx-status run'; st.textContent='● SQLX atualizado — pronto para compilar';
}
window.onRule=onRule;

function updatePreview(){
  const cols=['brand_id','nome','email','telefone','receita_anual','criado_em'];
  const tf=applyRules(extractedData);
  const head=`<tr>${cols.map(c=>`<th>${c}</th>`).join('')}</tr>`;
  const rows=d=>d.map(r=>`<tr>${cols.map(c=>`<td>${r[c]!==undefined&&r[c]!==''?r[c]:'<em style="opacity:.4">NULL</em>'}</td>`).join('')}</tr>`).join('');
  document.getElementById('tf-before').innerHTML=head+rows(extractedData);
  document.getElementById('tf-after').innerHTML=head+rows(tf);
  transformedData=tf;
}

function renderSqlx(){
  const on=id=>{ const el=document.getElementById('rule-'+id); return el&&el.checked; };
  const hi=id=>lastRule===id?' hi':'';

  const cols=[];
  cols.push('  id,\n  brand_id,');

  cols.push(on('nome_title')
    ? `  <span class="fn${hi('nome_title')}">INITCAP</span>(nome) <span class="kw">AS</span> nome,`
    : `  nome, <span class="cm">-- sem padronização</span>`);

  let emailExpr='email';
  if(on('email_lower')) emailExpr=`<span class="fn${hi('email_lower')}">LOWER</span>(email)`;
  if(on('email_valid')){
    const h=hi('email_valid');
    emailExpr=`<span class="kw${h}">CASE</span> <span class="kw">WHEN</span> email <span class="kw">NOT LIKE</span> <span class="sv">'%@%'</span>\n       <span class="kw">THEN</span> <span class="sv">'[INVÁLIDO]'</span>\n       <span class="kw">ELSE</span> ${on('email_lower')?`<span class="fn">LOWER</span>(email)`:'email'} <span class="kw">END</span>`;
  }
  cols.push(`  ${emailExpr} <span class="kw">AS</span> email,`);

  cols.push(on('tel_mask')
    ? `  <span class="fn${hi('tel_mask')}">REGEXP_REPLACE</span>(telefone, <span class="sv">r'(\\d{2})(\\d{5})(\\d{4})'</span>, <span class="sv">'(\\1) \\2-\\3'</span>) <span class="kw">AS</span> telefone,`
    : `  telefone, <span class="cm">-- sem máscara</span>`);

  cols.push('  segmento,');

  let recExpr='receita_anual';
  if(on('receita_num')) recExpr=`<span class="fn${hi('receita_num')}">ROUND</span>(<span class="fn">SAFE_CAST</span>(<span class="fn">REGEXP_REPLACE</span>(receita_anual, <span class="sv">r'[R$\\s.]'</span>, <span class="sv">''</span>) <span class="kw">AS</span> FLOAT64), <span class="nm">2</span>)`;
  if(on('receita_null')) recExpr=`<span class="fn${hi('receita_null')}">COALESCE</span>(${recExpr}, <span class="nm">0.00</span>)`;
  cols.push(`  ${recExpr} <span class="kw">AS</span> receita_anual,`);

  cols.push(on('data_iso')
    ? `  <span class="fn${hi('data_iso')}">PARSE_DATE</span>(<span class="sv">'%d/%m/%Y'</span>, criado_em) <span class="kw">AS</span> criado_em`
    : `  criado_em <span class="cm">-- sem conversão de data</span>`);

  const src=`<span class="cf">config</span> <span class="tk">{</span>
  <span class="cf">type</span>: <span class="vl">"table"</span>,
  <span class="cf">schema</span>: <span class="vl">"dito_cdp"</span>,
  <span class="cf">tags</span>: [<span class="vl">"silver"</span>, <span class="vl">"customers"</span>],
<span class="tk">}</span>

<span class="kw">SELECT</span>
${cols.join('\n')}

<span class="kw">FROM</span> <span class="fn">\${ref('raw_source')}</span>`;

  const compiled=`<span class="cm">-- SQL gerado pelo Dataform Core 3.0.4</span>
<span class="kw">CREATE OR REPLACE TABLE</span> <span class="fn">\`dito-cdp.dito_cdp.customers_clean\`</span> <span class="kw">AS</span>
<span class="kw">SELECT</span>
${cols.join('\n')}
<span class="kw">FROM</span> <span class="fn">\`dito-cdp.dito_cdp.raw_source\`</span>`;

  document.getElementById('sqlx-src').innerHTML=src;
  document.getElementById('sqlx-compiled').innerHTML=compiled;
}

function switchSqlTab(t){
  document.getElementById('stab-src').classList.toggle('active',t==='src');
  document.getElementById('stab-compiled').classList.toggle('active',t==='compiled');
  document.getElementById('sqlx-src').classList.toggle('hidden',t!=='src');
  document.getElementById('sqlx-compiled').classList.toggle('hidden',t!=='compiled');
}
window.switchSqlTab=switchSqlTab;

function compileSqlx(){
  const st=document.getElementById('sqlx-status');
  st.className='sqlx-status run'; st.textContent='⚙ Compilando…';
  setTimeout(()=>{ st.className='sqlx-status ok'; st.textContent='✓ Compilado — sem erros'; switchSqlTab('compiled'); },700);
}
window.compileSqlx=compileSqlx;

function runSqlx(){
  const st=document.getElementById('sqlx-status');
  st.className='sqlx-status run'; st.textContent='▶ Executando no BigQuery…';
  transformedData=applyRules(extractedData);
  setTimeout(()=>{ st.className='sqlx-status ok'; st.textContent=`✓ ${transformedData.length} linhas escritas em ${(Math.random()*1.2+0.4).toFixed(2)}s`; },1100);
}
window.runSqlx=runSqlx;

function applyAndGoToBQ(){
  transformedData=applyRules(extractedData);
  goStep(3);
}
window.applyAndGoToBQ=applyAndGoToBQ;

// ═══════════════════════════════════════════════
//  STEP 3 – BIGQUERY
// ═══════════════════════════════════════════════
function initBQ(){
  const n=parseInt(document.getElementById('rec-count').value);
  document.getElementById('bq-stat-rows').textContent=n<=8?transformedData.length||RAW_DATA.length:n;
  document.getElementById('bq-stat-cols').textContent='—';
  document.getElementById('bq-stat-time').textContent=(Math.random()*1.4+0.4).toFixed(2)+'s';
  activeTable=null; activeBrand='todas';
  document.getElementById('bq-empty').classList.remove('hidden');
  document.getElementById('bq-content').classList.add('hidden');
  document.querySelectorAll('.bq-table-btn').forEach(el=>el.classList.remove('active'));
  document.querySelectorAll('.brand-pill').forEach(el=>el.classList.toggle('active',el.dataset.brand==='todas'));
}

function selectBqTable(key){
  activeTable=key;
  const s=SCHEMAS[key];
  document.getElementById('bq-stat-cols').textContent=s.cols;
  document.querySelectorAll('.bq-table-btn').forEach(el=>el.classList.remove('active'));
  document.getElementById('bqt-'+{raw_historical:'raw',silver_customers:'silver',customers_clean:'clean'}[key])?.classList.add('active');
  document.getElementById('bq-empty').classList.add('hidden');
  document.getElementById('bq-content').classList.remove('hidden');

  // table header
  document.getElementById('bq-table-header').innerHTML=`
    <div style="display:flex;align-items:center;gap:10px">
      <span style="font-size:22px">${s.icon}</span>
      <div>
        <div style="font-family:var(--font-mono);font-size:14px;font-weight:600;color:${s.color}">${s.label}</div>
        <div style="font-size:12px;color:var(--txt-3);margin-top:2px">${s.desc}</div>
      </div>
    </div>`;

  // schema
  document.getElementById('bq-schema-body').innerHTML=s.fields.map(f=>`
    <tr>
      <td><strong${f.n==='brand_id'?' style="color:var(--amber)"':''}>${f.n}</strong></td>
      <td><span class="tb ${s.colorCls}" style="font-size:9px">${f.t}</span></td>
      <td><span class="tb ${f.req?'tb-rose':'tb-teal'}" style="font-size:9px">${f.req?'Sim':'Não'}</span></td>
      <td>${f.d}</td>
    </tr>`).join('');

  switchBqTab('schema');
  document.getElementById('bq-query').value=
    `SELECT *\nFROM \`dito-cdp.dito_cdp.${key}\`\nWHERE brand_id = 'marca-alpha'\n  AND _is_current = TRUE\nLIMIT 100;`;
}
window.selectBqTable=selectBqTable;

function switchBqTab(t){
  document.getElementById('bqtab-schema').classList.toggle('active',t==='schema');
  document.getElementById('bqtab-query').classList.toggle('active',t==='query');
  document.getElementById('bq-tab-schema').classList.toggle('hidden',t!=='schema');
  document.getElementById('bq-tab-query').classList.toggle('hidden',t!=='query');
}
window.switchBqTab=switchBqTab;

function pickBrand(el,brand){
  activeBrand=brand;
  document.querySelectorAll('.brand-pill').forEach(p=>p.classList.toggle('active',p===el));
  if(!activeTable) return;
  const ref=`\`dito-cdp.dito_cdp.${activeTable}\``;
  document.getElementById('bq-query').value=brand==='todas'
    ? `SELECT *\nFROM ${ref}\nLIMIT 100;`
    : `SELECT *\nFROM ${ref}\nWHERE brand_id = '${brand}'\n  AND _is_current = TRUE\nLIMIT 100;`;
}
window.pickBrand=pickBrand;

function copyBrandSnippet(){
  const s=`WHERE brand_id = '{{brand_id}}'\n  AND _is_current = TRUE`;
  navigator.clipboard?.writeText(s).catch(()=>{});
  const el=document.querySelector('.ft-code');
  if(el){ el.textContent='✓ Copiado!'; setTimeout(()=>el.textContent=s,1300); }
}
window.copyBrandSnippet=copyBrandSnippet;

const QUERIES={
  all:    ()=>`SELECT *\nFROM \`dito-cdp.dito_cdp.${activeTable}\`\nLIMIT 100;`,
  brand:  ()=>`SELECT *\nFROM \`dito-cdp.dito_cdp.${activeTable}\`\nWHERE brand_id = 'marca-alpha'\n  AND _is_current = TRUE\nLIMIT 100;`,
  seg:    ()=>`SELECT brand_id, segmento,\n  COUNT(*) AS clientes,\n  SUM(CAST(receita_anual AS DECIMAL)) AS receita_total\nFROM \`dito-cdp.dito_cdp.${activeTable}\`\nWHERE brand_id = 'marca-alpha'\nGROUP BY 1, 2\nORDER BY receita_total DESC;`,
  revenue:()=>`SELECT id, nome, segmento,\n  CAST(receita_anual AS DECIMAL) AS receita\nFROM \`dito-cdp.dito_cdp.${activeTable}\`\nWHERE brand_id = 'marca-alpha'\nORDER BY receita DESC\nLIMIT 5;`,
  issues: ()=>`SELECT *\nFROM \`dito-cdp.dito_cdp.${activeTable}\`\nWHERE brand_id = 'marca-alpha'\n  AND (email = '[INVÁLIDO]'\n    OR receita_anual IS NULL\n    OR receita_anual = '');`,
};

function setQuery(k){
  switchBqTab('query');
  if(!activeTable){ alert('Selecione uma tabela primeiro.'); return; }
  document.getElementById('bq-query').value=QUERIES[k]();
}
window.setQuery=setQuery;

function runQuery(){
  if(!activeTable) return;
  switchBqTab('query');
  const schema=SCHEMAS[activeTable];
  let data=schema.getData();
  const q=document.getElementById('bq-query').value.toLowerCase();
  const bm=q.match(/brand_id\s*=\s*'([^']+)'/);
  if(bm) data=data.filter(r=>r.brand_id===bm[1]);

  let cols, rows;
  if(q.includes('group by')&&q.includes('segmento')){
    cols=['brand_id','segmento','clientes','receita_total'];
    const g={};
    data.forEach(r=>{ const k=`${r.brand_id}|${r.segmento}`; if(!g[k]) g[k]={brand_id:r.brand_id,segmento:r.segmento,n:0,rev:0}; g[k].n++; g[k].rev+=parseFloat(r.receita_anual)||0; });
    rows=Object.values(g).sort((a,b)=>b.rev-a.rev).map(v=>[v.brand_id,v.segmento,v.n,fmtMoney(v.rev.toFixed(2))]);
  } else if(q.includes('order by receita')){
    cols=['id','nome','segmento','receita'];
    rows=[...data].filter(r=>r.receita_anual).sort((a,b)=>(parseFloat(b.receita_anual)||0)-(parseFloat(a.receita_anual)||0)).slice(0,5).map(r=>[r.id,r.nome,r.segmento,fmtMoney(r.receita_anual)]);
  } else if(q.includes('email')&&q.includes('inválido')){
    cols=['id','brand_id','nome','email','receita_anual'];
    rows=data.filter(r=>r.email==='[INVÁLIDO]'||!r.receita_anual||r.receita_anual==='').map(r=>[r.id,r.brand_id,r.nome,r.email,r.receita_anual||'NULL']);
  } else {
    cols=schema.fields.map(f=>f.n);
    rows=data.slice(0,100).map(r=>cols.map(c=>{
      const v=r[c];
      if(v===undefined||v===null||v==='') return 'NULL';
      if(schema.fields.find(f=>f.n===c&&f.t==='DECIMAL')) return fmtMoney(v);
      if(typeof v==='boolean') return v?'TRUE':'FALSE';
      return String(v);
    }));
  }

  const wrap=document.getElementById('bq-result-wrap');
  document.getElementById('bq-result-head').innerHTML=`<tr>${cols.map(c=>`<th${c==='brand_id'?' style="color:var(--amber)"':''}>${c}</th>`).join('')}</tr>`;
  document.getElementById('bq-result-body').innerHTML=rows.map(r=>`<tr>${r.map((v,i)=>`<td${cols[i]==='brand_id'?' style="color:var(--amber);font-weight:600"':''}>${v}</td>`).join('')}</tr>`).join('');
  document.getElementById('bq-result-meta').textContent=`${rows.length} linha(s)${bm?` · marca: ${bm[1]}`:''}`;
  wrap.style.display='block';
}
window.runQuery=runQuery;

// ═══════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════
renderRawTable();