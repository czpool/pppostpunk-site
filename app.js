"use strict";

const APP_STORAGE_KEY = "pppostpunk-company-portal-v2";
const LEGACY_STORAGE_KEY = "low-altitude-investment-ledger-v1";
const SESSION_STORAGE_KEY = "pppostpunk-admin-session";
const FILE_DB_NAME = "pppostpunk-source-files";
const FILE_STORE_NAME = "files";
const OWNER_NAME = "陈钰";
const INITIAL_HISTORY_ID = "initial-experiment-table";

const DEFAULT_ADMIN = {
  username: OWNER_NAME,
  salt: "pppostpunk-chenyu-2026",
  passwordHash: "bc124f99d5777bf987875cc6b1b7b11297cf591529b2a53ba122febc2dc6aaae",
  isOwner: true,
  createdAt: "2026-11-25T00:00:00.000Z"
};

const INITIAL_HISTORY = {
  id: INITIAL_HISTORY_ID,
  name: "实验表.xlsx",
  label: "初始公司信息表",
  url: "history/experiment-table-initial.xlsx",
  createdAt: "2026-11-25T00:00:00.000Z",
  source: "初始表格"
};

const CATEGORY_CONFIG = [
  { name: "全部分区", label: "全部公司", subtitle: "查看全部公司", icon: "all" },
  { name: "智慧农业类", label: "智慧农业类", subtitle: "农业低空应用", icon: "agriculture" },
  { name: "航空应急救援", label: "航空应急救援", subtitle: "应急与保障", icon: "rescue" },
  { name: "文化文旅", label: "文化文旅", subtitle: "低空文旅场景", icon: "culture" },
  { name: "城市治理（巡检等）", label: "城市治理", subtitle: "巡检与城市服务", icon: "city" }
];

const STATUS_CONFIG = [
  { name: "未接触", className: "status-untouched" },
  { name: "已联系", className: "status-contacted" },
  { name: "已拜访", className: "status-visited" },
  { name: "意向确认", className: "status-intent" },
  { name: "已签约", className: "status-signed" }
];

const STATUS_NAMES = STATUS_CONFIG.map((item) => item.name);

const ICONS = {
  all: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="6.2" height="6.2" rx="1.3" stroke="currentColor" stroke-width="1.6"/><rect x="13.8" y="4" width="6.2" height="6.2" rx="1.3" stroke="currentColor" stroke-width="1.6"/><rect x="4" y="13.8" width="6.2" height="6.2" rx="1.3" stroke="currentColor" stroke-width="1.6"/><rect x="13.8" y="13.8" width="6.2" height="6.2" rx="1.3" stroke="currentColor" stroke-width="1.6"/></svg>',
  agriculture: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19.7 4.3C12 4.5 6.2 7.4 6.2 13.3c0 2.9 2 4.7 4.6 4.7 5.9 0 8.7-5.7 8.9-13.7Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M5 20c2.2-4.8 5-7.7 9.4-10.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  rescue: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.5v17M3.5 12h17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="12" r="8.2" stroke="currentColor" stroke-width="1.6"/></svg>',
  culture: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3.8 9.4 8.2-5 8.2 5H3.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M5.8 9.4v8.9M9.6 9.4v8.9M14.4 9.4v8.9M18.2 9.4v8.9M3.8 18.3h16.4M4.6 20.3h14.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  city: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 20V7.5h7V20M11.5 20V4h8v16M7.2 10.5h1.5M7.2 13.5h1.5M7.2 16.5h1.5M14.5 7h2.2M14.5 10.2h2.2M14.5 13.4h2.2M14.5 16.6h2.2M3 20h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7.5 10 4.5 4.5 4.5-4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 5h5v5M19 5l-7.2 7.2M18.3 13.2v5.1H5.7V5.7h5.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.1 4.6 9 8.7 7.2 10c.7 2.6 3.3 5.2 5.9 5.9l1.3-1.8 4.1 1.9-.6 2.4c-.2.8-.9 1.3-1.7 1.2C9.7 18.9 5.1 14.3 4.4 7.8c-.1-.8.4-1.5 1.2-1.7l1.5-1.5Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.7" cy="10.7" r="6.2" stroke="currentColor" stroke-width="1.7"/><path d="m15.3 15.3 4.2 4.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3.8h6.2L18 8.6v11.6H7V3.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M13 3.8v5h5M9.6 12.2h5.8M9.6 15.6h5.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 16.8-.7 3.2 3.2-.7L18.7 8.1l-2.5-2.5L5 16.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="m14.7 7.1 2.5 2.5" stroke="currentColor" stroke-width="1.6"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.8 7.2h14.4M9.2 7.2V5h5.6v2.2M7.1 7.2l.7 11.1h8.4l.7-11.1M10.2 10.2v4.8M13.8 10.2v4.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
};

