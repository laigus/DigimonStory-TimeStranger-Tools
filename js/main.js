// DOM 元素
const searchInput = document.getElementById('searchInput');
const digimonListContainer = document.getElementById('digimonListContainer');
const evolutionChart = document.getElementById('evolutionChart');

let selectedDigimon = null;
let filteredDigimon = digimonData;

function autoResizeTextarea(textarea) {
    if (!textarea) return;
    const maxHeight = parseInt(textarea.dataset.maxHeight || '400', 10);
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
}

function initializeNotesPane() {
    const notesTextarea = document.getElementById('notesTextarea');
    if (!notesTextarea) return;

    const savedContent = localStorage.getItem(NOTES_STORAGE_KEY) || '';
    notesTextarea.value = savedContent;
    autoResizeTextarea(notesTextarea);

    notesTextarea.addEventListener('input', (event) => {
        localStorage.setItem(NOTES_STORAGE_KEY, event.target.value);
        autoResizeTextarea(event.target);
    });
}


// 初始化应用
function initializeApp() {
    renderDigimonList();
    setupEventListeners();
}

// 设置事件监听器
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
}


// 渲染进化路线图
function renderEvolutionChart() {
    // 获取进化标签页的图表容器
    const evolutionChart = document.getElementById('evolutionChart');
    
    // 清空容器
    evolutionChart.innerHTML = '';
    
    if (!selectedDigimon) {
        const noSelection = document.createElement('div');
        noSelection.className = 'no-selection';
        noSelection.innerHTML = '<h3>请选择一个数码宝贝查看进化路线</h3>';
        evolutionChart.appendChild(noSelection);
        return;
    }
    
    const evolutionData = getEvolutionData(selectedDigimon);
    
    // 创建进化布局容器
    const evolutionLayout = document.createElement('div');
    evolutionLayout.className = 'evolution-layout';
    
    // 添加退化路线
    const devolutionColumn = renderEvolutionColumn('退化路线', evolutionData.devolutions, 'left');
    evolutionLayout.appendChild(devolutionColumn);
    
    // 添加左箭头
    const leftArrow = document.createElement('div');
    leftArrow.className = 'evolution-arrow';
    leftArrow.textContent = '←';
    evolutionLayout.appendChild(leftArrow);
    
    // 添加当前数码宝贝
    const currentDigimon = renderCurrentDigimon(selectedDigimon);
    evolutionLayout.appendChild(currentDigimon);
    
    // 添加右箭头
    const rightArrow = document.createElement('div');
    rightArrow.className = 'evolution-arrow';
    rightArrow.textContent = '→';
    evolutionLayout.appendChild(rightArrow);
    
    // 添加进化路线
    const evolutionColumn = renderEvolutionColumn('进化路线', evolutionData.evolutions, 'right');
    evolutionLayout.appendChild(evolutionColumn);

    // 根据数量添加宽度控制类
    const evoCount = evolutionData.evolutions.length;
    const devoCount = evolutionData.devolutions.length;
    if (evoCount > 4 && devoCount > 4) {
        evolutionLayout.classList.add('wide-both');
    } else if (evoCount > 4) {
        evolutionLayout.classList.add('wide-right');
    } else if (devoCount > 4) {
        evolutionLayout.classList.add('wide-left');
    }
    
    // 将布局添加到容器
    evolutionChart.appendChild(evolutionLayout);
    
    // 添加点击事件
    addEvolutionClickEvents();
}

// 获取进化数据
function getEvolutionData(digimon) {
    const evolutions = digimon.evolvesTo.map(id => digimonMap.get(id)).filter(Boolean);
    const devolutions = digimon.evolvesFrom.map(id => digimonMap.get(id)).filter(Boolean);
    
    return {
        evolutions,
        devolutions
    };
}

// 渲染进化列
function renderEvolutionColumn(title, digimons, side) {
    const column = document.createElement('div');
    column.className = `evolution-column ${side}-column`;
    
    // 创建标题
    const titleDiv = document.createElement('div');
    titleDiv.className = 'column-title';
    titleDiv.textContent = title;
    column.appendChild(titleDiv);
    
    if (digimons.length === 0) {
        const noEvolution = document.createElement('div');
        noEvolution.className = 'no-evolution';
        noEvolution.textContent = `暂无${side === 'left' ? '退化' : '进化'}路线`;
        column.appendChild(noEvolution);
    } else {
        // 容器：根据数量决定是否两列
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'cards-container';
        if (digimons.length > 4) {
            cardsContainer.classList.add('two-columns');
        }

        // 添加数码宝贝卡片
        digimons.forEach(digimon => {
            const card = createDigimonCard(digimon);
            cardsContainer.appendChild(card);
        });
        column.appendChild(cardsContainer);
    }
    
    return column;
}

// 渲染当前数码宝贝
function renderCurrentDigimon(digimon) {
    const currentDiv = document.createElement('div');
    currentDiv.className = 'current-digimon';
    
    // 创建标题
    const titleDiv = document.createElement('div');
    titleDiv.className = 'column-title';
    titleDiv.textContent = '当前选择';
    currentDiv.appendChild(titleDiv);
    
    // 添加数码宝贝卡片
    const card = createDigimonCard(digimon);
    currentDiv.appendChild(card);
    
    return currentDiv;
}

// 创建数码宝贝卡片
function createDigimonCard(digimon) {
    const card = document.createElement('div');
    card.className = 'digimon-card';
    card.dataset.id = digimon.id;
    
    // 创建智能图片元素
    const imageElement = createSmartImage(digimon, 'digimon-image');
    
    // 创建名称元素
    const nameDiv = document.createElement('div');
    nameDiv.className = 'digimon-name';
    nameDiv.textContent = digimon.name;
    
    // 创建等级元素
    const levelDiv = document.createElement('div');
    levelDiv.className = 'digimon-level';
    levelDiv.textContent = digimon.level;
    
    // 组装卡片
    card.appendChild(imageElement);
    card.appendChild(nameDiv);
    card.appendChild(levelDiv);
    
    return card;
}

// 添加进化图点击事件
function addEvolutionClickEvents() {
    const cards = evolutionChart.querySelectorAll('.digimon-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const digimonId = parseInt(card.dataset.id);
            const digimon = digimonMap.get(digimonId);
            if (digimon) {
                selectDigimon(digimon);
                // 滚动到列表中的对应项
                scrollToDigimonInList(digimon);
            }
        });
    });
}


