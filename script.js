// ==========================================
// MANDIRI FARM - MANAGEMENT SYSTEM
// ==========================================

// DEMO LOGIN
const loginPage = document.getElementById("loginPage");
const app = document.getElementById("app");
const content = document.getElementById("content");

document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "admin123") {
    loginPage.classList.add("hidden");
    app.classList.remove("hidden");
    renderPage("Dashboard");
    toast("Welcome to Mandiri Farm!");
  } else {
    toast("Username or password is incorrect!");
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  app.classList.add("hidden");
  loginPage.classList.remove("hidden");
});

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

// NAVIGATION
document.getElementById("navigation").addEventListener("click", e => {
  const btn = e.target.closest("[data-page]");
  if (btn) navigate(btn.dataset.page);
});

document.querySelector(".sidebar-bottom").addEventListener("click", e => {
  const btn = e.target.closest("[data-page]");
  if (btn) navigate(btn.dataset.page);
});

function navigate(page) {
  document.querySelectorAll(".nav-link").forEach(b => {
    b.classList.toggle("active", b.dataset.page === page);
  });
  document.getElementById("breadcrumb").textContent = page;
  document.getElementById("sidebar").classList.remove("open");
  renderPage(page);
}

// SAMPLE DATABASE
const db = {
  customers: [
    {name:"PT ABC", phone:"0812xxxx", email:"abc@abc.com", status:"Active"},
    {name:"CV Sejahtera", phone:"0812xxxx", email:"sejahtera@mail.com", status:"Active"},
    {name:"UD Maju Jaya", phone:"0812xxxx", email:"majujaya@mail.com", status:"Active"},
    {name:"PT Sinar Mas", phone:"0812xxxx", email:"sinar@mail.com", status:"Active"},
    {name:"Toko Berkah", phone:"0821xxxx", email:"berkah@mail.com", status:"Active"}
  ],
  sales: [
    {customer:"PT ABC", product:"Ayam Utuh", quantity:"100", price:"35000", total:"3500000", date:"12 Apr 2025", status:"Completed"},
    {customer:"CV Sejahtera", product:"Dada Ayam", quantity:"50", price:"30000", total:"1500000", date:"10 Apr 2025", status:"Completed"},
    {customer:"UD Maju Jaya", product:"Paha Ayam", quantity:"80", price:"28000", total:"2240000", date:"5 Apr 2025", status:"Pending"}
  ],
  invoices: [
    {invoice:"INV-0001", customer:"PT ABC", date:"12 Apr 2025", amount:"10.000.000", status:"Paid"},
    {invoice:"INV-0002", customer:"CV Sejahtera", date:"10 Apr 2025", amount:"5.500.000", status:"Paid"},
    {invoice:"INV-0003", customer:"UD Maju Jaya", date:"5 Apr 2025", amount:"8.750.000", status:"Unpaid"},
    {invoice:"INV-0004", customer:"PT Sinar Mas", date:"1 Apr 2025", amount:"12.000.000", status:"Partial"}
  ],
  suppliers: [
    {name:"PT Agro Sejahtera", contact:"Agus Santoso", phone:"0811 1111 222", status:"Active"},
    {name:"CV Berkah Abadi", contact:"Budi Hartono", phone:"0813 3333 444", status:"Active"},
    {name:"PT Ternak Jaya", contact:"Sari Dewi", phone:"0817 5555 666", status:"Active"},
    {name:"UD Makmur Bersama", contact:"Andi Pratama", phone:"0821 7777 888", status:"Active"}
  ],
  purchases: [
    {purchase:"PB-001", supplier:"PT Agro Sejahtera", date:"10 Apr 2025", weight:"1.000", total:"25.000.000", status:"Completed"},
    {purchase:"PB-002", supplier:"CV Berkah Abadi", date:"5 Apr 2025", weight:"950", total:"22.500.000", status:"Completed"},
    {purchase:"PB-003", supplier:"PT Ternak Jaya", date:"1 Apr 2025", weight:"1.200", total:"42.000.000", status:"Completed"},
    {purchase:"PB-004", supplier:"UD Makmur Bersama", date:"25 Mar 2025", weight:"800", total:"20.000.000", status:"Completed"}
  ],
  production: [
    {date:"24 Apr 2025", purchase:"PB-001", live:"1.300", result:"970", yield:"74.6%", status:"Completed"},
    {date:"18 Apr 2025", purchase:"PB-002", live:"950", result:"720", yield:"75.8%", status:"Completed"},
    {date:"10 Apr 2025", purchase:"PB-003", live:"1.200", result:"900", yield:"75%", status:"Completed"}
  ],
  inventory: [
    {product:"Ayam Utuh", stock:"500", status:"In Stock"},
    {product:"Dada Ayam", stock:"300", status:"In Stock"},
    {product:"Paha Ayam", stock:"250", status:"In Stock"},
    {product:"Sayap Ayam", stock:"150", status:"Low Stock"},
    {product:"Ceker Ayam", stock:"100", status:"Low Stock"}
  ],
  deliveries: [
    {delivery:"DLY-001", customer:"PT ABC", date:"22 Apr 2025", driver:"Budi Santoso", status:"Delivered"},
    {delivery:"DLY-002", customer:"CV Sejahtera", date:"23 Apr 2025", driver:"Andi Wijaya", status:"On Delivery"},
    {delivery:"DLY-003", customer:"UD Maju Jaya", date:"23 Apr 2025", driver:"Sigit Pratama", status:"Scheduled"},
    {delivery:"DLY-004", customer:"PT Sinar Mas", date:"24 Apr 2025", driver:"Rudi Hartono", status:"On Delivery"}
  ],
  employees: [
    {name:"Andi Pratama", position:"Manager", department:"Operational", status:"Active"},
    {name:"Siti Rahma", position:"Staff", department:"Marketing", status:"Active"},
    {name:"Budi Santoso", position:"Driver", department:"Operational", status:"Active"},
    {name:"Rina Agustina", position:"Staff", department:"Finance", status:"Active"}
  ],
  payments: [],
  receivables: [
    {customer:"PT ABC", invoice:"INV-001", amount:"8.750.000", paid:"5.000.000", outstanding:"3.750.000", due:"30 Apr 2025", status:"Partially Paid"},
    {customer:"CV Sejahtera", invoice:"INV-002", amount:"4.500.000", paid:"0", outstanding:"4.500.000", due:"30 Apr 2025", status:"Unpaid"},
    {customer:"UD Maju Jaya", invoice:"INV-003", amount:"8.000.000", paid:"0", outstanding:"8.000.000", due:"5 May 2025", status:"Overdue"}
  ]
};

