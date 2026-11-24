// Material calculators that produce several order lines (fence, roofing, drywall, deck, ...).
// Each definition drives the picker tile, the input form, the order lines and the (i) info panel.
// Inputs are plain numbers or select values stored on calc[<id>]; line prices live in calc[<id>].prices.
// Paint, Gravel, Sod, Flooring and Concrete have their own hand-written UI in index.html / app.js.
(function () {
  const num = (c, k) => +c[k] || 0;
  const ceil6 = (x) => Math.ceil(parseFloat((+x).toFixed(6)));          // whole units, ignores float fuzz
  const ceil1 = (x) => Math.ceil(parseFloat((+x * 10).toFixed(6))) / 10; // up to the next 0.1
  const line = (key, name, qty, unit, note) => ({ key, name, qty, unit, note: note || '' });
  const keep = (lines) => lines.filter(l => l.qty > 0);

  const defs = {
    // ---------------------------------------------------------------- Drywall
    drywall: {
      label: 'Drywall', icon: 'bi-layers', group: 'Finishes',
      hint: 'Sheets for walls and ceilings, plus screws, tape and joint compound.',
      defaults: { walls: 0, ceiling: 0, sheet: '32', waste: 10 },
      inputs: [
        { key: 'walls', label: 'Wall Area (sq ft)' },
        { key: 'ceiling', label: 'Ceiling Area (sq ft)' },
        { key: 'sheet', label: 'Sheet Size', type: 'select', options: [
          { v: '32', label: '4×8 ft (32 sq ft)' }, { v: '40', label: '4×10 ft (40 sq ft)' }, { v: '48', label: '4×12 ft (48 sq ft)' }] },
        { key: 'waste', label: 'Waste %', step: 1 }
      ],
      lines(c) {
        const area = num(c, 'walls') + num(c, 'ceiling');
        const sheetSqFt = num(c, 'sheet') || 32;
        const sheets = ceil6(area * (1 + num(c, 'waste') / 100) / sheetSqFt);
        return keep([
          line('sheets', `Drywall sheets (${c.sheet} sq ft)`, sheets, 'sheets', `${area} sq ft + ${num(c, 'waste')}% waste`),
          line('screws', 'Drywall screws (lb)', ceil6(area / 100), 'lb', 'about 1 lb per 100 sq ft'),
          line('tape', 'Drywall tape (250 ft roll)', ceil6(area * 0.37 / 250), 'rolls', 'about 0.37 ft of tape per sq ft'),
          line('mud', 'Joint compound (4.5 gal bucket)', ceil6(area / 400), 'buckets', 'about 400 sq ft per bucket')
        ]);
      },
      info: {
        formula: 'Sheets = (Walls + Ceiling) × (1 + waste %) ÷ sheet area',
        assumptions: [
          'Default waste is 10%, a typical allowance for cuts and offcuts.',
          'Sheets are rounded up to whole sheets.',
          'Screws, tape and compound are rules of thumb: about 1 lb of screws per 100 sq ft, 0.37 ft of tape per sq ft (250 ft rolls) and one 4.5 gal bucket of compound per 400 sq ft. Your product and finish level may differ.'
        ],
        excludes: [
          'Openings are not subtracted. Enter the net area if you want to deduct doors and windows.',
          'Corner bead, primer, sandpaper and fasteners other than screws.'
        ]
      }
    },

    // ---------------------------------------------------------------- Baseboard / trim
    trim: {
      label: 'Baseboard', icon: 'bi-border-bottom', group: 'Finishes',
      hint: 'Baseboard or other trim run around a room, by the piece.',
      defaults: { perimeter: 0, doors: 0, piece: '8', waste: 10 },
      inputs: [
        { key: 'perimeter', label: 'Room Perimeter (ft)' },
        { key: 'doors', label: '# of Door Openings', step: 1 },
        { key: 'piece', label: 'Piece Length', type: 'select', options: [
          { v: '8', label: '8 ft' }, { v: '12', label: '12 ft' }, { v: '16', label: '16 ft' }] },
        { key: 'waste', label: 'Waste %', step: 1 }
      ],
      lines(c) {
        const run = Math.max(0, num(c, 'perimeter') - num(c, 'doors') * 3);
        const pieceLen = num(c, 'piece') || 8;
        return keep([
          line('trim', `Baseboard / trim (${pieceLen} ft pieces)`, ceil6(run * (1 + num(c, 'waste') / 100) / pieceLen), 'pieces',
            `${run} ft + ${num(c, 'waste')}% waste`)
        ]);
      },
      info: {
        formula: 'Pieces = (Perimeter − 3 ft per door) × (1 + waste %) ÷ piece length',
        assumptions: [
          'Each door opening takes 3 ft off the run.',
          'Default waste is 10% for miter cuts and joints.',
          'Pieces are rounded up to whole pieces.'
        ],
        excludes: [
          'Offcuts are not reused, so pieces are counted from total length rather than from the cut list.',
          'Corner blocks, caulk, nails and paint.'
        ]
      }
    },

    // ---------------------------------------------------------------- Pavers
    pavers: {
      label: 'Pavers', icon: 'bi-grid-3x3-gap', group: 'Outdoor',
      hint: 'Pavers plus the gravel base and bedding sand under them.',
      defaults: { area: 0, pLen: 9, pWid: 6, waste: 10, baseDepth: 4, compact: 20, sandDepth: 1 },
      inputs: [
        { key: 'area', label: 'Patio Area (sq ft)' },
        { key: 'waste', label: 'Paver Waste %', step: 1 },
        { key: 'pLen', label: 'Paver Length (in)' },
        { key: 'pWid', label: 'Paver Width (in)' },
        { key: 'baseDepth', label: 'Base Depth (in)' },
        { key: 'compact', label: 'Base Compaction %', step: 1 },
        { key: 'sandDepth', label: 'Bedding Sand Depth (in)' }
      ],
      lines(c) {
        const area = num(c, 'area');
        const each = (num(c, 'pLen') * num(c, 'pWid')) / 144;
        const sqFt = ceil6(area * (1 + num(c, 'waste') / 100));
        const count = each > 0 ? ceil6(sqFt / each) : 0;
        const baseYd = ceil1(area * (num(c, 'baseDepth') / 12) / 27 * (1 + num(c, 'compact') / 100));
        const sandYd = ceil1(area * (num(c, 'sandDepth') / 12) / 27);
        return keep([
          line('pavers', 'Pavers (sq ft)', sqFt, 'sq ft', count ? `about ${count} pavers` : ''),
          line('base', 'Paver base gravel (cu yd)', baseYd, 'cu yd', `${num(c, 'baseDepth')} in compacted base`),
          line('sand', 'Bedding sand (cu yd)', sandYd, 'cu yd', `${num(c, 'sandDepth')} in deep`)
        ]);
      },
      info: {
        formula: 'Pavers = Area × (1 + waste %). Base and sand = Area × depth ÷ 12 ÷ 27 cubic yards.',
        assumptions: [
          'Default waste is 10% for cuts and breakage. Use more for curves or diagonal patterns.',
          'The base is increased by the compaction % (default 20%) so you order loose material for a compacted depth.',
          'Pavers, base and sand are all rounded up (whole sq ft; base and sand to 0.1 cu yd).'
        ],
        excludes: [
          'Edge restraint, polymeric joint sand and sealer.',
          'Excavation and haul-off. Use the Excavation calculator.',
          'Sloped or uneven base depth.'
        ]
      }
    },

    // ---------------------------------------------------------------- Block wall
    block: {
      label: 'Block Wall', icon: 'bi-columns-gap', group: 'Concrete & Masonry',
      hint: 'Concrete block (CMU) for a wall, plus mortar.',
      defaults: { length: 0, height: 0, openings: 0, bH: 8, bL: 16, waste: 5, perBag: 35 },
      inputs: [
        { key: 'length', label: 'Wall Length (ft)' },
        { key: 'height', label: 'Wall Height (ft)' },
        { key: 'openings', label: 'Openings (sq ft)' },
        { key: 'waste', label: 'Waste %', step: 1 },
        { key: 'bH', label: 'Block Face Height (in)' },
        { key: 'bL', label: 'Block Face Length (in)' },
        { key: 'perBag', label: 'Blocks per Mortar Bag', step: 1 }
      ],
      lines(c) {
        const face = num(c, 'bH') * num(c, 'bL');
        const area = Math.max(0, num(c, 'length') * num(c, 'height') - num(c, 'openings'));
        const blocks = face > 0 ? ceil6(area * (144 / face) * (1 + num(c, 'waste') / 100)) : 0;
        return keep([
          line('blocks', `Concrete blocks (${num(c, 'bH')}×${num(c, 'bL')} in face)`, blocks, 'blocks', `${area} sq ft wall + ${num(c, 'waste')}% waste`),
          line('mortar', 'Mortar mix (80 lb bag)', num(c, 'perBag') > 0 ? ceil6(blocks / num(c, 'perBag')) : 0, 'bags', `about ${num(c, 'perBag')} blocks per bag`)
        ]);
      },
      info: {
        formula: 'Blocks = (Length × Height − openings) × (144 ÷ block face area in sq in) × (1 + waste %)',
        assumptions: [
          'Standard 8 × 16 in block (nominal face) is 1.125 blocks per sq ft. Change the face size for other blocks.',
          'Default waste is 5% for breakage and cuts.',
          'About 35 blocks per 80 lb bag of mortar. This varies with joint size and mason, so adjust it to your experience.'
        ],
        excludes: [
          'Rebar, grout fill and cores, bond beams and cap blocks.',
          'The footing under the wall. Use the Concrete calculator.',
          'Special shapes such as corners and half blocks.'
        ]
      }
    },

    // ---------------------------------------------------------------- Fence
    fence: {
      label: 'Fence', icon: 'bi-layout-three-columns', group: 'Outdoor',
      hint: 'Posts, rails and pickets for a straight fence run, plus post concrete and gates.',
      defaults: { length: 0, spacing: 8, rails: 3, gates: 0, gateW: 4, pW: 5.5, pGap: 0.5, waste: 5, concrete: 2 },
      inputs: [
        { key: 'length', label: 'Total Fence Length (ft)' },
        { key: 'spacing', label: 'Post Spacing (ft)' },
        { key: 'rails', label: 'Rails per Section', step: 1 },
        { key: 'gates', label: '# of Gates', step: 1 },
        { key: 'gateW', label: 'Gate Width (ft)' },
        { key: 'pW', label: 'Picket Width (in)' },
        { key: 'pGap', label: 'Gap Between Pickets (in)' },
        { key: 'waste', label: 'Picket Waste %', step: 1 },
        { key: 'concrete', label: 'Concrete Bags per Post' }
      ],
      lines(c) {
        const len = num(c, 'length');
        const gates = Math.max(0, Math.floor(num(c, 'gates')));
        const net = Math.max(0, len - gates * num(c, 'gateW'));
        const spacing = num(c, 'spacing');
        const sections = spacing > 0 ? ceil6(net / spacing) : 0;
        const posts = (len > 0 && spacing > 0) ? sections + 1 + gates : 0;
        const picketPitch = num(c, 'pW') + num(c, 'pGap');
        const pickets = picketPitch > 0 ? ceil6(net * 12 / picketPitch * (1 + num(c, 'waste') / 100)) : 0;
        return keep([
          line('posts', 'Fence posts', posts, 'posts', `${sections} sections + ends${gates ? ' + gate posts' : ''}`),
          line('rails', `Fence rails (${spacing || 8} ft)`, sections * num(c, 'rails'), 'rails', `${num(c, 'rails')} per section`),
          line('pickets', 'Fence pickets', pickets, 'pickets', `${net} ft of fence + ${num(c, 'waste')}% waste`),
          line('concrete', 'Post concrete (bags)', ceil6(posts * num(c, 'concrete')), 'bags', `${num(c, 'concrete')} per post`),
          line('gates', 'Gates', gates, 'gates', '')
        ]);
      },
      info: {
        formula: 'Sections = (Length − gate widths) ÷ post spacing. Posts = sections + 1 + one per gate. Rails = sections × rails per section. Pickets = fence length × 12 ÷ (picket width + gap).',
        assumptions: [
          'Treats the fence as one continuous run. With corners, enter the total length of all runs. If individual runs do not divide evenly by the post spacing you may need a post or two more, since each run is rounded up to whole sections in real life.',
          'Rails are assumed to be cut to the post spacing (for example 8 ft rails at 8 ft spacing).',
          'Each gate opening takes its width off the fence run and adds one post.',
          'Default picket waste is 5%. Pickets, posts and rails are rounded up to whole pieces.'
        ],
        excludes: [
          'Gate hardware, hinges, latches, nails and screws, stain or sealer.',
          'Sloped ground, which needs shorter or stepped sections.',
          'Extra posts for runs that end at a corner or do not divide evenly by the post spacing.'
        ]
      }
    },

    // ---------------------------------------------------------------- Excavation / haul-off
    excavation: {
      label: 'Excavation', icon: 'bi-minecart-loaded', group: 'Outdoor',
      hint: 'Dirt to dig out and haul away, with swell and truck loads.',
      defaults: { length: 0, width: 0, area: 0, depth: 0, unit: 'in', swell: 25, truck: 10 },
      inputs: [
        { key: 'length', label: 'Length (ft)' },
        { key: 'width', label: 'Width (ft)' },
        { key: 'area', label: 'or Area (sq ft)' },
        { key: 'depth', label: 'Depth' },
        { key: 'unit', label: 'Depth Unit', type: 'select', options: [{ v: 'in', label: 'Inches' }, { v: 'ft', label: 'Feet' }] },
        { key: 'swell', label: 'Swell %', step: 1 },
        { key: 'truck', label: 'Truck Capacity (cu yd)' }
      ],
      lines(c) {
        const area = num(c, 'area') > 0 ? num(c, 'area') : num(c, 'length') * num(c, 'width');
        const depthFt = c.unit === 'ft' ? num(c, 'depth') : num(c, 'depth') / 12;
        const bank = area * depthFt / 27;
        const loose = bank * (1 + num(c, 'swell') / 100);
        const truck = num(c, 'truck');
        return keep([
          line('haul', 'Haul-off dirt (cu yd, loose)', ceil1(loose), 'cu yd', `${bank.toFixed(1)} cu yd in the ground + ${num(c, 'swell')}% swell`),
          line('loads', `Haul-off truck loads (${truck || 10} cu yd)`, truck > 0 ? ceil6(loose / truck) : 0, 'loads', '')
        ]);
      },
      info: {
        formula: 'In-ground volume = Area × Depth ÷ 27 cubic yards. Loose volume = in-ground volume × (1 + swell %). Loads = loose volume ÷ truck capacity.',
        assumptions: [
          'Dirt takes up more room once it is dug up. Default swell is 25%; clay and rock can swell more.',
          'If you enter an area it is used instead of length × width.',
          'Default truck capacity is 10 cu yd. Loads are rounded up to whole loads.'
        ],
        excludes: [
          'Dump or disposal fees, and the weight limits on your truck.',
          'Sloped or uneven digging depth.',
          'Backfill or imported material. Use the Gravel & Bulk calculator.'
        ]
      }
    },

    // ---------------------------------------------------------------- Roofing
    roofing: {
      label: 'Roofing', icon: 'bi-house', group: 'Building',
      hint: 'Shingle bundles, underlayment and ridge cap from the roof area and pitch.',
      defaults: { area: 0, areaType: 'footprint', pitch: 6, waste: 10, ridge: 0, ridgeCov: 20, ulCov: 400 },
      inputs: [
        { key: 'area', label: 'Roof Area (sq ft)' },
        { key: 'areaType', label: 'Area Measured As', type: 'select', options: [
          { v: 'footprint', label: 'Footprint (flat, from above)' }, { v: 'surface', label: 'Actual roof surface' }] },
        { key: 'pitch', label: 'Pitch (rise per 12 in)' },
        { key: 'waste', label: 'Waste %', step: 1 },
        { key: 'ridge', label: 'Ridge / Hip Length (ft)' },
        { key: 'ridgeCov', label: 'Ridge Cap per Bundle (ft)' },
        { key: 'ulCov', label: 'Underlayment per Roll (sq ft)' }
      ],
      lines(c) {
        const pitch = num(c, 'pitch');
        const factor = c.areaType === 'surface' ? 1 : Math.sqrt(1 + Math.pow(pitch / 12, 2));
        const surface = num(c, 'area') * factor;
        const squares = surface / 100;
        const bundles = ceil6(squares * (1 + num(c, 'waste') / 100) * 3);
        return keep([
          line('shingles', 'Shingles (bundles)', bundles, 'bundles',
            `${squares.toFixed(2)} squares of roof + ${num(c, 'waste')}% waste (3 bundles per square)`),
          line('underlay', `Underlayment (${num(c, 'ulCov') || 400} sq ft roll)`, num(c, 'ulCov') > 0 ? ceil6(surface / num(c, 'ulCov')) : 0, 'rolls', ''),
          line('ridge', 'Ridge cap (bundles)', num(c, 'ridgeCov') > 0 ? ceil6(num(c, 'ridge') / num(c, 'ridgeCov')) : 0, 'bundles', `${num(c, 'ridge')} ft of ridge / hip`)
        ]);
      },
      info: {
        formula: 'Roof surface = Footprint × √(1 + (pitch ÷ 12)²). Squares = surface ÷ 100. Bundles = squares × (1 + waste %) × 3.',
        assumptions: [
          'One square covers 100 sq ft and takes 3 bundles of standard shingles.',
          'If you measure the footprint from above, the pitch factor converts it to the actual sloped surface. If you already measured the sloped surface, choose “Actual roof surface”.',
          'Default waste is 10%. Use 15% or more for complex roofs with many valleys and hips.',
          'Underlayment is figured from the roof surface, with no extra for overlaps. Default roll size is 400 sq ft.',
          'Ridge cap coverage per bundle varies by product (often 20–35 ft). The default is a conservative 20 ft.'
        ],
        excludes: [
          'Starter strip, drip edge, flashing, vents, ice and water shield, nails and sealant.',
          'Tear-off and disposal.',
          'Steep or multi-pitch roofs. Add each pitch as a separate area.'
        ]
      }
    },

    // ---------------------------------------------------------------- Deck
    deck: {
      label: 'Deck', icon: 'bi-hammer', group: 'Building',
      hint: 'Decking boards, joists, rim boards and hangers for a rectangular deck.',
      defaults: { length: 0, width: 0, bW: 5.5, gap: 0.25, bLen: 12, spacing: 16, stock: 12, waste: 10 },
      inputs: [
        { key: 'length', label: 'Deck Length (ft)' },
        { key: 'width', label: 'Deck Width (ft)' },
        { key: 'bW', label: 'Board Width (in)' },
        { key: 'gap', label: 'Board Gap (in)' },
        { key: 'bLen', label: 'Board Length (ft)' },
        { key: 'spacing', label: 'Joist Spacing (in)', type: 'select', options: [
          { v: '12', label: '12 in' }, { v: '16', label: '16 in' }, { v: '24', label: '24 in' }] },
        { key: 'stock', label: 'Rim Board Length (ft)' },
        { key: 'waste', label: 'Decking Waste %', step: 1 }
      ],
      lines(c) {
        const L = num(c, 'length'), W = num(c, 'width');
        const pitch = num(c, 'bW') + num(c, 'gap');
        const rows = pitch > 0 ? ceil6(W * 12 / pitch) : 0;
        const linear = rows * L;
        const boards = num(c, 'bLen') > 0 ? ceil6(linear * (1 + num(c, 'waste') / 100) / num(c, 'bLen')) : 0;
        const spacing = num(c, 'spacing') || 16;
        const joists = (L > 0 && W > 0) ? Math.floor(L * 12 / spacing) + 1 : 0;
        const rim = num(c, 'stock') > 0 ? ceil6(2 * L / num(c, 'stock')) : 0;
        return keep([
          line('boards', `Decking boards (${num(c, 'bLen')} ft)`, boards, 'boards', `${rows} rows across, ${linear} ft total + ${num(c, 'waste')}% waste`),
          line('joists', `Joists (${W} ft long)`, joists, 'joists', `every ${spacing} in, including both end joists`),
          line('rim', `Rim boards (${num(c, 'stock')} ft)`, rim, 'boards', 'the two long sides'),
          line('hangers', 'Joist hangers', joists * 2, 'hangers', '2 per joist')
        ]);
      },
      info: {
        formula: 'Rows = deck width × 12 ÷ (board width + gap). Boards = rows × length × (1 + waste %) ÷ board length. Joists = length × 12 ÷ spacing + 1.',
        assumptions: [
          'Boards run along the length of the deck and joists run across the width, so each joist is as long as the deck is wide.',
          'The first and last joist double as the rim at the short ends. Rim boards are counted for the two long sides only.',
          'Default board is 5½ in wide (5/4×6) with a ¼ in gap and 10% waste.',
          'Joist hangers: 2 per joist (one at each end).'
        ],
        excludes: [
          'Posts, beams and footings. Use the Concrete calculator for footings.',
          'Stairs and railings, ledger board, blocking and bridging.',
          'Screws, hidden fasteners, joist tape and stain.'
        ]
      }
    },

    // ---------------------------------------------------------------- Wall framing
    framing: {
      label: 'Wall Framing', icon: 'bi-tools', group: 'Building',
      hint: 'Studs and plates for a stud wall.',
      defaults: { length: 0, spacing: '16', corners: 0, openings: 0, plateLen: '12', waste: 5 },
      inputs: [
        { key: 'length', label: 'Wall Length (ft)' },
        { key: 'spacing', label: 'Stud Spacing', type: 'select', options: [
          { v: '12', label: '12 in' }, { v: '16', label: '16 in' }, { v: '24', label: '24 in' }] },
        { key: 'corners', label: '# of Corners / T-Walls', step: 1 },
        { key: 'openings', label: '# of Door / Window Openings', step: 1 },
        { key: 'plateLen', label: 'Plate Board Length', type: 'select', options: [
          { v: '8', label: '8 ft' }, { v: '10', label: '10 ft' }, { v: '12', label: '12 ft' }, { v: '16', label: '16 ft' }] },
        { key: 'waste', label: 'Waste %', step: 1 }
      ],
      lines(c) {
        const L = num(c, 'length');
        const spacing = num(c, 'spacing') || 16;
        const base = L > 0 ? Math.floor(L * 12 / spacing) + 1 : 0;
        const studs = L > 0 ? ceil6((base + num(c, 'corners') * 2 + num(c, 'openings') * 4) * (1 + num(c, 'waste') / 100)) : 0;
        const plates = num(c, 'plateLen') > 0 ? ceil6(3 * L / num(c, 'plateLen')) : 0;
        return keep([
          line('studs', 'Wall studs', studs, 'studs', `${base} at ${spacing} in + extras + ${num(c, 'waste')}% waste`),
          line('plates', `Plate boards (${num(c, 'plateLen')} ft)`, plates, 'boards', 'one bottom plate + double top plate')
        ]);
      },
      info: {
        formula: 'Studs = Length × 12 ÷ spacing + 1, plus 2 per corner and 4 per opening, plus waste. Plates = 3 × Length ÷ board length.',
        assumptions: [
          'Plates are one bottom plate plus a double top plate (3 times the wall length).',
          'Each corner or T-wall adds 2 studs and each door or window opening adds 4 (two king and two jack studs).',
          'Default waste is 5% for crowned or culled studs.'
        ],
        excludes: [
          'Headers, cripples and sills over openings, blocking, and fire stops.',
          'Sheathing, drywall and fasteners.'
        ]
      }
    }
  };

  // Tile order and section headings for the calculator picker (ids not listed here are hidden)
  const groups = [
    { name: 'Finishes', ids: ['paint', 'drywall', 'tile', 'trim'] },
    { name: 'Outdoor', ids: ['gravel', 'sod', 'pavers', 'fence', 'excavation'] },
    { name: 'Concrete & Masonry', ids: ['concrete', 'block'] },
    { name: 'Building', ids: ['roofing', 'deck', 'framing'] }
  ];
  // Picker labels and icons for the hand-built calculators
  const builtin = {
    paint: { label: 'Paint', icon: 'bi-brush' },
    tile: { label: 'Flooring', icon: 'bi-grid' },
    gravel: { label: 'Gravel & Bulk', icon: 'bi-stack' },
    sod: { label: 'Sod', icon: 'bi-tree' },
    concrete: { label: 'Concrete', icon: 'bi-bricks' }
  };

  window.QPE_CALCS = defs;
  window.QPE_CALC_GROUPS = groups.map(g => ({
    name: g.name,
    items: g.ids.map(id => ({ id, label: (defs[id] || builtin[id]).label, icon: (defs[id] || builtin[id]).icon }))
  }));
  // Fresh calculator state for the data model: inputs + an empty price map per calculator
  window.QPE_CALC_STATE = function () {
    const s = {};
    Object.keys(defs).forEach(id => { s[id] = Object.assign({}, defs[id].defaults, { prices: {} }); });
    return s;
  };
})();