const BASE_COMPANIES = [
  {
    id: "jifeng", name: "吉峰科技", fullName: "吉峰科技（吉峰三农科技服务股份有限公司）", contact: "杨磊", phone: "15867297507",
    website: "https://baike.quark.cn/baike?id=8d0ffe87da2b47ef96b75b32e9482b23", linkLabel: "资料页", category: "智慧农业类", industryRole: "场景运营与配套服务",
    positioning: "国内农机流通行业首家全国布局上市公司，当前采用低空经济 + 农业双轮驱动战略。四大业务板块覆盖低空生态建设运营、农机连锁流通、高端特色农机制造、农事综合服务；低空方向主打地方低空全域运营和无人机场景落地，农业端拥有保护性耕作农机自研制造能力，并依托全国渠道提供农业装备与农事服务。",
    note: "", analysis: "低空经济与农业双轮驱动，核心优势在农机流通、农事服务和地方低空场景运营，优先归入智慧农业场景。"
  },
  {
    id: "jimu", name: "极目机器人", fullName: "极目集团公司（苏州极目机器人科技有限公司）", contact: "张剑军", phone: "18739997673",
    website: "https://szjm.nongji1688.com/", linkLabel: "企业页面", category: "智慧农业类", industryRole: "整机制造",
    positioning: "经营范围包括智能无人飞行器研发制造销售、机器视觉、农业智能装备、巡检装备和技术服务。公司以双目视觉 + AI 自主感知控制为核心，专注户外复杂环境智能无人装备；主打农业植保无人机，同时布局电力巡检、农林和低空相关应用场景，提供整机与配套作业解决方案。",
    note: "", analysis: "以农业植保无人机为核心产品和第一大应用场景，巡检作为延伸能力不单独重复归类，整体归入智慧农业。"
  },
  {
    id: "huida", name: "惠达科技", fullName: "黑龙江惠达科技股份有限公司", contact: "", phone: "400-888-0787",
    website: "https://www.huidatech.cn/home", linkLabel: "官方网站", category: "智慧农业类", industryRole: "整机制造",
    positioning: "智慧农业整体方案服务商，融合北斗、AI、物联网技术；自研农机自动驾驶终端、农业植保无人机、智能灌溉设备，提供耕种管收全链条智能装备与无人农场落地运营服务，并布局低空农业应用场景。",
    note: "", analysis: "主营业务覆盖智慧农业装备、无人农场和低空农业应用，产品与服务体系完整，归入智慧农业。"
  },
  {
    id: "huanguo", name: "上海寰果", fullName: "上海寰果信息科技有限公司", contact: "", phone: "400-888-0787",
    website: "https://m.tianyancha.com/company/2328218924?uc_biz_str=OPT%253ATOOLBAR_STYLE%25401%257COPT%253ABACK_BTN_STYLE%25400&isnew=1", linkLabel: "企业资料", category: "航空应急救援", industryRole: "整机制造 / 研发",
    positioning: "惠达科技旗下研发主体，依托北斗与自研飞控技术，打造耕种管收全流程智慧农业装备与数字化平台；主营农业无人机、农机自动驾驶系统，同步拓展重载无人机、低空应急、低空物流等空地一体化低空应用场景。",
    note: "黑龙江惠达科技股份有限公司 100% 控股上海寰果信息科技有限公司，寰果为惠达全资子公司。\n黑龙江惠达：集团主体，负责整体业务、市场、整机、项目落地、无人农场方案。\n上海寰果：集团核心研发中心，负责飞控、北斗、无人机、农机自动驾驶软硬件研发，新产品技术预研，同时对外参展低空相关展会。",
    analysis: "除农业研发外，明确布局重载无人机、低空应急和低空物流。为避免与母公司惠达重复进入智慧农业，按差异化能力归入航空应急救援保障链。"
  },
  {
    id: "huaxing", name: "华星北斗", fullName: "华星北斗（郑州）科技有限公司", contact: "", phone: "400-6899-958",
    website: "https://www.tianyancha.com/company/4202547303", linkLabel: "企业资料", category: "智慧农业类", industryRole: "机载部件与电子",
    positioning: "专注北斗导航与农机自动驾驶终端、测绘装备研发生产，自研测亩无人机、农机监控系统和测绘测量仪器；面向农业、测绘领域提供北斗定位终端及配套解决方案，布局低空测绘和农业低空应用场景。",
    note: "", analysis: "北斗导航、农机自动驾驶与测亩无人机直接服务农业精准作业，主要客户和落地场景以农业为主，归入智慧农业。"
  },
  {
    id: "jifei", name: "极飞科技", fullName: "广州极飞科技股份有限公司", contact: "", phone: "400-980-3131",
    website: "https://www.xa.com/", linkLabel: "官方网站", category: "智慧农业类", industryRole: "整机制造",
    positioning: "全球头部农业机器人与低空装备企业，自主研发农业无人机、遥感无人机、农机自驾仪和农业无人车；提供耕、种、管、收全周期智慧农业解决方案，产品覆盖全球 70 多个国家，并同步布局低空测绘、低空物流相关技术落地。",
    note: "", analysis: "农业无人机、遥感无人机与农业无人车构成完整智慧农业产品矩阵，核心场景和收入方向均在农业，归入智慧农业。"
  },
  {
    id: "hezhong", name: "合众思壮导航", fullName: "西安合众思壮导航技术有限公司", contact: "", phone: "400-065-9967",
    website: "https://baike.baidu.com/item/%E8%A5%BF%E5%AE%89%E5%90%88%E4%BC%97%E6%80%9D%E5%A3%AE%E5%AF%BC%E8%88%AA%E6%8A%80%E6%9C%AF%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/20530708", linkLabel: "企业资料", category: "智慧农业类", industryRole: "机载部件与电子",
    positioning: "合众思壮旗下精准农业装备核心研发制造主体，主打北斗高精度农机自动驾驶系统、农业导航终端；面向大田农业提供北斗精准作业方案，同时服务测绘、地理信息领域，支撑低空测绘和农业低空作业场景落地。",
    note: "", analysis: "精准农业装备与北斗农机自动驾驶是主业，低空测绘是配套能力，按主要业务场景归入智慧农业。"
  },
  {
    id: "huace", name: "华测导航", fullName: "上海华测导航技术股份有限公司", contact: "", phone: "400-620-6818",
    website: "https://www.huace.cn/", linkLabel: "官方网站", category: "城市治理（巡检等）", industryRole: "机载部件与电子",
    positioning: "国内高精度北斗时空信息龙头企业，自研 GNSS 核心芯片和星地一体增强服务平台；产品包括航测无人机、机载激光雷达、无人机场和农机自动驾驶终端，面向测绘、自然资源、应急救援、电力巡检、智慧农业提供空地一体化低空数据采集与解决方案。",
    note: "", analysis: "产品同时服务测绘、自然资源、应急救援和电力巡检。相较单一农业场景，其空地一体化数据能力更适合城市治理与巡检分区，故唯一归入城市治理。",
    extraContact: "+86 185 0176 3009 / WhatsApp: +86 188 1065 2463 / yutao_feng@huace.cn",
    image: "assets/huace-qr.jpeg", imageLabel: "表格内附图 / 二维码"
  },
  {
    id: "yunchen", name: "重庆云宸", fullName: "重庆云宸新能源科技有限公司", contact: "", phone: "400-023-0035",
    website: "http://www.cqcpt.com/", linkLabel: "官方网站", category: "航空应急救援", industryRole: "动力与能源",
    positioning: "专注锂电储能与动力电池系统、BMS 电池管理系统研发生产，面向工程机械、特种设备、工商业储能提供智慧能源方案；可配套无人机、低空装备动力电源与储能系统，是低空装备上游电池供应商。",
    note: "", analysis: "作为低空装备动力电池与储能配套企业，在航空应急救援分区承担能源保障和持续作业支撑角色，归入应急保障链。"
  },
  {
    id: "weier", name: "纬尔科技", fullName: "深圳市纬尔科技有限公司（Viewertech）", contact: "", phone: "400-880-8193",
    website: "https://viewer.tech/?page_id=413", linkLabel: "官方网站", category: "智慧农业类", industryRole: "低空弱相关",
    positioning: "大田农业地面智能机器人厂商，自研棉花打顶、除草作业机器人，结合 AI 视觉与农艺大模型，提供田间精准作业和农业数字化方案，可与低空遥感形成空地协同。",
    note: "", analysis: "企业本体为地面农业机器人，但与低空遥感可形成空地协同，属于智慧农业生态补充，归入智慧农业。"
  }
];