// 添加一些辅助功能
function addKeyboardSupport() {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            searchInput.value = '';
            handleSearch({ target: { value: '' } });
        }
        
        if (event.key === 'Enter' && document.activeElement === searchInput) {
            if (filteredDigimon.length > 0) {
                selectDigimon(filteredDigimon[0]);
            }
        }
    });
}

// 添加触摸支持（移动设备）
function addTouchSupport() {
    let touchStartY = 0;
    
    digimonListContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });
    
    digimonListContainer.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        // 检测向上滑动手势
        if (diff > 50) {
            // 可以添加更多功能，比如快速滚动到顶部等
        }
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    addKeyboardSupport();
    addTouchSupport();
    
    // 可选：自动选择第一个数码宝贝作为演示
    if (digimonData.length > 0) {
        setTimeout(() => {
            selectDigimon(digimonData[0]);
        }, 500);
    }

    // ===== 字体选择逻辑 =====
    const fontSelector = document.getElementById('fontSelector');
    if (fontSelector) {
        const allowedFonts = new Set(['default','kuai','xiaowei','mashan','yuanyuan','fangfang']);
        let savedFont = localStorage.getItem('digimon-font-choice') || 'default';
        if (!allowedFonts.has(savedFont)) savedFont = 'default';
        fontSelector.value = savedFont;
        document.body.setAttribute('data-font', savedFont);

        fontSelector.addEventListener('change', () => {
            const val = fontSelector.value;
            document.body.setAttribute('data-font', allowedFonts.has(val) ? val : 'default');
            localStorage.setItem('digimon-font-choice', val);
        });
    }

    renderPersonalityChart();
    initializeNotesPane();
});

// 工具函数：获取数码宝贝的完整进化链
function getFullEvolutionChain(digimon) {
    const visited = new Set();
    const chain = {
        previous: [],
        current: digimon,
        next: []
    };
    
    // 向前查找（退化）
    function findPrevious(currentDigimon, depth = 0) {
        if (depth > 10 || visited.has(currentDigimon.id)) return; // 防止无限循环
        visited.add(currentDigimon.id);
        
        currentDigimon.evolvesFrom.forEach(id => {
            const prevDigimon = digimonMap.get(id);
            if (prevDigimon && !chain.previous.some(d => d.id === prevDigimon.id)) {
                chain.previous.unshift(prevDigimon);
                findPrevious(prevDigimon, depth + 1);
            }
        });
    }
    
    // 向后查找（进化）
    function findNext(currentDigimon, depth = 0) {
        if (depth > 10 || visited.has(currentDigimon.id + 1000)) return; // 防止无限循环
        visited.add(currentDigimon.id + 1000);
        
        currentDigimon.evolvesTo.forEach(id => {
            const nextDigimon = digimonMap.get(id);
            if (nextDigimon && !chain.next.some(d => d.id === nextDigimon.id)) {
                chain.next.push(nextDigimon);
                findNext(nextDigimon, depth + 1);
            }
        });
    }
    
    findPrevious(digimon);
    findNext(digimon);
    
    return chain;
}


// ===== 图片管理功能 =====

class ImageManager {
    constructor() {
        this.initializeElements();
        this.initializeEventListeners();
        this.currentSelectedDigimon = null;
        this.previewFile = null;
    }

    initializeElements() {
        this.modal = document.getElementById('imageManagerModal');
        this.closeModal = document.getElementById('closeModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.uploadArea = document.getElementById('uploadArea');
        this.imageInput = document.getElementById('imageInput');
        this.selectImageBtn = document.getElementById('selectImageBtn');
        this.previewImage = document.getElementById('previewImage');
        this.previewPlaceholder = document.getElementById('previewPlaceholder');
        this.saveImageBtn = document.getElementById('saveImageBtn');
    }

    initializeEventListeners() {
        // 模态框控制
        this.closeModal.addEventListener('click', () => this.closeModalHandler());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModalHandler();
        });

        // 图片上传
        this.selectImageBtn.addEventListener('click', () => this.imageInput.click());
        this.imageInput.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // 拖拽上传
        this.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));
        this.uploadArea.addEventListener('click', () => this.imageInput.click());

        // 操作按钮
        this.saveImageBtn.addEventListener('click', () => this.saveImage());

        // ESC键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeModalHandler();
            }
        });
    }

    openModal(digimon) {
        this.currentSelectedDigimon = digimon;
        this.modalTitle.textContent = `编辑 ${digimon.name} 的图片`;
        
        this.resetPreview();
        this.updateButtons();
        
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModalHandler() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.resetPreview();
        this.currentSelectedDigimon = null;
    }

    updateButtons() {
        const hasDigimon = !!this.currentSelectedDigimon;
        const hasPreview = !!this.previewFile;

        this.saveImageBtn.disabled = !hasDigimon || !hasPreview;
    }

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadArea.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadArea.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadArea.classList.remove('dragover');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    processFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('请选择图片文件！');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.previewFile = {
                data: e.target.result,
                name: file.name,
                type: file.type
            };
            
            this.previewImage.src = e.target.result;
            this.previewImage.style.display = 'block';
            this.previewPlaceholder.style.display = 'none';
            
            this.updateButtons();
        };
        
        reader.readAsDataURL(file);
    }

    resetPreview() {
        this.previewFile = null;
        this.previewImage.style.display = 'none';
        this.previewPlaceholder.style.display = 'block';
        this.imageInput.value = '';
        this.updateButtons();
    }

    saveImage() {
        if (!this.currentSelectedDigimon || !this.previewFile) {
            alert('请选择图片！');
            return;
        }

        // 直接下载图片到picture文件夹
        this.downloadImageToFolder();
        
        // 重新渲染数码宝贝列表以更新图片
        renderDigimonList();
        
        // 如果当前选中的数码宝贝就是我们更新的，也更新进化图
        if (selectedDigimon && selectedDigimon.id === this.currentSelectedDigimon.id) {
            renderEvolutionChart(selectedDigimon);
        }
        
        this.resetPreview();
        this.updateButtons();
        
        //alert(`图片已下载！\n文件名：${this.currentSelectedDigimon.name}\n请将下载的文件放到 picture 文件夹中，然后刷新页面。`);
        
        // 保存后自动关闭弹窗
        this.closeModalHandler();
    }

    downloadImageToFolder() {
        // 创建下载链接
        const link = document.createElement('a');
        link.href = this.previewFile.data;
        
        // 确定文件扩展名
        let extension = '.jpg';
        if (this.previewFile.type.includes('png')) extension = '.png';
        else if (this.previewFile.type.includes('gif')) extension = '.gif';
        else if (this.previewFile.type.includes('webp')) extension = '.webp';
        
        // 设置下载文件名
        link.download = `${this.currentSelectedDigimon.name}${extension}`;
        
        // 触发下载
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

}

