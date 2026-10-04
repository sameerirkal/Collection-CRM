
// ========================================
// COLLECTPRO - DASHBOARD MODULE
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  renderDashboard();
});

// ========================================
// 1. SAMPLE COLLECTION DATA
// ========================================

const dashboardData = {
  customers: [
    {
      name: "Rahul Sharma",
      outstanding: 45600,
      minimumDue: 3200,
      status: "PTP",
      ptpDate: "2026-10-05"
    },
    {
      name: "Priya Verma",
      outstanding: 78500,
      minimumDue: 5500,
      status: "Not Paid",
      ptpDate: ""
    },
    {
      name: "Amit Kumar",
      outstanding: 32400,
      minimumDue: 2500,
      status: "Paid",
      ptpDate: ""
    },
    {
      name: "Sneha Patil",
      outstanding: 91200,
      minimumDue: 6800,
      status: "PTP",
      ptpDate: "2026-10-06"
    },
    {
      name: "Vikram Rao",
      outstanding: 56300,
      minimumDue: 4100,
      status: "Not Paid",
      ptpDate: ""
    }
  ]
};

// ========================================
// 2. FORMAT CURRENCY
// ========================================

function formatCurrency(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

// ========================================
// 3. DASHBOARD CALCULATIONS
// ========================================

function calculateDashboard() {
  const customers = dashboardData.customers;

  const totalCustomers = customers.length;

  const totalOutstanding = customers.reduce(
    (total, customer) => total + customer.outstanding,
    0
  );

  const paidCustomers = customers.filter(
    customer => customer.status === "Paid"
  );

  const pendingCustomers = customers.filter(
    customer => customer.status === "Not Paid"
  );

  const ptpCustomers = customers.filter(
    customer => customer.status === "PTP"
  );

  const paidAmount = paidCustomers.reduce(
    (total, customer) => total + customer.outstanding,
    0
  );

  const collectionRate = totalOutstanding > 0
    ? (paidAmount / totalOutstanding) * 100
    : 0;

  return {
    totalCustomers,
    totalOutstanding,
    paidCount: paidCustomers.length,
    pendingCount: pendingCustomers.length,
    ptpCount: ptpCustomers.length,
    paidAmount,
    collectionRate
  };
}

// ========================================
// 4. UPDATE KPI CARDS
// ========================================

function updateKPI(data) {
  const elements = {
    totalCustomers: document.getElementById("totalCustomers"),
    totalOutstanding: document.getElementById("totalOutstanding"),
    paidCount: document.getElementById("paidCount"),
    pendingCount: document.getElementById("pendingCount"),
    ptpCount: document.getElementById("ptpCount")
  };

  if (elements.totalCustomers) {
    elements.totalCustomers.textContent = data.totalCustomers;
  }

  if (elements.totalOutstanding) {
    elements.totalOutstanding.textContent =
      formatCurrency(data.totalOutstanding);
  }

  if (elements.paidCount) {
    elements.paidCount.textContent = data.paidCount;
  }

  if (elements.pendingCount) {
    elements.pendingCount.textContent = data.pendingCount;
  }

  if (elements.ptpCount) {
    elements.ptpCount.textContent = data.ptpCount;
  }
}

// ========================================
// 5. COLLECTION PROGRESS
// ========================================

function updateCollectionProgress(data) {
  const progressBar = document.getElementById(
    "collectionProgress"
  );

  const progressText = document.getElementById(
    "collectionPercentage"
  );

  if (progressBar) {
    progressBar.style.width =
      `${data.collectionRate.toFixed(1)}%`;
  }

  if (progressText) {
    progressText.textContent =
      `${data.collectionRate.toFixed(1)}%`;
  }
}

// ========================================
// 6. FOLLOW-UP SUMMARY
// ========================================

function renderFollowups() {
  const followupContainer = document.getElementById(
    "followupList"
  );

  if (!followupContainer) return;

  const ptpList = dashboardData.customers.filter(
    customer => customer.status === "PTP"
  );

  if (ptpList.length === 0) {
    followupContainer.innerHTML =
      "<p>No pending follow-ups.</p>";
    return;
  }

  followupContainer.innerHTML = ptpList.map(customer => `
    <div class="followup-item">
      <div>
        <strong>${customer.name}</strong>
        <p>PTP Date: ${customer.ptpDate}</p>
      </div>
      <span class="status ptp">PTP</span>
    </div>
  `).join("");
}

// ========================================
// 7. RENDER DASHBOARD
// ========================================

function renderDashboard() {
  const data = calculateDashboard();

  updateKPI(data);
  updateCollectionProgress(data);
  renderFollowups();
}

// ========================================
// 8. REFRESH DASHBOARD
// ========================================

function refreshDashboard() {
  renderDashboard();
}
