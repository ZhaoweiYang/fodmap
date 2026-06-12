/* GutWise — site interactions */
(function () {
  "use strict";

  /* ---------- Sticky header ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.getElementById("site-nav");

  navToggle.addEventListener("click", () => {
    const open = siteNav.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });

  siteNav.addEventListener("click", (e) => {
    if (e.target.matches("a")) {
      siteNav.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Pricing billing toggle ---------- */
  const billingButtons = document.querySelectorAll(".bt-opt");

  billingButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const period = btn.dataset.period; // "monthly" | "annual"
      billingButtons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      document.querySelectorAll("[data-monthly]").forEach((el) => {
        el.textContent = el.dataset[period];
      });
    });
  });

  /* ---------- FAQ: only one open at a time ---------- */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- Demo CTA toast ---------- */
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  }

  document.querySelectorAll("[data-demo]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      showToast("This is a demo site — connect your sign-up flow here. 🌿");
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ============================================================
     Food library demo
     Ratings follow commonly published low-FODMAP serving guidance;
     portion size changes everything. Educational demo only.
     ============================================================ */
  const FOODS = [
    { name: "Garlic", level: "high", note: "Very high in fructans — a top IBS trigger. Garlic-infused oil is a safe swap." },
    { name: "Onion", level: "high", note: "Fructans. Try the green tops of spring onions or chives instead." },
    { name: "Apple", level: "high", note: "Excess fructose + sorbitol. Swap for oranges or a firm banana." },
    { name: "Pear", level: "high", note: "Excess fructose and sorbitol at any typical serving." },
    { name: "Watermelon", level: "high", note: "Fructans, excess fructose and mannitol — triple trouble." },
    { name: "Honey", level: "high", note: "Excess fructose. Pure maple syrup is the classic low swap." },
    { name: "Milk (cow's)", level: "high", note: "Lactose. Lactose-free milk tastes the same and sits much easier." },
    { name: "Yogurt (regular)", level: "high", note: "Lactose — look for lactose-free yogurt instead." },
    { name: "Wheat bread", level: "high", note: "Fructans. Sourdough spelt or most gluten-free breads are low." },
    { name: "Cashews", level: "high", note: "High in GOS and fructans. Peanuts or macadamias are safer." },
    { name: "Cauliflower", level: "high", note: "Mannitol at any typical serving." },
    { name: "Button mushrooms", level: "high", note: "Mannitol. Oyster mushrooms are a low-FODMAP alternative." },
    { name: "Banana (very ripe)", level: "high", note: "Fructans build as bananas ripen — firmer is gentler." },
    { name: "Avocado", level: "moderate", note: "Sorbitol. 1–2 tablespoons is generally low; half a fruit is high." },
    { name: "Sweet potato", level: "moderate", note: "Mannitol climbs above about ½ cup cooked." },
    { name: "Chickpeas (canned)", level: "moderate", note: "Rinsed well, ¼ cup is generally tolerated (GOS)." },
    { name: "Lentils (canned)", level: "moderate", note: "Canned and rinsed is far gentler than dried-cooked (GOS)." },
    { name: "Almonds", level: "moderate", note: "About 10 nuts is fine; bigger handfuls climb into high (GOS)." },
    { name: "Zucchini", level: "moderate", note: "Low at ⅓ cup; fructans add up beyond that." },
    { name: "Banana (firm)", level: "low", note: "A firm, just-ripe banana is low; ripeness raises fructans." },
    { name: "Strawberries", level: "low", note: "Low at a typical 5-berry serving." },
    { name: "Blueberries", level: "low", note: "Keep to about ¼ cup per sitting." },
    { name: "Oranges", level: "low", note: "One whole orange is low FODMAP." },
    { name: "Kiwi", level: "low", note: "Two small green kiwis per serving." },
    { name: "Grapes", level: "low", note: "A small handful is low; very large servings rise." },
    { name: "Rice (white or brown)", level: "low", note: "Essentially FODMAP-free — a true safe staple." },
    { name: "Oats (rolled)", level: "low", note: "Low at ½ cup dry; larger bowls become moderate." },
    { name: "Quinoa", level: "low", note: "A gut-friendly whole grain at 1 cup cooked." },
    { name: "Sourdough spelt bread", level: "low", note: "Slow fermentation breaks down most of the fructans." },
    { name: "Potato", level: "low", note: "Low FODMAP at typical servings." },
    { name: "Carrots", level: "low", note: "FODMAP-free at any serving size." },
    { name: "Cucumber", level: "low", note: "Low at any typical serving." },
    { name: "Spinach (baby)", level: "low", note: "Low at 1½ cups fresh." },
    { name: "Tomato (common)", level: "low", note: "Low at a small serving; large amounts add fructose." },
    { name: "Eggs", level: "low", note: "Pure protein — no FODMAPs at all." },
    { name: "Chicken, beef & fish (plain)", level: "low", note: "Unprocessed meats are naturally FODMAP-free." },
    { name: "Firm tofu", level: "low", note: "Pressing drains away most GOS. Silken tofu is higher." },
    { name: "Hard cheese (cheddar, parmesan)", level: "low", note: "Aging removes nearly all the lactose." },
    { name: "Lactose-free milk", level: "low", note: "The lactose is pre-digested — same taste, calmer gut." },
    { name: "Maple syrup (pure)", level: "low", note: "The go-to low-FODMAP sweetener." },
    { name: "Peanuts", level: "low", note: "Technically a legume, but low FODMAP at a handful." },
  ];

  const POPULAR = [
    "Garlic",
    "Apple",
    "Banana (firm)",
    "Lactose-free milk",
    "Sourdough spelt bread",
    "Onion",
    "Maple syrup (pure)",
    "Avocado",
  ];

  const LEVEL_LABEL = { low: "Low", moderate: "Moderate", high: "High" };
  const LEVEL_CLASS = { low: "badge-low", moderate: "badge-mod", high: "badge-high" };
  const MAX_VISIBLE = 12;

  const foodInput = document.getElementById("food-input");
  const foodResults = document.getElementById("food-results");
  const foodCount = document.getElementById("food-count");
  const filterChips = document.querySelectorAll(".food-filters .chip");
  let activeFilter = "all";

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[ch]));
  }

  function foodRow(food) {
    return (
      '<li class="food-row">' +
      '<span class="food-info">' +
      '<span class="food-name">' + escapeHtml(food.name) + "</span>" +
      '<span class="food-note-text">' + escapeHtml(food.note) + "</span>" +
      "</span>" +
      '<span class="badge ' + LEVEL_CLASS[food.level] + '">' + LEVEL_LABEL[food.level] + "</span>" +
      "</li>"
    );
  }

  function renderFoods() {
    const query = foodInput.value.trim().toLowerCase();
    let list = FOODS.filter((food) => {
      const matchesQuery = !query || food.name.toLowerCase().includes(query);
      const matchesFilter = activeFilter === "all" || food.level === activeFilter;
      return matchesQuery && matchesFilter;
    });

    let countText;
    if (!query && activeFilter === "all") {
      list = POPULAR.map((name) => FOODS.find((f) => f.name === name)).filter(Boolean);
      countText = "Showing " + list.length + " popular foods — type to search all " + FOODS.length + " in this demo.";
    } else if (list.length === 0) {
      countText = "";
    } else if (list.length > MAX_VISIBLE) {
      countText = "Showing " + MAX_VISIBLE + " of " + list.length + " matches — keep typing to narrow it down.";
      list = list.slice(0, MAX_VISIBLE);
    } else {
      countText = list.length + (list.length === 1 ? " match" : " matches") + " in the demo library.";
    }

    foodResults.innerHTML = list.length
      ? list.map(foodRow).join("")
      : '<li class="food-empty">No matches in this small demo — the full GutWise library covers 3,000+ foods and brands.</li>';
    foodCount.textContent = countText;
  }

  foodInput.addEventListener("input", renderFoods);

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      activeFilter = chip.dataset.filter;
      filterChips.forEach((c) => c.classList.toggle("is-active", c === chip));
      renderFoods();
    });
  });

  renderFoods();
})();
