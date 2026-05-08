document.addEventListener("DOMContentLoaded", function () {
  const supabaseUrl = "https://munuuangqldudtofwujl.supabase.co";
  const supabaseKey = "sb_publishable_-TMMWPwAY-UfqIEyLUWEyw_h82Kj9_W";
  const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

  const adminLoginCard = document.getElementById("adminLoginCard");
  const adminDashboard = document.getElementById("adminDashboard");
  const adminLoginForm = document.getElementById("adminLoginForm");
  const adminLoginMessage = document.getElementById("adminLoginMessage");
  const adminLogoutBtn = document.getElementById("adminLogoutBtn");
  const adminUserEmail = document.getElementById("adminUserEmail");

  const prayerRequestsTableBody = document.getElementById("prayerRequestsTableBody");
  const contactMessagesTableBody = document.getElementById("contactMessagesTableBody");

  function setLoginMessage(text, type) {
    if (!adminLoginMessage) return;
    adminLoginMessage.textContent = text;
    adminLoginMessage.className = `admin-status ${type} show`;
  }

  function clearLoginMessage() {
    if (!adminLoginMessage) return;
    adminLoginMessage.textContent = "";
    adminLoginMessage.className = "admin-status";
  }

  function formatDate(dateString) {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString();
  }

  function renderPrayerRequests(rows) {
    if (!prayerRequestsTableBody) return;

    if (!rows || rows.length === 0) {
      prayerRequestsTableBody.innerHTML = `
        <tr>
          <td colspan="5">No prayer requests yet.</td>
        </tr>
      `;
      return;
    }

    prayerRequestsTableBody.innerHTML = rows.map(row => `
      <tr>
        <td>${row.full_name ?? ""}</td>
        <td>${row.phone ?? ""}</td>
        <td>${row.email ?? ""}</td>
        <td>${row.prayer_request ?? ""}</td>
        <td>${formatDate(row.created_at)}</td>
      </tr>
    `).join("");
  }

  function renderContactMessages(rows) {
    if (!contactMessagesTableBody) return;

    if (!rows || rows.length === 0) {
      contactMessagesTableBody.innerHTML = `
        <tr>
          <td colspan="6">No contact messages yet.</td>
        </tr>
      `;
      return;
    }

    contactMessagesTableBody.innerHTML = rows.map(row => `
      <tr>
        <td>${row.full_name ?? ""}</td>
        <td>${row.phone ?? ""}</td>
        <td>${row.email ?? ""}</td>
        <td>${row.subject ?? ""}</td>
        <td>${row.message ?? ""}</td>
        <td>${formatDate(row.created_at)}</td>
      </tr>
    `).join("");
  }

  async function loadAdminData() {
    const { data: prayerData, error: prayerError } = await supabaseClient
      .from("prayer_requests")
      .select("full_name, phone, email, prayer_request, created_at")
      .order("created_at", { ascending: false });

    if (prayerError) {
      console.error("Prayer requests load error:", prayerError);
      renderPrayerRequests([]);
    } else {
      renderPrayerRequests(prayerData);
    }

    const { data: contactData, error: contactError } = await supabaseClient
      .from("contact_messages")
      .select("full_name, phone, email, subject, message, created_at")
      .order("created_at", { ascending: false });

    if (contactError) {
      console.error("Contact messages load error:", contactError);
      renderContactMessages([]);
    } else {
      renderContactMessages(contactData);
    }
  }

  async function showDashboard() {
    const { data, error } = await supabaseClient.auth.getUser();

    if (error || !data?.user) {
      adminLoginCard.classList.remove("hidden");
      adminDashboard.classList.add("hidden");
      return;
    }

    if (adminUserEmail) {
      adminUserEmail.textContent = `Signed in as ${data.user.email}`;
    }

    adminLoginCard.classList.add("hidden");
    adminDashboard.classList.remove("hidden");

    await loadAdminData();
  }

  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      clearLoginMessage();

      const email = document.getElementById("adminEmail").value.trim();
      const password = document.getElementById("adminPassword").value;

      setLoginMessage("Signing in...", "loading");

      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Admin login error:", error);
        setLoginMessage(error.message || "Login failed.", "error");
        return;
      }

      setLoginMessage("Login successful.", "success");
      await showDashboard();
    });
  }

  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener("click", async function () {
      await supabaseClient.auth.signOut();
      adminDashboard.classList.add("hidden");
      adminLoginCard.classList.remove("hidden");
      clearLoginMessage();
    });
  }

  supabaseClient.auth.onAuthStateChange(async function (_event, session) {
    if (session?.user) {
      await showDashboard();
    } else {
      adminDashboard.classList.add("hidden");
      adminLoginCard.classList.remove("hidden");
    }
  });

  showDashboard();
});