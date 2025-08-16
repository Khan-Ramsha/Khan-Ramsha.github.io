/**
 * Theme Toggle Script - Dark/Light Mode
 * Simple, efficient theme switching with localStorage persistence
 */

class ThemeToggler {
  constructor() {
    this.themes = {
      LIGHT: "light",
      DARK: "dark",
    };

    this.init();
  }

  // Initialize theme system
  init() {
    this.bindEvents();
    this.setInitialTheme();
  }

  // Bind event listeners
  bindEvents() {
    const toggleButton = document.getElementById("theme-toggle");
    if (toggleButton) {
      toggleButton.addEventListener("click", () => this.toggleTheme());
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          this.setTheme(e.matches ? this.themes.DARK : this.themes.LIGHT);
        }
      });
    }
  }

  // Get current theme from localStorage or system preference
  getCurrentTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && (savedTheme === this.themes.LIGHT || savedTheme === this.themes.DARK)) {
      return savedTheme;
    }

    // Default to system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return this.themes.DARK;
    }

    return this.themes.LIGHT;
  }

  // Toggle between light and dark themes
  toggleTheme() {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === this.themes.DARK ? this.themes.LIGHT : this.themes.DARK;
    this.setTheme(newTheme);
  }

  // Set theme and apply all changes
  setTheme(theme) {
    if (!theme || (theme !== this.themes.LIGHT && theme !== this.themes.DARK)) {
      return;
    }

    // Add transition class for smooth theme change
    this.addTransition();

    // Set theme on document
    document.documentElement.setAttribute("data-theme", theme);

    // Update tables
    this.updateTables(theme);

    // Update syntax highlighting
    this.updateSyntaxHighlighting(theme);

    // Update Giscus comments if present
    this.updateGiscus(theme);

    // Update Jupyter notebooks if present
    this.updateJupyterNotebooks(theme);

    // Update medium-zoom if present
    this.updateMediumZoom();

    // Update toggle button appearance
    this.updateToggleButton(theme);

    // Save theme preference
    localStorage.setItem("theme", theme);

    // Remove transition class after animation
    setTimeout(() => this.removeTransition(), 300);
  }

  // Set initial theme on page load
  setInitialTheme() {
    const theme = this.getCurrentTheme();
    this.setTheme(theme);
  }

  // Update table classes for theme
  updateTables(theme) {
    const tables = document.getElementsByTagName("table");
    for (let table of tables) {
      if (theme === this.themes.DARK) {
        table.classList.add("table-dark");
      } else {
        table.classList.remove("table-dark");
      }
    }
  }

  // Update syntax highlighting theme
  updateSyntaxHighlighting(theme) {
    const lightTheme = document.getElementById("highlight_theme_light");
    const darkTheme = document.getElementById("highlight_theme_dark");

    if (lightTheme && darkTheme) {
      if (theme === this.themes.DARK) {
        lightTheme.media = "none";
        darkTheme.media = "";
      } else {
        darkTheme.media = "none";
        lightTheme.media = "";
      }
    }
  }

  // Update Giscus comments theme
  updateGiscus(theme) {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (iframe) {
      iframe.contentWindow.postMessage(
        {
          giscus: {
            setConfig: {
              theme: theme,
            },
          },
        },
        "https://giscus.app"
      );
    }
  }

  // Update Jupyter notebooks theme
  updateJupyterNotebooks(theme) {
    const notebooks = document.getElementsByClassName("jupyter-notebook-iframe-container");
    for (let notebook of notebooks) {
      try {
        const iframe = notebook.getElementsByTagName("iframe")[0];
        const body = iframe.contentWindow.document.body;

        if (theme === this.themes.DARK) {
          body.setAttribute("data-jp-theme-light", "false");
          body.setAttribute("data-jp-theme-name", "JupyterLab Dark");
        } else {
          body.setAttribute("data-jp-theme-light", "true");
          body.setAttribute("data-jp-theme-name", "JupyterLab Light");
        }
      } catch (e) {
        // Handle cross-origin iframe access errors silently
      }
    }
  }

  // Update medium-zoom overlay background
  updateMediumZoom() {
    if (typeof medium_zoom !== "undefined") {
      const bgColor = getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color");

      medium_zoom.update({
        background: bgColor + "ee", // Add transparency
      });
    }
  }

  // Update toggle button visual state
  updateToggleButton(theme) {
    const toggleButton = document.getElementById("theme-toggle");
    if (toggleButton) {
      const moonIcon = toggleButton.querySelector(".fa-moon");
      const sunIcon = toggleButton.querySelector(".fa-sun");

      if (moonIcon && sunIcon) {
        if (theme === this.themes.DARK) {
          moonIcon.style.display = "none";
          sunIcon.style.display = "inline";
        } else {
          moonIcon.style.display = "inline";
          sunIcon.style.display = "none";
        }
      }

      // Update button title
      toggleButton.title = `Switch to ${theme === this.themes.DARK ? "light" : "dark"} mode`;
      toggleButton.setAttribute("aria-label", `Switch to ${theme === this.themes.DARK ? "light" : "dark"} mode`);
    }
  }

  // Add transition for smooth theme change
  addTransition() {
    document.documentElement.classList.add("theme-transition");
  }

  // Remove transition class
  removeTransition() {
    document.documentElement.classList.remove("theme-transition");
  }
}

// Initialize theme toggler when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new ThemeToggler();
  });
} else {
  new ThemeToggler();
}
