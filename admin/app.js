const icons = {
  inbox: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 13h5l2 3h4l2-3h5"/>',
  calculator: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M9 11h.01M15 11h.01M9 15h.01M15 15h.01M9 18h.01M15 18h.01"/>',
  factory: '<path d="M3 21V9l6 4V9l6 4V4h4l2 6v11zM7 17h1m4 0h1m4 0h1"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  price: '<path d="M20.5 13 12 21 3 12V3h9z"/><circle cx="7.5" cy="7.5" r="1"/>',
  wallet: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M21 10h-5a2 2 0 0 0 0 4h5m-5-2h.01"/>',
  history: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="10.8" cy="10.8" r="6"/><path d="m15.5 15.5 4 4"/>',
  arrow: '<path d="M5 12h14m-6-6l6 6-6 6"/>',
  back: '<path d="M19 12H5m6-6-6 6 6 6"/>',
  file: '<path d="M5 3h9l5 5v13H5zM14 3v6h5m-11 4h8m-8 4h8"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5m4-5v5"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
};

const stages = {
  new: ['Новая', 'wine'],
  clarify: ['Уточнение', 'amber'],
  measure: ['На замер', 'info'],
  agreed: ['Согласована', 'green'],
  production: ['В производстве', 'info'],
  complete: ['Завершена', 'green'],
};

const taskStages = {
  queued: ['К запуску', 'wine'],
  making: ['Изготовление', 'info'],
  installing: ['Монтаж', 'amber'],
  done: ['Завершено', 'green'],
};

const staff = { elena: 'Елена Орлова', maxim: 'Максим Соколов', anna: 'Анна Волкова' };
const seedDate = '2026-11-15';
const activeRegion = 'Москва и область';
const roleLabels = {
  leadership: ['Руководитель', 'АВ', 'anna'],
  manager: ['Менеджер', 'ЕО', 'elena'],
  catalog: ['Администратор каталога', 'ЕО', 'elena'],
  accounting: ['Бухгалтерия', 'АВ', 'anna'],
};

const navigation = [
  ['Продажи', [
    ['leads', 'Заявки', 'inbox', ['leadership', 'manager']],
    ['quotes', 'Расчёты', 'calculator', ['leadership', 'manager']],
  ]],
  ['Исполнение', [
    ['production', 'Производство', 'factory', ['leadership', 'manager']],
    ['finance', 'Оплаты и расходы', 'wallet', ['leadership', 'accounting']],
  ]],
  ['Настройка', [
    ['catalog', 'Каталог', 'layers', ['leadership', 'catalog']],
    ['prices', 'Прайсы', 'price', ['leadership', 'catalog']],
    ['audit', 'Журнал изменений', 'history', ['leadership', 'catalog']],
  ]],
];

const leadSamples = [
  ['142', 'Мария Соколова', 'Столешница для кухни', 'a101', 'new', 'elena', '14:24', 48180, 'Корзина витрины', 'Связаться и уточнить размеры'],
  ['141', 'Алексей Миронов', 'Столешница с вырезом', 'a205', 'clarify', 'maxim', '13:58', 57600, 'Запрос спецификации', 'Уточнить модель мойки'],
  ['140', 'Ксения Лебедева', 'Столешница для кухни', 'a101', 'measure', 'elena', '13:42', 56940, 'Корзина витрины', 'Подтвердить время замера'],
  ['139', 'Дмитрий Васильев', 'Расчёт по чертежу', 'a205', 'new', 'elena', '13:10', 44100, 'Расчёт по чертежу', 'Проверить размеры по чертежу'],
  ['138', 'Ольга Никифорова', 'Угловая столешница', 'a101', 'agreed', 'maxim', '12:36', 65610, 'Корпоративная почта', 'Подготовить производственное задание'],
  ['137', 'Ирина Власова', 'Столешница на заказ', 'a101', 'production', 'elena', '11:20', 57085, 'Корзина витрины', 'Проверить готовность изделия'],
  ['136', 'Артём Крылов', 'Столешница на заказ', 'a205', 'new', 'maxim', '10:48', 51450, 'Обращение по телефону', 'Уточнить декор'],
  ['135', 'Наталья Белова', 'Столешница для кухни', 'a101', 'complete', 'elena', '10:06', 42500, 'Корзина витрины', 'Заказ закрыт'],
];

const seed = {
  leads: leadSamples.map(([id, name, title, decor, stage, owner, time, estimate, source, next]) => ({
    id, name, title, decor, stage, owner, time, estimate, source, next,
    phone: '+7 900 000-0' + id.slice(-3, -2) + '-' + id.slice(-2),
    area: +(estimate / (decor === 'a101' ? 21900 : 24500)).toFixed(2),
    note: id === '142' ? 'Уточнить длину и глубину. Клиент выбрал светлый декор и попросил согласовать время звонка.' : '',
    history: [{ time, title: 'Заявка получена', text: source }],
  })),
  decors: [
    { id: 'a101', brand: 'Acrylica', series: 'Классика', code: 'A101', color: 'Белый снег', chip: 'a101s', rate: 21900 },
    { id: 'a205', brand: 'Acrylica', series: 'Классика', code: 'A205', color: 'Графит', chip: 'a205s', rate: 24500 },
  ],
  products: [
    { id: 'st-a101', name: 'Кухонная столешница', sku: 'ST-A101', decor: 'a101', state: 'live', order: 1, image: 'countertop' },
    { id: 'st-a205', name: 'Кухонная столешница', sku: 'ST-A205', decor: 'a205', state: 'draft', order: 2, image: 'countertop' },
  ],
  quotes: [
    { id: '78', lead: '140', decor: 'a101', owner: 'elena', length: 2600, depth: 650, units: 1, edge: 'straight', cut: true, delivery: false, rate: 21900, priceVersion: 'v3', version: 1, parent: '', state: 'draft', time: '13:50', note: 'Размеры предварительные, уточнить на замере.' },
    { id: '77', lead: '138', decor: 'a101', owner: 'maxim', length: 3000, depth: 650, units: 1, edge: 'straight', cut: true, delivery: true, rate: 21900, priceVersion: 'v3', version: 1, parent: '', state: 'agreed', time: '12:36', note: 'Согласовано по итогам замера.' },
    { id: '76', lead: '137', decor: 'a101', owner: 'elena', length: 2800, depth: 650, units: 1, edge: 'radius', cut: true, delivery: true, rate: 21900, priceVersion: 'v2', version: 1, parent: '', state: 'agreed', time: '11:12', note: 'Комплектация передана на производство.' },
  ],
  tasks: [{
    id: '32', quote: '76', lead: '137', state: 'making', due: '2026-11-21',
    responsible: 'Мастер участка (демо)', dueConfirmed: true,
    drawing: 'Эскиз ST-137.pdf', materials: 18100, works: 9200, parts: 4000,
    note: 'Проверить кромку и место выреза по эскизу.',
  }],
  prices: {
    active: 'v3',
    versions: [{ id: 'v3', date: seedDate, source: 'Прайс LEVONI · акрил', active: true }, { id: 'v2', date: '2026-11-12', source: 'Прайс LEVONI · акрил', active: false }],
    draft: null,
  },
  finance: [
    { id: '71', kind: 'income', lead: '137', amount: 30000, party: 'Ирина Власова', date: seedDate, note: 'Предоплата по заказу' },
    { id: '70', kind: 'expense', lead: '137', amount: 18100, party: 'Поставщик материала', date: seedDate, note: 'Акриловый камень по заданию №32' },
    { id: '69', kind: 'income', lead: '135', amount: 42500, party: 'Наталья Белова', date: '2026-11-14', note: 'Оплата по заказу' },
    { id: '68', kind: 'expense', lead: '135', amount: 13700, party: 'Производственный участок', date: '2026-11-14', note: 'Материал и комплектующие' },
  ],
  log: [
    { time: '13:50', title: 'Сохранён расчёт №78', detail: 'Прайс v3, заявка №140', actor: staff.elena },
    { time: '12:36', title: 'Согласован расчёт №77', detail: 'Заявка №138', actor: staff.maxim },
    { time: '11:20', title: 'Принято задание №32', detail: 'Собственное производство', actor: staff.elena },
  ],
};

const storageKey = 'levoni.admin.prototype.1';
function loadState() {
  try { return JSON.parse(localStorage.getItem(storageKey)) || structuredClone(seed); }
  catch { return structuredClone(seed); }
}

let state = loadState();
let role = 'leadership';
let stageFilter = 'all';
let financeFilter = 'all';
let selectedLead = '142';
let notificationTimer;
let lastRead = '';
let fieldSequence = 0;
const searchTerms = { leads: '', quotes: '', catalog: '' };
const workspace = document.querySelector('#workspace');
const sidebar = document.querySelector('#sidebar');
const dialog = document.querySelector('#dialog');
const notice = document.querySelector('#notification');

