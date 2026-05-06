document.addEventListener("DOMContentLoaded", function () {
  /* =========================
     ELEMENTS
  ========================= */
  const header = document.querySelector("header");
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");

  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeDropdown = document.getElementById("themeDropdown");
  const themeOptions = document.querySelectorAll(".theme-option");

  const prayerVideosGrid = document.getElementById("prayerVideosGrid");
  const sermonVideosGrid = document.getElementById("sermonVideosGrid");
  const teachingVideosGrid = document.getElementById("teachingVideosGrid");

  const featuredVideoFrame = document.getElementById("featuredVideoFrame");
  const featuredVideoTitle = document.getElementById("featuredVideoTitle");
  const featuredVideoDescription = document.getElementById("featuredVideoDescription");
  const featuredVideoLink = document.getElementById("featuredVideoLink");

  const galleryImages = document.querySelectorAll(".gallery-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");

    const mobileThemeToggle = document.getElementById("mobileThemeToggle");
  const mobileThemeDropdown = document.getElementById("mobileThemeDropdown");
  const mobileThemeSwitcher = document.querySelector(".mobile-theme-switcher");

  if (mobileThemeToggle && mobileThemeDropdown && mobileThemeSwitcher) {
    mobileThemeToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      mobileThemeSwitcher.classList.toggle("open");

      const expanded = mobileThemeSwitcher.classList.contains("open");
      mobileThemeToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });

    mobileThemeDropdown.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    document.addEventListener("click", function () {
      mobileThemeSwitcher.classList.remove("open");
      mobileThemeToggle.setAttribute("aria-expanded", "false");
    });
  }

  /* =========================
   PRAYER REQUEST FORM
========================= */
const prayerRequestForm = document.getElementById("prayerRequestForm");
const prayerFormMessage = document.getElementById("prayerFormMessage");

if (prayerRequestForm) {
  const supabaseUrl = "https://munuuangqldudtofwujl.supabase.co";
  const supabaseKey = "sb_publishable_-TMMWPwAY-UfqIEyLUWEyw_h82Kj9_W";

  const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

  prayerRequestForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullName = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const prayerRequest = document.getElementById("request").value.trim();

    if (prayerFormMessage) {
      prayerFormMessage.textContent = "Submitting prayer request...";
    }

    const { error } = await supabaseClient
      .from("prayer_requests")
      .insert([
        {
          full_name: fullName,
          phone: phone,
          email: email,
          prayer_request: prayerRequest
        }
      ]);

    if (error) {
      console.error("Prayer request error:", error);

      if (prayerFormMessage) {
        prayerFormMessage.textContent = "Something went wrong. Please try again.";
        prayerFormMessage.style.color = "red";
      }

      return;
    }

    if (prayerFormMessage) {
      prayerFormMessage.textContent = "Your prayer request was submitted successfully.";
      prayerFormMessage.style.color = "green";
    }

    prayerRequestForm.reset();
  });
}

/* =========================
   CONTACT FORM
========================= */
const contactForm = document.getElementById("contactForm");
const contactFormMessage = document.getElementById("contactFormMessage");

