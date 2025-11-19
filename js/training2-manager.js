
const TRAINING_CATEGORY_NAMES = ['HP', 'SP', '攻击', '防御', '智慧', '精神', '敏捷'];

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
            console.error('加载训练配置失败', error);
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
            console.error('保存训练配置失败', error);
        }
    }
}