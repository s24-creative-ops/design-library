const data = window.designLibraryData;

const state = {
  section: "home",
  item: null,
};

const topNavLinks = Array.from(document.querySelectorAll("[data-main-nav]"));
const homeTrigger = document.querySelector("[data-home-trigger]");
const sidebarEyebrow = document.getElementById("ft-sidebar-eyebrow");
const sidebarNav = document.getElementById("ft-sidebar-nav");
const sidebarToggle = document.getElementById("ft-sidebar-toggle");
const contentRoot = document.getElementById("ft-content");
const layoutRoot = document.getElementById("ft-layout");

const LP_BLEED_MODULES = new Set(["hero-bleed-flex", "hero-bleed-flex-centered", "action-tiles_rle"]);
const LP_REMOTE_STYLESHEETS = ["https://www.static-immobilienscout24.de/fro/core/8.5.0/css/core.min.css"];
const EMAIL_HERO_SIDEBAR_ITEMS = new Set(["heros-left", "heros-center", "heros-fakeforms"]);
const DEFAULT_ROUTE = { section: "home", item: null };
state.sidebarCollapsed = false;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function copyButton(value, label) {
  const escapedValue = escapeHtml(value);
  const escapedLabel = escapeHtml(label);

  return `
    <button
      class="ft-copy-button"
      type="button"
      data-copy-value="${escapedValue}"
      aria-label="${escapedLabel} kopieren"
      title="${escapedLabel} kopieren"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    </button>
  `;
}

function renderModuleCopy(moduleName) {
  const escapedName = escapeHtml(moduleName);

  return `
    <div class="module-copy" data-module="${escapedName}">
      <button class="module-copy__button" type="button" aria-label="${escapedName} kopieren" title="${escapedName} kopieren">
        <span class="module-copy__name">${escapedName}</span>
        <svg class="module-copy__icon module-copy__icon--default" viewBox="0 0 24 24">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <span class="module-copy__icon--success" aria-hidden="true"></span>
      </button>
    </div>
  `;
}

