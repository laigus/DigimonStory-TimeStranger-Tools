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