// 初始化图片管理器
const imageManager = new ImageManager();

// 打开图片编辑器的全局函数
function openImageEditor(digimon) {
    imageManager.openModal(digimon);
}

// 标签页功能
class TabManager {
    constructor() {
        this.tabButtons = Array.from(document.querySelectorAll('.tab-button'));
        this.tabOrder = this.tabButtons.map(button => button.dataset.tab);
        this.activeTab = this.tabOrder[0] || null;
        this.lastTab = this.activeTab;
        this.init();
    }

    init() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tabId = e.currentTarget.dataset.tab;
                this.switchTab(tabId);
            });
        });
    }

    switchTab(tabId) {
        if (!this.tabOrder.includes(tabId) || tabId === this.activeTab) return;
        const currentIndex = this.tabOrder.indexOf(this.activeTab);
        const nextIndex = this.tabOrder.indexOf(tabId);
        const direction = nextIndex > currentIndex ? 'right' : 'left';

        // 更新按钮状态
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.toggle('active', button.dataset.tab === tabId);
        });

        const currentPane = document.getElementById(`${this.activeTab}-tab`);
        const nextPane = document.getElementById(`${tabId}-tab`);

        // 清除所有动画类
        if (currentPane) {
            currentPane.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
        }
        if (nextPane) {
            nextPane.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
        }

        // 同时执行滑出和滑入动画
        if (currentPane && nextPane) {
            // 让两个页面都可见并可交互
            currentPane.style.opacity = '1';
            currentPane.style.pointerEvents = 'auto';
            currentPane.style.zIndex = '1';
            
            nextPane.classList.add('active');
            nextPane.style.opacity = '1';
            nextPane.style.pointerEvents = 'auto';
            nextPane.style.zIndex = '2';

            // 添加动画类
            if (direction === 'right') {
                currentPane.classList.add('slide-out-left');
                nextPane.classList.add('slide-in-right');
            } else {
                currentPane.classList.add('slide-out-right');
                nextPane.classList.add('slide-in-left');
            }

            // 动画结束后清理
            setTimeout(() => {
                if (currentPane) {
                    currentPane.classList.remove('active', 'slide-out-left', 'slide-out-right');
                    currentPane.style.opacity = '';
                    currentPane.style.pointerEvents = '';
                    currentPane.style.zIndex = '';
                }
                if (nextPane) {
                    nextPane.classList.remove('slide-in-left', 'slide-in-right');
                    nextPane.style.opacity = '';
                    nextPane.style.pointerEvents = '';
                    nextPane.style.zIndex = '';
                }
            }, 300);
        }

        this.lastTab = this.activeTab;
        this.activeTab = tabId;
    }

    getActiveTab() {
        return this.activeTab;
    }
}

// 初始化标签页管理器
const tabManager = new TabManager();

const TRAINING_STORAGE_KEY = 'digimon-training-items';
const NOTES_STORAGE_KEY = 'digimon-notes-content';
const TRAINING_CATEGORY_STORAGE_KEY = 'digimon-training2-items';
const TRAINING_CATEGORY_NAMES = ['HP', 'SP', '攻击', '防御', '智慧', '精神', '敏捷'];
const ROUTE_STORAGE_KEY = 'digimon-route-planner';

const defaultTrainingTemplates = [
    { name: '三温暖A', stat: 'HP', personality: '心 →' },
    { name: '三温暖B', stat: 'HP大', personality: '心 →' },
    { name: '三温暖C', stat: 'HP特大', personality: '-' },
    { name: '手提音响A', stat: 'SP', personality: '头脑 ←' },
    { name: '手提音响B', stat: 'SP大', personality: '头脑 ←' },
    { name: '手提音响C', stat: 'SP特大', personality: '-' },
    { name: '沙包A', stat: '攻击', personality: '心 爱 ↗' },
    { name: '沙包B', stat: '攻击大', personality: '心 爱 ↗' },
    { name: '沙包C', stat: '攻击特大', personality: '-' },
    { name: '棍棒A', stat: '防御', personality: '心 友 ↘→' },
    { name: '棍棒B', stat: '防御大', personality: '心 友 ↘→' },
    { name: '棍棒C', stat: '防御特大', personality: '-' },
    { name: '教室A', stat: '智力', personality: '头脑 友 ↙' },
    { name: '教室B', stat: '智力大', personality: '头脑 友 ↙' },
    { name: '教室C', stat: '智力特大', personality: '-' },
    { name: '茶室A', stat: '精神', personality: '头脑 爱 ↖' },
    { name: '茶室B', stat: '精神大', personality: '头脑 爱 ↖' },
    { name: '茶室C', stat: '精神特大', personality: '-' },
    { name: '跑步机A', stat: '敏捷', personality: '心 友 ↘↓' },
    { name: '跑步机B', stat: '敏捷大', personality: '心 友 ↘↓' },
    { name: '跑步机C', stat: '敏捷特大', personality: '-' }
];

const templateOrderByName = new Map(defaultTrainingTemplates.map((template, index) => [template.name, index]));

const templateByStat = new Map(defaultTrainingTemplates.map(template => [template.stat, template]));
const wisdomTemplate = defaultTrainingTemplates.find(template => template.stat === '智力');
if (wisdomTemplate) {
    templateByStat.set('智慧', wisdomTemplate);
}