const state = {
  category: "全部分区",
  status: "全部状态",
  query: ""
};

let companies = [];
let admins = [];
let historyFiles = [];
let currentAdmin = null;
let pendingImageData = "";
let saveTimers = new Map();
let toastTimer;
let fileDbPromise = null;

const elements = {
  categoryNav: document.getElementById("category-nav"),
  companyGrid: document.getElementById("company-grid"),
  boardTitle: document.getElementById("board-title"),
  resultCount: document.getElementById("result-count"),
  resultMeta: document.getElementById("result-meta"),
  clearFilters: document.getElementById("clear-filters"),
  search: document.getElementById("company-search"),
  statusFilter: document.getElementById("status-filter"),
  loginButton: document.getElementById("login-button"),
  adminSession: document.getElementById("admin-session"),
  adminName: document.getElementById("admin-name"),
  adminAvatar: document.getElementById("admin-avatar"),
  adminToolbar: document.getElementById("admin-toolbar"),
  manageAdminsButton: document.getElementById("manage-admins-button"),
  historyList: document.getElementById("history-list"),
  historyCount: document.getElementById("history-count"),
  historyNote: document.getElementById("history-note"),
  toast: document.getElementById("toast")
};

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[character]));
}

function formatMultiline(value) {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function getStatusMeta(statusName) {
  return STATUS_CONFIG.find((item) => item.name === statusName) || STATUS_CONFIG[0];
}

function getCompanyById(id) {
  return companies.find((company) => company.id === id);
}

function getAdminByName(name) {
  return admins.find((admin) => admin.username === name);
}

function isLoggedIn() {
  return Boolean(currentAdmin && getAdminByName(currentAdmin));
}

function isOwner() {
  return isLoggedIn() && currentAdmin === OWNER_NAME;
}

function getPhoneHref(phone) {
  const normalized = String(phone || "").replace(/[^\d+]/g, "");
  return normalized ? `tel:${normalized}` : "";
}

function getCategoryCount(categoryName) {
  if (categoryName === "全部分区") return companies.length;
  return companies.filter((company) => company.category === categoryName).length;
}

function normalizeKey(value) {
  return String(value || "").toLowerCase().replace(/[\s（）()【】\[\]。.,，·:：\-—_/\\]/g, "");
}

function shortCompanyName(fullName) {
  const text = String(fullName || "").trim();
  const withoutParentheses = text.replace(/（[^）]*）/g, "").replace(/\([^\)]*\)/g, "").trim();
  return withoutParentheses || text;
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function safeReadJson(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function normalizeCompany(company) {
  const category = CATEGORY_CONFIG.some((item) => item.name === company.category) ? company.category : "智慧农业类";
  return {
    id: company.id || createId("company"),
    name: company.name || shortCompanyName(company.fullName) || "未命名公司",
    fullName: company.fullName || company.name || "",
    contact: company.contact || "",
    phone: company.phone || "",
    website: company.website || "",
    linkLabel: company.linkLabel || "企业资料",
    category,
    industryRole: company.industryRole || "待补充",
    positioning: company.positioning || "",
    note: company.note || "",
    analysis: company.analysis || "按公司主营业务场景进行唯一归类。",
    extraContact: company.extraContact || "",
    image: company.image || "",
    imageLabel: company.imageLabel || "二维码 / 图片资料",
    status: STATUS_NAMES.includes(company.status) ? company.status : "未接触",
    progress: typeof company.progress === "string" ? company.progress : "",
    createdAt: company.createdAt || new Date().toISOString(),
    updatedAt: company.updatedAt || new Date().toISOString()
  };
}

function initializeData() {
  const saved = safeReadJson(APP_STORAGE_KEY);
  const legacy = safeReadJson(LEGACY_STORAGE_KEY) || {};

  if (saved && Array.isArray(saved.companies)) {
    companies = saved.companies.map(normalizeCompany);
    admins = Array.isArray(saved.admins) && saved.admins.length ? saved.admins : [DEFAULT_ADMIN];
    historyFiles = Array.isArray(saved.historyFiles) ? saved.historyFiles : [];
  } else {
    companies = BASE_COMPANIES.map((company) => normalizeCompany({
      ...company,
      status: legacy[company.id]?.status || "未接触",
      progress: legacy[company.id]?.progress || ""
    }));
    admins = [DEFAULT_ADMIN];
    historyFiles = [INITIAL_HISTORY];
  }

  if (!admins.some((admin) => admin.username === OWNER_NAME)) admins.unshift(DEFAULT_ADMIN);
  if (!historyFiles.some((item) => item.id === INITIAL_HISTORY_ID)) historyFiles.unshift(INITIAL_HISTORY);

  const sessionName = sessionStorage.getItem(SESSION_STORAGE_KEY);
  currentAdmin = getAdminByName(sessionName) ? sessionName : null;
  persistData(false);
}

function persistData(showError = true) {
  try {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify({
      version: 2,
      updatedAt: new Date().toISOString(),
      companies,
      admins,
      historyFiles
    }));
    return true;
  } catch (error) {
    if (showError) showToast("保存失败：浏览器存储空间不足或不可用。");
    return false;
  }
}

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((value) => value.toString(16).padStart(2, "0")).join("");
}