// TABLE CONFIGURATION
const configs = {
  "Customer Management": {
    key:"customers", title:"Customer List",
    button:"Add Customer",
    columns:["name","phone","email","status"],
    headers:["No.","Customer Name","Phone","Email","Status","Action"],
    fields:["name","phone","email","status"]
  },
  "Sales Management": {
    key:"sales", title:"Sales Order List",
    button:"Create Sales Order",
    columns:["customer","product","quantity","price","total","date","status"],
    headers:["No.","Customer","Product","Quantity (Kg)","Unit Price","Total","Date","Status","Action"],
    fields:["customer","product","quantity","price","date","status"]
  },
  "Invoice Management": {
    key:"invoices", title:"Invoice List",
    button:"Create Invoice",
    columns:["invoice","customer","date","amount","status"],
    headers:["No.","Invoice","Customer","Date","Amount","Status","Action"],
    fields:["invoice","customer","date","amount","status"]
  },
  "Supplier Management": {
    key:"suppliers", title:"Supplier List",
    button:"Add Supplier",
    columns:["name","contact","phone","status"],
    headers:["No.","Supplier Name","Contact","Phone","Status","Action"],
    fields:["name","contact","phone","status"]
  },
  "Purchase Management": {
    key:"purchases", title:"Purchase List",
    button:"Add Purchase",
    columns:["purchase","supplier","date","weight","total","status"],
    headers:["No.","Purchase ID","Supplier","Date","Weight (Kg)","Total Price","Status","Action"],
    fields:["purchase","supplier","date","weight","total","status"]
  },
  "Production Management": {
    key:"production", title:"Production Record",
    button:"Add Production",
    columns:["date","purchase","live","result","yield","status"],
    headers:["No.","Date","Purchase No.","Live Weight (Kg)","Result Weight (Kg)","Yield","Status","Action"],
    fields:["date","purchase","live","result","yield","status"]
  },
  "Inventory Management": {
    key:"inventory", title:"Stock Overview",
    button:"Adjust Stock",
    columns:["product","stock","status"],
    headers:["No.","Product","Current Stock (Kg)","Status","Action"],
    fields:["product","stock","status"]
  },
  "Delivery Management": {
    key:"deliveries", title:"Delivery List",
    button:"Add Delivery",
    columns:["delivery","customer","date","driver","status"],
    headers:["No.","Delivery No.","Customer","Date","Driver","Status","Action"],
    fields:["delivery","customer","date","driver","status"]
  },
  "Employee Management": {
    key:"employees", title:"Employee Management",
    button:"Add Employee",
    columns:["name","position","department","status"],
    headers:["No.","Name","Position","Department","Status","Action"],
    fields:["name","position","department","status"]
  }
};

