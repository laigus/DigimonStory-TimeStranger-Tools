// DOM 元素
const searchInput = document.getElementById('searchInput');
const digimonListContainer = document.getElementById('digimonListContainer');
const evolutionChart = document.getElementById('evolutionChart');

let selectedDigimon = null;
let filteredDigimon = digimonData;


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
        this.activeTab = 'evolution';
        this.lastTab = 'evolution';
        this.init();
    }

    init() {
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tabId = e.target.dataset.tab;
                this.switchTab(tabId);
            });
        });
    }

    switchTab(tabId) {
        if (tabId === this.activeTab) return;
        const direction = tabId === 'training' ? 'right' : 'left';

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

// 训练管理器
class TrainingManager {
    constructor() {
        this.trainingItems = [];
        this.nextId = 1;
        const restored = this.loadState();
        if (!restored) {
            this.initializeDefaultItems();
        }
        this.render();
        if (!restored) {
            this.saveState();
        }
    }

    initializeDefaultItems() {
        const defaultLabels = ['HP', 'SP', '攻击', '防御', '智力', '精神', '敏捷'];
        defaultLabels.forEach(label => {
            this.trainingItems.push({
                id: this.nextId++,
                label: label,
                digimonId: null,
                target: '',
                isDefault: true
            });
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
        labelDiv.textContent = item.label;

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

        const targetInput = document.createElement('input');
        targetInput.type = 'number';
        targetInput.className = 'training-target';
        targetInput.placeholder = '目标值';
        targetInput.value = item.target ?? '';
        targetInput.onchange = (e) => this.updateTarget(item.id, e.target.value);

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
            label: parentItem.label,
            digimonId: null,
            target: '',
            isDefault: false
        };

        // 在父项目后面插入新项目
        const parentIndex = this.trainingItems.findIndex(item => item.id === parentId);
        this.trainingItems.splice(parentIndex + 1, 0, newItem);

        this.render();
        this.saveState();
    }

    removeItem(itemId) {
        this.trainingItems = this.trainingItems.filter(item => item.id !== itemId);
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
                    label: item.label,
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
            if (!raw) return false;
            const parsed = JSON.parse(raw);
            if (!parsed || !Array.isArray(parsed.items)) {
                return false;
            }

            const items = parsed.items.map((item, index) => {
                const id = typeof item.id === 'number' ? item.id : this.nextId + index;
                return {
                    id,
                    label: typeof item.label === 'string' ? item.label : '',
                    digimonId: (typeof item.digimonId === 'number' || item.digimonId === null) ? item.digimonId : null,
                    target: item.target ?? '',
                    isDefault: !!item.isDefault
                };
            }).filter(item => item.label);

            if (!items.length) {
                return false;
            }

            this.trainingItems = items;
            const maxId = items.reduce((max, item) => Math.max(max, item.id), 0);
            if (typeof parsed.nextId === 'number' && parsed.nextId > maxId) {
                this.nextId = parsed.nextId;
            } else {
                this.nextId = maxId + 1;
            }

            return true;
        } catch (error) {
            console.error('加载训练配置失败', error);
            return false;
        }
    }
}

// 初始化训练管理器
const trainingManager = new TrainingManager();