const personalityQuadrants = [
    {
        id: 'top-left',
        title: '博爱',
        titlePosition: 'top',
        traits: [
            { index: '1', name: '慈爱', stats: ['精神', '防御力'] },
            { index: '2', name: '牺牲奉献', stats: ['精神', '智力'] },
            { index: '3', name: '包容力', stats: ['精神', 'SP'] },
            { index: '4', name: '过度保护', stats: ['精神', 'HP'] }
        ]
    },
    {
        id: 'top-right',
        title: '勇猛',
        titlePosition: 'top',
        traits: [
            { index: '5', name: '热血', stats: ['攻击力', '敏捷'] },
            { index: '6', name: '勇敢', stats: ['攻击力', 'SP'] },
            { index: '7', name: '匹夫之勇', stats: ['攻击力', 'HP'] },
            { index: '8', name: '胆识非凡', stats: ['攻击力', '防御力'] }
        ]
    },
    {
        id: 'bottom-left',
        title: '知启',
        titlePosition: 'bottom',
        traits: [
            { index: '9', name: '天启', stats: ['智力', 'SP'] },
            { index: '10', name: '坏点子', stats: ['智力', 'HP'] },
            { index: '11', name: '聪颖', stats: ['智力', '敏捷'] },
            { index: '12', name: '战略家', stats: ['智力', '精神'] }
        ]
    },
    {
        id: 'bottom-right',
        title: '友好',
        titlePosition: 'bottom',
        traits: [
            { index: '13', name: '投机分子', stats: ['防御力', '精神'] },
            { index: '14', name: '和蔼可亲', stats: ['防御力', '攻击力'] },
            { index: '15', name: '善于社交', stats: ['防御力', 'SP'] },
            { index: '16', name: '饶富人情味', stats: ['防御力', 'HP'] }
        ]
    }
];

function renderPersonalityChart() {
    const root = document.getElementById('personalityChart');
    if (!root) return;

    root.innerHTML = '';

    const chart = document.createElement('div');
    chart.className = 'personality-chart';
    root.appendChild(chart);

    const verticalAxis = document.createElement('div');
    verticalAxis.className = 'axis axis-vertical';
    chart.appendChild(verticalAxis);

    const horizontalAxis = document.createElement('div');
    horizontalAxis.className = 'axis axis-horizontal';
    chart.appendChild(horizontalAxis);

    const axisLabels = [
        { direction: 'up', label: '爱' },
        { direction: 'down', label: '友' },
        { direction: 'left', label: '头脑' },
        { direction: 'right', label: '心' }
    ];

    axisLabels.forEach(({ direction, label }) => {
        const axisEnd = document.createElement('div');
        axisEnd.className = `axis-end axis-${direction}`;

        const arrowSpan = document.createElement('span');
        arrowSpan.className = `axis-arrow axis-arrow-${direction}`;

        const labelSpan = document.createElement('span');
        labelSpan.className = 'axis-text';
        labelSpan.textContent = label;

        axisEnd.appendChild(arrowSpan);
        axisEnd.appendChild(labelSpan);

        chart.appendChild(axisEnd);
    });

    personalityQuadrants.forEach(quadrantData => {
        const quadrant = document.createElement('div');
        quadrant.className = `quadrant quadrant-${quadrantData.id}`;

        const title = document.createElement('div');
        title.className = `quadrant-title quadrant-title-${quadrantData.titlePosition}`;
        title.textContent = quadrantData.title;

        const table = document.createElement('div');
        table.className = 'trait-table';

        quadrantData.traits.forEach(trait => {
            const cell = document.createElement('div');
            cell.className = 'trait-cell';

            const index = document.createElement('span');
            index.className = 'trait-index';
            index.textContent = trait.index;

            const name = document.createElement('div');
            name.className = 'trait-name';
            name.textContent = trait.name;

            const stats = document.createElement('div');
            stats.className = 'trait-stats';

            trait.stats.forEach(stat => {
                const statSpan = document.createElement('span');
                statSpan.textContent = stat;
                stats.appendChild(statSpan);
            });

            cell.appendChild(index);
            cell.appendChild(name);
            cell.appendChild(stats);
            table.appendChild(cell);
        });

        if (quadrantData.titlePosition === 'bottom') {
            quadrant.appendChild(table);
            quadrant.appendChild(title);
        } else {
            quadrant.appendChild(title);
            quadrant.appendChild(table);
        }

        chart.appendChild(quadrant);
    });
}

// 训练管理器
class TrainingManager {
    constructor() {
        this.trainingItems = [];
        this.nextId = 1;
        const { restored, migrated } = this.loadState();
        const defaultsAdded = restored ? this.ensureDefaultTemplates() : false;
        if (!restored) {
            this.initializeDefaultItems();
        }
        this.sortTrainingItems();
        this.render();
        if (!restored || migrated || defaultsAdded) {
            this.saveState();
        }
    }

    initializeDefaultItems() {
        defaultTrainingTemplates.forEach(template => {
            this.trainingItems.push({
                id: this.nextId++,
                name: template.name,
                stat: template.stat,
                personality: template.personality,
                digimonId: null,
                target: '',
                isDefault: true
            });
        });
    }

    ensureDefaultTemplates() {
        let added = false;
        const existingDefaultNames = new Set(
            this.trainingItems.filter(item => item.isDefault).map(item => item.name)
        );

        defaultTrainingTemplates.forEach(template => {
            if (!existingDefaultNames.has(template.name)) {
                this.trainingItems.push({
                    id: this.nextId++,
                    name: template.name,
                    stat: template.stat,
                    personality: template.personality,
                    digimonId: null,
                    target: '',
                    isDefault: true
                });
                added = true;
            }
        });

        return added;
    }

    sortTrainingItems() {
        this.trainingItems.sort((a, b) => {
            const orderA = templateOrderByName.has(a.name) ? templateOrderByName.get(a.name) : Number.MAX_SAFE_INTEGER;
            const orderB = templateOrderByName.has(b.name) ? templateOrderByName.get(b.name) : Number.MAX_SAFE_INTEGER;
            if (orderA !== orderB) return orderA - orderB;
            if (a.isDefault !== b.isDefault) return a.isDefault ? -1 : 1;
            return a.id - b.id;
        });
    }

    render() {
        const container = document.getElementById('trainingList');
        if (!container) return;

        container.innerHTML = '';

        this.trainingItems.forEach(item => {
            const itemElement = this.createTrainingItem(item);
            container.appendChild(itemElement);
        });
    }

