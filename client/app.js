const order = {
  steps: ['Заявка', 'Замер', 'Пересчёт', 'Договор', 'Изготовление', 'Доставка', 'Монтаж'],
  product: {
    original: { decor: 'Acrylica A101 «Белый снег»', swatch: 'a101s.webp' },
    final: { decor: 'Acrylica A205 «Графит»', swatch: 'a205s.webp', size: '2800 × 650 мм' },
  },
  stages: [
    { id: 'request', step: 0, date: '2026-11-15', title: 'Заявка получена',
      detail: 'Менеджер LEVONI получил заявку на кухонную столешницу. Следующий шаг — согласовать замер.', key: 'Предварительный расчёт', value: '48 180 ₽' },
    { id: 'measure-planned', step: 1, date: '2026-11-16', title: 'Замер назначен',
      detail: 'Партнёр приедет на объект и уточнит размеры столешницы и расположение выреза под мойку.', history: 'Партнёр назначил замер на 18 ноября в 15:30 по Новосибирску.', key: 'Визит по Новосибирску', value: '18 ноября в 15:30' },
    { id: 'measured', step: 1, date: '2026-11-19', title: 'Замер выполнен',
      detail: 'Партнёр зафиксировал размеры. Следующий шаг — уточнить комплектацию и стоимость.', key: 'Размер столешницы', value: '2800 × 650 мм' },
    { id: 'quote', step: 2, date: '2026-11-19', title: 'Расчёт обновлён',
      detail: 'После замера выбрали декор Acrylica A205 «Графит». В спецификации указаны столешница, вырез под мойку, доставка и монтаж.', key: 'Стоимость после замера', value: '62 390 ₽' },
    { id: 'contract', step: 3, date: '2026-11-20', title: 'Договор оформлен',
      detail: 'В документах доступен договор с партнёром «Север Камень». Партнёр зафиксировал предоплату 20 000 ₽.', key: 'Сумма по договору', value: '62 500 ₽' },
    { id: 'production', step: 4, date: '2026-11-21', title: 'Столешница в изготовлении', optionLabel: 'Идёт изготовление',
      detail: 'Партнёр начал изготовление по согласованной спецификации. После готовности он согласует доставку.', key: 'Плановая готовность', value: '23 ноября' },
    { id: 'delivery-planned', step: 5, date: '2026-11-23', title: 'Доставка назначена',
      detail: 'Партнёр согласовал дату и время доставки столешницы.', history: 'Доставку назначили на 24 ноября в 11:00 по Новосибирску.', key: 'Доставка по Новосибирску', value: '24 ноября в 11:00' },
    { id: 'delivered', step: 5, date: '2026-11-25', title: 'Столешница доставлена',
      detail: 'Партнёр подтвердил доставку изделия. Следующий шаг — согласовать монтаж.', key: 'Фактическая дата доставки', value: '25 ноября' },
    { id: 'install-planned', step: 6, date: '2026-11-25', title: 'Монтаж назначен',
      detail: 'Партнёр согласовал дату и время визита монтажной бригады.', history: 'Монтаж назначили на 26 ноября в 11:00 по Новосибирску.', key: 'Монтаж по Новосибирску', value: '26 ноября в 11:00' },
    { id: 'installed', step: 6, date: '2026-11-27', title: 'Монтаж завершён',
      detail: 'Партнёр установил столешницу. Акт, фото и рекомендации по уходу доступны в документах заказа.', key: 'Фактическая дата монтажа', value: '27 ноября' },
  ],
  documents: [
    { stage: 'installed', title: 'Акт монтажа', detail: 'Демонстрационный образец', file: 'documents/installation-act-248.pdf', type: 'PDF' },
    { stage: 'installed', title: 'Фото после монтажа', detail: 'Демонстрационный пример', file: '../admin/assets/countertop.webp', type: 'WEBP', download: 'levoni-photo-248.webp' },
    { stage: 'installed', title: 'Уход за столешницей', detail: 'Рекомендации для акрилового камня', file: 'documents/care-248.pdf', type: 'PDF' },
    { stage: 'contract', title: 'Договор №НС-248', detail: 'Демонстрационный образец', file: 'documents/contract-248.pdf', type: 'PDF' },
    { stage: 'quote', title: 'Спецификация заказа', detail: 'Состав и стоимость после замера', file: 'documents/specification-248.pdf', type: 'PDF' },
    { stage: 'measured', title: 'Чертёж по замеру', detail: 'Размеры и зона выреза', file: 'documents/drawing-248.pdf', type: 'PDF' },
  ],
};

