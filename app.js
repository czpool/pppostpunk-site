"use strict";

const STORAGE_KEY = "low-altitude-investment-ledger-v1";

const CATEGORY_CONFIG = [
  { name: "全部分区", label: "全部单位", subtitle: "查看全部单位", icon: "all", countLabel: "all" },
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

const STATUS_NAMES = STATUS_CONFIG.map((status) => status.name);

const ICONS = {
  all: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="6.2" height="6.2" rx="1.3" stroke="currentColor" stroke-width="1.6"/><rect x="13.8" y="4" width="6.2" height="6.2" rx="1.3" stroke="currentColor" stroke-width="1.6"/><rect x="4" y="13.8" width="6.2" height="6.2" rx="1.3" stroke="currentColor" stroke-width="1.6"/><rect x="13.8" y="13.8" width="6.2" height="6.2" rx="1.3" stroke="currentColor" stroke-width="1.6"/></svg>',
  agriculture: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19.7 4.3C12 4.5 6.2 7.4 6.2 13.3c0 2.9 2 4.7 4.6 4.7 5.9 0 8.7-5.7 8.9-13.7Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M5 20c2.2-4.8 5-7.7 9.4-10.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  rescue: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.5v17M3.5 12h17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="12" r="8.2" stroke="currentColor" stroke-width="1.6"/></svg>',
  culture: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3.8 9.4 8.2-5 8.2 5H3.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M5.8 9.4v8.9M9.6 9.4v8.9M14.4 9.4v8.9M18.2 9.4v8.9M3.8 18.3h16.4M4.6 20.3h14.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  city: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 20V7.5h7V20M11.5 20V4h8v16M7.2 10.5h1.5M7.2 13.5h1.5M7.2 16.5h1.5M14.5 7h2.2M14.5 10.2h2.2M14.5 13.4h2.2M14.5 16.6h2.2M3 20h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7.5 10 4.5 4.5 4.5-4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 5h5v5M19 5l-7.2 7.2M18.3 13.2v5.1H5.7V5.7h5.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.1 4.6 9 8.7 7.2 10c.7 2.6 3.3 5.2 5.9 5.9l1.3-1.8 4.1 1.9-.6 2.4c-.2.8-.9 1.3-1.7 1.2C9.7 18.9 5.1 14.3 4.4 7.8c-.1-.8.4-1.5 1.2-1.7l1.5-1.5Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.7" cy="10.7" r="6.2" stroke="currentColor" stroke-width="1.7"/><path d="m15.3 15.3 4.2 4.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'
};

const companies = [
  {
    id: "jifeng",
    name: "吉峰科技",
    fullName: "吉峰科技（吉峰三农科技服务股份有限公司）",
    contact: "杨磊",
    phone: "15867297507",
    website: "https://baike.quark.cn/baike?id=8d0ffe87da2b47ef96b75b32e9482b23",
    linkLabel: "资料页",
    category: "智慧农业类",
    industryRole: "场景运营与配套服务",
    positioning: "国内农机流通行业首家全国布局上市公司，当前采用低空经济 + 农业双轮驱动战略。四大业务板块覆盖低空生态建设运营、农机连锁流通、高端特色农机制造、农事综合服务；低空方向主打地方低空全域运营和无人机场景落地，农业端拥有保护性耕作农机自研制造能力，并依托全国渠道提供农业装备与农事服务。",
    note: "",
    analysis: "低空经济与农业双轮驱动，核心优势在农机流通、农事服务和地方低空场景运营，优先归入智慧农业场景。"
  },
  {
    id: "jimu",
    name: "极目机器人",
    fullName: "极目集团公司（苏州极目机器人科技有限公司）",
    contact: "张剑军",
    phone: "18739997673",
    website: "https://szjm.nongji1688.com/",
    linkLabel: "企业页面",
    category: "智慧农业类",
    industryRole: "整机制造",
    positioning: "经营范围包括智能无人飞行器研发制造销售、机器视觉、农业智能装备、巡检装备和技术服务。公司以双目视觉 + AI 自主感知控制为核心，专注户外复杂环境智能无人装备；主打农业植保无人机，同时布局电力巡检、农林和低空相关应用场景，提供整机与配套作业解决方案。",
    note: "",
    analysis: "以农业植保无人机为核心产品和第一大应用场景，巡检作为延伸能力不单独重复归类，整体归入智慧农业。"
  },
  {
    id: "huida",
    name: "惠达科技",
    fullName: "黑龙江惠达科技股份有限公司",
    contact: "",
    phone: "400-888-0787",
    website: "https://www.huidatech.cn/home",
    linkLabel: "官方网站",
    category: "智慧农业类",
    industryRole: "整机制造",
    positioning: "智慧农业整体方案服务商，融合北斗、AI、物联网技术；自研农机自动驾驶终端、农业植保无人机、智能灌溉设备，提供耕种管收全链条智能装备与无人农场落地运营服务，并布局低空农业应用场景。",
    note: "",
    analysis: "主营业务覆盖智慧农业装备、无人农场和低空农业应用，产品与服务体系完整，归入智慧农业。"
  },
  {
    id: "huanguo",
    name: "上海寰果",
    fullName: "上海寰果信息科技有限公司",
    contact: "",
    phone: "400-888-0787",
    website: "https://m.tianyancha.com/company/2328218924?uc_biz_str=OPT%253ATOOLBAR_STYLE%25401%257COPT%253ABACK_BTN_STYLE%25400&isnew=1",
    linkLabel: "企业资料",
    category: "航空应急救援",
    industryRole: "整机制造 / 研发",
    positioning: "惠达科技旗下研发主体，依托北斗与自研飞控技术，打造耕种管收全流程智慧农业装备与数字化平台；主营农业无人机、农机自动驾驶系统，同步拓展重载无人机、低空应急、低空物流等空地一体化低空应用场景。",
    note: "黑龙江惠达科技股份有限公司 100% 控股上海寰果信息科技有限公司，寰果为惠达全资子公司。\n黑龙江惠达：集团主体，负责整体业务、市场、整机、项目落地、无人农场方案。\n上海寰果：集团核心研发中心，负责飞控、北斗、无人机、农机自动驾驶软硬件研发，新产品技术预研，同时对外参展低空相关展会。",
    analysis: "除农业研发外，明确布局重载无人机、低空应急和低空物流。为避免与母公司惠达重复进入智慧农业，按差异化能力归入航空应急救援保障链。"
  },
  {
    id: "huaxing",
    name: "华星北斗",
    fullName: "华星北斗（郑州）科技有限公司",
    contact: "",
    phone: "400-6899-958",
    website: "https://www.tianyancha.com/company/4202547303",
    linkLabel: "企业资料",
    category: "智慧农业类",
    industryRole: "机载部件与电子",
    positioning: "专注北斗导航与农机自动驾驶终端、测绘装备研发生产，自研测亩无人机、农机监控系统和测绘测量仪器；面向农业、测绘领域提供北斗定位终端及配套解决方案，布局低空测绘和农业低空应用场景。",
    note: "",
    analysis: "北斗导航、农机自动驾驶与测亩无人机直接服务农业精准作业，主要客户和落地场景以农业为主，归入智慧农业。"
  },
  {
    id: "jifei",
    name: "极飞科技",
    fullName: "广州极飞科技股份有限公司",
    contact: "",
    phone: "400-980-3131",
    website: "https://www.xa.com/",
    linkLabel: "官方网站",
    category: "智慧农业类",
    industryRole: "整机制造",
    positioning: "全球头部农业机器人与低空装备企业，自主研发农业无人机、遥感无人机、农机自驾仪和农业无人车；提供耕、种、管、收全周期智慧农业解决方案，产品覆盖全球 70 多个国家，并同步布局低空测绘、低空物流相关技术落地。",
    note: "",
    analysis: "农业无人机、遥感无人机与农业无人车构成完整智慧农业产品矩阵，核心场景和收入方向均在农业，归入智慧农业。"
  },
  {
    id: "hezhong",
    name: "合众思壮导航",
    fullName: "西安合众思壮导航技术有限公司",
    contact: "",
    phone: "400-065-9967",
    website: "https://baike.baidu.com/item/%E8%A5%BF%E5%AE%89%E5%90%88%E4%BC%97%E6%80%9D%E5%A3%AE%E5%AF%BC%E8%88%AA%E6%8A%80%E6%9C%AF%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/20530708",
    linkLabel: "企业资料",
    category: "智慧农业类",
    industryRole: "机载部件与电子",
    positioning: "合众思壮旗下精准农业装备核心研发制造主体，主打北斗高精度农机自动驾驶系统、农业导航终端；面向大田农业提供北斗精准作业方案，同时服务测绘、地理信息领域，支撑低空测绘和农业低空作业场景落地。",
    note: "",
    analysis: "精准农业装备与北斗农机自动驾驶是主业，低空测绘是配套能力，按主要业务场景归入智慧农业。"
  },
  {
    id: "huace",
    name: "华测导航",
    fullName: "上海华测导航技术股份有限公司",
    contact: "",
    phone: "400-620-6818",
    website: "https://www.huace.cn/",
    linkLabel: "官方网站",
    category: "城市治理（巡检等）",
    industryRole: "机载部件与电子",
    positioning: "国内高精度北斗时空信息龙头企业，自研 GNSS 核心芯片和星地一体增强服务平台；产品包括航测无人机、机载激光雷达、无人机场和农机自动驾驶终端，面向测绘、自然资源、应急救援、电力巡检、智慧农业提供空地一体化低空数据采集与解决方案。",
    note: "",
    analysis: "产品同时服务测绘、自然资源、应急救援和电力巡检。相较单一农业场景，其空地一体化数据能力更适合城市治理与巡检分区，故唯一归入城市治理。",
    extraContact: "+86 185 0176 3009 / WhatsApp: +86 188 1065 2463 / yutao_feng@huace.cn"
  },
  {
    id: "yunchen",
    name: "重庆云宸",
    fullName: "重庆云宸新能源科技有限公司",
    contact: "",
    phone: "400-023-0035",
    website: "http://www.cqcpt.com/",
    linkLabel: "官方网站",
    category: "航空应急救援",
    industryRole: "动力与能源",
    positioning: "专注锂电储能与动力电池系统、BMS 电池管理系统研发生产，面向工程机械、特种设备、工商业储能提供智慧能源方案；可配套无人机、低空装备动力电源与储能系统，是低空装备上游电池供应商。",
    note: "",
    analysis: "作为低空装备动力电池与储能配套企业，在航空应急救援分区承担能源保障和持续作业支撑角色，归入应急保障链。"
  },
  {
    id: "weier",
    name: "纬尔科技",
    fullName: "深圳市纬尔科技有限公司（Viewertech）",
    contact: "",
    phone: "400-880-8193",
    website: "https://viewer.tech/?page_id=413",
    linkLabel: "官方网站",
    category: "智慧农业类",
    industryRole: "低空弱相关",
    positioning: "大田农业地面智能机器人厂商，自研棉花打顶、除草作业机器人，结合 AI 视觉与农艺大模型，提供田间精准作业和农业数字化方案，可与低空遥感形成空地协同。",
    note: "",
    analysis: "企业本体为地面农业机器人，但与低空遥感可形成空地协同，属于智慧农业生态补充，归入智慧农业。"
  }
];

const state = {
  category: "全部分区",
  status: "全部状态",
  query: ""
};

const searchInput = document.getElementById("company-search");
const statusFilter = document.getElementById("status-filter");
const categoryNav = document.getElementById("category-nav");
const companyGrid = document.getElementById("company-grid");
const boardTitle = document.getElementById("board-title");
const resultCount = document.getElementById("result-count");
const resultMeta = document.getElementById("result-meta");
const clearFiltersButton = document.getElementById("clear-filters");
const toastElement = document.getElementById("toast");
const saveTimers = new Map();
let toastTimer;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[character]));
}

