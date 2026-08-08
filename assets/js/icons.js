/* =============================================================
   CalaImports — Inline SVG icon set (no external requests)
   ============================================================= */
(function () {
  var S = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';

  var P = {
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    cart: '<path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 8H6"/><circle cx="10" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/>',
    whatsapp: '<path d="M3.5 20.5l1.3-4.4A8.2 8.2 0 1 1 8 19.3l-4.5 1.2z"/><path d="M9 9.2c.2 1 .8 2.2 1.7 3.1.9.9 2 1.5 3.1 1.7.4.1.8-.1 1-.4l.5-.8-2-1-.7.8a5.6 5.6 0 0 1-2.2-2.2l.8-.7-1-2-.8.5c-.3.2-.5.6-.4 1z" stroke-width="1.4"/>',
    /* logo oficial de WhatsApp (relleno) para el botón flotante */
    waSolid: '<path fill="currentColor" stroke="none" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.19-.53.06-.25-.12-1.05-.38-1.99-1.23-.74-.65-1.23-1.46-1.38-1.71-.14-.24-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.24.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.84-.2-.48-.4-.42-.55-.43h-.47c-.16 0-.43.06-.65.31-.22.24-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.11-.22-.17-.46-.29Z"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>',
    chevronDown: '<path d="M6 9l6 6 6-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    star: '<path d="M12 3l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.2l5.9-.8z" fill="currentColor" stroke="none"/>',
    truck: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/>',
    tag: '<path d="M3 11V4h7l11 11-7 7z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
    chat: '<path d="M20 12a7.5 7.5 0 0 1-11 6.7L4 20l1.3-4A7.5 7.5 0 1 1 20 12z"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18.5 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
    refresh: '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v4h-4"/>',
    shield: '<path d="M12 3l7 3v5.5c0 4.2-2.9 7.6-7 9.5-4.1-1.9-7-5.3-7-9.5V6z"/><path d="M9.2 12.2l2 2 3.6-3.8"/>',
    heart: '<path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9z"/>',
    check: '<path d="M4.5 12.5l4.5 4.5L19.5 6.5"/>',
    trash: '<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>',
    edit: '<path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 5.5L20 7"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/>',
    facebook: '<path d="M14.5 8.5h2.5V5h-2.7C12 5 10.5 6.7 10.5 9v2H8.2v3.5h2.3V21H14v-6.5h2.5l.5-3.5H14V9.4c0-.6.2-.9.5-.9z"/>',
    tiktok: '<path d="M14 4v10.5a3.5 3.5 0 1 1-3-3.5"/><path d="M14 6.5c.8 1.7 2.3 2.6 4.5 2.7"/>',
    box: '<path d="M12 3l8 4.2v9.6L12 21l-8-4.2V7.2z"/><path d="M4 7.2l8 4.3 8-4.3M12 11.5V21"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    users: '<circle cx="9" cy="9" r="3.2"/><path d="M3.5 19c.6-3.2 2.8-4.8 5.5-4.8s4.9 1.6 5.5 4.8"/><path d="M16 6.2A3 3 0 0 1 16 12M17.5 14.6c2 .6 3.2 2.1 3.6 4.4"/>',
    grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>',
    image: '<rect x="3" y="4.5" width="18" height="15" rx="3"/><circle cx="8.5" cy="10" r="1.6"/><path d="M4 17l5-4.5 4 3.5 3-2.5 4 3.5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 3l1.2 2.2 2.4-.5 .6 2.4 2.2 1.1-1.2 2.2 1.2 2.2-2.2 1.1-.6 2.4-2.4-.5L12 21l-1.2-2.2-2.4.5-.6-2.4-2.2-1.1 1.2-2.2L5.6 8.2l2.2-1.1.6-2.4 2.4.5z"/>',
    lock: '<rect x="4.5" y="10" width="15" height="10.5" rx="3"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/>',
    logout: '<path d="M14 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/><path d="M17 8l4 4-4 4M21 12H10"/>',
    download: '<path d="M12 4v11M7.5 11L12 15.5 16.5 11"/><path d="M5 20h14"/>',
    upload: '<path d="M12 20V9M7.5 13L12 8.5 16.5 13"/><path d="M5 4h14"/>',
    home: '<path d="M4 11l8-7 8 7v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M9.5 21v-6h5v6"/>',
    phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="3"/><path d="M10.5 5.5h3"/>',
    bolt: '<path d="M13 3L5 13h6l-1 8 8-10h-6z"/>',
    chip: '<rect x="6.5" y="6.5" width="11" height="11" rx="3"/><path d="M10 3v3.5M14 3v3.5M10 17.5V21M14 17.5V21M3 10h3.5M3 14h3.5M17.5 10H21M17.5 14H21"/>',
    gamepad: '<path d="M7.5 8h9a4.5 4.5 0 0 1 4.4 3.6l.7 3.6c.4 2.2-2.4 3.4-3.7 1.6L16.5 15h-9l-1.4 1.8C4.8 18.6 2 17.4 2.4 15.2l.7-3.6A4.5 4.5 0 0 1 7.5 8z"/><path d="M6 12h3M7.5 10.5v3"/><circle cx="15.5" cy="11.5" r="1"/><circle cx="17.5" cy="13.5" r="1"/>',
    earbuds: '<path d="M8 5a3.5 3.5 0 0 1 3.5 3.5v3a3.5 3.5 0 0 1-7 0v-3A3.5 3.5 0 0 1 8 5z"/><path d="M6.5 15v4"/><path d="M16 5a3.5 3.5 0 0 1 3.5 3.5v3a3.5 3.5 0 0 1-7 0v-3A3.5 3.5 0 0 1 16 5z"/><path d="M17.5 15v4"/>',
    case: '<rect x="6.5" y="2.5" width="11" height="19" rx="3.5"/><rect x="9" y="5" width="5" height="5" rx="1.6"/>',
    apple: '<path d="M15.6 12.3c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .7 1.1 1.6 2.3 2.8 2.3 1.1 0 1.5-.7 2.9-.7 1.3 0 1.7.7 2.9.7 1.2 0 2-1.1 2.7-2.2.5-.8.9-1.6 1.1-2.3-2.4-.9-2.1-3.9-2.1-4.1z" transform="translate(0 -2)"/><path d="M13.4 5.6c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-.9 2.8 1 .1 2-.5 2.6-1.3z"/>',
    android: '<path d="M5 10h14v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><path d="M5 10a7 7 0 0 1 14 0"/><path d="M7.5 6L6 3.8M16.5 6L18 3.8"/><circle cx="9.5" cy="7.5" r=".8" fill="currentColor" stroke="none"/><circle cx="14.5" cy="7.5" r=".8" fill="currentColor" stroke="none"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    map: '<path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.2l3.2 2"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 7.8v.4"/>',
    receipt: '<path d="M6 3h12v18l-3-1.8-3 1.8-3-1.8L6 21z"/><path d="M9 8h6M9 12h6"/>',
    stock: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    card: '<rect x="2.5" y="5" width="19" height="14" rx="3.5"/><path d="M2.5 9.5h19M6 15h3"/>',
    billete: '<rect x="2.5" y="6" width="19" height="12" rx="3"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v.01M18 14.5v.01"/>',
    btc: '<path d="M8 4.5v15M11.5 4.5v15"/><path d="M6 7h6.8a2.75 2.75 0 0 1 0 5.5H6h7.4a2.75 2.75 0 0 1 0 5.5H6"/>',
    plane: '<path d="M4.5 13.5l15-8.5-3 15-4-5-5 3z"/><path d="M7.5 18.5l0-2.5 3-1.5"/>',
    fire: '<path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-2 1-3 1-3s0 2 1.5 2S12 7 12 3z"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="3.5"/><path d="M3 10h18M17 14.5h1.5"/><path d="M16.5 6l-9-2.5L5 6"/>'
  };

  window.ICONS = P;
  window.icon = function (name, cls) {
    var p = P[name] || P.info;
    return '<svg ' + S + (cls ? ' class="' + cls + '"' : '') + ' aria-hidden="true">' + p + '</svg>';
  };
})();
