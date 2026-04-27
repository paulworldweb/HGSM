document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // HAMBURGER MENU
  // =========================
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("active");
      siteNav.classList.toggle("open");

      const expanded = menuToggle.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  }

  // =========================
  // VIDEO PAGE ELEMENTS
  // =========================
  const prayerVideosGrid = document.getElementById("prayerVideosGrid");
  const sermonVideosGrid = document.getElementById("sermonVideosGrid");
  const teachingVideosGrid = document.getElementById("teachingVideosGrid");

  const featuredVideoFrame = document.getElementById("featuredVideoFrame");
  const featuredVideoTitle = document.getElementById("featuredVideoTitle");
  const featuredVideoDescription = document.getElementById("featuredVideoDescription");
  const featuredVideoLink = document.getElementById("featuredVideoLink");

  // =========================
  // VIDEO LIST
  // =========================
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
      description: "SImportant Message.",
      thumbnail: "https://img.youtube.com/vi/7mXysiwfkvM/hqdefault.jpg"
    },
    {
      youtubeId: "V8PgibOY38Gs",
      category: "Sermon",
      title: "What God cannot do, let it remain undone.",
      description: "Important Message",
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
      youtubeId: "8uumrYIiC-c&t=82s",
      category: "Sermon",
      title: "Why no Miracles in Churches today",
      description: "Important Message.",
      thumbnail: "https://img.youtube.com/8uumrYIiC-c&t=82s/hqdefault.jpg"
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

  // =========================
  // UPDATE FEATURED VIDEO
  // =========================
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

  // Set first video as featured
  if (videos.length > 0) {
    updateFeaturedVideo(videos[0]);
  }

  // =========================
  // CREATE VIDEO CARDS
  // =========================
  videos.forEach((video) => {
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

    // Click card to update featured video
    card.addEventListener("click", function () {
      updateFeaturedVideo(video);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    // Put card in correct section
    if (video.category === "Prayer" && prayerVideosGrid) {
      prayerVideosGrid.appendChild(card);
    } else if (video.category === "Sermon" && sermonVideosGrid) {
      sermonVideosGrid.appendChild(card);
    } else if (video.category === "Teaching" && teachingVideosGrid) {
      teachingVideosGrid.appendChild(card);
    }
  });
});
