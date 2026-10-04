
// ========================================
// COLLECTPRO - COLLECTION CRM
// Main JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initSearch();
  initDate();
  initDashboard();
});

// ========================================
// 1. NAVIGATION
// ========================================

function initNavigation() {
  const navLinks = document.querySelectorAll(
    ".nav-link, [data-page]"
  );

  const sections = document.querySelectorAll(
    ".page-section, .section"
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = link.dataset.page ||
        link.getAttribute("href")?.replace("#", "");

      if (!target) return;

      const targetSection = document.getElementById(target);
      if (!targetSection) return;

      event.preventDefault();

      sections.forEach((section) => {
        section.style.display = "none";
      });

      targetSection.style.display = "block";

      navLinks.forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");
    });
  });
}

// ========================================
// 2. CUSTOMER SEARCH
// ========================================

function initSearch() {
  const searchInput = document.querySelector(
    "#customerSearch, .customer-search"
  );

  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value
      .toLowerCase()
      .trim();

    const rows = document.querySelectorAll(
      "#recentCustomers tbody tr, #customerTable tbody tr"
    );

    rows.forEach((row) => {
      const rowText = row.textContent.toLowerCase();

      row.style.display = rowText.includes(searchValue)
        ? ""
        : "none";
    });
  });
}

// ========================================
// 3. CURRENT DATE
// ========================================

function initDate() {
  const dateElement = document.querySelector(
    "#currentDate, .current-date"
  );

  if (!dateElement) return;

  const today = new Date();

  dateElement.textContent = today.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  );
}

// ========================================
// 4. DASHBOARD SAMPLE DATA
// ========================================

function initDashboard() {
  const customers = [
    {
      name: "Rahul Sharma",
      account: "AMEX-1001",
      outstanding: 45600,
      minimumDue: 3200,
      status: "PTP",
      ptpDate: "05 Oct 2026"
    },
    {
      name: "Priya Verma",
      account: "AMEX-1002",
      outstanding: 78500,
      minimumDue: 5500,
      status: "Not Paid",
      ptpDate: "-"
    },
    {
      name: "Amit Kumar",
      account: "AMEX-1003",
      outstanding: 32400,
      minimumDue: 2500,
      status: "Paid",
      ptpDate: "-"
    },
    {
      name: "Sneha Patil",
      account: "AMEX-1004",
      outstanding: 91200,
      minimumDue: 6800,
      status: "PTP",
      ptpDate: "06 Oct 2026"
    }
  ];

  const tableBody = document.querySelector(
    "#recentCustomers tbody, #customerTable tbody"
  );

  if (tableBody && tableBody.children.length === 0) {
    tableBody.innerHTML = customers.map((customer) => `
      <tr>
        <td>${customer.name}</td>
        <td>${customer.account}</td>
        <td>₹${customer.outstanding.toLocaleString("en-IN")}</td>
        <td>₹${customer.minimumDue.toLocaleString("en-IN")}</td>
        <td>
          <span class="status ${customer.status
            .toLowerCase()
            .replace(/\s+/g, "-")}">
            ${customer.status}
          </span>
        </td>
        <td>${customer.ptpDate}</td>
      </tr>
    `).join("");
  }
}

// ========================================
// 5. BASIC BUTTON FEEDBACK
// ========================================

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button) return;

  const action = button.dataset.action;

  if (action === "add-customer") {
    alert("Customer Management module will be added in the next step.");
  }

  if (action === "export-report") {
    alert("Excel export feature will be added in a later step.");
  }
});
