/* Browser-only client specification. Each canvas is embedded as one A4 PDF page. */
(() => {
  'use strict';

  const base = new URL('.', document.currentScript.src);
  const W = 620, H = 877, M = 42, BODY = W - M * 2, BOTTOM = 817;
  const wine = '#712738', ink = '#292529', muted = '#61595d', line = '#e8e0e3';
  const blush = '#f8eef0', white = '#fff';
  const text = (value, fallback = '—') => String(value ?? '').trim() || fallback;

  function loadImage(path) {
    // Accept image URLs rooted in the local admin directory.
    if (!path) return Promise.resolve(null);
    let url;
    try { url = new URL(path, base); } catch { return Promise.resolve(null); }
    if (url.origin !== base.origin || url.protocol !== base.protocol ||
        !url.pathname.startsWith(base.pathname)) return Promise.resolve(null);
    return new Promise(resolve => {
      const image = new Image();
      const finish = value => {
        clearTimeout(timer);
        image.onload = image.onerror = null;
        resolve(value);
      };
      const timer = setTimeout(() => finish(null), 2500);
      image.onload = () => finish(image);
      image.onerror = () => finish(null);
      // Refuse opaque responses (e.g. a redirect to a remote image without CORS).
      if (url.protocol !== 'file:') image.crossOrigin = 'anonymous';
      image.src = url.href;
    });
  }

  function pdfBlob(pages) {
    // Syntax is ASCII. Track offsets of all byte chunks, including the JPEGs.
    const encoder = new TextEncoder();
    const parts = [], offsets = [0];
    let size = 0;
    function write(value) {
      const bytes = typeof value === 'string' ? encoder.encode(value) : value;
      parts.push(bytes);
      size += bytes.length;
    }
    function object(id, value, stream) {
      offsets[id] = size;
      write(`${id} 0 obj\n${value}`);
      if (stream) { write('\nstream\n'); write(stream); write('\nendstream'); }
      write('\nendobj\n');
    }
    write('%PDF-1.4\n');
    write(Uint8Array.of(37, 226, 227, 207, 211, 10));
    object(1, '<< /Type /Catalog /Pages 2 0 R /Lang (ru-RU) >>');
    const kids = pages.map((_, i) => `${3 + i * 3} 0 R`).join(' ');
    object(2, `<< /Type /Pages /Count ${pages.length} /Kids [${kids}] >>`);
    const paint = encoder.encode('q\n595.28 0 0 841.89 0 0 cm\n/PageImage Do\nQ\n');
    pages.forEach(({ jpeg, width, height }, i) => {
      const id = 3 + i * 3;
      object(id, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] ` +
        `/Resources << /XObject << /PageImage ${id + 1} 0 R >> >> /Contents ${id + 2} 0 R >>`);
      object(id + 1, `<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} ` +
        `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>`, jpeg);
      object(id + 2, `<< /Length ${paint.length} >>`, paint);
    });
    const xref = size;
    write(`xref\n0 ${offsets.length}\n0000000000 65535 f \n`);
    offsets.slice(1).forEach(offset => write(`${String(offset).padStart(10, '0')} 00000 n \n`));
    write(`trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
    return new Blob(parts, { type: 'application/pdf' });
  }

  // Filter structural labels only, never row values, names or the client's note.
  const internalLabel = label => /^(?:обработчик|выбор обработчика|версия прайса|прайс)$/iu.test(
    text(label, '').replace(/[\s:：]+$/u, '').replace(/\s+/gu, ' ')
  );
  const publicRows = rows => Array.isArray(rows)
    ? rows.filter(row => Array.isArray(row) && !internalLabel(row[0])) : [];
  const money = value => typeof value === 'number' && Number.isFinite(value)
    ? `${value.toLocaleString('ru-RU')} ₽` : text(value, '');

  function render(data, logo, images) {
    const pages = [];
    const canvas = document.createElement('canvas');
    canvas.width = W * 2;
    canvas.height = H * 2;
    const ctx = canvas.getContext('2d', { alpha: false });
    ctx.scale(2, 2);
    ctx.textBaseline = 'top';
    let y;
    const font = (size, bold) => { ctx.font = `${bold ? '700' : '400'} ${size}px Arial, sans-serif`; };
    function rectangle(x, top, w, h, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, top, w, h);
    }
    function print(value, x, top, size = 14, color = ink, bold = false, maxWidth) {
      font(size, bold);
      ctx.fillStyle = color;
      if (maxWidth) ctx.fillText(value, x, top, maxWidth);
      else ctx.fillText(value, x, top);
    }
    function right(value, x, top, size, color, bold, maxWidth) {
      ctx.textAlign = 'right';
      print(value, x, top, size, color, bold, maxWidth);
      ctx.textAlign = 'left';
    }
    function wrap(value, width, size = 14, bold = false) {
      font(size, bold);
      const out = [];
      for (const paragraph of value.split(/\r\n?|\n/)) {
        let current = '';
        for (const word of paragraph.trim().split(/\s+/u)) {
          const candidate = current ? `${current} ${word}` : word;
          if (ctx.measureText(candidate).width <= width) { current = candidate; continue; }
          if (current) out.push(current);
          current = '';
          for (const character of word) {
            if (current && ctx.measureText(current + character).width > width) {
              out.push(current);
              current = '';
            }
            current += character;
          }
        }
        out.push(current);
      }
      return out;
    }
    function begin() {
      const first = pages.length === 0;
      const headerH = first ? 102 : 67;
      rectangle(0, 0, W, H, white);
      rectangle(0, 0, W, headerH, wine);
      const logoW = first ? 151 : 127, logoH = logoW * logo.naturalHeight / logo.naturalWidth;
      ctx.drawImage(logo, M - 4, (67 - logoH) / 2, logoW, logoH);
      right('ДЕМО  /  КОНТАКТЫ', W - M, 17, 10, white, true);
      right('info@levoni.example', W - M, 33, 13, white, false);
      if (first) {
        rectangle(M, 62, BODY, 1, '#a66573');
        print('Качество не наш конек. Дорого, долго и без гарантий.', M, 74, 13, white);
      }
      print(first ? 'Спецификация заказа' : 'Спецификация заказа · продолжение',
        M, headerH + 21, first ? 30 : 22, ink, true);
      y = headerH + (first ? 64 : 58);
    }
    function finish() {
      rectangle(M, 835, BODY, 1, line);
      print('LEVONI  /  ДЕМО-СПЕЦИФИКАЦИЯ', M, 848, 10, muted, true);
      right(`Стр. ${pages.length + 1}`, W - M, 848, 10, muted, false);
      const url = canvas.toDataURL('image/jpeg', 0.95);
      const raw = atob(url.slice(url.indexOf(',') + 1));
      pages.push({ jpeg: Uint8Array.from(raw, c => c.charCodeAt(0)), width: canvas.width, height: canvas.height });
    }
    function reserve(height) {
      if (y + height <= BOTTOM) return false;
      finish();
      begin();
      return true;
    }
    const main = title => ({ title, style: 'main' });
    const sub = title => ({ title, style: 'sub' });
    function bandMetrics({ title, style }) {
      const size = style === 'main' ? 16 : 14;
      const lines = wrap(title, BODY - 24, size, true);
      // Group titles are section labels, not the place for unrestricted prose.
      if (lines.length > 3) lines.splice(2, lines.length - 2, '…');
      return { size, lines, height: lines.length * (size + 4) + 14 };
    }
    function bands(headings, nextHeight) {
      const metrics = headings.map(bandMetrics);
      reserve(metrics.reduce((sum, band) => sum + band.height + 3, nextHeight));
      headings.forEach(({ style }, i) => {
        const { size, lines, height } = metrics[i];
        const major = style === 'main';
        rectangle(M, y, BODY, height, major ? wine : blush);
        if (!major) rectangle(M, y, 3, height, wine);
        lines.forEach((value, j) => print(value, M + 12, y + 7 + j * (size + 4), size, major ? white : wine, true));
        y += height + 3;
      });
    }
    const labelX = M + 12, valueX = M + 190, priceX = W - M - 12, priceW = 125;
    const rowStep = 18, rowPad = 12;
    function position([label, description, price]) {
      const amount = money(price);
      return {
        label: wrap(text(label), valueX - labelX - 16, 14, true),
        description: wrap(text(description, amount ? '' : '—'), priceX - valueX - (amount ? priceW + 16 : 0), 14),
        amount,
      };
    }
    function countLines(row) { return Math.max(row.label.length, row.description.length); }
    function rowStart(lines) { return Math.min(lines, 4) * rowStep + rowPad; }
    function table(rows, headings, continuation, trailingHeight = 0) {
      const items = rows.map(position);
      const tail = (index, count) => trailingHeight && index === items.length - 1 && count <= 4 ? trailingHeight + 12 : 0;
      bands(headings, rowStart(countLines(items[0])) + tail(0, countLines(items[0])));
      items.forEach((item, index) => {
        const count = countLines(item);
        for (let i = 0; i < count;) {
          const minimum = rowStart(count - i) + tail(index, count - i);
          if (reserve(minimum)) bands([continuation], minimum);
          const visible = Math.min(count - i, Math.floor((BOTTOM - y - rowPad) / rowStep));
          const height = visible * rowStep + rowPad;
          if (index % 2 === 0) rectangle(M, y, BODY, height, '#fcfafb');
          for (let j = 0; j < visible; j++) {
            const top = y + 6 + j * rowStep;
            if (item.label[i + j]) print(item.label[i + j], labelX, top, 14, ink, true);
            if (item.description[i + j]) print(item.description[i + j], valueX, top, 14, muted);
          }
          if (!i && item.amount) right(item.amount, priceX, y + 6, 14, ink, true, priceW);
          y += height;
          rectangle(M, y - 1, BODY, 1, line);
          i += visible;
        }
      });
      y += 12;
    }
    function samples(sets) {
      let first = true;
      for (const { items, pictureH } of sets) {
        const gap = 10, cardW = (BODY - (items.length - 1) * gap) / items.length;
        const captions = items.map(item => wrap(item.caption, cardW - 20, 13, true));
        // If a custom caption is unusually long, keep the image and caption together.
        captions.forEach(lines => { if (lines.length > 4) lines.splice(3, lines.length - 3, '…'); });
        const cardH = pictureH + 24 + 16 * Math.max(...captions.map(lines => lines.length));
        const title = first ? 'Образцы' : 'Образцы · продолжение';
        if (first) bands([main(title)], cardH);
        else if (reserve(cardH)) bands([main(title)], cardH);
        items.forEach(({ image }, i) => {
          const x = M + i * (cardW + gap);
          rectangle(x, y, cardW, cardH, '#faf8f8');
          if (image) {
            const scale = Math.min((cardW - 18) / image.naturalWidth, pictureH / image.naturalHeight, 1.6);
            const w = image.naturalWidth * scale, h = image.naturalHeight * scale;
            ctx.drawImage(image, x + (cardW - w) / 2, y + 8 + (pictureH - h) / 2, w, h);
          } else {
            const missing = wrap('Изображение недоступно', cardW - 20, 13);
            missing.forEach((value, j) => print(value, x + 10, y + (pictureH - 16 * missing.length) / 2 + j * 16, 13, muted));
          }
          captions[i].forEach((value, j) => print(value, x + 10, y + pictureH + 15 + j * 16, 13, ink, true));
        });
        y += cardH + 12;
        first = false;
      }
      if (!first) y += 2;
    }
    function paragraph(title, value) {
      const lines = wrap(value, BODY - 24);
      bands([sub(title)], Math.min(lines.length, 3) * 20 + 6);
      lines.forEach(valueLine => {
        if (reserve(20)) bands([sub(`${title} · продолжение`)], 20);
        print(valueLine, labelX, y + 2);
        y += 20;
      });
      y += 12;
    }

    begin();
    const details = 'Данные расчёта';
    table([
      ['Номер расчёта', data.id], ['Дата расчёта', data.date],
      ['Менеджер', data.manager], ['Клиент', data.client]
    ], [sub(details)], sub(`${details} · продолжение`));

    const individual = 'Индивидуальные товары';
    const empty = [['Позиции', 'Не выбраны']];
    // Grouped rows replace the flat individual list when present; ready is independent.
    const groups = Array.isArray(data.groups) ? data.groups.flatMap(group => {
      if (!group || internalLabel(group.title)) return [];
      const rows = publicRows(group.rows);
      return rows.length ? [{ title: text(group.title, ''), rows }] : [];
    }) : [];
    if (groups.length) {
      groups.forEach(({ title, rows }, i) => {
        const headings = [...(!i ? [main(individual)] : []), ...(title ? [sub(title)] : [])];
        table(rows, headings, sub(`${title || individual} · продолжение`));
      });
    } else {
      const rows = publicRows(data.individual);
      table(rows.length ? rows : empty, [main(individual)], main(`${individual} · продолжение`));
    }
    const termsTitle = 'Условия предложения';
    const terms = 'Стоимость заказа предварительная. Точная стоимость будет рассчитана после проведения замера. Условия коммерческого предложения действуют в течение 3 рабочих дней.';
    const summaryHeight = 66 + bandMetrics(sub(termsTitle)).height + 3 + wrap(terms, BODY - 24).length * 20 + 6;
    const ready = 'Готовые товары', readyItems = publicRows(data.ready);
    table(readyItems.length ? readyItems : empty, [main(ready)], main(`${ready} · продолжение`), summaryHeight);

    reserve(summaryHeight);
    rectangle(M, y, BODY, 50, wine);
    print('Итого по заказу', labelX, y + 16, 16, white, true);
    right(money(data.total) || '—', priceX, y + 10, 25, white, true, BODY - 200);
    y += 66;
    paragraph(termsTitle, terms);

    const sets = [
      { items: images.slice(0, 3).filter(Boolean), pictureH: 127 },
      { items: images.slice(3).filter(Boolean), pictureH: images[4] ? 238 : 150 },
    ];
    samples(sets.filter(set => set.items.length));
    const note = text(data.note, '');
    if (note) paragraph('Примечание менеджера', note);
    finish();
    return pages;
  }

  // app.js calls this from its download action. Resolves with the requested filename;
  // rejects on generation errors so the caller can show an appropriate message.
  window.downloadManagerSpecification = async function (data) {
    const entries = [
      [data.decorImage, 'Декор'],
      [data.edgeImage, text(data.edgeCaption, 'Кромка · справочный образец')],
      [data.skirtImage, text(data.skirtCaption, 'Бортик · демосхема')],
      [data.sinkImage, text(data.sinkCaption, 'Мойка · образец')],
      [data.sinkDrawing, text(data.sinkDrawingCaption, 'Мойка · чертёж')],
    ];
    const [logo, ...images] = await Promise.all([
      loadImage('assets/levoni-brand.png'),
      ...entries.map(async ([path, caption]) => path ? { image: await loadImage(path), caption } : null),
    ]);
    if (!logo) throw new Error('Не удалось загрузить логотип для спецификации.');
    const url = URL.createObjectURL(pdfBlob(render(data, logo, images)));
    const id = text(data.id, 'demo').replace(/[^\p{L}\p{N}_-]+/gu, '-').slice(0, 60);
    const link = document.createElement('a');
    link.href = url;
    link.download = `LEVONI-specification-${id}.pdf`;
    document.body.append(link);
    try { link.click(); } finally {
      link.remove();
      // Some mobile browsers dereference the URL after the click handler returns.
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    }
    return link.download;
  };
})();