function randomSalt() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((value) => value.toString(16).padStart(2, "0")).join("");
}

function showToast(message) {
  clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  toastTimer = setTimeout(() => elements.toast.classList.remove("is-visible"), 2600);
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  const focusTarget = modal.querySelector("input, select, textarea, button");
  if (focusTarget) setTimeout(() => focusTarget.focus(), 50);
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.hidden = true;
  if (!document.querySelector(".modal-shell:not([hidden])")) document.body.style.overflow = "";
}

function renderDate() {
  document.getElementById("current-date").textContent = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric", month: "long", day: "numeric", weekday: "short"
  }).format(new Date());
}

function renderCategoryNav() {
  elements.categoryNav.innerHTML = CATEGORY_CONFIG.map((category) => {
    const active = state.category === category.name;
    return `
      <button class="nav-item ${active ? "is-active" : ""}" type="button" data-category="${escapeHtml(category.name)}" aria-pressed="${active}">
        <span class="nav-icon">${ICONS[category.icon]}</span>
        <span class="nav-text"><span>${escapeHtml(category.label)}</span><small>${escapeHtml(category.subtitle)}</small></span>
        <span class="nav-count">${getCategoryCount(category.name)}</span>
      </button>
    `;
  }).join("");
}

function renderMetrics() {
  document.getElementById("stat-total").textContent = companies.length;
  document.getElementById("stat-categories").textContent = CATEGORY_CONFIG
    .slice(1)
    .filter((category) => getCategoryCount(category.name) > 0).length;
  document.getElementById("stat-followed").textContent = companies.filter((company) => company.status !== "未接触").length;
  document.getElementById("stat-signed").textContent = companies.filter((company) => company.status === "已签约").length;
}

function renderAuthUI() {
  const logged = isLoggedIn();
  elements.loginButton.hidden = logged;
  elements.adminSession.hidden = !logged;
  elements.adminToolbar.hidden = !logged;
  elements.manageAdminsButton.hidden = !isOwner();
  if (logged) {
    elements.adminName.textContent = currentAdmin;
    elements.adminAvatar.textContent = currentAdmin.slice(0, 1);
  }
}

function renderStatusOptions(company, editable) {
  const disabled = editable ? "" : "disabled";
  return STATUS_CONFIG.map((status) => {
    const active = company.status === status.name;
    return `<button class="status-option ${status.className} ${active ? "is-active" : ""}" type="button" data-set-status="${escapeHtml(status.name)}" aria-pressed="${active}" ${disabled}>${escapeHtml(status.name)}</button>`;
  }).join("");
}

function renderCompanyCard(company) {
  const statusMeta = getStatusMeta(company.status);
  const editable = isLoggedIn();
  const phoneHref = getPhoneHref(company.phone);
  const adminActions = editable ? `
    <div class="company-admin-actions">
      <button class="icon-action" type="button" data-edit-company="${escapeHtml(company.id)}" title="编辑公司" aria-label="编辑公司">${ICONS.edit}</button>
      <button class="icon-action danger" type="button" data-delete-company="${escapeHtml(company.id)}" title="删除公司" aria-label="删除公司">${ICONS.trash}</button>
    </div>` : "";
  const websiteLink = company.website
    ? `<a class="contact-link" href="${escapeHtml(company.website)}" target="_blank" rel="noopener noreferrer">${escapeHtml(company.linkLabel || "企业资料")} ↗</a>`
    : `<span class="contact-value">待补充</span>`;
  const noteBlock = company.note ? `<h4>备注信息</h4><p class="detail-note">${formatMultiline(company.note)}</p>` : "";
  const extraContactBlock = company.extraContact ? `<h4>补充联系方式</h4><p>${escapeHtml(company.extraContact)}</p>` : "";
  const imageBlock = company.image ? `
    <div class="image-resource">
      <a href="${escapeHtml(company.image)}" target="_blank" rel="noopener noreferrer"><img src="${escapeHtml(company.image)}" alt="${escapeHtml(company.name)}二维码或图片资料" loading="lazy"></a>
      <div><strong>${escapeHtml(company.imageLabel || "二维码 / 图片资料")}</strong><span>来自原始表格附图，点击图片可查看原图。</span></div>
    </div>` : "";
  const progressContent = editable
    ? `<textarea data-progress="${escapeHtml(company.id)}" rows="5" placeholder="记录沟通情况、下一步动作、负责人等">${escapeHtml(company.progress)}</textarea>`
    : `<div class="progress-placeholder">${company.progress ? formatMultiline(company.progress) : "暂无进度记录"}</div>`;

  return `
    <article class="company-card" data-company-id="${escapeHtml(company.id)}">
      <div class="company-main">
        <div class="company-card__top">
          <div class="company-avatar" data-category="${escapeHtml(company.category)}" aria-hidden="true">${escapeHtml(company.name.slice(0, 1))}</div>
          <div class="company-heading">
            <div class="company-tags">
              <span class="category-tag" data-category="${escapeHtml(company.category)}">${escapeHtml(company.category)}</span>
              <span class="role-tag">${escapeHtml(company.industryRole)}</span>
            </div>
            <h3 title="${escapeHtml(company.fullName)}">${escapeHtml(company.name)}</h3>
            <p class="company-fullname">${escapeHtml(company.fullName)}</p>
          </div>
          ${adminActions}
        </div>
        <div class="contact-strip">
          <div class="contact-item"><span class="contact-label">联系人</span><span class="contact-value">${escapeHtml(company.contact || "待补充")}</span></div>
          <div class="contact-item"><span class="contact-label">联系电话</span>${phoneHref ? `<a class="contact-link" href="${escapeHtml(phoneHref)}">${escapeHtml(company.phone)}</a>` : '<span class="contact-value">待补充</span>'}</div>
          <div class="contact-item"><span class="contact-label">企业资料</span>${websiteLink}</div>
        </div>
        <p class="company-summary">${escapeHtml(company.positioning || "暂无公司定位信息")}</p>
        <div class="fit-reason"><span>归类依据</span><p>${escapeHtml(company.analysis || "暂无归类说明")}</p></div>
        <details class="company-details">
          <summary>查看完整资料${ICONS.chevron}</summary>
          <div class="detail-content">
            ${imageBlock}
            <h4>公司定位</h4><p>${escapeHtml(company.positioning || "暂无")}</p>
            <h4>产业链标签</h4><p>${escapeHtml(company.industryRole || "待补充")}</p>
            ${extraContactBlock}
            ${noteBlock}
          </div>
        </details>
      </div>
      <aside class="company-side">
        <div class="side-heading"><span>跟进状态</span><span class="status-chip ${statusMeta.className}" data-status-chip>${escapeHtml(company.status)}</span></div>
        <div class="status-options" role="group" aria-label="${escapeHtml(company.name)}跟进状态">${renderStatusOptions(company, editable)}</div>
        <div class="progress-block">
          <div class="field-heading"><label>目前进度</label><span class="save-state" data-save-for="${escapeHtml(company.id)}">${editable ? "自动保存" : "管理员可编辑"}</span></div>
          ${progressContent}
        </div>
        ${editable ? "" : '<p class="side-note">登录管理员后可以修改公司信息、跟进状态和进度。</p>'}
      </aside>
    </article>
  `;
}

