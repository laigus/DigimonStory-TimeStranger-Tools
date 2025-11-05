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
    
    // 创建图片容器
    const imageContainer = document.createElement('div');
    imageContainer.className = 'card-image-container';
    
    // 创建智能图片元素
    const imageElement = createSmartImage(digimon, 'digimon-image');
    imageContainer.appendChild(imageElement);
    
    // 创建查看按钮
    const viewBtn = document.createElement('button');
    viewBtn.className = 'card-view-btn';
    viewBtn.innerHTML = '🔍';
    viewBtn.title = '查看大图';
    viewBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 防止触发卡片点击事件
        viewFullImage(digimon);
    });
    imageContainer.appendChild(viewBtn);
    
    // 创建名称元素
    const nameDiv = document.createElement('div');
    nameDiv.className = 'digimon-name';
    nameDiv.textContent = digimon.name;
    
    // 创建等级元素
    const levelDiv = document.createElement('div');
    levelDiv.className = 'digimon-level';
    levelDiv.textContent = digimon.level;
    
    // 组装卡片
    card.appendChild(imageContainer);
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