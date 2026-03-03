(function () {
  const STORAGE_KEY = "theme";
  const LIGHT = "light";
  const DARK = "dark";

  function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === LIGHT || stored === DARK) return stored;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return DARK;
    return LIGHT;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateGitHubChart(theme);
  }

  function updateGitHubChart(theme) {
    var img = document.getElementById("github-chart");
    if (!img) return;
    var base = "https://github-readme-activity-graph.vercel.app/graph?username=gMabdullah&area=true&hide_border=true";
    img.src = base + (theme === DARK ? "&theme=react" : "&theme=github-light");
  }

  function init() {
    var theme = getPreferred();
    applyTheme(theme);

    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var next = document.documentElement.getAttribute("data-theme") === DARK ? LIGHT : DARK;
        applyTheme(next);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