function formatMultiline(value) {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function getStatusMeta(statusName) {
  return STATUS_CONFIG.find((status) => status.name === statusName) || STATUS_CONFIG[0];
}

function getCategoryCount(categoryName) {
  if (categoryName === "全部分区") return companies.length;
  return companies.filter((company) => company.category === categoryName).length;
}

function getCompanyById(companyId) {
  return companies.find((company) => company.id === companyId);
}

function getPhoneHref(phone) {
  const normalized = String(phone || "").replace(/[^\d+]/g, "");
  return normalized ? `tel:${normalized}` : "";
}

function loadSavedRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    return {};
  }
}

function applySavedRecords() {
  const saved = loadSavedRecords();
  companies.forEach((company) => {
    const record = saved[company.id] || {};
    company.status = STATUS_NAMES.includes(record.status) ? record.status : "未接触";
    company.progress = typeof record.progress === "string" ? record.progress : "";
  });
}

function persistRecords() {
  const payload = {};
  companies.forEach((company) => {
    payload[company.id] = {
      status: company.status,
      progress: company.progress
    };
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch (error) {
    showToast("本地保存失败，请检查浏览器存储权限。");
    return false;
  }
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toastElement.textContent = message;
  toastElement.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    toastElement.classList.remove("is-visible");
  }, 2300);
}