const icons = {
  "Customer Management":"users",
  "Sales Management":"shopping-cart",
  "Invoice Management":"file-text",
  "Supplier Management":"truck",
  "Purchase Management":"shopping-bag",
  "Production Management":"factory",
  "Inventory Management":"package",
  "Delivery Management":"truck",
  "Employee Management":"contact",
  "Payment Management":"wallet",
  "Outstanding Receivables":"receipt"
};

let currentPage = "Dashboard";
let editingIndex = null;
let currentKey = null;
let currentFields = [];
let chartInstances = [];

// MAIN RENDER
function renderPage(page) {
  currentPage = page;

  if (page === "Dashboard") return renderDashboard();
  if (page === "Customer Detail") return renderCustomerDetail();
  if (page === "Finance Management") return renderFinance();
  if (page === "Payment Management") return renderPayments();
  if (page === "Outstanding Receivables") return renderReceivables();
  if (page === "My Profile") return renderProfile();
  if (page === "Settings") return renderSettings();
  if (page === "Reports & Analytics") return renderReports();

  if (page === "Sales Management") {
    renderTable("Sales Management");
    return;
  }
  if (page === "Customer Management") {
    renderTable("Customer Management");
    return;
  }
  if (configs[page]) {
    renderTable(page);
    return;
  }
  renderDashboard();
}

// DASHBOARD
function renderDashboard() {
  content.innerHTML = `
    <div class="welcome">
      <h2>Good Morning, Admin</h2>
      <p>Here's what's happening with your business today.</p>
    </div>

    <div class="stats-grid">
      ${statCard("Total Sales","Rp 125.000.000","12% vs last month","wallet")}
      ${statCard("Total Customers","48","8% vs last month","users")}
      ${statCard("Total Purchase","Rp 87.500.000","7% vs last month","shopping-bag")}
      ${statCard("Production Output","1.250 Kg","10% vs last month","factory")}
    </div>

    <div class="dashboard-grid">
      <div class="panel">
        <h3>Sales Overview (Last 6 Months)</h3>
        <canvas id="salesChart"></canvas>
      </div>
      <div class="panel">
        <h3>Payment Status</h3>
        <canvas id="paymentChart"></canvas>
      </div>
      <div class="panel panel-full">
        <h3>Recent Transactions</h3>
        ${miniTransactionTable()}
      </div>
    </div>
  `;
  drawDashboardCharts();
  refreshIcons();
}

function statCard(label,value,change,icon) {
  return `
    <div class="stat-card">
      <div class="stat-top">
        <span class="stat-label">${label}</span>
        <span class="stat-icon"><i data-lucide="${icon}"></i></span>
      </div>
      <div class="stat-value">${value}</div>
      <div class="stat-change">↑ ${change}</div>
    </div>`;
}

function miniTransactionTable() {
  return `
    <div class="table-scroll"><table>
      <thead><tr><th>Invoice</th><th>Customer</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td>INV-0001</td><td>PT ABC</td><td>12 Apr 2025</td><td>Rp 10.000.000</td><td>${status("Paid")}</td></tr>
        <tr><td>INV-0002</td><td>CV Sejahtera</td><td>10 Apr 2025</td><td>Rp 5.500.000</td><td>${status("Paid")}</td></tr>
        <tr><td>INV-0003</td><td>UD Maju Jaya</td><td>5 Apr 2025</td><td>Rp 8.750.000</td><td>${status("Unpaid")}</td></tr>
        <tr><td>INV-0004</td><td>PT Sinar Mas</td><td>1 Apr 2025</td><td>Rp 12.000.000</td><td>${status("Partial")}</td></tr>
      </tbody>
    </table></div>`;
}

