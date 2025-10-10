// 主文件 - 全局变量和初始化

// DOM 元素
const searchInput = document.getElementById('searchInput');
const digimonListContainer = document.getElementById('digimonListContainer');
const evolutionChart = document.getElementById('evolutionChart');

// 全局变量
let selectedDigimon = null;
let filteredDigimon = digimonData;

// 管理器实例
let imageManager;
let tabManager;
let trainingManager;

// 初始化应用
function initializeApp() {
    renderDigimonList();
    setupEventListeners();
    addKeyboardSupport();
    addTouchSupport();
    
    // 初始化管理器
    imageManager = new ImageManager();
    tabManager = new TabManager();
    trainingManager = new TrainingManager();
}

function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keydown', handleSearch);
}

function addKeyboardSupport() {
    document.addEventListener('keydown', (event) => {
        // ESC键清除搜索
        if (event.key === 'Escape') {
            searchInput.value = '';
            filteredDigimon = digimonData;
            renderDigimonList();
            searchInput.focus();
        }
        
        // F键随机选择数码宝贝
        if (event.key === 'f' || event.key === 'F') {
            if (!event.ctrlKey && !event.altKey) {
                event.preventDefault();
                const randomDigimon = getRandomDigimon();
                selectDigimon(randomDigimon);
                scrollToDigimonInList(randomDigimon);
            }
        }
        
        // 方向键导航
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            if (document.activeElement !== searchInput) {
                event.preventDefault();
                navigateDigimonList(event.key === 'ArrowUp' ? -1 : 1);
            }
        }
    });
}

function addTouchSupport() {
    let touchStartY = 0;
    let touchEndY = 0;
    
    digimonListContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    digimonListContainer.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diffY = touchStartY - touchEndY;
        
        if (Math.abs(diffY) > swipeThreshold) {
            // 可以在这里添加滑动手势的处理
        }
    }
    
    // 添加双击支持
    let lastTap = 0;
    digimonListContainer.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 500 && tapLength > 0) {
            // 双击事件
            const randomDigimon = getRandomDigimon();
            selectDigimon(randomDigimon);
            scrollToDigimonInList(randomDigimon);
        }
        
        lastTap = currentTime;
    });
}

function navigateDigimonList(direction) {
    if (!selectedDigimon || filteredDigimon.length === 0) return;
    
    const currentIndex = filteredDigimon.findIndex(d => d.id === selectedDigimon.id);
    if (currentIndex === -1) return;
    
    let newIndex = currentIndex + direction;
    
    // 循环导航
    if (newIndex < 0) {
        newIndex = filteredDigimon.length - 1;
    } else if (newIndex >= filteredDigimon.length) {
        newIndex = 0;
    }
    
    const newDigimon = filteredDigimon[newIndex];
    selectDigimon(newDigimon);
    scrollToDigimonInList(newDigimon);
}

// 字体选择功能
document.addEventListener('DOMContentLoaded', () => {
    const fontSelector = document.getElementById('fontSelector');
    if (fontSelector) {
        fontSelector.addEventListener('change', (e) => {
            const selectedFont = e.target.value;
            document.body.className = selectedFont === 'default' ? '' : selectedFont;
        });
    }
});

// 启动应用
document.addEventListener('DOMContentLoaded', initializeApp);