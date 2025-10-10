// 进化图相关功能

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
    
    // 根据进化数量调整布局
    const leftCount = evolutionData.devolutions.length;
    const rightCount = evolutionData.evolutions.length;
    
    if (leftCount > 4 && rightCount <= 4) {
        evolutionLayout.classList.add('wide-left');
    } else if (rightCount > 4 && leftCount <= 4) {
        evolutionLayout.classList.add('wide-right');
    } else if (leftCount > 4 && rightCount > 4) {
        evolutionLayout.classList.add('wide-both');
    }
    
    evolutionChart.appendChild(evolutionLayout);
    
    // 添加点击事件
    addEvolutionClickEvents();
}

function getEvolutionData(digimon) {
    const evolutions = [];
    const devolutions = [];
    
    // 获取进化路线
    if (digimon.evolvesTo && digimon.evolvesTo.length > 0) {
        digimon.evolvesTo.forEach(id => {
            const evolutionDigimon = digimonData.find(d => d.id === id);
            if (evolutionDigimon) {
                evolutions.push(evolutionDigimon);
            }
        });
    }
    
    // 获取退化路线
    if (digimon.evolvesFrom && digimon.evolvesFrom.length > 0) {
        digimon.evolvesFrom.forEach(id => {
            const devolutionDigimon = digimonData.find(d => d.id === id);
            if (devolutionDigimon) {
                devolutions.push(devolutionDigimon);
            }
        });
    }
    
    return { evolutions, devolutions };
}

function renderEvolutionColumn(title, digimons, side) {
    const column = document.createElement('div');
    column.className = `evolution-column ${side}-column`;
    
    if (digimons.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-evolution';
        emptyState.textContent = `无${title.replace('路线', '')}`;
        column.appendChild(emptyState);
        return column;
    }
    
    const titleElement = document.createElement('h4');
    titleElement.textContent = title;
    column.appendChild(titleElement);
    
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';
    
    // 如果数量超过4个，使用两列布局
    if (digimons.length > 4) {
        cardsContainer.classList.add('two-columns');
    }
    
    digimons.forEach(digimon => {
        const card = createDigimonCard(digimon);
        cardsContainer.appendChild(card);
    });
    
    column.appendChild(cardsContainer);
    return column;
}

function renderCurrentDigimon(digimon) {
    const container = document.createElement('div');
    container.className = 'current-digimon';
    
    const card = createDigimonCard(digimon);
    card.classList.add('current');
    
    container.appendChild(card);
    return container;
}

function createDigimonCard(digimon) {
    const card = document.createElement('div');
    card.className = 'digimon-card';
    card.dataset.id = digimon.id;
    
    // 使用智能图片加载
    const imageContainer = createSmartImage(digimon);
    
    const name = document.createElement('div');
    name.className = 'digimon-card-name';
    name.textContent = digimon.name;
    
    const level = document.createElement('div');
    level.className = 'digimon-card-level';
    level.textContent = digimon.level;
    
    card.appendChild(imageContainer);
    card.appendChild(name);
    card.appendChild(level);
    
    return card;
}

function addEvolutionClickEvents() {
    document.querySelectorAll('.digimon-card').forEach(card => {
        if (!card.classList.contains('current')) {
            card.addEventListener('click', () => {
                const digimonId = parseInt(card.dataset.id);
                const digimon = digimonData.find(d => d.id === digimonId);
                if (digimon) {
                    selectDigimon(digimon);
                    scrollToDigimonInList(digimon);
                }
            });
        }
    });
}

// 获取完整进化链
function getFullEvolutionChain(digimon) {
    const chain = {
        previous: [],
        current: digimon,
        next: []
    };
    
    function findPrevious(currentDigimon, depth = 0) {
        if (depth > 10) return; // 防止无限循环
        
        if (currentDigimon.evolvesFrom) {
            currentDigimon.evolvesFrom.forEach(id => {
                const prevDigimon = digimonData.find(d => d.id === id);
                if (prevDigimon && !chain.previous.find(d => d.id === prevDigimon.id)) {
                    chain.previous.unshift(prevDigimon);
                    findPrevious(prevDigimon, depth + 1);
                }
            });
        }
    }
    
    function findNext(currentDigimon, depth = 0) {
        if (depth > 10) return; // 防止无限循环
        
        if (currentDigimon.evolvesTo) {
            currentDigimon.evolvesTo.forEach(id => {
                const nextDigimon = digimonData.find(d => d.id === id);
                if (nextDigimon && !chain.next.find(d => d.id === nextDigimon.id)) {
                    chain.next.push(nextDigimon);
                    findNext(nextDigimon, depth + 1);
                }
            });
        }
    }
    
    findPrevious(digimon);
    findNext(digimon);
    
    return chain;
}