function companyMatchesQuery(company, query) {
  if (!query) return true;
  return [company.name, company.fullName, company.contact, company.phone, company.category, company.industryRole, company.positioning, company.note, company.analysis, company.extraContact, company.status, company.progress]
    .join(" ").toLowerCase().includes(query.toLowerCase());
}

function getFilteredCompanies() {
  const query = state.query.trim();
  return companies.filter((company) => {
    const categoryMatch = state.category === "全部分区" || company.category === state.category;
    const statusMatch = state.status === "全部状态" || company.status === state.status;
    return categoryMatch && statusMatch && companyMatchesQuery(company, query);
  });
}

function renderEmptyState() {
  const categoryEmpty = state.category !== "全部分区" && getCategoryCount(state.category) === 0;
  const filtered = state.query.trim() || state.status !== "全部状态" || state.category !== "全部分区";
  const title = categoryEmpty && !state.query.trim() && state.status === "全部状态" ? `${state.category}暂无公司` : "没有找到匹配公司";
  const description = categoryEmpty && !state.query.trim() && state.status === "全部状态"
    ? "当前信息库中暂无该分区的公司，登录管理员后可新增或导入表格。"
    : "请尝试更换关键词、跟进状态或产业分区。";
  elements.companyGrid.innerHTML = `<div class="empty-state"><span class="empty-icon">${ICONS.search}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p>${filtered ? '<button type="button" data-empty-reset>查看全部公司</button>' : ""}</div>`;
}

function renderBoard() {
  const filtered = getFilteredCompanies();
  const categoryLabel = state.category === "全部分区" ? "全部公司" : state.category;
  const labels = [];
  if (state.query.trim()) labels.push(`搜索“${state.query.trim()}”`);
  if (state.status !== "全部状态") labels.push(state.status);
  elements.boardTitle.textContent = categoryLabel;
  elements.resultCount.textContent = `${filtered.length} 家`;
  elements.resultMeta.textContent = labels.length ? `当前筛选：${labels.join(" · ")}` : "查看公司基础信息与招商进度";
  elements.clearFilters.hidden = !(state.query.trim() || state.status !== "全部状态" || state.category !== "全部分区");
  if (!filtered.length) renderEmptyState();
  else elements.companyGrid.innerHTML = filtered.map(renderCompanyCard).join("");
}