function drawDashboardCharts() {
  chartInstances.forEach(c => c.destroy());
  chartInstances = [];

  if (typeof Chart === "undefined") return;

  const sales = document.getElementById("salesChart");
  const payment = document.getElementById("paymentChart");

  if (sales) {
    chartInstances.push(new Chart(sales,{
      type:"bar",
      data:{
        labels:["Jan","Feb","Mar","Apr","May","Jun"],
        datasets:[{
          label:"Sales",
          data:[45,60,52,80,72,110],
          backgroundColor:"#16845e",
          borderRadius:4
        }]
      },
      options:{
        responsive:true,
        maintainAspectRatio:true,
        plugins:{legend:{display:false}},
        scales:{y:{beginAtZero:true,grid:{color:"#eef2ef"}}}
      }
    }));
  }

  if (payment) {
    chartInstances.push(new Chart(payment,{
      type:"doughnut",
      data:{
        labels:["Paid","Partially Paid","Unpaid"],
        datasets:[{
          data:[65,20,15],
          backgroundColor:["#087653","#e8a23b","#e86d5d"],
          borderWidth:0
        }]
      },
      options:{responsive:true,plugins:{legend:{position:"bottom"}}}
    }));
  }
}

// TABLE GENERATOR
function renderTable(page) {
  const config = configs[page];
  const rows = db[config.key];

  content.innerHTML = `
    <div class="page-heading">
      <div>
        <h2>${config.title}</h2>
        <p>Manage and monitor your ${config.title.toLowerCase()} data.</p>
      </div>
      <div class="heading-actions">
        <button class="primary-btn small-btn" id="addBtn">
          + ${config.button}
        </button>
      </div>
    </div>

    <div class="toolbar">
      <div class="search-box">
        <i data-lucide="search"></i>
        <input id="tableSearch" placeholder="Search ${config.title.toLowerCase()}...">
      </div>
      <select id="statusFilter">
        <option value="">All Status</option>
        <option>Active</option>
        <option>Paid</option>
        <option>Unpaid</option>
        <option>Pending</option>
        <option>Completed</option>
        <option>Delivered</option>
        <option>Low Stock</option>
      </select>
    </div>

    <div class="table-panel">
      <div class="table-scroll">
        <table>
          <thead><tr>${config.headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead>
          <tbody id="tableBody"></tbody>
        </table>
      </div>
      <div class="table-footer">
        <span id="tableCount"></span>
        <span>Mandiri Farm Database</span>
      </div>
    </div>
  `;

  document.getElementById("addBtn").onclick = () => openModal(page);
  document.getElementById("tableSearch").addEventListener("input", filterTable);
  document.getElementById("statusFilter").addEventListener("change", filterTable);
  filterTable();
  refreshIcons();
}

function filterTable() {
  const config = configs[currentPage];
  if (!config) return;

  const query = document.getElementById("tableSearch").value.toLowerCase();
  const filter = document.getElementById("statusFilter").value;
  const rows = db[config.key];

  const filtered = rows.filter(row => {
    const matchesSearch = Object.values(row).join(" ").toLowerCase().includes(query);
    const matchesStatus = !filter || row.status === filter;
    return matchesSearch && matchesStatus;
  });

  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = filtered.map(row => {
    const originalIndex = rows.indexOf(row);
    let cells = config.columns.map(col => {
      if (col === "status") return `<td>${status(row[col])}</td>`;
      return `<td>${escapeHTML(row[col] ?? "-")}</td>`;
    }).join("");

    return `<tr>
      <td>${originalIndex + 1}</td>
      ${cells}
      <td>
        <button class="action-btn" onclick="editRow('${config.key}',${originalIndex})" title="Edit"><i data-lucide="pencil"></i></button>
        <button class="action-btn delete" onclick="deleteRow('${config.key}',${originalIndex})" title="Delete"><i data-lucide="trash-2"></i></button>
      </td>
    </tr>`;
  }).join("");

  document.getElementById("tableCount").textContent =
    `Showing ${filtered.length} of ${rows.length} records`;

  refreshIcons();
}

function status(value) {
  const cls = String(value || "").toLowerCase().replaceAll(" ","-");
  return `<span class="status ${cls}">${escapeHTML(value || "-")}</span>`;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  })[char]);
}