    createTrainingItem(item) {
        const div = document.createElement('div');
        div.className = 'training-item';
        div.dataset.id = item.id;

        const digimon = (item.digimonId !== null && item.digimonId !== undefined)
            ? digimonMap.get(item.digimonId)
            : null;

        // 创建训练项的基本结构
        const actionBtn = document.createElement('button');
        actionBtn.className = `training-action ${item.isDefault ? 'add-btn' : 'remove-btn'}`;
        actionBtn.textContent = item.isDefault ? '+' : '−';
        actionBtn.onclick = () => {
            if (item.isDefault) {
                this.addItem(item.id);
            } else {
                this.removeItem(item.id);
            }
        };

    const labelDiv = document.createElement('div');
    labelDiv.className = 'training-label';

    const nameDiv = document.createElement('div');
    nameDiv.className = 'training-name';
    nameDiv.textContent = item.name;

    const metaDiv = document.createElement('div');
    metaDiv.className = 'training-meta';

    const statSpan = document.createElement('span');
    statSpan.className = 'training-stat';
    statSpan.textContent = `提升属性：${item.stat}`;

    const personalitySpan = document.createElement('span');
    personalitySpan.className = 'training-personality';
    personalitySpan.textContent = `提升个性：${item.personality}`;

    metaDiv.appendChild(statSpan);
    metaDiv.appendChild(personalitySpan);

    labelDiv.appendChild(nameDiv);
    labelDiv.appendChild(metaDiv);

        const digimonDiv = document.createElement('div');
        digimonDiv.className = `training-digimon ${digimon ? '' : 'empty'}`;
        digimonDiv.onclick = () => this.selectDigimon(item.id);

        if (digimon) {
            // 创建智能图片元素
            const imageContainer = createSmartImage(digimon, 'digimon-image');
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'digimon-name';
            nameSpan.textContent = digimon.name;

            const clearBtn = document.createElement('button');
            clearBtn.className = 'clear-btn';
            clearBtn.textContent = '×';
            clearBtn.onclick = (e) => {
                e.stopPropagation();
                this.clearDigimon(item.id);
            };

            digimonDiv.appendChild(imageContainer);
            digimonDiv.appendChild(nameSpan);
            digimonDiv.appendChild(clearBtn);
        } else {
            digimonDiv.textContent = item.digimonId ? '未找到对应的数码宝贝，请重新选择' : '点击添加左侧选中的数码宝贝';
        }

        const targetInput = document.createElement('textarea');
        targetInput.className = 'training-target';
        targetInput.placeholder = '备注';
        targetInput.value = item.target ?? '';
        targetInput.rows = 1;
        targetInput.dataset.maxHeight = '120';
        targetInput.addEventListener('input', (e) => {
            this.updateTarget(item.id, e.target.value);
            autoResizeTextarea(e.target);
        });
        setTimeout(() => autoResizeTextarea(targetInput), 0);

        // 组装训练项
        div.appendChild(actionBtn);
        div.appendChild(labelDiv);
        div.appendChild(digimonDiv);
        div.appendChild(targetInput);

        return div;
    }

    addItem(parentId) {
        const parentItem = this.trainingItems.find(item => item.id === parentId);
        if (!parentItem) return;

        const newItem = {
            id: this.nextId++,
            name: parentItem.name,
            stat: parentItem.stat,
            personality: parentItem.personality,
            digimonId: null,
            target: '',
            isDefault: false
        };

        // 在父项目后面插入新项目
        const parentIndex = this.trainingItems.findIndex(item => item.id === parentId);
        this.trainingItems.splice(parentIndex + 1, 0, newItem);

        this.sortTrainingItems();
        this.render();
        this.saveState();
    }

    removeItem(itemId) {
        this.trainingItems = this.trainingItems.filter(item => item.id !== itemId);
        this.sortTrainingItems();
        this.render();
        this.saveState();
    }

    selectDigimon(itemId) {
        // 直接使用当前选择的数码宝贝
        if (selectedDigimon) {
            const item = this.trainingItems.find(item => item.id === itemId);
            if (item) {
                item.digimonId = selectedDigimon.id;
                this.render();
                this.saveState();
            }
        } else {
            alert('请先在左侧选择一个数码宝贝');
        }
    }

    clearDigimon(itemId) {
        const item = this.trainingItems.find(item => item.id === itemId);
        if (item) {
            item.digimonId = null;
            this.render();
            this.saveState();
        }
    }

    updateTarget(itemId, value) {
        const item = this.trainingItems.find(item => item.id === itemId);
        if (item) {
            item.target = value;
            this.saveState();
        }
    }

    saveState() {
        try {
            const payload = {
                nextId: this.nextId,
                items: this.trainingItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    stat: item.stat,
                    personality: item.personality,
                    digimonId: item.digimonId ?? null,
                    target: item.target ?? '',
                    isDefault: !!item.isDefault
                }))
            };
            localStorage.setItem(TRAINING_STORAGE_KEY, JSON.stringify(payload));
        } catch (error) {
            console.error('保存训练配置失败', error);
        }
    }

    loadState() {
        try {
            const raw = localStorage.getItem(TRAINING_STORAGE_KEY);
            if (!raw) return { restored: false, migrated: false };
            const parsed = JSON.parse(raw);
            if (!parsed || !Array.isArray(parsed.items)) {
                return { restored: false, migrated: false };
            }

            let migrated = false;

            const items = parsed.items.map((item, index) => {
                const id = typeof item.id === 'number' ? item.id : this.nextId + index;

                let name = typeof item.name === 'string' ? item.name.trim() : null;
                let stat = typeof item.stat === 'string' ? item.stat.trim() : null;
                let personality = typeof item.personality === 'string' ? item.personality.trim() : null;

                if (!name || !stat || !personality) {
                    migrated = true;
                    if (typeof item.label === 'string') {
                        const labelStat = item.label.trim();
                        const template = templateByStat.get(labelStat);
                        if (template) {
                            name = template.name;
                            stat = template.stat;
                            personality = template.personality;
                        } else {
                            name = labelStat || '自定义训练';
                            stat = labelStat || '未知属性';
                            personality = '未知';
                        }
                    }
                }

                if (!name || !stat || !personality) {
                    return null;
                }

                return {
                    id,
                    name,
                    stat,
                    personality,
                    digimonId: (typeof item.digimonId === 'number' || item.digimonId === null) ? item.digimonId : null,
                    target: item.target ?? '',
                    isDefault: !!item.isDefault
                };
            }).filter(Boolean);

            if (!items.length) {
                return { restored: false, migrated: false };
            }

            this.trainingItems = items;
            const maxId = items.reduce((max, item) => Math.max(max, item.id), 0);
            if (typeof parsed.nextId === 'number' && parsed.nextId > maxId) {
                this.nextId = parsed.nextId;
            } else {
                this.nextId = maxId + 1;
            }

            return { restored: true, migrated };
        } catch (error) {
            console.error('加载训练配置失败', error);
            return { restored: false, migrated: false };
        }
    }
}

