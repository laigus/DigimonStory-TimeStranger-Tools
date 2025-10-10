// 智能图片加载函数
function createSmartImage(digimon, className = 'digimon-image') {
    const container = document.createElement('div');
    container.style.display = 'inline-block';
    
    const img = document.createElement('img');
    img.className = className;
    img.alt = digimon.name;
    
    // 图片格式列表，按优先级排序
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    let currentExtensionIndex = 0;
    let imageLoaded = false;
    
    // 创建空白圆圈占位符
    function createPlaceholder() {
        const placeholder = document.createElement('div');
        placeholder.className = className + ' empty-placeholder';
        placeholder.setAttribute('data-name', digimon.name);
        return placeholder;
    }
    
    // 尝试加载图片的函数
    function tryLoadImage() {
        if (currentExtensionIndex < imageExtensions.length) {
            const extension = imageExtensions[currentExtensionIndex];
            const imagePath = `picture/${digimon.name}${extension}`;
            
            img.src = imagePath;
            
            // 如果图片加载成功
            img.onload = () => {
                if (!imageLoaded) {
                    imageLoaded = true;
                    container.appendChild(img);
                }
            };
            
            // 如果图片加载失败，尝试下一个格式
            img.onerror = () => {
                currentExtensionIndex++;
                tryLoadImage();
            };
        } else {
            // 所有格式都失败了，显示空白圆圈
            if (!imageLoaded) {
                imageLoaded = true;
                const placeholder = createPlaceholder();
                container.appendChild(placeholder);
            }
        }
    }
    
    // 开始尝试加载图片
    tryLoadImage();
    
    return container;
}

// 获取图片路径（用于直接设置src的情况）
function getSmartImagePath(digimonName) {
    // 首先尝试 jpg 格式
    return `picture/${digimonName}.png`;
}

// 拼音首字母映射表（扩展版，包含数码宝贝常用汉字）
const pinyinMap = {
    // 英文字母
    'a': 'A', 'b': 'B', 'c': 'C', 'd': 'D', 'e': 'E', 'f': 'F', 'g': 'G', 'h': 'H',
    'i': 'I', 'j': 'J', 'k': 'K', 'l': 'L', 'm': 'M', 'n': 'N', 'o': 'O', 'p': 'P',
    'q': 'Q', 'r': 'R', 's': 'S', 't': 'T', 'u': 'U', 'v': 'V', 'w': 'W', 'x': 'X',
    'y': 'Y', 'z': 'Z',
    
    // 数码宝贝常用汉字
    '亚': 'Y', '古': 'G', '兽': 'S', '巴': 'B', '达': 'D', '暴': 'B', '龙': 'L',
    '加': 'J', '鲁': 'L', '哥': 'G', '滚': 'G', '球': 'Q', '独': 'D', '角': 'J',
    '马': 'M', '喵': 'M', '比': 'B', '多': 'D', '布': 'B', '尼': 'N', '虫': 'C',
    '花': 'H', '仙': 'X', '天': 'T', '使': 'S', '恶': 'E', '魔': 'M', '完': 'W',
    '全': 'Q', '体': 'T', '究': 'J', '极': 'J', '战': 'Z', '斗': 'D', '暗': 'A',
    '黑': 'H', '大': 'D', '帝': 'D', '钢': 'G', '铁': 'T', '海': 'H', '妖': 'Y',
    '精': 'J', '仙': 'X', '鸟': 'N', '鹰': 'Y', '狮': 'S', '白': 'B', '虎': 'H',
    '熊': 'X', '猫': 'M', '犬': 'Q', '狗': 'G', '狼': 'L', '青': 'Q', '蛙': 'W',
    '火': 'H', '焰': 'Y', '冰': 'B', '雪': 'X', '雷': 'L', '电': 'D', '光': 'G',
    '神': 'S', '圣': 'S', '机': 'J', '械': 'X', '数': 'S', '码': 'M', '宝': 'B',
    '贝': 'B', '小': 'X', '年': 'N', '期': 'Q', '成': 'C', '长': 'Z', '幼': 'Y',
    '成': 'C', '熟': 'S', '卑': 'B', '劣': 'L', '矿': 'K', '石': 'S', '烂': 'L',
    '泥': 'N', '锯': 'J', '齿': 'C', '甲': 'J', '虫': 'C', '螃': 'P', '蟹': 'X',
    '乌': 'W', '龟': 'G', '鼻': 'B', '涕': 'T', '贝': 'B', '壳': 'K', '水': 'S',
    '母': 'M', '浮': 'F', '游': 'Y', '星': 'X', '年': 'N', '糕': 'G', '毛': 'M',
    '人': 'R', '吱': 'Z', '艾': 'A', '力': 'L', '柏': 'B', '古': 'G', '德': 'D',
    '尔': 'E', '塔': 'T', '迪': 'D', '单': 'D', '犄': 'J', '强': 'Q', '袭': 'X',
    '日': 'R', '冕': 'M', '萨': 'S', '满': 'M', '腔': 'Q', '棘': 'J', '鱼': 'Y',
    '砗': 'C', '磲': 'Q', '哈': 'H', '克': 'K', '核': 'H', '蓝': 'L', '梗': 'G',
    '地': 'D', '毒': 'D', '蜘': 'Z', '蛛': 'Z', '爪': 'Z', '蓝': 'L', '红': 'H',
    '绿': 'L', '黄': 'H', '紫': 'Z', '粉': 'F', '橙': 'C', '金': 'J', '银': 'Y'
};

