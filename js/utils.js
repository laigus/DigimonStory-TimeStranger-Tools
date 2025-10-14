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


// 拼音首字母映射表（扩展版，包含数码宝贝常用汉字）
const pinyinMap = {
    // 英文字母
    'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e', 'f': 'f', 'g': 'g', 'h': 'h',
    'i': 'i', 'j': 'j', 'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'p',
    'q': 'q', 'r': 'r', 's': 's', 't': 't', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x',
    'y': 'y', 'z': 'z',
    
    // 数码宝贝常用汉字
    '丁': 'd', '万': 'w', '三': 's', '丑': 'c', '世': 's', '丘': 'q', '丝': 's', '丧': 's',
    '中': 'z', '主': 'z', '丽': 'l', '乃': 'n', '么': 'm', '义': 'y', '之': 'z', '乌': 'w',
    '九': 'j', '五': 'w', '亚': 'y', '亡': 'w', '京': 'j', '亮': 'l', '人': 'r', '什': 's',
    '仇': 'c', '仔': 'z', '仙': 'x', '代': 'd', '企': 'q', '伊': 'y', '伐': 'f', '优': 'y',
    '佐': 'z', '体': 't', '佛': 'f', '使': 's', '侵': 'q', '便': 'b', '偶': 'o', '像': 'x',
    '僵': 'j', '儿': 'e', '兆': 'z', '光': 'g', '克': 'k', '免': 'm', '兔': 't', '入': 'r',
    '八': 'b', '公': 'g', '兰': 'l', '具': 'j', '兹': 'z', '兽': 's', '冕': 'm', '冰': 'b',
    '净': 'j', '几': 'j', '凤': 'f', '凯': 'k', '凰': 'h', '击': 'j', '刃': 'r', '分': 'f',
    '利': 'l', '别': 'b', '刺': 'c', '刻': 'k', '剑': 'j', '力': 'l', '加': 'j', '劣': 'l',
    '努': 'n', '勇': 'y', '十': 's', '千': 'q', '升': 's', '半': 'b', '华': 'h', '卑': 'b',
    '单': 'd', '南': 'n', '卜': 'b', '卡': 'k', '卫': 'w', '友': 'y', '取': 'q', '古': 'g',
    '可': 'k', '叶': 'y', '向': 'x', '君': 'j', '启': 'q', '吱': 'z', '吸': 'x', '吼': 'h',
    '咫': 'z', '咲': 'x', '哈': 'h', '哥': 'g', '啄': 'z', '善': 's', '喵': 'm', '器': 'q',
    '固': 'g', '国': 'g', '土': 't', '圣': 's', '地': 'd', '圾': 'j', '坎': 'k', '坏': 'h',
    '坦': 't', '垂': 'c', '垃': 'l', '埃': 'a', '基': 'j', '塔': 't', '塞': 's', '墨': 'm',
    '士': 's', '壬': 'r', '壳': 'k', '备': 'b', '复': 'f', '外': 'w', '多': 'd', '大': 'd',
    '天': 't', '夫': 'f', '头': 't', '奇': 'q', '奥': 'a', '女': 'n', '妖': 'y', '姆': 'm',
    '娜': 'n', '媒': 'm', '子': 'z', '字': 'z', '守': 's', '安': 'a', '宝': 'b', '宾': 'b',
    '密': 'm', '尊': 'z', '小': 'x', '尔': 'e', '尸': 's', '尼': 'n', '尾': 'w', '属': 's',
    '山': 's', '左': 'z', '巧': 'q', '巨': 'j', '巫': 'w', '巴': 'b', '布': 'b', '师': 's',
    '帝': 'd', '带': 'd', '年': 'n', '幻': 'h', '庇': 'b', '库': 'k', '座': 'z', '强': 'q',
    '录': 'l', '形': 'x', '彩': 'c', '影': 'y', '德': 'd', '怨': 'y', '怪': 'g', '恐': 'k',
    '恶': 'e', '悟': 'w', '情': 'q', '戈': 'g', '战': 'z', '手': 's', '托': 't', '抓': 'z',
    '拉': 'l', '挖': 'w', '掌': 'z', '掘': 'j', '提': 't', '摔': 's', '撒': 's', '撤': 'c',
    '支': 'z', '救': 'j', '数': 's', '斗': 'd', '斩': 'z', '斯': 's', '新': 'x', '无': 'w',
    '日': 'r', '旦': 'd', '时': 's', '明': 'm', '星': 'x', '普': 'p', '智': 'z', '暗': 'a',
    '暴': 'b', '月': 'y', '木': 'm', '朱': 'z', '机': 'j', '杜': 'd', '杰': 'j', '极': 'j',
    '林': 'l', '枪': 'q', '枯': 'k', '柏': 'b', '栓': 's', '核': 'h', '格': 'g', '桶': 't',
    '梅': 'm', '梗': 'g', '梦': 'm', '械': 'x', '棘': 'j', '楼': 'l', '正': 'z', '武': 'w',
    '死': 's', '母': 'm', '毒': 'd', '比': 'b', '毛': 'm', '气': 'q', '水': 's', '汪': 'w',
    '沌': 'd', '沙': 's', '河': 'h', '法': 'f', '泡': 'p', '波': 'b', '泥': 'n', '泰': 't',
    '洛': 'l', '浮': 'f', '海': 'h', '涅': 'n', '涕': 't', '混': 'h', '渡': 'd', '温': 'w',
    '游': 'y', '滚': 'g', '满': 'm', '潜': 'q', '火': 'h', '灭': 'm', '灰': 'h', '灵': 'l',
    '灾': 'z', '炎': 'y', '炮': 'p', '炽': 'c', '烂': 'l', '烈': 'l', '烧': 's', '焰': 'y',
    '熊': 'x', '燃': 'r', '爪': 'z', '爵': 'j', '爷': 'y', '牙': 'y', '牛': 'n', '物': 'w',
    '特': 't', '犀': 'x', '犄': 'j', '犬': 'q', '犰': 'q', '犸': 'm', '狄': 'd', '狐': 'h',
    '狗': 'g', '狙': 'j', '独': 'd', '狮': 's', '狱': 'y', '狳': 'y', '狸': 'l', '狼': 'l',
    '猎': 'l', '猛': 'm', '猫': 'm', '猴': 'h', '猿': 'y', '玉': 'y', '王': 'w', '玛': 'm',
    '玩': 'w', '球': 'q', '瑞': 'r', '瓜': 'g', '瓦': 'w', '甲': 'j', '电': 'd', '男': 'n',
    '番': 'f', '癸': 'g', '白': 'b', '百': 'b', '皇': 'h', '盔': 'k', '眼': 'y', '石': 's',
    '矿': 'k', '码': 'm', '破': 'p', '碎': 's', '碟': 'd', '示': 's', '祖': 'z', '神': 's',
    '离': 'l', '禽': 'q', '种': 'z', '科': 'k', '秘': 'm', '究': 'j', '空': 'k', '章': 'z',
    '童': 't', '等': 'd', '管': 'g', '米': 'm', '精': 'j', '糕': 'g', '级': 'j', '纪': 'j',
    '纳': 'n', '纽': 'n', '终': 'z', '维': 'w', '绿': 'l', '罗': 'l', '美': 'm', '翼': 'y',
    '耀': 'y', '老': 'l', '者': 'z', '耳': 'e', '耶': 'y', '胡': 'h', '腔': 'q', '腕': 'w',
    '臂': 'b', '至': 'z', '艇': 't', '色': 's', '艾': 'a', '芙': 'f', '花': 'h', '芳': 'f',
    '荷': 'h', '莉': 'l', '莫': 'm', '莲': 'l', '菇': 'g', '菜': 'c', '菲': 'f', '萨': 's',
    '葛': 'g', '葵': 'k', '蒂': 'd', '蓝': 'l', '蔷': 'q', '薇': 'w', '蘑': 'm', '虎': 'h',
    '虫': 'c', '虾': 'x', '蚪': 'd', '蛇': 's', '蛋': 'd', '蛙': 'w', '蛛': 'z', '蛹': 'y',
    '蜂': 'f', '蜘': 'z', '蝌': 'k', '螃': 'p', '螺': 'l', '蟹': 'x', '血': 'x', '行': 'x',
    '袭': 'x', '裂': 'l', '装': 'z', '西': 'x', '角': 'j', '诺': 'n', '课': 'k', '豆': 'd',
    '豚': 't', '贝': 'b', '贡': 'g', '贤': 'x', '贼': 'z', '赖': 'l', '超': 'c', '跃': 'y',
    '跤': 'j', '路': 'l', '车': 'c', '轮': 'l', '载': 'z', '达': 'd', '迦': 'j', '迪': 'd',
    '速': 's', '道': 'd', '都': 'd', '里': 'l', '野': 'y', '金': 'j', '钟': 'z', '钢': 'g',
    '钻': 'z', '铁': 't', '银': 'y', '锋': 'f', '键': 'j', '锯': 'j', '锹': 'q', '长': 'z',
    '闪': 's', '阿': 'a', '限': 'x', '陨': 'y', '雅': 'y', '雏': 'c', '雪': 'x', '雷': 'l',
    '音': 'y', '须': 'x', '顽': 'w', '顿': 'd', '颅': 'l', '领': 'l', '颈': 'j', '风': 'f',
    '飞': 'f', '首': 's', '香': 'x', '马': 'm', '驹': 'j', '骏': 'j', '骑': 'q', '骨': 'g',
    '骷': 'k', '髅': 'l', '高': 'g', '鬼': 'g', '魔': 'm', '鱼': 'y', '鲁': 'l', '鲨': 's',
    '鲸': 'j', '鸟': 'n', '鸡': 'j', '鸦': 'y', '鹅': 'e', '鹉': 'w', '鹦': 'y', '鹫': 'j',
    '鹰': 'y', '麒': 'q', '麟': 'l', '麻': 'm', '黄': 'h', '黑': 'h', '鼠': 's', '鼹': 'y',
    '鼻': 'b', '齿': 'c', '龙': 'l', '龟': 'g', '幼': 'y', '期': 'q', '成': 'c', '熟': 's',
    '合': 'h', '完': 'w', '全': 'q', '砗': 'c', '磲': 'q', "貘": 'm'
};

