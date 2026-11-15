const icons = {
  orders: '<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M8 5V3h8v2M7 10h10m-10 5h7"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18m-14 5h3m4 0h3"/>',
  price: '<path d="M20.5 13 12 21 3 12V3h9z"/><circle cx="7.5" cy="7.5" r="1"/>',
  wallet: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M21 10h-5a2 2 0 0 0 0 4h5m-5-2h.01"/>',
  arrow: '<path d="M5 12h14m-6-6l6 6-6 6"/>',
  back: '<path d="M19 12H5m6-6-6 6 6 6"/>',
  file: '<path d="M5 3h9l5 5v13H5zM14 3v6h5m-11 4h8m-8 4h8"/>',
  search: '<circle cx="10.8" cy="10.8" r="6"/><path d="m15.5 15.5 4 4"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
};

const stages = {
  received: ['Новая заявка', 'wine', 0],
  accepted: ['Принята', 'info', 1],
  booked: ['Замер назначен', 'amber', 1],
  measured: ['Замер выполнен', 'green', 2],
  repriced: ['Пересчёт сохранён', 'info', 3],
  contracted: ['Договор оформлен', 'green', 4],
  making: ['Изготовление', 'info', 4],
  delivery: ['Доставка назначена', 'amber', 4],
  delivered: ['Доставлен', 'green', 4],
  install: ['Монтаж назначен', 'amber', 4],
  installed: ['Монтаж завершён', 'green', 5],
};

const steps = ['Заявка', 'Замер', 'Пересчёт', 'Договор', 'Исполнение'];
const nextSteps = {
  received: ['Принять заявку', 'Менеджер согласовал с клиентом следующий шаг. Примите заявку, чтобы запланировать замер.', 'accept'],
  accepted: ['Назначить замер', 'Укажите дату, время и замерщика после согласования с клиентом.', 'book'],
  booked: ['Внести результаты замера', 'Запишите точные размеры и примечания. Они перейдут в пересчёт.', 'measure'],
  measured: ['Пересчитать заказ', 'Проверьте размеры, декор и услуги по переданному прайсу.', 'estimate'],
  repriced: ['Оформить договор', 'Зафиксируйте согласованную с клиентом итоговую сумму и реквизиты договора.', 'contract'],
  contracted: ['Начать изготовление', 'Отметьте запуск заказа по согласованному варианту.', 'make'],
  making: ['Назначить доставку', 'Согласуйте дату доставки с клиентом и укажите ответственного.', 'delivery'],
  delivery: ['Подтвердить доставку', 'Когда изделие доставлено, зафиксируйте фактическую дату.', 'deliver'],
  delivered: ['Назначить монтаж', 'Укажите дату, время монтажа и ответственного.', 'install'],
  install: ['Завершить монтаж', 'После монтажа зафиксируйте дату и результат. Фото и акт можно добавить в документы заказа.', 'finish'],
};