// 获取中文字符的拼音首字母
function getPinyinInitial(char) {
    // 英文和数字直接返回
    if (/[a-zA-Z0-9]/.test(char)) {
        return char.toUpperCase();
    }
    
    // 中文字符映射
    if (pinyinMap[char]) {
        return pinyinMap[char];
    }
    
    // 根据Unicode范围判断常用汉字的拼音首字母
    const code = char.charCodeAt(0);
    if (code >= 0x4e00 && code <= 0x9fff) {
        // 简化的拼音首字母判断（基于Unicode范围）
        const ranges = [
            [0x4e00, 0x4fff, 'A'], [0x5000, 0x50ff, 'B'], [0x5100, 0x51ff, 'C'],
            [0x5200, 0x52ff, 'D'], [0x5300, 0x53ff, 'E'], [0x5400, 0x54ff, 'F'],
            [0x5500, 0x55ff, 'G'], [0x5600, 0x56ff, 'H'], [0x5700, 0x57ff, 'I'],
            [0x5800, 0x58ff, 'J'], [0x5900, 0x59ff, 'K'], [0x5a00, 0x5aff, 'L'],
            [0x5b00, 0x5bff, 'M'], [0x5c00, 0x5cff, 'N'], [0x5d00, 0x5dff, 'O'],
            [0x5e00, 0x5eff, 'P'], [0x5f00, 0x5fff, 'Q'], [0x6000, 0x60ff, 'R'],
            [0x6100, 0x61ff, 'S'], [0x6200, 0x62ff, 'T'], [0x6300, 0x63ff, 'U'],
            [0x6400, 0x64ff, 'V'], [0x6500, 0x65ff, 'W'], [0x6600, 0x66ff, 'X'],
            [0x6700, 0x67ff, 'Y'], [0x6800, 0x9fff, 'Z']
        ];
        
        for (let [start, end, letter] of ranges) {
            if (code >= start && code <= end) {
                return letter;
            }
        }
    }
    
    return '#'; // 无法识别的字符
}

// 获取字符串的拼音首字母
function getStringPinyinInitials(str) {
    return str.split('').map(char => getPinyinInitial(char)).join('').toLowerCase();
}

// 调试函数：显示数码宝贝名称的拼音首字母（可在控制台使用）
function debugPinyinInitials() {
    digimonData.forEach(digimon => {
        console.log(`${digimon.name}: ${getStringPinyinInitials(digimon.name)}`);
    });
}