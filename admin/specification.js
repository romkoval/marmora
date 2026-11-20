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

  function render(data, logo, decor, edge) {
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
    function print(value, x, top, size = 14, color = ink, bold = false) {
      font(size, bold);
      ctx.fillStyle = color;
      ctx.fillText(value, x, top);
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
      rectangle(0, 0, W, H, white);
      rectangle(0, 0, W, 88, wine);
      const logoW = 166, logoH = logoW * logo.naturalHeight / logo.naturalWidth;
      ctx.drawImage(logo, M - 5, (88 - logoH) / 2, logoW, logoH);
      const contactsX = W - M - 146;
      print('ДЕМО-КОНТАКТЫ', contactsX, 26, 11, white, true);
      print('info@levoni.example', contactsX, 45, 14, white);
      print(first ? 'Спецификация заказа' : 'Спецификация заказа · продолжение',
        M, 114, first ? 30 : 22, ink, true);
      y = first ? 163 : 152;
    }
    function finish() {
      rectangle(M, 835, BODY, 1, line);
      print('LEVONI  /  ДЕМО-СПЕЦИФИКАЦИЯ', M, 848, 10, muted, true);
      const page = `Стр. ${pages.length + 1}`;
      font(10, false);
      print(page, W - M - ctx.measureText(page).width, 848, 10, muted);
      const url = canvas.toDataURL('image/jpeg', 0.93);
      const raw = atob(url.slice(url.indexOf(',') + 1));
      pages.push({ jpeg: Uint8Array.from(raw, c => c.charCodeAt(0)), width: canvas.width, height: canvas.height });
    }
    function reserve(height, continuation) {
      if (y + height <= BOTTOM) return;
      finish();
      begin();
      if (continuation) heading(`${continuation} · продолжение`, 34);
    }
    function heading(title, nextHeight = 34) {
      reserve(34 + nextHeight);
      rectangle(M, y, BODY, 30, blush);
      print(title, M + 12, y + 6, 16, wine, true);
      y += 34;
    }
    function firstRowHeight([label, value]) {
      return Math.min(100, 16 + 19 * Math.max(wrap(text(label), 196).length, wrap(text(value), BODY - 232, 14, true).length));
    }
    function row(label, value, continuation) {
      const left = wrap(text(label), 196);
      const right = wrap(text(value), BODY - 232, 14, true);
      const count = Math.max(left.length, right.length);
      for (let i = 0; i < count;) {
        reserve(Math.min(count - i, 4) * 19 + 16, continuation);
        const visible = Math.min(count - i, Math.floor((BOTTOM - y - 16) / 19));
        for (let j = 0; j < visible; j++) {
          print(left[i + j] ?? '', M + 12, y + 7 + j * 19, 14, muted);
          print(right[i + j] ?? '', M + 220, y + 7 + j * 19, 14, ink, true);
        }
        y += visible * 19 + 15;
        rectangle(M, y, BODY, 1, line);
        y += 1;
        i += visible;
      }
    }
    function section(title, rows, empty) {
      const items = rows.length ? rows : [empty];
      heading(title, firstRowHeight(items[0]));
      items.forEach(([label, value]) => row(label, value, title));
      y += 16;
    }
    function paragraph(value, continuation) {
      for (const valueLine of wrap(value, BODY - 24)) {
        reserve(21, continuation);
        print(valueLine, M + 12, y + 2);
        y += 21;
      }
    }
    function samples(items) {
      if (!items.length) return;
      heading('Образцы', 151);
      const gap = 12, cardW = (BODY - (items.length - 1) * gap) / items.length;
      items.forEach(([caption, image], i) => {
        const x = M + i * (cardW + gap), pictureHeight = 116;
        rectangle(x, y, cardW, 148, '#faf8f8');
        if (image) {
          const scale = Math.min((cardW - 20) / image.naturalWidth, pictureHeight / image.naturalHeight);
          const w = image.naturalWidth * scale, h = image.naturalHeight * scale;
          ctx.drawImage(image, x + (cardW - w) / 2, y + 4 + (pictureHeight - h) / 2, w, h);
        } else {
          print('Изображение недоступно', x + 10, y + 53, 13, muted);
        }
        print(caption, x + 10, y + 128, 13, ink, true);
      });
      y += 164;
    }

    begin();
    const details = 'Данные расчёта';
    row('Номер расчёта', data.id, details);
    row('Дата расчёта', data.date, details);
    row('Менеджер', data.manager, details);
    row('Клиент', data.client, details);
    y += 16;
    section('Индивидуальные товары', data.individual ?? [], ['Позиции', 'Не выбраны']);
    section('Готовые товары', data.ready ?? [], ['Позиции', 'Не выбраны']);
    row('Итого по заказу', data.total, 'Итоговая стоимость');
    y += 16;
    samples([
      ...(data.decorImage ? [['Декор', decor]] : []),
      ...(data.edgeImage ? [['Кромка · справочный образец', edge]] : [])
    ]);
    const note = text(data.note, '');
    if (note) {
      heading('Примечание менеджера');
      paragraph(note, 'Примечание менеджера');
      y += 12;
    }
    const termsTitle = 'Условия предложения';
    const terms = 'Стоимость заказа предварительная. Точная стоимость будет рассчитана после проведения замера. Условия коммерческого предложения действуют в течение 3 рабочих дней.';
    heading(termsTitle, wrap(terms, BODY - 24).length * 21);
    paragraph(terms, termsTitle);
    finish();
    return pages;
  }

  // app.js calls this from its download action. Resolves with the requested filename;
  // rejects on generation errors so the caller can show an appropriate message.
  window.downloadManagerSpecification = async function (data) {
    const [logo, decor, edge] = await Promise.all([
      loadImage('assets/levoni-brand.png'), loadImage(data.decorImage), loadImage(data.edgeImage)
    ]);
    if (!logo) throw new Error('Не удалось загрузить логотип для спецификации.');
    const url = URL.createObjectURL(pdfBlob(render(data, logo, decor, edge)));
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