// ADD / EDIT MODAL
function openModal(page, index = null) {
  const config = configs[page];
  currentKey = config.key;
  currentFields = config.fields;
  editingIndex = index;

  const row = index !== null ? db[currentKey][index] : {};
  document.getElementById("modalTitle").textContent =
    index !== null ? "Edit " + config.title : config.button;

  document.getElementById("modalFields").innerHTML =
    currentFields.map(field => {
      const value = row[field] || "";
      const label = field.replace(/([A-Z])/g," $1")
        .replace(/^./,s=>s.toUpperCase());

      let input = `<input name="${field}" value="${escapeHTML(value)}" placeholder="Enter ${label.toLowerCase()}" required>`;

      if (field === "status") {
        input = `<select name="${field}">
          ${["Active","Paid","Unpaid","Pending","Completed","Delivered","On Delivery","Scheduled","Low Stock","In Stock","Partial"].map(s=>`<option ${value===s?"selected":""}>${s}</option>`).join("")}
        </select>`;
      }

      if (field === "date") {
        input = `<input name="${field}" type="date" value="${value}" required>`;
      }

      if (["quantity","price","total","weight","live","result","stock"].includes(field)) {
        input = `<input name="${field}" type="number" min="0" step="any" value="${value}" placeholder="Enter ${label.toLowerCase()}" required>`;
      }

      return `<div class="field"><label>${label}</label>${input}</div>`;
    }).join("");

  document.getElementById("modal").classList.remove("hidden");
  refreshIcons();
}

function editRow(key,index) {
  const page = Object.keys(configs).find(p=>configs[p].key===key);
  openModal(page,index);
}

function deleteRow(key,index) {
  if (!confirm("Are you sure you want to delete this data?")) return;
  db[key].splice(index,1);
  renderPage(currentPage);
  toast("Data deleted successfully");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

document.getElementById("closeModal").onclick = closeModal;
document.getElementById("cancelModal").onclick = closeModal;

document.getElementById("modalForm").addEventListener("submit", e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newData = {};

  currentFields.forEach(field => {
    newData[field] = formData.get(field);
  });

  if (currentKey === "sales") {
    const qty = Number(newData.quantity);
    const price = Number(newData.price);
    newData.total = (qty * price).toLocaleString("id-ID");
  }

  if (editingIndex !== null) {
    db[currentKey][editingIndex] = newData;
    toast("Data updated successfully");
  } else {
    db[currentKey].push(newData);
    toast("New data added successfully");
  }

  closeModal();
  renderPage(currentPage);
});

// CUSTOMER DETAIL
function renderCustomerDetail() {
  const customer = db.customers[0];

  content.innerHTML = `
    <div class="page-heading">
      <div><h2>Customer Detail</h2><p>Customer Management / Customer Detail</p></div>
      <button class="secondary-btn" onclick="navigate('Customer Management')">← Back to List</button>
    </div>
    <div class="profile-card">
      <div class="profile-top">
        <div class="profile-avatar">PT</div>
        <div><h3>${customer.name}</h3><p>${status(customer.status)} &nbsp; Customer</p></div>
      </div>
      <div class="summary-grid">
        <div class="summary-box"><small>Total Transaction</small><strong>Rp 52.500.000</strong></div>
        <div class="summary-box"><small>Outstanding</small><strong>Rp 3.750.000</strong></div>
      </div>
      <h3>Customer Information</h3>
      <p><b>Customer Name:</b> ${customer.name}</p>
      <p><b>Phone:</b> ${customer.phone}</p>
      <p><b>Email:</b> ${customer.email}</p>
      <p><b>Address:</b> Jl. Raya Surabaya No. 12, Surabaya</p>
      <button class="primary-btn" onclick="navigate('Invoice Management')">View Transactions</button>
    </div>`;
  refreshIcons();
}