function renderCategoryNav() {
  categoryNav.innerHTML = CATEGORY_CONFIG.map((category) => {
    const isActive = state.category === category.name;
    return `
      <button class="nav-item ${isActive ? "is-active" : ""}" type="button" data-category="${escapeHtml(category.name)}" aria-pressed="${isActive}">
        <span class="nav-icon">${ICONS[category.icon]}</span>
        <span class="nav-text">
          <span>${escapeHtml(category.label)}</span>
          <small>${escapeHtml(category.subtitle)}</small>
        </span>
        <span class="nav-count">${getCategoryCount(category.name)}</span>
      </button>
    `;
  }).join("");
}

function renderMetrics() {
  const followedCount = companies.filter((company) => company.status !== "未接触").length;
  const intentCount = companies.filter((company) => company.status === "意向确认").length;
  const signedCount = companies.filter((company) => company.status === "已签约").length;

  document.getElementById("stat-total").textContent = companies.length;
  document.getElementById("stat-followed").textContent = followedCount;
  document.getElementById("stat-intent").textContent = intentCount;
  document.getElementById("stat-signed").textContent = signedCount;
}

function companyMatchesQuery(company, query) {
  if (!query) return true;
  const searchText = [
    company.name,
    company.fullName,
    company.contact,
    company.phone,
    company.extraContact,
    company.category,
    company.industryRole,
    company.positioning,
    company.note,
    company.analysis
  ].join(" ").toLowerCase();
  return searchText.includes(query.toLowerCase());
}

