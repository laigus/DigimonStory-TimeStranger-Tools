// 训练管理器模块

class TrainingManager {
    constructor() {
        this.trainingItems = [];
        this.nextId = 1;
        this.initializeDefaultItems();
        this.render();
    }

    initializeDefaultItems() {
        const defaultLabels = ['HP', 'SP', '攻击', '防御', '敏捷', '智慧', '精神'];
        defaultLabels.forEach(label => {
            this.trainingItems.push({
                id: this.nextId++,
                label: label,
                digimon: null,
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
        digimonDiv.className = `training-digimon ${item.digimon ? '' : 'empty'}`;
        digimonDiv.onclick = () => this.selectDigimon(item.id);

        if (item.digimon) {
            // 使用 createSmartImage 创建图片
            const imageContainer = createSmartImage(item.digimon, 'digimon-image');
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'digimon-name';
            nameSpan.textContent = item.digimon.name;

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
            digimonDiv.textContent = '点击添加左侧选中的数码宝贝';
        }

        const targetInput = document.createElement('input');
        targetInput.type = 'number';
        targetInput.className = 'training-target';
        targetInput.placeholder = '目标值';
        targetInput.value = item.target;
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
            digimon: null,
            target: '',
            isDefault: false
        };

        // 在父项目后面插入新项目
        const parentIndex = this.trainingItems.findIndex(item => item.id === parentId);
        this.trainingItems.splice(parentIndex + 1, 0, newItem);

        this.render();
    }

    removeItem(itemId) {
        this.trainingItems = this.trainingItems.filter(item => item.id !== itemId);
        this.render();
    }

    selectDigimon(itemId) {
        // 直接使用当前选择的数码宝贝
        if (selectedDigimon) {
            const item = this.trainingItems.find(item => item.id === itemId);
            if (item) {
                item.digimon = selectedDigimon;
                this.render();
            }
        } else {
            alert('请先在左侧选择一个数码宝贝');
        }
    }

    clearDigimon(itemId) {
        const item = this.trainingItems.find(item => item.id === itemId);
        if (item) {
            item.digimon = null;
            this.render();
        }
    }

    updateTarget(itemId, value) {
        const item = this.trainingItems.find(item => item.id === itemId);
        if (item) {
            item.target = value;
        }
    }
}