async function copyText(value) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "readonly");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function renderTopNav() {
  topNavLinks.forEach((link) => {
    const isActive = state.section !== "home" && link.dataset.mainNav === state.section;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function syncSidebarToggleState() {
  if (!sidebarToggle) return;

  const isExpanded = !state.sidebarCollapsed;
  const label = isExpanded ? "Sidebar einklappen" : "Sidebar ausklappen";

  layoutRoot.classList.toggle("is-sidebar-collapsed", state.sidebarCollapsed);
  sidebarToggle.setAttribute("aria-expanded", String(isExpanded));
  sidebarToggle.setAttribute("aria-label", label);
  sidebarToggle.setAttribute("title", label);
}

// Hash routes stay intentionally small: #home or #<section>/<item>.
function getSectionItems(sectionKey) {
  return data.sections[sectionKey]?.items || [];
}

function getDefaultItem(sectionKey) {
  return getSectionItems(sectionKey)[0]?.id || null;
}

function normalizeRoute(sectionKey, itemId) {
  if (sectionKey === "home") {
    return { section: "home", item: null };
  }

  if (!data.sections[sectionKey]) {
    return { ...DEFAULT_ROUTE };
  }

  const items = getSectionItems(sectionKey);
  const resolvedItem = items.find((item) => item.id === itemId)?.id || getDefaultItem(sectionKey);

  if (!resolvedItem) {
    return { ...DEFAULT_ROUTE };
  }

  return {
    section: sectionKey,
    item: resolvedItem,
  };
}

function getHashForRoute(route) {
  if (route.section === "home") {
    return "#home";
  }

  return `#${encodeURIComponent(route.section)}/${encodeURIComponent(route.item)}`;
}

function replaceHash(hashValue) {
  const nextUrl = `${window.location.pathname}${window.location.search}${hashValue}`;
  window.history.replaceState(null, "", nextUrl);
}

function getRouteFromHash(hashValue = window.location.hash) {
  const rawHash = String(hashValue || "").replace(/^#/, "").trim();

  if (!rawHash || rawHash === "home") {
    return { ...DEFAULT_ROUTE };
  }

  const [rawSection = "", rawItem = ""] = rawHash.split("/");
  const sectionKey = decodeURIComponent(rawSection);
  const itemId = rawItem ? decodeURIComponent(rawItem) : null;

  return normalizeRoute(sectionKey, itemId);
}

function applyRoute(route) {
  state.section = route.section;
  state.item = route.item;
  render();
}

function syncRouteFromHash() {
  const currentHash = window.location.hash;
  const route = getRouteFromHash(currentHash);

  if (currentHash) {
    const normalizedHash = getHashForRoute(route);

    if (currentHash !== normalizedHash) {
      replaceHash(normalizedHash);
    }
  }

  applyRoute(route);
}

function navigateTo(sectionKey, itemId = null) {
  const route = normalizeRoute(sectionKey, itemId);
  const nextHash = getHashForRoute(route);

  if (window.location.hash !== nextHash) {
    window.location.hash = nextHash;
    return;
  }

  applyRoute(route);
}

function renderSidebarItem(item, extraClass = "") {
  const activeClass = item.id === state.item ? " is-active" : "";

  return `
    <button class="ft-sidebar__link${activeClass}${extraClass ? ` ${extraClass}` : ""}" type="button" data-sidebar-item="${item.id}">
      ${escapeHtml(item.label)}
    </button>
  `;
}

function formatLpCategoryLabel(category) {
  const labels = {
    hero: "Hero",
    teaser: "Teaser",
    steps: "Steps",
    content: "Content",
    callout: "Callouts",
    "social-proof": "Social Proof",
    tiles: "Tiles",
    utility: "Utility",
    media: "Media",
  };

  return labels[category] || category || "Other";
}

function getSectionNote(sectionKey, currentItem) {
  if (sectionKey === "lp") {
    return null;
  }

  return sectionKey === "email" ? null : currentItem.note;
}

function renderSidebar(items, label, sectionKey = state.section) {
  sidebarEyebrow.textContent = label;

  if (sectionKey === "email") {
    const fragments = [];
    let heroItems = [];

    const flushHeroItems = () => {
      if (!heroItems.length) return;
      const heroTarget = heroItems[0]?.id || "";
      const heroGroupActive = heroItems.some((item) => item.id === state.item);

      fragments.push(`
        <div class="ft-sidebar__group">
          <button class="ft-sidebar__link${heroGroupActive ? " is-active" : ""}" type="button" data-sidebar-item="${heroTarget}">
            Heros
          </button>
          ${
            heroGroupActive
              ? `
                <div class="ft-sidebar__group-items">
                  ${heroItems.map((item) => renderSidebarItem(item, "ft-sidebar__link--sub")).join("")}
                </div>
              `
              : ""
          }
        </div>
      `);
      heroItems = [];
    };

    items.forEach((item) => {
      if (EMAIL_HERO_SIDEBAR_ITEMS.has(item.id)) {
        heroItems.push(item);
        return;
      }

      flushHeroItems();
      fragments.push(renderSidebarItem(item));
    });

    flushHeroItems();
    sidebarNav.innerHTML = fragments.join("");
  } else if (sectionKey === "lp") {
    sidebarNav.innerHTML = items.map((item) => renderSidebarItem(item)).join("");
  } else {
    sidebarNav.innerHTML = items.map((item) => renderSidebarItem(item)).join("");
  }

  sidebarNav.querySelectorAll("[data-sidebar-item]").forEach((button) => {
    button.addEventListener("click", () => {
      navigateTo(state.section, button.dataset.sidebarItem);
    });
  });
}

function renderHome() {
  const { homePage } = data;
  const quickLinks = Array.isArray(homePage.quickLinks) ? homePage.quickLinks : [];

  contentRoot.innerHTML = `
    <header class="ft-page-header ft-page-header--home">
      <h1 class="ft-page-header__title">${escapeHtml(homePage.label)}</h1>
      <p class="ft-page-header__intro">${escapeHtml(homePage.intro)}</p>
    </header>

    <section class="ft-home-links" aria-label="Builder-Bereiche">
      ${quickLinks
        .map((link) => {
          const sectionKey = typeof link.section === "string" ? link.section : "";
          const itemId = getDefaultItem(sectionKey);
          const href = getHashForRoute({ section: sectionKey, item: itemId });
          const gptHref = typeof link.gptHref === "string" ? link.gptHref : "";
          const gptLabel = typeof link.gptLabel === "string" ? link.gptLabel : "";

          return `
            <article class="ft-home-link-card" data-home-section="${escapeHtml(sectionKey)}" data-home-item="${escapeHtml(itemId || "")}" tabindex="0" role="link" aria-label="${escapeHtml(link.label || sectionKey)} öffnen">
              <span class="ft-home-link-card__label">${escapeHtml(link.label || sectionKey)}</span>
              <div class="ft-home-link-card__actions">
                ${
                  gptHref && gptLabel
                    ? `<a class="button-outline-strong ft-home-link-card__gpt" href="${escapeHtml(gptHref)}" target="_blank" rel="noopener noreferrer">${escapeHtml(gptLabel)}</a>`
                    : ""
                }
              </div>
            </article>
          `;
        })
        .join("")}
    </section>
  `;

  contentRoot.querySelectorAll("[data-home-section]").forEach((card) => {
    const sectionKey = card.getAttribute("data-home-section") || "";
    const itemId = card.getAttribute("data-home-item") || null;

    const openSection = () => {
      if (!sectionKey) return;
      navigateTo(sectionKey, itemId);
    };

    card.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("a")) return;
      openSection();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openSection();
    });
  });
}

function renderNote(note) {
  if (!note) return "";

  return `
    <section class="ft-note" aria-label="Hinweis">
      ${note.eyebrow ? `<p class="ft-note__eyebrow">${escapeHtml(note.eyebrow)}</p>` : ""}
      ${note.title ? `<span class="ft-note__label">${escapeHtml(note.title)}</span>` : ""}
      ${note.text ? `<p class="ft-note__text">${escapeHtml(note.text)}</p>` : ""}
    </section>
  `;
}

function renderValueCard(title, value, preview) {
  return `
    <article class="ft-token-card">
      <div class="ft-token-card__preview">${preview}</div>
      <div class="ft-token-card__meta">
        <h3 class="ft-token-card__title">${escapeHtml(title)}</h3>
        <div class="ft-value-row">
          <code>${escapeHtml(value)}</code>
          ${copyButton(value, title)}
        </div>
      </div>
    </article>
  `;
}

function renderPlainRow(title, metaHtml, previewHtml, copyValue, extraClass = "") {
  return `
    <article class="ft-plain-row${extraClass ? ` ${extraClass}` : ""}">
      <div class="ft-plain-row__preview">${previewHtml}</div>
      <div class="ft-plain-row__main">
        <h3 class="ft-plain-row__title">${escapeHtml(title)}</h3>
        ${metaHtml}
      </div>
      <div class="ft-plain-row__copy">
        ${copyButton(copyValue, title)}
      </div>
    </article>
  `;
}

function renderTokenContent(itemId) {
  const { tokens } = data;

  if (itemId === "colors") {
    return `
      <div class="ft-swatch-groups">
        ${tokens.colors.groups
          .map(
            (group) => `
              <section class="ft-swatch-group">
                <h3 class="ft-swatch-group__title">${escapeHtml(group.title)}</h3>
                <div class="ft-swatch-grid">
                  ${group.items
                    .map(
                      (item) => `
                        <article class="ft-token-card ft-swatch-card">
                          <div class="ft-swatch__chip" style="background:${escapeHtml(item.value)};"></div>
                          <div class="ft-token-card__meta">
                            <p class="ft-swatch__name">${escapeHtml(item.name)}</p>
                            <div class="ft-value-row">
                              <code>${escapeHtml(item.value)}</code>
                              ${copyButton(item.value, item.name)}
                            </div>
                          </div>
                        </article>
                      `,
                    )
                    .join("")}
                </div>
              </section>
            `,
          )
          .join("")}
      </div>
    `;
  }

  if (itemId === "buttons") {
    return `
      <div class="ft-button-list">
        ${tokens.buttons.items
          .map((item) => {
            if (item.isLink) {
              return renderPlainRow(
                item.name,
                `<div class="ft-plain-row__meta"><code>${escapeHtml(item.name)}</code></div>`,
                `
                  <a class="ft-token-chevron-link" href="#0">
                    <img src="${escapeHtml(item.iconUrl)}" width="8" height="16" alt="" />
                    <span>${escapeHtml(item.name)}</span>
                  </a>
                `,
                item.name,
              );
            }

            return renderPlainRow(
              item.name,
              `<div class="ft-plain-row__meta"><code>${escapeHtml(item.name)}</code></div>`,
              `
                <div
                  class="ft-token-button-chip"
                  style="background:${escapeHtml(item.background)};color:${escapeHtml(item.color)};border:1px solid ${escapeHtml(item.border)};"
                >
                  ${escapeHtml(item.name)}
                </div>
              `,
              item.name,
            );
          })
          .join("")}
      </div>
    `;
  }

  if (itemId === "typography") {
    const rows = [
      ...tokens.typography.headingItems.map((item) => ({ ...item, fontWeight: 700 })),
      ...tokens.typography.bodyItems.map((item) => ({ ...item, fontWeight: 400 })),
    ];

    return `
      <div class="ft-content-stack">
        <section class="ft-type-source">
          <p class="ft-type-source__sample">${escapeHtml(tokens.typography.sample)}</p>
          <a class="ft-type-source__link" href="${escapeHtml(tokens.typography.sourceUrl)}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(tokens.typography.sourceLabel)}
          </a>
        </section>

        <div class="ft-type-list">
          ${rows
            .map(
              (item) => `
                <article class="ft-type-row">
                  <div class="ft-type-row__column">
                    <p
                      class="ft-type-row__sample"
                      style="font-size:${escapeHtml(item.desktop.fontSize)};line-height:${escapeHtml(item.desktop.lineHeight)};font-weight:${item.fontWeight};"
                    >
                      ${escapeHtml(item.label)}
                    </p>
                    <div class="ft-type-row__meta">
                      <span>Desktop</span>
                      <span>Font-size ${escapeHtml(item.desktop.fontSize)}</span>
                      <span>Line-height ${escapeHtml(item.desktop.lineHeight)}</span>
                    </div>
                  </div>
                  <div class="ft-type-row__column">
                    <p
                      class="ft-type-row__sample"
                      style="font-size:${escapeHtml(item.mobile.fontSize)};line-height:${escapeHtml(item.mobile.lineHeight)};font-weight:${item.fontWeight};"
                    >
                      ${escapeHtml(item.label)}
                    </p>
                    <div class="ft-type-row__meta">
                      <span>Mobile</span>
                      <span>Font-size ${escapeHtml(item.mobile.fontSize)}</span>
                      <span>Line-height ${escapeHtml(item.mobile.lineHeight)}</span>
                    </div>
                  </div>
                  <div class="ft-type-row__copy">${copyButton(item.name, item.name)}</div>
                </article>
              `,
            )
            .join("")}
        </div>
      </div>
    `;
  }

  if (itemId === "radius") {
    return `
      <div class="ft-plain-list">
        ${tokens.radius
          .map((item) =>
            renderPlainRow(
              item.name,
              `<div class="ft-plain-row__meta"><code>${escapeHtml(item.value)}</code></div>`,
              `<div class="ft-token-shape" style="border-radius:${escapeHtml(item.value)};"></div>`,
              item.value,
            ),
          )
          .join("")}
      </div>
    `;
  }

  if (itemId === "spacing") {
    return `
      <div class="ft-token-grid">
        ${tokens.spacing
          .map((item) =>
            renderValueCard(
              item.name,
              item.value,
              `<div class="ft-token-spacing"><div class="ft-token-spacing-bar" style="width:${escapeHtml(item.value)};"></div></div>`,
            ),
          )
          .join("")}
      </div>
    `;
  }

  if (itemId === "borders") {
    return `
      <div class="ft-token-grid">
        ${tokens.borders
          .map((item) => {
            const styleColor = item.name === "none" ? "transparent" : "#333333";
            const styleHeight = item.name === "none" ? "1px" : item.value;

            return renderValueCard(
              item.name,
              item.value,
              `<div class="ft-token-border-preview"><div class="ft-token-border-line" style="height:${escapeHtml(styleHeight)};background:${styleColor};"></div></div>`,
            );
          })
          .join("")}
      </div>
    `;
  }

  if (itemId === "ratios") {
    return `
      <div class="ft-ratio-grid">
        ${tokens.ratios
          .map((item) => {
            const parts = item.ratio.split(":").map(Number);
            const paddingTop =
              parts.length === 2 && parts[0] ? `${((parts[1] / parts[0]) * 100).toFixed(2)}%` : "56.25%";

            return `
              <article class="ft-ratio-card ft-token-card">
                <div class="ft-ratio-card__header">
                  <div class="ft-ratio-card__ratio">
                    <span>${escapeHtml(item.ratio)}</span>
                    ${item.badge ? `<span class="ft-ratio-card__badge">${escapeHtml(item.badge)}</span>` : ""}
                  </div>
                  ${copyButton(item.ratio, item.ratio)}
                </div>
                <h3 class="ft-ratio-card__title">${escapeHtml(item.title)}</h3>
                <div class="ft-ratio-preview">
                  <div class="ft-ratio-preview__box" style="padding-top:${paddingTop};">
                    <div class="ft-ratio-preview__box-inner">${escapeHtml(item.ratio)}</div>
                  </div>
                  <div class="ft-ratio-preview__sizes">
                    <p>${escapeHtml(item.primarySize)}</p>
                    ${item.secondarySize ? `<p>${escapeHtml(item.secondarySize)}</p>` : ""}
                  </div>
                </div>
                <p class="ft-ratio-card__usage">${escapeHtml(item.usage)}</p>
              </article>
            `;
          })
          .join("")}
      </div>
    `;
  }

  return "";
}

function slugifyModuleName(value) {
  return value.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").replace(/-+/g, "-").toLowerCase();
}

function renderEmailSection(item) {
  return `<div class="ft-email-library">${item.libraryHtml || ""}</div>`;
}

function renderLpSection(item) {
  const sectionId = `lp-${item.id}`;
  const pageId = item.id || "";

  return `
    <div class="ft-lp-library" data-lp-page="${escapeHtml(pageId)}">
      <section class="test-section" id="${escapeHtml(sectionId)}">
        ${(item.modules || [])
          .map((moduleName) => {
            const previewName = moduleName === "lp-sticky-footer" ? "sticky-footer" : moduleName;
            const frameId = moduleName === "lp-sticky-footer" ? "lp-sticky-footer" : `lp-${slugifyModuleName(moduleName)}`;
            const bleedClass = LP_BLEED_MODULES.has(moduleName) ? " test-module-row--bleed" : "";

            return `
              <div class="test-module-row${bleedClass}">
                ${renderModuleCopy(moduleName)}
                <div class="test-module-frame">
                  <div
                    class="ft-lp-shadow-host"
                    data-lp-page="${escapeHtml(pageId)}"
                    data-lp-module="${escapeHtml(moduleName)}"
                    data-lp-preview-name="${escapeHtml(previewName)}"
                    data-frame-id="${escapeHtml(frameId)}"
                  ></div>
                </div>
              </div>
            `;
          })
          .join("")}
      </section>
    </div>
  `;
}

function renderSectionContent(sectionKey, item) {
  if (sectionKey === "tokens") {
    return renderTokenContent(item.id);
  }

  if (sectionKey === "email") {
    return renderEmailSection(item);
  }

  if (sectionKey === "lp") {
    return renderLpSection(item);
  }

  return "";
}

function renderSection() {
  const currentSection = data.sections[state.section];
  const currentItem = currentSection.items.find((item) => item.id === state.item) || currentSection.items[0];
  const noteHtml = renderNote(getSectionNote(state.section, currentItem));
  const sectionClass =
    state.section === "email" || state.section === "lp"
      ? "ft-content-section ft-content-section--library"
      : "ft-content-section";

  state.item = currentItem.id;
  renderSidebar(currentSection.items, currentSection.label, state.section);

  contentRoot.innerHTML = `
    ${noteHtml}

    <section class="${sectionClass}">
      ${renderSectionContent(state.section, currentItem)}
    </section>
  `;

  bindCopyButtons();
  bindModuleCopyButtons();
  hydrateEmailPreviewScopes();
  hydrateEmailServiceProducts();
  hydrateLpModulePreviews();
}

function render() {
  renderTopNav();
  syncSidebarToggleState();

  if (state.section === "home") {
    layoutRoot.classList.add("ft-layout--home");
    renderHome();
    return;
  }

  layoutRoot.classList.remove("ft-layout--home");
  renderSection();
}

function bindCopyButtons() {
  contentRoot.querySelectorAll("[data-copy-value]").forEach((button) => {
    if (button.dataset.copyBound === "true") return;
    button.dataset.copyBound = "true";

    button.addEventListener("click", async () => {
      const value = button.dataset.copyValue || "";
      if (!value) return;

      try {
        await copyText(value);
        button.classList.add("is-copied");
        window.setTimeout(() => {
          button.classList.remove("is-copied");
        }, 1200);
      } catch (error) {
        console.warn("copy failed", error);
      }
    });
  });
}

function bindModuleCopyButtons() {
  contentRoot.querySelectorAll(".module-copy").forEach((copy) => {
    if (copy.dataset.copyBound === "true") return;
    copy.dataset.copyBound = "true";

    const button = copy.querySelector(".module-copy__button");
    const moduleName = copy.dataset.module || "";
    if (!button || !moduleName) return;

    button.addEventListener("click", async () => {
      try {
        await copyText(moduleName);
        copy.classList.add("is-copied");
        window.setTimeout(() => {
          copy.classList.remove("is-copied");
        }, 1200);
      } catch (error) {
        console.warn("module copy failed", error);
      }
    });
  });
}

function hydrateEmailServiceProducts() {
  const host = contentRoot.querySelector("[data-email-service-products]");
  if (!host) return;

  host.innerHTML = data.serviceProducts
    .map(
      (product) => `
        <article class="servicetiles-card">
          <a class="servicetiles-card__link" href="${escapeHtml(product.targetUrl || "")}" target="_blank" rel="noopener noreferrer">
            <div class="servicetiles-card__panel">
              <div class="servicetiles-card__header">
                <img class="servicetiles-card__icon" src="${escapeHtml(product.iconUrl || "")}" alt="" width="32" height="32" loading="lazy" />
              </div>
              <h3 class="servicetiles-card__title">${escapeHtml(product.title || "")}</h3>
              <p class="module__body servicetiles-card__body">${escapeHtml(product.description || "")}</p>
            </div>
          </a>
        </article>
      `,
    )
    .join("");
}

function hydrateEmailPreviewScopes() {
  contentRoot.querySelectorAll(".test-email-preview").forEach((host) => {
    if (host.querySelector(":scope > .preview-shell")) return;

    // Recreate the real preview shell so preview-styles.css owns the module typography inside the official library.
    const shell = document.createElement("div");
    shell.className = "preview-shell";

    const canvas = document.createElement("main");
    canvas.className = "preview-canvas";

    while (host.firstChild) {
      canvas.appendChild(host.firstChild);
    }

    shell.appendChild(canvas);
    host.appendChild(shell);
  });
}

function initLpCounterAnimated(root) {
  const items = Array.from(
    root.querySelectorAll('.counter-animated__item > [class^="font-heading-"], .counter-animated__item > [class*=" font-heading-"]'),
  );

  if (!items.length) return;

  const startCount = (element) => {
    const originalText = element.textContent.trim();
    const match = originalText.match(/(\d+[.,]?\d*)/);
    if (!match) return;

    const numberPart = match[1];
    const prefix = originalText.slice(0, match.index);
    const suffix = originalText.slice(match.index + numberPart.length);
    const hasComma = numberPart.includes(",");
    const cleaned = numberPart.replace(/\./g, "").replace(",", ".");
    const decimals = cleaned.includes(".") ? cleaned.split(".")[1].length : 0;
    const target = Number.parseFloat(cleaned);
    if (Number.isNaN(target)) return;

    const duration = 1200;
    let start = null;

    const easeOut = (value) => value * (2 - value);

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const value = target * easeOut(progress);

      let display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
      if (hasComma) display = display.replace(".", ",");

      element.textContent = `${prefix}${display}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = originalText;
      }
    };

    window.requestAnimationFrame(step);
  };

  if (!("IntersectionObserver" in window)) {
    items.forEach(startCount);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCount(entry.target);
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 },
  );

  items.forEach((element) => observer.observe(element));
}

function initLpAccordion(root) {
  root.querySelectorAll(".accordion__trigger").forEach((trigger) => {
    const item = trigger.closest(".accordion__item");
    const panel = item ? item.querySelector(".accordion__panel") : null;
    if (!item || !panel || trigger.dataset.ftBound === "true") return;

    trigger.dataset.ftBound = "true";
    trigger.setAttribute("aria-expanded", "false");
    panel.style.maxHeight = "0px";

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      if (isOpen) {
        item.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = "0px";
      } else {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });
}

function initLpVideo(root) {
  if (root.dataset.ftVideoBound === "true") return;
  root.dataset.ftVideoBound = "true";

  root.addEventListener("click", (event) => {
    const media = event.target.closest(".video--youtube .video-module__media");
    if (!media) return;

    const wrapper = media.closest(".video--youtube");
    if (!wrapper || wrapper.classList.contains("is-playing")) return;

    const player = wrapper.querySelector(".video-module__player");
    const button = wrapper.querySelector(".video-module__play");
    if (!player || !button) return;

    const videoId =
      button.getAttribute("data-video-id") ||
      media.getAttribute("data-video-id") ||
      wrapper.getAttribute("data-video-id");

    if (!videoId) return;

    player.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    player.hidden = false;
    wrapper.classList.add("is-playing");
  });
}

function hydrateLpModulePreviews() {
  const markupMap = window.designLibraryLpModuleMarkup || {};

  contentRoot.querySelectorAll(".ft-lp-shadow-host").forEach((host) => {
    const moduleName = host.dataset.lpModule || "";
    const markup = markupMap[moduleName];
    if (!moduleName || !markup) return;

    const shadowRoot = host.shadowRoot || host.attachShadow({ mode: "open" });
    if (host.dataset.lpRendered === "true") return;

    shadowRoot.innerHTML = "";

    const baseStyle = document.createElement("style");
    baseStyle.textContent = `
      :host {
        display: block;
        width: 100%;
      }
    `;
    shadowRoot.appendChild(baseStyle);

    LP_REMOTE_STYLESHEETS.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      shadowRoot.appendChild(link);
    });

    if (window.designLibraryLpShadowCss) {
      const shadowCss = document.createElement("style");
      // LP preview CSS uses :root custom properties in document previews; inside Shadow DOM they need to live on :host.
      shadowCss.textContent = window.designLibraryLpShadowCss.replace(/:root\b/g, ":host");
      shadowRoot.appendChild(shadowCss);
    }

    const wrapper = document.createElement("div");
    wrapper.className = "ft-lp-shadow-scope";
    wrapper.innerHTML = `<main class="frame-root">${markup}</main>`;
    shadowRoot.appendChild(wrapper);

    initLpAccordion(wrapper);
    initLpCounterAnimated(wrapper);
    initLpVideo(wrapper);

    host.dataset.lpRendered = "true";
  });
}

topNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const nextSection = link.dataset.mainNav;
    navigateTo(nextSection, getDefaultItem(nextSection));
  });
});

homeTrigger.addEventListener("click", (event) => {
  event.preventDefault();
  navigateTo("home");
});

if (sidebarToggle) {
  sidebarToggle.addEventListener("click", () => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    syncSidebarToggleState();
  });
}

window.addEventListener("hashchange", syncRouteFromHash);

syncRouteFromHash();