function renderHistory() {
  elements.historyCount.textContent = `${historyFiles.length} 份`;
  elements.historyList.innerHTML = historyFiles.map((item) => {
    const date = item.createdAt ? new Date(item.createdAt).toLocaleDateString("zh-CN") : "日期未知";
    const source = item.source || (item.local ? "管理员导入" : "历史文件");
    return `
      <div class="history-item">
        <span class="history-icon">${ICONS.file}</span>
        <div class="history-copy"><strong>${escapeHtml(item.label || item.name)}</strong><span>${escapeHtml(item.name)} · ${escapeHtml(date)} · ${escapeHtml(source)}</span></div>
        ${item.url
          ? `<a class="history-open" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">打开原表</a>`
          : `<button class="history-open" type="button" data-open-history="${escapeHtml(item.id)}">打开原表</button>`}
      </div>`;
  }).join("");
  const hasLocalFiles = historyFiles.some((item) => item.local);
  elements.historyNote.hidden = !(isLoggedIn() && hasLocalFiles);
}

function renderAll() {
  renderCategoryNav();
  renderMetrics();
  renderAuthUI();
  renderBoard();
  renderHistory();
}

function resetFilters() {
  state.category = "全部分区";
  state.status = "全部状态";
  state.query = "";
  elements.search.value = "";
  elements.statusFilter.value = "全部状态";
  renderAll();
}

function updateSaveState(companyId, text, className) {
  const label = elements.companyGrid.querySelector(`[data-save-for="${companyId}"]`);
  if (!label) return;
  label.textContent = text;
  label.className = `save-state ${className || ""}`.trim();
}

function scheduleProgressSave(companyId) {
  updateSaveState(companyId, "保存中…", "is-saving");
  clearTimeout(saveTimers.get(companyId));
  const timer = setTimeout(() => {
    const saved = persistData();
    updateSaveState(companyId, saved ? "已自动保存" : "保存失败", saved ? "is-saved" : "is-error");
    saveTimers.delete(companyId);
  }, 350);
  saveTimers.set(companyId, timer);
}

function updateCardStatus(company) {
  const card = elements.companyGrid.querySelector(`[data-company-id="${company.id}"]`);
  if (!card) return;
  const meta = getStatusMeta(company.status);
  const chip = card.querySelector("[data-status-chip]");
  if (chip) {
    chip.className = `status-chip ${meta.className}`;
    chip.textContent = company.status;
  }
  card.querySelectorAll("[data-set-status]").forEach((button) => {
    const active = button.dataset.setStatus === company.status;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

async function handleLogin(event) {
  event.preventDefault();
  const error = document.getElementById("login-error");
  error.hidden = true;
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;
  const admin = getAdminByName(username);
  if (!admin) {
    error.textContent = "账号或密码不正确。";
    error.hidden = false;
    return;
  }
  const digest = await hashPassword(password, admin.salt);
  if (digest !== admin.passwordHash) {
    error.textContent = "账号或密码不正确。";
    error.hidden = false;
    return;
  }
  currentAdmin = admin.username;
  sessionStorage.setItem(SESSION_STORAGE_KEY, currentAdmin);
  closeModal("login-modal");
  document.getElementById("login-form").reset();
  renderAll();
  showToast(`已登录：${currentAdmin}`);
}

function logout() {
  currentAdmin = null;
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
  renderAll();
  showToast("已退出管理员账号");
}

function openCompanyForm(companyId) {
  if (!isLoggedIn()) return;
  const modalTitle = document.getElementById("company-modal-title");
  const form = document.getElementById("company-form");
  const company = companyId ? getCompanyById(companyId) : null;
  form.reset();
  document.getElementById("company-form-error").hidden = true;
  document.getElementById("company-id").value = company?.id || "";
  document.getElementById("company-name").value = company?.name || "";
  document.getElementById("company-fullname").value = company?.fullName || "";
  document.getElementById("company-category").value = company?.category || "智慧农业类";
  document.getElementById("company-role").value = company?.industryRole || "";
  document.getElementById("company-contact").value = company?.contact || "";
  document.getElementById("company-phone").value = company?.phone || "";
  document.getElementById("company-website").value = company?.website || "";
  document.getElementById("company-status").value = company?.status || "未接触";
  document.getElementById("company-positioning").value = company?.positioning || "";
  document.getElementById("company-analysis").value = company?.analysis || "";
  document.getElementById("company-note").value = company?.note || "";
  document.getElementById("company-progress").value = company?.progress || "";
  document.getElementById("company-image").value = "";
  document.getElementById("remove-image").checked = false;
  pendingImageData = company?.image || "";
  renderImagePreview(pendingImageData);
  document.getElementById("remove-image-label").hidden = !company?.image;
  modalTitle.textContent = company ? "编辑公司" : "新增公司";
  openModal("company-modal");
}

function renderImagePreview(source) {
  const preview = document.getElementById("company-image-preview");
  preview.innerHTML = source ? `<img src="${escapeHtml(source)}" alt="图片预览">` : "暂无图片";
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function saveCompany(event) {
  event.preventDefault();
  if (!isLoggedIn()) return;
  const error = document.getElementById("company-form-error");
  error.hidden = true;
  const form = document.getElementById("company-form");
  const companyId = document.getElementById("company-id").value;
  const existing = companyId ? getCompanyById(companyId) : null;
  const name = document.getElementById("company-name").value.trim();
  if (!name) {
    error.textContent = "请填写公司简称。";
    error.hidden = false;
    return;
  }
  const imageFile = document.getElementById("company-image").files[0];
  let image = pendingImageData;
  if (document.getElementById("remove-image").checked) image = "";
  if (imageFile) {
    try {
      image = await readFileAsDataUrl(imageFile);
    } catch (readError) {
      error.textContent = "图片读取失败，请重新选择。";
      error.hidden = false;
      return;
    }
  }
  const values = {
    name,
    fullName: document.getElementById("company-fullname").value.trim() || name,
    category: document.getElementById("company-category").value,
    industryRole: document.getElementById("company-role").value.trim() || "待补充",
    contact: document.getElementById("company-contact").value.trim(),
    phone: document.getElementById("company-phone").value.trim(),
    website: document.getElementById("company-website").value.trim(),
    linkLabel: existing?.linkLabel || "企业资料",
    status: document.getElementById("company-status").value,
    positioning: document.getElementById("company-positioning").value.trim(),
    analysis: document.getElementById("company-analysis").value.trim() || "按公司主营业务场景进行唯一归类。",
    note: document.getElementById("company-note").value.trim(),
    progress: document.getElementById("company-progress").value.trim(),
    extraContact: existing?.extraContact || "",
    image,
    imageLabel: image ? (existing?.imageLabel || "二维码 / 图片资料") : "",
    updatedAt: new Date().toISOString()
  };
  if (existing) Object.assign(existing, values);
  else companies.push(normalizeCompany({ id: createId("company"), ...values, createdAt: new Date().toISOString() }));
  persistData();
  closeModal("company-modal");
  renderAll();
  showToast(existing ? "公司信息已更新" : "公司已新增");
}

function deleteCompany(companyId) {
  if (!isLoggedIn()) return;
  const company = getCompanyById(companyId);
  if (!company) return;
  if (!window.confirm(`确认删除“${company.name}”吗？此操作不可恢复。`)) return;
  companies = companies.filter((item) => item.id !== companyId);
  persistData();
  renderAll();
  showToast("公司信息已删除");
}

function renderAdminList() {
  const list = document.getElementById("admin-list");
  list.innerHTML = admins.map((admin) => `
    <div class="admin-row">
      <span class="admin-row-avatar">${escapeHtml(admin.username.slice(0, 1))}</span>
      <div class="admin-row-copy"><strong>${escapeHtml(admin.username)}</strong><span>${admin.isOwner ? "初始管理员" : "普通管理员"}</span></div>
      ${admin.isOwner ? '<span class="owner-badge">主管理员</span>' : `<button type="button" data-delete-admin="${escapeHtml(admin.username)}">删除</button>`}
    </div>
  `).join("");
}

function openAdminManager() {
  if (!isOwner()) return;
  document.getElementById("admin-form").reset();
  document.getElementById("admin-form-error").hidden = true;
  renderAdminList();
  openModal("admins-modal");
}

async function addAdmin(event) {
  event.preventDefault();
  if (!isOwner()) return;
  const error = document.getElementById("admin-form-error");
  error.hidden = true;
  const username = document.getElementById("new-admin-name").value.trim();
  const password = document.getElementById("new-admin-password").value;
  if (!username || password.length < 6) {
    error.textContent = "账号不能为空，密码至少 6 位。";
    error.hidden = false;
    return;
  }
  if (getAdminByName(username)) {
    error.textContent = "该管理员账号已存在。";
    error.hidden = false;
    return;
  }
  const salt = randomSalt();
  admins.push({
    username,
    salt,
    passwordHash: await hashPassword(password, salt),
    isOwner: false,
    createdAt: new Date().toISOString()
  });
  persistData();
  document.getElementById("admin-form").reset();
  renderAdminList();
  showToast(`管理员“${username}”已添加`);
}

function deleteAdmin(username) {
  if (!isOwner() || username === OWNER_NAME) return;
  if (!window.confirm(`确认删除管理员“${username}”吗？`)) return;
  admins = admins.filter((admin) => admin.username !== username);
  persistData();
  renderAdminList();
  showToast("管理员已删除");
}

function inferCategory(text) {
  const value = String(text || "");
  if (/(文旅|旅游|景区|文化|演艺|观光|文博|展馆|酒店)/.test(value)) return "文化文旅";
  if (/(应急救援|应急|救援|消防|搜救|重载|医疗救护|应急通信|救灾)/.test(value)) return "航空应急救援";
  if (/(巡检|城市治理|城管|测绘|安防|警务|电力|交通|自然资源|国土资源|城市服务)/.test(value)) return "城市治理（巡检等）";
  return "智慧农业类";
}

function normalizeHeader(value) {
  return String(value || "").replace(/\s/g, "").replace(/[：:]/g, "");
}

function getRowValue(row, headers, aliases) {
  for (const alias of aliases) {
    const index = headers.findIndex((header) => header.includes(alias));
    if (index >= 0 && String(row[index] ?? "").trim()) return String(row[index]).trim();
  }
  return "";
}

async function importSpreadsheet(file) {
  if (!isLoggedIn()) return;
  if (!window.XLSX) {
    showToast("Excel 解析组件未加载，请刷新页面后重试。");
    return;
  }
  try {
    showToast("正在解析表格…");
    const buffer = await file.arrayBuffer();
    const workbook = window.XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = window.XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "", raw: false });
    const headerIndex = rows.findIndex((row) => row.some((cell) => /(公司名称|企业名称|单位名称)/.test(String(cell))));
    if (headerIndex < 0) throw new Error("未找到“公司名称”表头，请检查表格格式。");
    const headers = rows[headerIndex].map(normalizeHeader);
    let added = 0;
    let updated = 0;

    rows.slice(headerIndex + 1).forEach((row) => {
      const fullName = getRowValue(row, headers, ["公司名称", "企业名称", "单位名称", "公司全称"]);
      if (!fullName || /^(合计|总计)$/.test(fullName)) return;
      const name = shortCompanyName(fullName);
      const role = getRowValue(row, headers, ["分类", "产业链标签", "企业类型"]);
      const positioning = getRowValue(row, headers, ["公司定位", "企业定位", "主营业务", "公司简介"]);
      const note = getRowValue(row, headers, ["备注", "备注信息"]);
      const explicitCategory = getRowValue(row, headers, ["产业分区", "分区", "所属分类", "类别"]);
      const validCategory = CATEGORY_CONFIG.find((item) => item.name === explicitCategory && item.name !== "全部分区")?.name;
      const category = validCategory || inferCategory(`${positioning} ${note} ${role} ${fullName}`);
      const contact = getRowValue(row, headers, ["联系人", "联系人姓名"]);
      const phone = getRowValue(row, headers, ["联系电话", "电话", "手机", "联系方式"]);
      const website = getRowValue(row, headers, ["企业资料链接", "网址", "网站", "公司网址", "链接"]);
      const analysis = getRowValue(row, headers, ["归类依据", "分类依据"]) || `依据“${category}”业务关键词自动归类，可在管理界面调整。`;
      const statusValue = getRowValue(row, headers, ["跟进状态", "状态"]);
      const progress = getRowValue(row, headers, ["目前进度", "进度"]);
      const extraContact = getRowValue(row, headers, ["补充联系方式", "邮箱", "邮箱地址"]);
      const key = normalizeKey(fullName);
      const existing = companies.find((company) => normalizeKey(company.fullName) === key || normalizeKey(company.name) === key);
      const payload = {
        name,
        fullName,
        contact: contact || existing?.contact || "",
        phone: phone || existing?.phone || "",
        website: website || existing?.website || "",
        category,
        industryRole: role || existing?.industryRole || "待补充",
        positioning: positioning || existing?.positioning || "",
        note: note || existing?.note || "",
        analysis,
        extraContact: extraContact || existing?.extraContact || "",
        status: STATUS_NAMES.includes(statusValue) ? statusValue : (existing?.status || "未接触"),
        progress: progress || existing?.progress || "",
        updatedAt: new Date().toISOString()
      };
      if (existing) {
        Object.assign(existing, payload);
        updated += 1;
      } else {
        companies.push(normalizeCompany({ id: createId("company"), ...payload, createdAt: new Date().toISOString() }));
        added += 1;
      }
    });

    const historyId = createId("history");
    let historySaved = false;
    try {
      await putHistoryFile(historyId, file);
      historySaved = true;
      historyFiles.unshift({
        id: historyId,
        name: file.name,
        label: file.name.replace(/\.[^.]+$/, ""),
        createdAt: new Date().toISOString(),
        source: "管理员导入",
        local: true
      });
    } catch (storageError) {
      console.warn("History file storage failed", storageError);
    }

    persistData();
    renderAll();
    showToast(`导入完成：新增 ${added} 家，更新 ${updated} 家${historySaved ? "，原始表格已加入历史记录" : "，但原始表格保存失败"}`);
  } catch (error) {
    console.error(error);
    showToast(`导入失败：${error.message || "表格格式无法识别"}`);
  } finally {
    document.getElementById("excel-file-input").value = "";
  }
}

function openFileDb() {
  if (fileDbPromise) return fileDbPromise;
  fileDbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(FILE_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(FILE_STORE_NAME)) db.createObjectStore(FILE_STORE_NAME, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return fileDbPromise;
}

async function putHistoryFile(id, file) {
  const db = await openFileDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(FILE_STORE_NAME, "readwrite");
    transaction.objectStore(FILE_STORE_NAME).put({ id, name: file.name, type: file.type, blob: file, savedAt: new Date().toISOString() });
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

async function getHistoryFile(id) {
  const db = await openFileDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(FILE_STORE_NAME, "readonly");
    const request = transaction.objectStore(FILE_STORE_NAME).get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function openHistoryRecord(id) {
  const item = historyFiles.find((history) => history.id === id);
  if (!item) return;
  if (item.url) {
    window.open(item.url, "_blank", "noopener");
    return;
  }
  try {
    const record = await getHistoryFile(id);
    if (!record?.blob) {
      showToast("原始表格只保存在导入它的浏览器中，当前浏览器找不到该文件。");
      return;
    }
    const url = URL.createObjectURL(record.blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = record.name || item.name || "history.xlsx";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (error) {
    showToast("无法打开原始表格文件。");
  }
}

function bindEvents() {
  elements.categoryNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    state.category = button.dataset.category;
    renderCategoryNav();
    renderBoard();
  });

  elements.search.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderBoard();
  });

  elements.statusFilter.addEventListener("change", (event) => {
    state.status = event.target.value;
    renderBoard();
  });

  elements.clearFilters.addEventListener("click", resetFilters);
  document.getElementById("login-button").addEventListener("click", () => openModal("login-modal"));
  document.getElementById("logout-button").addEventListener("click", logout);
  document.getElementById("login-form").addEventListener("submit", handleLogin);
  document.getElementById("company-form").addEventListener("submit", saveCompany);
  document.getElementById("admin-form").addEventListener("submit", addAdmin);
  document.getElementById("add-company-button").addEventListener("click", () => openCompanyForm());
  document.getElementById("manage-admins-button").addEventListener("click", openAdminManager);
  document.getElementById("import-history-button").addEventListener("click", () => document.getElementById("excel-file-input").click());
  document.getElementById("excel-file-input").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) importSpreadsheet(file);
  });

  document.getElementById("company-image").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      pendingImageData = await readFileAsDataUrl(file);
      renderImagePreview(pendingImageData);
      document.getElementById("remove-image").checked = false;
    } catch (error) {
      showToast("图片读取失败，请重新选择。");
    }
  });

  document.getElementById("remove-image").addEventListener("change", (event) => {
    renderImagePreview(event.target.checked ? "" : pendingImageData);
  });

  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => closeModal(button.dataset.closeModal));
  });

  document.querySelectorAll(".modal-shell").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal(modal.id);
    });
  });

  elements.companyGrid.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-edit-company]");
    if (editButton) {
      openCompanyForm(editButton.dataset.editCompany);
      return;
    }
    const deleteButton = event.target.closest("[data-delete-company]");
    if (deleteButton) {
      deleteCompany(deleteButton.dataset.deleteCompany);
      return;
    }
    const statusButton = event.target.closest("[data-set-status]");
    if (statusButton && isLoggedIn()) {
      const card = statusButton.closest("[data-company-id]");
      const company = getCompanyById(card.dataset.companyId);
      if (!company) return;
      company.status = statusButton.dataset.setStatus;
      company.updatedAt = new Date().toISOString();
      persistData();
      updateCardStatus(company);
      renderMetrics();
      showToast(`“${company.name}”已更新为：${company.status}`);
      if (state.status !== "全部状态" && state.status !== company.status) renderBoard();
      return;
    }
    const emptyReset = event.target.closest("[data-empty-reset]");
    if (emptyReset) resetFilters();
  });

  elements.companyGrid.addEventListener("input", (event) => {
    const textarea = event.target.closest("[data-progress]");
    if (!textarea || !isLoggedIn()) return;
    const company = getCompanyById(textarea.dataset.progress);
    if (!company) return;
    company.progress = textarea.value;
    company.updatedAt = new Date().toISOString();
    scheduleProgressSave(company.id);
  });

  elements.historyList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-history]");
    if (button) openHistoryRecord(button.dataset.openHistory);
  });

  document.getElementById("admin-list").addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-admin]");
    if (button) deleteAdmin(button.dataset.deleteAdmin);
  });

  document.addEventListener("keydown", (event) => {
    const activeTag = document.activeElement?.tagName;
    const typing = ["INPUT", "TEXTAREA", "SELECT"].includes(activeTag);
    if (event.key === "/" && !typing) {
      event.preventDefault();
      elements.search.focus();
    }
    if (event.key === "Escape") {
      const open = document.querySelector(".modal-shell:not([hidden])");
      if (open) closeModal(open.id);
      else if (document.activeElement === elements.search && elements.search.value) {
        elements.search.value = "";
        state.query = "";
        renderBoard();
      }
    }
  });

  window.addEventListener("beforeunload", () => {
    saveTimers.forEach((timer) => clearTimeout(timer));
    persistData(false);
  });
}

async function init() {
  initializeData();
  bindEvents();
  renderDate();
  renderAll();
}

init().catch((error) => {
  console.error(error);
  showToast("页面初始化失败，请刷新后重试。");
});
