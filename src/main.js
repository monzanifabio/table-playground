import "./style.css";

const THEME_STORAGE_KEY = "table-playground-theme";
const root = document.documentElement;
const themeToggleButton = document.getElementById("theme-toggle");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);

  if (!themeToggleButton) {
    return;
  }

  const nextTheme = theme === "dark" ? "light" : "dark";
  const nextLabel = nextTheme === "dark" ? "Dark Mode" : "Light Mode";
  themeToggleButton.textContent = nextLabel;
  themeToggleButton.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
}

function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme === "dark" ? "dark" : "light";
}

let currentTheme = getInitialTheme();
applyTheme(currentTheme);

if (themeToggleButton) {
  themeToggleButton.addEventListener("click", () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
    applyTheme(currentTheme);
  });
}

document.querySelectorAll("[data-selectable-table]").forEach((table) => {
  const selectAllCheckbox = table.querySelector("[data-select-all]");
  const rowCheckboxes = [...table.querySelectorAll("tbody input[type='checkbox']")];

  function syncSelectAllCheckbox() {
    const selectedCount = rowCheckboxes.filter((checkbox) => checkbox.checked).length;
    selectAllCheckbox.checked = rowCheckboxes.length > 0 && selectedCount === rowCheckboxes.length;
    selectAllCheckbox.indeterminate = selectedCount > 0 && selectedCount < rowCheckboxes.length;
  }

  table.addEventListener("change", (event) => {
    if (!(event.target instanceof HTMLInputElement) || event.target.type !== "checkbox") {
      return;
    }

    if (event.target === selectAllCheckbox) {
      rowCheckboxes.forEach((checkbox) => {
        checkbox.checked = selectAllCheckbox.checked;
        checkbox.closest("tr")?.classList.toggle("tako-table__row--selected", checkbox.checked);
      });
      syncSelectAllCheckbox();
      return;
    }

    event.target.closest("tr")?.classList.toggle("tako-table__row--selected", event.target.checked);
    syncSelectAllCheckbox();
  });
});