function getFilteredCompanies() {
  const query = state.query.trim();
  return companies.filter((company) => {
    const matchesCategory = state.category === "全部分区" || company.category === state.category;
    const matchesStatus = state.status === "全部状态" || company.status === state.status;
    return matchesCategory && matchesStatus && companyMatchesQuery(company, query);
  });
}

function renderStatusOptions(company) {
  return STATUS_CONFIG.map((status) => {
    const isActive = company.status === status.name;
    return `
      <button class="status-option ${status.className} ${isActive ? "is-active" : ""}" type="button" data-set-status="${escapeHtml(status.name)}" aria-pressed="${isActive}">
        ${escapeHtml(status.name)}
      </button>
    `;
  }).join("");
}

function renderCompanyCard(company) {
  const statusMeta = getStatusMeta(company.status);
  const phoneHref = getPhoneHref(company.phone);
  const websiteLink = company.website
    ? `<a class="contact-link resource" href="${escapeHtml(company.website)}" target="_blank" rel="noopener noreferrer">${escapeHtml(company.linkLabel || "企业资料")}${ICONS.external}</a>`
    : "";
  const noteBlock = company.note
    ? `<h4>备注信息</h4><p class="detail-note">${formatMultiline(company.note)}</p>`
    : "";
  const extraContactBlock = company.extraContact
    ? `<h4>补充联系方式</h4><p>${escapeHtml(company.extraContact)}</p>`
    : "";

  return `
    <article class="company-card" data-company-id="${escapeHtml(company.id)}">
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
        <span class="status-chip ${statusMeta.className}" data-status-chip>${escapeHtml(company.status)}</span>
      </div>

      <div class="contact-strip">
        <span class="contact-item">联系人<strong>${escapeHtml(company.contact || "待补充")}</strong></span>
        <span class="contact-divider" aria-hidden="true"></span>
        ${phoneHref ? `<a class="contact-link phone" href="${escapeHtml(phoneHref)}">${ICONS.phone}${escapeHtml(company.phone)}</a>` : '<span class="contact-link">电话待补充</span>'}
        ${websiteLink}
      </div>

      <p class="company-summary">${escapeHtml(company.positioning)}</p>

      <div class="fit-reason">
        <span>归类依据</span>
        <p>${escapeHtml(company.analysis)}</p>
      </div>

      <details class="company-details">
        <summary>查看完整资料${ICONS.chevron}</summary>
        <div class="detail-content">
          <h4>公司定位</h4>
          <p>${escapeHtml(company.positioning)}</p>
          <h4>产业链标签</h4>
          <p>${escapeHtml(company.industryRole)}</p>
          ${extraContactBlock}
          ${noteBlock}
        </div>
      </details>

      <div class="progress-field">
        <div class="field-heading">
          <label for="progress-${escapeHtml(company.id)}">目前进度</label>
          <span class="save-state" data-save-for="${escapeHtml(company.id)}">自动保存</span>
        </div>
        <textarea id="progress-${escapeHtml(company.id)}" data-progress="${escapeHtml(company.id)}" rows="2" placeholder="记录沟通情况、下一步动作、负责人等">${escapeHtml(company.progress)}</textarea>
      </div>

      <div class="stage-block">
        <div class="stage-heading">
          <span>跟进状态</span>
          <span>点击单选</span>
        </div>
        <div class="status-options" role="group" aria-label="${escapeHtml(company.name)}跟进状态">
          ${renderStatusOptions(company)}
        </div>
      </div>
    </article>
  `;
}