const esc = value => String(value ?? '').replace(/[&<>"']/g, character =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
const time = () => new Intl.DateTimeFormat('ru-RU', { timeZone: 'Europe/Moscow', hour: '2-digit', minute: '2-digit' }).format(new Date());
const currency = value => `${Math.round(value).toLocaleString('ru-RU')} ₽`;
const number = value => value.toLocaleString('ru-RU', { maximumFractionDigits: 3 });
const dateLabel = value => value.split('-').reverse().join('.');
const initials = name => name.split(' ').slice(0,2).map(part => part[0]).join('');
const person = id => staff[id] || 'Не назначен';
const actor = () => person(roleLabels[role][2]);
const canManageLead = item => Boolean(item && (role === 'leadership' || role === 'manager' && item.owner === roleLabels[role][2]));
const visibleLeads = () => state.leads.filter(canManageLead);
const nextId = (entries, start) => String(Math.max(start, ...entries.map(entry => Number(entry.id))) + 1);
const decorOf = id => state.decors.find(item => item.id === id);
const leadOf = id => state.leads.find(item => item.id === id);
const quoteOf = id => state.quotes.find(item => item.id === id);
const priceDate = quote => state.prices.versions.find(item => item.id === quote.priceVersion)?.date;
const priceLabel = quote => quote.priceVersion + (priceDate(quote) ? ' от ' + dateLabel(priceDate(quote)) : ' · дата не указана');
const hasDimensions = quote => quote.length >= 100 && quote.length <= 6000 && quote.depth >= 100 && quote.depth <= 2000 && Number.isInteger(Number(quote.units)) && quote.units >= 1 && quote.units <= 12;
const quoteAmount = quote => quoteReady(quote) ? currency(totals(quote).total) : 'Нужны параметры';
const productImage = decor => state.products.find(item => item.decor === decor)?.image || 'countertop';
const can = section => navigation.flatMap(([, links]) => links).some(([id,,, roles]) => id === section && roles.includes(role));
const mainSection = view => ({ lead: 'leads', quote: 'quotes', task: 'production', product: 'catalog', import: 'prices' })[view] || view;
const sectionName = section => navigation.flatMap(([, links]) => links).find(([id]) => id === section)?.[1] || 'Админка';

function save() {
  try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* The open prototype can continue in memory. */ }
}

function addLog(title, detail) {
  state.log.unshift({ time: time(), title, detail, actor: actor() });
  save();
}

function message(text) {
  clearTimeout(notificationTimer);
  notice.textContent = text;
  notificationTimer = setTimeout(() => { notice.textContent = ''; }, 3300);
}

function navigate(path) {
  const next = '#' + path;
  if (location.hash === next) render(true);
  else location.hash = next;
}

function action(label, command, { id = '', style = '', glyph = '', extra = '' } = {}) {
  return `<button class="btn ${style}" type="button" data-action="${command}"${id ? ` data-id="${esc(id)}"` : ''} ${extra}>${glyph ? icon(glyph) : ''}${esc(label)}</button>`;
}

const badge = (label, tone = '') => `<span class="badge ${tone}">${esc(label)}</span>`;
const back = (section, label = sectionName(section)) => `<a class="back-link" href="#${section}">${icon('back')}${esc(label)}</a>`;
function field(label, control) {
  const id = 'field-' + ++fieldSequence;
  const linked = control.replace(/^<(input|select|textarea)\b/, tag => `${tag} id="${id}"`);
  return `<div class="field"><label for="${id}">${esc(label)}</label>${linked}</div>`;
}
const options = (entries, selected) => entries.map(([value, label]) => `<option value="${esc(value)}"${value === selected ? ' selected' : ''}>${esc(label)}</option>`).join('');
const search = (section, label, placeholder) => `<label class="search">${icon('search')}<span class="sr-only">${esc(label)}</span><input type="search" data-query="${section}" placeholder="${esc(placeholder)}" value="${esc(searchTerms[section])}"></label>`;
const section = (title, body, controls = '') => `<section class="panel"><div class="panel-head"><h2>${esc(title)}</h2>${controls}</div><div class="panel-body">${body}</div></section>`;
const statBar = (values, css = '') => `<div class="stats ${values.length === 3 ? 'three' : ''} ${css}">${values.map(([label, value, accent]) => `<div class="stat ${accent ? 'accent' : ''}"><strong class="stat-value numeric">${esc(value)}</strong><span class="stat-label">${esc(label)}</span></div>`).join('')}</div>`;
const facts = entries => `<dl class="facts">${entries.map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl>`;
const table = (headers, rows, extra = '') => `<div class="table-wrap"><table class="data-table responsive ${extra}"><thead><tr>${headers.map(heading => `<th scope="col">${esc(heading)}</th>`).join('')}</tr></thead><tbody>${rows || `<tr><td colspan="${headers.length}"><p class="empty">По этим условиям ничего не найдено.</p></td></tr>`}</tbody></table></div>`;
const cell = (html, label = '', css = '') => `<td${label ? ` data-mobile="${esc(label)}"` : ''}${css ? ` class="${css}"` : ''}>${html}</td>`;
const headline = (title, description, controls = '', status = '') => `<div class="page-head"><div><div class="page-title-line"><h1>${esc(title)}</h1>${status}</div><p>${esc(description)}</p></div>${controls ? `<div class="actions">${controls}</div>` : ''}</div>`;
const record = (title, sub, leading = '', attrs = '') => `<span class="record" ${attrs}>${leading}<span><strong>${esc(title)}</strong><span class="secondary-line">${esc(sub)}</span></span></span>`;
const recordLink = (title, sub, href, leading = '') => `<a class="record" href="#${href}">${leading}<span><strong>${esc(title)}</strong><span class="secondary-line">${esc(sub)}</span></span></a>`;
const image = (file, css = 'thumb') => `<img class="${css}" src="assets/${file}.webp" alt="">`;
const tab = (label, command, id, current) => `<button type="button" data-action="${command}" data-id="${id}" aria-pressed="${id === current}">${esc(label)}</button>`;
const rowMoney = (label, value, total = false) => `<div class="money-line ${total ? 'total' : ''}"><span>${esc(label)}</span><strong class="numeric nowrap">${currency(value)}</strong></div>`;

function renderNavigation(current) {
  document.querySelector('#navigation').innerHTML = navigation.map(([group, links]) => {
    const visible = links.filter(([, , , roles]) => roles.includes(role));
    return visible.length ? `<div class="nav-group"><p class="nav-label">${group}</p>${visible.map(([id, label, glyph]) =>
      `<a class="nav-link" href="#${id}"${id === current ? ' aria-current="page"' : ''}>${icon(glyph)}${label}</a>`).join('')}</div>` : '';
  }).join('');
}

function filteredLeads() {
  const query = searchTerms.leads.trim().toLowerCase();
  return visibleLeads().filter(item => {
    const visible = { all: true, attention: ['new', 'clarify'].includes(item.stage), measure: item.stage === 'measure' }[stageFilter];
    const searchable = `${item.id} ${item.name} ${item.title} ${item.phone}`.toLowerCase();
    return visible && searchable.includes(query);
  });
}

function leadPreview(item) {
  if (!item) return '<div class="panel-body"><p class="empty">Измените фильтр, чтобы открыть заявку.</p></div>';
  const decor = decorOf(item.decor);
  return `<div class="inspector-heading"><p>Заявка №${esc(item.id)}</p>${badge(...stages[item.stage])}</div>
  <div class="panel-body">
    <div><h2 class="name">${esc(item.name)}</h2><p class="secondary-line">${esc(item.source)}</p>
      <div class="product-teaser">${image(productImage(item.decor))}<div><strong>${esc(item.title)}</strong><p class="secondary-line">${esc(decor.brand + ' ' + decor.code + ' «' + decor.color + '»')}</p></div></div>
    </div>
    <div>${facts([['Регион', activeRegion], ['Расчёт на витрине', cartOf(item) ? currency(item.estimate) : 'Нет расчёта'], ['Ответственный', person(item.owner)]])}
      <div class="next-step"><p class="secondary-line">Следующий шаг</p><strong>${esc(item.next)}</strong></div>
    </div>
    <div class="actions"><a class="btn primary full" href="#lead/${item.id}">Открыть заявку ${icon('arrow')}</a></div>
  </div>`;
}

function leadRows(entries) {
  const rows = entries.map(item => `<tr${selectedLead === item.id ? ' class="selected"' : ''}>
    ${cell(`<button type="button" class="record" data-action="select-lead" data-id="${item.id}" aria-pressed="${selectedLead === item.id}">
      <span class="initial" aria-hidden="true">${esc(initials(item.name))}</span><span><strong>${esc(item.title)}</strong><span class="secondary-line">№${item.id} · ${esc(item.name)}</span></span></button>`)}
    ${cell(badge(...stages[item.stage]), 'Статус')}
    ${cell(esc(person(item.owner)), 'Ответственный')}
    ${cell(esc(item.time), 'Обновлено', 'nowrap numeric')}
  </tr>`).join('');
  return table(['Заявка', 'Статус', 'Ответственный', 'Обновлено'], rows, 'queue-table') + `<div class="table-end">Показано ${entries.length} из ${visibleLeads().length}</div>`;
}

function showQueue() {
  const entries = filteredLeads();
  const selected = entries.find(item => item.id === selectedLead) || entries[0];
  selectedLead = selected?.id || '';
  document.querySelector('#queue-rows').innerHTML = leadRows(entries);
  document.querySelector('#inspector').innerHTML = leadPreview(selected);
}

function leadsView() {
  const leads = visibleLeads();
  const totals = [
    ['Все заявки', leads.length],
    ['Новые', leads.filter(item => item.stage === 'new').length, true],
    ['На замер', leads.filter(item => item.stage === 'measure').length],
    ['В производстве', leads.filter(item => item.stage === 'production').length],
  ];
  return headline('Заявки', 'Обращения с витрины, из корпоративной почты и по телефону.', action('Новая заявка', 'new-lead', { style: 'primary', glyph: 'plus' })) +
    statBar(totals) +
    `<div class="queue">
      <section class="panel" aria-label="Очередь заявок">
        <div class="toolbar"><div class="tabs" aria-label="Фильтр заявок">
          ${[['all', 'Все'], ['attention', 'Требуют внимания'], ['measure', 'На замер']].map(([id, label]) => tab(label, 'filter-leads', id, stageFilter)).join('')}
        </div>${search('leads', 'Поиск заявок', 'Номер, имя, телефон')}</div>
        <div id="queue-rows"></div>
      </section>
      <aside class="inspector panel" id="inspector" aria-label="Выбранная заявка" aria-live="polite"></aside>
    </div>`;
}

function leadView(item) {
  if (!canManageLead(item)) return missing('leads');
  const decor = decorOf(item.decor);
  const existing = state.quotes.filter(quote => quote.lead === item.id);
  const currentQuote = existing[0];
  const details = facts([['Статус', stages[item.stage][0]], ['Ответственный', person(item.owner)], ['Регион', activeRegion], ['Канал', item.source], ['Телефон', item.phone]]);
  const history = `<ol class="timeline">${item.history.map(entry => `<li><span class="timeline-time">${esc(entry.time)}</span><h3>${esc(entry.title)}</h3><p>${esc(entry.text)}</p></li>`).join('')}</ol>`;
  const configuration = `<div class="product-teaser">${image(productImage(item.decor))}<div><strong>${esc(item.title)}</strong>
    <p class="secondary-line">${esc(colorLabel(decor))}</p></div></div>
    ${cartOf(item) ? facts(cartFacts(item)) : '<p class="secondary-line">Нет расчёта с витрины. Менеджер заполняет параметры вручную.</p>'}
    ${item.note ? `<p class="notice">${esc(item.note)}</p>` : ''}`;
  const contact = `${details}<div class="next-step"><p class="secondary-line">Следующий шаг</p><strong>${esc(item.next)}</strong></div>
    <div class="actions">${action('Изменить этап', 'edit-lead', { id: item.id, style: 'small' })}${role === 'leadership' ? action('Назначить', 'assign', { id: item.id, style: 'small' }) : ''}</div>`;
  return back('leads') + headline('Заявка №' + item.id, item.name,
    currentQuote ? `<a class="btn primary" href="#quote/${currentQuote.id}">Открыть расчёт</a>` :
      action('Создать расчёт', 'new-quote', { id: item.id, style: 'primary', glyph: 'plus' }),
    badge(...stages[item.stage])) +
    `<div class="detail-grid"><div class="stack">${section(cartOf(item) ? 'Конфигурация с витрины' : 'Исходные данные', configuration)}
      ${section('История общения', history, action('Записать контакт', 'contact', { id: item.id, style: 'small', glyph: 'plus' }))}
      ${existing.length ? section('Расчёты', existing.map(quote => `<div class="version"><a class="text-link" href="#quote/${quote.id}">№${quote.id} · вариант ${quote.version}</a><strong>${quoteAmount(quote)} ${staleQuote(quote) ? badge('Прайс устарел','wine') : ''}</strong></div>`).join('')) : ''}</div>
      <div class="stack">${section('Клиент и следующий шаг', contact)}</div></div>`;
}

function legacyTotals(quote) {
  const area = quote.length * quote.depth * quote.units / 1e6;
  const material = Math.round(area * quote.rate);
  const edge = quote.edge === 'radius' ? 1650 * quote.units : 0;
  const cut = quote.cut ? 3200 * quote.units : 0;
  const delivery = quote.delivery ? 2500 : 0;
  const installation = quote.installation ? Math.max(12000, Math.round((material + edge + cut) * .1)) : 0;
  return { area, material, edge, cut, delivery, installation, total: material + edge + cut + delivery + installation };
}

// Local demo dictionaries. A publication changes the common demo version, not an external price file.
const managerMaterials = { acrylic: 'Акриловый камень', quartz: 'Кварцевый агломерат' };
const managerRegions = { moscow: activeRegion, spb: 'Санкт-Петербург и область', kazan: 'Казань и область', nsk: 'Новосибирск и область' };
const processors = {
  own: { name: 'Собственное производство', material: 'acrylic', region: 'moscow', decors: ['a101', 'a205'], markup: 0, delivery: [2500, 4500], installPercent: 10, installMin: 12000, edges: ['basic', 'standard', 'classic'] },
  acrylicPartner: { name: 'Партнёр «Мастерская»', material: 'acrylic', region: 'moscow', decors: ['a205', 'a310'], markup: 1700, delivery: [3000, 5200], installFixed: 9500, edges: ['basic', 'classic'] },
  spb: { name: 'Партнёр «Север»', material: 'acrylic', region: 'spb', decors: ['a101', 'a310'], markup: 1400, delivery: [2800, 4900], installFixed: 9000, edges: ['basic', 'standard'] },
  nsk: { name: 'Демо-партнёр · Новосибирск', material: 'acrylic', region: 'nsk', decors: ['a101', 'a310'], markup: 900, delivery: [2300, 4300], installFixed: 9000, edges: ['basic', 'standard'] },
  quartzMoscow: { name: 'Партнёр «Кварц»', material: 'quartz', region: 'moscow', decors: ['q301', 'q302'], markup: 0, delivery: [3500, 6000], installPercent: 12, edges: ['basic', 'standard', 'classic'] },
  quartzKazan: { name: 'Партнёр «Камень»', material: 'quartz', region: 'kazan', decors: ['q301'], markup: 900, delivery: [3200, 4900], installFixed: 11000, edges: ['basic', 'classic'] },
};
const managerColorSamples = {
  a310: { code: 'A310', color: 'Тёплый песок', brand: 'Demo Surface', rate: 26900, slabs: ['3680 × 760 мм'] },
  q301: { code: 'Q301', color: 'Светлый кварц', brand: 'Demo Quartz', rate: 32500, slabs: ['3200 × 1600 мм', '3000 × 1400 мм'] },
  q302: { code: 'Q302', color: 'Серый кварц', brand: 'Demo Quartz', rate: 34800, slabs: ['3200 × 1600 мм'] },
};
const managerColor = id => managerColorSamples[id] || (decorOf(id) && { ...decorOf(id), slabs: ['3680 × 760 мм'] });
const managerEdges = { basic: ['Basic', 0], standard: ['Standard', 0], classic: ['Classic+', 1000], radius: ['Радиусная (из прежнего расчёта)', 1650] };
const managerSkirts = { none: ['Без бортика', 0], model1: ['Бортик №1', 1000], model2: ['Бортик №2', 1550] };
const skirtImages = { model1:'assets/manager-skirt-1.svg', model2:'assets/manager-skirt-2.svg' };
const availableSkirts = processor => ['none', 'model1', ...(['own','quartzMoscow'].includes(processor) ? ['model2'] : [])];
const managerSinks = { none: ['Без мойки', 0], integrated: ['Литая', 8500], under: ['Подстольная', 3200], top: ['Накладная', 1900] };
// A catalog code identifies one model; processor price rows control availability and rate.
const castSinkCatalog = {
  '813': { name:'Модель 813', image:'assets/sink-813.webp', drawing:'assets/sink-813-drawing.webp' }, '851': { name:'Модель 851' },
  '400': { name:'Модель 400' }, '813-n': { name:'Модель 813-Н' },
};
const demoCastRates = {
  own: { '813':8500, '851':9200, '400':7900 }, acrylicPartner: { '851':9800 },
  spb: { '400':8800 }, nsk: { '813-n':8900 },
};
const deliveryNames = {
  moscow: ['по Москве', 'по Московской области'], spb: ['по Санкт-Петербургу', 'по Ленинградской области'],
  kazan: ['по Казани', 'по Республике Татарстан'], nsk: ['по Новосибирску', 'по Новосибирской области'],
};
const deliveriesFor = region => ({ none:'Без доставки', city:`Доставка ${deliveryNames[region][0]}`, region:`Доставка ${deliveryNames[region][1]}` });
const priceVersionOf = id => state.prices.versions.find(version => version.id === id);
const castPriceList = version => priceVersionOf(version)?.castRates ?? demoCastRates;
const castRatesFor = (quote, q = quote.config) => (quote.castRates ?? castPriceList(quote.priceVersion))[q.processor] || {};
const sinkRate = (quote, type = quote.config.sink) => type === 'integrated'
  ? (castRatesFor(quote)[quote.config.sinkModel] ?? managerSinks.integrated[1]) // Unmodeled pre-update quotes keep their rate.
  : managerSinks[type][1];
const sinkDetail = q => [managerSinks[q.sink][0], q.sink === 'integrated' ? castSinkCatalog[q.sinkModel]?.name : '',
  q.sink !== 'none' ? `${q.sinkQty} шт.` : ''].filter(Boolean).join(' · ');
const readyCatalog = {
  board: { name: 'Разделочная доска · RD-01', price: 3060 },
  tray: { name: 'Поднос · TR-02', price: 4800 },
  shelf: { name: 'Полка · SH-03', price: 6200 },
};
const managerChannels = ['Обращение по телефону', 'Мессенджер', 'Корпоративная почта', 'Форма «Вызвать замерщика»', 'Форма «Посмотреть образцы»', 'Запрос спецификации', 'Расчёт по чертежу'];
const today = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Moscow' }).format(new Date());
const staleQuote = quote => quote.priceVersion !== state.prices.active;
const quoteEditor = quote => Boolean(quote?.config && quote.state === 'draft' && !staleQuote(quote) && (role === 'leadership' || quote.owner === roleLabels[role][2]));
const quoteReady = quote => quote.config ? Number(quote.config.area) > 0 && Boolean(quote.config.slab) : hasDimensions(quote);
const managerDelivery = (q, p = processors[q.processor]) => q.delivery === 'none' ? 0 : q.deliveryOverride ?? p.delivery[q.delivery === 'city' ? 0 : 1];
const managerInstall = (p, fabrication) => p.installFixed ?? Math.max(p.installMin || 0, Math.round(fabrication * p.installPercent / 100));
const pairs = obj => Object.entries(obj);
const pick = (valid, value) => valid.includes(value) ? value : valid[0];
const colorLabel = d => `${d.brand} ${d.code} · ${d.color}`;
const managerArea = value => Number(value).toLocaleString('ru-RU', { maximumFractionDigits: 6 }) + ' м²';
const managerSplit = q => q.processor !== 'own' && q.readyRoute === 'own';
const managerUsesReady = q => q.processor === 'own' || q.readyRoute === 'own';

function managerCatalog(q) {
  const regions = [...new Set(Object.values(processors).filter(p => p.material === q.material).map(p => p.region))];
  const makers = pairs(processors).filter(([, p]) => p.material === q.material && p.region === q.region).map(([id]) => id);
  const colors = (processors[q.processor]?.decors || []).map(id => [id, managerColor(id)]);
  const brands = [...new Set(colors.map(([, d]) => d.brand))];
  return { regions, makers, brands, colors: colors.filter(([, d]) => d.brand === q.brand) };
}

function alignManagerConfig(q) {
  q.material = pick(Object.keys(managerMaterials), q.material);
  q.region = pick(managerCatalog(q).regions, q.region);
  q.processor = pick(managerCatalog(q).makers, q.processor);
  q.brand = pick(managerCatalog(q).brands, q.brand);
  q.decor = pick(managerCatalog(q).colors.map(([id]) => id), q.decor);
  const slabs = managerColor(q.decor).slabs;
  q.slab = slabs.length === 1 ? slabs[0] : slabs.includes(q.slab) ? q.slab : '';
  q.edge = pick([...processors[q.processor].edges, ...(q.edge === 'radius' && q.processor === 'own' ? ['radius'] : [])], q.edge);
  q.skirt = pick(availableSkirts(q.processor),q.skirt);
  if (q.material !== 'acrylic' && q.sink === 'integrated') q.sink = 'none';
  if (q.processor === 'own') q.readyRoute = 'own';
  return q;
}

function newManagerConfig(prefill = {}) {
  return alignManagerConfig({ material:'acrylic', region:'moscow', processor:'own', brand:'Acrylica', decor:'a101', slab:'', area:'',
    sink:'none', sinkModel:'', sinkQty:1, edge:'basic', edgeLength:'', skirt:'none', skirtLength:'', extras:[], leftovers:[], discount:0,
    delivery:'none', deliveryOverride:null, installation:false, installOverride:null, measurement:false, measurePrice:0,
    readyRoute:'own', ready:[], ...structuredClone(prefill) });
}

function cartOf(lead) {
  if (!lead || lead.source !== 'Корзина витрины' || lead.estimate == null) return null;
  // A seeded payload, not an integration. The first sample reproduces 48 180 ₽ including ready goods.
  return lead.id === '142'
    ? newManagerConfig({ decor:lead.decor, area:1.8, sink:'under', delivery:'city', ready:[{ sku:'board', qty:1, discount:0 }] })
    : newManagerConfig({ decor:lead.decor, area:lead.area ?? '' });
}

function cartFacts(lead) {
  const cart = cartOf(lead);
  if (!cart) return [];
  return [['Цена на витрине', currency(lead.estimate)], ['Материал и цвет', managerMaterials[cart.material] + ' · ' + colorLabel(managerColor(cart.decor))],
    ['Регион и обработчик', managerRegions[cart.region] + ' · ' + processors[cart.processor].name], ['Площадь', managerArea(cart.area)],
    ['Мойка', managerSinks[cart.sink][0]], ['Доставка', deliveriesFor(cart.region)[cart.delivery]], ['Установка', cart.installation ? 'Включена' : 'Не выбрана'],
    ['Готовые товары', cart.ready.map(r => `${readyCatalog[r.sku].name} × ${r.qty}`).join(', ') || 'Не выбраны']];
}

function legacyManagerConfig(quote) {
  const m = legacyTotals(quote);
  return newManagerConfig({ decor:quote.decor, area:hasDimensions(quote) ? m.area : '', sink:quote.cut ? 'under' : 'none', sinkQty:quote.units,
    edge:quote.edge === 'radius' ? 'radius' : 'basic', edgeLength:quote.edge === 'radius' ? quote.units : '',
    delivery:quote.delivery ? 'city' : 'none', installation:Boolean(quote.installation), installOverride:quote.installation ? m.installation : null });
}

function managerRate(config, version, previous) {
  if (previous?.config?.processor === config.processor && previous.decor === config.decor && previous.priceVersion === version) return previous.rate;
  const id = config.decor;
  const rates = state.prices.versions.find(item => item.id === version)?.rates;
  return (rates?.[id] ?? managerColor(id).rate) + processors[config.processor].markup;
}

function totals(quote) {
  const q = quote.config;
  if (!q) return legacyTotals(quote);
  const p = processors[q.processor];
  const area = Number(q.area);
  const material = Math.round(area * quote.rate);
  const sink = sinkRate(quote) * q.sinkQty;
  const edge = Math.round(managerEdges[q.edge][1] * Number(q.edgeLength));
  const skirt = q.skirt === 'none' ? 0 : Math.round(managerSkirts[q.skirt][1] * Number(q.skirtLength));
  const extras = q.extras.reduce((s,r) => s + r.price, 0);
  const fabrication = material + sink + edge + skirt + extras;
  const leftovers = q.leftovers.reduce((s,r) => s + (r.include ? r.cost : 0), 0);
  // Included remnants are passed through at cost; the fabrication discount does not reduce them.
  const discount = Math.round(fabrication * q.discount / 100);
  const delivery = managerDelivery(q,p);
  const installation = q.installation ? q.installOverride ?? managerInstall(p,fabrication) : 0;
  const measure = q.measurement ? q.measurePrice : 0;
  const individual = fabrication - discount + leftovers + delivery + installation + measure;
  const ready = managerUsesReady(q) ? q.ready.map(row => {
    const item = readyCatalog[row.sku];
    const amount = item ? item.price * row.qty : 0;
    const discount = Math.round(amount * row.discount / 100);
    return { ...row, item, amount, discountAmount:discount, total:amount - discount };
  }) : [];
  const readyTotal = ready.reduce((s,row) => s + row.total,0);
  return { area, material, sink, edge, skirt, fabrication, leftovers, discount, delivery, installation, measure, individual, ready, readyTotal, total:individual + readyTotal };
}

const quoteLabel = quote => (quote.state === 'agreed' ? badge('Согласован', 'green') : badge('Черновик', 'amber')) +
  (staleQuote(quote) ? ' ' + badge('Прайс устарел', 'wine') : '');

function archiveRows() {
  const query = searchTerms.quotes.trim().toLowerCase();
  const entries = state.quotes.filter(item => `${item.id} ${leadOf(item.lead)?.name} ${managerColor(item.decor).code} ${person(item.owner)}`.toLowerCase().includes(query));
  return table(['Расчёт', 'Декор', 'Версия прайса', 'Ответственный', 'Сумма', 'Статус'], entries.map(item => `<tr>
    ${cell(recordLink('Расчёт №' + item.id, leadOf(item.lead)?.name || 'Заявка №' + item.lead, 'quote/' + item.id))}
    ${cell(esc(managerColor(item.decor).code), 'Декор')}${cell(esc(priceLabel(item)), 'Прайс')}
    ${cell(esc(person(item.owner)), 'Ответственный')}${cell(quoteAmount(item), 'Сумма', 'amount numeric')}${cell(quoteLabel(item))}
  </tr>`).join('')) + `<div class="table-end">Найдено расчётов: ${entries.length}</div>`;
}

function quotesView() {
  return headline('Расчёты', 'Архив вариантов, спецификаций и применённых прайсов.') +
    `<section class="panel"><div class="toolbar"><h2>Общий архив</h2>${search('quotes', 'Поиск расчётов', 'Номер, клиент или декор')}</div><div id="list-results">${archiveRows()}</div></section>
    <p class="notice" style="margin-top:16px">Просмотр расчёта другого менеджера фиксируется в журнале. Согласованный вариант сохраняет исходный прайс и параметры.</p>`;
}

function readQuoteForm(form, quote) {
  const values = new FormData(form);
  const text = key => String(values.get(key) ?? '').trim();
  const optional = key => text(key) === '' ? null : Number(text(key));
  const q = structuredClone(form.managerDraft?.config || quote.config);
  for (const key of ['material','region','processor','brand','decor','slab','sink','sinkModel','edge','skirt','delivery','readyRoute']) q[key] = values.has(key) ? text(key) : q[key];
  for (const key of ['area','edgeLength','skirtLength']) q[key] = optional(key) ?? '';
  for (const key of ['discount','measurePrice','sinkQty']) q[key] = optional(key) ?? (key === 'sinkQty' ? 1 : 0);
  for (const key of ['deliveryOverride','installOverride']) q[key] = optional(key);
  for (const key of ['installation','measurement']) q[key] = values.has(key);
  q.extras = q.extras.map((_, i) => ({ label:text('extraLabel'+i), price:optional('extraPrice'+i) ?? 0 }));
  q.leftovers = q.leftovers.map((_, i) => ({ size:text('leftSize'+i), area:optional('leftArea'+i) ?? '', cost:optional('leftCost'+i) ?? 0, include:values.has('leftInclude'+i) }));
  if (values.has('readySku0')) q.ready = q.ready.map((_, i) => ({ sku:text('readySku'+i), qty:optional('readyQty'+i) ?? 0, discount:optional('readyDiscount'+i) ?? 0 }));
  alignManagerConfig(q);
  if (q.processor !== (form.managerDraft?.config || quote.config).processor) {
    q.deliveryOverride = null;
    q.installOverride = null;
  }
  if (q.sink !== 'integrated' || !Object.hasOwn(castRatesFor(quote,q), q.sinkModel)) q.sinkModel = '';
  if (q.delivery === 'none') q.deliveryOverride = null;
  if (q.skirt === 'none') q.skirtLength = '';
  if (!q.installation) q.installOverride = null;
  if (!q.measurement) q.measurePrice = 0;
  return { ...quote, config:q, decor:q.decor, rate:managerRate(q,quote.priceVersion,quote), note:text('note') };
}

// Row triples are shared by the manager summary and the customer document.
function individualGroups(quote, m = totals(quote)) {
  const q = quote.config;
  const d = managerColor(quote.decor);
  const colors = { title:'Бренд и цвет', rows:[['Бренд', d.brand], ['Цвет', `${d.code} · ${d.color}`],
    ...(q ? [['Размер слэба', q.slab || 'Не выбран']] : [])] };
  const group = (title, rows) => ({ title, rows });
  const area = [['Площадь изделия', managerArea(m.area)], ['Камень и базовые работы', `${currency(quote.rate)} / м²`, currency(m.material)]];
  if (!q) return [colors, group('Параметры изделия', [['Длина × глубина', `${quote.length} × ${quote.depth} мм`],
    ['Количество', `${quote.units} шт.`], ...area, ['Вырез под мойку', quote.cut ? 'Включён' : 'Не выбран', currency(m.cut)]]),
    group('Кромка и бортик', [['Лицевая кромка', quote.edge === 'radius' ? 'Радиусная' : 'Прямая', currency(m.edge)]]),
    group('Услуги', [['Доставка', quote.delivery ? 'Включена' : 'Не выбрана', currency(m.delivery)],
      ['Установка', quote.installation ? 'Включена' : 'Не выбрана', currency(m.installation)]])];

  const measured = (label, size) => `${label}${size === '' ? '' : ' · ' + number(Number(size)) + ' м.п.'}`;
  return [colors, group('Параметры изделия', [...area, ['Мойка', sinkDetail(q), currency(m.sink)]]),
    group('Кромка и бортик', [['Лицевая кромка', measured(managerEdges[q.edge][0], q.edgeLength), currency(m.edge)],
      ['Пристеночный бортик', measured(managerSkirts[q.skirt][0], q.skirtLength), currency(m.skirt)]]),
    group('Дополнительные работы и товары', q.extras.map(r => [r.label || 'Дополнительная позиция', '', currency(r.price)])),
    group('Остатки материала', q.leftovers.map((r,i) => [`Остаток ${i+1}`,
      [r.size, r.area === '' ? '' : managerArea(r.area), r.include ? 'Включён по себестоимости' : 'Не включён'].filter(Boolean).join(' · '),
      ...(r.include ? [currency(r.cost)] : [])])),
    group('Скидка', q.discount ? [['Скидка на изготовление', `${number(q.discount)}% от ${currency(m.fabrication)}`, `−${currency(m.discount)}`],
      ['Изготовление со скидкой', '', currency(m.fabrication - m.discount)]] : []),
    group('Услуги', [['Доставка', deliveriesFor(q.region)[q.delivery], currency(m.delivery)],
      ['Установка', q.installation ? 'Включена' : 'Не выбрана', currency(m.installation)], ['Замер', q.measurement ? 'Включён' : 'Не выбран', currency(m.measure)]])];
}

function processorRows(quote) {
  const q = quote.config;
  return [...(q ? [['Материал', managerMaterials[q.material]], ['Регион', managerRegions[q.region]],
    ['Обработчик', processors[q.processor].name]] : []), ['Версия прайса', priceLabel(quote)]];
}

function readyRows(m) {
  return [
    ...(m.ready || []).filter(r => r.item).map(r => [r.item.name, `${r.qty} шт. × ${currency(r.item.price)}${r.discount ? ` · скидка ${number(r.discount)}%` : ''}`, currency(r.total)]),
    ['Итого готовые товары', '', currency(m.readyTotal || 0)],
  ];
}

const factRows = rows => rows.map(([label, description, amount]) => [label, [description, amount].filter(Boolean).join(' · ')]);
const quoteRows = (quote, m = totals(quote)) => factRows([...processorRows(quote).filter(([label]) => label !== 'Версия прайса'),
  ...individualGroups(quote,m).flatMap(group => group.rows), ['Итого индивидуальные товары', '', currency(m.individual ?? m.total)]]);

function summaryGroup({title, rows}) {
  if (!rows.length) return '';
  return `<section class="quote-summary-group"><h3>${esc(title)}</h3><dl>${rows.map(([label, description, amount]) =>
    `<div class="quote-summary-row"><dt>${esc(label)}</dt><dd>${description ? `<span>${esc(description)}</span>` : ''}
    ${amount ? `<strong class="numeric">${esc(amount)}</strong>` : ''}</dd></div>`).join('')}</dl></section>`;
}

function quoteSummary(quote) {
  const m = totals(quote);
  const savedTask = state.tasks.find(item => item.lead === quote.lead);
  const otherVersion = savedTask && savedTask.quote !== quote.id;
  const taskLink = savedTask && canManageLead(leadOf(quote.lead)) ? `<a class="btn full" href="#task/${savedTask.id}">${otherVersion ? 'Открыть переданное задание' : 'Открыть задание'}</a>` : '';
  const canSend = !staleQuote(quote) && quote.state === 'agreed' && canManageLead(leadOf(quote.lead)) && (!quote.config || quote.config.processor === 'own');
  const taskAction = taskLink || (canSend ? action('Передать в производство', 'send-task', { id:quote.id, style:'primary full' }) : '');
  const groups = [{ title:'Обработчик и прайс', rows:processorRows(quote) }, ...individualGroups(quote,m),
    { title:'По индивидуальному заказу', rows:[['Итого индивидуальные товары', '', currency(m.individual ?? m.total)]] },
    ...(quote.config ? [{ title:'Готовые товары', rows:readyRows(m) }] : [])];
  return `${quoteReady(quote) ? `${groups.map(summaryGroup).join('')}${rowMoney('Итоговая сумма проекта', m.total, true)}` :
    `${summaryGroup(groups[0])}<p class="notice">Для итоговой суммы укажите площадь изделия и размер слэба.</p>`}
    ${quote.config && managerSplit(quote.config) && m.ready.some(r => r.item) ? '<p class="notice">Готовые товары отгружаются отдельно. Их сумма входит в итог проекта, но для отгрузки используется отдельная спецификация.</p>' : ''}
    ${otherVersion ? `<p class="notice">Уже есть задание №${savedTask.id} по расчёту №${savedTask.quote}. Новый вариант его не заменяет.</p>` : ''}
    ${taskAction ? `<div class="actions">${taskAction}</div>` : ''}`;
}

function managerGroup(title, body, css = '') {
  return `<section class="manager-quote-group ${css}"><h3>${esc(title)}</h3><div class="manager-group-body form-rows">${body}</div></section>`;
}

function priceVersionList(quote) {
  const versions = [...state.prices.versions].sort((a,b) => Number(b.id === state.prices.active) - Number(a.id === state.prices.active));
  return `<div class="quote-versions"><p>Версия прайса</p><ul>${versions.map(version => {
    const active = version.id === state.prices.active;
    return `<li class="${active ? 'current-price' : 'old-price'}"><span>${esc(version.id)} · ${esc(dateLabel(version.date))}</span>
      <span class="price-state">${active ? 'Действует' : 'Архив'}${version.id === quote.priceVersion ? ' · в расчёте' : ''}</span></li>`;
  }).join('')}</ul></div>`;
}

function managerFormFields(quote, editable) {
  const q = quote.config;
  const p = processors[q.processor];
  const { regions, makers, brands, colors } = managerCatalog(q);
  const d = managerColor(q.decor);
  const lock = editable ? '' : ' disabled';
  const select = (label, key, choices, value = q[key], attrs = '') => field(label, `<select name="${key}"${lock} ${attrs}>${options(choices,value)}</select>`);
  const input = (key, value, attrs = '') => `<input name="${key}" value="${esc(value ?? '')}"${lock} ${attrs}>`;
  const quantity = (label, key, value, { min=0, max=100000000, step=1, required=true, placeholder='' } = {}) =>
    field(label,input(key,value,`type="number" min="${min}" max="${max}" step="${step}"${required ? ' required' : ''}${placeholder !== '' ? ` placeholder="${esc(placeholder)}"` : ''}`));
  const check = (label,key,checked) => `<label class="check"><input type="checkbox" name="${key}"${checked ? ' checked' : ''}${lock}>${esc(label)}</label>`;
  const names = (list, dict) => list.map(key => [key,dict[key]]);
  const costs = (list, dict) => list.map(key => [key, `${dict[key][0]} · ${currency(dict[key][1])}${dict[key][1] ? ' / м.п.' : ''}`]);
  const append = (label, group) => editable ? `<div class="actions">${action(label, 'manager-add-row', { style:'small', id:quote.id, extra:`data-group="${group}"`, glyph:'plus' })}</div>` : '';
  const repeat = (body, label, group, index) => `<div class="manager-quote-row${editable ? ' editable' : ''}"><div class="form-rows">${body}</div>${editable ?
    `<button class="icon-btn quote-trash" type="button" data-action="manager-remove-row" data-id="${esc(quote.id)}" data-group="${group}" data-index="${index}" aria-label="${esc(label)}" title="${esc(label)}">${icon('trash')}</button>` : ''}</div>`;
  const castRates = castRatesFor(quote);
  const castOptions = [['','Выберите модель'], ...pairs(castRates).map(([id,rate]) => [id, `${castSinkCatalog[id].name} · +${currency(rate)} / шт.`])];
  const castRange = Object.values(castRates);
  const castMin = Math.min(...castRange);
  const castPrice = castMin === Math.max(...castRange) ? `+${currency(castMin)}` : `от ${currency(castMin)}`;
  const sinkOptions = pairs(managerSinks).filter(([id]) => id !== 'integrated' || castRange.length).map(([id,[label,rate]]) =>
    [id, `${label} · ${id === 'integrated' ? castPrice : '+' + currency(rate)}`]);
  const compact = html => `<div class="quote-compact-field">${html}</div>`;
  const shelfOptions = [['','Выберите товар'], ...pairs(readyCatalog).map(([id,item]) => [id, `${item.name} · ${currency(item.price)} / шт.`])];
  const unitPrice = q.installation ? managerInstall(p,totals(quote).fabrication) : 0;
  const installRule = p.installFixed === undefined ? `${p.installPercent}% от изготовления до скидки${p.installMin ? ' (от ' + currency(p.installMin) + ')' : ''}` : `фиксированно ${currency(p.installFixed)}`;
  return managerGroup('Выбор обработчика', `<div class="fields">${select('Материал','material',pairs(managerMaterials))}
    ${select('Регион','region',names(regions,managerRegions))}${select('Обработчик','processor',makers.map(id => [id,processors[id].name]))}
    ${priceVersionList(quote)}</div>`) +
  managerGroup('Выбор цвета', `<div class="fields">${select('Бренд','brand',brands.map(x => [x,x]))}
    ${select('Цвет','decor',colors.map(([id,c]) => [id,`${c.code} · ${c.color}`]))}</div>`) +
  managerGroup('Параметры изделия', `<div class="quote-area">${compact(quantity('Общая площадь изделия, м²','area',q.area,{min:.000001,max:10000,step:.000001}))}</div>
    <div class="fields">${select('Размер слэба','slab',[...(d.slabs.length > 1 ? [['','Выберите размер']] : []),...d.slabs.map(x => [x,x])],q.slab,'required')}</div>
    <div class="fields">${select('Тип мойки','sink',sinkOptions)}
    ${q.sink !== 'none' ? quantity('Количество моек','sinkQty',q.sinkQty,{min:1,max:100}) : ''}</div>
    ${q.sink === 'integrated' ? `<div class="fields">${select('Модель литой мойки','sinkModel',castOptions,q.sinkModel || '', 'required')}</div>` : ''}`) +
  managerGroup('Кромка и бортик', `<div class="fields">${select('Лицевая кромка','edge',costs([...p.edges,...(q.edge === 'radius' ? ['radius'] : [])],managerEdges))}
    ${quantity('Длина кромки, м.п.','edgeLength',q.edgeLength,{step:.001,max:10000,min:managerEdges[q.edge][1] ? .001 : 0,required:Boolean(managerEdges[q.edge][1])})}
    ${select('Пристеночный бортик','skirt',costs(availableSkirts(q.processor),managerSkirts))}
    ${q.skirt !== 'none' ? quantity('Длина бортика, м.п.','skirtLength',q.skirtLength,{step:.001,min:.001,max:10000}) : ''}</div>`) +
  managerGroup('Дополнительные работы и товары', `${q.extras.length ? q.extras.map((r,i) => repeat(
    `<div class="fields">${field('Работа / товар '+(i+1),input('extraLabel'+i,r.label,'required maxlength="100"'))}${quantity('Стоимость, ₽','extraPrice'+i,r.price)}</div>`,
    'Удалить позицию '+(i+1),'extras',i)).join('') : '<p class="secondary-line">Нет дополнительных позиций.</p>'}${append('Добавить работу или товар','extras')}`) +
  managerGroup('Остатки материала', `${q.leftovers.length ? q.leftovers.map((r,i) => repeat(
    `<div class="fields">${field('Размер остатка '+(i+1),input('leftSize'+i,r.size,'required maxlength="80" placeholder="2100 × 345 мм"'))}${quantity('Площадь, м²','leftArea'+i,r.area,{step:.001,min:.001,max:10000})}${quantity('Себестоимость, ₽','leftCost'+i,r.cost)}</div>${check('Включить по себестоимости','leftInclude'+i,r.include)}`,
    'Удалить остаток '+(i+1),'leftovers',i)).join('') : '<p class="secondary-line">Остатки не указаны.</p>'}${append('Добавить остаток','leftovers')}`) +
  managerGroup('Скидка', `${compact(quantity('Скидка на изготовление, %','discount',q.discount,{max:100,step:.01,required:false}))}
    <p class="secondary-line">Действует только на изготовление: не уменьшает стоимость остатков, услуг и готовых товаров.</p>`) +
  managerGroup('Услуги', `<div class="fields">${select('Доставка','delivery',pairs(deliveriesFor(q.region)))}
    ${q.delivery !== 'none' ? compact(quantity('Стоимость доставки, ₽ · по прайсу '+currency(managerDelivery({...q,deliveryOverride:null})), 'deliveryOverride',q.deliveryOverride,{required:false,placeholder:managerDelivery({...q,deliveryOverride:null})})) : ''}</div>
    <div class="fields"><div class="form-rows">${check('Нужна установка','installation',q.installation)}
    ${q.installation ? `${compact(quantity('Стоимость установки, ₽','installOverride',q.installOverride,{required:false,placeholder:unitPrice}))}<p class="secondary-line">По прайсу: ${esc(installRule)}. Пустое поле — ставка прайса.</p>` : ''}</div>
    <div class="form-rows">${check('Нужен замер','measurement',q.measurement)}${q.measurement ? compact(quantity('Стоимость замера, ₽','measurePrice',q.measurePrice)) : ''}</div></div>`) +
  managerGroup('Готовые товары', `${q.processor === 'own' ? '<p class="secondary-line">Отгрузка со своего производства, в общей спецификации.</p>' :
    select('Кто отгружает готовые товары','readyRoute',[['own','Своё производство · отдельная спецификация'],['partner','Партнёр · вручную в дополнительных позициях']])}
    ${managerUsesReady(q) ? `${q.ready.length ? q.ready.map((r,i) => repeat(
      `${select('Товар '+(i+1),'readySku'+i,shelfOptions,r.sku,'required')}<div class="fields">${quantity('Количество, шт.','readyQty'+i,r.qty,{min:1,max:1000})}${quantity('Скидка на товар, %','readyDiscount'+i,r.discount,{max:100,step:.01,required:false})}</div>`,
      'Удалить товар '+(i+1),'ready',i)).join('') : '<p class="secondary-line">Готовые товары не выбраны.</p>'}${append('Добавить готовый товар','ready')}` :
    `<p class="notice">Внесите товар партнёра вручную в «Дополнительные работы и товары».${q.ready.length ? ' Товары со своего производства сохранены в черновике, но не входят в сумму на этом маршруте.' : ''}</p>`}`, 'quote-ready-group') +
  managerGroup('Примечание для клиента', field('Примечание к спецификации',`<textarea name="note" maxlength="1000"${lock}>${esc(quote.note)}</textarea>`)) +
  (editable ? '<p id="quote-save-status" class="quote-save-status" role="status">Изменения сохраняются в этом браузере автоматически.</p>' : '');
}

function quoteView(quote) {
  if (!quote) return missing('quotes');
  const lead = leadOf(quote.lead);
  const editable = quoteEditor(quote);
  const stale = staleQuote(quote);
  const quoteCommands = stale ? action('Пересчитать по актуальному прайсу', 'reprice-quote', { id:quote.id, style:'primary', glyph:'calculator' }) :
    action('Создать вариант', 'copy-quote', { id:quote.id, glyph:'plus' });
  const memo = stale ? '<p class="notice">Расчёт выполнен по неактуальному прайсу. Цены недействительны. Пересчёт создаст новый вариант, не меняя архив.</p>' :
    !editable ? '<p class="notice">Расчёт доступен только для просмотра. Для изменений создайте новый вариант.</p>' : '';
  const snapshot = cartFacts(lead);
  const source = managerGroup('Информация с витрины', snapshot.length ? `<div class="quote-source-lead">${image(productImage(lead.decor))}
    <div><p class="secondary-line">${esc(lead.title)} · исходная сумма</p><strong class="numeric">${esc(snapshot[0][1])}</strong></div></div>
    <details><summary>Параметры исходного расчёта</summary>${facts(snapshot.slice(1))}</details>` :
    '<p class="secondary-line">Ручной расчёт: конфигурации и цены с витрины нет.</p>', 'quote-source');
  const form = quote.config ? `<form id="quote-form" data-entity="${esc(quote.id)}" class="form-rows manager-quote-form">${managerFormFields(quote,editable)}</form>` :
    `<div class="form-rows">${managerGroup('Выбор обработчика', priceVersionList(quote))}${facts(quoteRows(quote))}</div>`;
  const documents = `<div class="actions">${stale ? '' : action('Скачать спецификацию PDF', 'export-quote', { id:quote.id, glyph:'file', extra:!editable && !quoteReady(quote) ? 'disabled' : '' })}
    ${!stale ? `<span id="manager-ready-document">${readyDocumentButton(quote)}</span>` : ''}
    ${editable && canManageLead(lead) ? action('Согласовать расчёт', 'agree-quote', { id:quote.id, style:'outline' }) : ''}
    ${canManageLead(lead) ? `<a class="btn" href="#lead/${lead.id}">Открыть заявку</a>` : ''}</div>`;
  return back('quotes') + headline('Расчёт №' + quote.id, (lead?.name || 'Заявка №' + quote.lead) + ' · ' + managerColor(quote.decor).code + ' · вариант ' + quote.version,quoteCommands,quoteLabel(quote)) +
    `<div class="detail-grid quote-layout"><div class="quote-parameters">${memo}${source}${section('Расчёт менеджера', form)}</div>
      <section class="panel quote-cost"><div class="panel-head"><h2>Сводка по проекту</h2></div><div id="quote-summary" class="panel-body">${quoteSummary(quote)}</div></section>
      <div class="quote-specification">${section('Спецификация', documents + '<p class="secondary-line">Локальное демо: справочники, маршруты, ставки и документы служат примерами.</p>')}</div></div>`;
}

function readyDocumentButton(quote) {
  return quote.config && managerSplit(quote.config) && quote.config.ready.some(row => row.sku) ? action('Скачать отдельную спецификацию готовых товаров', 'export-ready', { id:quote.id, glyph:'file' }) : '';
}

function refreshQuoteForm(form, quote, draft, focusedName = '', preserveName = name => name) {
  // A partially entered number can be invalid even though its DOM value is empty.
  // Keep the original node for these fields so unrelated controls cannot clear the error.
  const invalidNumbers = [...form.elements].filter(input => input.validity.badInput);
  form.innerHTML = managerFormFields(draft,true);
  for (const input of invalidNumbers) {
    const next = form.elements.namedItem(preserveName(input.name));
    if (!next) continue;
    input.id = next.id;
    input.name = next.name;
    for (const attr of ['min','max','step','required','placeholder']) {
      if (next.hasAttribute(attr)) input.setAttribute(attr,next.getAttribute(attr));
      else input.removeAttribute(attr);
    }
    next.replaceWith(input);
  }
  if (focusedName) form.elements.namedItem(focusedName)?.focus({ preventScroll:true });
  showQuoteDraft(quote,draft,form);
}

function quoteFormValid(form, draft, report = false) {
  for (const input of form.elements) {
    if (/^(extraLabel|leftSize)\d+$/.test(input.name)) {
      input.setCustomValidity(input.value && !input.value.trim() ? 'Введите значение, а не только пробелы.' : '');
    }
  }
  return (report ? form.reportValidity() : form.checkValidity()) && quoteReady(draft) &&
    (draft.config.sink !== 'integrated' || Boolean(draft.config.sinkModel));
}

function saveQuoteDraft(quote, draft) {
  if (!quoteEditor(quote)) return false;
  if (JSON.stringify(draft.config) === JSON.stringify(quote.config) && draft.note === quote.note) return true;
  const updated = { ...draft, castRates:quote.castRates ?? structuredClone(castPriceList(quote.priceVersion)), time:time(), date:today() };
  try {
    localStorage.setItem(storageKey,JSON.stringify({ ...state, quotes:state.quotes.map(item => item === quote ? updated : item) }));
  } catch { return false; }
  Object.assign(quote,updated);
  return true;
}

function showQuoteDraft(quote, draft, form) {
  form.managerDraft = draft;
  const valid = quoteFormValid(form,draft);
  const saved = valid && saveQuoteDraft(quote,draft);
  document.querySelector('#quote-summary').innerHTML = quoteSummary(valid ? draft : quote) +
    (valid ? '' : '<p class="notice">Показан последний сохранённый расчёт. Заполните или исправьте поля для обновления суммы.</p>');
  document.querySelector('#manager-ready-document').innerHTML = readyDocumentButton(valid ? draft : quote);
  const status = document.querySelector('#quote-save-status');
  const text = saved ? 'Расчёт сохранён в этом браузере.' : valid ? 'Не удалось сохранить расчёт в браузере.' : 'Изменения не сохранены: проверьте обязательные поля и значения.';
  if (status.textContent !== text) status.textContent = text;
  status.classList.toggle('needs-attention', !saved);
  const override = form.elements.installOverride;
  if (override && valid) override.placeholder = managerInstall(processors[draft.config.processor], totals(draft).fabrication);
}

function validQuoteDraft(form, quote) {
  if (!quoteEditor(quote) || form?.dataset.entity !== quote.id) return null;
  const draft = readQuoteForm(form,quote);
  return quoteFormValid(form,draft,true) ? draft : null;
}

function productionView() {
  return headline('Производство', 'Чертежи, задания и контроль сроков московского производства.') +
    `<section class="panel"><div class="panel-head"><h2>Задания</h2><a class="text-link" href="#quotes">Архив расчётов</a></div>
    ${table(['Задание', 'Расчёт', 'Участок', 'Срок', 'Этап'], state.tasks.filter(item => canManageLead(leadOf(item.lead))).map(item => `<tr>
      ${cell(recordLink('Задание №' + item.id, leadOf(item.lead)?.name || 'Заявка №' + item.lead, 'task/' + item.id))}
      ${cell(`<a class="text-link" href="#quote/${item.quote}">№${item.quote}</a>`, 'Расчёт')}
      ${cell('Собственное производство', 'Участок')}${cell(dateLabel(item.due), 'Срок', 'nowrap')}${cell(badge(...taskStages[item.state]))}
      </tr>`).join(''))}</section>`;
}

function taskView(task) {
  if (!task || !canManageLead(leadOf(task.lead))) return missing('production');
  const quote = quoteOf(task.quote);
  const lead = leadOf(task.lead);
  const specification = `<div class="attachment">${icon('file')}<span>${esc(task.drawing)}</span></div>
    <p class="secondary-line" style="margin:6px 0 13px">Название чертежа в демонстрационном задании.</p>
    ${facts([['Изделие', lead.title], ['Прайс', priceLabel(quote)], ...quoteRows(quote), ...(quote.config ? factRows(readyRows(totals(quote))) : []), ['Цена по расчёту', currency(totals(quote).total)]])}
    ${quote.note ? `<p class="notice" style="margin-top:13px"><strong>Примечание к расчёту:</strong> ${esc(quote.note)}</p>` : ''}
    ${task.note ? `<p class="notice" style="margin-top:13px">${esc(task.note)}</p>` : ''}`;
  const cost = `${rowMoney('Материал', task.materials)}${rowMoney('Работы', task.works)}${rowMoney('Комплектующие', task.parts)}
    ${rowMoney('Себестоимость', task.materials + task.works + task.parts, true)}
    <p class="secondary-line">Условные затраты для демонстрации задания.</p>`;
  return back('production') + headline('Задание №' + task.id, lead.name + ' · ' + 'срок ' + dateLabel(task.due),
    action('Обновить этап', 'update-task', { id: task.id, style: 'primary' }), badge(...taskStages[task.state])) +
    `<div class="detail-grid"><div class="stack">${section('Чертёж и параметры',specification,
      `<a class="text-link" href="#quote/${task.quote}">Расчёт №${task.quote}</a>`)}
      ${section('Текущее исполнение', facts([['Участок','Собственное производство'],['Ответственный производства',task.responsible || 'Нужно назначить'],['Менеджер',person(lead.owner)],['Этап', taskStages[task.state][0]],['Срок',dateLabel(task.due)],['Подтверждение срока',task.dueConfirmed ? 'Подтверждён' : 'Ожидается'],['Следующий шаг',lead.next]]))}</div>
      <div class="stack">${section('Плановые затраты',cost,action('Уточнить', 'task-cost', { id: task.id, style: 'small' }))}</div></div>`;
}

let catalogMode = 'products';
function catalogRows() {
  const query = searchTerms.catalog.trim().toLowerCase();
  const items = [...state.products].sort((a,b) => a.order - b.order).filter(item => {
    const decor = decorOf(item.decor);
    return `${item.sku} ${item.name} ${decor.code} ${decor.color} ${decor.brand}`.toLowerCase().includes(query);
  });
  return table(['Позиция', 'Материал и бренд', 'Декор', 'Единица', 'Порядок', 'Статус'], items.map(item => {
    const decor = decorOf(item.decor);
    return `<tr>${cell(recordLink(item.name, item.sku, 'product/' + item.id, image(item.image)))}
      ${cell(record('Акриловый камень', decor.brand), 'Материал и бренд')}
      ${cell(record(decor.code, decor.color, image(decor.chip)), 'Декор')}
      ${cell('м²', 'Единица')}${cell(item.order, 'Порядок')}
      ${cell(item.state === 'live' ? badge('На витрине','green') : badge('Черновик','amber'))}</tr>`;
  }).join('')) + `<div class="table-end">Позиций: ${items.length}</div>`;
}

function dictionary() {
  return table(['Цвет', 'Бренд', 'Серия', 'Карточек'], state.decors.map(item =>
    `<tr>${cell(record(item.code, item.color, image(item.chip)))}
      ${cell(esc(item.brand), 'Бренд')}${cell(esc(item.series), 'Серия')}
      ${cell(state.products.filter(product => product.decor === item.id).length, 'Карточек')}</tr>`).join('')) +
    '<div class="table-end">Материал: акриловый камень. Тип изделия: кухонная столешница. Единица цены: м².</div>' +
    '<div class="panel-head"><h2>Литые мойки · демосправочник</h2></div>' +
    table(['Модель', 'Код', 'Материалы для спецификации'], pairs(castSinkCatalog).map(([code, item]) => `<tr>
      ${cell(esc(item.name))}${cell(esc(code), 'Код')}${cell(item.image ? 'Иллюстрация и демосхема' : 'Условная схема без размеров', 'Материалы')}</tr>`).join(''));
}

function catalogView() {
  return headline('Каталог', 'Товары витрины и связанные справочники материалов, брендов и декоров.',
    action('Новая позиция', 'new-product', { style: 'primary', glyph: 'plus' })) +
    `<section class="panel"><div class="toolbar"><div class="tabs" aria-label="Раздел каталога">
      ${tab('Позиции','catalog-tab','products',catalogMode)}${tab('Справочники','catalog-tab','dictionary',catalogMode)}</div>
      ${catalogMode === 'products' ? search('catalog', 'Поиск позиций', 'Артикул, товар или цвет') : ''}
      </div><div id="list-results">${catalogMode === 'products' ? catalogRows() : dictionary()}</div></section>`;
}

function productView(item) {
  if (!item) return missing('catalog');
  const decor = decorOf(item.decor);
  const inputs = `<form id="product-form" data-entity="${item.id}" class="form-rows">
    ${field('Название позиции', `<input name="name" required maxlength="80" value="${esc(item.name)}">`)}
    <div class="fields">${field('Артикул товара', `<input name="sku" required maxlength="24" value="${esc(item.sku)}">`)}
      ${field('Порядок в выдаче', `<input type="number" name="order" min="1" max="999" required value="${item.order}">`)}</div>
    ${field('Декор из справочника', `<select name="decor">${options(state.decors.map(entry => [entry.id, entry.code + ' · ' + entry.color]), item.decor)}</select>`)}
    ${field('Видимость', `<select name="state">${options([['draft','Черновик'],['live','На витрине']], item.state)}</select>`)}
    <p id="product-error" class="price-error" role="alert"></p>
    <div class="actions"><button class="btn primary" type="submit">Сохранить позицию</button></div>
  </form>`;
  return back('catalog') + headline(item.name, item.sku + ' · ' + activeRegion, '',
    item.state === 'live' ? badge('На витрине','green') : badge('Черновик','amber')) +
    `<div class="detail-grid"><div class="stack">${section('Позиция каталога', inputs)}
      ${section('Материалы карточки', `<div class="product-teaser">${image(item.image)}<div><strong>Фото из прототипа витрины</strong><p class="secondary-line">Порядок показа и наличие документов уточняются при наполнении.</p></div></div>`)}
    </div><div class="stack">${section('Декор из справочника', `${image(decor.chip, 'palette-image')}
    <div style="margin-top:13px">${facts([['Материал','Акриловый камень'], ['Бренд',decor.brand], ['Серия',decor.series], ['Артикул',decor.code], ['Цвет',decor.color]])}</div>`)}</div></div>`;
}

const draftPrice = () => [
  { id: 'r1', decor: 'a101', original: 'A101', cost: 200, currency: 'USD', exchange: 94, k1: 1.22, k2: null },
  { id: 'r2', decor: '', original: 'A-999', cost: 20500, currency: 'RUB', exchange: 1, k1: 1.22, k2: 1.23 },
];
const priceFor = row => Math.round(row.cost * row.exchange * (row.k2 ?? row.k1));

function pricesView() {
  const casts = pairs(castPriceList(state.prices.active)).flatMap(([processor, rates]) => pairs(rates).map(([code, rate]) => `<tr>
    ${cell(record(castSinkCatalog[code].name, code))}${cell(esc(managerRegions[processors[processor].region]), 'Регион')}
    ${cell(esc(processors[processor].name), 'Обработчик')}${cell(currency(rate), 'Цена за единицу', 'amount numeric')}</tr>`)).join('');
  return headline('Прайсы', 'Общий источник цен для витрины и расчётов. Здесь видны версии и исходные данные.',
    action(state.prices.draft ? 'Открыть проверку' : 'Проверить демопрайс', 'start-import', { style: 'primary', glyph: 'file' })) +
    `<section class="panel"><div class="panel-head"><h2>История прайсов</h2></div>
      ${table(['Версия', 'Источник', 'Дата', 'Регион', 'Статус'], state.prices.versions.map(item => `<tr>
        ${cell(record(item.id, 'Акриловые столешницы'))}${cell(esc(item.source), 'Источник')}
        ${cell(dateLabel(item.date), 'Дата')}${cell(activeRegion, 'Регион')}${cell(item.active ? badge('Действует','green') : badge('Архив'))}
      </tr>`).join(''))}</section>` +
    `<div class="stack" style="margin-top:16px">${section('Литые мойки · демопрайс ' + state.prices.active,
      table(['Модель и код', 'Регион', 'Обработчик', 'Цена за единицу'], casts))}</div>` +
    `<p class="notice" style="margin-top:16px">Демонстрационный импорт показывает проверку до публикации. Формат рабочего Excel и правила применения новых цен согласуются отдельно.</p>`;
}

function importView() {
  if (!state.prices.draft) return back('prices') + headline('Проверка прайса', 'Для просмотра проверки откройте демопрайс.',
    action('Проверить демопрайс', 'start-import', { style: 'primary', glyph: 'file' }));
  const draft = state.prices.draft;
  const duplicates = draft.filter((item, index) => item.decor && draft.findIndex(row => row.decor === item.decor) !== index);
  const bad = draft.filter(item => !item.decor).length + duplicates.length;
  const rows = draft.map(item => {
    const decor = decorOf(item.decor);
    const problem = !decor ? 'Декор не найден' : duplicates.includes(item) ? 'Декор повторяется' : '';
    return `<tr>${cell(record(item.original, decor ? decor.code + ' · ' + decor.color : 'Нужна привязка к справочнику'))}
      ${cell(number(item.cost) + ' ' + item.currency, 'Закупка', 'nowrap')}${cell(number(item.exchange), 'КурсВП')}
      ${cell(number(item.k1), 'K1')}${cell(item.k2 === null ? '—' : number(item.k2), 'K2')}
      ${cell(currency(priceFor(item)), 'Розница', 'amount')}
      ${cell(`<div class="actions">${problem ? badge(problem,'wine') : badge('Готово','green')}
        ${action('Исправить','fix-price',{ id: item.id, style: 'small' })}</div>`)}</tr>`;
  }).join('');
  return back('prices') + headline('Проверка прайса', 'Учебный набор из двух строк. Проверьте соответствие декоров и ставки перед публикацией.',
    action('Опубликовать демоверсию','publish-price',{ style:'primary', extra: bad ? 'disabled' : '' }), badge(bad ? 'Есть замечания' : 'Готов к публикации',bad ? 'wine':'green')) +
    statBar([['Строки',draft.length],['С замечаниями',bad,true],['Готовы',draft.length - bad]]) +
    `<section class="panel"><div class="panel-head"><h2>Предпросмотр цен</h2></div>
    ${table(['Артикул источника', 'Закупка', 'КурсВП', 'K1', 'K2', 'Розница', 'Проверка'], rows)}</section>
    <p class="notice" style="margin-top:16px">КурсВП задаётся вручную для валюты. При заполненном K2 он применяется вместо K1. Новый прайс влияет на новые расчёты в макете, сохранённые остаются со своей версией.</p>`;
}

function financeView() {
  const accounting = role === 'accounting';
  const income = state.finance.filter(item => item.kind === 'income').reduce((sum,item) => sum + item.amount,0);
  const spending = state.finance.filter(item => item.kind === 'expense').reduce((sum,item) => sum + item.amount,0);
  const records = state.finance.filter(item => accounting ? item.kind === 'expense' : financeFilter === 'all' || item.kind === financeFilter);
  const rows = records.map(item => `<tr>${cell(record(item.note, 'Операция №' + item.id))}
    ${cell(item.kind === 'income' ? badge('Приход','green') : badge('Расход','amber'))}
    ${cell(esc(item.party),'Контрагент')}
    ${cell(item.lead ? '№' + esc(item.lead) : '—','Заявка')}${cell(dateLabel(item.date),'Дата','nowrap')}
    ${cell(currency(item.amount),'Сумма','amount numeric')}</tr>`).join('');
  const caption = accounting ? 'Внести расход' : 'Внести операцию';
  const summary = accounting ? [['Всего расходов',currency(spending),true],['Операций',records.length],['Регион','Москва']]
    : [['Приходы',currency(income)],['Расходы',currency(spending)],['Разница по учёту',currency(income - spending),true]];
  return headline(accounting ? 'Расходы' : 'Оплаты и расходы', 'Учёт фактических операций по заказам московского пилота.',
    action(caption,'new-finance',{ style:'primary', glyph:'plus' })) +
    statBar(summary, 'finance-stats') +
    `<section class="panel">${accounting ? '' : `<div class="toolbar"><div class="tabs" aria-label="Тип операции">
      ${[['all','Все операции'],['income','Приходы'],['expense','Расходы']].map(([id,label]) => tab(label,'finance-tab',id,financeFilter)).join('')}
    </div></div>`}${table(['Операция','Тип','Контрагент','Заявка','Дата','Сумма'],rows)}</section>
    ${accounting ? '' : '<p class="notice" style="margin-top:16px">Разница относится к показанным операциям. Роль, подтверждающая поступления, определяется при настройке рабочего процесса.</p>'}`;
}

function auditView() {
  return headline('Журнал изменений','Действия с заявками, прайсами, каталогом и расчётами в демонстрационном контуре.') +
    `<section class="panel">${table(['Действие','Сотрудник','Время'],state.log.map(item => `<tr>
      ${cell(record(item.title,item.detail))}
      ${cell(esc(item.actor),'Сотрудник')}${cell(esc(item.time),'Время','numeric')}</tr>`).join(''))}</section>`;
}

const missing = section => back(section) + headline('Запись не найдена','Вернитесь к списку и выберите запись.');

function render(scroll = false) {
  let [view, id] = location.hash.slice(1).split('/');
  if (view === 'workspace' && workspace.childElementCount) return;
  if (view === 'workspace') view = 'leads';
  if (!view) view = 'leads';
  if (!can(mainSection(view))) {
    const first = navigation.flatMap(([, links]) => links).find(([, , , roles]) => roles.includes(role))[0];
    history.replaceState(null, '', '#' + first);
    view = first;
  }
  renderNavigation(mainSection(view));
  const quote = view === 'quote' ? quoteOf(id) : null;
  if (quote && role === 'manager' && quote.owner !== roleLabels[role][2]) {
    if (lastRead !== quote.id) {
      addLog('Открыт расчёт другого менеджера', 'Расчёт №' + quote.id + ' · ' + person(quote.owner));
      message('Просмотр расчёта записан в журнал.');
    }
    lastRead = quote.id;
  } else lastRead = '';
  switch (view) {
    case 'leads': workspace.innerHTML = leadsView(); showQueue(); break;
    case 'lead': workspace.innerHTML = leadView(leadOf(id)); break;
    case 'quotes': workspace.innerHTML = quotesView(); break;
    case 'quote': workspace.innerHTML = quoteView(quote); break;
    case 'production': workspace.innerHTML = productionView(); break;
    case 'task': workspace.innerHTML = taskView(state.tasks.find(item => item.id === id)); break;
    case 'catalog': workspace.innerHTML = catalogView(); break;
    case 'product': workspace.innerHTML = productView(state.products.find(item => item.id === id)); break;
    case 'prices': workspace.innerHTML = pricesView(); break;
    case 'import': workspace.innerHTML = importView(); break;
    case 'finance': workspace.innerHTML = financeView(); break;
    case 'audit': workspace.innerHTML = auditView(); break;
  }
  document.title = 'LEVONI · ' + (workspace.querySelector('h1')?.textContent || sectionName(mainSection(view)));
  if (scroll) {
    window.scrollTo(0, 0);
    workspace.focus({ preventScroll: true });
  }
}

const sources = ['Корзина витрины','Обращение по телефону','Корпоративная почта','Согласованный мессенджер','Расчёт по чертежу','Запрос спецификации'];

function showForm(title, command, id, fields, label) {
  dialog.innerHTML = `<div class="dialog-head"><h2 id="dialog-title">${esc(title)}</h2>
    <button type="button" class="icon-btn" data-action="close" aria-label="Закрыть">${icon('close')}</button></div>
    <form class="dialog-body" data-form="${command}" data-entity="${esc(id)}">
      <div class="form-rows">${fields}</div>
      <div class="actions">${action('Отмена','close')}<button class="btn primary" type="submit">${esc(label)}</button></div>
    </form>`;
  dialog.showModal();
}

function updateLead(lead, title, detail) {
  lead.time = time();
  lead.history.unshift({ time: lead.time, title, text: detail });
  addLog(title + ' · заявка №' + lead.id, detail);
}

function managerSpecification(quote, readyOnly = false) {
  const m = totals(quote);
  const q = quote.config;
  const d = managerColor(quote.decor);
  const split = q && managerSplit(q);
  const lead = leadOf(quote.lead);
  const metadata = [['Заявка', '№' + quote.lead], ['Изделие', lead?.title || 'Столешница'],
    ...(q ? [['Материал', managerMaterials[q.material]], ['Регион', managerRegions[q.region]]] : [])];
  const groups = readyOnly ? [] : [{ title:'Об изделии', rows:metadata }, ...individualGroups(quote,m).filter(group => group.rows.length),
    { title:'Итог индивидуального заказа', rows:[['Итого индивидуальные товары', '', currency(m.individual ?? m.total)]] }];
  const model = !readyOnly && q?.sink === 'integrated' ? castSinkCatalog[q.sinkModel] : null;
  const skirtImage = !readyOnly && q ? skirtImages[q.skirt] : '';
  const sinkDrawing = model ? model.drawing || 'assets/sink-demo-schematic.svg' : '';
  return {
    id: readyOnly ? `${quote.id}-ГТ` : quote.id,
    date: dateLabel(quote.date || priceDate(quote) || seedDate),
    manager: person(quote.owner), client:lead?.name || 'Не указан',
    individual: readyOnly ? [['Индивидуальные товары', 'В отдельной спецификации №' + quote.id]] : groups.flatMap(group => group.rows),
    ...(groups.length ? { groups } : {}),
    ready: split && !readyOnly && m.ready.length ? [['Готовые товары', `В отдельной спецификации №${quote.id}-ГТ`], ['Итого по этому документу', '', currency(0)]] : readyRows(m),
    total: currency(readyOnly ? m.readyTotal : split ? m.individual : m.total),
    note:quote.note || '',
    decorImage: !readyOnly && d.chip ? `assets/${d.chip}.webp` : '',
    edgeImage: readyOnly ? '' : 'assets/manager-edge.webp',
    edgeCaption: readyOnly ? '' : 'Кромка · демонстрационный образец',
    ...(skirtImage ? { skirtImage, skirtCaption:`${managerSkirts[q.skirt][0]} · демонстрационная схема` } : {}),
    ...(model?.image ? { sinkImage:model.image, sinkCaption:`${model.name} · демонстрационная иллюстрация` } : {}),
    ...(sinkDrawing ? { sinkDrawing, sinkDrawingCaption:model.drawing
      ? `${model.name} · демонстрационная схема, не рабочий чертёж`
      : 'Условная схема мойки без размеров · не чертёж выбранной модели' } : {}),
  };
}

async function quoteDownload(quote, readyOnly) {
  if (typeof downloadManagerSpecification !== 'function') {
    message('Модуль скачивания PDF пока недоступен.');
    return;
  }
  try {
    await downloadManagerSpecification(managerSpecification(quote, readyOnly));
    message('Спецификация PDF сформирована.');
  } catch {
    message('Не удалось сформировать PDF. Повторите скачивание.');
  }
}

function makeQuote(lead, config) {
  return { id:nextId(state.quotes,75), lead:lead.id, decor:config.decor, owner:lead.owner || 'elena',
    rate:managerRate(config,state.prices.active), priceVersion:state.prices.active, castRates:structuredClone(castPriceList(state.prices.active)), version:1, parent:'',
    state:'draft', time:time(), date:today(), note:'', config };
}

function makeQuoteVariant(source, reprice) {
  const config = structuredClone(source.config || legacyManagerConfig(source));
  const priceVersion = reprice ? state.prices.active : source.priceVersion;
  const rate = reprice ? managerRate(config,priceVersion) : source.rate;
  const version = 1 + Math.max(...state.quotes.filter(item => item.lead === source.lead).map(item => item.version));
  const castRates = structuredClone((!reprice && source.castRates) || castPriceList(priceVersion));
  if (config.sinkModel && !Object.hasOwn(castRates[config.processor] || {}, config.sinkModel)) config.sinkModel = '';
  const next = { ...source, config, rate, priceVersion, castRates, version, id:nextId(state.quotes,75), parent:source.id,
    owner:role === 'manager' ? roleLabels[role][2] : source.owner, state:'draft', time:time(), date:today() };
  state.quotes.unshift(next);
  addLog(`${reprice ? 'Пересчитан' : 'Создан'} вариант №${next.id}`, `На основе расчёта №${source.id} · ${priceLabel(next)}`);
  navigate('quote/' + next.id);
}

function changeManagerRows(quote, control, remove) {
  if (!quoteEditor(quote)) return;
  const form = document.querySelector('#quote-form');
  if (form?.dataset.entity !== quote.id) return;
  const emptyRows = { extras:{ label:'', price:0 }, leftovers:{ size:'', area:'', cost:0, include:false }, ready:{ sku:'', qty:1, discount:0 } };
  const names = { extras:'extraLabel', leftovers:'leftSize', ready:'readySku' };
  const { group, index } = control.dataset;
  if (!Object.hasOwn(emptyRows,group)) return;
  const draft = readQuoteForm(form,quote);
  if (remove) draft.config[group].splice(Number(index),1);
  else draft.config[group].push(emptyRows[group]);
  const prefixes = {extras:['extraPrice'],leftovers:['leftArea','leftCost'],ready:['readyQty','readyDiscount']};
  const removed = Number(index);
  const preserve = name => {
    const prefix = prefixes[group].find(key => name.startsWith(key));
    if (!remove || !prefix) return name;
    const i = Number(name.slice(prefix.length));
    return i === removed ? '' : prefix + (i > removed ? i - 1 : i);
  };
  refreshQuoteForm(form,quote,draft,remove ? '' : names[group] + (draft.config[group].length - 1),preserve);
  if (remove) form.querySelector(`[data-action="manager-add-row"][data-group="${group}"]`)?.focus({ preventScroll:true });
}

function closeMenu() {
  sidebar.classList.remove('open');
  document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');
}

function handleAction(control) {
  const { action: command, id } = control.dataset;
  const lead = leadOf(id);
  const quote = quoteOf(id);
  const task = state.tasks.find(item => item.id === id);
  switch (command) {
    case 'menu': {
      const open = sidebar.classList.toggle('open');
      control.setAttribute('aria-expanded',String(open));
      if (open) sidebar.querySelector('.nav-link')?.focus();
      break;
    }
    case 'close': dialog.close(); break;
    case 'filter-leads':
      stageFilter = id;
      document.querySelectorAll('[data-action="filter-leads"]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.id === id)));
      showQueue();
      break;
    case 'select-lead':
      selectedLead = id;
      document.querySelectorAll('[data-action="select-lead"]').forEach(button => {
        const active = button.dataset.id === id;
        button.setAttribute('aria-pressed',String(active));
        button.closest('tr').classList.toggle('selected',active);
      });
      document.querySelector('#inspector').innerHTML = leadPreview(lead);
      if (matchMedia('(max-width: 1060px)').matches) navigate('lead/' + id);
      break;
    case 'new-lead':
      showForm('Новая заявка',command,'',
        '<p class="notice">Используйте только вымышленные имя и телефон. Это демо: данные остаются в этом браузере, заявка не отправляется в CRM.</p>' +
        field('Имя клиента','<input name="name" required maxlength="60" autocomplete="off">') +
        field('Телефон','<input name="phone" type="tel" required maxlength="40" autocomplete="off">') +
        field('Канал',`<select name="source">${options(managerChannels.map(item => [item,item]),managerChannels[0])}</select>`) +
        field('Декор',`<select name="decor">${options(state.decors.map(item => [item.id, item.code + ' · ' + item.color]),'a101')}</select>`) +
        field('Комментарий','<textarea name="note" maxlength="350"></textarea>'),'Создать заявку');
      break;
    case 'contact':
      showForm('Записать контакт',command,id,
        field('Канал',`<select name="channel">${options(sources.slice(1,4).map(item => [item,item]),sources[1])}</select>`) +
        field('Что обсудили','<textarea name="text" required maxlength="500"></textarea>') +
        field('Следующее действие',`<input name="next" maxlength="100" value="${esc(lead.next)}" required>`),'Сохранить контакт');
      break;
    case 'edit-lead': {
      const editableStages = ['new','clarify','measure'];
      const allowed = editableStages.includes(lead.stage) ? editableStages : [lead.stage];
      showForm('Этап заявки',command,id,field('Этап',`<select name="stage">${options(allowed.map(stage => [stage,stages[stage][0]]),lead.stage)}</select>`) +
      field('Следующее действие',`<input name="next" maxlength="100" value="${esc(lead.next)}" required>`),'Сохранить этап');
      break;
    }
    case 'assign':
      showForm('Назначить ответственного',command,id,
        field('Менеджер',`<select name="owner">${options(Object.entries(staff).slice(0,2),lead.owner)}</select>`),'Назначить');
      break;
    case 'new-quote': {
      if (!canManageLead(lead)) break;
      const same = state.quotes.find(item => item.lead === id);
      if (same) { navigate('quote/' + same.id); break; }
      const q = makeQuote(lead,cartOf(lead) || newManagerConfig({ decor:lead.decor }));
      state.quotes.unshift(q);
      updateLead(lead,'Создан черновик расчёта','Расчёт №' + q.id);
      navigate('quote/' + q.id);
      break;
    }
    case 'manager-add-row': changeManagerRows(quote,control,false); break;
    case 'manager-remove-row': changeManagerRows(quote,control,true); break;
    case 'copy-quote': {
      if (!quote || staleQuote(quote)) break;
      const form = document.querySelector('#quote-form');
      const source = quoteEditor(quote) ? validQuoteDraft(form,quote) : quote;
      if (source) makeQuoteVariant(source,false);
      break;
    }
    case 'reprice-quote': {
      if (quote && staleQuote(quote)) makeQuoteVariant(quote,true);
      break;
    }
    case 'export-quote':
    case 'export-ready': {
      if (!quote || staleQuote(quote)) break;
      const form = document.querySelector('#quote-form');
      const data = quoteEditor(quote) ? validQuoteDraft(form,quote) : quote;
      if (!data) break;
      if (!quoteReady(data)) { message('Для спецификации укажите параметры изделия.'); break; }
      if (command === 'export-ready' && (!data.config || !managerSplit(data.config) || !data.config.ready.some(row => row.sku))) break;
      quoteDownload(data,command === 'export-ready');
      break;
    }
    case 'agree-quote': {
      if (!quoteEditor(quote) || !canManageLead(leadOf(quote.lead))) break;
      const data = validQuoteDraft(document.querySelector('#quote-form'),quote);
      if (!data) break;
      showForm('Зафиксировать согласование',command,id,`<p>Сохранится расчёт №${quote.id}, вариант ${quote.version}, на ${currency(totals(data).total)} по прайсу ${esc(priceLabel(data))}.</p>
        <label class="check"><input type="checkbox" required name="confirmation">Клиент подтвердил сумму и состав</label>`,'Зафиксировать согласование');
      break;
    }
    case 'send-task': {
      const prior = state.tasks.find(item => item.quote === id || item.lead === quote.lead);
      if (prior) { navigate('task/' + prior.id); break; }
      if (staleQuote(quote) || quote.state !== 'agreed' || (quote.config && quote.config.processor !== 'own') || !canManageLead(leadOf(quote.lead))) break;
      showForm('Передать в производство',command,id,
        `<p>В задание войдут расчёт №${quote.id}, размеры и прайс ${esc(priceLabel(quote))}.</p><p class="notice">Для макета укажите название тестового чертежа. Сам файл не загружается.</p>` +
        field('Название файла чертежа','<input name="drawing" required maxlength="120" placeholder="Эскиз столешницы.pdf">') +
        field('Ответственный производства','<input name="responsible" required maxlength="80" placeholder="Имя мастера (демо)">') +
        field('Плановый срок','<input name="due" type="date" required value="2026-11-21">') +
        field('Примечание к заданию','<textarea name="note" maxlength="350"></textarea>'),'Создать задание');
      break;
    }
    case 'update-task':
      showForm('Этап производства',command,id,
        field('Этап',`<select name="state">${options(Object.entries(taskStages).map(([key,[label]])=>[key,label]),task.state)}</select>`) +
        field('Ответственный производства',`<input name="responsible" required maxlength="80" value="${esc(task.responsible || '')}">`) +
        field('Плановый срок',`<input name="due" type="date" required value="${task.due}">`) +
        `<label class="check"><input type="checkbox" name="dueConfirmed"${task.dueConfirmed ? ' checked' : ''}>Этот срок подтверждён производством</label>`,'Сохранить этап');
      break;
    case 'task-cost':
      showForm('Плановые затраты',command,id,
        [['Материал','materials'],['Работы','works'],['Комплектующие','parts']].map(([label,name]) =>
          field(label + ', ₽',`<input type="number" name="${name}" required min="0" max="100000000" value="${task[name]}">`)).join(''),'Сохранить затраты');
      break;
    case 'catalog-tab':
      catalogMode = id; render(); document.querySelector(`[data-action="catalog-tab"][data-id="${id}"]`)?.focus(); break;
    case 'new-product':
      showForm('Новая позиция каталога',command,'',
        field('Название','<input name="name" required maxlength="80" value="Кухонная столешница">') +
        field('Артикул','<input name="sku" required maxlength="24" placeholder="ST-A101-2">') +
        field('Декор',`<select name="decor">${options(state.decors.map(item=>[item.id,item.code+' · '+item.color]),'a101')}</select>`) +
        '<p class="price-error" role="alert"></p>','Создать черновик');
      break;
    case 'start-import':
      if (!state.prices.draft) {
        state.prices.draft = draftPrice();
        addLog('Открыта проверка демопрайса','Две строки, исходный пример сохранён');
      }
      navigate('import'); break;
    case 'fix-price': {
      const row = state.prices.draft.find(item => item.id === id);
      const input = (name, value, min, max, required = true) => `<input type="number" name="${name}" min="${min}" max="${max}" step="0.01" value="${value ?? ''}"${required ? ' required' : ''}>`;
      showForm('Строка ' + row.original,command,id,
        field('Декор',`<select name="decor" required>${options([['','Выберите декор'],...state.decors.map(item=>[item.id,item.code+' · '+item.color])],row.decor)}</select>`) +
        `<div class="fields">${field('Закупочная цена',input('cost',row.cost,0.01,1e7))}
        ${field('Валюта',`<select name="currency">${options([['RUB','RUB'],['USD','USD'],['EUR','EUR']],row.currency)}</select>`)}
        ${field('КурсВП',input('exchange',row.exchange,0.01,1000))}
        ${field('K1',input('k1',row.k1,0.01,10))}</div>${field('K2, если задан',input('k2',row.k2,0.01,10,false))}
        <p class="secondary-line">Для RUB используется курс 1. K2 заменяет K1.</p>`,'Сохранить строку');
      break;
    }
    case 'publish-price':
      showForm('Опубликовать демоверсию',command,'',
        '<p>Версия станет действующей только в этом макете. Сохранённые расчёты останутся с исходной ценой.</p>','Опубликовать демоверсию');
      break;
    case 'finance-tab':
      financeFilter = id; render(); document.querySelector(`[data-action="finance-tab"][data-id="${id}"]`)?.focus(); break;
    case 'new-finance':
      showForm(role === 'accounting' ? 'Внести расход' : 'Внести операцию',command,'',
        `<div class="fields">${field('Тип',`<select name="kind">${options(role === 'accounting' ? [['expense','Расход']] : [['income','Приход'],['expense','Расход']],'expense')}</select>`)}
        ${field('Сумма, ₽','<input type="number" name="amount" min="1" max="100000000" required>')}
        ${field('Дата',`<input type="date" name="date" required value="${seedDate}">`)}
        ${field('Заявка',`<select name="lead">${options([['','Без заявки'],...state.leads.map(item => [item.id,'№'+item.id+(role === 'accounting' ? '' : ' · '+item.name)])],'')}</select>`)}</div>` +
        field('Контрагент','<input name="party" required maxlength="70">') + field('Назначение','<textarea name="note" required maxlength="120"></textarea>'),'Сохранить операцию');
      break;
  }
}

function handleDialog(form) {
  const { form: command, entity: id } = form.dataset;
  const fields = Object.fromEntries(new FormData(form));
  const text = key => String(fields[key] || '').trim();
  const lead = leadOf(id);
  const quote = quoteOf(id);
  const task = state.tasks.find(item => item.id === id);
  let target = '';
  let done = 'Изменения сохранены.';
  switch (command) {
    case 'new-lead': {
      if (!text('name') || !text('phone')) return;
      const item = { id: nextId(state.leads,134), name:text('name'), title:'Столешница для кухни', phone:text('phone'), source:text('source'),
        note:text('note'), decor:text('decor'), area:null, estimate:null, owner:'elena', stage:'new', next:'Связаться с клиентом', time:time(), history:[] };
      state.leads.unshift(item);
      selectedLead = item.id;
      updateLead(item,'Заявка создана',item.source);
      target = 'lead/' + item.id;
      done = 'Заявка создана.';
      break;
    }
    case 'contact':
      lead.next = text('next');
      updateLead(lead,text('channel'),text('text'));
      done = 'Контакт добавлен.';
      break;
    case 'edit-lead':
      lead.stage = text('stage');
      lead.next = text('next');
      updateLead(lead,'Обновлён этап',stages[lead.stage][0]);
      break;
    case 'assign':
      lead.owner = text('owner');
      updateLead(lead,'Назначен ответственный',person(lead.owner));
      break;
    case 'agree-quote': {
      if (!quoteEditor(quote) || !canManageLead(leadOf(quote.lead)) || !fields.confirmation) return;
      const data = validQuoteDraft(document.querySelector('#quote-form'),quote);
      if (!data) return;
      Object.assign(quote,data,{ state:'agreed',time:time(),date:today() });
      const item = leadOf(quote.lead);
      if (item.stage !== 'production' && item.stage !== 'complete') {
        item.stage = 'agreed';
        item.next = quote.config.processor === 'own' ? 'Подготовить производственное задание' : 'Согласовать передачу партнёру вне макета';
      }
      updateLead(item,'Согласован расчёт №' + quote.id,currency(totals(quote).total) + ' · ' + quote.priceVersion);
      done = 'Согласованный вариант сохранён.';
      break;
    }
    case 'send-task': {
      const prior = state.tasks.find(item => item.quote === id || item.lead === quote.lead);
      if (prior) { target = 'task/' + prior.id; break; }
      if (staleQuote(quote) || quote.state !== 'agreed' || (quote.config && quote.config.processor !== 'own') || !canManageLead(leadOf(quote.lead))) return;
      const item = leadOf(quote.lead);
      const entry = { id:nextId(state.tasks,31), quote:id, lead:item.id, state:'queued', due:text('due'), drawing:text('drawing'), responsible:text('responsible'), dueConfirmed:false,
        note:text('note'), materials:0, works:0, parts:0 };
      state.tasks.unshift(entry);
      item.stage = 'production';
      item.next = 'Подтвердить запуск производства';
      updateLead(item,'Передано в производство','Задание №' + entry.id + ' · расчёт №' + id);
      target = 'task/' + entry.id;
      done = 'Производственное задание создано.';
      break;
    }
    case 'update-task': {
      task.state = text('state');
      task.due = text('due');
      task.responsible = text('responsible');
      task.dueConfirmed = Boolean(fields.dueConfirmed);
      const item = leadOf(task.lead);
      item.stage = task.state === 'done' ? 'complete' : 'production';
      item.next = task.state === 'done' ? 'Проверить результат с клиентом' : 'Контролировать срок исполнения';
      updateLead(item,'Задание №' + task.id + ' обновлено',taskStages[task.state][0] + ' · срок ' + dateLabel(task.due) + (task.dueConfirmed ? ' подтверждён' : ' ожидает подтверждения') + ' · ' + task.responsible);
      break;
    }
    case 'task-cost':
      Object.assign(task,{ materials:Number(fields.materials), works:Number(fields.works), parts:Number(fields.parts) });
      addLog('Уточнены затраты задания №' + task.id,currency(task.materials + task.works + task.parts));
      break;
    case 'new-product': {
      const sku = text('sku');
      if (!sku || state.products.some(item => item.sku.toLowerCase() === sku.toLowerCase())) {
        form.querySelector('.price-error').textContent = 'Укажите свободный артикул.';
        return;
      }
      const entry = { id:'product-' + Date.now(), name:text('name'), sku, decor:text('decor'), state:'draft',
        order:state.products.length + 1, image:productImage(text('decor')) };
      state.products.push(entry);
      addLog('Создана позиция каталога',sku);
      target = 'product/' + entry.id;
      done = 'Черновик позиции создан.';
      break;
    }
    case 'fix-price': {
      const item = state.prices.draft.find(row => row.id === id);
      const cur = text('currency');
      Object.assign(item,{ decor:text('decor'), cost:Number(fields.cost), currency:cur, exchange:cur === 'RUB' ? 1 : Number(fields.exchange),
        k1:Number(fields.k1), k2:fields.k2 === '' ? null : Number(fields.k2) });
      save();
      done = 'Строка проверена.';
      break;
    }
    case 'publish-price': {
      const draft = state.prices.draft;
      if (!draft || draft.some(item => !item.decor) || new Set(draft.map(item => item.decor)).size !== draft.length) return;
      const version = 'v' + (1 + Number(state.prices.active.slice(1)));
      const snapshot = () => Object.fromEntries(state.decors.map(item => [item.id,item.rate]));
      const current = state.prices.versions.find(item => item.id === state.prices.active);
      if (current && !current.rates) current.rates = snapshot();
      draft.forEach(row => { decorOf(row.decor).rate = priceFor(row); });
      state.prices.versions.forEach(item => { item.active = false; });
      state.prices.versions.unshift({ id:version, date:seedDate, source:'Демонстрационный импорт', active:true, rates:snapshot(), rows:draft, castRates:structuredClone(castPriceList(state.prices.active)) });
      state.prices.active = version;
      state.prices.draft = null;
      addLog('Опубликован демопрайс ' + version,draft.length + ' строки · Москва и область');
      target = 'prices';
      done = 'Демоверсия опубликована в макете.';
      break;
    }
    case 'new-finance': {
      const entry = { id:nextId(state.finance,67), kind:text('kind'), amount:Number(fields.amount), date:text('date'),
        lead:text('lead'), party:text('party'), note:text('note') };
      state.finance.unshift(entry);
      addLog('Внесена операция №' + entry.id,currency(entry.amount) + ' · ' + entry.note);
      done = 'Операция сохранена.';
      break;
    }
  }
  dialog.close();
  if (target) navigate(target);
  else render();
  message(done);
}

workspace.addEventListener('input', event => {
  const input = event.target;
  const query = input.dataset.query;
  if (query) {
    searchTerms[query] = input.value;
    if (query === 'leads') showQueue();
    else document.querySelector('#list-results').innerHTML = query === 'quotes' ? archiveRows() : catalogRows();
  }
  const form = input.form;
  if (form?.id === 'quote-form' && input.name && input.tagName !== 'SELECT' && input.type !== 'checkbox') {
    const quote = quoteOf(form.dataset.entity);
    if (quoteEditor(quote)) showQuoteDraft(quote,readQuoteForm(form,quote),form);
  }
});

workspace.addEventListener('change', event => {
  const input = event.target;
  const form = input.form;
  if (form?.id !== 'quote-form' || !input.name || (input.tagName !== 'SELECT' && input.type !== 'checkbox')) return;
  const quote = quoteOf(form.dataset.entity);
  if (!quoteEditor(quote)) return;
  const draft = readQuoteForm(form,quote);
  if (input.name === 'delivery') draft.config.deliveryOverride = null;
  if (input.name.startsWith('leftInclude') || input.name.startsWith('readySku') || input.name === 'slab') showQuoteDraft(quote,draft,form);
  else refreshQuoteForm(form,quote,draft,input.name);
});

dialog.addEventListener('input', event => {
  const form = event.target.form;
  if (form?.dataset.form === 'update-task' && event.target.name === 'due') {
    const task = state.tasks.find(item => item.id === form.dataset.entity);
    form.elements.dueConfirmed.checked = task.due === event.target.value && Boolean(task.dueConfirmed);
  }
});

document.addEventListener('click', event => {
  const control = event.target.closest('[data-action]');
  if (control) handleAction(control);
  if (event.target.closest('.nav-link') || (sidebar.classList.contains('open') &&
    !event.target.closest('.sidebar, .menu-toggle'))) closeMenu();
});

document.addEventListener('submit', event => {
  const form = event.target;
  event.preventDefault();
  if (form.dataset.form) { handleDialog(form); return; }
  if (form.id === 'product-form') {
    const item = state.products.find(product => product.id === form.dataset.entity);
    const values = Object.fromEntries(new FormData(form));
    const sku = values.sku.trim();
    if (!sku || state.products.some(product => product !== item && product.sku.toLowerCase() === sku.toLowerCase())) {
      document.querySelector('#product-error').textContent = 'Укажите свободный артикул.';
      return;
    }
    Object.assign(item,{ name:values.name.trim(), sku, order:Number(values.order), decor:values.decor, state:values.state });
    addLog('Обновлена позиция каталога',sku);
    render();
    message('Позиция сохранена.');
  }
});

document.querySelector('#role').addEventListener('change', event => {
  role = event.target.value;
  document.querySelector('#avatar').textContent = roleLabels[role][1];
  closeMenu();
  render(true);
});
document.querySelector('.menu-toggle').innerHTML = icon('menu');
window.addEventListener('hashchange', () => { closeMenu(); render(true); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && sidebar.classList.contains('open')) {
    closeMenu();
    document.querySelector('.menu-toggle').focus();
  }
});
for (const quote of state.quotes) {
  if (!quote.config && quote.state === 'draft') quote.config = legacyManagerConfig(quote);
}
render();
