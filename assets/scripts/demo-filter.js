// Demo gallery filters. Values of one group are OR-ed, groups are AND-ed:
// "Horizon" and "Terrain or Imagery". The selection is kept in the URL
// (?bricks=horizon&themes=terrain) so a filtered gallery can be shared.
const panel = document.getElementById("demo-filters");
const cards = [...document.querySelectorAll("#demo-list .demo-card")];
const count = document.getElementById("demo-count");
const empty = document.getElementById("demo-empty");
const reset = document.getElementById("demo-reset");

if (panel && cards.length) {
  const groups = [...panel.querySelectorAll("[data-filter-group]")];
  const params = new URLSearchParams(location.search);
  // French counts 0 as singular ("0 démo"), English does not.
  const plural = new Intl.PluralRules(document.documentElement.lang);

  // Restore the selection from the URL.
  for (const group of groups) {
    const wanted = (params.get(group.dataset.filterGroup) || "").split(",");
    for (const button of group.querySelectorAll("button")) {
      if (wanted.includes(button.dataset.value))
        button.setAttribute("aria-pressed", "true");
    }
  }

  const selection = () =>
    groups
      .map((group) => ({
        key: group.dataset.filterGroup,
        values: [...group.querySelectorAll('button[aria-pressed="true"]')].map(
          (b) => b.dataset.value,
        ),
      }))
      .filter((g) => g.values.length);

  const apply = () => {
    const active = selection();
    let shown = 0;
    for (const card of cards) {
      const match = active.every(({ key, values }) => {
        const own = (card.dataset[key] || "").split(" ");
        return values.some((v) => own.includes(v));
      });
      card.hidden = !match;
      if (match) shown++;
    }
    count.textContent =
      plural.select(shown) === "one"
        ? panel.dataset.countOne.replace("{n}", shown)
        : panel.dataset.countOther.replace("{n}", shown);
    empty.hidden = shown > 0;
    reset.hidden = active.length === 0;

    const url = new URL(location.href);
    for (const group of groups)
      url.searchParams.delete(group.dataset.filterGroup);
    for (const { key, values } of active)
      url.searchParams.set(key, values.join(","));
    history.replaceState(null, "", url);
  };

  panel.addEventListener("click", (e) => {
    const button = e.target.closest("[data-filter-group] button");
    if (!button) return;
    const pressed = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!pressed));
    apply();
  });

  reset.addEventListener("click", () => {
    for (const b of panel.querySelectorAll('button[aria-pressed="true"]'))
      b.setAttribute("aria-pressed", "false");
    apply();
  });

  panel.hidden = false;
  apply();
}
