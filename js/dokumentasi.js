/**
 * dokumentasi.js
 * Hanya jalan di dokumentasi.html.
 * Bergantung pada: dokumentasiData (data/dokumentasi.js)
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof dokumentasiData === "undefined") return;

  const state = {
    query: "",
    category: "semua"
  };

  const grid = document.getElementById("docsGrid");
  const emptyState = document.getElementById("docsEmptyState");
  const searchInput = document.getElementById("docsSearchInput");
  const categoryFilter = document.getElementById("docsCategoryFilter");

  initFromUrl(state, searchInput, categoryFilter);
  renderGrid(state, grid, emptyState);

  searchInput?.addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    renderGrid(state, grid, emptyState);
  });

  categoryFilter?.addEventListener("click", (event) => {
    const chip = event.target.closest(".filter-chip");
    if (!chip) return;

    categoryFilter
      .querySelectorAll(".filter-chip")
      .forEach((c) => {
        c.classList.remove("is-active");
        c.setAttribute("aria-pressed", "false");
      });

    chip.classList.add("is-active");
    chip.setAttribute("aria-pressed", "true");
    state.category = chip.dataset.category;
    renderGrid(state, grid, emptyState);
  });

  grid?.addEventListener("click", (event) => {
    const trigger = event.target.closest(".doc-grid-trigger");
    if (!trigger) return;
    const card = trigger.closest("[data-id]");
    openDocDetail(card.dataset.id);
  });

  initDetailOverlay();

  // Buka langsung kalau URL punya hash, misalnya dokumentasi.html#upacara-bendera
  if (window.location.hash) {
    const idFromHash = window.location.hash.replace("#", "");
    if (dokumentasiData.some((d) => d.id === idFromHash)) {
      openDocDetail(idFromHash);
    }
  }
});

/* -------------------------------------------------- */
/* Ambil query & filter awal dari URL (?q=...)         */
/* -------------------------------------------------- */
function initFromUrl(state, searchInput, categoryFilter) {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");
  if (q) {
    state.query = q.trim().toLowerCase();
    if (searchInput) searchInput.value = q;
  }
}

/* -------------------------------------------------- */
/* Fuzzy search sederhana                              */
/* Cocok jika: substring langsung ADA, atau             */
/* karakter query muncul berurutan (walau ada typo/skip) */
/* -------------------------------------------------- */
function fuzzyMatch(query, target) {
  if (!query) return true;
  const q = query.toLowerCase();
  const t = target.toLowerCase();

  if (t.includes(q)) return true;

  let qIndex = 0;
  for (let i = 0; i < t.length && qIndex < q.length; i++) {
    if (t[i] === q[qIndex]) qIndex++;
  }
  return qIndex === q.length;
}

function matchesQuery(doc, query) {
  if (!query) return true;

  const haystacks = [
    doc.title,
    doc.description,
    doc.divisi,
    ...(doc.keywords || [])
  ];

  return haystacks.some((text) => fuzzyMatch(query, text));
}

/* -------------------------------------------------- */
/* Render grid berdasarkan state (query + category)    */
/* -------------------------------------------------- */
function renderGrid(state, grid, emptyState) {
  if (!grid) return;

  const filtered = dokumentasiData.filter((doc) => {
    const matchCategory =
      state.category === "semua" || doc.category === state.category;
    const matchSearch = matchesQuery(doc, state.query);
    return matchCategory && matchSearch;
  });

  grid.setAttribute("aria-busy", "false");
  grid.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  const formatter = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  filtered.forEach((doc) => {
    const li = document.createElement("li");
    li.className = "doc-grid-card";
    li.dataset.id = doc.id;
    li.dataset.category = doc.category;

    const formattedDate = formatter.format(new Date(doc.date));

    li.innerHTML = `
      <button type="button" class="doc-grid-trigger" aria-haspopup="dialog">
        <img src="${doc.thumbnail}" alt="Dokumentasi ${doc.title}" loading="lazy">
        <span class="doc-grid-caption">
          <strong>${doc.title}</strong>
          <small>${formattedDate}</small>
        </span>
      </button>
    `;

    grid.appendChild(li);
  });
}

/* -------------------------------------------------- */
/* Panel detail dokumentasi                            */
/* -------------------------------------------------- */
function initDetailOverlay() {
  const overlay = document.getElementById("docDetailOverlay");
  const closeBtn = document.getElementById("docDetailClose");
  if (!overlay || !closeBtn) return;

  closeBtn.addEventListener("click", closeDocDetail);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeDocDetail();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) closeDocDetail();
  });
}

function openDocDetail(id) {
  const doc = dokumentasiData.find((d) => d.id === id);
  if (!doc) return;

  const overlay = document.getElementById("docDetailOverlay");
  const image = document.getElementById("docDetailImage");
  const title = document.getElementById("docDetailTitle");
  const date = document.getElementById("docDetailDate");
  const description = document.getElementById("docDetailDescription");
  const driveLink = document.getElementById("docDetailDriveLink");

  const formatter = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  image.src = doc.thumbnail;
  image.alt = `Dokumentasi ${doc.title}`;
  title.textContent = doc.title;
  date.textContent = formatter.format(new Date(doc.date));
  description.textContent = doc.description;
  driveLink.href = doc.driveUrl;

  overlay.hidden = false;
  document.body.style.overflow = "hidden";
  history.replaceState(null, "", `#${doc.id}`);

  closeBtnFocus();
}

function closeDocDetail() {
  const overlay = document.getElementById("docDetailOverlay");
  if (!overlay) return;

  overlay.hidden = true;
  document.body.style.overflow = "";
  history.replaceState(null, "", window.location.pathname);
}

function closeBtnFocus() {
  document.getElementById("docDetailClose")?.focus();
}