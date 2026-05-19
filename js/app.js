document.addEventListener('alpine:init', () => {
  Alpine.data('estimatorApp', () => ({
    currentView: 'estimator',
    settingsSaved: false,

    estimate: {
      customerName: '',
      customerAddress: '',
      estimateDate: new Date().toISOString().split('T')[0],
      projectName: '',
      scopeOfWork: [],
      startDate: '',
      completionDate: '',
      costs: {
        materials: [],
        machinery: [],
        laborDays: 1.0,
        laborDailyRate: 400.00,
        misc: []
      }
    },

    settings: {
      companyName: '',
      phone: '',
      email: '',
      website: '',
      licenseNumbers: '',
      taxRate: 0,
      primaryColor: '#2e7d32',
      accentColor:  '#f9a825',
      logo: null,
      termsAndConditions: ''
    },

    init() {
      const saved = localStorage.getItem('estimator-settings');
      if (saved) {
        try { Object.assign(this.settings, JSON.parse(saved)); } catch (_) {}
      }
      this.applyTheme();
      this.$watch('settings.primaryColor', () => this.applyTheme());
      this.$watch('settings.accentColor',  () => this.applyTheme());
    },

    // --- Color utilities ---
    hexToRgb(hex) {
      const h = (hex || '#000000').replace('#', '');
      return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
    },
    mixWithWhite(rgb, factor) { // factor = 0→white, 1→original
      return rgb.map(c => Math.round(c * factor + 255 * (1 - factor)));
    },
    rgbToHex(rgb) {
      return '#' + rgb.map(c => Math.min(255, Math.max(0, c)).toString(16).padStart(2,'0')).join('');
    },
    luminance(rgb) {
      return rgb.map(c => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      }).reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
    },
    isLightColor(hex) {
      return this.luminance(this.hexToRgb(hex)) > 0.35;
    },
    contrastText(hex) {
      return this.isLightColor(hex) ? '#1a1a1a' : '#ffffff';
    },
    applyTheme() {
      const p = this.settings.primaryColor || '#2e7d32';
      const a = this.settings.accentColor  || '#f9a825';
      const pRgb = this.hexToRgb(p);
      const aRgb = this.hexToRgb(a);
      const pLight  = this.rgbToHex(this.mixWithWhite(pRgb, 0.2));
      const pVlight = this.rgbToHex(this.mixWithWhite(pRgb, 0.09));
      const pText   = this.contrastText(p);
      const aText   = this.contrastText(a);
      const r = document.documentElement;
      r.style.setProperty('--theme-primary',        p);
      r.style.setProperty('--theme-primary-rgb',    pRgb.join(', '));
      r.style.setProperty('--theme-primary-light',  pLight);
      r.style.setProperty('--theme-primary-vlight', pVlight);
      r.style.setProperty('--theme-primary-text',   pText);
      r.style.setProperty('--theme-accent',         a);
      r.style.setProperty('--theme-accent-text',    aText);
    },

    // --- Scope drag-and-drop (native HTML5) ---
    dragIndex: null,
    dropIndex: null,

    scopeDragStart(evt, i) {
      this.dragIndex = i;
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('text/plain', i); // required for Firefox
    },
    scopeDragOver(evt, i) {
      if (this.dragIndex === null || this.dragIndex === i) return;
      this.dropIndex = i;
    },
    scopeDragLeave(evt) {
      // Only clear if leaving the row entirely (not entering a child element)
      if (!evt.currentTarget.contains(evt.relatedTarget)) {
        this.dropIndex = null;
      }
    },
    scopeDrop(evt, i) {
      if (this.dragIndex === null || this.dragIndex === i) return;
      const arr = this.estimate.scopeOfWork;
      const moved = arr.splice(this.dragIndex, 1)[0];
      arr.splice(i, 0, moved);
      this.dragIndex = null;
      this.dropIndex = null;
    },
    scopeDragEnd() {
      this.dragIndex = null;
      this.dropIndex = null;
    },

    // --- Array helpers ---
    addScopeItem()  { this.estimate.scopeOfWork.push({ _id: Date.now() + Math.random(), title: '', description: '' }); },
    addMaterial()   { this.estimate.costs.materials.push({ name: '', qty: 0, unitPrice: 0 }); },
    addMachinery()  { this.estimate.costs.machinery.push({ name: '', duration: 1, rate: 0 }); },
    addMisc()       { this.estimate.costs.misc.push({ description: '', amount: 0 }); },

    // --- Labor stepper (0.5 increments) ---
    decrementLaborDays() {
      const next = Math.round((this.estimate.costs.laborDays - 0.5) * 10) / 10;
      if (next >= 0.5) this.estimate.costs.laborDays = next;
    },
    incrementLaborDays() {
      this.estimate.costs.laborDays = Math.round((this.estimate.costs.laborDays + 0.5) * 10) / 10;
    },
    validateLaborDays() {
      const v = parseFloat(this.estimate.costs.laborDays) || 0.5;
      this.estimate.costs.laborDays = Math.max(0.5, Math.round(v * 2) / 2);
    },

    // --- Calculations ---
    materialsTotal() {
      return this.estimate.costs.materials.reduce((s, m) => s + (+(m.qty) || 0) * (+(m.unitPrice) || 0), 0);
    },
    machineryTotal() {
      return this.estimate.costs.machinery.reduce((s, m) => s + (+(m.duration) || 0) * (+(m.rate) || 0), 0);
    },
    laborTotal() {
      return (+(this.estimate.costs.laborDays) || 0) * (+(this.estimate.costs.laborDailyRate) || 0);
    },
    miscTotal() {
      return this.estimate.costs.misc.reduce((s, m) => s + (+(m.amount) || 0), 0);
    },
    taxAmount() {
      const rate = +(this.settings.taxRate) || 0;
      return (this.materialsTotal() + this.machineryTotal()) * (rate / 100);
    },
    grandTotal() {
      return this.materialsTotal() + this.machineryTotal() + this.taxAmount() + this.laborTotal() + this.miscTotal();
    },

    fmt(n) { return '$' + (+(n) || 0).toFixed(2); },

    // --- Settings ---
    loadLogo(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => { this.settings.logo = e.target.result; };
      reader.readAsDataURL(file);
    },
    removeLogo() {
      this.settings.logo = null;
      document.getElementById('logo-input').value = '';
    },
    saveSettings() {
      localStorage.setItem('estimator-settings', JSON.stringify(this.settings));
      this.settingsSaved = true;
      setTimeout(() => { this.settingsSaved = false; }, 3000);
    },

    // --- Clear estimate ---
    clearEstimate() {
      if (!confirm('Clear all estimate data? This cannot be undone.')) return;
      this.estimate = {
        customerName: '', customerAddress: '',
        estimateDate: new Date().toISOString().split('T')[0],
        projectName: '', scopeOfWork: [],
        startDate: '', completionDate: '',
        costs: { materials: [], machinery: [], laborDays: 1.0, laborDailyRate: 400.00, misc: [] }
      };
    },

    // --- PDF Generation ---
    generatePDF() {
      const e = this.estimate;
      const s = this.settings;

      if (!e.customerName.trim()) {
        alert('Please enter a customer name before generating the PDF.');
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: 'pt', format: 'letter' });

      const PW  = doc.internal.pageSize.getWidth();
      const PH  = doc.internal.pageSize.getHeight();
      const M   = 40;
      const CW  = PW - M * 2;

      const GREEN    = this.hexToRgb(s.primaryColor || '#2e7d32');
      const LT_GREEN = this.mixWithWhite(GREEN, 0.2);
      const VLT      = this.mixWithWhite(GREEN, 0.09);
      const AMBER    = this.hexToRgb(s.accentColor  || '#f9a825');
      const GREEN_TEXT  = this.isLightColor(s.primaryColor || '#2e7d32') ? [26,26,26] : [255,255,255];
      const AMBER_TEXT  = this.isLightColor(s.accentColor  || '#f9a825') ? [26,26,26] : [255,255,255];
      const GRAY     = [110, 110, 110];

      const money = (n) => '$' + (+(n) || 0).toFixed(2);
      const fmtDate = (d) => d
        ? new Date(d + 'T12:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : '';

      const taxRate = +(s.taxRate) || 0;
      const matSub  = this.materialsTotal();
      const matTax  = matSub  * taxRate / 100;
      const machSub = this.machineryTotal();
      const machTax = machSub * taxRate / 100;

      let y = M;

      // ---- Logo ----
      if (s.logo) {
        try {
          const fmt = s.logo.startsWith('data:image/png') ? 'PNG' : 'JPEG';
          const img = new Image();
          img.src = s.logo;
          const maxW = 130, maxH = 60;
          const ratio = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight);
          const lw = img.naturalWidth * ratio;
          const lh = img.naturalHeight * ratio;
          doc.addImage(s.logo, fmt, PW - M - lw, y, lw, lh);
        } catch (_) {}
      }

      // ---- Title ----
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...GREEN);
      doc.text('Project Estimate', M, y + 20);
      if (e.projectName) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...GRAY);
        doc.text(e.projectName, M, y + 34);
      }
      y += 62;

      // ---- Client / date block ----
      const clientBody = [
        [
          { content: 'Prepared For', styles: { fontStyle: 'bold', fontSize: 8, textColor: GRAY } },
          { content: 'Date', styles: { fontStyle: 'bold', fontSize: 8, textColor: GRAY, halign: 'right' } }
        ],
        [
          { content: e.customerName, styles: { fontStyle: 'bold', fontSize: 12 } },
          { content: fmtDate(e.estimateDate), styles: { halign: 'right', fontSize: 10 } }
        ]
      ];
      if (e.customerAddress) {
        clientBody.push([
          { content: e.customerAddress, styles: { textColor: GRAY, fontSize: 9 } },
          { content: e.startDate ? 'Start: ' + fmtDate(e.startDate) : '', styles: { halign: 'right', textColor: GRAY, fontSize: 9 } }
        ]);
      }
      if (e.completionDate) {
        clientBody.push([
          '',
          { content: 'Est. Completion: ' + fmtDate(e.completionDate), styles: { halign: 'right', textColor: GRAY, fontSize: 9 } }
        ]);
      }

      doc.autoTable({
        startY: y, margin: { left: M, right: M }, tableWidth: CW,
        theme: 'plain',
        styles: { cellPadding: { top: 4, bottom: 4, left: 10, right: 10 }, fillColor: VLT },
        body: clientBody,
        columnStyles: { 0: { cellWidth: CW * 0.6 }, 1: { cellWidth: CW * 0.4 } }
      });
      y = doc.lastAutoTable.finalY + 18;

      // ---- Scope of Work ----
      const scopeItems = e.scopeOfWork.filter(i => i.title || i.description);
      if (scopeItems.length > 0) {
        doc.autoTable({
          startY: y, margin: { left: M, right: M }, tableWidth: CW,
          head: [['Scope of Work', 'Description']],
          body: scopeItems.map(i => [
            { content: i.title || '', styles: { fontStyle: 'bold' } },
            i.description || ''
          ]),
          headStyles: { fillColor: GREEN, textColor: GREEN_TEXT, fontSize: 10, fontStyle: 'bold' },
          bodyStyles: { fontSize: 10 },
          columnStyles: { 0: { cellWidth: CW * 0.3 }, 1: { cellWidth: CW * 0.7 } }
        });
        y = doc.lastAutoTable.finalY + 14;
      }

      // ---- Materials ----
      if (e.costs.materials.length > 0) {
        const foot = [[
          { content: 'Subtotal', colSpan: 3, styles: { halign: 'right', fontStyle: 'bold' } },
          { content: money(matSub), styles: { halign: 'right', fontStyle: 'bold' } }
        ]];
        if (taxRate > 0) {
          foot.push([
            { content: `Tax (${taxRate}%)`, colSpan: 3, styles: { halign: 'right', textColor: GRAY } },
            { content: money(matTax), styles: { halign: 'right', textColor: GRAY } }
          ]);
          foot.push([
            { content: 'Total with Tax', colSpan: 3, styles: { halign: 'right', fontStyle: 'bold' } },
            { content: money(matSub + matTax), styles: { halign: 'right', fontStyle: 'bold' } }
          ]);
        }
        doc.autoTable({
          startY: y, margin: { left: M, right: M }, tableWidth: CW, showFoot: 'lastPage',
          head: [['Materials', 'Qty', 'Unit Price', 'Line Total']],
          body: e.costs.materials.map(m => [
            m.name || '',
            { content: m.qty,                                        styles: { halign: 'center' } },
            { content: money(m.unitPrice),                           styles: { halign: 'right' } },
            { content: money((+m.qty||0)*(+m.unitPrice||0)),         styles: { halign: 'right', fontStyle: 'bold' } }
          ]),
          foot,
          headStyles: { fillColor: GREEN, textColor: GREEN_TEXT, fontSize: 10, fontStyle: 'bold' },
          footStyles: { fillColor: LT_GREEN, textColor: [30, 30, 30], fontSize: 10 },
          bodyStyles: { fontSize: 10 },
          columnStyles: { 0: { cellWidth: CW*0.46 }, 1: { cellWidth: CW*0.14 }, 2: { cellWidth: CW*0.2 }, 3: { cellWidth: CW*0.2 } }
        });
        y = doc.lastAutoTable.finalY + 14;
      }

      // ---- Machinery ----
      if (e.costs.machinery.length > 0) {
        const foot = [[
          { content: 'Subtotal', colSpan: 3, styles: { halign: 'right', fontStyle: 'bold' } },
          { content: money(machSub), styles: { halign: 'right', fontStyle: 'bold' } }
        ]];
        if (taxRate > 0) {
          foot.push([
            { content: `Tax (${taxRate}%)`, colSpan: 3, styles: { halign: 'right', textColor: GRAY } },
            { content: money(machTax), styles: { halign: 'right', textColor: GRAY } }
          ]);
          foot.push([
            { content: 'Total with Tax', colSpan: 3, styles: { halign: 'right', fontStyle: 'bold' } },
            { content: money(machSub + machTax), styles: { halign: 'right', fontStyle: 'bold' } }
          ]);
        }
        doc.autoTable({
          startY: y, margin: { left: M, right: M }, tableWidth: CW, showFoot: 'lastPage',
          head: [['Machinery', 'Duration', 'Daily Rate', 'Line Total']],
          body: e.costs.machinery.map(m => [
            m.name || '',
            { content: m.duration + ' day(s)',                       styles: { halign: 'center' } },
            { content: money(m.rate) + '/day',                       styles: { halign: 'right' } },
            { content: money((+m.duration||0)*(+m.rate||0)),         styles: { halign: 'right', fontStyle: 'bold' } }
          ]),
          foot,
          headStyles: { fillColor: AMBER, textColor: AMBER_TEXT, fontSize: 10, fontStyle: 'bold' },
          footStyles: { fillColor: LT_GREEN, textColor: [30, 30, 30], fontSize: 10 },
          bodyStyles: { fontSize: 10 },
          columnStyles: { 0: { cellWidth: CW*0.46 }, 1: { cellWidth: CW*0.14 }, 2: { cellWidth: CW*0.2 }, 3: { cellWidth: CW*0.2 } }
        });
        y = doc.lastAutoTable.finalY + 14;
      }

      // ---- Labor ----
      doc.autoTable({
        startY: y, margin: { left: M, right: M }, tableWidth: CW,
        head: [['Labor', 'Days', 'Daily Rate', 'Total']],
        body: [[
          'Labor',
          { content: e.costs.laborDays,                              styles: { halign: 'center' } },
          { content: money(e.costs.laborDailyRate) + '/day',         styles: { halign: 'right' } },
          { content: money(this.laborTotal()),                        styles: { halign: 'right', fontStyle: 'bold' } }
        ]],
        headStyles: { fillColor: GREEN, textColor: 255, fontSize: 10, fontStyle: 'bold' },
        bodyStyles: { fontSize: 10 },
        columnStyles: { 0: { cellWidth: CW*0.46 }, 1: { cellWidth: CW*0.14 }, 2: { cellWidth: CW*0.2 }, 3: { cellWidth: CW*0.2 } }
      });
      y = doc.lastAutoTable.finalY + 14;

      // ---- Misc ----
      if (e.costs.misc.length > 0) {
        doc.autoTable({
          startY: y, margin: { left: M, right: M }, tableWidth: CW, showFoot: 'lastPage',
          head: [['Miscellaneous', 'Amount']],
          body: e.costs.misc.map(m => [
            m.description || '',
            { content: money(m.amount), styles: { halign: 'right', fontStyle: 'bold' } }
          ]),
          foot: [[
            { content: 'Subtotal', styles: { halign: 'right', fontStyle: 'bold' } },
            { content: money(this.miscTotal()), styles: { halign: 'right', fontStyle: 'bold' } }
          ]],
          headStyles: { fillColor: GREEN, textColor: GREEN_TEXT, fontSize: 10, fontStyle: 'bold' },
          footStyles: { fillColor: LT_GREEN, textColor: [30, 30, 30], fontSize: 10 },
          bodyStyles: { fontSize: 10 },
          columnStyles: { 0: { cellWidth: CW*0.8 }, 1: { cellWidth: CW*0.2 } }
        });
        y = doc.lastAutoTable.finalY + 14;
      }

      // ---- Grand Total ----
      doc.autoTable({
        startY: y, margin: { left: M, right: M }, tableWidth: CW,
        theme: 'plain',
        body: [[
          { content: 'TOTAL ESTIMATE' },
          { content: money(this.grandTotal()), styles: { halign: 'right', textColor: GREEN_TEXT } }
        ]],
        bodyStyles: { fillColor: GREEN, textColor: GREEN_TEXT, fontStyle: 'bold', fontSize: 13, cellPadding: { top: 10, bottom: 10, left: 12, right: 12 } },
        columnStyles: { 0: { cellWidth: CW*0.7 }, 1: { cellWidth: CW*0.3 } }
      });
      y = doc.lastAutoTable.finalY + 14;

      // ---- Company contact footer ----
      const contactParts = [
        s.companyName, s.phone, s.email, s.website,
        s.licenseNumbers ? 'Lic# ' + s.licenseNumbers : ''
      ].filter(Boolean);
      if (contactParts.length > 0) {
        doc.setFillColor(...LT_GREEN);
        const contactText = contactParts.join('  |  ');
        const lines = doc.splitTextToSize(contactText, CW - 20);
        const boxH = lines.length * 13 + 12;
        doc.roundedRect(M, y, CW, boxH, 3, 3, 'F');
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        doc.text(lines, M + 10, y + 10, { baseline: 'top' });
        y += boxH + 14;
      }

      // ---- Terms & Conditions ----
      if (s.termsAndConditions) {
        if (y > PH - 120) { doc.addPage(); y = M; }
        doc.setDrawColor(...GREEN);
        doc.setLineWidth(1.5);
        doc.line(M, y, M + CW, y);
        y += 12;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...GREEN);
        doc.text('TERMS & CONDITIONS', M, y);
        y += 13;
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        doc.text(doc.splitTextToSize(s.termsAndConditions, CW), M, y);
      }

      // ---- Save ----
      const safeName = e.customerName.replace(/[^a-z0-9]/gi, '_');
      doc.save(`${safeName}_${e.estimateDate || 'draft'}.pdf`);
    }
  }));
});