// 获取中文字符的拼音首字母
function getPinyinInitial(char) {
    const code = char.charCodeAt(0);
    
    // 英文和数字直接返回
    if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code >= 48 && code <= 57)) {
        return char.toLowerCase();
    }
    
    // 中文字符映射
    if (pinyinMap[char]) {
        return pinyinMap[char];
    }
    
    // 根据Unicode范围判断常用汉字的拼音首字母
    if (code >= 0x4e00 && code <= 0x9fff) {
        // 简化的拼音首字母判断（基于Unicode范围）
        const ranges = [
            [0x4e00, 0x4fff, 'a'], [0x5000, 0x50ff, 'b'], [0x5100, 0x51ff, 'c'],
            [0x5200, 0x52ff, 'd'], [0x5300, 0x53ff, 'e'], [0x5400, 0x54ff, 'f'],
            [0x5500, 0x55ff, 'g'], [0x5600, 0x56ff, 'h'], [0x5700, 0x57ff, 'j'],
            [0x5800, 0x58ff, 'k'], [0x5900, 0x59ff, 'l'], [0x5a00, 0x5aff, 'm'],
            [0x5b00, 0x5bff, 'n'], [0x5c00, 0x5cff, 'p'], [0x5d00, 0x5dff, 'q'],
            [0x5e00, 0x5eff, 'r'], [0x5f00, 0x5fff, 's'], [0x6000, 0x60ff, 't'],
            [0x6100, 0x61ff, 'w'], [0x6200, 0x62ff, 'x'], [0x6300, 0x63ff, 'y'],
            [0x6400, 0x9fff, 'z']
        ];
        
        for (const [start, end, initial] of ranges) {
            if (code >= start && code <= end) {
                return initial;
            }
        }
    }
    
    return char.toLowerCase();
}

// 获取字符串的拼音首字母
function getStringPinyinInitials(str) {
    return str.split('').map(char => getPinyinInitial(char)).join('');
}

// 调试函数：显示数码宝贝名称的拼音首字母（可在控制台使用）
function debugPinyinInitials() {
    console.log('数码宝贝拼音首字母映射：');
    digimonData.slice(0, 10).forEach(digimon => {
        const initials = getStringPinyinInitials(digimon.name);
        console.log(`${digimon.name} -> ${initials}`);
    });
}