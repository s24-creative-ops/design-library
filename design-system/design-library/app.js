const data = mergeLibraryData(window.designLibraryData, window.designLibraryAgentDashboardData);

const state = {
  section: "home",
  item: null,
  agentActiveStatuses: [],
  agentActiveTags: [],
  agentActiveTargetUsers: [],
  agentOpenFilterPanel: null,
};

const AGENT_TARGET_USER_FILTERS = [
  "Creative Studio",
  "Brand",
  "Seeker",
  "Homeowner",
  "Professional",
  "Media",
  "Loft",
  "Content",
  "Social Media",
  "Event",
];

const AGENT_STATUS_ORDER = ["idea", "prototype", "testing", "live", "paused", "archived"];

const topNavLinks = Array.from(document.querySelectorAll("[data-main-nav]"));
const homeTrigger = document.querySelector("[data-home-trigger]");
const sidebarEyebrow = document.getElementById("ft-sidebar-eyebrow");
const sidebarNav = document.getElementById("ft-sidebar-nav");
const contentRoot = document.getElementById("ft-content");
const layoutRoot = document.getElementById("ft-layout");

const LP_BLEED_MODULES = new Set(["hero-bleed-flex", "hero-bleed-flex-centered", "action-tiles_rle"]);
const LP_REMOTE_STYLESHEETS = ["https://www.static-immobilienscout24.de/fro/core/8.5.0/css/core.min.css"];
const EMAIL_HERO_SIDEBAR_ITEMS = new Set(["heros-left", "heros-center", "heros-fakeforms"]);
const DEFAULT_ROUTE = { section: "home", item: null };
let agentFilterCloseTimeoutId = null;
const animatedAgentCircleIds = new Set();

function mergeLibraryData(baseData, agentData) {
  const safeBaseData = baseData || {};
  const quickLinks = Array.isArray(safeBaseData.homePage?.quickLinks) ? [...safeBaseData.homePage.quickLinks] : [];
  const sections = { ...(safeBaseData.sections || {}) };

  if (agentData?.homeQuickLink) {
    quickLinks.push({ ...agentData.homeQuickLink });
  }

  if (agentData?.section?.id) {
    sections[agentData.section.id] = {
      label: agentData.section.label || agentData.section.id,
      items: Array.isArray(agentData.section.items) ? agentData.section.items.map((item) => ({ ...item })) : [],
    };
  }

  return {
    ...safeBaseData,
    homePage: {
      ...(safeBaseData.homePage || {}),
      quickLinks,
    },
    sections,
    agentDashboard: {
      statusMeta: { ...(agentData?.statusMeta || {}) },
      agents: Array.isArray(agentData?.agents) ? agentData.agents.map((agent) => ({ ...agent })) : [],
    },
  };
}

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

function getAgentDashboardConfig() {
  return data.agentDashboard || { statusMeta: {}, agents: [] };
}

function getAgentStatusMeta(statusKey) {
  const fallbackLabel = statusKey ? statusKey.charAt(0).toUpperCase() + statusKey.slice(1) : "Unknown";
  return getAgentDashboardConfig().statusMeta[statusKey] || { label: fallbackLabel, rangeLabel: null, progress: null };
}

function normalizeTargetUserLabel(value) {
  const normalized = String(value || "").trim().toLowerCase();

  const mapping = {
    ho: "Homeowner",
    homeowner: "Homeowner",
    b2b: "Professional",
    professional: "Professional",
    seeker: "Seeker",
    loft: "Loft",
    "creative support": "Creative Studio",
    "creative studio": "Creative Studio",
  };

  return mapping[normalized] || String(value || "").trim();
}

function getAgentTargetUserFilterOptions() {
  const availableTargetUsers = new Set();

  getAgentsForTargetUserFilterOptions().forEach((agent) => {
    getNormalizedAgentTargetUsers(agent).forEach((targetUser) => {
      availableTargetUsers.add(targetUser);
    });
  });

  state.agentActiveTargetUsers.forEach((targetUser) => {
    availableTargetUsers.add(targetUser);
  });

  return AGENT_TARGET_USER_FILTERS.filter((targetUser) => availableTargetUsers.has(targetUser));
}

