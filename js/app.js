const QPE_DEFAULT_PREFABS = {
  landscaping: [
    { title: 'Site Preparation',         description: 'Clear and grade the designated area, remove debris, and prepare soil for new installation.' },
    { title: 'Plant or Sod Install',     description: 'Supply and install specified plants or sod in the designated area per the approved plan.' },
    { title: 'Cleanup & Haul Away',      description: 'Remove all job-site debris and haul away waste materials upon project completion.' },
  ],
  painting: [
    { title: 'Surface Preparation',      description: 'Scrape, sand, patch holes, and apply primer to all designated surfaces prior to painting.' },
    { title: 'Paint Application',        description: 'Apply two finish coats of specified paint to all designated surfaces and trim.' },
    { title: 'Touch-Up & Cleanup',       description: 'Inspect all surfaces, complete touch-ups, and remove all protective coverings and materials.' },
  ],
  plumbing: [
    { title: 'Rough-In Plumbing',        description: 'Install all supply and drain lines per the approved plan prior to wall finishes.' },
    { title: 'Fixture Installation',     description: 'Supply and install all specified fixtures with connections, shut-offs, and trim.' },
    { title: 'Pressure Test & Sign-Off', description: 'Pressure test all new lines and coordinate with the inspector for required approval.' },
  ],
  roofing: [
    { title: 'Tear-Off & Disposal',      description: 'Strip existing roofing and underlayment and dispose of all debris off-site.' },
    { title: 'Install Roofing System',   description: 'Install new underlayment, specified roofing material, and all required flashing and trim.' },
    { title: 'Cleanup & Inspection',     description: 'Clear gutters and surrounding area of debris and inspect the completed roof for defects.' },
  ],
  hvac: [
    { title: 'Equipment Removal',        description: 'Disconnect and safely remove existing HVAC equipment and prepare the site for new installation.' },
    { title: 'System Installation',      description: 'Install new equipment including ductwork, refrigerant lines, and electrical connections.' },
    { title: 'Start-Up & Commissioning', description: 'Test system operation, verify airflow, and confirm proper function of all controls and settings.' },
  ],
  flooring: [
    { title: 'Subfloor Preparation',     description: 'Inspect and repair the subfloor, remove old flooring, and level the surface as required.' },
    { title: 'Flooring Installation',    description: 'Install specified flooring material in the designated area including transitions and trim.' },
    { title: 'Final Cleanup',            description: 'Remove all protective coverings, clean installed flooring, and inspect for defects or damage.' },
  ],
  fencing: [
    { title: 'Layout & Post Setting',    description: 'Mark fence line, dig post holes to required depth, and set posts in concrete.' },
    { title: 'Panel & Hardware Install', description: 'Install fence panels, gates, and all associated hardware per the approved specifications.' },
    { title: 'Final Inspection',         description: 'Verify fence is level and plumb, remove all job-site debris, and clean up the area.' },
  ],
  drywall: [
    { title: 'Hang Drywall',             description: 'Measure, cut, and hang drywall on all designated walls and ceilings per the approved plan.' },
    { title: 'Tape, Mud & Sand',         description: 'Apply tape and joint compound in multiple coats, then sand smooth for a paint-ready finish.' },
    { title: 'Prime & Final Prep',       description: 'Apply primer coat to all new drywall surfaces and perform final sanding as needed.' },
  ],
  pool: [
    { title: 'Excavation & Shell',       description: 'Excavate to specified dimensions and install the pool or spa shell per engineered plans.' },
    { title: 'Plumbing & Equipment',     description: 'Install all pool plumbing, pump, filter, heater, and required electrical connections.' },
    { title: 'Finish, Fill & Balance',   description: 'Apply interior finish, fill with water, and balance chemistry for safe use.' },
  ],
  solar: [
    { title: 'Mounting Installation',    description: 'Install racking and mounting hardware at the approved roof or ground location.' },
    { title: 'Panel & Inverter Install', description: 'Mount panels, run wiring, and install inverter and all required disconnects per the electrical plan.' },
    { title: 'Commissioning & Tie-In',  description: 'Test system output, submit utility interconnect paperwork, and verify full operation.' },
  ],
  electrical: [
    { title: 'Rough-In Wiring',          description: 'Install conduit, pull wire, and set boxes per the approved electrical plan before wall finishes.' },
    { title: 'Device & Panel Work',      description: 'Install outlets, switches, fixtures, and complete all panel connections and circuit labeling.' },
    { title: 'Testing & Inspection',     description: 'Test all circuits, verify GFCI and AFCI protection, and coordinate inspector sign-off.' },
  ],
  concrete: [
    { title: 'Formwork & Base Prep',     description: 'Set forms, compact base material, and install required reinforcement prior to the pour.' },
    { title: 'Pour & Finish',            description: 'Pour concrete or lay masonry to the specified thickness and finish to the required grade.' },
    { title: 'Cure & Seal',              description: 'Protect during the curing period and apply specified sealer for long-term protection.' },
  ],
  general: [
    { title: 'Project Mobilization',     description: 'Obtain permits, establish site access, and coordinate subcontractor scheduling and deliveries.' },
    { title: 'Construction Management',  description: 'Manage daily site activities, subcontractor quality, required inspections, and schedule compliance.' },
    { title: 'Final Walkthrough',        description: 'Conduct client walkthrough, address all punch list items, and obtain final sign-off.' },
  ],
  doors: [
    { title: 'Remove & Dispose',         description: 'Remove existing door or window unit and dispose of all materials and hardware off-site.' },
    { title: 'Install New Unit',         description: 'Supply and install specified door or window unit including frame, trim, and all hardware.' },
    { title: 'Seal & Finish',            description: 'Apply weatherstripping, caulk all perimeter gaps, and complete interior and exterior trim finish.' },
  ],
  interiordesign: [
    { title: 'Design Consultation',      description: 'Meet with client to assess the space, define style direction, and establish project scope and budget.' },
    { title: 'Space Planning & Sourcing', description: 'Develop floor plan and furniture layout, source all specified furnishings, fixtures, and finishes.' },
    { title: 'Installation & Styling',   description: 'Coordinate delivery and installation of all furnishings and complete final styling of the space.' },
  ],
  handyman: [
    { title: 'Assessment & Material List', description: 'Evaluate requested repairs, identify all required materials, and confirm the final scope of work.' },
    { title: 'Repairs & Installation',   description: 'Complete all specified repairs, replacements, and minor installations per the agreed scope.' },
    { title: 'Cleanup & Walkthrough',    description: 'Clean up all work areas and conduct a walkthrough to confirm all items are completed.' },
  ],
};