const symbols = {
  check: '<path d="m5 12 4 4L19 6"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  file: '<path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6"/>',
  photo: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 16 5-5 4 4 3-3 6 5"/><circle cx="15.5" cy="9" r="1"/>',
  download: '<path d="M12 3v12m-4-4 4 4 4-4M5 16v4h14v-4"/>',
};
const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${symbols[name]}</svg>`;
const content = document.querySelector('#content');
const select = document.querySelector('#demo-stage');
const dateFormat = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', timeZone: 'UTC' });
const formatDate = value => dateFormat.format(new Date(value));
const stageIndex = id => order.stages.findIndex(stage => stage.id === id);
const currentIndex = () => Math.max(0, select.selectedIndex);
const currentStage = () => order.stages[currentIndex()];
const documentStage = doc => order.stages[stageIndex(doc.stage)];
const documents = () => order.documents.filter(doc => stageIndex(doc.stage) <= currentIndex());
const views = ['order', 'history', 'documents'];
const getView = () => views.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'order';

function renderSteps(stage) {
  const complete = stage.id === 'installed';
  return `<section class="progress" aria-labelledby="progress-title">
    <h2 id="progress-title">Этапы заказа</h2>
    <ol class="steps">${order.steps.map((label, index) => {
      const done = index < stage.step || complete;
      const current = index === stage.step;
      return `<li class="${done ? 'done' : current ? 'current' : 'upcoming'}"${current ? ' aria-current="step"' : ''}>
        <span class="step-marker">${done ? icon('check') : ''}</span>
        <span>${label}<span class="sr-only">${done ? ', завершён' : current ? ', текущий этап' : ', предстоит'}</span></span>
      </li>`;
    }).join('')}</ol>
  </section>`;
}

function renderProduct() {
  const measured = currentIndex() >= stageIndex('measured');
  const repriced = currentIndex() >= stageIndex('quote');
  const contracted = currentIndex() >= stageIndex('contract');
  const product = repriced ? order.product.final : order.product.original;
  return `<aside class="product" aria-labelledby="product-title">
    <figure>
      <img class="product-image" src="../admin/assets/countertop.webp" width="717" height="960" alt="Пример кухонной столешницы из камня">
      <figcaption>Пример изделия</figcaption>
    </figure>
    <div class="product-body">
      <h2 id="product-title">Кухонная столешница</h2>
      <p class="material">Акриловый камень</p>
      <p class="decor"><img src="../admin/assets/${product.swatch}" alt="" width="22" height="22"> ${product.decor}</p>
      ${measured ? `<dl class="product-facts">
        <div><dt>Размер по замеру</dt><dd>${order.product.final.size}</dd></div>
        ${contracted ? '<div><dt>Исполнитель</dt><dd>Север Камень</dd></div><div><dt>Сумма по договору</dt><dd>62 500 ₽</dd></div>' : ''}
      </dl>` : ''}
    </div>
  </aside>`;
}

function renderHistory(events) {
  return `<ol class="timeline">${events.map(event => `
    <li><time datetime="${event.date}">${formatDate(event.date)}</time>
      <div><h3>${event.title}</h3><p>${event.history || event.detail}</p></div>
    </li>`).join('')}</ol>`;
}

function renderOverview(stage, events, available) {
  return `<div class="overview">
    <div class="overview-main">
      <section class="current-status" aria-labelledby="current-title">
        <div class="status-main">
          <span class="status-marker" aria-hidden="true">${stage.id === 'installed' ? icon('check') : ''}</span>
          <div><h2 id="current-title">${stage.title}</h2><p>${stage.detail}</p></div>
        </div>
        <dl class="status-fact"><dt>${stage.key}</dt><dd>${stage.value}</dd></dl>
      </section>
      ${renderSteps(stage)}
      ${events.length > 1 ? `<section class="latest" aria-labelledby="latest-title">
        <div class="section-title"><h2 id="latest-title">Предыдущие события</h2><a class="text-link" href="#history">Вся история ${icon('chevron')}</a></div>
        ${renderHistory(events.slice(1, 3))}
      </section>` : ''}
      ${available.length ? `<a class="button documents-link" href="#documents">${icon('file')} Документы заказа <span>${available.length}</span></a>` : ''}
    </div>
    ${renderProduct()}
  </div>`;
}

function renderDocuments(available) {
  if (!available.length) return `<section class="tab-content" aria-labelledby="documents-title">
    <h2 id="documents-title">Документы заказа</h2>
    <div class="empty">${icon('file')}<div><h3>Документы ещё не появились</h3><p>Чертёж будет доступен после замера. Остальные материалы появятся по мере готовности.</p></div></div>
  </section>`;
  return `<section class="tab-content" aria-labelledby="documents-title">
    <h2 id="documents-title">Документы заказа</h2>
    <ul class="document-list">${available.map(doc => `
      <li>
        <div class="document-icon">${icon(doc.type === 'PDF' ? 'file' : 'photo')}</div>
        <div class="document-summary"><h3>${doc.title}</h3><p>${doc.detail}</p>
          <p class="document-meta"><span>${doc.type}</span><time datetime="${documentStage(doc).date}">${formatDate(documentStage(doc).date)}</time></p></div>
        <div class="document-actions">
          <a class="button" href="${doc.file}" target="_blank" rel="noopener" aria-label="Открыть: ${doc.title} (в новой вкладке)">Открыть</a>
          <a class="button download" href="${doc.file}" download="${doc.download || doc.file.split('/').pop()}" aria-label="Скачать: ${doc.title}">${icon('download')}</a>
        </div>
      </li>`).join('')}</ul>
  </section>`;
}

function render() {
  const view = getView();
  const stage = currentStage();
  const available = documents();
  const events = order.stages.slice(0, currentIndex() + 1).reverse();

  document.querySelector('#document-count').textContent = available.length;
  document.querySelectorAll('[data-view]').forEach(link => {
    if (link.dataset.view === view) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  if (view === 'documents') content.innerHTML = renderDocuments(available);
  else if (view === 'history') content.innerHTML = `<section class="tab-content" aria-labelledby="history-title">
    <h2 id="history-title">История заказа</h2>${renderHistory(events)}
  </section>`;
  else content.innerHTML = renderOverview(stage, events, available);
}

select.innerHTML = order.stages.map(({ id, title, optionLabel }) => `<option value="${id}">${optionLabel || title}</option>`).join('');
function restoreStage() {
  const stage = new URLSearchParams(location.search).get('stage');
  select.value = stageIndex(stage) >= 0 ? stage : 'installed';
}

select.addEventListener('change', () => {
  const currentUrl = new URL(location.href);
  if (select.value === 'installed') currentUrl.searchParams.delete('stage');
  else currentUrl.searchParams.set('stage', select.value);
  window.history.replaceState(null, '', currentUrl);
  render();
  document.querySelector('#announcement').textContent = currentStage().title + '. Документов доступно: ' + documents().length + '.';
});
document.querySelector('.skip').addEventListener('click', event => {
  event.preventDefault();
  content.focus();
  content.scrollIntoView();
});
window.addEventListener('popstate', () => {
  if (!views.includes(location.hash.slice(1)) && location.hash) return;
  restoreStage();
  render();
  window.scrollTo(0, 0);
  content.focus({ preventScroll: true });
});
restoreStage();
render();
