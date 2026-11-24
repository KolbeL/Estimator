// Invoice terms: the pre-filled text on invoices. Earlier builds pre-filled invoices with the bid-terms placeholder below.
const QPE_OLD_INVOICE_PLACEHOLDER = `50% deposit due at project start, balance due upon completion.

Any additional work beyond the services listed above may incur extra charges.`;
const QPE_DEFAULT_INVOICE_TERMS = `Payment due within 15 days of invoice date.
Thank you for your business!`;

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
  // x-money="model": always display a currency input with 2 decimals (2.9 -> 2.90).
  // Only reformats while the field is not focused so typing is never interrupted.
  Alpine.directive('money', (el, { expression }, { evaluateLater, effect }) => {
    const getValue = evaluateLater(expression);
    const fmt = (v) => (v === '' || v == null || isNaN(+v)) ? '' : (+v).toFixed(2);
    effect(() => getValue(v => { if (document.activeElement !== el) el.value = fmt(v); }));
    el.addEventListener('blur', () => { el.value = fmt(el.value); });
  });

  // x-tap: run on touch-up instead of waiting for `click`. Android swallows the click for a tap that lands
  // while the page is still coasting from a scroll (it only stops the scroll), so the first tap on a nav
  // button did nothing. Paired with `touch-action: none` on .nav-btn so a tap that drifts a few pixels is not
  // turned into a scroll (which cancels it). Mouse and keyboard still use click; the click that follows a handled touch is ignored.
  Alpine.directive('tap', (el, { expression }, { evaluateLater, cleanup }) => {
    const run = evaluateLater(expression);
    let lastTouch = 0;
    const onUp = (e) => {
      if (e.pointerType === 'mouse' || (e.button !== undefined && e.button > 0)) return;
      // Count it as a tap if the finger lifted on (or just beside) the button, even if it drifted a little
      const r = el.getBoundingClientRect(), pad = 16;
      if (e.clientX < r.left - pad || e.clientX > r.right + pad || e.clientY < r.top - pad || e.clientY > r.bottom + pad) return;
      lastTouch = Date.now();
      run();
    };
    const onClick = (e) => {
      if (Date.now() - lastTouch < 800) { e.preventDefault(); e.stopImmediatePropagation(); return; }
      run();
    };
    el.addEventListener('pointerup', onUp);
    el.addEventListener('click', onClick);
    cleanup(() => { el.removeEventListener('pointerup', onUp); el.removeEventListener('click', onClick); });
  });

  // Number fields on Android: the keyboard sends one character at a time and x-model writes the parsed number
  // back into the field after every keystroke. Two in-between states lose characters that way:
  //   - a lone "." is not a valid number, so the field reads "" and the write-back wipes the dot (".79" became "79")
  //   - ".0" / "1.50" / "1." parse to a number whose text has no trailing dot/zero, so the next digit lands in the
  //     wrong place (".05" became "5")
  // While typing we skip the model update for those in-between states (the number is unchanged or one keystroke
  // from valid); when the field is left, we sync the model once.
  const numberInputHolds = (el) => el.value === '' || (el.value.indexOf('.') !== -1 && /[.0]$/.test(el.value));
  document.addEventListener('input', (e) => {
    const el = e.target;
    if (!el || el.tagName !== 'INPUT' || el.type !== 'number' || !e.isTrusted) return;
    if ((el.value === '' && e.data) || (el.value !== '' && numberInputHolds(el))) e.stopImmediatePropagation();
  }, true);
  document.addEventListener('focusout', (e) => {
    const el = e.target;
    if (el && el.tagName === 'INPUT' && el.type === 'number' && numberInputHolds(el)) el.dispatchEvent(new Event('input', { bubbles: true }));
  }, true);

  // The keyboard's Go / Done key (Enter) closes the keyboard: leave the field. Runs after any handler on the field
  // (for example Enter in the sign-in password box still signs in). Multi-line boxes keep Enter as a new line.
  document.addEventListener('keydown', (e) => {
    const el = e.target;
    if (e.key !== 'Enter' || !el || el.tagName !== 'INPUT') return;
    if (!['text', 'number', 'tel', 'email', 'search', 'password', 'url'].includes(el.type)) return;
    setTimeout(() => { if (document.activeElement === el) el.blur(); }, 0);
  }, true);

  Alpine.data('estimatorApp', () => ({
    currentView: 'estimator',
    onboardingStep: 0,
    onboardingTradeError: false,
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

    invoiceModalOpen: false,
    invoiceDraft: null,

    openModal: false,
    openTab: 'pdf',
    cloudEstimates: [],
    cloudEstimatesLoading: false,
    cloudSaveStatus: '',
    loadedCloudId: null,

    confirmMessage: '',
    confirmResolve: null,

    rateModalOpen: false,
    rateModalStars: 0,

    colorPickerOpen: false,
    colorPickerTarget: '',
    colorPickerR: 0,
    colorPickerG: 0,
    colorPickerB: 0,

    presetColors: [
      '#1E3A5F','#3A5890','#2563EB','#0EA5E9','#0F766E','#16A34A','#15803D','#374151',
      '#C99C2C','#EA580C','#DC2626','#7F1D1D','#6D28D9','#DB2777','#78716C','#111827',
    ],

    calcModalOpen: false,
    calcTab: 'paint',
    calcPickerOpen: false,
    noticeMessage: '',
    noticeResolve: null,
    headerStuck: false,
    keyboardOpen: false,
    templateManagerOpen: false,
    templateTrade: '',
    qsel: '', // which app-styled dropdown is open (see .qpe-select in index.html)
    calcAddedKey: '',
    calcGroups: window.QPE_CALC_GROUPS || [],
    // Bulk materials: tonsPerYd = typical weight per cubic yard (averages, supplier figures vary);
    // minDepth = typical minimum depth in inches (about 1.5x the largest stone for gravel).
    bulkMaterials: [
      { group: 'Gravel & stone', id: 'gravel',    label: 'Gravel (general)',             name: 'Gravel',                       tonsPerYd: 1.4,  minDepth: 0 },
      { group: 'Gravel & stone', id: 'pea',       label: 'Pea gravel (3/8")',            name: 'Pea Gravel 3/8"',              tonsPerYd: 1.4,  minDepth: 1 },
      { group: 'Gravel & stone', id: 'halfminus', label: '1/2" minus (crusher fines)',   name: 'Crushed Stone 1/2" Minus',     tonsPerYd: 1.5,  minDepth: 1 },
      { group: 'Gravel & stone', id: 'threeq',    label: '3/4" crushed stone',           name: 'Crushed Stone 3/4"',           tonsPerYd: 1.35, minDepth: 1.5 },
      { group: 'Gravel & stone', id: 'roadbase',  label: '3/4" minus (road base / ABC)', name: 'Road Base 3/4" Minus',         tonsPerYd: 1.5,  minDepth: 2 },
      { group: 'Gravel & stone', id: 'onetwo',    label: '1"–2" crushed stone',          name: 'Crushed Stone 1"–2"',          tonsPerYd: 1.3,  minDepth: 3 },
      { group: 'Gravel & stone', id: 'twofour',   label: '2"–4" stone / drain rock',     name: 'Drain Rock 2"–4"',             tonsPerYd: 1.25, minDepth: 6 },
      { group: 'Decorative rock', id: 'river',    label: 'River rock (1"–3")',           name: 'River Rock 1"–3"',             tonsPerYd: 1.4,  minDepth: 2 },
      { group: 'Decorative rock', id: 'cobble',   label: 'Cobble (3"–6")',               name: 'Cobble 3"–6"',                 tonsPerYd: 1.3,  minDepth: 4 },
      { group: 'Decorative rock', id: 'lava',     label: 'Lava rock',                    name: 'Lava Rock',                    tonsPerYd: 0.6,  minDepth: 2 },
      { group: 'Decorative rock', id: 'marble',   label: 'White marble chips',           name: 'Marble Chips',                 tonsPerYd: 1.4,  minDepth: 2 },
      { group: 'Decorative rock', id: 'dg',       label: 'Decomposed granite',           name: 'Decomposed Granite',           tonsPerYd: 1.5,  minDepth: 2 },
      { group: 'Sand, soil & mulch', id: 'sand',    label: 'Sand',                       name: 'Sand',                         tonsPerYd: 1.3,  minDepth: 0 },
      { group: 'Sand, soil & mulch', id: 'topsoil', label: 'Topsoil',                    name: 'Topsoil',                      tonsPerYd: 1.1,  minDepth: 0 },
      { group: 'Sand, soil & mulch', id: 'mulch',   label: 'Mulch / bark',               name: 'Mulch',                        tonsPerYd: 0.4,  minDepth: 2 },
    ],
    calc: {
      paint:  { name: 'Paint',           wallsSqFt: 0, ceilingSqFt: 0, doors: 0, windows: 0, coats: 2, coverage: 350, pricePerGal: 0 },
      gravel: { name: 'Gravel',          material: 'gravel', length: 0, width: 0,  depth: 3, compactOn: false, compactPct: 20, pricedBy: 'yd', tonsPerYd: 1.4, pricePerYd: 0, pricePerTon: 0 },
      sod:    { name: 'Sod',             mode: 'dimensions', length: 0, width: 0, sqFtDirect: 0, sqFtPerPallet: 450, pricePerPallet: 0 },
      tile:   { name: 'Flooring', mode: 'dimensions', length: 0, width: 0, sqFtDirect: 0, waste: 10, soldBy: 'sqft', boxSqFt: 20, pricePerBox: 0, pricePerSqFt: 0 },
      concrete: {
        name: 'Concrete', shape: 'slab', count: 1,
        wasteOn: true, wastePct: 10,
        orderBy: 'readymix', bagLb: 80, pricePerYd: 0, pricePerBag: 0,
        slab:    { length: 0, width: 0, thick: 4 },
        footing: { length: 0, width: 12, depth: 8 },
        wall:    { length: 0, thick: 8, height: 4 },
        round:   { diam: 0, thick: 4 },
        column:  { diam: 12, height: 4 },
        curb:    { length: 0, curbW: 6, curbH: 12, gutterW: 18, gutterT: 6 },
        stairs:  { steps: 3, rise: 7, run: 11, width: 4, landing: 0 },
        area:    { area: 0, thick: 4 },
      },
      ...(window.QPE_CALC_STATE ? window.QPE_CALC_STATE() : {}), // fence, roofing, drywall, deck, ... (see js/calculators.js)
    },

    // Concrete calculator: shape catalog (drives the shape tiles, input fields and volume math)
    concreteShapes: [
      { id: 'slab', label: 'Slab', icon: 'bi-square',
        hint: 'Patios, driveways, sidewalks, floors. Volume = length × width × thickness.',
        fields: [{ key: 'length', label: 'Length (ft)' }, { key: 'width', label: 'Width (ft)' }, { key: 'thick', label: 'Thickness (in)' }] },
      { id: 'footing', label: 'Footing', icon: 'bi-border-width',
        hint: 'Continuous strip footings. Volume = length × width × depth.',
        fields: [{ key: 'length', label: 'Length (ft)' }, { key: 'width', label: 'Width (in)' }, { key: 'depth', label: 'Depth (in)' }] },
      { id: 'wall', label: 'Wall', icon: 'bi-bricks',
        hint: 'Poured walls and stem walls. Volume = length × thickness × height.',
        fields: [{ key: 'length', label: 'Length (ft)' }, { key: 'thick', label: 'Thickness (in)' }, { key: 'height', label: 'Height (ft)' }] },
      { id: 'round', label: 'Round Slab', icon: 'bi-circle',
        hint: 'Circular pads and patios. Volume = π × radius² × thickness.',
        fields: [{ key: 'diam', label: 'Diameter (ft)' }, { key: 'thick', label: 'Thickness (in)' }] },
      { id: 'column', label: 'Column / Tube', icon: 'bi-database',
        hint: 'Sonotube piers, post holes, round columns. Volume = π × radius² × height. Use “# of Pours” for multiples.',
        fields: [{ key: 'diam', label: 'Diameter (in)' }, { key: 'height', label: 'Height / Depth (ft)' }] },
      { id: 'curb', label: 'Curb & Gutter', icon: 'bi-align-bottom',
        hint: 'Curb height is measured from the bottom of the pour; the gutter pours in front of the curb. Set gutter width to 0 for a plain curb.',
        fields: [{ key: 'length', label: 'Length (ft)' }, { key: 'curbW', label: 'Curb Width (in)' }, { key: 'curbH', label: 'Curb Height (in)' }, { key: 'gutterW', label: 'Gutter Width (in)' }, { key: 'gutterT', label: 'Gutter Thickness (in)' }] },
      { id: 'stairs', label: 'Stairs', icon: 'bi-bar-chart-steps',
        hint: 'Solid poured steps from the ground up. Rise = height of each step, run = tread depth. A landing is poured full height at the top; leave it 0 if none.',
        fields: [{ key: 'steps', label: '# of Steps', step: 1 }, { key: 'rise', label: 'Rise (in)' }, { key: 'run', label: 'Run (in)' }, { key: 'width', label: 'Width (ft)' }, { key: 'landing', label: 'Landing Depth (ft)' }] },
      { id: 'area', label: 'Custom Area', icon: 'bi-pentagon',
        hint: 'Irregular shapes: work out the surface area (sq ft) yourself, then enter the thickness.',
        fields: [{ key: 'area', label: 'Area (sq ft)' }, { key: 'thick', label: 'Thickness (in)' }] },
    ],
    concreteBagYield: { 40: 0.30, 50: 0.375, 60: 0.45, 80: 0.60 }, // cu ft of concrete per bag

    // "How is this calculated?" (i) panel content for every calculator tab
    calcInfoOpen: false,
    calcInfo: {
      paint: {
        title: 'Paint',
        formula: '(Walls − doors − windows + ceiling) × coats ÷ coverage = gallons',
        assumptions: [
          'Each door takes 20 sq ft off the wall area and each window takes 15 sq ft.',
          'Default coverage is 350 sq ft per gallon. Change it to match the coverage on your paint can.',
          'Gallons are rounded up to the next whole gallon.'
        ],
        excludes: [
          'Only the areas you enter are counted. Trim, doors, windows and baseboards are not added for you.',
          'Primer, or extra coats over a dark color or bare surface. Add coats to cover it.',
          'Rough or porous surfaces such as stucco, block and raw drywall, which soak up more paint.'
        ]
      },
      gravel: {
        title: 'Gravel & Bulk',
        formula: 'Length × Width × Depth (in) ÷ 12 ÷ 27 = cubic yards. Tons = cubic yards × tons per cu yd.',
        assumptions: [
          'The same depth over the whole area.',
          'Rounded up to the next 0.1 cu yd (or 0.1 ton).',
          'Compaction is off by default. Turn it on to add the extra material a compacted base needs (default 20%, so you order loose material for a compacted depth).',
          'Tons use the tons-per-cu-yd figure for the material you pick, for example 3/4" crushed stone 1.35, 1/2" minus 1.5, 1"–2" stone 1.3, river rock 1.4, lava rock 0.6 and mulch 0.4. Material with fines packs tighter and weighs more per yard, so a ton covers less area. These are averages; confirm with your supplier and edit the figure if theirs differs.',
          'The coverage note under Depth shows how far one ton goes at your depth. The “typical minimum depth” is about 1.5 times the largest stone; thinner layers leave gaps and shift.'
        ],
        excludes: [
          'Waste or spillage.',
          'Wet material, which weighs more per cubic yard.',
          'Delivery fees and minimum loads.'
        ]
      },
      sod: {
        title: 'Sod',
        formula: 'Area ÷ sq ft per pallet = pallets',
        assumptions: [
          'Default is 450 sq ft per pallet. Pallet sizes vary by supplier, so check yours.',
          'Rounded up to whole pallets.'
        ],
        excludes: [
          'Waste for cuts, curves and edges. Many installers add 5–10%; enter a slightly larger area to cover it.',
          'Soil prep, topsoil and fertilizer. Add those as separate materials.'
        ]
      },
      tile: {
        title: 'Flooring',
        formula: 'Area × (1 + waste %) = sq ft to buy',
        assumptions: [
          'Default waste is 10%, a typical allowance for cuts and breakage. Use more for diagonal or intricate layouts.',
          'Rounded up to a whole sq ft.',
          'Choose “Box” to buy by the box: the sq ft to buy is divided by the coverage per box and rounded up to full boxes.'
        ],
        excludes: [
          'Underlayment, thinset, grout and trim. Add those as separate materials. Baseboard has its own calculator.'
        ]
      },
      concrete: {
        title: 'Concrete',
        shared: [
          'Dimensions: feet for long runs, inches for thickness, width and depth.',
          'Waste % is added on top of the total volume. 10% is a common allowance for uneven ground, spillage and over-digging.',
          'Bag counts use standard yields: 40 lb ≈ 0.30 cu ft, 50 lb ≈ 0.375, 60 lb ≈ 0.45, 80 lb ≈ 0.60. Brands vary slightly, so check the bag.',
          'Ready-mix is rounded up to the next 0.1 cu yd. Bags are rounded up to whole bags.',
          'Many ready-mix suppliers charge a short-load fee on small orders. Ask your supplier.'
        ]
      }
    },
    concreteShapeInfo: {
      slab: {
        formula: 'Length × Width × Thickness ÷ 12 ÷ 27 = cubic yards',
        assumptions: ['The same thickness across the entire slab.', 'A flat rectangle.'],
        excludes: ['Thickened edges or an integral footing. Add those as a Footing.', 'Sub-base. Use the Gravel tab.']
      },
      footing: {
        formula: 'Length × Width × Depth',
        assumptions: ['One continuous run with the same cross-section the whole way.', 'Enter the total length of all runs, or use “# of Pours” for identical runs.'],
        excludes: ['Overlap at corners is not deducted, so the total is slightly high.']
      },
      wall: {
        formula: 'Length × Thickness × Height',
        assumptions: ['The same thickness and height along the whole wall.', 'A solid wall. Window and door openings are not subtracted.'],
        excludes: ['The footing under the wall. Add it as a Footing.', 'Openings. Reduce the length, or pour them as separate walls.']
      },
      round: {
        formula: 'π × (Diameter ÷ 2)² × Thickness',
        assumptions: ['A perfect circle with an even thickness.'],
        excludes: ['Thickened edges.']
      },
      column: {
        formula: 'π × (Diameter ÷ 2)² × Height',
        assumptions: ['A straight cylinder at the diameter you enter. For Sonotube, use the inside diameter.', 'Use “# of Pours” for the number of identical piers or holes.'],
        excludes: ['Bell or flared bases.', 'Holes dug wider than the tube. Poured straight into dirt, the waste % helps cover this.']
      },
      curb: {
        formula: 'Length × [(Curb width × Curb height) + (Gutter width × Gutter thickness)]',
        assumptions: ['The curb is a rectangle measured from the bottom of the pour.', 'The gutter sits in front of the curb, with no overlap.', 'The same cross-section along the whole length.'],
        excludes: ['A sloped or rolled curb face holds a little less concrete than a rectangle, so this slightly overestimates.', 'Corners and driveway aprons. Add those as a Custom Area.']
      },
      stairs: {
        formula: 'Width × Run × Rise × n(n+1) ÷ 2, plus Landing depth × Width × total height',
        assumptions: ['Solid poured steps, filled all the way down to the ground.', 'Every step has the same rise and run.', 'The optional landing at the top is poured to full height and counted separately.'],
        excludes: ['Thinner suspended-slab stairs, which use far less concrete.', 'Footings or a foundation under the stairs.']
      },
      area: {
        formula: 'Area × Thickness ÷ 12 ÷ 27 = cubic yards',
        assumptions: ['You work out the surface area yourself, for example ½ × base × height for a triangle.', 'The same thickness over the whole area.'],
        excludes: ['Areas with different thicknesses. Split them into separate pours.']
      }
    },
    calcInfoSections() {
      const tab = this.calcTab;
      const def = window.QPE_CALCS && window.QPE_CALCS[tab];
      if (def) {
        return [
          { heading: 'Formula', text: def.info.formula },
          { heading: 'Assumptions', items: def.info.assumptions },
          { heading: 'Not included', items: def.info.excludes }
        ];
      }
      const info = this.calcInfo[tab];
      if (!info) return [];
      if (tab !== 'concrete') {
        return [
          { heading: 'Formula', text: info.formula },
          { heading: 'Assumptions', items: info.assumptions },
          { heading: 'Not included', items: info.excludes }
        ];
      }
      const s = this.concreteShapeInfo[this.calc.concrete.shape] || {};
      return [
        { heading: `Formula – ${this.concreteShape().label}`, text: s.formula },
        { heading: 'Assumptions', items: s.assumptions },
        { heading: 'Not included', items: s.excludes },
        { heading: 'Waste, bags and rounding', items: info.shared }
      ];
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
      invoice: null, // saved invoice for this bid: { invoiceNumber, invoiceDate, notes, deposit, costs }
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
      logoName: '',
      termsAndConditions: `50% deposit due at project start, balance due upon completion.

Any additional work beyond the services listed above may incur extra charges.`,
      // Pre-filled on every invoice (editable per invoice)
      invoiceTerms: QPE_DEFAULT_INVOICE_TERMS,
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
        try {
          const parsed = JSON.parse(saved);
          Object.assign(this.settings, parsed);
          // Settings saved before invoice terms existed: keep what invoices already pre-filled (the bid terms)
          if (parsed.invoiceTerms === undefined) this.settings.invoiceTerms = this.settings.termsAndConditions;
          // Still the old bid-style placeholder (never customized): use the invoice-style wording instead
          if (this.settings.invoiceTerms === QPE_OLD_INVOICE_PLACEHOLDER) this.settings.invoiceTerms = QPE_DEFAULT_INVOICE_TERMS;
        } catch (_) {}
      }
      // Backfill initializedTrades for saves that predate the field
      this.settings.prefabScopeItems.forEach(item => {
        if (item.tradeId && !this.settings.initializedTrades.includes(item.tradeId)) {
          this.settings.initializedTrades.push(item.tradeId);
        }
      });
      // Migrate users still on the ORIGINAL default colors (green primary / amber accent) to the
      // current blue/gold defaults. Match the old defaults exactly so a green or orange the user
      // picked on purpose is never reverted.
      const sameHex = (a, b) => (a || '').toLowerCase() === b;
      let colorsMigrated = false;
      if (sameHex(this.settings.primaryColor, '#2e7d32')) { this.settings.primaryColor = '#3A5890'; colorsMigrated = true; }
      if (sameHex(this.settings.titleColor,   '#2e7d32')) { this.settings.titleColor   = '#3A5890'; colorsMigrated = true; }
      if (sameHex(this.settings.accentColor,  '#f9a825')) { this.settings.accentColor  = '#C99C2C'; colorsMigrated = true; }
      if (colorsMigrated) {
        // Persist so the early <head> theme script doesn't flash the old colors on the next launch
        try { localStorage.setItem('estimator-settings', JSON.stringify(this.settings)); } catch (_) {}
      }
      this.applyTheme();
      this.applyDarkMode();
      this.$watch('settings.primaryColor', () => this.applyTheme());
      this.$watch('settings.accentColor',  () => this.applyTheme());
      this.$watch('settings.darkMode',     () => this.applyDarkMode());
      // Sticky header: note when the brand row has scrolled away (the project row is then locked at the top)
      const onScroll = () => { this.headerStuck = window.scrollY > 48; };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      // Keyboard detection (touch devices): the visible height drops sharply while the keyboard is up. Dismissing it
      // with the back key leaves the field focused, so focus alone is not a reliable signal.
      const coarse = window.matchMedia('(pointer: coarse)');
      const vv = window.visualViewport;
      const viewH = () => (vv ? vv.height : window.innerHeight);
      let maxH = viewH();
      const updateKeyboard = () => {
        const h = viewH();
        if (h > maxH) maxH = h;
        this.keyboardOpen = coarse.matches && h < maxH * 0.8;
      };
      window.addEventListener('resize', updateKeyboard);
      if (vv) vv.addEventListener('resize', updateKeyboard);
      window.addEventListener('orientationchange', () => setTimeout(() => { maxH = viewH(); updateKeyboard(); }, 400));
      // Settings auto-save: any change is written to this device (and the cloud when signed in) a moment later
      this.$watch('settings', () => this._queueSettingsSave());
      const flushSettings = () => {
        if (this._settingsTimer) { clearTimeout(this._settingsTimer); this._settingsTimer = null; this.saveSettings(); }
      };
      window.addEventListener('pagehide', flushSettings);
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flushSettings(); });
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if ((this.settings.darkMode || 'os') === 'os') this.applyDarkMode();
      });
      if (!localStorage.getItem('onboarding-complete')) {
        this.onboardingStep = 1;
      }

      if (localStorage.getItem('onboarding-complete') && this.isMobilePlatform()) {
        const bootCount = (parseInt(localStorage.getItem('rateBootCount') || '0')) + 1;
        localStorage.setItem('rateBootCount', bootCount);
        const rateStatus = localStorage.getItem('rateStatus');
        const rateSnoozeAt = parseInt(localStorage.getItem('rateSnoozeAt') || '0');
        if (!rateStatus && bootCount >= 5) {
          this.rateModalOpen = true;
        } else if (rateStatus === 'snoozed' && bootCount >= rateSnoozeAt + 5) {
          this.rateModalOpen = true;
        } else if (rateStatus === 'low-rated') {
          const rateLowRatedAt   = parseInt(localStorage.getItem('rateLowRatedAt')   || '0');
          const rateLowRatedBoot = parseInt(localStorage.getItem('rateLowRatedBoot') || '0');
          if (bootCount >= rateLowRatedBoot + 30 && Date.now() >= rateLowRatedAt + 30 * 24 * 60 * 60 * 1000) {
            this.rateModalOpen = true;
          }
        }
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
                this._skipSettingsSave = true;
                Object.assign(this.settings, cloud);
                this.$nextTick(() => { this._skipSettingsSave = false; });
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

      // Android WebView: keyboard silently fails to open on the very first input tap
      // after a cold boot. Blur + refocus within the touchend handler (a user gesture)
      // forces the IME to appear. Only needed once per session.
      // iOS doesn't have this bug, and the extra blur/refocus cycle can cause the
      // page-zoom-on-focus workaround (styles.css @media (pointer: coarse)) to lose
      // its race against WKWebView's own auto-zoom, so restrict this to Android.
      if (window.Capacitor?.getPlatform() === 'android') {
        document.addEventListener('touchend', function fixFirstKeyboard(e) {
          const el = e.target;
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            document.removeEventListener('touchend', fixFirstKeyboard);
            el.blur();
            requestAnimationFrame(() => el.focus());
          }
        }, { passive: true });
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

    addPrefabItem(tradeId = this.settings.selectedTrade) {
      if (!tradeId) return;
      this.settings.prefabScopeItems.push({ _id: Date.now() + Math.random(), tradeId, title: '', description: '' });
      this.saveSettings();
    },
    openTemplateManager() {
      this.templateTrade = this.settings.selectedTrade || '';
      this.templateManagerOpen = true;
    },
    closeTemplateManager() {
      this.saveSettings();
      this.templateManagerOpen = false;
    },
    // Top nav helpers
    // The gear only ever opens Settings (Back to estimate is the way out), so tapping it again does nothing
    openSettings() { this.currentView = 'settings'; },
    navProjectEmpty() { return !((this.estimate.projectName || '').trim() || (this.estimate.customerName || '').trim()); },
    navProjectLabel() {
      return (this.estimate.projectName || '').trim() || (this.estimate.customerName || '').trim() || 'New estimate';
    },
    async removePrefabItem(id) {
      if (!await this._confirm('This will completely delete this item from Scope Templates. Are you sure?')) return;
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
      this.onboardingTradeError = false;
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
      if (!await this._confirm(`Do you want to add this to your list of templates for ${tradeName}?`)) return;
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
      if (this.estimate.photos.length >= 20) { this._notice('Maximum 20 photos per estimate.'); return; }
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
    // Each total takes an optional costs object (defaults to the bid's costs) so the invoice can reuse them.
    materialsTotal(c = this.estimate.costs) {
      return c.materials.reduce((s, m) => s + (+(m.qty) || 0) * (+(m.unitPrice) || 0), 0);
    },
    machineryTotal(c = this.estimate.costs) {
      return c.machinery.reduce((s, m) => s + (+(m.duration) || 0) * (+(m.rate) || 0), 0);
    },
    laborTotal(c = this.estimate.costs) {
      return (+(c.laborDays) || 0) * (+(c.laborWorkers) || 1) * (+(c.laborDailyRate) || 0);
    },
    miscTotal(c = this.estimate.costs) {
      return c.misc.reduce((s, m) => s + (+(m.amount) || 0), 0);
    },
    taxAmount(c = this.estimate.costs) {
      const rate = +(this.settings.taxRate) || 0;
      return (this.materialsTotal(c) + this.machineryTotal(c)) * (rate / 100);
    },
    grandTotal(c = this.estimate.costs) {
      return this.materialsTotal(c) + this.machineryTotal(c) + this.taxAmount(c) + this.laborTotal(c) + this.miscTotal(c);
    },

    fmt(n) { return '$' + (+(n) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); },

    // --- Settings ---
    loadLogo(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => { this.settings.logo = e.target.result; this.settings.logoName = file.name || ''; };
      reader.readAsDataURL(file);
      event.target.value = ''; // lets the same file be chosen again
    },
    removeLogo() {
      this.settings.logo = null;
      this.settings.logoName = '';
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

    // Debounced save used by the settings auto-save watcher
    _queueSettingsSave() {
      if (this._skipSettingsSave) return;
      clearTimeout(this._settingsTimer);
      this._settingsTimer = setTimeout(() => { this._settingsTimer = null; this.saveSettings(); }, 800);
    },
    saveSettings() {
      localStorage.setItem('estimator-settings', JSON.stringify(this.settings));
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
          this._skipSettingsSave = true;
          Object.assign(this.settings, cloud);
          this.$nextTick(() => { this._skipSettingsSave = false; });
          localStorage.setItem('estimator-settings', JSON.stringify(this.settings));
          this.applyTheme();
          this.syncStatus = 'loaded';
          setTimeout(() => { this.syncStatus = ''; }, 3000);
        } else {
          this._notice('No cloud settings found yet. Change any setting and it will upload automatically.');
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
        this._notice('Please enter a customer name before saving.');
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
        if (!full) { this._notice('Could not load estimate from cloud.'); return; }
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
        this._notice('Failed to load estimate from cloud.');
      }
    },

    async deleteCloudEstimate(est) {
      if (!await this._confirm(`Delete "${est.customerName || 'this estimate'}" from the cloud? This cannot be undone.`)) return;
      try {
        await fbDeleteEstimate(this.authUser.uid, est.id);
        this.cloudEstimates = this.cloudEstimates.filter(e => e.id !== est.id);
      } catch (_) {
        this._notice('Failed to delete. Please try again.');
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
          this._notice('This PDF does not contain estimate data. Only PDFs generated by this app can be opened.');
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
        this._notice('Could not load estimate. Make sure this PDF was generated by this app.');
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
      if (hasData && !await this._confirm('Start a new estimate? Your current data will be cleared.\n\nHeads up: bids that haven\'t been saved to the cloud or exported as a PDF will be lost.')) return;
      this._resetEstimate();
      this.currentView = 'estimator';
    },

    _confirm(message) {
      return new Promise(resolve => {
        this.confirmMessage = message;
        this.confirmResolve = resolve;
      });
    },
    // App-styled replacement for window.alert: shows a message with a single OK button
    _notice(message) {
      return new Promise(resolve => {
        this.noticeMessage = message;
        this.noticeResolve = resolve;
      });
    },
    noticeOk() {
      if (this.noticeResolve) this.noticeResolve();
      this.noticeMessage = '';
      this.noticeResolve = null;
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

    rateModalSelect(stars) {
      this.rateModalStars = stars;
      const pkgId = 'com.sodamoney.quickprojectestimator';
      if (stars === 5) {
        window.open('market://details?id=' + pkgId, '_system');
        localStorage.setItem('rateStatus', 'done');
      } else {
        window.open('https://docs.google.com/forms/d/e/1FAIpQLScWAC8tbAO1u6PAWeFp2PxMT9JhFLzml4oZ-wDLSe2jqCAb8A/viewform?usp=publish-editor', '_system');
        localStorage.setItem('rateStatus', 'low-rated');
        localStorage.setItem('rateLowRatedAt',   Date.now());
        localStorage.setItem('rateLowRatedBoot', localStorage.getItem('rateBootCount') || '0');
      }
      this.rateModalOpen = false;
    },

    rateModalDismiss() {
      const bootCount = parseInt(localStorage.getItem('rateBootCount') || '0');
      localStorage.setItem('rateStatus', 'snoozed');
      localStorage.setItem('rateSnoozeAt', bootCount);
      this.rateModalOpen = false;
    },

    openColorPicker(target) {
      this.colorPickerTarget = target;
      const rgb = this.hexToRgb(this.settings[target] || '#000000');
      this.colorPickerR = rgb[0];
      this.colorPickerG = rgb[1];
      this.colorPickerB = rgb[2];
      this.colorPickerOpen = true;
    },
    colorPickerHex() {
      return this.rgbToHex([this.colorPickerR, this.colorPickerG, this.colorPickerB]);
    },
    saveColorPicker() {
      this.settings[this.colorPickerTarget] = this.colorPickerHex();
      this.colorPickerOpen = false;
    },

    // --- Concrete calculator ---
    concreteShape() { return this.concreteShapes.find(s => s.id === this.calc.concrete.shape) || this.concreteShapes[0]; },
    // Volume of ONE pour in cubic feet (long runs in ft; thickness/width/depth in inches)
    concreteSingleFt3() {
      const c = this.calc.concrete;
      const d = c[c.shape] || {};
      const n = k => +d[k] || 0;
      switch (c.shape) {
        case 'slab':    return n('length') * n('width') * (n('thick') / 12);
        case 'footing': return n('length') * (n('width') / 12) * (n('depth') / 12);
        case 'wall':    return n('length') * (n('thick') / 12) * n('height');
        case 'round':   return Math.PI * Math.pow(n('diam') / 2, 2) * (n('thick') / 12);
        case 'column':  return Math.PI * Math.pow(n('diam') / 12 / 2, 2) * n('height');
        case 'curb':    return n('length') * ((n('curbW') / 12) * (n('curbH') / 12) + (n('gutterW') / 12) * (n('gutterT') / 12));
        case 'stairs': {
          const steps = Math.max(0, Math.floor(n('steps')));
          const treads = n('width') * (n('run') / 12) * (n('rise') / 12) * steps * (steps + 1) / 2;
          const landing = n('landing') * n('width') * (steps * n('rise') / 12);
          return treads + landing;
        }
        case 'area':    return n('area') * (n('thick') / 12);
      }
      return 0;
    },
    concreteTotals() {
      const c = this.calc.concrete;
      const rawFt3 = this.concreteSingleFt3() * (Math.max(0, +c.count) || 0);
      const wasteFactor = c.wasteOn ? 1 + (Math.max(0, +c.wastePct) || 0) / 100 : 1;
      const orderFt3 = rawFt3 * wasteFactor;
      const bags = {};
      Object.keys(this.concreteBagYield).forEach(lb => {
        bags[lb] = Math.ceil(parseFloat((orderFt3 / this.concreteBagYield[lb]).toFixed(6)));
      });
      return {
        rawFt3, rawYd: rawFt3 / 27,
        orderFt3, orderYd: orderFt3 / 27,
        orderYdRounded: Math.ceil(parseFloat((orderFt3 / 27 * 10).toFixed(6))) / 10,
        bags
      };
    },

    // --- Calculator picker + multi-line calculators (see js/calculators.js) ---
    isGenericCalc() { return !!(window.QPE_CALCS && window.QPE_CALCS[this.calcTab]); },
    calcDef() { return (window.QPE_CALCS && window.QPE_CALCS[this.calcTab]) || null; },
    calcCurrent() {
      for (const g of this.calcGroups) { const it = g.items.find(i => i.id === this.calcTab); if (it) return it; }
      return { id: this.calcTab, label: this.calcTab, icon: 'bi-calculator' };
    },
    calcTitle() { return this.calcDef()?.label || this.calcInfo[this.calcTab]?.title || this.calcCurrent().label; },
    pickCalc(id) { this.calcTab = id; this.calcPickerOpen = false; },
    bulkGroups() {
      const groups = [];
      this.bulkMaterials.forEach(m => {
        let g = groups.find(x => x.name === m.group);
        if (!g) { g = { name: m.group, items: [] }; groups.push(g); }
        g.items.push(m);
      });
      return groups;
    },
    bulkLabel() { return (this.bulkMaterials.find(m => m.id === this.calc.gravel.material) || this.bulkMaterials[0]).label; },
    // Coverage + typical-depth hint shown under the Depth field
    bulkInfo() {
      const g = this.calc.gravel;
      const m = this.bulkMaterials.find(x => x.id === g.material) || {};
      const tpy = +g.tonsPerYd || 0, depth = +g.depth || 0;
      const sqft = (tpy > 0 && depth > 0) ? Math.round(27 / tpy / (depth / 12)) : 0;
      return {
        coverage: sqft ? `1 ton covers about ${sqft.toLocaleString()} sq ft at ${depth} in deep` : '',
        minNote: m.minDepth ? `typical minimum depth ${m.minDepth} in` : '',
        below: !!(m.minDepth && depth > 0 && depth < m.minDepth)
      };
    },
    toggleQsel(id) { this.qsel = this.qsel === id ? '' : id; },
    closeQsel(id) { if (id === undefined || this.qsel === id) this.qsel = ''; },
    // True while any pop-up is open, so the page behind it can be locked
    anyModalOpen() {
      return !!(this.openModal || this.contactModalOpen || this.prefabPickerOpen || this.invoiceModalOpen ||
        this.calcModalOpen || this.templateManagerOpen || this.confirmMessage || this.noticeMessage || this.colorPickerOpen || this.rateModalOpen || this.onboardingStep > 0);
    },
    setBulkMaterial(id) {
      const m = this.bulkMaterials.find(x => x.id === id);
      if (!m) return;
      this.calc.gravel.material = id;
      this.calc.gravel.name = m.name;
      this.calc.gravel.tonsPerYd = m.tonsPerYd;
    },
    calcLines() {
      const d = this.calcDef();
      return d ? d.lines(this.calc[this.calcTab]) : [];
    },
    calcLinePrice(l) { return +(this.calc[this.calcTab].prices[l.key]) || 0; },
    addCalcLine(l) {
      if (!l.qty) return;
      this.estimate.costs.materials.push({ name: l.name, qty: l.qty, unitPrice: this.calcLinePrice(l) });
      const k = this.calcTab + ':' + l.key;
      this.calcAddedKey = k;
      setTimeout(() => { if (this.calcAddedKey === k) this.calcAddedKey = ''; }, 1600);
    },
    addAllCalcLines() {
      const lines = this.calcLines();
      if (!lines.length) return;
      lines.forEach(l => this.estimate.costs.materials.push({ name: l.name, qty: l.qty, unitPrice: this.calcLinePrice(l) }));
      this.calcModalOpen = false;
    },

    calcResult() {
      const c = this.calc;
      if (this.calcTab === 'concrete') {
        const t = this.concreteTotals();
        if (c.concrete.orderBy === 'bags') return { qty: t.bags[c.concrete.bagLb] || 0, unitPrice: +(c.concrete.pricePerBag) || 0 };
        return { qty: t.orderYdRounded || 0, unitPrice: +(c.concrete.pricePerYd) || 0 };
      }
      if (this.calcTab === 'paint') {
        const wallsNet = Math.max(0, (+c.paint.wallsSqFt || 0) - (+c.paint.doors || 0) * 20 - (+c.paint.windows || 0) * 15);
        const totalSqFt = wallsNet + (+c.paint.ceilingSqFt || 0);
        const gals = Math.ceil(totalSqFt * (+c.paint.coats || 1) / (+c.paint.coverage || 350));
        return { qty: gals || 0, unitPrice: +(c.paint.pricePerGal) || 0 };
      }
      if (this.calcTab === 'gravel') {
        let yd3 = ((+c.gravel.length || 0) * (+c.gravel.width || 0) * ((+c.gravel.depth || 0) / 12)) / 27;
        if (c.gravel.compactOn) yd3 *= 1 + (Math.max(0, +c.gravel.compactPct) || 0) / 100;
        if (c.gravel.pricedBy === 'ton') {
          const tons = yd3 * (+c.gravel.tonsPerYd || 0);
          return { qty: Math.ceil(parseFloat((tons * 10).toFixed(6))) / 10 || 0, unitPrice: +(c.gravel.pricePerTon) || 0 };
        }
        return { qty: Math.ceil(parseFloat((yd3 * 10).toFixed(6))) / 10 || 0, unitPrice: +(c.gravel.pricePerYd) || 0 };
      }
      if (this.calcTab === 'sod') {
        const sqFt = c.sod.mode === 'sqft' ? (+c.sod.sqFtDirect || 0) : (+c.sod.length || 0) * (+c.sod.width || 0);
        const pallets = Math.ceil(sqFt / (+c.sod.sqFtPerPallet || 450));
        return { qty: pallets || 0, unitPrice: +(c.sod.pricePerPallet) || 0 };
      }
      if (this.calcTab === 'tile') {
        const base = c.tile.mode === 'sqft' ? (+c.tile.sqFtDirect || 0) : (+c.tile.length || 0) * (+c.tile.width || 0);
        const sqFt = Math.ceil(parseFloat((base * (1 + (+c.tile.waste || 0) / 100)).toFixed(6)));
        if (c.tile.soldBy === 'box' && (+c.tile.boxSqFt || 0) > 0) {
          return { qty: Math.ceil(parseFloat((sqFt / +c.tile.boxSqFt).toFixed(6))) || 0, unitPrice: +(c.tile.pricePerBox) || 0 };
        }
        return { qty: sqFt || 0, unitPrice: +(c.tile.pricePerSqFt) || 0 };
      }
      return { qty: 0, unitPrice: 0 };
    },
    calcResultLabel() {
      const r = this.calcResult();
      const units = { paint: 'gal', gravel: 'cu yd', sod: 'pallets', tile: 'sq ft' };
      let u = units[this.calcTab] || '';
      if (this.calcTab === 'gravel' && this.calc.gravel.pricedBy === 'ton') u = 'tons';
      if (this.calcTab === 'tile' && this.calc.tile.soldBy === 'box') u = 'boxes';
      if (!r.qty) return '—';
      if (this.calcTab === 'concrete') {
        const cc = this.calc.concrete;
        const what = cc.orderBy === 'bags' ? `bags (${cc.bagLb} lb)` : 'cu yd';
        return `${r.qty} ${what}  ×  ${this.fmt(r.unitPrice)}  =  ${this.fmt(r.qty * r.unitPrice)}`;
      }
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
      let name = this.calc[this.calcTab]?.name || '';
      if (this.calcTab === 'concrete') {
        const cc = this.calc.concrete;
        name = `${name || 'Concrete'} (${cc.orderBy === 'bags' ? cc.bagLb + ' lb bags' : 'cu yd'})`;
      }
      if (this.calcTab === 'gravel' && this.calc.gravel.pricedBy === 'ton') name = `${name || 'Gravel'} (tons)`;
      if (this.calcTab === 'tile' && this.calc.tile.soldBy === 'box') name = `${name || 'Flooring'} (box of ${+this.calc.tile.boxSqFt} sq ft)`;
      this.estimate.costs.materials.push({ name, qty: r.qty, unitPrice: r.unitPrice });
      this.calcModalOpen = false;
    },

    _resetEstimate() {
      this.loadedCloudId = null;
      localStorage.removeItem('estimator-draft');
      Object.assign(this.estimate, {
        customerName: '', customerAddress: '',
        estimateDate: new Date().toISOString().split('T')[0],
        projectName: '', scopeOfWork: [], photos: [],
        startDate: '', completionDate: '', invoice: null
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

    // --- Invoice (stored on the estimate as estimate.invoice) ---
    _blankInvoiceCosts() {
      return { materials: [], machinery: [], laborDays: 1.0, laborWorkers: 1, laborDailyRate: 400, misc: [] };
    },
    _cloneCosts(costs) {
      const c = JSON.parse(JSON.stringify(costs || this._blankInvoiceCosts()));
      return {
        materials: c.materials || [], machinery: c.machinery || [],
        laborDays: c.laborDays ?? 1.0, laborWorkers: c.laborWorkers ?? 1,
        laborDailyRate: c.laborDailyRate ?? 400, misc: c.misc || []
      };
    },
    openInvoiceModal() {
      const e = this.estimate;
      if (!e.customerName.trim()) {
        this._notice('Please enter a customer name before creating an invoice.');
        return;
      }
      if (e.invoice) {
        this.invoiceDraft = {
          invoiceNumber: e.invoice.invoiceNumber || '',
          invoiceDate:   e.invoice.invoiceDate   || new Date().toISOString().split('T')[0],
          notes:         e.invoice.notes ?? '',
          deposit:       e.invoice.deposit ?? 0,
          costs:         this._cloneCosts(e.invoice.costs)
        };
      } else {
        this.invoiceDraft = this._newInvoiceDraft();
      }
      this.invoiceModalOpen = true;
    },
    _newInvoiceDraft() {
      const today = new Date().toISOString().split('T')[0];
      return {
        invoiceNumber: 'INV-' + today.replace(/-/g, ''),
        invoiceDate:   today,
        notes:         (this.settings.invoiceTerms ?? this.settings.termsAndConditions) || '',
        deposit:       0,
        costs:         this._cloneCosts(this.estimate.costs)
      };
    },
    // Invoice total minus any deposit already received
    invoiceBalanceDue(d) {
      return this.grandTotal(d.costs) - (+(d.deposit) || 0);
    },
    async resetInvoiceToBid() {
      if (!await this._confirm('Reset all invoice costs back to the bid amounts? Your invoice changes will be lost.')) return;
      this.invoiceDraft.costs = this._cloneCosts(this.estimate.costs);
    },
    invAddMaterial()  { this.invoiceDraft.costs.materials.push({ name: '', qty: 0, unitPrice: 0 }); },
    invAddMachinery() { this.invoiceDraft.costs.machinery.push({ name: '', duration: 1, rate: 0 }); },
    invAddMisc()      { this.invoiceDraft.costs.misc.push({ description: '', amount: 0 }); },
    async saveAndExportInvoice() {
      if (!this.invoiceDraft) return;
      // Save the invoice as related data on the bid (persists via draft, cloud save, and PDF metadata)
      this.estimate.invoice = JSON.parse(JSON.stringify(this.invoiceDraft));
      this._saveDraft();
      this.invoiceModalOpen = false;
      this.invoiceDraft = null;
      await this.generatePDF('invoice');
    },

    // --- PDF Generation ---
    async generatePDF(mode = 'bid') {
      const e = this.estimate;
      const s = this.settings;
      const isInvoice = mode === 'invoice' && !!e.invoice;
      const inv = isInvoice ? e.invoice : null;
      const c = isInvoice ? inv.costs : e.costs;

      if (!e.customerName.trim()) {
        this._notice('Please enter a customer name before generating the PDF.');
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: 'pt', format: 'letter' });
      const subjectData = { ...this.estimate, photos: [] }; // photos are in the PDF itself, not metadata
      doc.setProperties({
        title:   `${isInvoice ? 'Invoice' : 'Estimate'} – ${e.customerName}`,
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

      // Table header cell with explicit alignment so headers line up with their column data
      const hc = (content, halign) => ({ content, styles: { halign } });

      const taxRate = +(s.taxRate) || 0;
      const matSub  = this.materialsTotal(c);
      const matTax  = matSub  * taxRate / 100;
      const machSub = this.machineryTotal(c);
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
      doc.text(isInvoice ? 'Invoice' : 'Project Estimate', M, y + 20);
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
          { content: isInvoice ? 'Bill To' : 'Prepared For', styles: { fontStyle: 'bold', fontSize: 8, textColor: GRAY } },
          { content: isInvoice ? 'Invoice Date' : 'Date', styles: { fontStyle: 'bold', fontSize: 8, textColor: GRAY, halign: 'right' } }
        ],
        [
          { content: e.customerName, styles: { fontStyle: 'bold', fontSize: 12 } },
          { content: fmtDate(isInvoice ? inv.invoiceDate : e.estimateDate), styles: { halign: 'right', fontSize: 10 } }
        ]
      ];
      if (isInvoice) {
        clientBody.push([
          { content: e.customerAddress || '', styles: { textColor: GRAY, fontSize: 9 } },
          { content: inv.invoiceNumber ? 'Invoice #: ' + inv.invoiceNumber : '', styles: { halign: 'right', textColor: GRAY, fontSize: 9 } }
        ]);
      } else if (e.customerAddress) {
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
      if (!isInvoice) {
        clientBody.push([
          '',
          {
            content: e.completionDate
              ? 'Est. Completion: ' + fmtDate(e.completionDate)
              : 'Estimate valid for 30 days',
            styles: { halign: 'right', textColor: GRAY, fontSize: 9 }
          }
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
      if (c.materials.length > 0) {
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
          head: [['Materials', hc('Qty', 'center'), hc('Unit Price', 'right'), hc('Line Total', 'right')]],
          body: c.materials.map(m => [
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
      if (c.machinery.length > 0) {
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
          head: [['Machinery', hc('Duration', 'center'), hc('Daily Rate', 'right'), hc('Line Total', 'right')]],
          body: c.machinery.map(m => [
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
        head: [['Labor', hc('Days', 'center'), hc('Workers', 'center'), hc('Rate/Laborer', 'right'), hc('Total', 'right')]],
        body: [[
          'Labor',
          { content: c.laborDays,                                   styles: { halign: 'center' } },
          { content: c.laborWorkers ?? 1,                           styles: { halign: 'center' } },
          { content: money(c.laborDailyRate) + '/day',              styles: { halign: 'right' } },
          { content: money(this.laborTotal(c)),                             styles: { halign: 'right', fontStyle: 'bold' } }
        ]],
        headStyles: { fillColor: GREEN, textColor: 255, fontSize: 10, fontStyle: 'bold' },
        bodyStyles: { fontSize: 10 },
        columnStyles: { 0: { cellWidth: CW*0.32 }, 1: { cellWidth: CW*0.12 }, 2: { cellWidth: CW*0.12 }, 3: { cellWidth: CW*0.24 }, 4: { cellWidth: CW*0.20 } }
      });
      y = doc.lastAutoTable.finalY + 14;

      // ---- Misc ----
      if (c.misc.length > 0) {
        doc.autoTable({
          startY: y, margin: { left: M, right: M }, tableWidth: CW, showFoot: 'lastPage',
          head: [['Miscellaneous', hc('Amount', 'right')]],
          body: c.misc.map(m => [
            m.description || '',
            { content: money(m.amount), styles: { halign: 'right', fontStyle: 'bold' } }
          ]),
          foot: [[
            { content: 'Subtotal', styles: { halign: 'right', fontStyle: 'bold' } },
            { content: money(this.miscTotal(c)), styles: { halign: 'right', fontStyle: 'bold' } }
          ]],
          headStyles: { fillColor: GREEN, textColor: GREEN_TEXT, fontSize: 10, fontStyle: 'bold' },
          footStyles: { fillColor: LT_GREEN, textColor: [30, 30, 30], fontSize: 10 },
          bodyStyles: { fontSize: 10 },
          columnStyles: { 0: { cellWidth: CW*0.8 }, 1: { cellWidth: CW*0.2 } }
        });
        y = doc.lastAutoTable.finalY + 14;
      }

      // ---- Grand Total (invoices: optionally show the deposit received and the balance due) ----
      const invTotal = this.grandTotal(c);
      const deposit  = isInvoice ? (+(inv.deposit) || 0) : 0;
      const moneySigned = (n) => n < 0 ? '-' + money(-n) : money(n);
      if (deposit > 0) {
        doc.autoTable({
          startY: y, margin: { left: M, right: M }, tableWidth: CW,
          theme: 'plain',
          body: [
            [ { content: 'Invoice Total' },
              { content: money(invTotal), styles: { halign: 'right', fontStyle: 'bold' } } ],
            [ { content: 'Less: Deposit Received' },
              { content: '-' + money(deposit), styles: { halign: 'right', fontStyle: 'bold', textColor: AMBER } } ]
          ],
          bodyStyles: { fillColor: VLT, textColor: [30, 30, 30], fontSize: 11, cellPadding: { top: 6, bottom: 6, left: 12, right: 12 } },
          columnStyles: { 0: { cellWidth: CW*0.7 }, 1: { cellWidth: CW*0.3 } }
        });
        y = doc.lastAutoTable.finalY;
      }
      doc.autoTable({
        startY: y, margin: { left: M, right: M }, tableWidth: CW,
        theme: 'plain',
        body: [[
          { content: isInvoice ? (deposit > 0 ? 'BALANCE DUE' : 'TOTAL DUE') : 'TOTAL ESTIMATE' },
          { content: moneySigned(invTotal - deposit), styles: { halign: 'right', textColor: GREEN_TEXT } }
        ]],
        bodyStyles: { fillColor: GREEN, textColor: GREEN_TEXT, fontStyle: 'bold', fontSize: 13, cellPadding: { top: 10, bottom: 10, left: 12, right: 12 } },
        columnStyles: { 0: { cellWidth: CW*0.7 }, 1: { cellWidth: CW*0.3 } }
      });
      y = doc.lastAutoTable.finalY + 14;

      // ---- Project Photos ----
      const photosData = (await Promise.all(
        (isInvoice ? [] : (e.photos || [])) // invoices don't include project photos
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
      const termsText = isInvoice ? (inv.notes || '') : s.termsAndConditions;
      if (termsText) {
        if (y > PH - 120) { doc.addPage(); y = M; }
        doc.setDrawColor(...GREEN);
        doc.setLineWidth(1.5);
        doc.line(M, y, M + CW, y);
        y += 12;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...GREEN);
        doc.text(isInvoice ? 'TERMS & NOTES' : 'TERMS & CONDITIONS', M, y);
        y += 13;
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        doc.text(doc.splitTextToSize(termsText, CW), M, y);
      }

      // ---- Save ----
      const safeName    = e.customerName.replace(/[^a-z0-9]/gi, '_');
      const safeProject = e.projectName ? '_' + e.projectName.replace(/[^a-z0-9]/gi, '_') : '';
      const fileName = isInvoice
        ? `${safeName}${safeProject}_Invoice_${inv.invoiceDate || 'draft'}.pdf`
        : `${safeName}${safeProject}_${e.estimateDate || 'draft'}.pdf`;

      if (window.Capacitor?.isNativePlatform()) {
        const base64 = doc.output('datauristring').split(',')[1];
        const { Filesystem, Share } = window.Capacitor.Plugins;
        await Filesystem.writeFile({ path: fileName, data: base64, directory: 'CACHE' });
        const { uri } = await Filesystem.getUri({ path: fileName, directory: 'CACHE' });
        await Share.share({ title: fileName, url: uri, dialogTitle: isInvoice ? 'Save your invoice PDF' : 'Save your estimate PDF' });
      } else {
        doc.save(fileName);
      }
    }
  }));
});