function renderEmptyState() {
  const categoryIsEmpty = state.category !== "全部分区" && getCategoryCount(state.category) === 0;
  const hasFilters = state.query.trim() || state.status !== "全部状态" || state.category !== "全部分区";
  let title = "没有找到匹配单位";
  let description = "请尝试更换关键词、跟进状态或产业分区。";

  if (categoryIsEmpty && !state.query.trim() && state.status === "全部状态") {
    title = `${state.category}暂无匹配单位`;
    description = "当前资料中暂无明确以该场景为主营业务的企业。后续补充企业数据后，会自动显示在此分区。";
  }

  companyGrid.innerHTML = `
    <div class="empty-state">
      <span class="empty-icon">${ICONS.search}</span>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(description)}</p>
      ${hasFilters ? '<button type="button" data-empty-reset>查看全部单位</button>' : ""}
    </div>
  `;
}

function renderBoard() {
  const filteredCompanies = getFilteredCompanies();
  const categoryLabel = state.category === "全部分区" ? "全部单位" : state.category;
  const filterLabels = [];

  if (state.query.trim()) filterLabels.push(`搜索“${state.query.trim()}”`);
  if (state.status !== "全部状态") filterLabels.push(state.status);

  boardTitle.textContent = categoryLabel;
  resultCount.textContent = `${filteredCompanies.length} 家`;
  resultMeta.textContent = filterLabels.length
    ? `当前筛选：${filterLabels.join(" · ")}`
    : "按主营业务场景唯一归类，每家企业仅展示一个分区";
  clearFiltersButton.hidden = !(state.query.trim() || state.status !== "全部状态" || state.category !== "全部分区");

  if (!filteredCompanies.length) {
    renderEmptyState();
    return;
  }

  companyGrid.innerHTML = filteredCompanies.map(renderCompanyCard).join("");
}

