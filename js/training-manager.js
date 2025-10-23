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