function getNormalizedAgentTargetUsers(agent) {
  return normalizeAgentList(agent.targetUsers).map((value) => normalizeTargetUserLabel(value));
}

function normalizeAgentList(values) {
  return Array.isArray(values)
    ? values.map((value) => String(value || "").trim()).filter(Boolean)
    : [];
}

function hasActiveAgentFilters() {
  return Boolean(
    state.agentActiveStatuses.length ||
      state.agentActiveTags.length ||
      state.agentActiveTargetUsers.length,
  );
}

function matchesAgentFilters(agent, filters = {}) {
  const activeStatuses = Object.prototype.hasOwnProperty.call(filters, "statuses")
    ? filters.statuses
    : state.agentActiveStatuses;
  const activeTags = Object.prototype.hasOwnProperty.call(filters, "tags") ? filters.tags : state.agentActiveTags;
  const activeTargetUsers = Object.prototype.hasOwnProperty.call(filters, "targetUsers")
    ? filters.targetUsers
    : state.agentActiveTargetUsers;
  const matchesStatus = !activeStatuses.length || activeStatuses.includes(agent.status);
  const matchesTag = !activeTags.length || normalizeAgentList(agent.tags).some((tag) => activeTags.includes(tag));
  const matchesTargetUser =
    !activeTargetUsers.length || getNormalizedAgentTargetUsers(agent).some((targetUser) => activeTargetUsers.includes(targetUser));

  return matchesStatus && matchesTag && matchesTargetUser;
}

function getAgentsForTagFilterOptions() {
  const { agents } = getAgentDashboardConfig();

  return agents.filter((agent) =>
    matchesAgentFilters(agent, {
      statuses: state.agentActiveStatuses,
      tags: [],
      targetUsers: state.agentActiveTargetUsers,
    }),
  );
}

function getAgentsForTargetUserFilterOptions() {
  const { agents } = getAgentDashboardConfig();

  return agents.filter((agent) =>
    matchesAgentFilters(agent, {
      statuses: state.agentActiveStatuses,
      tags: state.agentActiveTags,
      targetUsers: [],
    }),
  );
}

function getAgentsForStatusFilterOptions() {
  const { agents } = getAgentDashboardConfig();

  return agents.filter((agent) =>
    matchesAgentFilters(agent, {
      statuses: [],
      tags: state.agentActiveTags,
      targetUsers: state.agentActiveTargetUsers,
    }),
  );
}

function getAgentTagFilterOptions() {
  const uniqueTags = new Set();

  getAgentsForTagFilterOptions().forEach((agent) => {
    normalizeAgentList(agent.tags).forEach((tag) => {
      uniqueTags.add(tag);
    });
  });

  state.agentActiveTags.forEach((tag) => {
    uniqueTags.add(tag);
  });

  return Array.from(uniqueTags).sort((left, right) => left.localeCompare(right));
}

function getAgentStatusFilterOptions() {
  const availableStatuses = new Set();

  getAgentsForStatusFilterOptions().forEach((agent) => {
    if (agent.status) {
      availableStatuses.add(agent.status);
    }
  });

  state.agentActiveStatuses.forEach((statusKey) => {
    availableStatuses.add(statusKey);
  });

  return AGENT_STATUS_ORDER.filter((statusKey) => availableStatuses.has(statusKey)).map((statusKey) => ({
    value: statusKey,
    label: getAgentStatusMeta(statusKey).label,
  }));
}

function getFilteredAgents() {
  const { agents } = getAgentDashboardConfig();
  return agents.filter((agent) => matchesAgentFilters(agent));
}