// FINANCE
function renderFinance() {
  content.innerHTML = `
    <div class="page-heading">
      <div><h2>Finance Management</h2><p>Manage all financial activities.</p></div>
    </div>
    <div class="stats-grid">
      ${statCard("Total Revenue","Rp 125.000.000","+12% this month","wallet")}
      ${statCard("Total Expenses","Rp 87.500.000","This month","credit-card")}
      ${statCard("Net Profit","Rp 37.500.000","+8% this month","trending-up")}
      ${statCard("Outstanding","Rp 28.500.000","12 customers","receipt")}
    </div>
    <div class="dashboard-grid">
      <div class="panel">
        <h3>Finance Overview</h3>
        <canvas id="financeChart"></canvas>
      </div>
      <div class="panel">
        <h3>Finance Menu</h3>
        <div class="finance-links">
          <button class="primary-btn small-btn" onclick="navigate('Invoice Management')">Invoice Management</button>
          <button class="primary-btn small-btn" onclick="navigate('Payment Management')">Payment Management</button>
          <button class="primary-btn small-btn" onclick="navigate('Outstanding Receivables')">Outstanding Receivables</button>
        </div>
      </div>
    </div>`;
  refreshIcons();
  if (typeof Chart !== "undefined") {
    const canvas = document.getElementById("financeChart");
    chartInstances.forEach(c=>c.destroy());
    chartInstances = [];
    chartInstances.push(new Chart(canvas,{
      type:"line",
      data:{
        labels:["Jan","Feb","Mar","Apr","May","Jun"],
        datasets:[
          {label:"Revenue",data:[70,85,90,105,110,125],borderColor:"#087653",tension:.3},
          {label:"Expenses",data:[50,60,62,75,79,87],borderColor:"#e6a03c",tension:.3}
        ]
      },
      options:{responsive:true,plugins:{legend:{position:"bottom"}}}
    }));
  }
}

function renderPayments() {
  content.innerHTML = `
    <div class="page-heading">
      <div><h2>Payment Management</h2><p>Record and manage customer payments.</p></div>
      <button class="primary-btn" onclick="openPaymentForm()">+ Record Payment</button>
    </div>
    <div class="form-card">
      <h3>Payment Information</h3>
      <form id="paymentForm" class="form-grid">
        <div class="field full"><label>Invoice Number</label>
          <select name="invoice" required>
            ${db.invoices.map(i=>`<option>${i.invoice}</option>`).join("")}
          </select>
        </div>
        <div class="field"><label>Payment Date</label><input name="date" type="date" required></div>
        <div class="field"><label>Payment Amount (Rp)</label><input name="amount" type="number" min="1" required></div>
        <div class="field"><label>Payment Method</label>
          <select name="method"><option>Bank Transfer</option><option>Cash</option><option>Other</option></select>
        </div>
        <div class="field"><label>Notes</label><input name="notes" placeholder="Optional notes"></div>
        <div class="field full form-actions">
          <button type="reset" class="secondary-btn">Cancel</button>
          <button class="primary-btn">Save Payment</button>
        </div>
      </form>
    </div>
    <br>
    <div class="table-panel"><div class="table-scroll"><table>
      <thead><tr><th>No.</th><th>Invoice</th><th>Date</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
      <tbody>${db.payments.map((p,i)=>`<tr><td>${i+1}</td><td>${p.invoice}</td><td>${p.date}</td><td>Rp ${Number(p.amount).toLocaleString("id-ID")}</td><td>${p.method}</td><td>${status("Paid")}</td></tr>`).join("")}</tbody>
    </table></div></div>
  `;

  document.getElementById("paymentForm").addEventListener("submit",e=>{
    e.preventDefault();
    const p = Object.fromEntries(new FormData(e.target));
    db.payments.push(p);
    toast("Payment recorded successfully");
    renderPayments();
  });
}

function openPaymentForm() {
  document.querySelector("#paymentForm input")?.focus();
}

function renderReceivables() {
  content.innerHTML = `
    <div class="page-heading">
      <div><h2>Outstanding Receivables</h2><p>Monitor unpaid customer invoices.</p></div>
      <button class="secondary-btn" onclick="navigate('Invoice Management')">View Invoices</button>
    </div>
    <div class="summary-grid">
      <div class="summary-box"><small>Total Outstanding</small><strong>Rp 28.500.000</strong></div>
      <div class="summary-box"><small>Total Customers</small><strong>12</strong></div>
    </div>
    <div class="toolbar">
      <div class="search-box"><i data-lucide="search"></i><input id="receivableSearch" placeholder="Search customer..."></div>
    </div>
    <div class="table-panel"><div class="table-scroll"><table>
      <thead><tr><th>No.</th><th>Customer</th><th>Invoice No.</th><th>Amount</th><th>Paid</th><th>Outstanding</th><th>Due Date</th><th>Status</th></tr></thead>
      <tbody id="receivableBody">${db.receivables.map((r,i)=>`<tr><td>${i+1}</td><td>${r.customer}</td><td>${r.invoice}</td><td>Rp ${r.amount}</td><td>Rp ${r.paid}</td><td>Rp ${r.outstanding}</td><td>${r.due}</td><td>${status(r.status)}</td></tr>`).join("")}</tbody>
    </table></div></div>
  `;
  document.getElementById("receivableSearch").addEventListener("input",e=>{
    document.querySelectorAll("#receivableBody tr").forEach(row=>{
      row.style.display = row.textContent.toLowerCase().includes(e.target.value.toLowerCase())?"":"none";
    });
  });
  refreshIcons();
}