class TrainingCategoryManager {
    constructor() {
        this.categories = TRAINING_CATEGORY_NAMES.map(name => ({
            name,
            items: []
        }));
        this.nextId = 1;
        const restored = this.loadState();
        this.render();
        if (!restored) {
            this.saveState();
        }
    }

    getCategory(categoryName) {
        return this.categories.find(category => category.name === categoryName);
    }

    render() {
        const container = document.getElementById('training2Container');
        if (!container) return;

        container.innerHTML = '';

        this.categories.forEach(category => {
            const categorySection = document.createElement('section');
            categorySection.className = 'training2-category';

            const header = document.createElement('div');
            header.className = 'training2-header';

            const title = document.createElement('h3');
            title.className = 'training2-title';
            title.textContent = category.name;

            const addButton = document.createElement('button');
            addButton.type = 'button';
            addButton.className = 'training2-add-btn';
            addButton.textContent = '+ 添加一行';
            addButton.onclick = () => this.addItem(category.name);

            header.appendChild(title);
            header.appendChild(addButton);

            const list = document.createElement('div');
            list.className = 'training2-items';

            if (!category.items.length) {
                const empty = document.createElement('div');
                empty.className = 'training2-empty';
                empty.textContent = '暂无记录，点击“添加一行”开始记录训练计划。';
                list.appendChild(empty);
            } else {
                category.items.forEach(item => {
                    list.appendChild(this.createItemElement(category.name, item));
                });
            }

            categorySection.appendChild(header);
            categorySection.appendChild(list);
            container.appendChild(categorySection);
        });
    }

    createItemElement(categoryName, item) {
        const itemRow = document.createElement('div');
        itemRow.className = 'training-item training2-item';

        const hasDigimon = item.digimonId !== null && item.digimonId !== undefined;
        const digimonDiv = document.createElement('div');
        digimonDiv.className = `training-digimon ${hasDigimon ? '' : 'empty'}`;
        digimonDiv.onclick = () => this.selectDigimon(categoryName, item.id);

        if (hasDigimon) {
            const digimon = digimonMap.get(item.digimonId);
            if (digimon) {
                const imageContainer = createSmartImage(digimon, 'digimon-image');
                const nameSpan = document.createElement('span');
                nameSpan.className = 'digimon-name';
                nameSpan.textContent = digimon.name;

                const clearBtn = document.createElement('button');
                clearBtn.type = 'button';
                clearBtn.className = 'clear-btn';
                clearBtn.textContent = '×';
                clearBtn.onclick = (event) => {
                    event.stopPropagation();
                    this.clearDigimon(categoryName, item.id);
                };

                digimonDiv.appendChild(imageContainer);
                digimonDiv.appendChild(nameSpan);
                digimonDiv.appendChild(clearBtn);
            } else {
                digimonDiv.classList.add('empty');
                digimonDiv.textContent = '未找到对应的数码宝贝，请重新选择';
            }
        } else {
            digimonDiv.textContent = '点击添加左侧选中的数码宝贝';
        }

        const noteTextarea = document.createElement('textarea');
        noteTextarea.className = 'training-target';
        noteTextarea.placeholder = `${categoryName} 训练备注`;
        noteTextarea.value = item.note ?? '';
        noteTextarea.rows = 1;
        noteTextarea.dataset.maxHeight = '240';
        noteTextarea.addEventListener('input', (event) => {
            this.updateNote(categoryName, item.id, event.target.value);
            autoResizeTextarea(event.target);
        });
        setTimeout(() => autoResizeTextarea(noteTextarea), 0);

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'training-action remove-btn training2-remove-btn';
        removeBtn.textContent = '−';
        removeBtn.onclick = () => this.removeItem(categoryName, item.id);

        itemRow.appendChild(digimonDiv);
        itemRow.appendChild(noteTextarea);
        itemRow.appendChild(removeBtn);

        return itemRow;
    }

    addItem(categoryName) {
        const category = this.getCategory(categoryName);
        if (!category) return;

        category.items.push({
            id: this.nextId++,
            digimonId: null,
            note: ''
        });

        this.render();
        this.saveState();
    }

    removeItem(categoryName, itemId) {
        const category = this.getCategory(categoryName);
        if (!category) return;

        category.items = category.items.filter(item => item.id !== itemId);

        this.render();
        this.saveState();
    }

    selectDigimon(categoryName, itemId) {
        if (!selectedDigimon) {
            alert('请先在左侧选择一个数码宝贝');
            return;
        }

        const category = this.getCategory(categoryName);
        if (!category) return;

        const item = category.items.find(entry => entry.id === itemId);
        if (!item) return;

        item.digimonId = selectedDigimon.id;

        this.render();
        this.saveState();
    }

    clearDigimon(categoryName, itemId) {
        const category = this.getCategory(categoryName);
        if (!category) return;

        const item = category.items.find(entry => entry.id === itemId);
        if (!item) return;

        item.digimonId = null;

        this.render();
        this.saveState();
    }

    updateNote(categoryName, itemId, value) {
        const category = this.getCategory(categoryName);
        if (!category) return;

        const item = category.items.find(entry => entry.id === itemId);
        if (!item) return;

        item.note = value;
        this.saveState();
    }