function renderAgentChipList(values) {
  const items = normalizeAgentList(values);

  if (!items.length) {
    return `<span class="ft-agent-card__meta-inline-item">No tags yet</span>`;
  }

  return `
    <div class="ft-agent-chip-list">
      ${items.map((value) => `<span class="ft-agent-chip">${escapeHtml(value)}</span>`).join("")}
    </div>
  `;
}

function renderAgentFilterPanel(panelKey, options, selectedValues) {
  const isOpen = state.agentOpenFilterPanel === panelKey;
  const panelLabel = panelKey === "status" ? "Status" : panelKey === "targetUsers" ? "Target Users" : "Tags";

  return `
    <div
      class="ft-agent-filterbar__group${isOpen ? " is-open" : ""}"
      data-agent-filter-group="${escapeAttribute(panelKey)}"
    >
      <button
        class="ft-agent-filterbar__trigger${selectedValues.length ? " is-active" : ""}${isOpen ? " is-open" : ""}"
        type="button"
        data-agent-filter-trigger="${escapeAttribute(panelKey)}"
        aria-expanded="${isOpen ? "true" : "false"}"
        aria-haspopup="dialog"
      >
        <span>${escapeHtml(panelLabel)}</span>
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2.25 4.5 6 8.25 9.75 4.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
        </svg>
      </button>
      ${
        isOpen
          ? `
            <div class="ft-agent-filterbar__panel" role="dialog" aria-label="${escapeHtml(panelLabel)} filter">
              <div class="ft-agent-filterbar__options">
                ${
                  options.length
                    ? options
                        .map(
                          (option) => `
                            <label class="ft-agent-filterbar__option">
                              <input
                                class="ft-agent-filterbar__checkbox"
                                type="checkbox"
                                data-agent-filter-option="${escapeAttribute(panelKey)}"
                                value="${escapeAttribute(option.value)}"
                                ${selectedValues.includes(option.value) ? "checked" : ""}
                              />
                              <span>${escapeHtml(option.label)}</span>
                            </label>
                          `,
                        )
                        .join("")
                    : `<p class="ft-agent-filterbar__empty">Keine passenden Optionen</p>`
                }
              </div>
            </div>
          `
          : ""
      }
    </div>
  `;
}

function renderAgentFilterBar() {
  const statusOptions = getAgentStatusFilterOptions();
  const targetUserOptions = getAgentTargetUserFilterOptions().map((value) => ({ value, label: value }));
  const tagOptions = getAgentTagFilterOptions().map((value) => ({ value, label: value }));

  return `
    <div class="ft-agent-filterbar" data-agent-filterbar>
      ${renderAgentFilterPanel("status", statusOptions, state.agentActiveStatuses)}
      ${renderAgentFilterPanel("targetUsers", targetUserOptions, state.agentActiveTargetUsers)}
      ${renderAgentFilterPanel("tags", tagOptions, state.agentActiveTags)}
      ${
        hasActiveAgentFilters()
          ? `
            <button class="ft-agent-filterbar__clear" type="button" data-agent-filter-clear>
              <span aria-hidden="true">X</span>
              <span>Alle Filter löschen</span>
            </button>
          `
          : ""
      }
    </div>
  `;
}

function getAgentCircleProgress(statusKey) {
  const progressMap = {
    idea: 15,
    prototype: 63,
    testing: 80,
    live: 100,
  };

  return progressMap[statusKey] ?? null;
}

function getAgentLastKnownProgress(agent) {
  const value = Number(agent?.lastKnownProgress);
  return Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : null;
}

function getAgentCircleAnimationId(agent) {
  const baseValue = String(agent?.id || agent?.title || "").trim().toLowerCase();
  return baseValue.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "";
}

function formatAgentOwnerName(owner) {
  const normalized = String(owner || "").trim();
  const ownerMap = {
    Dominik: "Dominik Böhme",
    Peter: "Peter Sijtsma",
  };

  return ownerMap[normalized] || normalized || "Keine Angabe";
}