const price = { version: 'НС-3', date: '2026-11-12', rates: { a101: 21900, a205: 24500 }, edge: 1650, cut: 3200, delivery: 2600, installation: 12000, installRate: .1 };
const decors = { a101: ['A101', 'Белый снег'], a205: ['A205', 'Графит'] };
const docTypes = ['Чертёж', 'Договор', 'Фото', 'Акт', 'Рекомендация'];
const navigation = [
  ['orders','Заказы','orders'],
  ['calendar','Календарь замеров','calendar'],
  ['prices','Прайсы и бренды','price'],
  ['accounts','Счета LEVONI','wallet'],
];
const date = value => value ? value.split('-').reverse().join('.') : '—';
const money = value => Math.round(value).toLocaleString('ru-RU') + ' ₽';
const numeric = value => value.toLocaleString('ru-RU', { maximumFractionDigits: 3 });
const dateTime = item => item ? date(item.date) + (item.time ? ' в ' + item.time : '') : '—';
const decorName = code => 'Acrylica ' + decors[code][0] + ' «' + decors[code][1] + '»';
const stamp = () => new Intl.DateTimeFormat('ru-RU', { timeZone:'Asia/Novosibirsk', day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit' }).format(new Date());
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;

function example(id, name, decor, stage, area, amount) {
  return { id,name,stage, decor, price:structuredClone(price), title:'Кухонная столешница', city:'Новосибирск',
    phone:'+7 900 000-02-' + id.slice(-2), address:'Адрес замера уточняется',
    manager:'Елена Орлова', sent:'15.11, 14:24', source:'Корзина витрины',
    initial:{ area,amount,decor }, plan:{}, documents:[], estimates:[], contract:null,
    history:[{ at:'15.11, 14:24', label:'Менеджер передал заявку', text:'Следующий шаг согласован с клиентом: замер.' }],
  };
}

const first = example('248','Мария Соколова','a101','received',2.2,48180);
const booked = example('247','Алексей Миронов','a205','booked',1.8,44100);
booked.sent = '15.11, 11:32';
booked.history[0].at = booked.sent;
booked.address = 'Демонстрационный объект, Новосибирск';
booked.plan.measure = { date:'2026-11-19', time:'11:30', owner:'Илья Морозов' };
booked.history.unshift({ at:'15.11, 15:02', label:'Замер назначен', text:'19.11.2026 в 11:30, Илья Морозов.' });
const making = example('246','Ксения Лебедева','a101','making',1.9,41610);
making.sent = '13.11, 16:20';
making.history[0].at = making.sent;
making.address = 'Демонстрационный объект, Новосибирск';
making.plan.measure = { date:'2026-11-14', time:'10:00', owner:'Илья Морозов' };
making.measures = { length:2850, depth:650, units:1, note:'' };
making.estimates = [{ ...making.measures, id:1, decor:'a101', edge:'straight', cut:true, delivery:true, install:false, price:structuredClone(price), at:'14.11, 16:30' }];
making.contract = { number:'НС-246', date:'2026-11-14', amount:46370, estimate:1, prepayment:23000, paidDate:'2026-11-14', note:'' };
making.plan.making = { date:'2026-11-20', owner:'Сергей Власов' };
making.history.unshift({ at:'15.11, 10:10', label:'Заказ передан в изготовление', text:'Ответственный Сергей Власов.' });

const storageKey = 'levoni.partner.prototype.1';
function load() {
  try { return JSON.parse(localStorage.getItem(storageKey))?.orders || structuredClone([first,booked,making]); }
  catch { return structuredClone([first,booked,making]); }
}

let orders = load();
let selectedId = '248';
let filter = 'all';
let query = '';
let labelIndex = 0;
let messageTimer;
const workspace = document.querySelector('#workspace');
const navigationElement = document.querySelector('#navigation');
const sidebar = document.querySelector('#sidebar');
const dialog = document.querySelector('#dialog');
const notification = document.querySelector('#notification');

function message(text) {
  clearTimeout(messageTimer);
  notification.textContent = text;
  messageTimer = setTimeout(() => { notification.textContent = ''; }, 3200);
}

function save(order, label, text = '') {
  order.history.unshift({ at:stamp(), label,text });
  try { localStorage.setItem(storageKey, JSON.stringify({orders})); }
  catch { message('Изменение доступно до закрытия этой вкладки.'); }
}

const navigate = path => { if (location.hash === '#' + path) render(true); else location.hash = path; };
const orderOf = id => orders.find(order => order.id === id);
const byCurrent = () => orderOf(location.hash.slice(1).split('/')[1]);
const badge = (label,tone = '') => `<span class="badge ${tone}">${esc(label)}</span>`;
const stateBadge = order => badge(stages[order.stage][0], stages[order.stage][1]);
const button = (label,action,{ id='', style='', glyph='', extra='' }={}) =>
  `<button type="button" class="btn ${style}" data-action="${action}" ${id ? `data-id="${id}"` : ''} ${extra}>${glyph ? icon(glyph) : ''}${esc(label)}</button>`;
const link = (label,path,style='') => `<a class="btn ${style}" href="#${path}">${esc(label)}</a>`;
const title = (heading,sub,action='',status='') => `<div class="page-head"><div><div class="page-title-line"><h1>${esc(heading)}</h1>${status}</div><p>${esc(sub)}</p></div>${action? `<div class="actions">${action}</div>` : ''}</div>`;
const back = (label, route) => `<a class="back-link" href="#${route}">${icon('back')}${esc(label)}</a>`;
const facts = items => `<dl class="facts">${items.map(([key,val])=>`<div><dt>${esc(key)}</dt><dd>${esc(val)}</dd></div>`).join('')}</dl>`;
const panel = (heading,content,actions='',css='') => `<section class="panel ${css}"><div class="panel-head"><h2>${esc(heading)}</h2>${actions}</div><div class="panel-body">${content}</div></section>`;
const opt = (items,value='') => items.map(([id,label])=>`<option value="${esc(id)}"${id===value?' selected':''}>${esc(label)}</option>`).join('');
const priceLabel = order => order.price.version + ' от ' + date(order.price.date);
const row = (label,value,total=false) => `<div class="money-line ${total?'total':''}"><span>${esc(label)}</span><strong class="numeric nowrap">${esc(value)}</strong></div>`;
const photo = `<img src="../admin/assets/countertop.webp" class="thumb" alt="">`;
const swatch = key => `<img src="../admin/assets/${key}s.webp" class="thumb" alt="">`;

function field(label,html) {
  const id = 'partner-field-' + ++labelIndex;
  const control = html.replace(/^<(input|select|textarea)\b/,tag=>`${tag} id="${id}"`);
  return `<div class="field"><label for="${id}">${esc(label)}</label>${control}</div>`;
}

function totals(item, tariff) {
  const area = item.length * item.depth * item.units / 1e6;
  const material = Math.round(area * tariff.rates[item.decor]);
  const edge = item.edge === 'round' ? tariff.edge * item.units : 0;
  const cut = item.cut ? tariff.cut * item.units : 0;
  const delivery = item.delivery ? tariff.delivery : 0;
  const install = item.install ? Math.max(tariff.installation, Math.round((material + edge + cut) * tariff.installRate)) : 0;
  return { area,material,edge,cut,delivery,install,total:material + edge + cut + delivery + install };
}

const estimateTotal = item => totals(item,item.price).total;
const selectedEstimate = order => order.estimates.find(item => order.contract?.estimate === item.id) || order.estimates[0];
const displayAmount = order => order.contract ? money(order.contract.amount) : order.estimates.length ? money(estimateTotal(order.estimates[0])) : money(order.initial.amount);
const stepper = order => {
  const current = stages[order.stage][2];
  return `<ol class="workflow" aria-label="Этапы заказа">${steps.map((name,i)=>`<li ${current===i?'aria-current="step"':''} class="${i<current?'done':''}">
    <span class="step-number" aria-hidden="true">${i<current?'✓':i+1}</span><span>${name}</span></li>`).join('')}</ol>`;
};

function renderNavigation(current) {
  navigationElement.innerHTML = navigation.map(([id,label,glyph])=>`<a class="nav-link" href="#${id}" ${id===current?'aria-current="page"':''}>${icon(glyph)}${label}</a>`).join('');
}

function nextCard(order) {
  const next = nextSteps[order.stage];
  const description = order.stage === 'booked'
    ? 'Визит ' + dateTime(order.plan.measure) + ' по местному времени. Замерщик ' + order.plan.measure.owner + '.'
    : next?.[1];
  return `<section class="panel action-panel"><div class="panel-body">
    <h2>${next?'Следующий шаг':'Контроль результата'}</h2>
    <p class="muted">${next? esc(description) : 'Центральная команда LEVONI связывается с клиентом и проверяет результат и сумму.'}</p>
    ${next ? button(next[0],next[2],{id:order.id,style:'primary full',glyph:'arrow'}) : link('Открыть документы','order/'+order.id+'/docs','outline full')}
    </div></section>`;
}

function visibleOrders() {
  const term = query.trim().toLowerCase();
  return orders.filter(o => {
    const group = filter === 'all' || filter === 'inbox' && o.stage === 'received' || filter === 'active' && !['received','installed'].includes(o.stage) || filter === 'done' && o.stage === 'installed';
    return group && [o.id,o.name,o.title,decors[o.decor][0]].join(' ').toLowerCase().includes(term);
  });
}

function leadPreview(order) {
  if (!order) return '<p class="panel-body muted">Выберите заказ из списка.</p>';
  return `<div class="inspector-heading"><p>Заказ №${order.id}</p>${stateBadge(order)}</div><div class="panel-body">
    <div class="inspect-lead"><h2>${esc(order.name)}</h2><p class="secondary-line">${order.city} · ${esc(order.source)}</p></div>
    <div class="product-teaser">${photo}<div><strong>${esc(order.title)}</strong><p class="secondary-line">${esc(decorName(order.decor))}</p></div></div>
    ${facts([['Сумма на текущем этапе',displayAmount(order)],['Прайс',priceLabel(order)],['Менеджер LEVONI',order.manager]])}
    <div class="next-step"><p class="secondary-line">Следующий шаг</p><strong>${nextSteps[order.stage]?.[0] || 'Контроль результата LEVONI'}</strong></div>
    ${link('Открыть заказ','order/'+order.id,'primary full')}</div>`;
}

function fillQueue() {
  const items=visibleOrders();
  const selected=items.find(o=>o.id===selectedId) || items[0];
  selectedId=selected?.id || '';
  document.querySelector('#orders-list').innerHTML = `<div class="table-wrap"><table class="data-table responsive queue-table">
    <thead><tr><th scope="col">Заказ и клиент</th><th scope="col">Этап</th><th scope="col">Сумма</th><th scope="col">Передан</th></tr></thead><tbody>
    ${items.map(o=>`<tr class="order-row ${o.id===selectedId?'selected':''}"><td>
      <button type="button" class="record" data-action="select" data-id="${o.id}" aria-pressed="${o.id===selectedId}">${swatch(o.decor)}<span>
      <strong>${esc(o.title)} · ${decors[o.decor][0]}</strong><span class="secondary-line"><span class="order-id">№${o.id}</span> · ${esc(o.name)}</span></span></button>
      </td><td>${stateBadge(o)}</td><td class="amount numeric">${displayAmount(o)}</td><td class="nowrap muted">${o.sent}</td></tr>`).join('') ||
      '<tr><td colspan="4"><p class="empty">Заказы по этим условиям не найдены.</p></td></tr>'}
    </tbody></table></div><div class="table-end">Показано ${items.length} из ${orders.length}</div>`;
  document.querySelector('#order-preview').innerHTML=leadPreview(selected);
}

function queueView() {
  const filters=[['all','Все'],['inbox','Входящие'],['active','В работе'],['done','Завершённые']];
  return title('Заказы', 'Заявки и заказы вашей организации в Новосибирске.') +
    `<div class="partner-queue"><section class="panel" aria-label="Список заказов"><div class="toolbar">
      <div class="tabs" aria-label="Фильтр заказов">${filters.map(([id,name])=>button(name,'filter',{id,extra:`aria-pressed="${filter===id}"` })).join('')}</div>
      <label class="search">${icon('search')}<span class="sr-only">Поиск заказов</span><input id="order-search" type="search" placeholder="Номер или клиент" value="${esc(query)}"></label>
      </div><div id="orders-list"></div></section><aside id="order-preview" class="panel inspector" aria-label="Выбранный заказ"></aside></div>`;
}

function visitInfo(order) {
  const visit=order.plan.measure;
  const measures=order.measures;
  if (!visit && !measures) return '';
  return panel('Замер', facts([
    ['Запланировано',dateTime(visit)],
    ['Замерщик',visit?.owner || '—'],
    ['Результат', measures ? measures.length + ' × ' + measures.depth + ' мм' : 'Ожидается'],
    ...(measures ? [['Дата замера',date(measures.date || visit?.date)],['Деталей',measures.units + ' шт.']] : []),
  ]) + (measures?.note ? `<p class="notice fact-text">${esc(measures.note)}</p>` : ''));
}

function quoteInfo(order) {
  const latest=selectedEstimate(order);
  if (!latest) return '';
  return panel('Расчёт после замера', facts([
    ['Переданная сумма',money(order.initial.amount)],
    ['Вариант','№' + latest.id],
    ['Декор',decorName(latest.decor)],
    ['Прайс',latest.price.version+' от '+date(latest.price.date)],
    ['Сумма пересчёта',money(estimateTotal(latest))],
    ...(order.contract ? [['Договор',money(order.contract.amount)]] : []),
  ]) + `<div class="actions fact-text">${button('Скачать спецификацию','spec',{id:order.id,glyph:'file'})}${order.stage==='repriced'?link('Новый вариант','estimate/'+order.id):''}</div>`);
}

function executionInfo(order) {
  if (!order.contract) return '';
  const c=order.contract;
  const values=[
    ['Договор',c.number+' от '+date(c.date)],
    ['Итог договора',money(c.amount)],
    ['Предоплата клиентом',c.prepayment ? money(c.prepayment)+' от '+date(c.paidDate) : 'Ожидается'],
  ];
  const dates=[['making','Готовность'],['delivery','Доставка назначена'],['delivered','Доставка выполнена'],['install','Монтаж назначен'],['finish','Монтаж завершён']];
  for(const [key,label] of dates) {
    const entry=order.plan[key];
    if(entry) values.push([label,dateTime(entry)+' · '+entry.owner]);
  }
  if(order.stage==='installed') values.push(['Проверка LEVONI','Ожидается']);
  const actions = !c.prepayment ? `<div class="actions fact-text">${button('Записать предоплату','payment',{id:order.id,style:'small'})}</div>` : '';
  return panel('Договор и исполнение',facts(values)+actions);
}

function orderTabs(order,tab) {
  return `<nav class="tabs order-tabs" aria-label="Данные заказа">
    ${[['brief','Сводка'],['docs','Документы'],['history','История']].map(([id,label]) =>
      `<a href="#order/${order.id}${id==='brief'?'':'/'+id}"${id===tab?' aria-current="page"':''}>${label}${id==='docs'? `<span class="pill-detail">${order.documents.length+1+order.estimates.length}</span>` : ''}</a>`).join('')}</nav>`;
}

function documentsView(order) {
  const item = (label,name,desc,action='') => `<div class="document-row"><div class="document-title">
    ${icon('file')}<div><strong class="file-name">${esc(name)}</strong><p class="secondary-line">${esc(label)} · ${esc(desc)}</p></div></div>
    ${action ? `<div class="actions">${action}</div>` : ''}</div>`;
  return panel('Материалы заказа',
    item('Из заявки','Эскиз и предварительный расчёт','Переданы менеджером',button('Скачать пример','brief-file',{id:order.id,style:'small'}))+
    order.estimates.map(estimate=>item('Пересчёт','Спецификация варианта №'+estimate.id,order.contract?.estimate===estimate.id?'В договоре':'Сохранена в заказе',
      button('Скачать TXT','spec',{id:order.id,style:'small',extra:`data-version="${estimate.id}" aria-label="Скачать спецификацию варианта №${estimate.id}"`}))).join('')+
    order.documents.map(d=>item(d.type,d.name,d.visibility==='shared'?'Для передачи клиенту · '+d.at:'Для работы партнёра · '+d.at)).join('')+
    '<p class="notice fact-text">Макет сохраняет названия добавленных тестовых файлов. Обмен реальными документами и доступ клиента согласуются при внедрении.</p>',
    button('Добавить документ','document',{id:order.id,style:'small outline'}));
}

function activityView(order) {
  return panel('История заказа', `<ol class="timeline">${order.history.map(entry => `<li><p class="timeline-time">${esc(entry.at)}</p><h3>${esc(entry.label)}</h3>
    ${entry.text ? `<p>${esc(entry.text)}</p>` : ''}</li>`).join('')}</ol>`,button('Записать контакт','contact',{id:order.id,style:'small outline'}));
}

function orderView(order,tab='brief') {
  const content = tab==='docs' ? documentsView(order) : tab==='history' ? activityView(order) :
    `<div class="detail-grid partner-order-grid"><div class="stack order-actions">${nextCard(order)}
    ${panel('Клиент и объект', facts([['Клиент',order.name],['Телефон (демо)',order.phone],['Регион',order.city],['Адрес',order.address]])+
      `<div class="actions fact-text">${button('Записать контакт','contact',{id:order.id,style:'small outline'})}</div>`)}</div>
    <div class="stack order-summary">${panel('Передано менеджером LEVONI',`<div class="product-teaser">${photo}<div><strong>${esc(order.title)}</strong>
    <p class="secondary-line">${esc(decorName(order.decor))}</p></div></div>
    ${facts([['Источник',order.source],['Предварительная площадь',numeric(order.initial.area)+' м²'],['Сумма с витрины',money(order.initial.amount)],['Применённый прайс',priceLabel(order)],['Передал',order.manager]])}
    <p class="notice fact-text">Менеджер передал расчёт после согласия клиента на замер. После замера партнёр уточняет состав и фиксирует итог договора.</p>`)}
    ${visitInfo(order)}${quoteInfo(order)}${executionInfo(order)}</div></div>`;
  return back('Заказы','orders') + title('Заказ №'+order.id,order.name+' · '+order.city,'',stateBadge(order)) + stepper(order) + orderTabs(order,tab) + content;
}

function amountSummary(order,input) {
  const tariff=order.price;
  const calculated=totals(input,tariff);
  const delta=calculated.total-order.initial.amount;
  const breakdown=[
    ['Камень и базовые работы · '+numeric(calculated.area)+' м²',calculated.material],
    ['Радиусная кромка',calculated.edge],['Вырез под мойку',calculated.cut],
    ['Доставка',calculated.delivery],['Монтаж',calculated.install],
  ].filter(([,sum])=>sum);
  return `<div class="reference-price">${facts([['Прайс',priceLabel(order)],['Ставка материала',money(tariff.rates[input.decor])+' / м²']])}</div>
    ${breakdown.map(([name,amount])=>row(name,money(amount))).join('')}
    ${row('После замера',money(calculated.total),true)}
    ${row('Исходный расчёт',money(order.initial.amount))}
    ${row('Разница',(delta>0?'+':delta<0?'−':'')+money(Math.abs(delta)))}
    ${input.install?'<p class="secondary-line fact-text">В примере монтаж стоит 10% от изделия и платных работ, минимум 12 000 ₽. Доставка учитывается отдельно.</p>':''}
    <p class="notice fact-text">Это пример тарифов партнёра. Согласованная с клиентом сумма фиксируется в договоре.</p>`;
}

const optionMark = (key,label,on) => `<label class="check"><input type="checkbox" name="${key}" ${on?'checked':''}>${label}</label>`;

function estimateView(order) {
  if (!['measured','repriced'].includes(order.stage)) return back('Заказ №'+order.id,'order/'+order.id)+
    title('Пересчёт заказа №'+order.id,'Пересчёт открывается после внесения результатов замера. Сумму подписанного договора можно посмотреть в заказе.');
  const saved=order.estimates[0];
  const initial=saved || { ...order.measures,decor:order.decor,edge:'straight',cut:false,delivery:false,install:false };
  const size = (name,min,max) => `<input type="number" name="${name}" min="${min}" max="${max}" inputmode="numeric" value="${initial[name]}" required>`;
  const edit=`<form id="estimate-form" class="form-rows">
    ${field('Декор',`<select name="decor">${opt(Object.keys(decors).map(key=>[key,decorName(key)]),initial.decor)}</select>`)}
    <div class="fields three">${field('Длина, мм',size('length',100,6000))}${field('Глубина, мм',size('depth',100,2000))}${field('Деталей, шт.',size('units',1,12))}</div>
    ${field('Кромка',`<select name="edge">${opt([['straight','Прямая'],['round','Радиусная']],initial.edge)}</select>`)}
    ${optionMark('cut','Вырез под мойку',initial.cut)}${optionMark('delivery','Доставка',initial.delivery)}${optionMark('install','Монтаж',initial.install)}
    ${field('Примечание к спецификации',`<textarea name="note" maxlength="350">${esc(initial.note)}</textarea>`)}</form>`;
  return back('Заказ №'+order.id,'order/'+order.id) + title('Пересчёт заказа №'+order.id,order.name+' · '+order.city,'',badge('После замера','info'))+
    `<div class="detail-grid">${panel('Размеры, декор и услуги',facts([['Размер по замеру',order.measures.length+' × '+order.measures.depth+' мм'],
      ['Переданный прайс',priceLabel(order)]])+'<div class="fact-text">'+edit+'</div>')}
      <section class="panel quote-breakdown"><div class="panel-head"><h2>Сравнение стоимости</h2></div><div class="panel-body" id="estimate-summary">
      ${amountSummary(order,initial)}</div><div class="panel-footer"><button type="submit" class="btn primary full" form="estimate-form">Сохранить пересчёт</button></div></section></div>`;
}

function priceView() {
  const rows=Object.keys(price.rates).map(key=>`<tr><td>${esc(decorName(key))}</td><td data-mobile="Цена за м²" class="amount numeric">${money(price.rates[key])}</td><td>${badge('В выдаче','green')}</td></tr>`).join('');
  return title('Прайсы и бренды','Ваши согласованные цены и участие брендов в выдаче Новосибирска.')+
    `<div class="detail-grid"><div class="stack"><section class="panel"><div class="panel-head"><h2>Действующий прайс</h2>${badge(price.version+' от '+date(price.date),'green')}</div>
    <div class="table-wrap"><table class="data-table responsive"><thead><tr><th scope="col">Декор</th><th scope="col">Цена за м²</th><th scope="col">Бренд</th></tr></thead><tbody>${rows}</tbody></table></div></section>
    ${panel('Участие в выдаче',facts([['Acrylica','В выдаче'],['Grandex','Ожидает проверки прайса']])+
    '<p class="notice fact-text">Решение применяется к бренду целиком. Окончательное правило сравнения партнёров требует согласования.</p>')}</div>
    ${panel('Тарифы примера',facts([['Радиусная кромка',money(price.edge)+' / деталь'],['Вырез под мойку',money(price.cut)+' / деталь'],
      ['Доставка',money(price.delivery)],['Монтаж','10% · от '+money(price.installation)]])+'<p class="notice fact-text">Демонстрационные ставки для проверки интерфейса.</p>')}</div>`;
}

function accountsView() {
  const invoicedId='246';
  const rows=orders.filter(o=>o.contract?.prepayment).map(o=>{
    const issued=o.id===invoicedId;
    return `<tr><td><a class="text-link" href="#order/${o.id}">Заказ №${o.id}</a><p class="secondary-line">${esc(o.contract.number)}</p></td>
      <td data-mobile="Предоплата клиента" class="amount numeric">${money(o.contract.prepayment)} · ${date(o.contract.paidDate)}</td>
      <td data-mobile="Счёт LEVONI">${issued? 'ЛВ-26 · '+money(4500):'Ожидает выставления'}</td>
      <td>${issued?badge('Ожидается поступление','amber'):badge('На стороне LEVONI','info')}</td></tr>`;
  }).join('');
  return title('Счета LEVONI','Счета платформы по вашим заказам и отдельно зафиксированная предоплата от клиента.')+
    `<section class="panel"><div class="table-wrap"><table class="data-table responsive"><thead><tr><th scope="col">Заказ и договор</th><th scope="col">Предоплата клиента</th><th scope="col">Счёт LEVONI</th><th scope="col">Статус</th></tr></thead><tbody>${rows}</tbody></table></div>
    <div class="panel-body"><p class="notice">Клиент платит партнёру. LEVONI выставляет счёт после фиксации предоплаты и подтверждения участия дизайнера менеджером. Статус поступления подтверждает платформа.</p></div></section>`;
}

function calendarView() {
  const visits = orders.filter(o=>o.stage==='booked').sort((a,b)=>dateKey(a.plan.measure).localeCompare(dateKey(b.plan.measure)));
  return title('Календарь замеров','Предстоящие визиты. Время указано по Новосибирску.')+
    panel('Назначенные замеры',visits.length ? `<ul class="measure-list">${visits.map(o=>`<li><p class="measure-date">${dateTime(o.plan.measure)}</p>
      <div><h3>${esc(o.name)}</h3><p class="secondary-line">${esc(o.plan.measure.owner)} · ${esc(o.address)}</p></div>
      ${link('Заказ №'+o.id,'order/'+o.id,'small')}</li>`).join('')}</ul>` : '<p class="muted">Предстоящих замеров пока нет. Запланируйте визит из заказа.</p>');
}

function dateKey(entry) {
  return entry.date+'T'+(entry.time || '00:00');
}

function render(scroll=false) {
  let [view,id,tab='brief']=location.hash.slice(1).split('/');
  if (view==='workspace' && workspace.childElementCount) return;
  if (!['orders','order','estimate','calendar','prices','accounts'].includes(view)) view='orders';
  renderNavigation(['order','estimate'].includes(view)?'orders':view);
  const order=orderOf(id);
  if (view==='orders') { workspace.innerHTML=queueView(); fillQueue(); }
  if (view==='calendar') workspace.innerHTML=calendarView();
  if (view==='prices') workspace.innerHTML=priceView();
  if (view==='accounts') workspace.innerHTML=accountsView();
  if (view==='order' || view==='estimate') {
    workspace.innerHTML=order ? (view==='estimate'? estimateView(order) : orderView(order,tab))
      : back('Заказы','orders')+title('Заказ не найден','Откройте доступную запись из списка заказов вашей организации.');
  }
  document.title='LEVONI · '+workspace.querySelector('h1').textContent;
  if(scroll) { window.scrollTo(0,0); workspace.focus({preventScroll:true}); }
}

function form(title,command,id,inputs,submit) {
  dialog.innerHTML=`<div class="dialog-head"><h2 id="dialog-title">${esc(title)}</h2><button type="button" class="icon-btn" data-action="close" aria-label="Закрыть">${icon('close')}</button></div>
    <form class="dialog-body" data-command="${command}" data-id="${id}"><div class="form-rows">${inputs}</div><p class="form-error" role="alert"></p>
    <div class="actions">${button('Отмена','close')}<button type="submit" class="btn primary">${esc(submit)}</button></div></form>`;
  dialog.showModal();
}

const enDate=(name,value)=>`<input type="date" name="${name}" value="${value}" required>`;
const textInput=(name,placeholder='',value='',max=120)=>`<input name="${name}" placeholder="${esc(placeholder)}" value="${esc(value)}" maxlength="${max}" required>`;
const textArea=(name,placeholder='',required=false)=>`<textarea name="${name}" maxlength="350" placeholder="${esc(placeholder)}" ${required?'required':''}></textarea>`;
const datesFields=(suggested,hasTime=true)=>`<div class="fields">${field('Дата',enDate('date',suggested))}${hasTime?field('Время по Новосибирску','<input type="time" name="time" value="11:00" required>'):''}</div>`;

function estimateFrom(formElement) {
  const data=new FormData(formElement);
  return { length:Number(data.get('length')),depth:Number(data.get('depth')),units:Number(data.get('units')),
    decor:String(data.get('decor')),edge:String(data.get('edge')),cut:data.has('cut'),delivery:data.has('delivery'),install:data.has('install'),note:String(data.get('note')).trim() };
}

function download(name,text) {
  const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
  const link=document.createElement('a');
  link.href=url;
  link.download=name;
  link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1300);
}

function exportOrder(order,command,version) {
  const item=version ? order.estimates.find(estimate=>String(estimate.id)===version) : selectedEstimate(order);
  const source=['LEVONI · Демонстрационные данные', 'Заказ №'+order.id,order.city,order.title,
    'Расчёт менеджера: '+money(order.initial.amount)+' · '+numeric(order.initial.area)+' м²','Прайс заказа: '+priceLabel(order)];
  if(command==='brief-file') {
    download('LEVONI-заказ-'+order.id+'.txt',source.concat(['Декор: '+decorName(order.decor),'Эскиз: кухонная столешница, точные размеры после замера.','Следующий шаг: согласовать визит.']).join('\n'));
    return;
  }
  if(!item) return;
  const m=totals(item,item.price);
  download('LEVONI-спецификация-'+order.id+'-v'+item.id+'.txt', source.concat([
    'Вариант: '+item.id,'Размер: '+item.length+' × '+item.depth+' мм','Деталей: '+item.units,'Декор: '+decorName(item.decor),
    'Кромка: '+(item.edge==='round'?'радиусная':'прямая'),'Камень и базовые работы: '+money(m.material),
    'Кромка: '+money(m.edge),'Вырез: '+money(m.cut),'Доставка: '+money(m.delivery),'Монтаж: '+money(m.install),
    'Пересчёт: '+money(m.total),
    ...(order.contract?.estimate===item.id?['Итог договора: '+money(order.contract.amount)]:[]), item.note,
  ]).join('\n'));
}

function closeMenu() {
  sidebar.classList.remove('open');
  document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');
}

function handle(control) {
  const { action,id }=control.dataset;
  if (action==='menu') {
    const open=sidebar.classList.toggle('open');
    control.setAttribute('aria-expanded',String(open));
    if(open) navigationElement.querySelector('a')?.focus();
    return;
  }
  if (action==='close') { dialog.close(); return; }
  if (action==='filter') {
    filter=id;
    document.querySelectorAll('[data-action="filter"]').forEach(node=>node.setAttribute('aria-pressed',String(node.dataset.id===id)));
    fillQueue(); return;
  }
  const o=orderOf(id);
  if(!o) return;
  if(action==='select') {
    selectedId=id;
    if(matchMedia('(max-width:1080px)').matches) navigate('order/'+id);
    else {
      document.querySelectorAll('[data-action="select"]').forEach(node=>{
        const selected=node.dataset.id===id;
        node.setAttribute('aria-pressed',String(selected));
        node.closest('tr').classList.toggle('selected',selected);
      });
      document.querySelector('#order-preview').innerHTML=leadPreview(o);
    }
    return;
  }
  if(['spec','brief-file'].includes(action)) { exportOrder(o,action,control.dataset.version); return; }
  if(action==='document') {
    form('Добавить документ',action,id,'<p class="notice">Введите название тестового файла. Макет сохранит его в списке документов.</p>'+
      field('Тип документа',`<select name="type">${opt(docTypes.map(type=>[type,type]))}</select>`)+
      field('Название файла',textInput('name','Например, акт-монтажа.pdf'))+
      field('Назначение',`<select name="visibility">${opt([['internal','Для работы партнёра'],['shared','Для передачи клиенту']])}</select>`),'Добавить');
    return;
  }
  if(action==='contact') {
    form('Записать контакт',action,id,field('Канал',`<select name="channel">${opt(['Телефон','Почта','Мессенджер'].map(key=>[key,key]))}</select>`)+
      field('Что обсудили',textArea('note','Договорённость по замеру или исполнению',true)),'Сохранить контакт'); return;
  }
  if(action==='payment' && o.contract && !o.contract.prepayment) {
    form('Предоплата клиента',action,id,'<p class="notice">Отметьте платёж клиента партнёру. Счёт LEVONI учитывается отдельно.</p>'+
      field('Сумма, ₽',`<input type="number" min="1" max="${o.contract.amount}" name="prepayment" required>`)+
      field('Дата предоплаты',enDate('paidDate','2026-11-20')),'Записать предоплату'); return;
  }
  if(nextSteps[o.stage]?.[2]!==action) return;
  if(action==='accept') { o.stage='accepted'; save(o,'Партнёр принял заявку','Следующий шаг: назначить замер.'); render(); message('Заявка принята.'); }
  if(action==='estimate') navigate('estimate/'+o.id);
  if(action==='book') {
    form('Назначить замер',action,id,datesFields('2026-11-18')+field('Замерщик',textInput('owner','Имя замерщика','Илья Морозов'))+
      field('Адрес замера',textInput('address','Укажите тестовый адрес',o.address==='Адрес замера уточняется'?'':o.address))+
      field('Комментарий',textArea('note','Что нужно уточнить на выезде')),'Назначить замер');
  }
  if(action==='measure') {
    const length=(name,from,to)=>`<input type="number" name="${name}" min="${from}" max="${to}" inputmode="numeric" required>`;
    form('Результаты замера',action,id,`<p class="notice">На витрине: ${numeric(o.initial.area)} м². Укажите точные размеры после визита.</p>
      <div class="fields three">${field('Длина, мм',length('length',100,6000))}${field('Глубина, мм',length('depth',100,2000))}
      ${field('Деталей, шт.','<input type="number" name="units" min="1" max="12" value="1" inputmode="numeric" required>')}</div>`+
      field('Дата замера',enDate('date',o.plan.measure.date))+
      field('Примечание замерщика',textArea('note','Особенности стены, мойки или кромки')),'Сохранить замер');
  }
  if(action==='contract') {
    const estimate=o.estimates[0];
    form('Оформить договор',action,id,`<p class="notice">Пересчёт №${estimate.id}: ${money(estimateTotal(estimate))}. Зафиксируйте итог, который согласовали с клиентом.</p>`+
      `<div class="fields">${field('Номер договора',textInput('number','НС-'+o.id))}${field('Дата договора',enDate('date','2026-11-19'))}</div>`+
      field('Итог договора, ₽',`<input type="number" name="amount" min="1" max="100000000" value="${estimateTotal(estimate)}" required>`)+
      field('Примечание',textArea('note','Что согласовали с клиентом')),'Сохранить договор');
  }
  if(['make','delivery','deliver','install','finish'].includes(action)) {
    const details={
      make:['Начать изготовление','Плановая готовность','2026-11-23','Сергей Власов',false],
      delivery:['Назначить доставку','Дата доставки','2026-11-24','Олег Петров',true],
      deliver:['Подтвердить доставку','Дата фактической доставки',o.plan.delivery?.date || '2026-11-24',o.plan.delivery?.owner || '',false],
      install:['Назначить монтаж','Дата монтажа','2026-11-25','Сергей Власов',true],
      finish:['Завершить монтаж','Дата завершения',o.plan.install?.date || '2026-11-25',o.plan.install?.owner || '',false],
    };
    const [label,day,suggested,owner,hasTime]=details[action];
    form(label,action,id,field(day,enDate('date',suggested))+
      (hasTime?field('Время по Новосибирску','<input type="time" name="time" value="11:00" required>'):'')+
      field('Ответственный',textInput('owner','Имя сотрудника',owner))+field('Комментарий',textArea('note','Результат этапа или следующий шаг')),label);
  }
}

function submitDialog(element) {
  const { command,id }=element.dataset;
  const o=orderOf(id);
  const data=Object.fromEntries(new FormData(element));
  const val=key=>String(data[key]||'').trim();
  const issue=text=>{element.querySelector('.form-error').textContent=text;};
  const next=nextSteps[o.stage]?.[2];
  if (![next,'document','contact','payment'].includes(command)) { dialog.close(); render(); return; }
  const appointment={date:val('date'),time:val('time'),owner:val('owner'),note:val('note')};
  const planned=['book','make','delivery','deliver','install','finish'].includes(command);
  if(planned&&!appointment.owner) { issue('Укажите ответственного.'); return; }
  let label, log, path='';
  if(command==='book') {
    if(!val('address')) { issue('Укажите адрес замера.'); return; }
    o.address=val('address'); o.plan.measure=appointment; o.stage='booked';
    label='Замер назначен'; log=dateTime(appointment)+' · '+appointment.owner;
  }
  if(command==='measure') {
    o.measures={length:Number(data.length),depth:Number(data.depth),units:Number(data.units),date:val('date'),note:val('note')}; o.stage='measured';
    label='Сохранены результаты замера'; log=o.measures.length+' × '+o.measures.depth+' мм, '+o.measures.units+' шт.';
  }
  if(command==='contract') {
    if(!val('number')) { issue('Укажите номер договора.'); return; }
    o.contract={number:val('number'),date:val('date'),amount:Number(data.amount),estimate:o.estimates[0].id,prepayment:0,paidDate:'',note:val('note')};
    o.stage='contracted'; label='Зафиксирован договор'; log=o.contract.number+' · '+money(o.contract.amount);
  }
  if(command==='payment') {
    if(!o.contract||o.contract.prepayment) return;
    o.contract.prepayment=Number(data.prepayment); o.contract.paidDate=val('paidDate');
    label='Записана предоплата клиента'; log=money(o.contract.prepayment)+' от '+date(o.contract.paidDate);
  }
  if(command==='document') {
    if(!val('name')) { issue('Укажите название файла.'); return; }
    o.documents.unshift({type:val('type'),name:val('name'),visibility:val('visibility'),at:stamp()});
    label='Добавлен документ'; log=val('type')+' · '+val('name'); path='order/'+id+'/docs';
  }
  if(command==='contact') {
    if(!val('note')) { issue('Запишите, что обсудили.'); return; }
    label='Контакт с клиентом · '+val('channel'); log=val('note'); path='order/'+id+'/history';
  }
  const operations = {
    make:['making','making','Изготовление начато'],
    delivery:['delivery','delivery','Доставка назначена'],
    deliver:['delivered','delivered','Доставка выполнена'],
    install:['install','install','Монтаж назначен'],
    finish:['finish','installed','Монтаж завершён'],
  };
  if(operations[command]) {
    const [key,stage,change]=operations[command];
    o.plan[key]=appointment; o.stage=stage;
    label=change; log=dateTime(appointment)+' · '+appointment.owner;
  }
  if(!label) return;
  if(appointment.note && planned) log+=' · '+appointment.note;
  save(o,label,log); dialog.close();
  if(path) navigate(path); else render();
  message(label+'.');
}

document.addEventListener('click',event=>{
  const node=event.target.closest('[data-action]');
  if(node)handle(node);
  if(event.target.closest('#navigation a') || (sidebar.classList.contains('open') && !event.target.closest('.sidebar,.menu-toggle'))) closeMenu();
});

document.addEventListener('submit',event=>{
  event.preventDefault();
  const element=event.target;
  if(element.dataset.command) { submitDialog(element); return; }
  if(element.id==='estimate-form') {
    const order=byCurrent();
    if(!['measured','repriced'].includes(order?.stage)) return;
    const item={...estimateFrom(element),id:(order.estimates[0]?.id || 0)+1,price:structuredClone(order.price),at:stamp()};
    order.estimates.unshift(item); order.stage='repriced';
    save(order,'Пересчёт сохранён','Вариант №'+item.id+' · '+money(estimateTotal(item))+' · прайс '+priceLabel(order));
    navigate('order/'+order.id); message('Пересчёт сохранён.');
  }
});

workspace.addEventListener('input',event=>{
  if(event.target.id==='order-search') { query=event.target.value; fillQueue(); }
  const input=event.target;
  if(input.form?.id!=='estimate-form') return;
  document.querySelector('#estimate-summary').innerHTML=input.form.checkValidity()
    ? amountSummary(byCurrent(),estimateFrom(input.form))
    : '<p class="notice">Укажите корректные размеры и количество деталей для расчёта.</p>';
});
window.addEventListener('hashchange',()=>{closeMenu();render(true);});
dialog.addEventListener('close',()=>{if(!dialog.open) dialog.replaceChildren();});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&sidebar.classList.contains('open')) {closeMenu();document.querySelector('.menu-toggle').focus();}
});
document.querySelector('.menu-toggle').innerHTML=icon('menu');
render();
