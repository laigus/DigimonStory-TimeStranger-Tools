
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
    
    if (selectedDigimon && selectedDigimon.id === digimon.id) {
        item.classList.add('selected');
    }
    
    // 创建内容容器
    const contentDiv = document.createElement('div');
    contentDiv.className = 'digimon-content';
    
    // 创建智能图片元素
    const imageElement = createSmartImage(digimon, 'digimon-image');
    
    // 创建信息容器
    const infoDiv = document.createElement('div');
    infoDiv.className = 'digimon-info';
    infoDiv.innerHTML = `
        <div class="digimon-name">${digimon.name}</div>
        <div class="digimon-level">${digimon.level}</div>
    `;
    
    // 创建编辑图标
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-image-btn';
    editBtn.innerHTML = '✏️';
    editBtn.title = '编辑图片';
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 防止触发选择数码宝贝
        openImageEditor(digimon);
    });
    
    // 组装元素
    contentDiv.appendChild(imageElement);
    contentDiv.appendChild(infoDiv);
    item.appendChild(contentDiv);
    item.appendChild(editBtn);
    
    // 点击主体区域选择数码宝贝
    contentDiv.addEventListener('click', () => selectDigimon(digimon));
    
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
    const items = digimonListContainer.querySelectorAll('.digimon-item');
    items.forEach(item => {
        if (parseInt(item.dataset.id) === selectedDigimon.id) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

// 滚动到列表中的数码宝贝
function scrollToDigimonInList(digimon) {
    const listItem = digimonListContainer.querySelector(`[data-id="${digimon.id}"]`);
    if (listItem) {
        listItem.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}