function updateCardStatus(company) {
  const card = companyGrid.querySelector(`[data-company-id="${company.id}"]`);
  if (!card) return;

  const statusMeta = getStatusMeta(company.status);
  const statusChip = card.querySelector("[data-status-chip]");
  if (statusChip) {
    statusChip.className = `status-chip ${statusMeta.className}`;
    statusChip.textContent = company.status;
  }

  card.querySelectorAll("[data-set-status]").forEach((button) => {
    const isActive = button.dataset.setStatus === company.status;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setCompanyStatus(companyId, statusName) {
  const company = getCompanyById(companyId);
  if (!company || !STATUS_NAMES.includes(statusName)) return;

  company.status = statusName;
  persistRecords();
  renderMetrics();
  updateCardStatus(company);
  showToast(`“${company.name}”已更新为：${statusName}`);

  if (state.status !== "全部状态" && state.status !== statusName) {
    renderBoard();
  }
}

function updateSaveState(companyId, text, className) {
  const card = companyGrid.querySelector(`[data-company-id="${companyId}"]`);
  const saveState = card?.querySelector(`[data-save-for="${companyId}"]`);
  if (!saveState) return;
  saveState.textContent = text;
  saveState.className = `save-state ${className || ""}`.trim();
}

function scheduleProgressSave(companyId) {
  updateSaveState(companyId, "保存中…", "is-saving");
  window.clearTimeout(saveTimers.get(companyId));
  const timer = window.setTimeout(() => {
    const saved = persistRecords();
    updateSaveState(companyId, saved ? "已自动保存" : "保存失败", saved ? "is-saved" : "is-error");
    saveTimers.delete(companyId);
  }, 350);
  saveTimers.set(companyId, timer);
}

function resetFilters() {
  state.category = "全部分区";
  state.status = "全部状态";
  state.query = "";
  searchInput.value = "";
  statusFilter.value = "全部状态";
  renderCategoryNav();
  renderBoard();
}

categoryNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  renderCategoryNav();
  renderBoard();
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderBoard();
});

statusFilter.addEventListener("change", (event) => {
  state.status = event.target.value;
  renderBoard();
});

clearFiltersButton.addEventListener("click", resetFilters);

companyGrid.addEventListener("click", (event) => {
  const statusButton = event.target.closest("[data-set-status]");
  if (statusButton) {
    const card = statusButton.closest("[data-company-id]");
    setCompanyStatus(card.dataset.companyId, statusButton.dataset.setStatus);
    return;
  }

  const emptyResetButton = event.target.closest("[data-empty-reset]");
  if (emptyResetButton) {
    resetFilters();
  }
});

companyGrid.addEventListener("input", (event) => {
  const textarea = event.target.closest("[data-progress]");
  if (!textarea) return;
  const company = getCompanyById(textarea.dataset.progress);
  if (!company) return;
  company.progress = textarea.value;
  scheduleProgressSave(company.id);
});

document.addEventListener("keydown", (event) => {
  const activeTag = document.activeElement?.tagName;
  const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(activeTag);

  if (event.key === "/" && !isTyping) {
    event.preventDefault();
    searchInput.focus();
  }

  if (event.key === "Escape" && document.activeElement === searchInput && searchInput.value) {
    searchInput.value = "";
    state.query = "";
    renderBoard();
  }
});

document.getElementById("reset-data").addEventListener("click", () => {
  const shouldReset = window.confirm("确认清空全部企业的跟进状态和进度记录吗？此操作不可恢复。");
  if (!shouldReset) return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    showToast("无法访问浏览器存储。");
    return;
  }

  companies.forEach((company) => {
    company.status = "未接触";
    company.progress = "";
  });
  renderMetrics();
  renderBoard();
  showToast("已清空全部本地跟进记录");
});

window.addEventListener("beforeunload", () => {
  saveTimers.forEach((timer) => window.clearTimeout(timer));
  persistRecords();
});

function renderDate() {
  const now = new Date();
  const dateText = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short"
  }).format(now);
  document.getElementById("current-date").textContent = dateText;
}

applySavedRecords();
renderDate();
renderCategoryNav();
renderMetrics();
renderBoard();