    loadState() {
        try {
            const raw = localStorage.getItem(TRAINING_CATEGORY_STORAGE_KEY);
            if (!raw) return false;

            const parsed = JSON.parse(raw);
            if (!parsed || !Array.isArray(parsed.categories)) {
                return false;
            }

            const categoryMap = new Map(this.categories.map(category => [category.name, category]));
            let maxId = 0;

            parsed.categories.forEach(categoryData => {
                if (!categoryData || typeof categoryData.name !== 'string') return;
                const category = categoryMap.get(categoryData.name);
                if (!category) return;

                if (!Array.isArray(categoryData.items)) {
                    category.items = [];
                    return;
                }

                category.items = categoryData.items.map(itemData => {
                    let id;
                    if (typeof itemData.id === 'number') {
                        id = itemData.id;
                    } else {
                        id = maxId + 1;
                    }
                    maxId = Math.max(maxId, id);

                    const digimonId = typeof itemData.digimonId === 'number' ? itemData.digimonId : null;
                    const note = typeof itemData.note === 'string' ? itemData.note : '';

                    return {
                        id,
                        digimonId,
                        note
                    };
                });
            });

            const candidateNextId = typeof parsed.nextId === 'number' ? parsed.nextId : 1;
            this.nextId = Math.max(maxId + 1, candidateNextId, 1);

            return true;
        } catch (error) {
            console.error('加载训练2配置失败', error);
            return false;
        }
    }

    saveState() {
        try {
            const payload = {
                nextId: this.nextId,
                categories: this.categories.map(category => ({
                    name: category.name,
                    items: category.items.map(item => ({
                        id: item.id,
                        digimonId: item.digimonId ?? null,
                        note: item.note ?? ''
                    }))
                }))
            };
            localStorage.setItem(TRAINING_CATEGORY_STORAGE_KEY, JSON.stringify(payload));
        } catch (error) {
            console.error('保存训练2配置失败', error);
        }
    }
}

class EvolutionRoutePlanner {
    constructor() {
        this.root = document.getElementById('routePlannerRoot');
        this.selectorRefs = {};
        this.state = {
            sourceId: null,
            targetId: null,
            route: null,
            errorMessage: null
        };
        this.loadState();
        this.render();
    }

    loadState() {
        try {
            const raw = localStorage.getItem(ROUTE_STORAGE_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== 'object') {
                return;
            }

            this.state.sourceId = this.validateDigimonId(parsed.sourceId);
            this.state.targetId = this.validateDigimonId(parsed.targetId);

            if (Array.isArray(parsed.route)) {
                const sanitizedRoute = parsed.route.filter(id => typeof id === 'number' && digimonMap.has(id));
                this.state.route = (sanitizedRoute.length >= 1) ? sanitizedRoute : null;
            }

            if (!this.state.sourceId || !this.state.targetId) {
                this.state.route = null;
            }
        } catch (error) {
            console.error('加载进化路线配置失败', error);
        }
    }

