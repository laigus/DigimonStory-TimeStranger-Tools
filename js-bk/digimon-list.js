
// 处理搜索
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredDigimon = digimonData;
    } else {
        filteredDigimon = digimonData.filter(digimon => {
            // 匹配名称和等级
            const nameMatch = digimon.name.toLowerCase().includes(searchTerm);
            const levelMatch = digimon.level.toLowerCase().includes(searchTerm);
            
            // 拼音首字母搜索
            const pinyinMatch = getStringPinyinInitials(digimon.name).includes(searchTerm) || 
                               getStringPinyinInitials(digimon.level).includes(searchTerm);
            
            // 任一匹配条件成立即返回true
            return nameMatch || levelMatch || pinyinMatch;
        });
    }
    
    renderDigimonList();
    
}

// 渲染数码宝贝列表
function renderDigimonList() {
    digimonListContainer.innerHTML = '';
    
    if (filteredDigimon.length === 0) {
        digimonListContainer.innerHTML = `
            <div class="no-results">
                <p>没有找到匹配的数码宝贝</p>
            </div>
        `;
        return;
    }
    
    filteredDigimon.forEach(digimon => {
        const digimonItem = createDigimonListItem(digimon);
        digimonListContainer.appendChild(digimonItem);
    });
}

// 创建数码宝贝列表项
function createDigimonListItem(digimon) {
    const item = document.createElement('div');
    item.className = 'digimon-item';
    item.dataset.id = digimon.id;
    
    // 使用智能图片加载
    const imageContainer = createSmartImage(digimon);
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'digimon-content';
    
    const nameDiv = document.createElement('div');
    nameDiv.className = 'digimon-name';
    nameDiv.textContent = digimon.name;
    
    const levelDiv = document.createElement('div');
    levelDiv.className = 'digimon-level';
    levelDiv.textContent = digimon.level;
    
    // 添加图片编辑按钮
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-image-btn';
    editBtn.textContent = '📝';
    editBtn.title = '编辑图片';
    editBtn.onclick = (e) => {
        e.stopPropagation();
        openImageEditor(digimon);
    };
    
    contentDiv.appendChild(nameDiv);
    contentDiv.appendChild(levelDiv);
    
    item.appendChild(imageContainer);
    item.appendChild(contentDiv);
    item.appendChild(editBtn);
    
    // 点击事件
    item.addEventListener('click', () => {
        selectDigimon(digimon);
    });
    
    return item;
}

// 选择数码宝贝
function selectDigimon(digimon) {
    selectedDigimon = digimon;
    updateSelectedItems();
    renderEvolutionChart();
}

// 更新选中状态
function updateSelectedItems() {
    // 移除之前的选中状态
    document.querySelectorAll('.digimon-item.selected').forEach(item => {
        item.classList.remove('selected');
    });
    
    // 添加新的选中状态
    if (selectedDigimon) {
        const selectedItem = document.querySelector(`.digimon-item[data-id="${selectedDigimon.id}"]`);
        if (selectedItem) {
            selectedItem.classList.add('selected');
        }
    }
}

// 滚动到列表中的数码宝贝
function scrollToDigimonInList(digimon) {
    const digimonItem = document.querySelector(`.digimon-item[data-id="${digimon.id}"]`);
    if (digimonItem) {
        digimonItem.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }
}