document.addEventListener('alpine:init', () => {
  Alpine.data('estimatorApp', () => ({
    currentView: 'estimator',
    settingsSaved: false,
    onboardingStep: 0,
    prefabPickerOpen: false,
    contactModalOpen: false,
    prefabPickerTrade: '',
    authUser: null,
    authEmail: '',
    authPassword: '',
    authError: '',
    authLoading: false,
    syncStatus: '',
    showCreateAccount: false,
    firebaseReady: false,

    openModal: false,
    openTab: 'pdf',
    cloudEstimates: [],
    cloudEstimatesLoading: false,
    cloudSaveStatus: '',
    loadedCloudId: null,

    confirmMessage: '',
    confirmResolve: null,

    calcModalOpen: false,
    calcTab: 'paint',
    calc: {
      paint:  { name: 'Paint',           wallsSqFt: 0, ceilingSqFt: 0, doors: 0, windows: 0, coats: 2, coverage: 350, pricePerGal: 0 },
      gravel: { name: 'Gravel',          length: 0, width: 0,  depth: 3,      pricePerYd: 0 },
      sod:    { name: 'Sod',             mode: 'dimensions', length: 0, width: 0, sqFtDirect: 0, sqFtPerPallet: 450, pricePerPallet: 0 },
      tile:   { name: 'Tile / Flooring', mode: 'dimensions', length: 0, width: 0, sqFtDirect: 0, waste: 10, pricePerSqFt: 0 },
    },

    estimate: {
      customerName: '',
      customerAddress: '',
      estimateDate: new Date().toISOString().split('T')[0],
      projectName: '',
      scopeOfWork: [],
      photos: [],
      startDate: '',
      completionDate: '',
      costs: {
        materials: [],
        machinery: [],
        laborDays: 1.0,
        laborWorkers: 1,
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
      primaryColor: '#3A5890',
      accentColor:  '#C99C2C',
      titleColor:   '#3A5890',
      darkMode:     'os',
      logo: null,
      termsAndConditions: `50% deposit due at project start, balance due upon completion.

Any additional work beyond the services listed above may incur extra charges.`,
      selectedTrade: '',
      prefabScopeItems: [],
      initializedTrades: []
    },

    trades: [
      { id: 'landscaping', label: 'Landscaping',          icon: 'bi-tree' },
      { id: 'painting',    label: 'Painting',              icon: 'bi-brush' },
      { id: 'plumbing',    label: 'Plumbing',              icon: 'bi-droplet-half' },
      { id: 'roofing',     label: 'Roofing',               icon: 'bi-house' },
      { id: 'hvac',        label: 'HVAC',                  icon: 'bi-wind' },
      { id: 'flooring',    label: 'Flooring',              icon: 'bi-grid' },
      { id: 'fencing',     label: 'Fencing',               icon: 'bi-slash-lg' },
      { id: 'drywall',     label: 'Drywall',               icon: 'bi-layers' },
      { id: 'pool',        label: 'Pool / Spa',            icon: 'bi-water' },
      { id: 'solar',       label: 'Solar',                 icon: 'bi-sun' },
      { id: 'electrical',  label: 'Electrical',            icon: 'bi-lightning' },
      { id: 'concrete',       label: 'Concrete / Masonry',    icon: 'bi-bricks' },
      { id: 'general',        label: 'General Contracting',   icon: 'bi-tools' },
      { id: 'doors',          label: 'Door / Window',         icon: 'bi-window' },
      { id: 'interiordesign', label: 'Interior Design',       icon: 'bi-palette' },
      { id: 'handyman',       label: 'Handyman',              icon: 'bi-wrench' },
    ],

    init() {
      const saved = localStorage.getItem('estimator-settings');
      if (saved) {
        try { Object.assign(this.settings, JSON.parse(saved)); } catch (_) {}
      }
      // Backfill initializedTrades for saves that predate the field
      this.settings.prefabScopeItems.forEach(item => {
        if (item.tradeId && !this.settings.initializedTrades.includes(item.tradeId)) {
          this.settings.initializedTrades.push(item.tradeId);
        }
      });
      // Migrate any saved green primary or yellow/orange accent to new blue/gold defaults
      const isGreenish   = (h) => { const c = parseInt((h||'').replace('#','').slice(2,4),16); const r = parseInt((h||'').replace('#','').slice(0,2),16); return c > r + 30; };
      const isYellowish  = (h) => { const r = parseInt((h||'').replace('#','').slice(0,2),16); const b = parseInt((h||'').replace('#','').slice(4,6),16); return r > 180 && b < 80; };
      if (isGreenish(this.settings.primaryColor)) {
        this.settings.primaryColor = '#3A5890';
        this.settings.titleColor   = '#3A5890';
      }
      if (isYellowish(this.settings.accentColor)) {
        this.settings.accentColor = '#C99C2C';
      }
      this.applyTheme();
      this.applyDarkMode();
      this.$watch('settings.primaryColor', () => this.applyTheme());
      this.$watch('settings.accentColor',  () => this.applyTheme());
      this.$watch('settings.darkMode',     () => this.applyDarkMode());
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if ((this.settings.darkMode || 'os') === 'os') this.applyDarkMode();
      });
      if (!localStorage.getItem('onboarding-complete')) {
        this.onboardingStep = 1;
      }

      // Restore in-progress draft estimate
      const draft = localStorage.getItem('estimator-draft');
      if (draft) {
        try {
          const data = JSON.parse(draft);
          const { costs, scopeOfWork, photos, ...scalars } = data;
          Object.assign(this.estimate, scalars);
          if (costs) {
            this.estimate.costs.materials  = costs.materials  || [];
            this.estimate.costs.machinery  = costs.machinery  || [];
            this.estimate.costs.laborDays     = costs.laborDays     ?? 1.0;
            this.estimate.costs.laborWorkers  = costs.laborWorkers  ?? 1;
            this.estimate.costs.laborDailyRate = costs.laborDailyRate ?? 400;
            this.estimate.costs.misc           = costs.misc          || [];
          }
          this.estimate.scopeOfWork = (scopeOfWork || []).map(i => ({ _id: i._id || Date.now() + Math.random(), ...i }));
          this.estimate.photos = photos || [];
        } catch(_) {}
      }

      // Auto-save draft: on any input change (text fields) and on array length changes
      document.addEventListener('input', () => {
        clearTimeout(this._draftTimer);
        this._draftTimer = setTimeout(() => this._saveDraft(), 800);
      });
      ['estimate.scopeOfWork.length', 'estimate.costs.materials.length',
       'estimate.costs.machinery.length', 'estimate.costs.misc.length',
       'estimate.photos.length'].forEach(path => {
        this.$watch(path, () => this._saveDraft());
      });

      this.firebaseReady = !!window._fbReady;
      if (this.firebaseReady) {
        fbOnAuthChange(async (user) => {
          this.authUser = user ? { uid: user.uid, email: user.email } : null;
          if (user) {
            try {
              const cloud = await fbLoadSettings(user.uid);
              if (cloud) {
                Object.assign(this.settings, cloud);
                localStorage.setItem('estimator-settings', JSON.stringify(this.settings));
                this.applyTheme();
                this.applyDarkMode();
                this.syncStatus = 'loaded';
                setTimeout(() => { this.syncStatus = ''; }, 3000);
              }
            } catch (_) {}
          }
        });
      }
    },

    finishOnboarding() {
      this.saveSettings();
      localStorage.setItem('onboarding-complete', '1');
      this.onboardingStep = 0;
    },

    isMobilePlatform() {
      return !!window.Capacitor?.isNativePlatform();
    },

    tableInputFocus(evt) {
      if (evt.target.type === 'number') evt.target.select();
    },

    tableInputBlur(evt) {},

    formatPhoneInput(evt) {
      if (!this.isMobilePlatform()) return;
      const digits = evt.target.value.replace(/\D/g, '').slice(0, 10);
      let formatted = '';
      if (digits.length === 0) {
        formatted = '';
      } else if (digits.length <= 3) {
        formatted = '(' + digits;
      } else if (digits.length <= 6) {
        formatted = '(' + digits.slice(0, 3) + ') ' + digits.slice(3);
      } else {
        formatted = '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
      }
      evt.target.value = formatted;
      this.settings.phone = formatted;
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
      const p = this.settings.primaryColor || '#3A5890';
      const a = this.settings.accentColor  || '#C99C2C';
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
    applyDarkMode() {
      const mode = this.settings.darkMode || 'os';
      let dark;
      if (mode === 'dark')       dark = true;
      else if (mode === 'light') dark = false;
      else dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    },

    // --- Drag-and-drop state (scope + materials) ---
    dragIndex: null,
    dropIndex: null,
    _touchPendingIdx: null,
    _touchDragTimer: null,
    _dragClone: null,
    _dragTouchOffsetX: 0,
    _dragTouchOffsetY: 0,
    _touchDragTarget: 'scope',
    matDragIndex: null,
    matDropIndex: null,
    _draftTimer: null,

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
    touchDragStart(evt, i) {
      this._touchDragTarget = 'scope';
      clearTimeout(this._touchDragTimer);
      this._touchPendingIdx = i;
      const touch = evt.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;
      this._touchDragTimer = setTimeout(() => {
        this.dragIndex = i;
        this._touchPendingIdx = null;
        this._touchDragTimer = null;
        const row = document.querySelector(`[data-scope-index="${i}"]`);
        if (row) {
          const rect = row.getBoundingClientRect();
          const clone = row.cloneNode(true);
          clone.setAttribute('x-ignore', '');
          const item = this.estimate.scopeOfWork[i];
          const cloneInputs = clone.querySelectorAll('input,textarea');
          if (cloneInputs[0]) cloneInputs[0].value = item.title || '';
          if (cloneInputs[1]) cloneInputs[1].value = item.description || '';
          clone.style.cssText = 'position:fixed;top:' + rect.top + 'px;left:' + rect.left + 'px;width:' + rect.width + 'px;pointer-events:none;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,0.25);opacity:0.92;border-radius:8px;transform:scale(1.02);';
          document.body.appendChild(clone);
          this._dragClone = clone;
          this._dragTouchOffsetX = startX - rect.left;
          this._dragTouchOffsetY = startY - rect.top;
        }
      }, 660);
    },
    touchDragMove(evt) {
      if (this.dragIndex === null) return;
      const touch = evt.touches[0];
      if (this._dragClone) {
        this._dragClone.style.top  = (touch.clientY - this._dragTouchOffsetY) + 'px';
        this._dragClone.style.left = (touch.clientX - this._dragTouchOffsetX) + 'px';
      }
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      const attr = this._touchDragTarget === 'materials' ? '[data-material-index]' : '[data-scope-index]';
      const row = el?.closest(attr);
      if (row) {
        this.dropIndex = this._touchDragTarget === 'materials'
          ? +row.dataset.materialIndex
          : +row.dataset.scopeIndex;
      }
    },
    touchDragEnd() {
      clearTimeout(this._touchDragTimer);
      this._touchDragTimer = null;
      this._touchPendingIdx = null;
      if (this._dragClone) {
        this._dragClone.remove();
        this._dragClone = null;
      }
      if (this.dragIndex !== null && this.dropIndex !== null && this.dragIndex !== this.dropIndex) {
        const arr = this._touchDragTarget === 'materials'
          ? this.estimate.costs.materials
          : this.estimate.scopeOfWork;
        const moved = arr.splice(this.dragIndex, 1)[0];
        arr.splice(this.dropIndex, 0, moved);
        this._saveDraft();
      }
      this.dragIndex = null;
      this.dropIndex = null;
    },
    matTouchDragStart(evt, i) {
      this._touchDragTarget = 'materials';
      clearTimeout(this._touchDragTimer);
      this._touchPendingIdx = i;
      const touch = evt.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;
      this._touchDragTimer = setTimeout(() => {
        this.dragIndex = i;
        this._touchPendingIdx = null;
        this._touchDragTimer = null;
        const row = document.querySelector(`[data-material-index="${i}"]`);
        if (row) {
          const rect = row.getBoundingClientRect();
          const clone = row.cloneNode(true);
          clone.setAttribute('x-ignore', '');
          const item = this.estimate.costs.materials[i];
          const cloneInputs = clone.querySelectorAll('input');
          if (cloneInputs[0]) cloneInputs[0].value = item.name || '';
          if (cloneInputs[1]) cloneInputs[1].value = item.qty ?? '';
          if (cloneInputs[2]) cloneInputs[2].value = item.unitPrice ?? '';
          // Wrap <tr> in a table so it renders correctly outside the DOM
          const table = document.createElement('table');
          table.className = 'table table-sm table-bordered mb-0';
          const tbody = document.createElement('tbody');
          tbody.appendChild(clone);
          table.appendChild(tbody);
          table.style.cssText = 'position:fixed;top:' + rect.top + 'px;left:' + rect.left + 'px;width:' + rect.width + 'px;pointer-events:none;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,0.25);opacity:0.92;border-radius:4px;transform:scale(1.02);';
          document.body.appendChild(table);
          this._dragClone = table;
          this._dragTouchOffsetX = startX - rect.left;
          this._dragTouchOffsetY = startY - rect.top;
        }
      }, 660);
    },
    matDragStart(evt, i) {
      this.matDragIndex = i;
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('text/plain', i);
    },
    matDragOver(evt, i) {
      if (this.matDragIndex === null || this.matDragIndex === i) return;
      this.matDropIndex = i;
    },
    matDragLeave(evt) {
      if (!evt.currentTarget.contains(evt.relatedTarget)) {
        this.matDropIndex = null;
      }
    },
    matDrop(evt, i) {
      if (this.matDragIndex === null || this.matDragIndex === i) return;
      const arr = this.estimate.costs.materials;
      const moved = arr.splice(this.matDragIndex, 1)[0];
      arr.splice(i, 0, moved);
      this.matDragIndex = null;
      this.matDropIndex = null;
      this._saveDraft();
    },
    matDragEnd() {
      this.matDragIndex = null;
      this.matDropIndex = null;
    },

    // --- Array helpers ---
    addScopeItem()  { this.estimate.scopeOfWork.push({ _id: Date.now() + Math.random(), title: '', description: '' }); },
    addMaterial()   { this.estimate.costs.materials.push({ name: '', qty: 0, unitPrice: 0 }); },
    addMachinery()  { this.estimate.costs.machinery.push({ name: '', duration: 1, rate: 0 }); },
    addMisc()       { this.estimate.costs.misc.push({ description: '', amount: 0 }); },

    async removeScopeItem(i) {
      if (!await this._confirm('This will completely delete this scope item from Scope of Work. Are you sure?')) return;
      this.estimate.scopeOfWork.splice(i, 1);
    },
    async removePhoto(i) {
      if (!await this._confirm('This will completely delete this photo from Project Photos. Are you sure?')) return;
      this.estimate.photos.splice(i, 1);
    },
    async removeMaterial(i) {
      if (!await this._confirm('This will completely delete this material from Materials. Are you sure?')) return;
      this.estimate.costs.materials.splice(i, 1);
    },
    async removeMachinery(i) {
      if (!await this._confirm('This will completely delete this equipment from Machinery. Are you sure?')) return;
      this.estimate.costs.machinery.splice(i, 1);
    },
    async removeMisc(i) {
      if (!await this._confirm('This will completely delete this item from Miscellaneous. Are you sure?')) return;
      this.estimate.costs.misc.splice(i, 1);
    },

    addPrefabItem() {
      if (!this.settings.selectedTrade) return;
      this.settings.prefabScopeItems.push({ _id: Date.now() + Math.random(), tradeId: this.settings.selectedTrade, title: '', description: '' });
      this.saveSettings();
    },
    async removePrefabItem(id) {
      if (!await this._confirm('This will completely delete this item from Prefab Scope Items. Are you sure?')) return;
      const idx = this.settings.prefabScopeItems.findIndex(i => i._id === id);
      if (idx !== -1) this.settings.prefabScopeItems.splice(idx, 1);
      this.saveSettings();
    },
    insertPrefab(item) {
      this.estimate.scopeOfWork.push({ _id: Date.now() + Math.random(), title: item.title, description: item.description });
      this.prefabPickerOpen = false;
    },
    selectTrade(id) {
      this.settings.selectedTrade = id;
      if (!this.settings.initializedTrades.includes(id)) {
        this.settings.initializedTrades.push(id);
        (QPE_DEFAULT_PREFABS[id] || []).forEach(item => {
          this.settings.prefabScopeItems.push({ _id: Date.now() + Math.random(), tradeId: id, title: item.title, description: item.description });
        });
      }
    },
    openPrefabPicker() {
      const available = this.tradesWithPrefabs();
      const preferred = available.find(t => t.id === this.settings.selectedTrade) || available[0];
      this.prefabPickerTrade = preferred?.id || '';
      this.prefabPickerOpen = true;
    },
    tradesWithPrefabs() {
      return this.trades.filter(t => this.settings.prefabScopeItems.some(i => i.tradeId === t.id && (i.title || i.description)));
    },

    tradePlaceholders() {
      const map = {
        landscaping:    { title: 'e.g. Install Sod',             desc: 'e.g. Supply and install sod in the designated area',          material: 'e.g. Sod (pallets)' },
        painting:       { title: 'e.g. Paint Exterior Walls',    desc: 'e.g. Apply two finish coats to all exterior surfaces',        material: 'e.g. Exterior Paint (gal)' },
        plumbing:       { title: 'e.g. Replace Water Heater',    desc: 'e.g. Remove old unit and install new 40-gal water heater',    material: 'e.g. Water Heater' },
        roofing:        { title: 'e.g. Replace Shingles',        desc: 'e.g. Remove old shingles and install new architectural shingles', material: 'e.g. Architectural Shingles (sq)' },
        hvac:           { title: 'e.g. Install New AC Unit',     desc: 'e.g. Remove old unit and install new 3-ton split system',     material: 'e.g. Split System AC Unit' },
        flooring:       { title: 'e.g. Install Hardwood Floors', desc: 'e.g. Install 3/4" hardwood flooring in the living room',     material: 'e.g. Hardwood Flooring (sq ft)' },
        fencing:        { title: 'e.g. Install Privacy Fence',   desc: 'e.g. Install 6ft wood privacy fence along the property line', material: 'e.g. Cedar Fence Panels' },
        drywall:        { title: 'e.g. Hang and Finish Drywall', desc: 'e.g. Hang, tape, mud, and sand all walls in the bedroom',    material: 'e.g. Drywall Sheets (4x8)' },
        pool:           { title: 'e.g. Install Pool Equipment',  desc: 'e.g. Install new pump, filter, and heater for the existing pool', material: 'e.g. Pool Pump' },
        solar:          { title: 'e.g. Install Solar Panels',    desc: 'e.g. Install 10-panel rooftop array with microinverters',    material: 'e.g. Solar Panels (400W)' },
        electrical:     { title: 'e.g. Panel Upgrade',           desc: 'e.g. Upgrade main panel from 100A to 200A service',          material: 'e.g. 200A Main Panel' },
        concrete:       { title: 'e.g. Pour Concrete Driveway',  desc: 'e.g. Pour 4" driveway with control joints and broom finish', material: 'e.g. Concrete (yards)' },
        general:        { title: 'e.g. Kitchen Remodel',         desc: 'e.g. Complete kitchen renovation including demo and finish work', material: 'e.g. Lumber (2x4x8)' },
        doors:          { title: 'e.g. Install Entry Door',      desc: 'e.g. Remove old door and install new fiberglass entry door', material: 'e.g. Fiberglass Entry Door' },
        interiordesign: { title: 'e.g. Living Room Redesign',    desc: 'e.g. Source and install new sofa, lighting, and accent décor', material: 'e.g. Sectional Sofa' },
        handyman:       { title: 'e.g. Repair Drywall Damage',   desc: 'e.g. Patch and paint damaged drywall in the hallway',        material: 'e.g. Joint Compound' },
      };
      return map[this.settings.selectedTrade] || { title: 'e.g. Phase 1: Preparation', desc: 'e.g. Technical details of the task…', material: 'e.g. Material name' };
    },

    isItemSavedAsPrefab(item) {
      if (!item.title || !this.settings.selectedTrade) return false;
      return this.settings.prefabScopeItems.some(p =>
        p.tradeId === this.settings.selectedTrade &&
        p.title === item.title &&
        p.description === item.description
      );
    },

    async saveAsPrefab(item) {
      if (!item.title || !this.settings.selectedTrade || this.isItemSavedAsPrefab(item)) return;
      const trade = this.trades.find(t => t.id === this.settings.selectedTrade);
      const tradeName = trade?.label || 'this trade';
      if (!await this._confirm(`Do you want to add this to your list of prefabs for ${tradeName}?`)) return;
      this.settings.prefabScopeItems.push({
        _id: Date.now() + Math.random(),
        tradeId: this.settings.selectedTrade,
        title: item.title,
        description: item.description
      });
      this.saveSettings();
    },

    // --- Photos ---
    async addPhoto() {
      if (this.estimate.photos.length >= 20) { alert('Maximum 20 photos per estimate.'); return; }
      if (window.Capacitor?.isNativePlatform()) {
        try {
          const { Camera } = window.Capacitor.Plugins;
          const image = await Camera.getPhoto({
            quality: 70, allowEditing: false, resultType: 'dataUrl',
            source: 'PROMPT', width: 1200, saveToGallery: false, correctOrientation: true
          });
          this._pushPhoto(image.dataUrl);
        } catch (_) {}
      } else {
        this.$refs.photoInput.click();
      }
    },
    handlePhotoFile(event) {
      for (const file of event.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => this._pushPhoto(e.target.result);
        reader.readAsDataURL(file);
      }
      event.target.value = '';
    },
    _pushPhoto(dataUrl) {
      const img = new Image();
      img.onload = () => {
        this.estimate.photos.push({ id: Date.now() + Math.random(), dataUrl, w: img.naturalWidth, h: img.naturalHeight, description: '' });
      };
      img.src = dataUrl;
    },

    // --- Labor steppers ---
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
    decrementLaborWorkers() {
      if ((this.estimate.costs.laborWorkers || 1) > 1) this.estimate.costs.laborWorkers--;
    },
    incrementLaborWorkers() {
      this.estimate.costs.laborWorkers = (+(this.estimate.costs.laborWorkers) || 1) + 1;
    },

    // --- Calculations ---
    materialsTotal() {
      return this.estimate.costs.materials.reduce((s, m) => s + (+(m.qty) || 0) * (+(m.unitPrice) || 0), 0);
    },
    machineryTotal() {
      return this.estimate.costs.machinery.reduce((s, m) => s + (+(m.duration) || 0) * (+(m.rate) || 0), 0);
    },
    laborTotal() {
      return (+(this.estimate.costs.laborDays) || 0) * (+(this.estimate.costs.laborWorkers) || 1) * (+(this.estimate.costs.laborDailyRate) || 0);
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

    fmt(n) { return '$' + (+(n) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); },

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
    _saveDraft() {
      try {
        localStorage.setItem('estimator-draft', JSON.stringify(this.estimate));
      } catch(_) {
        // Quota exceeded (large photos); retry without photos
        try {
          const { photos, ...rest } = this.estimate;
          localStorage.setItem('estimator-draft', JSON.stringify({ ...rest, photos: [] }));
        } catch(_) {}
      }
    },

    saveSettings() {
      localStorage.setItem('estimator-settings', JSON.stringify(this.settings));
      this.settingsSaved = true;
      setTimeout(() => { this.settingsSaved = false; }, 3000);
      if (this.authUser && window._fbReady) {
        this.syncStatus = 'saving';
        fbSaveSettings(this.authUser.uid, this.settings)
          .then(() => { this.syncStatus = 'saved'; setTimeout(() => { this.syncStatus = ''; }, 3000); })
          .catch(() => { this.syncStatus = 'error'; setTimeout(() => { this.syncStatus = ''; }, 5000); });
      }
    },

    // --- Cloud sync ---
    async signIn() {
      this.authError = '';
      this.authLoading = true;
      try {
        await fbSignIn(this.authEmail, this.authPassword);
        this.authPassword = '';
      } catch (e) {
        this.authError = this._friendlyAuthError(e.code);
      } finally { this.authLoading = false; }
    },

    async createAccount() {
      this.authError = '';
      this.authLoading = true;
      try {
        await fbCreateAccount(this.authEmail, this.authPassword);
        this.authPassword = '';
        this.showCreateAccount = false;
      } catch (e) {
        this.authError = this._friendlyAuthError(e.code);
      } finally { this.authLoading = false; }
    },

    signOut() { fbSignOut(); },

    async syncFromCloud() {
      if (!this.authUser || !window._fbReady) return;
      try {
        const cloud = await fbLoadSettings(this.authUser.uid);
        if (cloud) {
          Object.assign(this.settings, cloud);
          localStorage.setItem('estimator-settings', JSON.stringify(this.settings));
          this.applyTheme();
          this.syncStatus = 'loaded';
          setTimeout(() => { this.syncStatus = ''; }, 3000);
        } else {
          alert('No cloud settings found yet. Save your settings to upload them.');
        }
      } catch (_) {
        this.syncStatus = 'error';
        setTimeout(() => { this.syncStatus = ''; }, 5000);
      }
    },

    _friendlyAuthError(code) {
      const msgs = {
        'auth/user-not-found':     'No account found with that email.',
        'auth/wrong-password':     'Incorrect password.',
        'auth/invalid-email':      'Please enter a valid email address.',
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/weak-password':      'Password must be at least 6 characters.',
        'auth/invalid-credential': 'Incorrect email or password.',
        'auth/too-many-requests':  'Too many attempts. Please try again later.',
      };
      return msgs[code] || 'Something went wrong. Please try again.';
    },

    // --- Cloud estimate save / open ---
    openEstimateModal() {
      this.openModal = true;
      this.openTab = (this.authUser && this.firebaseReady) ? 'cloud' : 'pdf';
      if (this.authUser && this.firebaseReady) this.fetchCloudEstimates();
    },

    async fetchCloudEstimates() {
      if (!this.authUser || !window._fbReady) return;
      this.cloudEstimatesLoading = true;
      try {
        this.cloudEstimates = await fbListEstimates(this.authUser.uid);
      } catch (_) {
        this.cloudEstimates = [];
      } finally {
        this.cloudEstimatesLoading = false;
      }
    },

    async saveEstimateToCloud() {
      if (!this.authUser || !window._fbReady) return;
      if (!this.estimate.customerName.trim()) {
        alert('Please enter a customer name before saving.');
        return;
      }
      this.cloudSaveStatus = 'saving';
      try {
        const compressed = await Promise.all(
          (this.estimate.photos || []).map(p => this._compressPhotoForCloud(p))
        );
        const savedId = await fbSaveEstimate(this.authUser.uid, this.estimate, this.grandTotal(), compressed, this.loadedCloudId);
        this.loadedCloudId = savedId;
        this.cloudSaveStatus = 'saved';
        setTimeout(() => { this.cloudSaveStatus = ''; }, 3000);
      } catch (e) {
        console.error(e);
        this.cloudSaveStatus = 'error';
        setTimeout(() => { this.cloudSaveStatus = ''; }, 5000);
      }
    },

    async loadCloudEstimate(est) {
      if (!await this._confirm(`Load "${est.customerName || 'this estimate'}"? Your current estimate will be replaced.`)) return;
      this.openModal = false;
      try {
        const full = await fbLoadEstimate(this.authUser.uid, est.id);
        if (!full) { alert('Could not load estimate from cloud.'); return; }
        const { id, savedAt, grandTotal, photoCount, costs, scopeOfWork, photos, ...scalars } = full;
        this._resetEstimate();
        this.loadedCloudId = id;
        // Assign scalar fields
        Object.assign(this.estimate, scalars);
        // Mutate nested reactive objects in-place so Alpine keeps its Proxy wrappers
        if (costs) {
          this.estimate.costs.materials = costs.materials || [];
          this.estimate.costs.machinery = costs.machinery || [];
          this.estimate.costs.laborDays     = costs.laborDays     ?? 1.0;
          this.estimate.costs.laborWorkers  = costs.laborWorkers  ?? 1;
          this.estimate.costs.laborDailyRate = costs.laborDailyRate ?? 400;
          this.estimate.costs.misc           = costs.misc          || [];
        }
        this.estimate.scopeOfWork = (scopeOfWork || []).map(i => ({ _id: i._id || Date.now() + Math.random(), ...i }));
        this.estimate.photos = photos || [];
        this.currentView = 'estimator';
      } catch (e) {
        alert('Failed to load estimate from cloud.');
      }
    },

    async deleteCloudEstimate(est) {
      if (!await this._confirm(`Delete "${est.customerName || 'this estimate'}" from the cloud? This cannot be undone.`)) return;
      try {
        await fbDeleteEstimate(this.authUser.uid, est.id);
        this.cloudEstimates = this.cloudEstimates.filter(e => e.id !== est.id);
      } catch (_) {
        alert('Failed to delete. Please try again.');
      }
    },

    async _compressPhotoForCloud(photo) {
      if (!photo.dataUrl) return photo;
      return new Promise(res => {
        const img = new Image();
        img.onload = () => {
          const MAX = 1000;
          let w = img.naturalWidth, h = img.naturalHeight;
          if (w > MAX || h > MAX) {
            const r = Math.min(MAX / w, MAX / h);
            w = Math.round(w * r); h = Math.round(h * r);
          }
          const canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          res({ ...photo, dataUrl: canvas.toDataURL('image/jpeg', 0.65), w, h });
        };
        img.src = photo.dataUrl;
      });
    },

    async _resolvePhotoDataUrl(photo) {
      return photo.dataUrl || null;
    },

    // --- Open estimate from PDF ---
    async openEstimatePDF(event) {
      const file = event.target.files[0];
      if (!file) return;
      try {
        const { PDFDocument } = window.PDFLib;
        const bytes = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
        const subject = pdfDoc.getSubject();
        if (!subject) {
          alert('This PDF does not contain estimate data. Only PDFs generated by this app can be opened.');
          return;
        }
        const data = JSON.parse(subject);
        if (!await this._confirm('Load this estimate? Your current data will be replaced.')) return;
        const { costs, scopeOfWork, photos, ...scalars } = data;
        this._resetEstimate();
        Object.assign(this.estimate, scalars);
        if (costs) {
          this.estimate.costs.materials = costs.materials || [];
          this.estimate.costs.machinery = costs.machinery || [];
          this.estimate.costs.laborDays     = costs.laborDays     ?? 1.0;
          this.estimate.costs.laborWorkers  = costs.laborWorkers  ?? 1;
          this.estimate.costs.laborDailyRate = costs.laborDailyRate ?? 400;
          this.estimate.costs.misc           = costs.misc          || [];
        }
        this.estimate.scopeOfWork = (scopeOfWork || []).map(item => ({ _id: item._id || Date.now() + Math.random(), ...item }));
        this.estimate.photos = photos || [];
        this.currentView = 'estimator';
      } catch (err) {
        alert('Could not load estimate. Make sure this PDF was generated by this app.');
      } finally {
        event.target.value = '';
      }
    },

    // --- New / clear estimate ---
    async newEstimate() {
      const hasData = this.estimate.customerName || this.estimate.projectName ||
        this.estimate.scopeOfWork.length || this.estimate.costs.materials.length ||
        this.estimate.costs.machinery.length || this.estimate.costs.misc.length ||
        this.estimate.photos.length;
      if (hasData && !await this._confirm('Start a new estimate? Your current data will be cleared.')) return;
      this._resetEstimate();
      this.currentView = 'estimator';
    },

    _confirm(message) {
      return new Promise(resolve => {
        this.confirmMessage = message;
        this.confirmResolve = resolve;
      });
    },
    confirmYes() {
      if (this.confirmResolve) this.confirmResolve(true);
      this.confirmMessage = '';
      this.confirmResolve = null;
    },
    confirmNo() {
      if (this.confirmResolve) this.confirmResolve(false);
      this.confirmMessage = '';
      this.confirmResolve = null;
    },

    calcResult() {
      const c = this.calc;
      if (this.calcTab === 'paint') {
        const wallsNet = Math.max(0, (+c.paint.wallsSqFt || 0) - (+c.paint.doors || 0) * 20 - (+c.paint.windows || 0) * 15);
        const totalSqFt = wallsNet + (+c.paint.ceilingSqFt || 0);
        const gals = Math.ceil(totalSqFt * (+c.paint.coats || 1) / (+c.paint.coverage || 350));
        return { qty: gals || 0, unitPrice: +(c.paint.pricePerGal) || 0 };
      }
      if (this.calcTab === 'gravel') {
        const yd3 = ((+c.gravel.length || 0) * (+c.gravel.width || 0) * ((+c.gravel.depth || 0) / 12)) / 27;
        return { qty: Math.ceil(yd3 * 10) / 10 || 0, unitPrice: +(c.gravel.pricePerYd) || 0 };
      }
      if (this.calcTab === 'sod') {
        const sqFt = c.sod.mode === 'sqft' ? (+c.sod.sqFtDirect || 0) : (+c.sod.length || 0) * (+c.sod.width || 0);
        const pallets = Math.ceil(sqFt / (+c.sod.sqFtPerPallet || 450));
        return { qty: pallets || 0, unitPrice: +(c.sod.pricePerPallet) || 0 };
      }
      if (this.calcTab === 'tile') {
        const base = c.tile.mode === 'sqft' ? (+c.tile.sqFtDirect || 0) : (+c.tile.length || 0) * (+c.tile.width || 0);
        const sqFt = Math.ceil(parseFloat((base * (1 + (+c.tile.waste || 0) / 100)).toFixed(6)));
        return { qty: sqFt || 0, unitPrice: +(c.tile.pricePerSqFt) || 0 };
      }
      return { qty: 0, unitPrice: 0 };
    },
    calcResultLabel() {
      const r = this.calcResult();
      const units = { paint: 'gal', gravel: 'cu yd', sod: 'pallets', tile: 'sq ft' };
      const u = units[this.calcTab] || '';
      if (!r.qty) return '—';
      if (this.calcTab === 'paint') {
        const c = this.calc.paint;
        const wallsNet = Math.max(0, (+c.wallsSqFt || 0) - (+c.doors || 0) * 20 - (+c.windows || 0) * 15);
        const parts = [];
        if (wallsNet > 0) parts.push(`${wallsNet} sq ft walls`);
        if (+c.ceilingSqFt > 0) parts.push(`${+c.ceilingSqFt} sq ft ceiling`);
        const breakdown = parts.length ? `(${parts.join(' + ')})  →  ` : '';
        return `${breakdown}${r.qty} gal  ×  ${this.fmt(r.unitPrice)}  =  ${this.fmt(r.qty * r.unitPrice)}`;
      }
      return `${r.qty} ${u}  ×  ${this.fmt(r.unitPrice)}  =  ${this.fmt(r.qty * r.unitPrice)}`;
    },
    addFromCalculator() {
      const r = this.calcResult();
      if (!r.qty) return;
      this.estimate.costs.materials.push({ name: this.calc[this.calcTab]?.name || '', qty: r.qty, unitPrice: r.unitPrice });
      this.calcModalOpen = false;
    },

    _resetEstimate() {
      this.loadedCloudId = null;
      localStorage.removeItem('estimator-draft');
      Object.assign(this.estimate, {
        customerName: '', customerAddress: '',
        estimateDate: new Date().toISOString().split('T')[0],
        projectName: '', scopeOfWork: [], photos: [],
        startDate: '', completionDate: ''
      });
      // Mutate costs in-place to preserve Alpine's reactive Proxy
      this.estimate.costs.materials = [];
      this.estimate.costs.machinery = [];
      this.estimate.costs.laborDays = 1.0;
      this.estimate.costs.laborWorkers = 1;
      this.estimate.costs.laborDailyRate = 400.00;
      this.estimate.costs.misc = [];
    },

    async clearEstimate() {
      if (!await this._confirm('Clear all estimate data? This cannot be undone.')) return;
      this._resetEstimate();
    },

    // --- PDF Generation ---
    async generatePDF() {
      const e = this.estimate;
      const s = this.settings;

      if (!e.customerName.trim()) {
        alert('Please enter a customer name before generating the PDF.');
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: 'pt', format: 'letter' });
      const subjectData = { ...this.estimate, photos: [] }; // photos are in the PDF itself, not metadata
      doc.setProperties({
        title:   `Estimate – ${e.customerName}`,
        author:  s.companyName || '',
        subject: JSON.stringify(subjectData)
      });

      const PW  = doc.internal.pageSize.getWidth();
      const PH  = doc.internal.pageSize.getHeight();
      const M   = 40;
      const CW  = PW - M * 2;

      const GREEN    = this.hexToRgb(s.primaryColor || '#3A5890');
      const LT_GREEN = this.mixWithWhite(GREEN, 0.2);
      const VLT      = this.mixWithWhite(GREEN, 0.09);
      const AMBER    = this.hexToRgb(s.accentColor  || '#C99C2C');
      const GREEN_TEXT  = this.isLightColor(s.primaryColor || '#3A5890') ? [26,26,26] : [255,255,255];
      const AMBER_TEXT  = this.isLightColor(s.accentColor  || '#C99C2C') ? [26,26,26] : [255,255,255];
      const GRAY     = [110, 110, 110];

      const money = (n) => '$' + (+(n) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const fmtDate = (d) => d
        ? new Date(d + 'T12:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : '';

      const taxRate = +(s.taxRate) || 0;
      const matSub  = this.materialsTotal();
      const matTax  = matSub  * taxRate / 100;
      const machSub = this.machineryTotal();
      const machTax = machSub * taxRate / 100;

      let y = M;

      // ---- Company header: logo left, name/contact right ----
      const hasCompanyInfo = s.companyName || s.phone || s.email || s.website || s.licenseNumbers;

      // Logo — left side
      let logoH = 0;
      if (s.logo) {
        try {
          const fmt = s.logo.startsWith('data:image/png') ? 'PNG' : 'JPEG';
          const img = new Image();
          img.src = s.logo;
          const maxW = 130, maxH = hasCompanyInfo ? 45 : 60;
          const ratio = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight);
          const lw = img.naturalWidth * ratio;
          const lh = img.naturalHeight * ratio;
          doc.addImage(s.logo, fmt, M, y, lw, lh);
          logoH = lh;
        } catch (_) {}
      }

      // Name + contact — right side, right-justified
      if (hasCompanyInfo) {
        const RX = PW - M; // right edge
        if (s.companyName) {
          doc.setFontSize(16);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(...GREEN);
          doc.text(s.companyName, RX, y + 15, { align: 'right' });
        }
        const contactParts = [s.phone, s.email, s.website,
          s.licenseNumbers ? 'Lic# ' + s.licenseNumbers : ''].filter(Boolean);
        if (contactParts.length > 0) {
          doc.setFontSize(8);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(...GRAY);
          doc.text(contactParts.join('  ·  '), RX, y + (s.companyName ? 29 : 15), { align: 'right' });
        }
      }

      if (hasCompanyInfo || s.logo) {
        y += hasCompanyInfo ? Math.max(44, logoH) : logoH;
        doc.setDrawColor(...GREEN);
        doc.setLineWidth(0.5);
        doc.line(M, y, M + CW, y);
        y += 12;
      }

      // ---- Title ----
      const TITLE_COLOR = this.hexToRgb(s.titleColor || s.primaryColor || '#3A5890');
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...TITLE_COLOR);
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
      } else if (e.startDate) {
        clientBody.push([
          '',
          { content: 'Start: ' + fmtDate(e.startDate), styles: { halign: 'right', textColor: GRAY, fontSize: 9 } }
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
          const taxPad = { top: 1, bottom: 1, left: 6, right: 6 };
          foot.push([
            { content: `Tax (${taxRate}%)`, colSpan: 3, styles: { halign: 'right', textColor: GRAY, fontSize: 9, cellPadding: taxPad } },
            { content: money(matTax),        styles: { halign: 'right', textColor: GRAY, fontSize: 9, cellPadding: taxPad } }
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
          const taxPad = { top: 1, bottom: 1, left: 6, right: 6 };
          foot.push([
            { content: `Tax (${taxRate}%)`, colSpan: 3, styles: { halign: 'right', textColor: GRAY, fontSize: 9, cellPadding: taxPad } },
            { content: money(machTax),       styles: { halign: 'right', textColor: GRAY, fontSize: 9, cellPadding: taxPad } }
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
        head: [['Labor', 'Days', 'Workers', 'Rate/Laborer', 'Total']],
        body: [[
          'Labor',
          { content: e.costs.laborDays,                                   styles: { halign: 'center' } },
          { content: e.costs.laborWorkers ?? 1,                           styles: { halign: 'center' } },
          { content: money(e.costs.laborDailyRate) + '/day',              styles: { halign: 'right' } },
          { content: money(this.laborTotal()),                             styles: { halign: 'right', fontStyle: 'bold' } }
        ]],
        headStyles: { fillColor: GREEN, textColor: 255, fontSize: 10, fontStyle: 'bold' },
        bodyStyles: { fontSize: 10 },
        columnStyles: { 0: { cellWidth: CW*0.32 }, 1: { cellWidth: CW*0.12 }, 2: { cellWidth: CW*0.12 }, 3: { cellWidth: CW*0.24 }, 4: { cellWidth: CW*0.20 } }
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

      // ---- Project Photos ----
      const photosData = (await Promise.all(
        (e.photos || [])
          .filter(p => p.dataUrl || p.url)
          .map(async p => {
            if (p.dataUrl) return p;
            const dataUrl = await this._resolvePhotoDataUrl(p);
            return dataUrl ? { ...p, dataUrl } : null;
          })
      )).filter(Boolean);
      if (photosData.length > 0) {
        if (y > PH - 200) { doc.addPage(); y = M; }
        doc.setDrawColor(...GREEN);
        doc.setLineWidth(1.5);
        doc.line(M, y, M + CW, y);
        y += 12;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...GREEN);
        doc.text('PROJECT PHOTOS', M, y);
        y += 16;

        const photoW  = (CW - 14) / 2;
        const maxPhH  = 130;
        const descH   = 18;
        const rowH    = maxPhH + descH;
        let rowY = y;

        for (let i = 0; i < photosData.length; i++) {
          const col = i % 2;
          if (col === 0 && i > 0) {
            rowY += rowH;
            if (rowY + rowH > PH - M) { doc.addPage(); rowY = M; }
          }
          const px = M + col * (photoW + 14);
          const ph = photosData[i];
          try {
            const fmt = ph.dataUrl.startsWith('data:image/png') ? 'PNG' : 'JPEG';
            let dw = photoW, dh = maxPhH;
            if (ph.w && ph.h) {
              const ratio = Math.min(photoW / ph.w, maxPhH / ph.h);
              dw = ph.w * ratio;
              dh = ph.h * ratio;
            }
            doc.addImage(ph.dataUrl, fmt, px, rowY, dw, dh);
          } catch (_) {}
          if (ph.description) {
            doc.setFontSize(8);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(...GRAY);
            doc.text(doc.splitTextToSize(ph.description, photoW)[0], px, rowY + maxPhH + 6);
          }
        }
        y = rowY + rowH + 10;
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
      const safeName    = e.customerName.replace(/[^a-z0-9]/gi, '_');
      const safeProject = e.projectName ? '_' + e.projectName.replace(/[^a-z0-9]/gi, '_') : '';
      const fileName = `${safeName}${safeProject}_${e.estimateDate || 'draft'}.pdf`;

      if (window.Capacitor?.isNativePlatform()) {
        const base64 = doc.output('datauristring').split(',')[1];
        const { Filesystem } = window.Capacitor.Plugins;
        try {
          await Filesystem.writeFile({ path: fileName, data: base64, directory: 'DOCUMENTS', recursive: true });
          alert(`PDF saved!\n\n"${fileName}"\n\nFind it in your Files app under Documents.`);
        } catch (_) {
          await Filesystem.writeFile({ path: fileName, data: base64, directory: 'CACHE' });
          const { uri } = await Filesystem.getUri({ path: fileName, directory: 'CACHE' });
          const { Share } = window.Capacitor.Plugins;
          await Share.share({ title: fileName, url: uri, dialogTitle: 'Save your estimate PDF' });
        }
      } else {
        doc.save(fileName);
      }
    }
  }));
});