    saveState() {
        try {
            const payload = {
                sourceId: this.state.sourceId ?? null,
                targetId: this.state.targetId ?? null,
                route: Array.isArray(this.state.route) ? this.state.route : null
            };
            localStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(payload));
        } catch (error) {
            console.error('保存进化路线配置失败', error);
        }
    }

    validateDigimonId(value) {
        return (typeof value === 'number' && digimonMap.has(value)) ? value : null;
    }

    render() {
        if (!this.root) return;

        this.root.innerHTML = '';

        const selectorsWrapper = document.createElement('div');
        selectorsWrapper.className = 'route-selectors';

        const sourceSelector = this.buildSelector('source', '当前数码宝贝');
        const targetSelector = this.buildSelector('target', '目标数码宝贝');

        selectorsWrapper.appendChild(sourceSelector.container);
        selectorsWrapper.appendChild(targetSelector.container);

        const actions = document.createElement('div');
        actions.className = 'route-actions';

        const computeBtn = document.createElement('button');
        computeBtn.type = 'button';
        computeBtn.className = 'route-compute-btn';
        computeBtn.textContent = '计算';
        computeBtn.disabled = !(this.state.sourceId && this.state.targetId);
        computeBtn.onclick = () => this.calculateRoute();

        const hint = document.createElement('span');
        hint.className = 'route-hint';
        hint.textContent = '提示：先在左侧列表选择数码宝贝，再点击上方卡片进行填充。';

        actions.appendChild(computeBtn);
        actions.appendChild(hint);

        const results = document.createElement('div');
        results.className = 'route-results';

        this.root.appendChild(selectorsWrapper);
        this.root.appendChild(actions);
        this.root.appendChild(results);

        this.selectorRefs = {
            source: sourceSelector,
            target: targetSelector
        };
        this.computeBtn = computeBtn;
        this.resultsContainer = results;

        this.renderSelectorCard('source');
        this.renderSelectorCard('target');
        this.renderResults();
    }

    buildSelector(role, title) {
        const container = document.createElement('div');
        container.className = 'route-selector-card';

        const header = document.createElement('div');
        header.className = 'route-selector-header';

        const titleEl = document.createElement('h3');
        titleEl.className = 'route-selector-title';
        titleEl.textContent = title;

        const clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.className = 'route-clear-btn';
        clearBtn.textContent = '清除';
        clearBtn.onclick = () => this.clearSelection(role);

        const card = document.createElement('div');
        card.className = 'training-digimon route-digimon-card empty';
        card.onclick = () => this.assignSelectedDigimon(role);

        header.appendChild(titleEl);
        header.appendChild(clearBtn);

        container.appendChild(header);
        container.appendChild(card);

        return { container, card, clearBtn };
    }

    renderSelectorCard(role) {
        const ref = this.selectorRefs[role];
        if (!ref) return;

        const digimonId = role === 'source' ? this.state.sourceId : this.state.targetId;
        const { card, clearBtn } = ref;

        card.innerHTML = '';
        card.classList.remove('empty');

        if (!digimonId) {
            card.classList.add('empty');
            card.textContent = '点击添加左侧选中的数码宝贝';
            clearBtn.disabled = true;
            return;
        }

        const digimon = digimonMap.get(digimonId);
        if (!digimon) {
            card.classList.add('empty');
            card.textContent = '未找到对应的数码宝贝，请重新选择';
            clearBtn.disabled = false;
            return;
        }

        clearBtn.disabled = false;

        const imageContainer = createSmartImage(digimon, 'digimon-image');
        const info = document.createElement('div');
        info.className = 'route-digimon-info';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'digimon-name';
        nameSpan.textContent = digimon.name;

        const levelSpan = document.createElement('span');
        levelSpan.className = 'route-digimon-level';
        levelSpan.textContent = digimon.level;

        info.appendChild(nameSpan);
        info.appendChild(levelSpan);

        card.appendChild(imageContainer);
        card.appendChild(info);
    }

    assignSelectedDigimon(role) {
        if (!selectedDigimon) {
            alert('请先在左侧选择一个数码宝贝');
            return;
        }

        const key = role === 'source' ? 'sourceId' : 'targetId';
        this.state[key] = selectedDigimon.id;
        this.resetComputedRoute();
        this.saveState();
        this.render();
    }

    clearSelection(role) {
        const key = role === 'source' ? 'sourceId' : 'targetId';
        if (!this.state[key]) return;
        this.state[key] = null;
        this.resetComputedRoute();
        this.saveState();
        this.render();
    }

    resetComputedRoute() {
        this.state.route = null;
        this.state.errorMessage = null;
    }

    calculateRoute() {
        const { sourceId, targetId } = this.state;
        if (!sourceId || !targetId) {
            this.state.errorMessage = '请先选择当前与目标数码宝贝';
            this.state.route = null;
            this.render();
            return;
        }

        const path = findEvolutionRoute(sourceId, targetId);
        if (!path || !path.length) {
            this.state.route = null;
            const sourceName = this.getDigimonName(sourceId);
            const targetName = this.getDigimonName(targetId);
            this.state.errorMessage = `未找到 ${sourceName} → ${targetName} 的可行路线`;
        } else {
            this.state.route = path;
            this.state.errorMessage = null;
        }

        this.saveState();
        this.render();
    }

    getDigimonName(id) {
        const digimon = digimonMap.get(id);
        return digimon ? digimon.name : '未知数码宝贝';
    }

    renderResults() {
        if (!this.resultsContainer) return;
        this.resultsContainer.innerHTML = '';

        if (this.state.errorMessage) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'route-error';
            errorDiv.textContent = this.state.errorMessage;
            this.resultsContainer.appendChild(errorDiv);
            return;
        }

        if (!this.state.sourceId || !this.state.targetId) {
            const placeholder = document.createElement('div');
            placeholder.className = 'route-results-empty';
            placeholder.textContent = '请在上方选择当前与目标数码宝贝，然后点击“计算”查看路线。';
            this.resultsContainer.appendChild(placeholder);
            return;
        }

        if (!Array.isArray(this.state.route) || !this.state.route.length) {
            const placeholder = document.createElement('div');
            placeholder.className = 'route-results-empty';
            placeholder.textContent = '已准备就绪，点击“计算”生成路线。';
            this.resultsContainer.appendChild(placeholder);
            return;
        }

        const digimonPath = this.state.route
            .map(id => digimonMap.get(id))
            .filter(Boolean);

        if (!digimonPath.length) {
            const placeholder = document.createElement('div');
            placeholder.className = 'route-error';
            placeholder.textContent = '路线数据已失效，请重新计算。';
            this.resultsContainer.appendChild(placeholder);
            return;
        }

        const summary = document.createElement('div');
        summary.className = 'route-summary';
        if (digimonPath.length === 1) {
            summary.textContent = '已在目标形态，无需额外进化或退化。';
        } else {
            summary.textContent = `共需经过 ${digimonPath.length - 1} 次进化或退化。`;
        }
        this.resultsContainer.appendChild(summary);

        const stepsWrapper = document.createElement('div');
        stepsWrapper.className = 'route-steps';

        digimonPath.forEach((digimon, index) => {
            const stepCard = document.createElement('div');
            stepCard.className = 'route-step-card';

            const imageContainer = createSmartImage(digimon, 'digimon-image');

            const info = document.createElement('div');
            info.className = 'route-step-info';

            const nameSpan = document.createElement('span');
            nameSpan.className = 'digimon-name';
            nameSpan.textContent = digimon.name;

            const levelSpan = document.createElement('span');
            levelSpan.className = 'route-step-level';
            levelSpan.textContent = digimon.level;

            info.appendChild(nameSpan);
            info.appendChild(levelSpan);

            stepCard.appendChild(imageContainer);
            stepCard.appendChild(info);

            stepsWrapper.appendChild(stepCard);

            if (index < digimonPath.length - 1) {
                const arrow = document.createElement('span');
                arrow.className = 'route-step-arrow';
                arrow.textContent = '→';
                stepsWrapper.appendChild(arrow);
            }
        });

        this.resultsContainer.appendChild(stepsWrapper);
    }
}

function findEvolutionRoute(startId, targetId) {
    if (typeof startId !== 'number' || typeof targetId !== 'number') return null;
    if (!digimonMap.has(startId) || !digimonMap.has(targetId)) return null;
    if (startId === targetId) {
        return [startId];
    }

    const visited = new Set([startId]);
    const queue = [startId];
    const parent = new Map();

    while (queue.length) {
        const currentId = queue.shift();
        const currentDigimon = digimonMap.get(currentId);
        if (!currentDigimon) {
            continue;
        }

        const neighbors = getEvolutionNeighbors(currentDigimon);
        for (const neighborId of neighbors) {
            if (visited.has(neighborId)) continue;
            visited.add(neighborId);
            parent.set(neighborId, currentId);

            if (neighborId === targetId) {
                return reconstructEvolutionRoute(parent, startId, targetId);
            }

            queue.push(neighborId);
        }
    }

    return null;
}

function getEvolutionNeighbors(digimon) {
    const neighbors = new Set();
    if (Array.isArray(digimon.evolvesTo)) {
        digimon.evolvesTo.forEach(id => {
            if (typeof id === 'number' && digimonMap.has(id)) {
                neighbors.add(id);
            }
        });
    }
    if (Array.isArray(digimon.evolvesFrom)) {
        digimon.evolvesFrom.forEach(id => {
            if (typeof id === 'number' && digimonMap.has(id)) {
                neighbors.add(id);
            }
        });
    }
    return neighbors;
}

function reconstructEvolutionRoute(parentMap, startId, targetId) {
    const path = [targetId];
    let currentId = targetId;
    while (currentId !== startId) {
        const prevId = parentMap.get(currentId);
        if (prevId === undefined) {
            return null;
        }
        path.push(prevId);
        currentId = prevId;
    }
    path.reverse();
    return path;
}

// 初始化训练管理器
const trainingManager = new TrainingManager();
// 初始化训练2分类管理器
const trainingCategoryManager = new TrainingCategoryManager();
// 初始化进化路线规划器
const evolutionRoutePlanner = new EvolutionRoutePlanner();