function renderAgentCardAction(agent, statusMeta) {
  if (agent.status === "live") {
    if (agent.links?.agent) {
      return `
        <div class="ft-agent-card__action ft-agent-card__action--live">
          <a class="button-filled-brand ft-agent-card__cta" href="${escapeHtml(agent.links.agent)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(agent.title || "Agent")} im Browser öffnen" title="${escapeHtml(agent.title || "Agent")} im Browser öffnen">
            Open Agent in Browser
          </a>
        </div>
      `;
    }

    return `
      <div class="ft-agent-card__action ft-agent-card__action--live-disabled">
        <span class="button-filled-brand ft-agent-card__cta ft-agent-card__cta--disabled" aria-disabled="true">
          Open Agent in Browser
        </span>
      </div>
    `;
  }

  const progressValue = getAgentCircleProgress(agent.status);

  if (progressValue === null) {
    const lastKnownProgress = getAgentLastKnownProgress(agent);
    return `
      <div class="ft-agent-card__action ft-agent-card__action--neutral">
        <div class="ft-agent-circle ft-agent-circle--neutral">
          <svg class="ft-agent-circle__svg" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
            <circle class="ft-agent-circle__track" cx="60" cy="60" r="54" pathLength="100"></circle>
            <circle class="ft-agent-circle__progress" cx="60" cy="60" r="54" pathLength="100" data-agent-circle-path></circle>
          </svg>
          <div class="ft-agent-circle__inner">
            <span class="ft-agent-circle__value">${escapeHtml(String(lastKnownProgress ?? 0))}%</span>
            <span class="ft-agent-circle__status">${escapeHtml(statusMeta.label)}</span>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="ft-agent-card__action">
      <div
        class="ft-agent-circle ft-agent-circle--${escapeHtml(agent.status || "unknown")}"
        data-agent-circle-progress="${escapeAttribute(String(progressValue))}"
        data-agent-circle-id="${escapeAttribute(getAgentCircleAnimationId(agent))}"
        style="--agent-progress-target:${escapeHtml(String(progressValue))};"
      >
        <svg class="ft-agent-circle__svg" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
          <circle class="ft-agent-circle__track" cx="60" cy="60" r="54" pathLength="100"></circle>
          <circle class="ft-agent-circle__progress" cx="60" cy="60" r="54" pathLength="100" data-agent-circle-path></circle>
        </svg>
        <div class="ft-agent-circle__inner">
          <span class="ft-agent-circle__value">${escapeHtml(String(progressValue))}%</span>
          <span class="ft-agent-circle__status">${escapeHtml(statusMeta.label)}</span>
        </div>
      </div>
    </div>
  `;
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function renderAgentCard(agent) {
  const statusMeta = getAgentStatusMeta(agent.status);
  const asideClass = agent.status === "live" ? " ft-agent-card__aside--live" : "";

  return `
    <article class="ft-agent-card">
      <div class="ft-agent-card__content">
        <div class="ft-agent-card__top">
          <div class="ft-agent-card__header">
            <h3 class="ft-agent-card__title">${escapeHtml(agent.title || "Unbenannter Agent")}</h3>
          </div>
          <div class="ft-agent-card__headline">
            <p class="ft-agent-card__description">${escapeHtml(agent.shortDescription || "Keine Beschreibung hinterlegt.")}</p>
          </div>
        </div>

        <div class="ft-agent-card__tags">
          ${renderAgentChipList(agent.tags)}
        </div>

        <div class="ft-agent-card__meta-inline">
          <span class="ft-agent-card__meta-inline-item">${escapeHtml(formatAgentOwnerName(agent.owner))}</span>
          ${
            agent.links?.onboarding
              ? `
                <a class="ft-agent-card__meta-inline-link" href="${escapeHtml(agent.links.onboarding)}" target="_blank" rel="noopener noreferrer">
                  Open Onboarding
                </a>
              `
              : ""
          }
        </div>
      </div>

      <div class="ft-agent-card__aside${asideClass}">
        ${renderAgentCardAction(agent, statusMeta)}
      </div>
    </article>
  `;
}

function renderAgentResultsMarkup() {
  const filteredAgents = getFilteredAgents();

  if (!filteredAgents.length) {
    return `
      <div class="ft-agent-empty">
        <h3 class="ft-agent-empty__title">Keine Agents gefunden</h3>
        <p class="ft-agent-empty__text">Passe die aktiven Filter an, um wieder Ergebnisse zu sehen.</p>
      </div>
    `;
  }

  return `
    <div class="ft-agent-grid">
      ${filteredAgents.map((agent) => renderAgentCard(agent)).join("")}
    </div>
  `;
}

function renderAgentsSection(item) {
  return `
    <div class="ft-agent-dashboard">
      <header class="ft-agent-dashboard__header">
        <div class="ft-agent-dashboard__header-copy">
          <h2 class="ft-agent-dashboard__title">${escapeHtml(item.title || item.label)}</h2>
          ${item.intro ? `<p class="ft-agent-dashboard__intro">${escapeHtml(item.intro)}</p>` : ""}
        </div>
      </header>

      ${renderAgentFilterBar()}

      <div class="ft-agent-results" data-agent-results>
        ${renderAgentResultsMarkup()}
      </div>
    </div>
  `;
}

function updateAgentDashboardResults() {
  if (state.section !== "agents") return;
  renderSection();
}

function toggleAgentFilterValue(groupKey, value) {
  if (!value) return;

  const groupMap = {
    status: "agentActiveStatuses",
    tags: "agentActiveTags",
    targetUsers: "agentActiveTargetUsers",
  };
  const stateKey = groupMap[groupKey];
  if (!stateKey) return;

  const currentValues = state[stateKey];
  state[stateKey] = currentValues.includes(value)
    ? currentValues.filter((entry) => entry !== value)
    : [...currentValues, value];
}

function toggleAgentFilterPanel(panelKey) {
  state.agentOpenFilterPanel = state.agentOpenFilterPanel === panelKey ? null : panelKey;
}

function clearAgentFilters() {
  state.agentActiveStatuses = [];
  state.agentActiveTags = [];
  state.agentActiveTargetUsers = [];
  state.agentOpenFilterPanel = null;
}

function clearAgentFilterCloseTimer() {
  if (agentFilterCloseTimeoutId === null) return;
  window.clearTimeout(agentFilterCloseTimeoutId);
  agentFilterCloseTimeoutId = null;
}

function scheduleAgentFilterClose(panelKey) {
  clearAgentFilterCloseTimer();
  agentFilterCloseTimeoutId = window.setTimeout(() => {
    if (state.agentOpenFilterPanel !== panelKey) return;
    state.agentOpenFilterPanel = null;
    updateAgentDashboardResults();
  }, 120);
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
  if (sectionKey === "agents") {
    return renderAgentsSection(item);
  }

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
  bindAgentDashboardControls();
  hydrateAgentProgressAnimations();
  hydrateEmailPreviewScopes();
  hydrateEmailServiceProducts();
  hydrateLpModulePreviews();
}

function render() {
  renderTopNav();

  if (state.section === "home") {
    layoutRoot.classList.add("ft-layout--home");
    layoutRoot.classList.remove("ft-layout--agents");
    renderHome();
    return;
  }

  layoutRoot.classList.remove("ft-layout--home");
  layoutRoot.classList.toggle("ft-layout--agents", state.section === "agents");
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

function bindAgentDashboardControls() {
  contentRoot.querySelectorAll("[data-agent-filter-group]").forEach((group) => {
    if (group.dataset.hoverBound === "true") return;
    group.dataset.hoverBound = "true";

    const panelKey = group.dataset.agentFilterGroup || "";
    if (!panelKey) return;

    group.addEventListener("mouseenter", () => {
      clearAgentFilterCloseTimer();
      if (state.agentOpenFilterPanel === panelKey) return;
      state.agentOpenFilterPanel = panelKey;
      updateAgentDashboardResults();
    });

    group.addEventListener("mouseleave", () => {
      scheduleAgentFilterClose(panelKey);
    });
  });

  contentRoot.querySelectorAll("[data-agent-filter-trigger]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";

    button.addEventListener("click", () => {
      clearAgentFilterCloseTimer();
      toggleAgentFilterPanel(button.dataset.agentFilterTrigger || "");
      updateAgentDashboardResults();
    });
  });

  contentRoot.querySelectorAll("[data-agent-filter-option]").forEach((input) => {
    if (input.dataset.bound === "true") return;
    input.dataset.bound = "true";

    input.addEventListener("change", () => {
      clearAgentFilterCloseTimer();
      toggleAgentFilterValue(input.dataset.agentFilterOption || "", input.value || "");
      state.agentOpenFilterPanel = input.dataset.agentFilterOption || null;
      updateAgentDashboardResults();
    });
  });

  contentRoot.querySelectorAll("[data-agent-filter-clear]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";

    button.addEventListener("click", () => {
      clearAgentFilterCloseTimer();
      clearAgentFilters();
      updateAgentDashboardResults();
    });
  });
}

function hydrateAgentProgressAnimations() {
  const circles = Array.from(contentRoot.querySelectorAll("[data-agent-circle-progress]"));

  if (!circles.length) return;

  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const activateCircle = (circle) => {
    const targetValue = Number(circle.dataset.agentCircleProgress || "0");
    const safeValue = Number.isFinite(targetValue) ? Math.max(0, Math.min(100, targetValue)) : 0;
    const path = circle.querySelector("[data-agent-circle-path]");
    const animationId = circle.dataset.agentCircleId || "";

    if (!path) return;

    if (animationId) {
      animatedAgentCircleIds.add(animationId);
    }

    circle.dataset.agentCircleAnimated = "true";
    path.style.transition = "stroke-dasharray 860ms cubic-bezier(0.22, 1, 0.36, 1)";
    path.style.strokeDasharray = `${safeValue} 100`;
  };

  const prepareCircle = (circle) => {
    const targetValue = Number(circle.dataset.agentCircleProgress || "0");
    const safeValue = Number.isFinite(targetValue) ? Math.max(0, Math.min(100, targetValue)) : 0;
    const path = circle.querySelector("[data-agent-circle-path]");
    const animationId = circle.dataset.agentCircleId || "";
    const hasAnimated = Boolean(animationId && animatedAgentCircleIds.has(animationId));

    if (!path) return false;

    path.style.transition = "none";

    if (prefersReducedMotion || hasAnimated) {
      circle.dataset.agentCircleAnimated = "true";
      path.style.strokeDasharray = `${safeValue} 100`;

      if (animationId) {
        animatedAgentCircleIds.add(animationId);
      }

      return false;
    }

    circle.dataset.agentCircleAnimated = "false";
    path.style.strokeDasharray = "0 100";
    return true;
  };

  const pendingCircles = circles.filter((circle) => prepareCircle(circle));

  if (!pendingCircles.length) return;

  if (!("IntersectionObserver" in window)) {
    pendingCircles.forEach((circle) => {
      window.requestAnimationFrame(() => {
        activateCircle(circle);
      });
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        activateCircle(entry.target);
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.45 },
  );

  pendingCircles.forEach((circle) => observer.observe(circle));
}

document.addEventListener("click", (event) => {
  if (state.section !== "agents" || !state.agentOpenFilterPanel) return;

  const target = event.target;
  if (!(target instanceof Element)) return;
  if (target.closest("[data-agent-filterbar]")) return;

  clearAgentFilterCloseTimer();
  state.agentOpenFilterPanel = null;
  updateAgentDashboardResults();
});

document.addEventListener("keydown", (event) => {
  if (state.section !== "agents" || !state.agentOpenFilterPanel) return;
  if (event.key !== "Escape") return;

  clearAgentFilterCloseTimer();
  state.agentOpenFilterPanel = null;
  updateAgentDashboardResults();
});

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

window.addEventListener("hashchange", syncRouteFromHash);

syncRouteFromHash();
