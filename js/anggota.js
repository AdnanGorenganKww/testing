/**
 * anggota.js
 * Hanya jalan di anggota.html.
 * Bergantung pada: anggotaData, kepengurusanInti (data/anggota.js)
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof anggotaData === "undefined") return;

  const state = {
    divisi: "semua"
  };

  const grid = document.getElementById("memberGrid");
  const emptyState = document.getElementById("memberEmptyState");
  const filterGroup = document.getElementById("divisionFilter");

  initFilterFromUrl(state, filterGroup);
  renderMemberGrid(state, grid, emptyState);

  filterGroup?.addEventListener("click", (event) => {
    const chip = event.target.closest(".filter-chip");
    if (!chip) return;
    setActiveChip(filterGroup, chip);
    state.divisi = chip.dataset.filter;
    renderMemberGrid(state, grid, emptyState);
  });
});

/* -------------------------------------------------- */
/* Baca ?divisi=... dari URL (datang dari profil.html) */
/* -------------------------------------------------- */
function initFilterFromUrl(state, filterGroup) {
  const params = new URLSearchParams(window.location.search);
  const divisiParam = params.get("divisi");
  if (!divisiParam || !filterGroup) return;

  const matchingChip = filterGroup.querySelector(
    `[data-filter="${divisiParam}"]`
  );
  if (!matchingChip) return;

  state.divisi = divisiParam;
  setActiveChip(filterGroup, matchingChip);

  // Bawa user langsung ke bagian filter, biar nggak bingung kenapa grid berubah
  filterGroup.scrollIntoView({ behavior: "smooth", block: "center" });
}

function setActiveChip(filterGroup, activeChip) {
  filterGroup.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.classList.remove("is-active");
    chip.setAttribute("aria-pressed", "false");
  });
  activeChip.classList.add("is-active");
  activeChip.setAttribute("aria-pressed", "true");
}

/* -------------------------------------------------- */
/* Render grid anggota berdasarkan filter divisi        */
/* -------------------------------------------------- */
function renderMemberGrid(state, grid, emptyState) {
  if (!grid) return;

  const filtered =
    state.divisi === "semua"
      ? anggotaData
      : anggotaData.filter((member) => member.divisi === state.divisi);

  grid.setAttribute("aria-busy", "false");
  grid.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  filtered.forEach((member, index) => {
    const li = document.createElement("li");
    li.className = "member-card";
    li.dataset.divisi = member.divisi;
    li.setAttribute("data-reveal", "");
    li.setAttribute("data-reveal-delay", String(index % 4));

    li.innerHTML = `
      <div class="member-card-photo">
        <img src="${member.foto}" alt="Foto ${member.nama}" loading="lazy">
      </div>
      <h3 class="member-card-name">${member.nama}</h3>
      <p class="member-card-role">${
        member.jabatan ? member.jabatan : formatDivisiLabel(member.divisi)
      }</p>
      ${
        member.quote
          ? `<p class="member-card-quote">&ldquo;${member.quote}&rdquo;</p>`
          : ""
      }
    `;

    grid.appendChild(li);
  });

  // Kartu baru ditambahkan setelah main.js pasang observer-nya duluan,
  // jadi reveal animation perlu di-attach ulang khusus untuk kartu ini.
  attachRevealToNewCards(grid);
}

/* -------------------------------------------------- */
/* Reveal animation untuk kartu yang di-render belakangan */
/* -------------------------------------------------- */
function attachRevealToNewCards(grid) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const cards = grid.querySelectorAll("[data-reveal]");

  if (prefersReducedMotion) {
    cards.forEach((card) => card.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.revealDelay || 0;
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, delay * 100);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  cards.forEach((card) => observer.observe(card));
}

/* -------------------------------------------------- */
/* Fallback label kalau jabatan kosong                 */
/* -------------------------------------------------- */
function formatDivisiLabel(divisiId) {
  const labels = {
    kreatif: "Kreatif",
    "desain-grafis": "Desain Grafis",
    editing: "Editing",
    fotografi: "Fotografi",
    videografi: "Videografi",
    artikel: "Artikel"
  };
  return labels[divisiId] || divisiId;
}