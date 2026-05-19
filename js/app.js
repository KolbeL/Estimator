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
      logo: null,
      termsAndConditions: ''
    },

    init() {
      const saved = localStorage.getItem('estimator-settings');
      if (saved) {
        try { this.settings = JSON.parse(saved); } catch (_) {}
      }
    },

    // --- Array helpers ---
    addScopeItem()  { this.estimate.scopeOfWork.push({ title: '', description: '' }); },
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
    grandTotal() {
      return this.materialsTotal() + this.machineryTotal() + this.laborTotal() + this.miscTotal();
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

      const fmtDate = (d) => d
        ? new Date(d + 'T12:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : '';

      const cell = (content, opts = '') =>
        `<td style="padding:8px 10px; border:1px solid #c8e6c9; ${opts}">${content}</td>`;
      const th = (content, opts = '') =>
        `<th style="padding:8px 10px; border:1px solid #a5d6a7; background:#e8f5e9; ${opts}">${content}</th>`;

      const sectionHeader = (title) =>
        `<h3 style="color:#2e7d32; border-bottom:2px solid #2e7d32; padding-bottom:5px; margin:24px 0 12px; font-size:15px; text-transform:uppercase; letter-spacing:0.05em;">${title}</h3>`;

      // Scope rows
      const scopeRows = e.scopeOfWork.filter(i => i.title || i.description).map(item => `
        <tr>
          ${cell(`<strong>${item.title}</strong>`, 'width:200px; vertical-align:top;')}
          ${cell(item.description)}
        </tr>`).join('');

      // Materials rows
      const matRows = e.costs.materials.map(m => `
        <tr>
          ${cell(m.name)}
          ${cell(m.qty, 'text-align:center;')}
          ${cell(this.fmt(m.unitPrice), 'text-align:right;')}
          ${cell(`<strong>${this.fmt((+m.qty || 0) * (+m.unitPrice || 0))}</strong>`, 'text-align:right;')}
        </tr>`).join('');

      // Machinery rows
      const machRows = e.costs.machinery.map(m => `
        <tr>
          ${cell(m.name)}
          ${cell(m.duration + ' day(s)', 'text-align:center;')}
          ${cell(this.fmt(m.rate) + '/day', 'text-align:right;')}
          ${cell(`<strong>${this.fmt((+m.duration || 0) * (+m.rate || 0))}</strong>`, 'text-align:right;')}
        </tr>`).join('');

      // Misc rows
      const miscRows = e.costs.misc.map(m => `
        <tr>
          ${cell(m.description)}
          ${cell(`<strong>${this.fmt(m.amount)}</strong>`, 'text-align:right;')}
        </tr>`).join('');

      const tableStyle = 'width:100%; border-collapse:collapse; font-size:13px;';
      const subtotalRow = (colspan, amount) => `
        <tr style="background:#f1f8e9;">
          <td colspan="${colspan}" style="padding:8px 10px; border:1px solid #c8e6c9; text-align:right; font-weight:bold;">Subtotal:</td>
          <td style="padding:8px 10px; border:1px solid #c8e6c9; text-align:right; font-weight:bold;">${this.fmt(amount)}</td>
        </tr>`;

      const machinerySection = e.costs.machinery.length > 0 ? `
        <div style="page-break-inside:avoid; margin-bottom:20px;">
          ${sectionHeader('Machinery Rentals')}
          <table style="${tableStyle}">
            <thead><tr>${th('Equipment')}${th('Duration','text-align:center;')}${th('Rate','text-align:right;')}${th('Total','text-align:right;')}</tr></thead>
            <tbody>${machRows}</tbody>
            <tfoot>${subtotalRow(3, this.machineryTotal())}</tfoot>
          </table>
        </div>` : '';

      const miscSection = e.costs.misc.length > 0 ? `
        <div style="page-break-inside:avoid; margin-bottom:20px;">
          ${sectionHeader('Miscellaneous')}
          <table style="${tableStyle}">
            <thead><tr>${th('Description')}${th('Amount','text-align:right;')}</tr></thead>
            <tbody>${miscRows}</tbody>
            <tfoot>${subtotalRow(1, this.miscTotal())}</tfoot>
          </table>
        </div>` : '';

      const contactParts = [
        s.companyName ? `<strong>${s.companyName}</strong>` : '',
        s.phone       ? `&#128222; ${s.phone}` : '',
        s.email       ? `&#9993; ${s.email}` : '',
        s.website     ? `&#127760; ${s.website}` : '',
        s.licenseNumbers ? `Lic# ${s.licenseNumbers}` : '',
      ].filter(Boolean).join(' &nbsp;|&nbsp; ');

      const html = `
        <div style="font-family:Arial,sans-serif; color:#222; padding:40px; max-width:780px; margin:0 auto;">

          <!-- Page Header -->
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:28px; page-break-inside:avoid;">
            <div>
              <h1 style="color:#2e7d32; margin:0 0 4px; font-size:28px;">Project Estimate</h1>
              ${e.projectName ? `<p style="margin:0; color:#555; font-size:14px;">${e.projectName}</p>` : ''}
            </div>
            <div style="text-align:right;">
              ${s.logo ? `<img src="${s.logo}" style="max-height:80px; max-width:200px;" />` : ''}
            </div>
          </div>

          <!-- Client / Date info -->
          <div style="display:flex; justify-content:space-between; margin-bottom:24px; padding:16px; background:#f9fbe7; border-radius:6px; page-break-inside:avoid;">
            <div>
              <div style="font-size:11px; text-transform:uppercase; color:#888; margin-bottom:4px;">Prepared For</div>
              <div style="font-weight:bold; font-size:15px;">${e.customerName}</div>
              ${e.customerAddress ? `<div style="white-space:pre-line; color:#555; font-size:13px;">${e.customerAddress}</div>` : ''}
            </div>
            <div style="text-align:right; font-size:13px;">
              <div><strong>Date:</strong> ${fmtDate(e.estimateDate)}</div>
              ${e.startDate ? `<div><strong>Start:</strong> ${fmtDate(e.startDate)}</div>` : ''}
              ${e.completionDate ? `<div><strong>Est. Completion:</strong> ${fmtDate(e.completionDate)}</div>` : ''}
            </div>
          </div>

          <!-- Scope of Work -->
          ${scopeRows ? `
          <div style="page-break-inside:avoid; margin-bottom:20px;">
            ${sectionHeader('Scope of Work')}
            <table style="${tableStyle}">
              <tbody>${scopeRows}</tbody>
            </table>
          </div>` : ''}

          <!-- Materials -->
          ${matRows ? `
          <div style="page-break-inside:avoid; margin-bottom:20px;">
            ${sectionHeader('Materials')}
            <table style="${tableStyle}">
              <thead><tr>${th('Item')}${th('Qty','text-align:center;')}${th('Unit Price','text-align:right;')}${th('Line Total','text-align:right;')}</tr></thead>
              <tbody>${matRows}</tbody>
              <tfoot>${subtotalRow(3, this.materialsTotal())}</tfoot>
            </table>
          </div>` : ''}

          ${machinerySection}

          <!-- Labor -->
          <div style="page-break-inside:avoid; margin-bottom:20px;">
            ${sectionHeader('Labor')}
            <table style="${tableStyle}">
              <thead><tr>${th('Description')}${th('Days','text-align:center;')}${th('Daily Rate','text-align:right;')}${th('Total','text-align:right;')}</tr></thead>
              <tbody>
                <tr>
                  ${cell('Labor')}
                  ${cell(e.costs.laborDays, 'text-align:center;')}
                  ${cell(this.fmt(e.costs.laborDailyRate) + '/day', 'text-align:right;')}
                  ${cell(`<strong>${this.fmt(this.laborTotal())}</strong>`, 'text-align:right;')}
                </tr>
              </tbody>
            </table>
          </div>

          ${miscSection}

          <!-- Grand Total -->
          <div style="page-break-inside:avoid; margin:28px 0;">
            <table style="width:100%; border-collapse:collapse;">
              <tr style="background:#2e7d32; color:white;">
                <td style="padding:14px 16px; font-weight:bold; font-size:16px; letter-spacing:0.05em;">TOTAL ESTIMATE</td>
                <td style="padding:14px 16px; font-weight:bold; font-size:20px; text-align:right;">${this.fmt(this.grandTotal())}</td>
              </tr>
            </table>
          </div>

          <!-- Company footer -->
          ${contactParts ? `
          <div style="margin-top:20px; padding:12px 16px; background:#e8f5e9; border-radius:6px; font-size:12px; color:#444;">
            ${contactParts}
          </div>` : ''}

          <!-- Terms & Conditions -->
          ${s.termsAndConditions ? `
          <div style="page-break-inside:avoid; margin-top:24px; padding-top:16px; border-top:2px solid #c8e6c9;">
            <h3 style="color:#2e7d32; font-size:13px; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:8px;">Terms &amp; Conditions</h3>
            <p style="font-size:11px; color:#555; white-space:pre-wrap; line-height:1.6;">${s.termsAndConditions}</p>
          </div>` : ''}

        </div>`;

      const tpl = document.getElementById('pdf-template');
      tpl.innerHTML = html;
      // html2canvas cannot capture off-screen elements — bring it into the viewport
      tpl.style.cssText = 'display:block; position:fixed; top:0; left:0; width:8.5in; background:white; z-index:-1; pointer-events:none;';

      const safeName = e.customerName.replace(/[^a-z0-9]/gi, '_');
      const filename = `Estimate_${safeName}_${e.estimateDate || 'draft'}.pdf`;

      html2pdf().set({
        margin: 0,
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, windowWidth: 816 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }).from(tpl).save().then(() => {
        tpl.style.cssText = 'display:none;';
        tpl.innerHTML = '';
      });
    }
  }));
});
