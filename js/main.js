document.addEventListener("DOMContentLoaded", function () {
  /* =========================
     HAMBURGER MENU
  ========================= */
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");
  const header = document.querySelector("header");

  function closeMenu() {
    if (!menuToggle || !siteNav) return;

    siteNav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  function toggleMenu(event) {
    event.stopPropagation();

    const isOpen = siteNav.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", toggleMenu);

    siteNav.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    document.addEventListener("click", function () {
      closeMenu();
    });
  }

  /* =========================
     HEADER SCROLL EFFECT
     Transparent at top
     Dark background when user scrolls on desktop
  ========================= */
  function handleHeaderScroll() {
    if (!header) return;

    if (window.innerWidth > 980 && window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  handleHeaderScroll();
  window.addEventListener("scroll", handleHeaderScroll);
  window.addEventListener("resize", handleHeaderScroll);

  /* =========================
     VIDEO PAGE
  ========================= */
  const prayerVideosGrid = document.getElementById("prayerVideosGrid");
  const sermonVideosGrid = document.getElementById("sermonVideosGrid");
  const teachingVideosGrid = document.getElementById("teachingVideosGrid");

  const featuredVideoFrame = document.getElementById("featuredVideoFrame");
  const featuredVideoTitle = document.getElementById("featuredVideoTitle");
  const featuredVideoDescription = document.getElementById("featuredVideoDescription");
  const featuredVideoLink = document.getElementById("featuredVideoLink");

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

  renderVideos();

  /* =========================
     GALLERY LIGHTBOX
  ========================= */
  const galleryImages = document.querySelectorAll(".gallery-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");

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

  galleryImages.forEach(function (img) {
    img.addEventListener("click", function () {
      openLightbox(this);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }
});
