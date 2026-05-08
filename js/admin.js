document.addEventListener("DOMContentLoaded", function () {
  /* =========================
     SUPABASE
  ========================= */
  const supabaseUrl = "https://munuuangqldudtofwujl.supabase.co";
  const supabaseKey = "sb_publishable_-TMMWPwAY-UfqIEyLUWEyw_h82Kj9_W";
  const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

  /* =========================
     ELEMENTS
  ========================= */
  const adminLoginCard = document.getElementById("adminLoginCard");
  const adminDashboard = document.getElementById("adminDashboard");
  const adminLoginForm = document.getElementById("adminLoginForm");
  const adminLoginMessage = document.getElementById("adminLoginMessage");
  const adminLogoutBtn = document.getElementById("adminLogoutBtn");
  const adminUserEmail = document.getElementById("adminUserEmail");

  const prayerRequestsTableBody = document.getElementById("prayerRequestsTableBody");
  const contactMessagesTableBody = document.getElementById("contactMessagesTableBody");

  const messageModal = document.getElementById("messageModal");
  const messageModalTitle = document.getElementById("messageModalTitle");
  const messageModalText = document.getElementById("messageModalText");
  const messageModalClose = document.getElementById("messageModalClose");
  const messageModalOverlay = document.getElementById("messageModalOverlay");

  let isLoading = false;
  let prayerRowsCache = [];
  let contactRowsCache = [];

  /* =========================
     READ / UNREAD STATE
  ========================= */
  function getReadMap() {
    return JSON.parse(localStorage.getItem("adminReadMessages") || "{}");
  }

  function saveReadMap(readMap) {
    localStorage.setItem("adminReadMessages", JSON.stringify(readMap));
  }

  function makeMessageKey(type, row) {
    return `${type}_${row.id}`;
  }

  function isMessageRead(type, row) {
    const readMap = getReadMap();
    return !!readMap[makeMessageKey(type, row)];
  }

  function markMessageAsRead(type, row) {
    const readMap = getReadMap();
    readMap[makeMessageKey(type, row)] = true;
    saveReadMap(readMap);
  }

  /* =========================
     HELPERS
  ========================= */
  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function truncateText(text, maxLength = 65) {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  }

  function formatDate(dateString) {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString();
  }

  function setLoginMessage(text, type = "") {
    if (!adminLoginMessage) return;
    adminLoginMessage.textContent = text;
    adminLoginMessage.className = type
      ? `admin-status ${type} show`
      : "admin-status";
  }

  function clearLoginMessage() {
    if (!adminLoginMessage) return;
    adminLoginMessage.textContent = "";
    adminLoginMessage.className = "admin-status";
  }

  function setLoginLoadingState(loading) {
    if (!adminLoginForm) return;

    const submitBtn = adminLoginForm.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    submitBtn.disabled = loading;
    submitBtn.textContent = loading ? "Signing In..." : "Sign In";
  }

  function showLogin() {
    if (adminDashboard) adminDashboard.classList.add("hidden");
    if (adminLoginCard) adminLoginCard.classList.remove("hidden");
    clearLoginMessage();
    setLoginLoadingState(false);
    isLoading = false;
  }

  async function showDashboard(session) {
    const user = session?.user;
    if (!user) {
      showLogin();
      return;
    }

    if (adminUserEmail) {
      adminUserEmail.textContent = `Signed in as ${user.email}`;
    }

    if (adminLoginCard) adminLoginCard.classList.add("hidden");
    if (adminDashboard) adminDashboard.classList.remove("hidden");

    clearLoginMessage();
    setLoginLoadingState(false);
    isLoading = false;

    await loadAdminData();
  }

  /* =========================
     MODAL
  ========================= */
  function openMessageModal(title, text) {
    if (!messageModal || !messageModalTitle || !messageModalText) return;

    messageModalTitle.textContent = title;
    messageModalText.textContent = text || "";
    messageModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeMessageModal() {
    if (!messageModal) return;
    messageModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  if (messageModalClose) {
    messageModalClose.addEventListener("click", closeMessageModal);
  }

  if (messageModalOverlay) {
    messageModalOverlay.addEventListener("click", closeMessageModal);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && messageModal && !messageModal.classList.contains("hidden")) {
      closeMessageModal();
    }
  });

  /* =========================
     RENDER PRAYER REQUESTS
  ========================= */
  function renderPrayerRequests(rows) {
    if (!prayerRequestsTableBody) return;

    if (!rows || rows.length === 0) {
      prayerRequestsTableBody.innerHTML = `
        <tr class="admin-empty-row">
          <td colspan="5">No prayer requests yet.</td>
        </tr>
      `;
      return;
    }

    prayerRequestsTableBody.innerHTML = rows
      .map((row, index) => {
        const readClass = isMessageRead("prayer", row) ? "read" : "unread";

        return `
          <tr>
            <td>${escapeHtml(row.full_name)}</td>
            <td>${escapeHtml(row.phone || "")}</td>
            <td>${escapeHtml(row.email)}</td>
            <td>
              <button
                type="button"
                class="message-preview-btn ${readClass}"
                data-index="${index}"
                data-type="prayer"
              >
                ${escapeHtml(truncateText(row.prayer_request, 65))}
              </button>
            </td>
            <td>${escapeHtml(formatDate(row.created_at))}</td>
          </tr>
        `;
      })
      .join("");

    const prayerButtons = prayerRequestsTableBody.querySelectorAll(".message-preview-btn");

    prayerButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const index = Number(this.dataset.index);
        const selectedRow = prayerRowsCache[index];
        if (!selectedRow) return;

        markMessageAsRead("prayer", selectedRow);
        openMessageModal("Prayer Request", selectedRow.prayer_request || "");
        renderPrayerRequests(prayerRowsCache);
      });
    });
  }

  /* =========================
     RENDER CONTACT MESSAGES
  ========================= */
  function renderContactMessages(rows) {
    if (!contactMessagesTableBody) return;

    if (!rows || rows.length === 0) {
      contactMessagesTableBody.innerHTML = `
        <tr class="admin-empty-row">
          <td colspan="6">No contact messages yet.</td>
        </tr>
      `;
      return;
    }

    contactMessagesTableBody.innerHTML = rows
      .map((row, index) => {
        const readClass = isMessageRead("contact", row) ? "read" : "unread";

        return `
          <tr>
            <td>${escapeHtml(row.full_name)}</td>
            <td>${escapeHtml(row.phone || "")}</td>
            <td>${escapeHtml(row.email)}</td>
            <td>${escapeHtml(row.subject || "")}</td>
            <td>
              <button
                type="button"
                class="message-preview-btn ${readClass}"
                data-index="${index}"
                data-type="contact"
              >
                ${escapeHtml(truncateText(row.message, 65))}
              </button>
            </td>
            <td>${escapeHtml(formatDate(row.created_at))}</td>
          </tr>
        `;
      })
      .join("");

    const contactButtons = contactMessagesTableBody.querySelectorAll(".message-preview-btn");

    contactButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const index = Number(this.dataset.index);
        const selectedRow = contactRowsCache[index];
        if (!selectedRow) return;

        markMessageAsRead("contact", selectedRow);
        openMessageModal(
          selectedRow.subject ? `Message: ${selectedRow.subject}` : "Contact Message",
          selectedRow.message || ""
        );
        renderContactMessages(contactRowsCache);
      });
    });
  }

  /* =========================
     LOAD DATA
  ========================= */
  async function loadAdminData() {
    const { data: prayerData, error: prayerError } = await supabaseClient
      .from("prayer_requests")
      .select("id, full_name, phone, email, prayer_request, created_at")
      .order("created_at", { ascending: false });

    if (prayerError) {
      console.error("Prayer requests load error:", prayerError);
      prayerRowsCache = [];
      renderPrayerRequests([]);
    } else {
      prayerRowsCache = prayerData || [];
      renderPrayerRequests(prayerRowsCache);
    }

    const { data: contactData, error: contactError } = await supabaseClient
      .from("contact_messages")
      .select("id, full_name, phone, email, subject, message, created_at")
      .order("created_at", { ascending: false });

    if (contactError) {
      console.error("Contact messages load error:", contactError);
      contactRowsCache = [];
      renderContactMessages([]);
    } else {
      contactRowsCache = contactData || [];
      renderContactMessages(contactRowsCache);
    }
  }

  /* =========================
     AUTH
  ========================= */
  async function initializeAdminPage() {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
      console.error("Session check error:", error);
      showLogin();
      return;
    }

    if (data?.session) {
      await showDashboard(data.session);
    } else {
      showLogin();
    }
  }

  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      if (isLoading) return;
      isLoading = true;

      clearLoginMessage();
      setLoginMessage("Signing in...", "loading");
      setLoginLoadingState(true);

      const email = document.getElementById("adminEmail")?.value.trim() || "";
      const password = document.getElementById("adminPassword")?.value || "";

      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Admin login error:", error);
        setLoginMessage(error.message || "Login failed.", "error");
        setLoginLoadingState(false);
        isLoading = false;
        return;
      }

      await showDashboard(data.session);
    });
  }

  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener("click", async function () {
      await supabaseClient.auth.signOut();
      closeMessageModal();
      showLogin();
    });
  }

  supabaseClient.auth.onAuthStateChange(function (event, session) {
    if (event === "SIGNED_IN" && session) {
      showDashboard(session);
    }

    if (event === "SIGNED_OUT") {
      closeMessageModal();
      showLogin();
    }
  });

  initializeAdminPage();
});
