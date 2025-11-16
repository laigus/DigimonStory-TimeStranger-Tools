
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
        <div class="digimon-id">ID: ${digimon.id}</div>
    `;
    
    // 创建查看图标
    const viewBtn = document.createElement('button');
    viewBtn.className = 'view-image-btn';
    viewBtn.innerHTML = '🔍';
    viewBtn.title = '查看大图';
    viewBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 防止触发选择数码宝贝
        viewFullImage(digimon);
    });
    
    // 组装元素
    contentDiv.appendChild(imageElement);
    contentDiv.appendChild(infoDiv);
    item.appendChild(contentDiv);
    item.appendChild(viewBtn);
    
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

// 查看完整图片
function viewFullImage(digimon) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    
    // 创建模态框内容
    const modalContent = document.createElement('div');
    modalContent.className = 'image-modal-content';
    
    // 创建关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.className = 'image-modal-close';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = () => {
        document.body.removeChild(modal);
    };
    
    // 创建图片元素
    const img = document.createElement('img');
    img.className = 'image-modal-img';
    img.alt = digimon.name;
    
    // 尝试多种图片格式
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    let currentExtensionIndex = 0;
    
    function tryLoadImage() {
        if (currentExtensionIndex < imageExtensions.length) {
            const extension = imageExtensions[currentExtensionIndex];
            const imagePath = `picture/${digimon.name}${extension}`;
            img.src = imagePath;
            
            img.onerror = () => {
                currentExtensionIndex++;
                tryLoadImage();
            };
        } else {
            // 如果所有格式都失败，使用占位符
            img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="%23f0f0f0"/><text x="50%" y="50%" text-anchor="middle" fill="%23999" font-size="20">图片未找到</text></svg>';
        }
    }
    
    tryLoadImage();
    
    // 创建图片标题
    const title = document.createElement('div');
    title.className = 'image-modal-title';
    title.innerHTML = `
        <span class="digimon-name">${digimon.name}</span>
        <span class="digimon-level">${digimon.level}</span>
    `;
    
    // 组装模态框
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(img);
    modalContent.appendChild(title);
    modal.appendChild(modalContent);
    
    // 添加到body
    document.body.appendChild(modal);
    
    // 点击模态框背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // ESC键关闭
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}