// REPORTS
function renderReports() {
  content.innerHTML = `
    <div class="page-heading">
      <div><h2>Reports & Analytics</h2><p>Business performance overview and analysis.</p></div>
      <button class="primary-btn" onclick="window.print()">Export / Print</button>
    </div>
    <div class="stats-grid">
      ${statCard("Total Sales","Rp 125.000.000","+12%","wallet")}
      ${statCard("Total Orders","120","+8%","shopping-cart")}
      ${statCard("Average Order Value","Rp 1.041.667","+5%","chart-line")}
      ${statCard("Production Output","1.250 Kg","+10%","factory")}
    </div>
    <div class="dashboard-grid">
      <div class="panel"><h3>Sales Trend</h3><canvas id="reportChart"></canvas></div>
      <div class="panel"><h3>Top Products</h3><canvas id="productChart"></canvas></div>
    </div>`;
  refreshIcons();
  if (typeof Chart !== "undefined") {
    chartInstances.forEach(c=>c.destroy());
    chartInstances = [];
    chartInstances.push(new Chart(document.getElementById("reportChart"),{
      type:"bar",
      data:{labels:["Jan","Feb","Mar","Apr","May","Jun"],datasets:[{label:"Sales",data:[45,60,55,85,75,110],backgroundColor:"#16845e",borderRadius:4}]},
      options:{responsive:true,plugins:{legend:{display:false}}}
    }));
    chartInstances.push(new Chart(document.getElementById("productChart"),{
      type:"doughnut",
      data:{labels:["Dada Ayam","Paha Ayam","Sayap Ayam","Ceker Ayam"],datasets:[{data:[35,25,25,15],backgroundColor:["#075b43","#299b70","#75b99c","#e9b45c"]}]},
      options:{responsive:true,plugins:{legend:{position:"bottom"}}}
    }));
  }
}

// PROFILE
function renderProfile() {
  content.innerHTML = `
    <div class="page-heading"><div><h2>My Profile</h2><p>Manage your personal information.</p></div></div>
    <div class="profile-card">
      <div class="profile-top">
        <div class="profile-avatar">AK</div>
        <div><h3>Akaesa Fayyaza</h3><p>Owner / Administrator</p></div>
      </div>
      <form id="profileForm" class="form-grid">
        <div class="field"><label>Full Name</label><input value="Akaesa Fayyaza" required></div>
        <div class="field"><label>Email</label><input type="email" value="admin@mandirifarm.com" required></div>
        <div class="field"><label>Phone</label><input value="0812 3456 7890"></div>
        <div class="field"><label>Role</label><input value="Owner" disabled></div>
        <div class="field full"><button class="primary-btn">Update Profile</button></div>
      </form>
    </div>`;
  document.getElementById("profileForm").onsubmit = e=>{
    e.preventDefault(); toast("Profile updated successfully");
  };
}

function renderSettings() {
  content.innerHTML = `
    <div class="page-heading"><div><h2>Settings</h2><p>Manage system preferences and security.</p></div></div>
    <div class="form-card">
      <h3>Account Security</h3>
      <form id="settingsForm">
        <div class="field"><label>Current Password</label><input type="password" required></div><br>
        <div class="field"><label>New Password</label><input type="password" required></div><br>
        <div class="field"><label>Confirm New Password</label><input type="password" required></div><br>
        <button class="primary-btn">Update Password</button>
      </form>
    </div>`;
  document.getElementById("settingsForm").onsubmit=e=>{
    e.preventDefault();
    const inputs=e.target.querySelectorAll("input");
    if(inputs[1].value!==inputs[2].value) return toast("Passwords do not match");
    toast("Password updated successfully");
    e.target.reset();
  };
}

// UTILITIES
function refreshIcons() {
  if (window.lucide) lucide.createIcons();
}

function toast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("show");
  setTimeout(()=>el.classList.remove("show"),2600);
}

// INITIAL ICONS
refreshIcons();