if (contactForm) {
  const supabaseUrl = "https://munuuangqldudtofwujl.supabase.co";
  const supabaseKey = "sb_publishable_-TMMWPwAY-UfqIEyLUWEyw_h82Kj9_W";

  const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullName = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const phone = document.getElementById("contact-phone").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (contactFormMessage) {
      contactFormMessage.textContent = "Sending message...";
      contactFormMessage.style.color = "";
    }

    const { error } = await supabaseClient
      .from("contact_messages")
      .insert([
        {
          full_name: fullName,
          email: email,
          phone: phone,
          subject: subject,
          message: message
        }
      ]);

    if (error) {
      console.log("Contact error full object:", error);
      console.log("Contact error message:", error?.message);
      console.log("Contact error details:", error?.details);
      console.log("Contact error hint:", error?.hint);
      console.error("Contact form error:", error);

      if (contactFormMessage) {
        contactFormMessage.textContent = "Something went wrong. Please try again.";
        contactFormMessage.style.color = "red";
      }

      return;
    }

    if (contactFormMessage) {
      contactFormMessage.textContent = "Your message was sent successfully.";
      contactFormMessage.style.color = "green";
    }

    contactForm.reset();
  });
}

  /* =========================
     HAMBURGER MENU
  ========================= */
  function closeMenu() {
    if (!menuToggle || !siteNav) return;

    siteNav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  function toggleMenu(event) {
    if (!menuToggle || !siteNav) return;

    event.stopPropagation();

    const isOpen = siteNav.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  function setupMenu() {
    if (!menuToggle || !siteNav) return;

    menuToggle.addEventListener("click", toggleMenu);

    siteNav.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    document.addEventListener("click", closeMenu);
  }

  /* =========================
     HEADER SCROLL EFFECT
  ========================= */
  function handleHeaderScroll() {
  if (!header) return;

  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

  function setupHeaderScroll() {
    handleHeaderScroll();
    window.addEventListener("scroll", handleHeaderScroll);
    window.addEventListener("resize", handleHeaderScroll);
  }

  /* =========================
     THEME SWITCHER
  ========================= */
  function applyTheme(theme) {
    document.body.classList.remove("theme-light", "theme-dark");

    if (theme === "dark") {
      document.body.classList.add("theme-dark");
    } else if (theme === "light") {
      document.body.classList.add("theme-light");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.body.classList.add(prefersDark ? "theme-dark" : "theme-light");
    }

    localStorage.setItem("site-theme", theme);

    themeOptions.forEach(function (option) {
      option.classList.toggle("active", option.dataset.theme === theme);
    });
  }

  function loadSavedTheme() {
    const savedTheme = localStorage.getItem("site-theme") || "auto";
    applyTheme(savedTheme);
  }

  function setupThemeSwitcher() {
    if (!themeToggleBtn || !themeDropdown || themeOptions.length === 0) return;

    themeToggleBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      themeDropdown.classList.toggle("show");

      const expanded = themeDropdown.classList.contains("show");
      themeToggleBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
    });

    themeOptions.forEach(function (option) {
      option.addEventListener("click", function () {
        applyTheme(option.dataset.theme);
        themeDropdown.classList.remove("show");
        themeToggleBtn.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", function () {
      themeDropdown.classList.remove("show");
      themeToggleBtn.setAttribute("aria-expanded", "false");
    });

    themeDropdown.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    loadSavedTheme();

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
      const savedTheme = localStorage.getItem("site-theme") || "auto";
      if (savedTheme === "auto") {
        applyTheme("auto");
      }
    });
  }

  /* =========================
     VIDEO DATA
  ========================= */
  const videos = [
    {
      youtubeId: "sVBfzNYbc54",
      category: "Prayer",
      title: "Invoking Generational Blessings",
      description: "Part 1.",
      thumbnail: "https://img.youtube.com/vi/sVBfzNYbc54/hqdefault.jpg"
    },
    {
      youtubeId: "38V5J0nlgf8",
      category: "Prayer",
      title: "Invoking Generational Blessings",
      description: "Part 2.",
      thumbnail: "https://img.youtube.com/vi/38V5J0nlgf8/hqdefault.jpg"
    },
    {
      youtubeId: "fzem0Mw5TmM",
      category: "Prayer",
      title: "Invoking Generational Blessings",
      description: "Part 3.",
      thumbnail: "https://img.youtube.com/vi/fzem0Mw5TmM/hqdefault.jpg"
    },
    {
      youtubeId: "lPp-VPzY1Is",
      category: "Prayer",
      title: "Breaking Curses",
      description: "Part 2.",
      thumbnail: "https://img.youtube.com/vi/lPp-VPzY1Is/hqdefault.jpg"
    },
    {
      youtubeId: "DVBqlzpx6Ww",
      category: "Prayer",
      title: "Breaking Curses",
      description: "Part 1.",
      thumbnail: "https://img.youtube.com/vi/DVBqlzpx6Ww/hqdefault.jpg"
    },
    {
      youtubeId: "84KZ9XlDFqw",
      category: "Prayer",
      title: "Breaking Curses",
      description: "Part 3.",
      thumbnail: "https://img.youtube.com/vi/84KZ9XlDFqw/hqdefault.jpg"
    },
    {
      youtubeId: "xQCk-gEo02s",
      category: "Prayer",
      title: "31 Day Prayer Marathon",
      description: "Day 1.",
      thumbnail: "https://img.youtube.com/vi/xQCk-gEo02s/hqdefault.jpg"
    },
    {
      youtubeId: "42Rl0uTWB6A",
      category: "Prayer",
      title: "31 Day Prayer Marathon",
      description: "Day 2.",
      thumbnail: "https://img.youtube.com/vi/42Rl0uTWB6A/hqdefault.jpg"
    },
    {
      youtubeId: "7mXysiwfkvM",
      category: "Sermon",
      title: "Why are you still sick?",
      description: "Important Message.",
      thumbnail: "https://img.youtube.com/vi/7mXysiwfkvM/hqdefault.jpg"
    },
    {
      youtubeId: "8PgibOY38Gs",
      category: "Sermon",
      title: "What God cannot do, let it remain undone.",
      description: "Important Message.",
      thumbnail: "https://img.youtube.com/vi/8PgibOY38Gs/hqdefault.jpg"
    },
    {
      youtubeId: "vsiOfyok3Aw",
      category: "Sermon",
      title: "Wilderness Season in Pidgin",
      description: "Important Message.",
      thumbnail: "https://img.youtube.com/vi/vsiOfyok3Aw/hqdefault.jpg"
    },
    {
      youtubeId: "bFdBXc2ZG3o",
      category: "Sermon",
      title: "This week your prayer will be answered.",
      description: "Important Message.",
      thumbnail: "https://img.youtube.com/vi/bFdBXc2ZG3o/hqdefault.jpg"
    },
    {
      youtubeId: "mB_ZrYX0C7c",
      category: "Teaching",
      title: "It will all make sense. Trust the process",
      description: "Message.",
      thumbnail: "https://img.youtube.com/vi/mB_ZrYX0C7c/hqdefault.jpg"
    },
    {
      youtubeId: "W4vyh8_3E9c",
      category: "Teaching",
      title: "Today New doors will override your past denials.",
      description: "Message.",
      thumbnail: "https://img.youtube.com/vi/W4vyh8_3E9c/hqdefault.jpg"
    },
    {
      youtubeId: "em9xip3c508",
      category: "Teaching",
      title: "Your day of Restoration",
      description: "Message.",
      thumbnail: "https://img.youtube.com/vi/em9xip3c508/hqdefault.jpg"
    },
    {
      youtubeId: "G6NZRYM6Wk4",
      category: "Teaching",
      title: "You will have more rooms to accommodate your blessings this week",
      description: "Message.",
      thumbnail: "https://img.youtube.com/vi/G6NZRYM6Wk4/hqdefault.jpg"
    }
  ];

  /* =========================
     VIDEO PAGE
  ========================= */
  function updateFeaturedVideo(video) {
    if (featuredVideoFrame) {
      featuredVideoFrame.src = `https://www.youtube.com/embed/${video.youtubeId}`;
    }

    if (featuredVideoTitle) {
      featuredVideoTitle.textContent = video.title;
    }

    if (featuredVideoDescription) {
      featuredVideoDescription.textContent = video.description;
    }

    if (featuredVideoLink) {
      featuredVideoLink.href = `https://www.youtube.com/watch?v=${video.youtubeId}`;
    }
  }

  function createVideoCard(video) {
    const card = document.createElement("article");
    card.className = "thumbnail-card";

    card.innerHTML = `
      <div class="thumbnail-image">
        <img src="${video.thumbnail}" alt="${video.title}">
        <div class="thumbnail-play">▶</div>
      </div>
      <div class="thumbnail-card-content">
        <span class="video-category">${video.category}</span>
        <h3>${video.title}</h3>
        <p>${video.description}</p>
      </div>
    `;

    card.addEventListener("click", function () {
      updateFeaturedVideo(video);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    return card;
  }

  function renderVideos() {
    if (!prayerVideosGrid && !sermonVideosGrid && !teachingVideosGrid) return;

    if (videos.length > 0) {
      updateFeaturedVideo(videos[0]);
    }

    videos.forEach(function (video) {
      const card = createVideoCard(video);

      if (video.category === "Prayer" && prayerVideosGrid) {
        prayerVideosGrid.appendChild(card);
      } else if (video.category === "Sermon" && sermonVideosGrid) {
        sermonVideosGrid.appendChild(card);
      } else if (video.category === "Teaching" && teachingVideosGrid) {
        teachingVideosGrid.appendChild(card);
      }
    });
  }

  /* =========================
     GALLERY LIGHTBOX
  ========================= */
  function openLightbox(image) {
    if (!lightbox || !lightboxImg) return;

    lightbox.classList.add("show");
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("show");
  }

  function setupGallery() {
    if (!galleryImages.length || !lightbox || !lightboxImg) return;

    galleryImages.forEach(function (img) {
      img.addEventListener("click", function () {
        openLightbox(img);
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  /* =========================
     INIT
  ========================= */
  setupMenu();
  setupHeaderScroll();
  setupThemeSwitcher();
  renderVideos();
  setupGallery();
});
