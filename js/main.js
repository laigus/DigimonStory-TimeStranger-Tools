// DOM 元素
const searchInput = document.getElementById('searchInput');
const digimonListContainer = document.getElementById('digimonListContainer');

// 存储键
const NOTES_STORAGE_KEY = 'digimon-notes-content';
const TRAINING_CATEGORY_STORAGE_KEY = 'digimon-training2-items';
const ROUTE_STORAGE_KEY = 'digimon-route-planner';

// 应用实例
let selectedDigimon = null;
let filteredDigimon = digimonData;
let tabManager;
let trainingCategoryManager;
let evolutionRoutePlanner;

// 初始化应用
function initializeApp() {
    renderDigimonList();
    setupEventListeners();
    addKeyboardSupport();
    addTouchSupport();

    tabManager = new TabManager();
    evolutionRoutePlanner = new EvolutionRoutePlanner();
    trainingCategoryManager = new TrainingCategoryManager();
    localStorage.removeItem('digimon-training-items'); // 清理已废弃的训练页数据
    renderPersonalityChart();
    initializeNotesPane();
        
    // 可选：自动选择第一个数码宝贝作为演示
    if (digimonData.length > 0) {
        setTimeout(() => {
            selectDigimon(digimonData[0]);
        }, 500);
    }

    // ===== 字体选择逻辑 =====
    const fontSelector = document.getElementById('fontSelector');
    if (fontSelector) {
        const allowedFonts = new Set(['default','kuai','xiaowei','mashan','longcang','lubrifont','yuanyuan','fangfang']);
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

    // ===== 主题选择逻辑 =====
    const themeSelector = document.getElementById('themeSelector');
    if (themeSelector) {
        const allowedThemes = new Set(['default', 'glass', 'crystal']);
        let savedTheme = localStorage.getItem('digimon-theme-choice') || 'default';
        if (!allowedThemes.has(savedTheme)) savedTheme = 'default';
        themeSelector.value = savedTheme;
        document.body.setAttribute('data-theme', savedTheme);

        themeSelector.addEventListener('change', () => {
            const val = themeSelector.value;
            document.body.setAttribute('data-theme', allowedThemes.has(val) ? val : 'default');
            localStorage.setItem('digimon-theme-choice', val);
        });
    }

    // ===== 颜色主题选择逻辑 =====
    const colorSelector = document.getElementById('colorSelector');
    if (colorSelector) {
        const allowedColors = new Set(['purple', 'ocean', 'sunset', 'forest', 'rose', 'night']);
        let savedColor = localStorage.getItem('digimon-color-choice') || 'purple';
        if (!allowedColors.has(savedColor)) savedColor = 'purple';
        colorSelector.value = savedColor;
        document.body.setAttribute('data-color', savedColor);

        colorSelector.addEventListener('change', () => {
            const val = colorSelector.value;
            document.body.setAttribute('data-color', allowedColors.has(val) ? val : 'purple');
            localStorage.setItem('digimon-color-choice', val);
        });
    }

}

// 设置搜索框监听器
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
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
document.addEventListener('DOMContentLoaded', initializeApp);
