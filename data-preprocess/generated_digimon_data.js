// 数码宝贝数据 - 根据进化路线文本导入
const digimonData = [
    {
        id: 1,
        name: "水母兽",
        level: "幼年期Ⅰ",
        image: getDigimonImagePath("水母兽"),
        evolvesTo: [16, 12], // 柏古兽, 妖爪兽
        evolvesFrom: []
    },
    {
        id: 2,
        name: "巧洛兽",
        level: "幼年期Ⅰ",
        image: getDigimonImagePath("巧洛兽"),
        evolvesTo: [8], // 卡普利兽
        evolvesFrom: []
    },
    {
        id: 3,
        name: "多多兽",
        level: "幼年期Ⅰ",
        image: getDigimonImagePath("多多兽"),
        evolvesTo: [20, 14], // 汪喵兽, 多利兽
        evolvesFrom: []
    },
    {
        id: 4,
        name: "泡泡兽",
        level: "幼年期Ⅰ",
        image: getDigimonImagePath("泡泡兽"),
        evolvesTo: [19, 17, 10], // 年糕兽, 比高兽, 种子兽
        evolvesFrom: []
    },
    {
        id: 5,
        name: "布尼兽",
        level: "幼年期Ⅰ",
        image: getDigimonImagePath("布尼兽"),
        evolvesTo: [11, 15], // 犄角兽, 喵喵兽
        evolvesFrom: []
    },
    {
        id: 6,
        name: "黑球兽",
        level: "幼年期Ⅰ",
        image: getDigimonImagePath("黑球兽"),
        evolvesTo: [9], // 滚球兽
        evolvesFrom: []
    },
    {
        id: 7,
        name: "浮游兽",
        level: "幼年期Ⅰ",
        image: getDigimonImagePath("浮游兽"),
        evolvesTo: [18, 13], // 布加兽, 迪哥兽
        evolvesFrom: []
    },
    {
        id: 8,
        name: "卡普利兽",
        level: "幼年期Ⅱ",
        image: getDigimonImagePath("卡普利兽"),
        evolvesTo: [71, 45, 29, 26], // 齿轮兽, 小锹形虫兽, 玩具亚古兽, 日轮兽
        evolvesFrom: [2]
    },
    {
        id: 9,
        name: "滚球兽",
        level: "幼年期Ⅱ",
        image: getDigimonImagePath("滚球兽"),
        evolvesTo: [21, 64, 49, 47, 74, 48], // 亚古兽, 基尔兽, 龙仔兽, 剑道兽, 贝塔兽, 高吼兽
        evolvesFrom: [6]
    },
    {
        id: 10,
        name: "种子兽",
        level: "幼年期Ⅱ",
        image: getDigimonImagePath("种子兽"),
        evolvesTo: [73, 56, 53, 75, 54], // 幻蜂兽, 拉拉兽, 巴鲁兽, 蘑菇兽, 佛洛拉兽
        evolvesFrom: [4]
    },
    {
        id: 11,
        name: "犄角兽",
        level: "幼年期Ⅱ",
        image: getDigimonImagePath("犄角兽"),
        evolvesTo: [65, 77, 43, 38, 40, 25], // 哥布林兽, V仔兽, 加布兽, 龙蛇兽, 艾力兽, 兹巴兽
        evolvesFrom: [5]
    },
    {
        id: 12,
        name: "妖爪兽",
        level: "幼年期Ⅱ",
        image: getDigimonImagePath("妖爪兽"),
        evolvesTo: [70, 66, 80, 468, 469], // 德库拉兽, 萨满兽, 哈哈兽, 亚古兽黑, 加布兽黑
        evolvesFrom: [1]
    },
    {
        id: 13,
        name: "迪哥兽",
        level: "幼年期Ⅱ",
        image: getDigimonImagePath("迪哥兽"),
        evolvesTo: [51, 24, 27, 76, 39], // 巴达兽, 日冕兽, 梗犬兽, 犰狳兽, 光明兽
        evolvesFrom: [7]
    },
    {
        id: 14,
        name: "多利兽",
        level: "幼年期Ⅱ",
        image: getDigimonImagePath("多利兽"),
        evolvesTo: [50, 37, 68, 59], // 多路兽, 单角龙兽, 雪哥布林兽, 垂耳兔兽
        evolvesFrom: [3]
    },
    {
        id: 15,
        name: "喵喵兽",
        level: "幼年期Ⅱ",
        image: getDigimonImagePath("喵喵兽"),
        evolvesTo: [57, 22, 34, 52], // 月亮兽, 管狐兽, 小狗兽, 哈克兽
        evolvesFrom: [5]
    },
    {
        id: 16,
        name: "柏古兽",
        level: "幼年期Ⅱ",
        image: getDigimonImagePath("柏古兽"),
        evolvesTo: [60, 72, 62, 61], // 小妖兽, 小恶魔兽, 加支兽, 蝌蚪兽
        evolvesFrom: [1]
    },
    {
        id: 17,
        name: "比高兽",
        level: "幼年期Ⅱ",
        image: getDigimonImagePath("比高兽"),
        evolvesTo: [32, 36, 33, 78, 31, 55], // 比丘兽, 企鹅兽, 猎鹰兽, 麻鹰兽, 雏鸡兽, 五彩兽
        evolvesFrom: [4]
    },
    {
        id: 18,
        name: "布加兽",
        level: "幼年期Ⅱ",
        image: getDigimonImagePath("布加兽"),
        evolvesTo: [44, 42, 23, 63, 67], // 乌龟兽, 螃蟹兽, 哥玛兽, 锯齿兽, 碎碟兽
        evolvesFrom: [7]
    },
    {
        id: 19,
        name: "年糕兽",
        level: "幼年期Ⅱ",
        image: getDigimonImagePath("年糕兽"),
        evolvesTo: [69, 28, 79, 46], // 吱吱兽, 甲虫兽, 虫虫兽, 矿石兽
        evolvesFrom: [4]
    },
    {
        id: 20,
        name: "汪喵兽",
        level: "幼年期Ⅱ",
        image: getDigimonImagePath("汪喵兽"),
        evolvesTo: [41, 35, 58], // 加奥兽, 梦  兽, 小熊兽, 狐狸兽
        evolvesFrom: [3]
    },
    {
        id: 21,
        name: "亚古兽",
        level: "成长期",
        image: getDigimonImagePath("亚古兽"),
        evolvesTo: [107, 92, 160, 90, 149, 449], // 猛禽龙兽, 大地暴龙兽, 鼻涕兽, 暴龙兽, 核龙兽绿, 亚古兽勇气纽带
        evolvesFrom: [9]
    },
    {
        id: 22,
        name: "管狐兽",
        level: "成长期",
        image: getDigimonImagePath("管狐兽"),
        evolvesTo: [83, 110, 84, 88, 188, 96], // 飞龙兽, 裂破兽, 天使兽, 银龙兽, 野狼兽, 冰巫师兽
        evolvesFrom: [15]
    },
    {
        id: 23,
        name: "哥玛兽",
        level: "成长期",
        image: getDigimonImagePath("哥玛兽"),
        evolvesTo: [104, 82, 105, 162, 138], // 毛人兽, 海狮兽, 雪人兽, 冰河兽, 冰恶魔兽
        evolvesFrom: [18]
    },
    {
        id: 24,
        name: "日冕兽",
        level: "成长期",
        image: getDigimonImagePath("日冕兽"),
        evolvesTo: [100, 135, 145, 133, 99, 187], // 焰狮兽, 燃烧兽, 古拉兽, 刃王哈克兽, 巴多拉兽, 火神兽
        evolvesFrom: [13]
    },
    {
        id: 25,
        name: "兹巴兽",
        level: "成长期",
        image: getDigimonImagePath("兹巴兽"),
        evolvesTo: [169, 102, 125, 95, 174, 176], // 武人兽, 无赖兽, 坦克兽, 兹巴伊戈兽, 甲龙兽, 守卫机器人兽金
        evolvesFrom: [11]
    },
    {
        id: 26,
        name: "日轮兽",
        level: "成长期",
        image: getDigimonImagePath("日轮兽"),
        evolvesTo: [124, 150, 135, 176], // 星星兽, 黄金鼻涕兽, 燃烧兽, 守卫机器人兽金
        evolvesFrom: [8]
    },
    {
        id: 27,
        name: "梗犬兽",
        level: "成长期",
        image: getDigimonImagePath("梗犬兽"),
        evolvesTo: [104, 137, 115, 86, 422], // 毛人兽, 雷克斯兽, 河童兽, 加鲁哥兽, 拉比兽装甲体
        evolvesFrom: [13]
    },
    {
        id: 28,
        name: "甲虫兽",
        level: "成长期",
        image: getDigimonImagePath("甲虫兽"),
        evolvesTo: [85, 120, 146, 172, 94], // 比多兽, 向日葵兽, 古加兽, 胡蜂兽, 狙击兽
        evolvesFrom: [19]
    },
    {
        id: 29,
        name: "玩具亚古兽",
        level: "成长期",
        image: getDigimonImagePath("玩具亚古兽"),
        evolvesTo: [134, 108, 171, 125, 86], // 飞艇兽, 左轮兽, 烂泥兽, 坦克兽, 加鲁哥兽
        evolvesFrom: [8]
    },
    {
        id: 30,
        name: "梦 兽",
        level: "成长期",
        image: getDigimonImagePath("梦 兽"),
        evolvesTo: [135, 87, 161, 106], // 燃烧兽, 加鲁鲁兽, 鬼怪兽, 独角马兽, 九尾兽
        evolvesFrom: [20]
    },
    {
        id: 31,
        name: "雏鸡兽",
        level: "成长期",
        image: getDigimonImagePath("雏鸡兽"),
        evolvesTo: [103, 99, 127, 102], // 啄木鸟兽, 巴多拉兽, 龙人兽, 无赖兽
        evolvesFrom: [17]
    },
    {
        id: 32,
        name: "比丘兽",
        level: "成长期",
        image: getDigimonImagePath("比丘兽"),
        evolvesTo: [173, 99, 106, 112], // 天鹰兽, 巴多拉兽, 独角马兽, 巫师兽
        evolvesFrom: [17]
    },
    {
        id: 33,
        name: "猎鹰兽",
        level: "成长期",
        image: getDigimonImagePath("猎鹰兽"),
        evolvesTo: [103, 88, 116], // 啄木鸟兽, 银龙兽, 几维鸟兽
        evolvesFrom: [17]
    },
    {
        id: 34,
        name: "小狗兽",
        level: "成长期",
        image: getDigimonImagePath("小狗兽"),
        evolvesTo: [97, 153, 98, 82, 101, 131], // 迪路兽, 血狼兽, 杜宾犬兽, 海狮兽, V龙兽, 钻头鼹鼠兽
        evolvesFrom: [15]
    },
    {
        id: 35,
        name: "小熊兽",
        level: "成长期",
        image: getDigimonImagePath("小熊兽"),
        evolvesTo: [89, 114, 104, 109, 470], // 灰熊兽, 加奥加兽, 毛人兽, 狮子兽, 加鲁鲁兽黑
        evolvesFrom: [20]
    },
    {
        id: 36,
        name: "企鹅兽",
        level: "成长期",
        image: getDigimonImagePath("企鹅兽"),
        evolvesTo: [103, 102, 116, 173], // 啄木鸟兽, 无赖兽, 几维鸟兽, 天鹰兽
        evolvesFrom: [17]
    },
    {
        id: 37,
        name: "单角龙兽",
        level: "成长期",
        image: getDigimonImagePath("单角龙兽"),
        evolvesTo: [93, 107, 157, 178, 152], // 强袭龙兽, 猛禽龙兽, 德尔塔兽, 虫蛹兽, 独眼龙兽
        evolvesFrom: [14]
    },
    {
        id: 38,
        name: "龙蛇兽",
        level: "成长期",
        image: getDigimonImagePath("龙蛇兽"),
        evolvesTo: [110, 122, 88, 90, 136], // 裂破兽, 腔棘鱼兽, 银龙兽, 暴龙兽, 角龙兽
        evolvesFrom: [11]
    },
    {
        id: 39,
        name: "光明兽",
        level: "成长期",
        image: getDigimonImagePath("光明兽"),
        evolvesTo: [296], // 光明兽FM
        evolvesFrom: [13]
    },
    {
        id: 40,
        name: "艾力兽",
        level: "成长期",
        image: getDigimonImagePath("艾力兽"),
        evolvesTo: [81, 121, 106, 146, 147], // 埃癸奥兽, 海龙兽, 独角马兽, 古加兽, 怪蛙兽
        evolvesFrom: [11]
    },
    {
        id: 41,
        name: "加奥兽",
        level: "成长期",
        image: getDigimonImagePath("加奥兽"),
        evolvesTo: [93, 114, 109, 159], // 强袭龙兽, 加奥加兽, 狮子兽, 什么兽, 免儿爷兽
        evolvesFrom: [20]
    },
    {
        id: 42,
        name: "螃蟹兽",
        level: "成长期",
        image: getDigimonImagePath("螃蟹兽"),
        evolvesTo: [115, 142, 123, 171, 94, 122], // 河童兽, 章鱼兽, 贝壳兽, 烂泥兽, 狙击兽, 腔棘鱼兽
        evolvesFrom: [18]
    },
    {
        id: 43,
        name: "加布兽",
        level: "成长期",
        image: getDigimonImagePath("加布兽"),
        evolvesTo: [87, 82, 131, 148], // 加鲁鲁兽, 海狮兽, 钻头鼹鼠兽, 九尾兽, 卑劣兽, 加布兽友情纽带
        evolvesFrom: [11]
    },
    {
        id: 44,
        name: "乌龟兽",
        level: "成长期",
        image: getDigimonImagePath("乌龟兽"),
        evolvesTo: [115, 142, 123, 144, 127, 96], // 河童兽, 章鱼兽, 贝壳兽, 贝壳鼻涕兽, 龙人兽, 冰巫师兽
        evolvesFrom: [18]
    },
    {
        id: 45,
        name: "小锹形虫兽",
        level: "成长期",
        image: getDigimonImagePath("小锹形虫兽"),
        evolvesTo: [119, 146, 118, 172, 170], // 人马兽, 古加兽, 时钟兽, 胡蜂兽, 机械载物兽
        evolvesFrom: [8]
    },
    {
        id: 46,
        name: "矿石兽",
        level: "成长期",
        image: getDigimonImagePath("矿石兽"),
        evolvesTo: [124, 143, 151, 136, 111, 126], // 星星兽, 守卫机器人兽, 魔像兽, 角龙兽, 冰石兽, 泥人兽
        evolvesFrom: [19]
    },
    {
        id: 47,
        name: "剑道兽",
        level: "成长期",
        image: getDigimonImagePath("剑道兽"),
        evolvesTo: [169, 108, 127, 91], // 免儿爷兽, 武人兽, 左轮兽, 龙人兽, 核龙兽蓝
        evolvesFrom: [9]
    },
    {
        id: 48,
        name: "高吼兽",
        level: "成长期",
        image: getDigimonImagePath("高吼兽"),
        evolvesTo: [234, 95, 86, 176], // 奥米加高吼兽, 兹巴伊戈兽, 加鲁哥兽, 守卫机器人兽金
        evolvesFrom: [9]
    },
    {
        id: 49,
        name: "龙仔兽",
        level: "成长期",
        image: getDigimonImagePath("龙仔兽"),
        evolvesTo: [149, 91, 157, 101, 121, 128], // 核龙兽绿, 核龙兽蓝, 德尔塔兽, V龙兽, 海龙兽, 巨龙兽
        evolvesFrom: [9]
    },
    {
        id: 50,
        name: "多路兽",
        level: "成长期",
        image: getDigimonImagePath("多路兽"),
        evolvesTo: [107, 83, 153, 175, 131, 132], // 猛禽龙兽, 飞龙兽, 血狼兽, XV兽, 钻头鼹鼠兽, 多路加兽
        evolvesFrom: [14]
    },
    {
        id: 51,
        name: "巴达兽",
        level: "成长期",
        image: getDigimonImagePath("巴达兽"),
        evolvesTo: [84, 184, 106, 119], // 天使兽, 天马兽, 独角马兽, 人马兽
        evolvesFrom: [13]
    },
    {
        id: 52,
        name: "哈克兽",
        level: "成长期",
        image: getDigimonImagePath("哈克兽"),
        evolvesTo: [97, 92, 145, 133, 90], // 迪路兽, 大地暴龙兽, 古拉兽, 刃王哈克兽, 暴龙兽
        evolvesFrom: [15]
    },
    {
        id: 53,
        name: "巴鲁兽",
        level: "成长期",
        image: getDigimonImagePath("巴鲁兽"),
        evolvesTo: [104, 167, 130, 178, 165], // 毛人兽, 野菜兽, 仙人掌兽, 虫蛹兽, 白金大便兽
        evolvesFrom: [10]
    },
    {
        id: 54,
        name: "佛洛拉兽",
        level: "成长期",
        image: getDigimonImagePath("佛洛拉兽"),
        evolvesTo: [167, 130, 140, 120, 116], // 野菜兽, 仙人掌兽, 枯木兽, 向日葵兽, 几维鸟兽
        evolvesFrom: [10]
    },
    {
        id: 55,
        name: "五彩兽",
        level: "成长期",
        image: getDigimonImagePath("五彩兽"),
        evolvesTo: [83, 103, 99, 163], // 飞龙兽, 啄木鸟兽, 巴多拉兽, 风灾兽
        evolvesFrom: [17]
    },
    {
        id: 56,
        name: "拉拉兽",
        level: "成长期",
        image: getDigimonImagePath("拉拉兽"),
        evolvesTo: [130, 108, 126, 120], // 仙人掌兽, 左轮兽, 泥人兽, 免儿爷兽, 向日葵兽
        evolvesFrom: [10]
    },
    {
        id: 57,
        name: "月亮兽",
        level: "成长期",
        image: getDigimonImagePath("月亮兽"),
        evolvesTo: [137, 87, 105, 162, 96, 111], // 雷克斯兽, 加鲁鲁兽, 雪人兽, 冰河兽, 冰巫师兽, 冰石兽
        evolvesFrom: [15]
    },
    {
        id: 58,
        name: "狐狸兽",
        level: "成长期",
        image: getDigimonImagePath("狐狸兽"),
        evolvesTo: [137, 120, 117, 470], // 雷克斯兽, 向日葵兽, 破裂兽, 九尾狐兽, 加鲁鲁兽黑
        evolvesFrom: [20]
    },
    {
        id: 59,
        name: "垂耳兔兽",
        level: "成长期",
        image: getDigimonImagePath("垂耳兔兽"),
        evolvesTo: [89, 168, 109, 139, 126], // 灰熊兽, 牛人兽, 狮子兽, 免儿爷兽, 温迪兽, 泥人兽
        evolvesFrom: [14]
    },
    {
        id: 60,
        name: "小妖兽",
        level: "成长期",
        image: getDigimonImagePath("小妖兽"),
        evolvesTo: [161, 112, 118, 153, 156, 113], // 鬼怪兽, 巫师兽, 时钟兽, 血狼兽, 恶魔兽, 女巫兽
        evolvesFrom: [16]
    },
    {
        id: 61,
        name: "蝌蚪兽",
        level: "成长期",
        image: getDigimonImagePath("蝌蚪兽"),
        evolvesTo: [121, 160, 147, 144, 165], // 海龙兽, 鼻涕兽, 怪蛙兽, 贝壳鼻涕兽, 白金大便兽
        evolvesFrom: [16]
    },
    {
        id: 62,
        name: "加支兽",
        level: "成长期",
        image: getDigimonImagePath("加支兽"),
        evolvesTo: [153, 114, 133, 98, 132], // 血狼兽, 黑暗迪路兽, 加奥加兽, 刃王哈克兽, 杜宾犬兽, 多路加兽
        evolvesFrom: [16]
    },
    {
        id: 63,
        name: "锯齿兽",
        level: "成长期",
        image: getDigimonImagePath("锯齿兽"),
        evolvesTo: [152, 164, 95, 174, 148, 189], // 独眼龙兽, 黄蜂兽, 兹巴伊戈兽, 甲龙兽, 卑劣兽, 拉娜兽
        evolvesFrom: [18]
    },
    {
        id: 64,
        name: "基尔兽",
        level: "成长期",
        image: getDigimonImagePath("基尔兽"),
        evolvesTo: [92, 145, 175, 128, 471], // 大地暴龙兽, 古拉兽, XV兽, 巨龙兽, 暴龙兽蓝
        evolvesFrom: [9]
    },
    {
        id: 65,
        name: "哥布林兽",
        level: "成长期",
        image: getDigimonImagePath("哥布林兽"),
        evolvesTo: [151, 139, 157, 155, 141], // 魔像兽, 温迪兽, 德尔塔兽, 长牙兽, 恶鬼兽
        evolvesFrom: [11]
    },
    {
        id: 66,
        name: "萨满兽",
        level: "成长期",
        image: getDigimonImagePath("萨满兽"),
        evolvesTo: [168, 169, 163, 113], // 牛人兽, 武人兽, 风灾兽, 女巫兽
        evolvesFrom: [12]
    },
    {
        id: 67,
        name: "碎碟兽",
        level: "成长期",
        image: getDigimonImagePath("碎碟兽"),
        evolvesTo: [122, 123, 144, 142, 171], // 腔棘鱼兽, 贝壳兽, 贝壳鼻涕兽, 章鱼兽, 烂泥兽
        evolvesFrom: [18]
    },
    {
        id: 68,
        name: "雪哥布林兽",
        level: "成长期",
        image: getDigimonImagePath("雪哥布林兽"),
        evolvesTo: [97, 136, 105, 162, 138, 111], // 迪路兽, 角龙兽, 雪人兽, 冰河兽, 冰恶魔兽, 冰石兽
        evolvesFrom: [14]
    },
    {
        id: 69,
        name: "吱吱兽",
        level: "成长期",
        image: getDigimonImagePath("吱吱兽"),
        evolvesTo: [154, 97, 147, 148, 165], // 黑暗迪路兽, 大便兽, 迪路兽, 怪蛙兽, 卑劣兽, 白金大便兽
        evolvesFrom: [19]
    },
    {
        id: 70,
        name: "德库拉兽",
        level: "成长期",
        image: getDigimonImagePath("德库拉兽"),
        evolvesTo: [153, 154, 112, 124], // 血狼兽, 大便兽, 巫师兽, 星星兽
        evolvesFrom: [12]
    },
    {
        id: 71,
        name: "齿轮兽",
        level: "成长期",
        image: getDigimonImagePath("齿轮兽"),
        evolvesTo: [118, 170, 125, 143, 134], // 时钟兽, 机械载物兽, 坦克兽, 守卫机器人兽, 飞艇兽
        evolvesFrom: [8]
    },
    {
        id: 72,
        name: "小恶魔兽",
        level: "成长期",
        image: getDigimonImagePath("小恶魔兽"),
        evolvesTo: [161, 156, 138, 141, 471], // 鬼怪兽, 恶魔兽, 冰恶魔兽, 恶鬼兽, 暴龙兽蓝
        evolvesFrom: [16]
    },
    {
        id: 73,
        name: "幻蜂兽",
        level: "成长期",
        image: getDigimonImagePath("幻蜂兽"),
        evolvesTo: [172, 164, 158, 177, 150, 85], // 胡蜂兽, 黄蜂兽, 毒蜘蛛兽, 飞虫兽, 黄金鼻涕兽, 比多兽
        evolvesFrom: [10]
    },
    {
        id: 74,
        name: "贝塔兽",
        level: "成长期",
        image: getDigimonImagePath("贝塔兽"),
        evolvesTo: [121, 122, 156, 160, 167, 155], // 海龙兽, 腔棘鱼兽, 恶魔兽, 鼻涕兽, 野菜兽, 长牙兽
        evolvesFrom: [21]
    },
    {
        id: 75,
        name: "蘑菇兽",
        level: "成长期",
        image: getDigimonImagePath("蘑菇兽"),
        evolvesTo: [154, 159, 140, 164], // 大便兽, 什么兽, 枯木兽, 黄蜂兽
        evolvesFrom: [10]
    },
    {
        id: 76,
        name: "犰狳兽",
        level: "成长期",
        image: getDigimonImagePath("犰狳兽"),
        evolvesTo: [181, 179, 151, 174], // 挖掘兽, 潜艇兽, 魔像兽, 甲龙兽
        evolvesFrom: [13]
    },
    {
        id: 77,
        name: "V仔兽",
        level: "成长期",
        image: getDigimonImagePath("V仔兽"),
        evolvesTo: [175, 101, 186, 423, 183], // XV兽, V龙兽, 闪电龙兽, 金甲龙兽, 烈焰龙兽
        evolvesFrom: [11]
    },
    {
        id: 78,
        name: "麻鹰兽",
        level: "成长期",
        image: getDigimonImagePath("麻鹰兽"),
        evolvesTo: [100, 185, 180, 173], // 焰狮兽, 荷鲁斯兽, 手里剑兽, 天鹰兽
        evolvesFrom: [17]
    },
    {
        id: 79,
        name: "虫虫兽",
        level: "成长期",
        image: getDigimonImagePath("虫虫兽"),
        evolvesTo: [177, 158, 94], // 飞虫兽, 毒蜘蛛兽, 狙击兽
        evolvesFrom: [19]
    },
    {
        id: 80,
        name: "哈哈兽",
        level: "成长期",
        image: getDigimonImagePath("哈哈兽"),
        evolvesTo: [158, 139, 142, 170, 178], // 毒蜘蛛兽, 温迪兽, 章鱼兽, 机械载物兽, 虫蛹兽
        evolvesFrom: [12]
    },
    {
        id: 81,
        name: "埃癸奥兽",
        level: "成熟期",
        image: getDigimonImagePath("埃癸奥兽"),
        evolvesTo: [193, 195, 197, 196, 194], // 埃癸奥都斯兽, 埃癸奥都斯兽暗, 埃癸奥都斯兽圣, 埃癸奥都斯兽蓝, 埃癸奥都斯兽绿
        evolvesFrom: [40]
    },
    {
        id: 82,
        name: "海狮兽",
        level: "成熟期",
        image: getDigimonImagePath("海狮兽"),
        evolvesTo: [220, 260, 212, 280], // 巨鲸兽, 百万海龙兽, 祖顿兽, 丧尸海龙兽
        evolvesFrom: [43, 23, 34]
    },
    {
        id: 83,
        name: "飞龙兽",
        level: "成熟期",
        image: getDigimonImagePath("飞龙兽"),
        evolvesTo: [217, 293, 201, 272], // 飞车龙兽, 百万龙兽, 飞行V龙兽, 千兆龙兽
        evolvesFrom: [22, 50, 55]
    },
    {
        id: 84,
        name: "天使兽",
        level: "成熟期",
        image: getDigimonImagePath("天使兽"),
        evolvesTo: [254, 221, 241, 300], // 骏鹰兽, 神圣天使兽, 塞壬兽, 土偶兽
        evolvesFrom: [22, 51]
    },
    {
        id: 85,
        name: "比多兽",
        level: "成熟期",
        image: getDigimonImagePath("比多兽"),
        evolvesTo: [262, 198, 273, 235], // 丁香兽, 超比多兽, 炮蜂兽, 奇美拉兽
        evolvesFrom: [28]
    },
    {
        id: 86,
        name: "加鲁哥兽",
        level: "成熟期",
        image: getDigimonImagePath("加鲁哥兽"),
        evolvesTo: [236, 258, 227], // 抓取豆豆兽, 音速加奥加兽, 拉比兽
        evolvesFrom: [48, 27, 29]
    },
    {
        id: 87,
        name: "加鲁鲁兽",
        level: "成熟期",
        image: getDigimonImagePath("加鲁鲁兽"),
        evolvesTo: [229, 288, 242, 235], // 狼人加鲁鲁兽, 蓝色燃烧兽, 道士兽, 奇美拉兽
        evolvesFrom: [57, 43]
    },
    {
        id: 88,
        name: "银龙兽",
        level: "成熟期",
        image: getDigimonImagePath("银龙兽"),
        evolvesTo: [217, 278, 218], // 飞车龙兽, 丧尸暴龙兽, 武天兽
        evolvesFrom: [22, 38, 33]
    },
    {
        id: 89,
        name: "灰熊兽",
        level: "成熟期",
        image: getDigimonImagePath("灰熊兽"),
        evolvesTo: [229, 205, 207], // 狼人加鲁鲁兽, 格斗狮子兽, 至尊灰熊兽
        evolvesFrom: [35, 59]
    },
    {
        id: 90,
        name: "暴龙兽",
        level: "成熟期",
        image: getDigimonImagePath("暴龙兽"),
        evolvesTo: [223, 293, 278, 235], // 机械暴龙兽, 百万龙兽, 丧尸暴龙兽, 奇美拉兽
        evolvesFrom: [21, 38, 52]
    },
    {
        id: 91,
        name: "核龙兽蓝",
        level: "成熟期",
        image: getDigimonImagePath("核龙兽蓝"),
        evolvesTo: [200, 201, 272], // 翼龙兽, 飞行V龙兽, 千兆龙兽
        evolvesFrom: [49, 47, 468]
    },
    {
        id: 92,
        name: "大地暴龙兽",
        level: "成熟期",
        image: getDigimonImagePath("大地暴龙兽"),
        evolvesTo: [226, 295, 210], // 跃升暴龙兽, 金属巨龙兽, 电子龙兽
        evolvesFrom: [21, 64, 52]
    },
    {
        id: 93,
        name: "强袭龙兽",
        level: "成熟期",
        image: getDigimonImagePath("强袭龙兽"),
        evolvesTo: [210, 240, 264], // 电子龙兽, 救星哈克兽, 火车头兽
        evolvesFrom: [41, 37, 468]
    },
    {
        id: 94,
        name: "狙击兽",
        level: "成熟期",
        image: getDigimonImagePath("狙击兽"),
        evolvesTo: [269, 286, 266, 211], // 大古加兽, 幻影兽, 阿刺克涅兽, 宝石蜂兽
        evolvesFrom: [42, 28, 79]
    },
    {
        id: 95,
        name: "兹巴伊戈兽",
        level: "成熟期",
        image: getDigimonImagePath("兹巴伊戈兽"),
        evolvesTo: [206, 294, 214, 248], // 等级兽, 大古拉兽, 杜兰兽, 骑士兽
        evolvesFrom: [63, 48, 25]
    },
    {
        id: 96,
        name: "冰巫师兽",
        level: "成熟期",
        image: getDigimonImagePath("冰巫师兽"),
        evolvesTo: [221, 253, 298], // 神圣天使兽, 妖精兽, 贤者兽
        evolvesFrom: [57, 44, 22]
    },
    {
        id: 97,
        name: "迪路兽",
        level: "成熟期",
        image: getDigimonImagePath("迪路兽"),
        evolvesTo: [182, 203, 301], // 纳芙蒂兽, 天女兽, 西尔芙兽
        evolvesFrom: [69, 34, 68, 52]
    },
    {
        id: 98,
        name: "杜宾犬兽",
        level: "成熟期",
        image: getDigimonImagePath("杜宾犬兽"),
        evolvesTo: [290, 281, 208, 291], // 斗牛士兽, 黑暗巨星兽, 刻耳柏洛兽, 木乃伊兽
        evolvesFrom: [34, 62, 469]
    },
    {
        id: 99,
        name: "巴多拉兽",
        level: "成熟期",
        image: getDigimonImagePath("巴多拉兽"),
        evolvesTo: [219, 204, 244, 215], // 耀狮兽, 迦楼达兽, 死亡燃烧兽, 鹦鹉兽
        evolvesFrom: [24, 32, 31, 55]
    },
    {
        id: 100,
        name: "焰狮兽",
        level: "成熟期",
        image: getDigimonImagePath("焰狮兽"),
        evolvesTo: [219, 240, 292], // 耀狮兽, 救星哈克兽, 神秘兽
        evolvesFrom: [24, 78]
    },
    {
        id: 101,
        name: "V龙兽",
        level: "成熟期",
        image: getDigimonImagePath("V龙兽"),
        evolvesTo: [200, 201, 210, 472], // 翼龙兽, 飞行V龙兽, 电子龙兽, 机械暴龙兽蓝
        evolvesFrom: [77, 49, 34]
    },
    {
        id: 102,
        name: "无赖兽",
        level: "成熟期",
        image: getDigimonImagePath("无赖兽"),
        evolvesTo: [218, 214, 204], // 武天兽, 杜兰兽, 迦楼达兽
        evolvesFrom: [31, 36, 25]
    },
    {
        id: 103,
        name: "啄木鸟兽",
        level: "成熟期",
        image: getDigimonImagePath("啄木鸟兽"),
        evolvesTo: [213, 267, 225], // 麒麟兽, 吸血魔兽, 八咫乌兽
        evolvesFrom: [31, 36, 55, 33]
    },
    {
        id: 104,
        name: "毛人兽",
        level: "成熟期",
        image: getDigimonImagePath("毛人兽"),
        evolvesTo: [212, 253, 292, 222], // 祖顿兽, 妖精兽, 神秘兽, 猛犸兽
        evolvesFrom: [35, 23, 53, 27]
    },
    {
        id: 105,
        name: "雪人兽",
        level: "成熟期",
        image: getDigimonImagePath("雪人兽"),
        evolvesTo: [237, 203, 216, 233, 222], // 新月兽, 天女兽, 白狮兽, 陨石兽, 猛犸兽
        evolvesFrom: [57, 23, 68]
    },
    {
        id: 106,
        name: "独角马兽",
        level: "成熟期",
        image: getDigimonImagePath("独角马兽"),
        evolvesTo: [254, 221, 213], // 骏鹰兽, 神圣天使兽, 麒麟兽
        evolvesFrom: [51, 30, 32, 40]
    },
    {
        id: 107,
        name: "猛禽龙兽",
        level: "成熟期",
        image: getDigimonImagePath("猛禽龙兽"),
        evolvesTo: [206, 272, 283], // 等级兽, 千兆龙兽, 坦克龙兽
        evolvesFrom: [21, 50, 37]
    },
    {
        id: 108,
        name: "左轮兽",
        level: "成熟期",
        image: getDigimonImagePath("左轮兽"),
        evolvesTo: [250, 238, 298], // 熊猫兽, 巨星兽, 贤者兽
        evolvesFrom: [56, 47, 29]
    },
    {
        id: 109,
        name: "狮子兽",
        level: "成熟期",
        image: getDigimonImagePath("狮子兽"),
        evolvesTo: [219, 205, 216, 228], // 耀狮兽, 格斗狮子兽, 白狮兽, 装载狮子兽
        evolvesFrom: [41, 35, 59]
    },
    {
        id: 110,
        name: "裂破兽",
        level: "成熟期",
        image: getDigimonImagePath("裂破兽"),
        evolvesTo: [213, 260, 203, 247], // 麒麟兽, 百万海龙兽, 天女兽, 多路暴龙兽
        evolvesFrom: [22, 38, 58]
    },
    {
        id: 111,
        name: "冰石兽",
        level: "成熟期",
        image: getDigimonImagePath("冰石兽"),
        evolvesTo: [237, 233, 216], // 新月兽, 陨石兽, 白狮兽
        evolvesFrom: [57, 68, 46]
    },
    {
        id: 112,
        name: "巫师兽",
        level: "成熟期",
        image: getDigimonImagePath("巫师兽"),
        evolvesTo: [285, 292, 298], // 分子兽, 神秘兽, 贤者兽
        evolvesFrom: [60, 32]
    },
    {
        id: 113,
        name: "女巫兽",
        level: "成熟期",
        image: getDigimonImagePath("女巫兽"),
        evolvesTo: [297, 203, 263], // 女恶魔兽, 天女兽, 花仙兽
        evolvesFrom: [60, 66]
    },
    {
        id: 114,
        name: "加奥加兽",
        level: "成熟期",
        image: getDigimonImagePath("加奥加兽"),
        evolvesTo: [258, 240, 281], // 音速加奥加兽, 救星哈克兽, 黑暗巨星兽
        evolvesFrom: [41, 35, 62]
    },
    {
        id: 115,
        name: "河童兽",
        level: "成熟期",
        image: getDigimonImagePath("河童兽"),
        evolvesTo: [276, 249, 284], // 沙悟净兽, 半鱼兽, 怪蛙皇
        evolvesFrom: [44, 42, 27]
    },
    {
        id: 116,
        name: "几维鸟兽",
        level: "成熟期",
        image: getDigimonImagePath("几维鸟兽"),
        evolvesTo: [262, 241, 245, 277], // 丁香兽, 塞壬兽, 华丽兽, 祖利兽
        evolvesFrom: [54, 36, 33]
    },
    {
        id: 117,
        name: "九尾狐兽",
        level: "成熟期",
        image: getDigimonImagePath("九尾狐兽"),
        evolvesTo: [288, 208, 242, 231], // 蓝色燃烧兽, 刻耳柏洛兽, 道士兽, 暗马兽
        evolvesFrom: [43, 30, 58]
    },
    {
        id: 118,
        name: "时钟兽",
        level: "成熟期",
        image: getDigimonImagePath("时钟兽"),
        evolvesTo: [202, 199, 212, 248], // EX巨龙兽, 机械人兽, 祖顿兽, 骑士兽
        evolvesFrom: [71, 60, 45]
    },
    {
        id: 119,
        name: "人马兽",
        level: "成熟期",
        image: getDigimonImagePath("人马兽"),
        evolvesTo: [199, 285, 227], // 机械人兽, 分子兽, 拉比兽
        evolvesFrom: [51, 45]
    },
    {
        id: 120,
        name: "向日葵兽",
        level: "成熟期",
        image: getDigimonImagePath("向日葵兽"),
        evolvesTo: [262, 263, 245, 251], // 丁香兽, 花仙兽, 华丽兽, 南瓜兽
        evolvesFrom: [56, 28, 58, 54]
    },
    {
        id: 121,
        name: "海龙兽",
        level: "成熟期",
        image: getDigimonImagePath("海龙兽"),
        evolvesTo: [220, 260, 299, 217, 275], // 巨鲸兽, 百万海龙兽, 恶海龙兽, 飞车龙兽, 鲨鱼兽, 丧尸梅龙兽
        evolvesFrom: [49, 74, 40, 61]
    },
    {
        id: 122,
        name: "腔棘鱼兽",
        level: "成熟期",
        image: getDigimonImagePath("腔棘鱼兽"),
        evolvesTo: [299, 295, 230, 249], // 恶海龙兽, 金属巨龙兽, 奇虾兽, 半鱼兽, 丧尸梅龙兽
        evolvesFrom: [42, 38, 74, 67]
    },
    {
        id: 123,
        name: "贝壳兽",
        level: "成熟期",
        image: getDigimonImagePath("贝壳兽"),
        evolvesTo: [220, 253, 230], // 巨鲸兽, 妖精兽, 奇虾兽
        evolvesFrom: [44, 42, 67]
    },
    {
        id: 124,
        name: "星星兽",
        level: "成熟期",
        image: getDigimonImagePath("星星兽"),
        evolvesTo: [256, 238, 281, 259], // 火山兽, 巨星兽, 黑暗巨星兽, 豆豆兽
        evolvesFrom: [46, 26]
    },
    {
        id: 125,
        name: "坦克兽",
        level: "成熟期",
        image: getDigimonImagePath("坦克兽"),
        evolvesTo: [252, 264, 283], // 大豆豆兽, 火车头兽, 坦克龙兽
        evolvesFrom: [71, 25, 29]
    },
    {
        id: 126,
        name: "泥人兽",
        level: "成熟期",
        image: getDigimonImagePath("泥人兽"),
        evolvesTo: [245, 271, 232], // 华丽兽, 垃圾桶兽, 玉兔兽
        evolvesFrom: [56, 46, 59]
    },
    {
        id: 127,
        name: "龙人兽",
        level: "成熟期",
        image: getDigimonImagePath("龙人兽"),
        evolvesTo: [276, 206, 248], // 沙悟净兽, 等级兽, 骑士兽
        evolvesFrom: [44, 47, 31]
    },
    {
        id: 128,
        name: "巨龙兽",
        level: "成熟期",
        image: getDigimonImagePath("巨龙兽"),
        evolvesTo: [202, 274, 223, 295], // EX巨龙兽, 地龙兽, 机械暴龙兽, 金属巨龙兽
        evolvesFrom: [64, 49]
    },
    {
        id: 129,
        name: "兔儿爷兽",
        level: "成熟期",
        image: getDigimonImagePath("兔儿爷兽"),
        evolvesTo: [291, 258, 232], // 木乃伊兽, 音速加奥加兽, 玉兔兽
        evolvesFrom: [41, 56, 47, 59]
    },
    {
        id: 130,
        name: "仙人掌兽",
        level: "成熟期",
        image: getDigimonImagePath("仙人掌兽"),
        evolvesTo: [263, 277, 251], // 花仙兽, 祖利兽, 南瓜兽
        evolvesFrom: [56, 53, 54]
    },
    {
        id: 131,
        name: "钻头鼹鼠兽",
        level: "成熟期",
        image: getDigimonImagePath("钻头鼹鼠兽"),
        evolvesTo: [246, 228, 255], // 三角龙兽, 装载狮子兽, 腕龙兽
        evolvesFrom: [50, 43, 34]
    },
    {
        id: 132,
        name: "多路加兽",
        level: "成熟期",
        image: getDigimonImagePath("多路加兽"),
        evolvesTo: [226, 207, 472], // 跃升暴龙兽, 多路龙兽, 至尊灰熊兽, 机械暴龙兽蓝
        evolvesFrom: [50, 62, 469]
    },
    {
        id: 133,
        name: "刃王哈克兽",
        level: "成熟期",
        image: getDigimonImagePath("刃王哈克兽"),
        evolvesTo: [226, 240, 228], // 跃升暴龙兽, 救星哈克兽, 装载狮子兽
        evolvesFrom: [24, 62, 52]
    },
    {
        id: 134,
        name: "飞艇兽",
        level: "成熟期",
        image: getDigimonImagePath("飞艇兽"),
        evolvesTo: [264, 261, 257], // 火车头兽, 金属豆豆兽, 大师飞艇兽
        evolvesFrom: [71, 29]
    },
    {
        id: 135,
        name: "燃烧兽",
        level: "成熟期",
        image: getDigimonImagePath("燃烧兽"),
        evolvesTo: [252, 288, 244], // 大豆豆兽, 蓝色燃烧兽, 死亡燃烧兽
        evolvesFrom: [24, 30, 26]
    },
    {
        id: 136,
        name: "角龙兽",
        level: "成熟期",
        image: getDigimonImagePath("角龙兽"),
        evolvesTo: [246, 208, 222], // 三角龙兽, 刻耳柏洛兽, 猛犸兽
        evolvesFrom: [38, 68, 46]
    },
    {
        id: 137,
        name: "雷克斯兽",
        level: "成熟期",
        image: getDigimonImagePath("雷克斯兽"),
        evolvesTo: [237, 229, 205], // 新月兽, 狼人加鲁鲁兽, 格斗狮子兽
        evolvesFrom: [57, 58, 27]
    },
    {
        id: 138,
        name: "冰恶魔兽",
        level: "成熟期",
        image: getDigimonImagePath("冰恶魔兽"),
        evolvesTo: [237, 297, 216, 231], // 新月兽, 女恶魔兽, 白狮兽, 暗马兽
        evolvesFrom: [72, 23, 68]
    },
    {
        id: 139,
        name: "温迪兽",
        level: "成熟期",
        image: getDigimonImagePath("温迪兽"),
        evolvesTo: [266, 244, 232], // 阿刺克涅兽, 死亡燃烧兽, 玉兔兽
        evolvesFrom: [65, 80, 59]
    },
    {
        id: 140,
        name: "枯木兽",
        level: "成熟期",
        image: getDigimonImagePath("枯木兽"),
        evolvesTo: [277, 242, 251], // 祖利兽, 道士兽, 南瓜兽
        evolvesFrom: [53, 75, 54]
    },
    {
        id: 141,
        name: "恶鬼兽",
        level: "成熟期",
        image: getDigimonImagePath("恶鬼兽"),
        evolvesTo: [279, 291, 243], // 骷髅撒旦兽, 木乃伊兽, 数码蛋兽
        evolvesFrom: [72, 65]
    },
    {
        id: 142,
        name: "章鱼兽",
        level: "成熟期",
        image: getDigimonImagePath("章鱼兽"),
        evolvesTo: [282, 243, 249], // 达贡兽, 数码蛋兽, 半鱼兽
        evolvesFrom: [44, 42, 80, 67]
    },
    {
        id: 143,
        name: "守卫机器人兽",
        level: "成熟期",
        image: getDigimonImagePath("守卫机器人兽"),
        evolvesTo: [236, 264, 199], // 抓取豆豆兽, 火车头兽, 机械人兽
        evolvesFrom: [71, 46]
    },
    {
        id: 144,
        name: "贝壳鼻涕兽",
        level: "成熟期",
        image: getDigimonImagePath("贝壳鼻涕兽"),
        evolvesTo: [270, 299, 287, 250], // 大蛇兽, 恶海龙兽, 黑国王鼻涕兽, 熊猫兽
        evolvesFrom: [44, 61, 67]
    },
    {
        id: 145,
        name: "古拉兽",
        level: "成熟期",
        image: getDigimonImagePath("古拉兽"),
        evolvesTo: [294, 274, 247], // 大古拉兽, 地龙兽, 多路暴龙兽
        evolvesFrom: [64, 24, 52]
    },
    {
        id: 146,
        name: "古加兽",
        level: "成熟期",
        image: getDigimonImagePath("古加兽"),
        evolvesTo: [277, 269, 230, 235], // 祖利兽, 大古加兽, 奇虾兽, 奇美拉兽
        evolvesFrom: [28, 40, 45]
    },
    {
        id: 147,
        name: "怪蛙兽",
        level: "成熟期",
        image: getDigimonImagePath("怪蛙兽"),
        evolvesTo: [241, 284, 249], // 塞壬兽, 怪蛙皇, 半鱼兽
        evolvesFrom: [69, 40, 61]
    },
    {
        id: 148,
        name: "卑劣兽",
        level: "成熟期",
        image: getDigimonImagePath("卑劣兽"),
        evolvesTo: [236, 238, 224], // 抓取豆豆兽, 巨星兽, 熊仔兽
        evolvesFrom: [69, 43, 63]
    },
    {
        id: 149,
        name: "核龙兽绿",
        level: "成熟期",
        image: getDigimonImagePath("核龙兽绿"),
        evolvesTo: [294, 274, 278], // 大古拉兽, 地龙兽, 丧尸暴龙兽
        evolvesFrom: [21, 49]
    },
    {
        id: 150,
        name: "黄金鼻涕兽",
        level: "成熟期",
        image: getDigimonImagePath("黄金鼻涕兽"),
        evolvesTo: [299, 289, 287], // 恶海龙兽, 入侵兽, 黑国王鼻涕兽
        evolvesFrom: [73, 26]
    },
    {
        id: 151,
        name: "魔像兽",
        level: "成熟期",
        image: getDigimonImagePath("魔像兽"),
        evolvesTo: [256, 222, 233], // 火山兽, 猛犸兽, 陨石兽
        evolvesFrom: [65, 46, 76]
    },
    {
        id: 152,
        name: "独眼龙兽",
        level: "成熟期",
        image: getDigimonImagePath("独眼龙兽"),
        evolvesTo: [206, 210, 255], // 等级兽, 电子龙兽, 腕龙兽
        evolvesFrom: [37, 63]
    },
    {
        id: 153,
        name: "血狼兽",
        level: "成熟期",
        image: getDigimonImagePath("血狼兽"),
        evolvesTo: [290, 267, 265, 473], // 斗牛士兽, 吸血魔兽, 阿斯塔兽, 狼人加鲁鲁兽黑
        evolvesFrom: [60, 50, 34, 70, 62]
    },
    {
        id: 154,
        name: "大便兽",
        level: "成熟期",
        image: getDigimonImagePath("大便兽"),
        evolvesTo: [224, 268, 271, 259], // 熊仔兽, 猿猴兽, 垃圾桶兽, 豆豆兽
        evolvesFrom: [69, 70, 75]
    },
    {
        id: 155,
        name: "长牙兽",
        level: "成熟期",
        image: getDigimonImagePath("长牙兽"),
        evolvesTo: [246, 274, 243], // 三角龙兽, 地龙兽, 数码蛋兽
        evolvesFrom: [65, 74, 468]
    },
    {
        id: 156,
        name: "恶魔兽",
        level: "成熟期",
        image: getDigimonImagePath("恶魔兽"),
        evolvesTo: [267, 297, 304, 265], // 吸血魔兽, 女恶魔兽, 地狱使者兽, 骷髅撤旦兽, 阿斯塔兽
        evolvesFrom: [60, 72, 74, 468]
    },
    {
        id: 157,
        name: "德尔塔兽",
        level: "成熟期",
        image: getDigimonImagePath("德尔塔兽"),
        evolvesTo: [270, 235, 239, 223, 275], // 大蛇兽, 奇美拉兽, 骷髅巨犀兽, 机械暴龙兽, 鲨鱼兽
        evolvesFrom: [65, 49, 37]
    },
    {
        id: 158,
        name: "毒蜘蛛兽",
        level: "成熟期",
        image: getDigimonImagePath("毒蜘蛛兽"),
        evolvesTo: [266, 291, 198, 304], // 阿刺克涅兽, 木乃伊兽, 超比多兽, 地狱使者兽
        evolvesFrom: [73, 79, 80]
    },
    {
        id: 159,
        name: "什么兽",
        level: "成熟期",
        image: getDigimonImagePath("什么兽"),
        evolvesTo: [256, 238, 268, 259], // 火山兽, 巨星兽, 猿猴兽, 豆豆兽
        evolvesFrom: [41, 75]
    },
    {
        id: 160,
        name: "鼻涕兽",
        level: "成熟期",
        image: getDigimonImagePath("鼻涕兽"),
        evolvesTo: [224, 281, 268], // 熊仔兽, 黑暗巨星兽, 猿猴兽
        evolvesFrom: [21, 74, 61]
    },
    {
        id: 161,
        name: "鬼怪兽",
        level: "成熟期",
        image: getDigimonImagePath("鬼怪兽"),
        evolvesTo: [267, 288, 286, 231], // 吸血魔兽, 蓝色燃烧兽, 幻影兽, 暗马兽
        evolvesFrom: [60, 72, 30]
    },
    {
        id: 162,
        name: "冰河兽",
        level: "成熟期",
        image: getDigimonImagePath("冰河兽"),
        evolvesTo: [212, 286, 216], // 祖顿兽, 幻影兽, 白狮兽
        evolvesFrom: [57, 23, 68]
    },
    {
        id: 163,
        name: "风灾兽",
        level: "成熟期",
        image: getDigimonImagePath("风灾兽"),
        evolvesTo: [256, 204], // 火山兽, 骷髅撤旦兽, 迦楼达兽
        evolvesFrom: [66, 55, 469]
    },
    {
        id: 164,
        name: "黄蜂兽",
        level: "成熟期",
        image: getDigimonImagePath("黄蜂兽"),
        evolvesTo: [293, 198, 269, 211], // 百万龙兽, 超比多兽, 大古加兽, 宝石蜂兽
        evolvesFrom: [73, 63, 75]
    },
    {
        id: 165,
        name: "白金大便兽",
        level: "成熟期",
        image: getDigimonImagePath("白金大便兽"),
        evolvesTo: [289, 259, 261], // 入侵兽, 豆豆兽, 金属豆豆兽
        evolvesFrom: [69, 53, 61]
    },
    {
        id: 166,
        name: "黑迪路兽",
        level: "成熟期",
        image: getDigimonImagePath("黑迪路兽"),
        evolvesTo: [250, 297, 239, 473], // 熊猫兽, 女恶魔兽, 骷髅巨犀兽, 狼人加鲁鲁兽黑
        evolvesFrom: [69, 62, 469]
    },
    {
        id: 167,
        name: "野菜兽",
        level: "成熟期",
        image: getDigimonImagePath("野菜兽"),
        evolvesTo: [284, 271, 289], // 怪蛙皇, 垃圾桶兽, 入侵兽
        evolvesFrom: [53, 74, 54]
    },
    {
        id: 168,
        name: "牛人兽",
        level: "成熟期",
        image: getDigimonImagePath("牛人兽"),
        evolvesTo: [246, 268, 205], // 三角龙兽, 猿猴兽, 格斗狮子兽
        evolvesFrom: [66, 59, 469]
    },
    {
        id: 169,
        name: "武人兽",
        level: "成熟期",
        image: getDigimonImagePath("武人兽"),
        evolvesTo: [206, 218, 217], // 等级兽, 武天兽, 飞车龙兽
        evolvesFrom: [47, 66, 25]
    },
    {
        id: 170,
        name: "机械载物兽",
        level: "成熟期",
        image: getDigimonImagePath("机械载物兽"),
        evolvesTo: [252, 293, 285], // 大豆豆兽, 百万龙兽, 分子兽
        evolvesFrom: [71, 45, 80]
    },
    {
        id: 171,
        name: "烂泥兽",
        level: "成熟期",
        image: getDigimonImagePath("烂泥兽"),
        evolvesTo: [282, 287, 284, 202, 239], // 达贡兽, 黑国王鼻涕兽, 怪蛙皇, EX巨龙兽, 骷髅巨犀兽
        evolvesFrom: [42, 29, 67]
    },
    {
        id: 172,
        name: "胡蜂兽",
        level: "成熟期",
        image: getDigimonImagePath("胡蜂兽"),
        evolvesTo: [227, 273, 283], // 拉比兽, 炮蜂兽, 坦克龙兽
        evolvesFrom: [73, 28, 45]
    },
    {
        id: 173,
        name: "天鹰兽",
        level: "成熟期",
        image: getDigimonImagePath("天鹰兽"),
        evolvesTo: [204, 215, 301, 225], // 迦楼达兽, 鹦鹉兽, 西尔芙兽, 八咫乌兽
        evolvesFrom: [32, 36, 78]
    },
    {
        id: 174,
        name: "甲龙兽",
        level: "成熟期",
        image: getDigimonImagePath("甲龙兽"),
        evolvesTo: [300, 233, 255], // 土偶兽, 陨石兽, 腕龙兽
        evolvesFrom: [63, 25, 76]
    },
    {
        id: 175,
        name: "XV兽",
        level: "成熟期",
        image: getDigimonImagePath("XV兽"),
        evolvesTo: [302, 226, 303], // 恐蜂兽, 跃升暴龙兽, 机甲龙兽
        evolvesFrom: [64, 50, 77]
    },
    {
        id: 176,
        name: "守卫机器人兽金",
        level: "成熟期",
        image: getDigimonImagePath("守卫机器人兽金"),
        evolvesTo: [214, 273, 257], // 杜兰兽, 炮蜂兽, 大师飞艇兽
        evolvesFrom: [48, 25, 26]
    },
    {
        id: 177,
        name: "飞虫兽",
        level: "成熟期",
        image: getDigimonImagePath("飞虫兽"),
        evolvesTo: [269, 211, 302, 303], // 大古加兽, 宝石蜂兽, 恐蜂兽, 机甲龙兽
        evolvesFrom: [73, 79]
    },
    {
        id: 178,
        name: "虫蛹兽",
        level: "成熟期",
        image: getDigimonImagePath("虫蛹兽"),
        evolvesTo: [282, 270, 266, 304], // 达贡兽, 大蛇兽, 阿刺克涅兽, 地狱使者兽
        evolvesFrom: [53, 37, 80]
    },
    {
        id: 179,
        name: "潜艇兽",
        level: "装甲体",
        image: getDigimonImagePath("潜艇兽"),
        evolvesTo: [],
        evolvesFrom: [76]
    },
    {
        id: 180,
        name: "手里剑兽",
        level: "装甲体",
        image: getDigimonImagePath("手里剑兽"),
        evolvesTo: [],
        evolvesFrom: [78]
    },
    {
        id: 181,
        name: "挖掘兽",
        level: "装甲体",
        image: getDigimonImagePath("挖掘兽"),
        evolvesTo: [],
        evolvesFrom: [76]
    },
    {
        id: 182,
        name: "纳芙蒂兽",
        level: "装甲体",
        image: getDigimonImagePath("纳芙蒂兽"),
        evolvesTo: [],
        evolvesFrom: [97]
    },
    {
        id: 183,
        name: "烈焰龙兽",
        level: "装甲体",
        image: getDigimonImagePath("烈焰龙兽"),
        evolvesTo: [],
        evolvesFrom: [77]
    },
    {
        id: 184,
        name: "天马兽",
        level: "装甲体",
        image: getDigimonImagePath("天马兽"),
        evolvesTo: [],
        evolvesFrom: [51]
    },
    {
        id: 185,
        name: "荷鲁斯兽",
        level: "装甲体",
        image: getDigimonImagePath("荷鲁斯兽"),
        evolvesTo: [],
        evolvesFrom: [78]
    },
    {
        id: 186,
        name: "闪电龙兽",
        level: "装甲体",
        image: getDigimonImagePath("闪电龙兽"),
        evolvesTo: [],
        evolvesFrom: [77]
    },
    {
        id: 187,
        name: "火神兽",
        level: "装甲体",
        image: getDigimonImagePath("火神兽"),
        evolvesTo: [305, 190], // 阿尔达兽, 炎龙兽
        evolvesFrom: [24]
    },
    {
        id: 188,
        name: "野狼兽",
        level: "混合体",
        image: getDigimonImagePath("野狼兽"),
        evolvesTo: [306, 192], // 贝奥武夫兽, 加鲁姆兽
        evolvesFrom: [22]
    },
    {
        id: 189,
        name: "拉娜兽",
        level: "混合体",
        image: getDigimonImagePath("拉娜兽"),
        evolvesTo: [191], // 乌贼兽
        evolvesFrom: [63]
    },
    {
        id: 190,
        name: "炎龙兽",
        level: "混合体",
        image: getDigimonImagePath("炎龙兽"),
        evolvesTo: [305, 187], // 阿尔达兽, 火神兽
        evolvesFrom: []
    },
    {
        id: 191,
        name: "乌贼兽",
        level: "混合体",
        image: getDigimonImagePath("乌贼兽"),
        evolvesTo: [189], // 拉娜兽
        evolvesFrom: []
    },
    {
        id: 192,
        name: "加鲁姆兽",
        level: "混合体",
        image: getDigimonImagePath("加鲁姆兽"),
        evolvesTo: [306, 188], // 贝奥武夫兽, 野狼兽
        evolvesFrom: []
    },
    {
        id: 193,
        name: "埃癸奥都斯兽",
        level: "完全体",
        image: getDigimonImagePath("埃癸奥都斯兽"),
        evolvesTo: [340], // 朱庇特兽
        evolvesFrom: [81]
    },
    {
        id: 194,
        name: "埃癸奥都斯兽绿",
        level: "完全体",
        image: getDigimonImagePath("埃癸奥都斯兽绿"),
        evolvesTo: [340], // 朱庇特兽
        evolvesFrom: [81]
    },
    {
        id: 195,
        name: "埃癸奥都斯兽暗",
        level: "完全体",
        image: getDigimonImagePath("埃癸奥都斯兽暗"),
        evolvesTo: [380], // 时空兽DM
        evolvesFrom: [81]
    },
    {
        id: 196,
        name: "埃癸奥都斯兽蓝",
        level: "完全体",
        image: getDigimonImagePath("埃癸奥都斯兽蓝"),
        evolvesTo: [340], // 朱庇特兽
        evolvesFrom: [81]
    },
    {
        id: 197,
        name: "埃癸奥都斯兽圣",
        level: "完全体",
        image: getDigimonImagePath("埃癸奥都斯兽圣"),
        evolvesTo: [340], // 朱庇特兽
        evolvesFrom: [81]
    },
    {
        id: 198,
        name: "超比多兽",
        level: "完全体",
        image: getDigimonImagePath("超比多兽"),
        evolvesTo: [386, 334], // 暴君比多兽, 力神比多兽
        evolvesFrom: [85, 164, 158]
    },
    {
        id: 199,
        name: "机械人兽",
        level: "完全体",
        image: getDigimonImagePath("机械人兽"),
        evolvesTo: [332, 362, 316], // 高等机械人兽, 螺栓兽, 颅骨兽
        evolvesFrom: [143, 119, 118]
    },
    {
        id: 200,
        name: "翼龙兽",
        level: "完全体",
        image: getDigimonImagePath("翼龙兽"),
        evolvesTo: [322, 310, 327], // 闪光暴龙兽, 瓦尔德兽, 斩龙兽
        evolvesFrom: [91, 101, 471]
    },
    {
        id: 201,
        name: "飞行V龙兽",
        level: "完全体",
        image: getDigimonImagePath("飞行V龙兽"),
        evolvesTo: [321, 327, 309], // 神龙兽, 斩龙兽, 究极V龙兽
        evolvesFrom: [83, 91, 101]
    },
    {
        id: 202,
        name: "EX巨龙兽",
        level: "完全体",
        image: getDigimonImagePath("EX巨龙兽"),
        evolvesTo: [412, 402, 320], // 终极巨龙兽, 贝尔菲兽SM, 智天使兽善
        evolvesFrom: [128, 118, 171]
    },
    {
        id: 203,
        name: "天女兽",
        level: "完全体",
        image: getDigimonImagePath("天女兽"),
        evolvesTo: [410, 314, 336, 337], // 朱诺兽, 座天使兽, 圣龙兽, 莫斯提兽
        evolvesFrom: [110, 97, 105, 113]
    },
    {
        id: 204,
        name: "迦楼达兽",
        level: "完全体",
        image: getDigimonImagePath("迦楼达兽"),
        evolvesTo: [347, 335, 352], // 狮鹫兽, 凤凰兽, 杰斯兽
        evolvesFrom: [173, 99, 102, 163]
    },
    {
        id: 205,
        name: "格斗狮子兽",
        level: "完全体",
        image: getDigimonImagePath("格斗狮子兽"),
        evolvesTo: [333, 339, 350, 356], // 番长狮子兽, 玛尔斯兽, 剑狮兽, 芳香兽
        evolvesFrom: [137, 168, 109, 89]
    },
    {
        id: 206,
        name: "等级兽",
        level: "完全体",
        image: getDigimonImagePath("等级兽"),
        evolvesTo: [308, 330, 355], // 阿尔法兽, 杜兰达兽, 君主兽
        evolvesFrom: [107, 152, 127, 95]
    },
    {
        id: 207,
        name: "至尊灰熊兽",
        level: "完全体",
        image: getDigimonImagePath("至尊灰熊兽"),
        evolvesTo: [376, 319], // 卡利斯兽, 智天使兽恶
        evolvesFrom: [89, 132]
    },
    {
        id: 208,
        name: "刻耳柏洛兽",
        level: "完全体",
        image: getDigimonImagePath("刻耳柏洛兽"),
        evolvesTo: [397, 209, 350, 475], // 普路托兽, 刻耳柏洛兽JM, 剑狮兽, 钢铁加鲁鲁兽黑
        evolvesFrom: [98, 136, 58]
    },
    {
        id: 209,
        name: "刻耳柏洛兽JM",
        level: "完全体",
        image: getDigimonImagePath("刻耳柏洛兽JM"),
        evolvesTo: [397, 208, 350, 475], // 普路托兽, 刻耳柏洛兽, 剑狮兽, 钢铁加鲁鲁兽黑
        evolvesFrom: [208]
    },
    {
        id: 210,
        name: "电子龙兽",
        level: "完全体",
        image: getDigimonImagePath("电子龙兽"),
        evolvesTo: [309, 323], // 究极V龙兽, 正义兽
        evolvesFrom: [93, 92, 101, 152]
    },
    {
        id: 211,
        name: "宝石蜂兽",
        level: "完全体",
        image: getDigimonImagePath("宝石蜂兽"),
        evolvesTo: [334, 384], // 力神比多兽, 虎蜂兽
        evolvesFrom: [177, 164, 94]
    },
    {
        id: 212,
        name: "祖顿兽",
        level: "完全体",
        image: getDigimonImagePath("祖顿兽"),
        evolvesTo: [418, 361], // 维京兽, 蛇颈龙兽
        evolvesFrom: [82, 104, 118, 162]
    },
    {
        id: 213,
        name: "麒麟兽",
        level: "完全体",
        image: getDigimonImagePath("麒麟兽"),
        evolvesTo: [326, 317, 419], // 斯雷普兽, 十字兽, 瓦尔基里兽
        evolvesFrom: [110, 106, 103]
    },
    {
        id: 214,
        name: "杜兰兽",
        level: "完全体",
        image: getDigimonImagePath("杜兰兽"),
        evolvesTo: [312, 388, 330], // 战斗暴龙兽, 公爵兽, 杜兰达兽
        evolvesFrom: [102, 95, 176]
    },
    {
        id: 215,
        name: "鹦鹉兽",
        level: "完全体",
        image: getDigimonImagePath("鹦鹉兽"),
        evolvesTo: [317, 335], // 十字兽, 凤凰兽
        evolvesFrom: [173, 99]
    },
    {
        id: 216,
        name: "白狮兽",
        level: "完全体",
        image: getDigimonImagePath("白狮兽"),
        evolvesTo: [363, 350], // 幻影加奥加兽, 剑狮兽
        evolvesFrom: [109, 105, 162, 138]
    },
    {
        id: 217,
        name: "飞车龙兽",
        level: "完全体",
        image: getDigimonImagePath("飞车龙兽"),
        evolvesTo: [313, 373], // 王龙兽, 凯王兽
        evolvesFrom: [83, 88, 121]
    },
    {
        id: 218,
        name: "武天兽",
        level: "完全体",
        image: getDigimonImagePath("武天兽"),
        evolvesTo: [318, 380, 347, 373], // 时空兽HM, 时空兽DM, 狮鹫兽, 凯王兽
        evolvesFrom: [88, 102]
    },
    {
        id: 219,
        name: "耀狮兽",
        level: "完全体",
        image: getDigimonImagePath("耀狮兽"),
        evolvesTo: [307, 328, 474], // 阿波罗兽, 炽天使兽, 黑暗战斗暴龙兽
        evolvesFrom: [109, 100, 99]
    },
    {
        id: 220,
        name: "巨鲸兽",
        level: "完全体",
        image: getDigimonImagePath("巨鲸兽"),
        evolvesTo: [413, 331, 361, 338], // 利维亚兽, 尼普顿兽, 蛇颈龙兽, 海天使兽
        evolvesFrom: [82, 121, 123]
    },
    {
        id: 221,
        name: "神圣天使兽",
        level: "完全体",
        image: getDigimonImagePath("神圣天使兽"),
        evolvesTo: [321, 328, 315, 325], // 神龙兽, 炽天使兽, 键天使兽, 斩天使兽
        evolvesFrom: [84, 106]
    },
    {
        id: 222,
        name: "猛犸兽",
        level: "完全体",
        image: getDigimonImagePath("猛犸兽"),
        evolvesTo: [418, 324], // 维京兽, 骷髅猛犸兽
        evolvesFrom: [151, 136, 105, 104]
    },
    {
        id: 223,
        name: "机械暴龙兽",
        level: "完全体",
        image: getDigimonImagePath("机械暴龙兽"),
        evolvesTo: [312, 373], // 战斗暴龙兽, 凯王兽
        evolvesFrom: [157, 90, 128]
    },
    {
        id: 224,
        name: "熊仔兽",
        level: "完全体",
        image: getDigimonImagePath("熊仔兽"),
        evolvesTo: [378, 376], // 猿猴大王兽, 卡利斯兽
        evolvesFrom: [160, 154, 148]
    },
    {
        id: 225,
        name: "八咫乌兽",
        level: "完全体",
        image: getDigimonImagePath("八咫乌兽"),
        evolvesTo: [310, 341, 345], // 瓦尔德兽, 渡鸦兽, 葛叶兽
        evolvesFrom: [173, 103]
    },
    {
        id: 226,
        name: "跃升暴龙兽",
        level: "完全体",
        image: getDigimonImagePath("跃升暴龙兽"),
        evolvesTo: [326, 322, 403], // 斯雷普兽, 闪光暴龙兽, 玛格纳基德兽
        evolvesFrom: [92, 133, 175, 132]
    },
    {
        id: 227,
        name: "拉比兽",
        level: "完全体",
        image: getDigimonImagePath("拉比兽"),
        evolvesTo: [329, 332], // 圣加鲁哥兽, 高等机械人兽
        evolvesFrom: [119, 172, 86]
    },
    {
        id: 228,
        name: "装载狮子兽",
        level: "完全体",
        image: getDigimonImagePath("装载狮子兽"),
        evolvesTo: [333, 364, 375], // 番长狮子兽, 钢铁加鲁鲁兽, 混沌龙兽
        evolvesFrom: [133, 131]
    },
    {
        id: 229,
        name: "狼人加鲁鲁兽",
        level: "完全体",
        image: getDigimonImagePath("狼人加鲁鲁兽"),
        evolvesTo: [409, 364], // 墨丘利兽, 钢铁加鲁鲁兽
        evolvesFrom: [137, 87, 89]
    },
    {
        id: 230,
        name: "奇虾兽",
        level: "完全体",
        image: getDigimonImagePath("奇虾兽"),
        evolvesTo: [343, 395], // 武尔坎努斯兽, 河豚兽
        evolvesFrom: [122, 146, 123]
    },
    {
        id: 231,
        name: "暗马兽",
        level: "完全体",
        image: getDigimonImagePath("暗马兽"),
        evolvesTo: [326, 324, 428], // 斯雷普兽, 骷髅猛犸兽, 颅骨兽+暗马兽
        evolvesFrom: [161, 138]
    },
    {
        id: 232,
        name: "玉兔兽",
        level: "完全体",
        image: getDigimonImagePath("玉兔兽"),
        evolvesTo: [354, 320, 319], // 狄安娜兽, 智天使兽善, 智天使兽恶
        evolvesFrom: [139, 129, 126]
    },
    {
        id: 233,
        name: "陨石兽",
        level: "完全体",
        image: getDigimonImagePath("陨石兽"),
        evolvesTo: [408, 362], // 金属猿猴兽, 螺栓兽
        evolvesFrom: [151, 105, 174, 111]
    },
    {
        id: 234,
        name: "奥米加高吼兽",
        level: "完全体",
        image: getDigimonImagePath("奥米加高吼兽"),
        evolvesTo: [359, 403, 330], // 摔跤火山兽, 玛格纳基德兽, 杜兰达兽
        evolvesFrom: [48]
    },
    {
        id: 235,
        name: "奇美拉兽",
        level: "完全体",
        image: getDigimonImagePath("奇美拉兽"),
        evolvesTo: [379, 405, 406], // 大德库拉兽, 千年兽, 无限龙兽
        evolvesFrom: [87, 157, 85, 90, 146]
    },
    {
        id: 236,
        name: "抓取豆豆兽",
        level: "完全体",
        image: getDigimonImagePath("抓取豆豆兽"),
        evolvesTo: [396, 360, 475], // 白金鼻涕兽, 王子豆豆兽, 钢铁加鲁鲁兽黑
        evolvesFrom: [143, 86, 148]
    },
    {
        id: 237,
        name: "新月兽",
        level: "完全体",
        image: getDigimonImagePath("新月兽"),
        evolvesTo: [354, 320, 415], // 狄安娜兽, 智天使兽善, 领主骑士兽
        evolvesFrom: [137, 105, 138, 111]
    },
    {
        id: 238,
        name: "巨星兽",
        level: "完全体",
        image: getDigimonImagePath("巨星兽"),
        evolvesTo: [321, 360, 323], // 神龙兽, 王子豆豆兽, 正义兽
        evolvesFrom: [124, 159, 108, 148]
    },
    {
        id: 239,
        name: "骷髅巨犀兽",
        level: "完全体",
        image: getDigimonImagePath("骷髅巨犀兽"),
        evolvesTo: [324, 442], // 骷髅猛犸兽, 泰坦+骷髅巨犀兽
        evolvesFrom: [157, 171, 471]
    },
    {
        id: 240,
        name: "救星哈克兽",
        level: "完全体",
        image: getDigimonImagePath("救星哈克兽"),
        evolvesTo: [344, 384, 352], // 顽固兽, 虎蜂兽, 杰斯兽
        evolvesFrom: [93, 114, 133, 100]
    },
    {
        id: 241,
        name: "塞壬兽",
        level: "完全体",
        image: getDigimonImagePath("塞壬兽"),
        evolvesTo: [338, 348], // 海天使兽, 刻瑞斯兽
        evolvesFrom: [84, 147, 116]
    },
    {
        id: 242,
        name: "道士兽",
        level: "完全体",
        image: getDigimonImagePath("道士兽"),
        evolvesTo: [311, 351, 345], // 维纳斯兽, 咲耶兽, 葛叶兽
        evolvesFrom: [87, 140]
    },
    {
        id: 243,
        name: "数码蛋兽",
        level: "完全体",
        image: getDigimonImagePath("数码蛋兽"),
        evolvesTo: [389, 385], // 巴克科斯兽, 泰坦兽
        evolvesFrom: [142, 141, 155]
    },
    {
        id: 244,
        name: "死亡燃烧兽",
        level: "完全体",
        image: getDigimonImagePath("死亡燃烧兽"),
        evolvesTo: [401, 362, 369], // 别西卜兽, 螺栓兽, 复仇基德兽
        evolvesFrom: [135, 139, 99]
    },
    {
        id: 245,
        name: "华丽兽",
        level: "完全体",
        image: getDigimonImagePath("华丽兽"),
        evolvesTo: [310, 348, 396], // 瓦尔德兽, 刻瑞斯兽, 白金鼻涕兽
        evolvesFrom: [120, 116, 126]
    },
    {
        id: 246,
        name: "三角龙兽",
        level: "完全体",
        image: getDigimonImagePath("三角龙兽"),
        evolvesTo: [398, 342], // 破坏龙兽, 究极腕龙兽
        evolvesFrom: [168, 136, 131, 155]
    },
    {
        id: 247,
        name: "多路暴龙兽",
        level: "完全体",
        image: getDigimonImagePath("多路暴龙兽"),
        evolvesTo: [358, 308], // 多路战龙兽, 阿尔法兽
        evolvesFrom: [110, 145, 132]
    },
    {
        id: 248,
        name: "骑士兽",
        level: "完全体",
        image: getDigimonImagePath("骑士兽"),
        evolvesTo: [381, 325, 415, 356], // 斩伐兽, 斩天使兽, 领主骑士兽, 芳香兽
        evolvesFrom: [118, 127, 95]
    },
    {
        id: 249,
        name: "半鱼兽",
        level: "完全体",
        image: getDigimonImagePath("半鱼兽"),
        evolvesTo: [331, 361], // 尼普顿兽, 蛇颈龙兽
        evolvesFrom: [115, 122, 142, 147]
    },
    {
        id: 250,
        name: "熊猫兽",
        level: "完全体",
        image: getDigimonImagePath("熊猫兽"),
        evolvesTo: [409, 363, 323], // 墨丘利兽, 幻影加奥加兽, 正义兽
        evolvesFrom: [108, 470]
    },
    {
        id: 251,
        name: "南瓜兽",
        level: "完全体",
        image: getDigimonImagePath("南瓜兽"),
        evolvesTo: [367, 368], // 蔷薇兽, 莲花兽
        evolvesFrom: [120, 130, 140]
    },
    {
        id: 252,
        name: "大豆豆兽",
        level: "完全体",
        image: getDigimonImagePath("大豆豆兽"),
        evolvesTo: [396, 360, 346], // 白金鼻涕兽, 王子豆豆兽, 大火车头兽
        evolvesFrom: [135, 125]
    },
    {
        id: 253,
        name: "妖精兽",
        level: "完全体",
        image: getDigimonImagePath("妖精兽"),
        evolvesTo: [311, 314, 315], // 维纳斯兽, 座天使兽, 键天使兽
        evolvesFrom: [123, 104, 96]
    },
    {
        id: 254,
        name: "骏鹰兽",
        level: "完全体",
        image: getDigimonImagePath("骏鹰兽"),
        evolvesTo: [347, 317, 355], // 狮鹫兽, 十字兽, 君主兽
        evolvesFrom: [84, 106]
    },
    {
        id: 255,
        name: "腕龙兽",
        level: "完全体",
        image: getDigimonImagePath("腕龙兽"),
        evolvesTo: [313, 412, 342], // 王龙兽, 终极巨龙兽, 究极腕龙兽
        evolvesFrom: [131, 152, 174]
    },
    {
        id: 256,
        name: "火山兽",
        level: "完全体",
        image: getDigimonImagePath("火山兽"),
        evolvesTo: [333, 359, 344, 307], // 番长狮子兽, 摔跤火山兽, 顽固兽, 阿波罗兽
        evolvesFrom: [151, 124, 159, 163]
    },
    {
        id: 257,
        name: "大师飞艇兽",
        level: "完全体",
        image: getDigimonImagePath("大师飞艇兽"),
        evolvesTo: [346, 377], // 大火车头兽, 枪龙兽
        evolvesFrom: [134, 176]
    },
    {
        id: 258,
        name: "音速加奥加兽",
        level: "完全体",
        image: getDigimonImagePath("音速加奥加兽"),
        evolvesTo: [363, 329], // 幻影加奥加兽, 圣加鲁哥兽
        evolvesFrom: [114, 129, 86]
    },
    {
        id: 259,
        name: "豆豆兽",
        level: "完全体",
        image: getDigimonImagePath("豆豆兽"),
        evolvesTo: [395, 360], // 河豚兽, 王子豆豆兽
        evolvesFrom: [124, 154, 159, 165]
    },
    {
        id: 260,
        name: "百万海龙兽",
        level: "完全体",
        image: getDigimonImagePath("百万海龙兽"),
        evolvesTo: [353, 313, 365], // 巨龟兽, 王龙兽, 金属海龙兽
        evolvesFrom: [110, 82, 121]
    },
    {
        id: 261,
        name: "金属豆豆兽",
        level: "完全体",
        image: getDigimonImagePath("金属豆豆兽"),
        evolvesTo: [364, 403], // 钢铁加鲁鲁兽, 玛格纳基德兽
        evolvesFrom: [134, 165]
    },
    {
        id: 262,
        name: "丁香兽",
        level: "完全体",
        image: getDigimonImagePath("丁香兽"),
        evolvesTo: [414, 367, 393], // 莉莉丝兽, 蔷薇兽, 木偶兽
        evolvesFrom: [120, 85, 116]
    },
    {
        id: 263,
        name: "花仙兽",
        level: "完全体",
        image: getDigimonImagePath("花仙兽"),
        evolvesTo: [367, 348], // 蔷薇兽, 刻瑞斯兽
        evolvesFrom: [120, 130, 113]
    },
    {
        id: 264,
        name: "火车头兽",
        level: "完全体",
        image: getDigimonImagePath("火车头兽"),
        evolvesTo: [346, 332], // 大火车头兽, 高等机械人兽
        evolvesFrom: [93, 143, 134, 125]
    },
    {
        id: 265,
        name: "阿斯塔兽",
        level: "完全体",
        image: getDigimonImagePath("阿斯塔兽"),
        evolvesTo: [401, 397, 402, 371], // 别西卜兽, 普路托兽, 贝尔菲兽SM, 怨毒吸血魔兽
        evolvesFrom: [153, 156]
    },
    {
        id: 266,
        name: "阿刺克涅兽",
        level: "完全体",
        image: getDigimonImagePath("阿刺克涅兽"),
        evolvesTo: [414, 386, 368], // 莉莉丝兽, 暴君比多兽, 莲花兽
        evolvesFrom: [139, 158, 94, 178]
    },
    {
        id: 267,
        name: "吸血魔兽",
        level: "完全体",
        image: getDigimonImagePath("吸血魔兽"),
        evolvesTo: [387, 399, 371], // 究极魔兽, 贝利亚吸血魔兽, 怨毒吸血魔兽
        evolvesFrom: [161, 153, 156, 103]
    },
    {
        id: 268,
        name: "猿猴兽",
        level: "完全体",
        image: getDigimonImagePath("猿猴兽"),
        evolvesTo: [359, 378, 408], // 摔跤火山兽, 猿猴大王兽, 金属猿猴兽
        evolvesFrom: [168, 160, 154, 159]
    },
    {
        id: 269,
        name: "大古加兽",
        level: "完全体",
        image: getDigimonImagePath("大古加兽"),
        evolvesTo: [386, 334, 420], // 暴君比多兽, 力神比多兽, 巨大古加兽
        evolvesFrom: [177, 146, 164]
    },
    {
        id: 270,
        name: "大蛇兽",
        level: "完全体",
        image: getDigimonImagePath("大蛇兽"),
        evolvesTo: [389, 377, 404], // 巴克科斯兽, 枪龙兽, 密涅瓦兽
        evolvesFrom: [157, 144, 178]
    },
    {
        id: 271,
        name: "垃圾桶兽",
        level: "完全体",
        image: getDigimonImagePath("垃圾桶兽"),
        evolvesTo: [353, 408], // 巨龟兽, 金属猿猴兽
        evolvesFrom: [154, 167, 126]
    },
    {
        id: 272,
        name: "千兆龙兽",
        level: "完全体",
        image: getDigimonImagePath("千兆龙兽"),
        evolvesTo: [377, 375], // 枪龙兽, 混沌龙兽
        evolvesFrom: [83, 107, 91]
    },
    {
        id: 273,
        name: "炮蜂兽",
        level: "完全体",
        image: getDigimonImagePath("炮蜂兽"),
        evolvesTo: [329, 384], // 圣加鲁哥兽, 虎蜂兽
        evolvesFrom: [85, 172, 176]
    },
    {
        id: 274,
        name: "地龙兽",
        level: "完全体",
        image: getDigimonImagePath("地龙兽"),
        evolvesTo: [407, 398], // 灭世龙兽, 破坏龙兽
        evolvesFrom: [145, 149, 128, 155]
    },
    {
        id: 275,
        name: "鲨鱼兽",
        level: "完全体",
        image: getDigimonImagePath("鲨鱼兽"),
        evolvesTo: [331, 365], // 尼普顿兽, 金属海龙兽
        evolvesFrom: [157, 121]
    },
    {
        id: 276,
        name: "沙悟净兽",
        level: "完全体",
        image: getDigimonImagePath("沙悟净兽"),
        evolvesTo: [391, 353, 393], // 巴尔巴兽, 巨龟兽, 木偶兽
        evolvesFrom: [115, 127]
    },
    {
        id: 277,
        name: "祖利兽",
        level: "完全体",
        image: getDigimonImagePath("祖利兽"),
        evolvesTo: [393, 367, 420], // 木偶兽, 蔷薇兽, 巨大古加兽
        evolvesFrom: [130, 146, 140, 116]
    },
    {
        id: 278,
        name: "丧尸暴龙兽",
        level: "完全体",
        image: getDigimonImagePath("丧尸暴龙兽"),
        evolvesTo: [385, 324], // 泰坦兽, 骷髅猛犸兽
        evolvesFrom: [88, 149, 90]
    },
    {
        id: 279,
        name: "骷髅撒旦兽",
        level: "完全体",
        image: getDigimonImagePath("骷髅撒旦兽"),
        evolvesTo: [391, 392, 370], // 巴尔巴兽, 小丑兽, 外星兽
        evolvesFrom: [156, 141, 163, 470]
    },
    {
        id: 280,
        name: "丧尸海龙兽",
        level: "完全体",
        image: getDigimonImagePath("丧尸海龙兽"),
        evolvesTo: [413, 365], // 利维亚兽, 金属海龙兽
        evolvesFrom: [122, 82, 121]
    },
    {
        id: 281,
        name: "黑暗巨星兽",
        level: "完全体",
        image: getDigimonImagePath("黑暗巨星兽"),
        evolvesTo: [400, 385, 341], // 贝尔斯塔兽, 泰坦兽, 渡鸦兽
        evolvesFrom: [124, 114, 160, 98]
    },
    {
        id: 282,
        name: "达贡兽",
        level: "完全体",
        image: getDigimonImagePath("达贡兽"),
        evolvesTo: [343, 370], // 武尔坎努斯兽, 外星兽
        evolvesFrom: [142, 171, 178]
    },
    {
        id: 283,
        name: "坦克龙兽",
        level: "完全体",
        image: getDigimonImagePath("坦克龙兽"),
        evolvesTo: [377, 383], // 枪龙兽, 暗龙兽
        evolvesFrom: [107, 172, 125]
    },
    {
        id: 284,
        name: "怪蛙皇",
        level: "完全体",
        image: getDigimonImagePath("怪蛙皇"),
        evolvesTo: [378, 389, 395], // 猿猴大王兽, 巴克科斯兽, 河豚兽
        evolvesFrom: [115, 167, 147, 171]
    },
    {
        id: 285,
        name: "分子兽",
        level: "完全体",
        image: getDigimonImagePath("分子兽"),
        evolvesTo: [394, 421], // 法老兽, 超恶魔兽
        evolvesFrom: [119, 112, 170]
    },
    {
        id: 286,
        name: "幻影兽",
        level: "完全体",
        image: getDigimonImagePath("幻影兽"),
        evolvesTo: [351, 392, 402, 341], // 咲耶兽, 小丑兽, 贝尔菲兽SM, 渡鸦兽
        evolvesFrom: [161, 162, 94]
    },
    {
        id: 287,
        name: "黑国王鼻涕兽",
        level: "完全体",
        image: getDigimonImagePath("黑国王鼻涕兽"),
        evolvesTo: [396, 408], // 白金鼻涕兽, 金属猿猴兽
        evolvesFrom: [150, 144, 171]
    },
    {
        id: 288,
        name: "蓝色燃烧兽",
        level: "完全体",
        image: getDigimonImagePath("蓝色燃烧兽"),
        evolvesTo: [339, 394], // 玛尔斯兽, 法老兽
        evolvesFrom: [135, 87, 161]
    },
    {
        id: 289,
        name: "入侵兽",
        level: "完全体",
        image: getDigimonImagePath("入侵兽"),
        evolvesTo: [370, 369], // 外星兽, 复仇基德兽
        evolvesFrom: [150, 167, 165]
    },
    {
        id: 290,
        name: "斗牛士兽",
        level: "完全体",
        image: getDigimonImagePath("斗牛士兽"),
        evolvesTo: [379, 325, 345], // 大德库拉兽, 斩天使兽, 葛叶兽
        evolvesFrom: [153, 129, 98]
    },
    {
        id: 291,
        name: "木乃伊兽",
        level: "完全体",
        image: getDigimonImagePath("木乃伊兽"),
        evolvesTo: [394, 332, 369], // 法老兽, 高等机械人兽, 复仇基德兽
        evolvesFrom: [98, 141, 158]
    },
    {
        id: 292,
        name: "神秘兽",
        level: "完全体",
        image: getDigimonImagePath("神秘兽"),
        evolvesTo: [374, 381, 366, 355], // 混沌公爵兽, 斩伐兽, 中世纪公爵兽, 君主兽
        evolvesFrom: [100, 104, 112]
    },
    {
        id: 293,
        name: "百万龙兽",
        level: "完全体",
        image: getDigimonImagePath("百万龙兽"),
        evolvesTo: [407, 406], // 灭世龙兽, 无限龙兽
        evolvesFrom: [83, 90, 164, 170]
    },
    {
        id: 294,
        name: "大古拉兽",
        level: "完全体",
        image: getDigimonImagePath("大古拉兽"),
        evolvesTo: [407, 388, 374, 375], // 灭世龙兽, 公爵兽, 混沌公爵兽, 混沌龙兽
        evolvesFrom: [145, 149, 95]
    },
    {
        id: 295,
        name: "金属巨龙兽",
        level: "完全体",
        image: getDigimonImagePath("金属巨龙兽"),
        evolvesTo: [412, 406, 342], // 终极巨龙兽, 无限龙兽, 究极腕龙兽
        evolvesFrom: [92, 122, 128]
    },
    {
        id: 296,
        name: "光明兽FM",
        level: "完全体",
        image: getDigimonImagePath("光明兽FM"),
        evolvesTo: [447], // 光明兽SM
        evolvesFrom: [39]
    },
    {
        id: 297,
        name: "女恶魔兽",
        level: "完全体",
        image: getDigimonImagePath("女恶魔兽"),
        evolvesTo: [414, 400, 337], // 莉莉丝兽, 贝尔斯塔兽, 莫斯提兽
        evolvesFrom: [156, 113, 138]
    },
    {
        id: 298,
        name: "贤者兽",
        level: "完全体",
        image: getDigimonImagePath("贤者兽"),
        evolvesTo: [387, 374, 372], // 究极魔兽, 混沌公爵兽, 古代贤者兽
        evolvesFrom: [112, 108, 96]
    },
    {
        id: 299,
        name: "恶海龙兽",
        level: "完全体",
        image: getDigimonImagePath("恶海龙兽"),
        evolvesTo: [413, 407, 365], // 利维亚兽, 灭世龙兽, 金属海龙兽
        evolvesFrom: [150, 122, 121, 144]
    },
    {
        id: 300,
        name: "土偶兽",
        level: "完全体",
        image: getDigimonImagePath("土偶兽"),
        evolvesTo: [321, 410, 418, 336], // 神龙兽, 朱诺兽, 维京兽, 圣龙兽
        evolvesFrom: [84, 174]
    },
    {
        id: 301,
        name: "西尔芙兽",
        level: "完全体",
        image: getDigimonImagePath("西尔芙兽"),
        evolvesTo: [400, 404, 419], // 贝尔斯塔兽, 密涅瓦兽, 瓦尔基里兽
        evolvesFrom: [173, 97]
    },
    {
        id: 302,
        name: "恐蜂兽",
        level: "完全体",
        image: getDigimonImagePath("恐蜂兽"),
        evolvesTo: [420, 384], // 巨大古加兽, 虎蜂兽
        evolvesFrom: [177, 175]
    },
    {
        id: 303,
        name: "机甲龙兽",
        level: "完全体",
        image: getDigimonImagePath("机甲龙兽"),
        evolvesTo: [358, 416, 383], // 多路战龙兽, 帝皇龙甲兽DM, 暗龙兽
        evolvesFrom: [177, 175]
    },
    {
        id: 304,
        name: "地狱使者兽",
        level: "完全体",
        image: getDigimonImagePath("地狱使者兽"),
        evolvesTo: [399, 421, 319], // 贝利亚吸血魔兽, 超恶魔兽, 智天使兽恶
        evolvesFrom: [156, 158, 178]
    },
    {
        id: 305,
        name: "阿尔达兽",
        level: "⑤混合体",
        image: getDigimonImagePath("阿尔达兽"),
        evolvesTo: [424], // 凯撒暴龙兽
        evolvesFrom: [187, 190]
    },
    {
        id: 306,
        name: "贝奥武夫兽",
        level: "⑤混合体",
        image: getDigimonImagePath("贝奥武夫兽"),
        evolvesTo: [425], // 盔甲加鲁鲁兽
        evolvesFrom: [188, 192]
    },
    {
        id: 307,
        name: "阿波罗兽",
        level: "究极体",
        image: getDigimonImagePath("阿波罗兽"),
        evolvesTo: [434], // 优雅新星兽
        evolvesFrom: [256, 219]
    },
    {
        id: 308,
        name: "阿尔法兽",
        level: "究极体",
        image: getDigimonImagePath("阿尔法兽"),
        evolvesTo: [427], // 阿尔法兽王龙剑
        evolvesFrom: [206, 247]
    },
    {
        id: 309,
        name: "究极V龙兽",
        level: "究极体",
        image: getDigimonImagePath("究极V龙兽"),
        evolvesTo: [],
        evolvesFrom: [201, 210]
    },
    {
        id: 310,
        name: "瓦尔德兽",
        level: "究极体",
        image: getDigimonImagePath("瓦尔德兽"),
        evolvesTo: [433], // 混沌兽瓦尔德臂
        evolvesFrom: [200, 245, 225]
    },
    {
        id: 311,
        name: "维纳斯兽",
        level: "究极体",
        image: getDigimonImagePath("维纳斯兽"),
        evolvesTo: [],
        evolvesFrom: [242, 253]
    },
    {
        id: 312,
        name: "战斗暴龙兽",
        level: "究极体",
        image: getDigimonImagePath("战斗暴龙兽"),
        evolvesTo: [430], // 奥米加兽
        evolvesFrom: [223, 214]
    },
    {
        id: 313,
        name: "王龙兽",
        level: "究极体",
        image: getDigimonImagePath("王龙兽"),
        evolvesTo: [427], // 阿尔法兽王龙剑
        evolvesFrom: [260, 217, 255]
    },
    {
        id: 314,
        name: "座天使兽",
        level: "究极体",
        image: getDigimonImagePath("座天使兽"),
        evolvesTo: [],
        evolvesFrom: [203, 253]
    },
    {
        id: 315,
        name: "键天使兽",
        level: "究极体",
        image: getDigimonImagePath("键天使兽"),
        evolvesTo: [],
        evolvesFrom: [221, 253]
    },
    {
        id: 316,
        name: "颅骨兽",
        level: "究极体",
        image: getDigimonImagePath("颅骨兽"),
        evolvesTo: [428], // 颅骨兽+暗马兽
        evolvesFrom: [199]
    },
    {
        id: 317,
        name: "十字兽",
        level: "究极体",
        image: getDigimonImagePath("十字兽"),
        evolvesTo: [],
        evolvesFrom: [254, 213, 215]
    },
    {
        id: 318,
        name: "时空兽HM",
        level: "究极体",
        image: getDigimonImagePath("时空兽HM"),
        evolvesTo: [],
        evolvesFrom: [218]
    },
    {
        id: 319,
        name: "智天使兽恶",
        level: "究极体",
        image: getDigimonImagePath("智天使兽恶"),
        evolvesTo: [],
        evolvesFrom: [207, 304, 232, 472]
    },
    {
        id: 320,
        name: "智天使兽善",
        level: "究极体",
        image: getDigimonImagePath("智天使兽善"),
        evolvesTo: [],
        evolvesFrom: [202, 237, 232]
    },
    {
        id: 321,
        name: "神龙兽",
        level: "究极体",
        image: getDigimonImagePath("神龙兽"),
        evolvesTo: [],
        evolvesFrom: [238, 221, 201, 300]
    },
    {
        id: 322,
        name: "闪光暴龙兽",
        level: "究极体",
        image: getDigimonImagePath("闪光暴龙兽"),
        evolvesTo: [435], // 闪光暴龙兽BM
        evolvesFrom: [226, 200]
    },
    {
        id: 323,
        name: "正义兽",
        level: "究极体",
        image: getDigimonImagePath("正义兽"),
        evolvesTo: [],
        evolvesFrom: [250, 238, 210]
    },
    {
        id: 324,
        name: "骷髅猛犸兽",
        level: "究极体",
        image: getDigimonImagePath("骷髅猛犸兽"),
        evolvesTo: [],
        evolvesFrom: [239, 278, 222, 231]
    },
    {
        id: 325,
        name: "斩天使兽",
        level: "究极体",
        image: getDigimonImagePath("斩天使兽"),
        evolvesTo: [],
        evolvesFrom: [290, 221, 248]
    },
    {
        id: 326,
        name: "斯雷普兽",
        level: "究极体",
        image: getDigimonImagePath("斯雷普兽"),
        evolvesTo: [],
        evolvesFrom: [226, 213, 231]
    },
    {
        id: 327,
        name: "斩龙兽",
        level: "究极体",
        image: getDigimonImagePath("斩龙兽"),
        evolvesTo: [439], // 艾可萨兽
        evolvesFrom: [200, 201]
    },
    {
        id: 328,
        name: "炽天使兽",
        level: "究极体",
        image: getDigimonImagePath("炽天使兽"),
        evolvesTo: [],
        evolvesFrom: [221, 219]
    },
    {
        id: 329,
        name: "圣加鲁哥兽",
        level: "究极体",
        image: getDigimonImagePath("圣加鲁哥兽"),
        evolvesTo: [],
        evolvesFrom: [258, 227, 273]
    },
    {
        id: 330,
        name: "杜兰达兽",
        level: "究极体",
        image: getDigimonImagePath("杜兰达兽"),
        evolvesTo: [],
        evolvesFrom: [206, 234, 214]
    },
    {
        id: 331,
        name: "尼普顿兽",
        level: "究极体",
        image: getDigimonImagePath("尼普顿兽"),
        evolvesTo: [],
        evolvesFrom: [220, 249, 275]
    },
    {
        id: 332,
        name: "高等机械人兽",
        level: "究极体",
        image: getDigimonImagePath("高等机械人兽"),
        evolvesTo: [],
        evolvesFrom: [264, 291, 199, 227]
    },
    {
        id: 333,
        name: "番长狮子兽",
        level: "究极体",
        image: getDigimonImagePath("番长狮子兽"),
        evolvesTo: [433, 432], // 混沌兽瓦尔德臂, 混沌兽
        evolvesFrom: [256, 205, 228]
    },
    {
        id: 334,
        name: "力神比多兽",
        level: "究极体",
        image: getDigimonImagePath("力神比多兽"),
        evolvesTo: [],
        evolvesFrom: [198, 269, 211]
    },
    {
        id: 335,
        name: "凤凰兽",
        level: "究极体",
        image: getDigimonImagePath("凤凰兽"),
        evolvesTo: [],
        evolvesFrom: [204, 215]
    },
    {
        id: 336,
        name: "圣龙兽",
        level: "究极体",
        image: getDigimonImagePath("圣龙兽"),
        evolvesTo: [],
        evolvesFrom: [203, 300]
    },
    {
        id: 337,
        name: "莫斯提兽",
        level: "究极体",
        image: getDigimonImagePath("莫斯提兽"),
        evolvesTo: [],
        evolvesFrom: [297, 203]
    },
    {
        id: 338,
        name: "海天使兽",
        level: "究极体",
        image: getDigimonImagePath("海天使兽"),
        evolvesTo: [],
        evolvesFrom: [220, 241]
    },
    {
        id: 339,
        name: "玛尔斯兽",
        level: "究极体",
        image: getDigimonImagePath("玛尔斯兽"),
        evolvesTo: [],
        evolvesFrom: [288, 205]
    },
    {
        id: 340,
        name: "朱庇特兽",
        level: "究极体",
        image: getDigimonImagePath("朱庇特兽"),
        evolvesTo: [437], // 朱庇特兽WM
        evolvesFrom: [193, 197, 196, 194]
    },
    {
        id: 341,
        name: "渡鸦兽",
        level: "究极体",
        image: getDigimonImagePath("渡鸦兽"),
        evolvesTo: [438], // 渡鸦兽BM
        evolvesFrom: [286, 225]
    },
    {
        id: 342,
        name: "究极腕龙兽",
        level: "究极体",
        image: getDigimonImagePath("究极腕龙兽"),
        evolvesTo: [],
        evolvesFrom: [295, 255]
    },
    {
        id: 343,
        name: "武尔坎努斯兽",
        level: "究极体",
        image: getDigimonImagePath("武尔坎努斯兽"),
        evolvesTo: [],
        evolvesFrom: [282, 230]
    },
    {
        id: 344,
        name: "顽固兽",
        level: "究极体",
        image: getDigimonImagePath("顽固兽"),
        evolvesTo: [],
        evolvesFrom: [256, 240]
    },
    {
        id: 345,
        name: "葛叶兽",
        level: "究极体",
        image: getDigimonImagePath("葛叶兽"),
        evolvesTo: [],
        evolvesFrom: [290, 242, 225]
    },
    {
        id: 346,
        name: "大火车头兽",
        level: "究极体",
        image: getDigimonImagePath("大火车头兽"),
        evolvesTo: [],
        evolvesFrom: [252, 264, 257]
    },
    {
        id: 347,
        name: "狮鹫兽",
        level: "究极体",
        image: getDigimonImagePath("狮鹫兽"),
        evolvesTo: [],
        evolvesFrom: [254, 204, 218]
    },
    {
        id: 348,
        name: "刻瑞斯兽",
        level: "究极体",
        image: getDigimonImagePath("刻瑞斯兽"),
        evolvesTo: [349], // 刻瑞斯兽灵媒
        evolvesFrom: [241, 263, 245]
    },
    {
        id: 349,
        name: "刻瑞斯兽灵媒",
        level: "究极体",
        image: getDigimonImagePath("刻瑞斯兽灵媒"),
        evolvesTo: [],
        evolvesFrom: [348]
    },
    {
        id: 350,
        name: "剑狮兽",
        level: "究极体",
        image: getDigimonImagePath("剑狮兽"),
        evolvesTo: [],
        evolvesFrom: [208, 209, 205, 216]
    },
    {
        id: 351,
        name: "咲耶兽",
        level: "究极体",
        image: getDigimonImagePath("咲耶兽"),
        evolvesTo: [],
        evolvesFrom: [242, 286]
    },
    {
        id: 352,
        name: "杰斯兽",
        level: "究极体",
        image: getDigimonImagePath("杰斯兽"),
        evolvesTo: [],
        evolvesFrom: [240, 204]
    },
    {
        id: 353,
        name: "巨龟兽",
        level: "究极体",
        image: getDigimonImagePath("巨龟兽"),
        evolvesTo: [],
        evolvesFrom: [276, 260, 271]
    },
    {
        id: 354,
        name: "狄安娜兽",
        level: "究极体",
        image: getDigimonImagePath("狄安娜兽"),
        evolvesTo: [434], // 优雅新星兽
        evolvesFrom: [237, 232]
    },
    {
        id: 355,
        name: "君主兽",
        level: "究极体",
        image: getDigimonImagePath("君主兽"),
        evolvesTo: [],
        evolvesFrom: [206, 254, 292]
    },
    {
        id: 356,
        name: "芳香兽",
        level: "究极体",
        image: getDigimonImagePath("芳香兽"),
        evolvesTo: [357], // 芳香兽LM
        evolvesFrom: [205, 248]
    },
    {
        id: 357,
        name: "芳香兽LM",
        level: "究极体",
        image: getDigimonImagePath("芳香兽LM"),
        evolvesTo: [],
        evolvesFrom: [356]
    },
    {
        id: 358,
        name: "多路战龙兽",
        level: "究极体",
        image: getDigimonImagePath("多路战龙兽"),
        evolvesTo: [],
        evolvesFrom: [247, 303]
    },
    {
        id: 359,
        name: "摔跤火山兽",
        level: "究极体",
        image: getDigimonImagePath("摔跤火山兽"),
        evolvesTo: [],
        evolvesFrom: [256, 268, 234, 473]
    },
    {
        id: 360,
        name: "王子豆豆兽",
        level: "究极体",
        image: getDigimonImagePath("王子豆豆兽"),
        evolvesTo: [],
        evolvesFrom: [252, 236, 238, 259]
    },
    {
        id: 361,
        name: "蛇颈龙兽",
        level: "究极体",
        image: getDigimonImagePath("蛇颈龙兽"),
        evolvesTo: [],
        evolvesFrom: [220, 212, 249]
    },
    {
        id: 362,
        name: "螺栓兽",
        level: "究极体",
        image: getDigimonImagePath("螺栓兽"),
        evolvesTo: [],
        evolvesFrom: [199, 244, 233]
    },
    {
        id: 363,
        name: "幻影加奥加兽",
        level: "究极体",
        image: getDigimonImagePath("幻影加奥加兽"),
        evolvesTo: [440], // 幻影加奥加兽BM
        evolvesFrom: [250, 258, 216]
    },
    {
        id: 364,
        name: "钢铁加鲁鲁兽",
        level: "究极体",
        image: getDigimonImagePath("钢铁加鲁鲁兽"),
        evolvesTo: [430], // 奥米加兽
        evolvesFrom: [229, 261, 228]
    },
    {
        id: 365,
        name: "金属海龙兽",
        level: "究极体",
        image: getDigimonImagePath("金属海龙兽"),
        evolvesTo: [],
        evolvesFrom: [260, 299, 275, 280]
    },
    {
        id: 366,
        name: "中世纪公爵兽",
        level: "究极体",
        image: getDigimonImagePath("中世纪公爵兽"),
        evolvesTo: [],
        evolvesFrom: [292]
    },
    {
        id: 367,
        name: "蔷薇兽",
        level: "究极体",
        image: getDigimonImagePath("蔷薇兽"),
        evolvesTo: [441], // 蔷薇兽BM
        evolvesFrom: [262, 263, 277, 251]
    },
    {
        id: 368,
        name: "莲花兽",
        level: "究极体",
        image: getDigimonImagePath("莲花兽"),
        evolvesTo: [],
        evolvesFrom: [266, 251]
    },
    {
        id: 369,
        name: "复仇基德兽",
        level: "究极体",
        image: getDigimonImagePath("复仇基德兽"),
        evolvesTo: [],
        evolvesFrom: [291, 244, 289]
    },
    {
        id: 370,
        name: "外星兽",
        level: "究极体",
        image: getDigimonImagePath("外星兽"),
        evolvesTo: [],
        evolvesFrom: [279, 282, 289]
    },
    {
        id: 371,
        name: "怨毒吸血魔兽",
        level: "究极体",
        image: getDigimonImagePath("怨毒吸血魔兽"),
        evolvesTo: [],
        evolvesFrom: [267, 265]
    },
    {
        id: 372,
        name: "古代贤者兽",
        level: "究极体",
        image: getDigimonImagePath("古代贤者兽"),
        evolvesTo: [],
        evolvesFrom: [298]
    },
    {
        id: 373,
        name: "凯王兽",
        level: "究极体",
        image: getDigimonImagePath("凯王兽"),
        evolvesTo: [],
        evolvesFrom: [217, 223, 218]
    },
    {
        id: 374,
        name: "混沌公爵兽",
        level: "究极体",
        image: getDigimonImagePath("混沌公爵兽"),
        evolvesTo: [],
        evolvesFrom: [294, 292, 298]
    },
    {
        id: 375,
        name: "混沌龙兽",
        level: "究极体",
        image: getDigimonImagePath("混沌龙兽"),
        evolvesTo: [],
        evolvesFrom: [294, 272, 228]
    },
    {
        id: 376,
        name: "卡利斯兽",
        level: "究极体",
        image: getDigimonImagePath("卡利斯兽"),
        evolvesTo: [],
        evolvesFrom: [224, 207]
    },
    {
        id: 377,
        name: "枪龙兽",
        level: "究极体",
        image: getDigimonImagePath("枪龙兽"),
        evolvesTo: [],
        evolvesFrom: [270, 272, 257, 283]
    },
    {
        id: 378,
        name: "猿猴大王兽",
        level: "究极体",
        image: getDigimonImagePath("猿猴大王兽"),
        evolvesTo: [],
        evolvesFrom: [224, 268, 284]
    },
    {
        id: 379,
        name: "大德库拉兽",
        level: "究极体",
        image: getDigimonImagePath("大德库拉兽"),
        evolvesTo: [],
        evolvesFrom: [290, 235]
    },
    {
        id: 380,
        name: "时空兽DM",
        level: "究极体",
        image: getDigimonImagePath("时空兽DM"),
        evolvesTo: [],
        evolvesFrom: [195, 218]
    },
    {
        id: 381,
        name: "斩伐兽",
        level: "究极体",
        image: getDigimonImagePath("斩伐兽"),
        evolvesTo: [],
        evolvesFrom: [292, 248]
    },
    {
        id: 382,
        name: "僵尸普路托兽",
        level: "究极体",
        image: getDigimonImagePath("僵尸普路托兽"),
        evolvesTo: [],
        evolvesFrom: [397]
    },
    {
        id: 383,
        name: "暗龙兽",
        level: "究极体",
        image: getDigimonImagePath("暗龙兽"),
        evolvesTo: [432], // 混沌兽
        evolvesFrom: [303, 283, 472]
    },
    {
        id: 384,
        name: "虎蜂兽",
        level: "究极体",
        image: getDigimonImagePath("虎蜂兽"),
        evolvesTo: [],
        evolvesFrom: [302, 240, 211, 273]
    },
    {
        id: 385,
        name: "泰坦兽",
        level: "究极体",
        image: getDigimonImagePath("泰坦兽"),
        evolvesTo: [442], // 泰坦+骷髅巨犀兽
        evolvesFrom: [281, 243, 278]
    },
    {
        id: 386,
        name: "暴君比多兽",
        level: "究极体",
        image: getDigimonImagePath("暴君比多兽"),
        evolvesTo: [],
        evolvesFrom: [266, 198, 269]
    },
    {
        id: 387,
        name: "究极魔兽",
        level: "究极体",
        image: getDigimonImagePath("究极魔兽"),
        evolvesTo: [],
        evolvesFrom: [267, 298]
    },
    {
        id: 388,
        name: "公爵兽",
        level: "究极体",
        image: getDigimonImagePath("公爵兽"),
        evolvesTo: [443], // 公爵兽CM
        evolvesFrom: [294, 214]
    },
    {
        id: 389,
        name: "巴克科斯兽",
        level: "究极体",
        image: getDigimonImagePath("巴克科斯兽"),
        evolvesTo: [390], // 巴克科斯兽DM
        evolvesFrom: [270, 243, 284]
    },
    {
        id: 390,
        name: "巴克科斯兽DM",
        level: "究极体",
        image: getDigimonImagePath("巴克科斯兽DM"),
        evolvesTo: [],
        evolvesFrom: [389]
    },
    {
        id: 391,
        name: "巴尔巴兽",
        level: "究极体",
        image: getDigimonImagePath("巴尔巴兽"),
        evolvesTo: [],
        evolvesFrom: [279, 276]
    },
    {
        id: 392,
        name: "小丑兽",
        level: "究极体",
        image: getDigimonImagePath("小丑兽"),
        evolvesTo: [450], // 启示录兽
        evolvesFrom: [279, 286]
    },
    {
        id: 393,
        name: "木偶兽",
        level: "究极体",
        image: getDigimonImagePath("木偶兽"),
        evolvesTo: [],
        evolvesFrom: [262, 276, 277]
    },
    {
        id: 394,
        name: "法老兽",
        level: "究极体",
        image: getDigimonImagePath("法老兽"),
        evolvesTo: [],
        evolvesFrom: [288, 291, 285]
    },
    {
        id: 395,
        name: "河豚兽",
        level: "究极体",
        image: getDigimonImagePath("河豚兽"),
        evolvesTo: [],
        evolvesFrom: [284, 259, 230]
    },
    {
        id: 396,
        name: "白金鼻涕兽",
        level: "究极体",
        image: getDigimonImagePath("白金鼻涕兽"),
        evolvesTo: [],
        evolvesFrom: [252, 236, 245, 287]
    },
    {
        id: 397,
        name: "普路托兽",
        level: "究极体",
        image: getDigimonImagePath("普路托兽"),
        evolvesTo: [382], // 僵尸普路托兽
        evolvesFrom: [208, 209, 265]
    },
    {
        id: 398,
        name: "破坏龙兽",
        level: "究极体",
        image: getDigimonImagePath("破坏龙兽"),
        evolvesTo: [439], // 艾可萨兽
        evolvesFrom: [246, 274]
    },
    {
        id: 399,
        name: "贝利亚吸血魔兽",
        level: "究极体",
        image: getDigimonImagePath("贝利亚吸血魔兽"),
        evolvesTo: [],
        evolvesFrom: [267, 304]
    },
    {
        id: 400,
        name: "贝尔斯塔兽",
        level: "究极体",
        image: getDigimonImagePath("贝尔斯塔兽"),
        evolvesTo: [],
        evolvesFrom: [297, 281, 301]
    },
    {
        id: 401,
        name: "别西卜兽",
        level: "究极体",
        image: getDigimonImagePath("别西卜兽"),
        evolvesTo: [444], // 别西卜兽BM
        evolvesFrom: [265, 244]
    },
    {
        id: 402,
        name: "贝尔菲兽SM",
        level: "究极体",
        image: getDigimonImagePath("贝尔菲兽SM"),
        evolvesTo: [445], // 贝尔菲兽RM
        evolvesFrom: [202, 265, 286]
    },
    {
        id: 403,
        name: "玛格纳基德兽",
        level: "究极体",
        image: getDigimonImagePath("玛格纳基德兽"),
        evolvesTo: [],
        evolvesFrom: [226, 261, 234]
    },
    {
        id: 404,
        name: "密涅瓦兽",
        level: "究极体",
        image: getDigimonImagePath("密涅瓦兽"),
        evolvesTo: [446], // 梅尔瓦兽
        evolvesFrom: [270, 301]
    },
    {
        id: 405,
        name: "千年兽",
        level: "究极体",
        image: getDigimonImagePath("千年兽"),
        evolvesTo: [],
        evolvesFrom: [406, 235]
    },
    {
        id: 406,
        name: "无限龙兽",
        level: "究极体",
        image: getDigimonImagePath("无限龙兽"),
        evolvesTo: [405], // 千年兽
        evolvesFrom: [235, 293, 295]
    },
    {
        id: 407,
        name: "灭世龙兽",
        level: "究极体",
        image: getDigimonImagePath("灭世龙兽"),
        evolvesTo: [],
        evolvesFrom: [299, 294, 274, 293]
    },
    {
        id: 408,
        name: "金属猿猴兽",
        level: "究极体",
        image: getDigimonImagePath("金属猿猴兽"),
        evolvesTo: [],
        evolvesFrom: [268, 271, 287, 233]
    },
    {
        id: 409,
        name: "墨丘利兽",
        level: "究极体",
        image: getDigimonImagePath("墨丘利兽"),
        evolvesTo: [],
        evolvesFrom: [250, 229]
    },
    {
        id: 410,
        name: "朱诺兽",
        level: "究极体",
        image: getDigimonImagePath("朱诺兽"),
        evolvesTo: [411], // 朱诺兽HM
        evolvesFrom: [203, 300]
    },
    {
        id: 411,
        name: "朱诺兽HM",
        level: "究极体",
        image: getDigimonImagePath("朱诺兽HM"),
        evolvesTo: [],
        evolvesFrom: [410]
    },
    {
        id: 412,
        name: "终极巨龙兽",
        level: "究极体",
        image: getDigimonImagePath("终极巨龙兽"),
        evolvesTo: [],
        evolvesFrom: [202, 295, 255]
    },
    {
        id: 413,
        name: "利维亚兽",
        level: "究极体",
        image: getDigimonImagePath("利维亚兽"),
        evolvesTo: [],
        evolvesFrom: [220, 299, 280]
    },
    {
        id: 414,
        name: "莉莉丝兽",
        level: "究极体",
        image: getDigimonImagePath("莉莉丝兽"),
        evolvesTo: [],
        evolvesFrom: [262, 297, 266]
    },
    {
        id: 415,
        name: "领主骑士兽",
        level: "究极体",
        image: getDigimonImagePath("领主骑士兽"),
        evolvesTo: [],
        evolvesFrom: [237, 248]
    },
    {
        id: 416,
        name: "帝皇龙甲兽DM",
        level: "究极体",
        image: getDigimonImagePath("帝皇龙甲兽DM"),
        evolvesTo: [417, 429], // 帝皇龙甲兽FM, 帝皇龙甲兽PM
        evolvesFrom: [303]
    },
    {
        id: 417,
        name: "帝皇龙甲兽FM",
        level: "究极体",
        image: getDigimonImagePath("帝皇龙甲兽FM"),
        evolvesTo: [429], // 帝皇龙甲兽PM
        evolvesFrom: [416]
    },
    {
        id: 418,
        name: "维京兽",
        level: "究极体",
        image: getDigimonImagePath("维京兽"),
        evolvesTo: [],
        evolvesFrom: [212, 222, 300]
    },
    {
        id: 419,
        name: "瓦尔基里兽",
        level: "究极体",
        image: getDigimonImagePath("瓦尔基里兽"),
        evolvesTo: [],
        evolvesFrom: [213, 301]
    },
    {
        id: 420,
        name: "巨大古加兽",
        level: "究极体",
        image: getDigimonImagePath("巨大古加兽"),
        evolvesTo: [],
        evolvesFrom: [302, 277, 269]
    },
    {
        id: 421,
        name: "超恶魔兽",
        level: "究极体",
        image: getDigimonImagePath("超恶魔兽"),
        evolvesTo: [448], // 灭世魔兽
        evolvesFrom: [285]
    },
    {
        id: 422,
        name: "拉比兽装甲体",
        level: "⑥装甲体",
        image: getDigimonImagePath("拉比兽装甲体"),
        evolvesTo: [],
        evolvesFrom: [27]
    },
    {
        id: 423,
        name: "金甲龙兽",
        level: "⑥装甲体",
        image: getDigimonImagePath("金甲龙兽"),
        evolvesTo: [],
        evolvesFrom: [77]
    },
    {
        id: 424,
        name: "凯撒暴龙兽",
        level: "混合体",
        image: getDigimonImagePath("凯撒暴龙兽"),
        evolvesTo: [436], // 须佐之男兽
        evolvesFrom: [305]
    },
    {
        id: 425,
        name: "盔甲加鲁鲁兽",
        level: "混合体",
        image: getDigimonImagePath("盔甲加鲁鲁兽"),
        evolvesTo: [436, 426], // 须佐之男兽, 盔甲加鲁鲁兽分离
        evolvesFrom: [306]
    },
    {
        id: 426,
        name: "盔甲加鲁鲁兽分离",
        level: "混合体",
        image: getDigimonImagePath("盔甲加鲁鲁兽分离"),
        evolvesTo: [],
        evolvesFrom: [425]
    },
    {
        id: 427,
        name: "阿尔法兽王龙剑",
        level: "超究极体",
        image: getDigimonImagePath("阿尔法兽王龙剑"),
        evolvesTo: [],
        evolvesFrom: [313, 308]
    },
    {
        id: 428,
        name: "颅骨兽+暗马兽",
        level: "超究极体",
        image: getDigimonImagePath("颅骨兽+暗马兽"),
        evolvesTo: [],
        evolvesFrom: [316, 231]
    },
    {
        id: 429,
        name: "帝皇龙甲兽PM",
        level: "超究极体",
        image: getDigimonImagePath("帝皇龙甲兽PM"),
        evolvesTo: [],
        evolvesFrom: [417, 416]
    },
    {
        id: 430,
        name: "奥米加兽",
        level: "超究极体",
        image: getDigimonImagePath("奥米加兽"),
        evolvesTo: [431], // 奥米加兽兹瓦特
        evolvesFrom: [312, 364]
    },
    {
        id: 431,
        name: "奥米加兽兹瓦特",
        level: "超究极体",
        image: getDigimonImagePath("奥米加兽兹瓦特"),
        evolvesTo: [430], // 奥米加兽
        evolvesFrom: [474, 475]
    },
    {
        id: 432,
        name: "混沌兽",
        level: "超究极体",
        image: getDigimonImagePath("混沌兽"),
        evolvesTo: [],
        evolvesFrom: [333, 383]
    },
    {
        id: 433,
        name: "混沌兽瓦尔德臂",
        level: "超究极体",
        image: getDigimonImagePath("混沌兽瓦尔德臂"),
        evolvesTo: [],
        evolvesFrom: [310, 432]
    },
    {
        id: 434,
        name: "优雅新星兽",
        level: "超究极体",
        image: getDigimonImagePath("优雅新星兽"),
        evolvesTo: [],
        evolvesFrom: [307, 354]
    },
    {
        id: 435,
        name: "闪光暴龙兽BM",
        level: "超究极体",
        image: getDigimonImagePath("闪光暴龙兽BM"),
        evolvesTo: [],
        evolvesFrom: [322]
    },
    {
        id: 436,
        name: "须佐之男兽",
        level: "超究极体",
        image: getDigimonImagePath("须佐之男兽"),
        evolvesTo: [],
        evolvesFrom: [424, 425]
    },
    {
        id: 437,
        name: "朱庇特兽WM",
        level: "超究极体",
        image: getDigimonImagePath("朱庇特兽WM"),
        evolvesTo: [],
        evolvesFrom: [340]
    },
    {
        id: 438,
        name: "渡鸦兽BM",
        level: "超究极体",
        image: getDigimonImagePath("渡鸦兽BM"),
        evolvesTo: [],
        evolvesFrom: [341]
    },
    {
        id: 439,
        name: "艾可萨兽",
        level: "超究极体",
        image: getDigimonImagePath("艾可萨兽"),
        evolvesTo: [],
        evolvesFrom: [327, 398]
    },
    {
        id: 440,
        name: "幻影加奥加兽BM",
        level: "超究极体",
        image: getDigimonImagePath("幻影加奥加兽BM"),
        evolvesTo: [],
        evolvesFrom: [363]
    },
    {
        id: 441,
        name: "蔷薇兽BM",
        level: "超究极体",
        image: getDigimonImagePath("蔷薇兽BM"),
        evolvesTo: [],
        evolvesFrom: [367]
    },
    {
        id: 442,
        name: "泰坦+骷髅巨犀兽",
        level: "超究极体",
        image: getDigimonImagePath("泰坦+骷髅巨犀兽"),
        evolvesTo: [],
        evolvesFrom: [239, 385]
    },
    {
        id: 443,
        name: "公爵兽CM",
        level: "超究极体",
        image: getDigimonImagePath("公爵兽CM"),
        evolvesTo: [],
        evolvesFrom: [388]
    },
    {
        id: 444,
        name: "别西卜兽BM",
        level: "超究极体",
        image: getDigimonImagePath("别西卜兽BM"),
        evolvesTo: [],
        evolvesFrom: [401]
    },
    {
        id: 445,
        name: "贝尔菲兽RM",
        level: "超究极体",
        image: getDigimonImagePath("贝尔菲兽RM"),
        evolvesTo: [],
        evolvesFrom: [402]
    },
    {
        id: 446,
        name: "梅尔瓦兽",
        level: "超究极体",
        image: getDigimonImagePath("梅尔瓦兽"),
        evolvesTo: [],
        evolvesFrom: [404]
    },
    {
        id: 447,
        name: "光明兽SM",
        level: "超究极体",
        image: getDigimonImagePath("光明兽SM"),
        evolvesTo: [],
        evolvesFrom: [296]
    },
    {
        id: 448,
        name: "灭世魔兽",
        level: "超究极体",
        image: getDigimonImagePath("灭世魔兽"),
        evolvesTo: [],
        evolvesFrom: [421]
    },
    {
        id: 449,
        name: "亚古兽勇气纽带",
        level: "超究极体",
        image: getDigimonImagePath("亚古兽勇气纽带"),
        evolvesTo: [],
        evolvesFrom: [21]
    },
    {
        id: 450,
        name: "启示录兽",
        level: "超究极体",
        image: getDigimonImagePath("启示录兽"),
        evolvesTo: [],
        evolvesFrom: [392]
    },
    {
        id: 451,
        name: "加布兽勇气纽带",
        level: "超究极体",
        image: getDigimonImagePath("加布兽勇气纽带"),
        evolvesTo: [],
        evolvesFrom: [43]
    },
    {
        id: 468,
        name: "亚古兽黑",
        level: "成长期",
        image: getDigimonImagePath("亚古兽黑"),
        evolvesTo: [93, 155, 156, 91, 471], // 强袭龙兽, 长牙兽, 恶魔兽, 核龙兽蓝, 暴龙兽蓝
        evolvesFrom: [12]
    },
    {
        id: 469,
        name: "加布兽黑",
        level: "成长期",
        image: getDigimonImagePath("加布兽黑"),
        evolvesTo: [168, 98, 132, 163, 470], // 牛人兽, 黑暗迪路兽, 杜宾犬兽, 多路加兽, 风灾兽, 加鲁鲁兽黑
        evolvesFrom: [12]
    },
    {
        id: 470,
        name: "加鲁鲁兽黑",
        level: "成熟期",
        image: getDigimonImagePath("加鲁鲁兽黑"),
        evolvesTo: [279, 250, 473], // 骷髅撒旦兽, 熊猫兽, 狼人加鲁鲁兽黑
        evolvesFrom: [469, 58, 35]
    },
    {
        id: 471,
        name: "暴龙兽蓝",
        level: "成熟期",
        image: getDigimonImagePath("暴龙兽蓝"),
        evolvesTo: [200, 239, 472], // 翼龙兽, 骷髅巨犀兽, 机械暴龙兽蓝
        evolvesFrom: [468, 64, 72]
    },
    {
        id: 472,
        name: "机械暴龙兽蓝",
        level: "完全体",
        image: getDigimonImagePath("机械暴龙兽蓝"),
        evolvesTo: [474, 383, 319], // 黑暗战斗暴龙兽, 暗龙兽, 智天使兽恶
        evolvesFrom: [471, 132, 101]
    },
    {
        id: 473,
        name: "狼人加鲁鲁兽黑",
        level: "完全体",
        image: getDigimonImagePath("狼人加鲁鲁兽黑"),
        evolvesTo: [359, 475], // 摔跤火山兽, 钢铁加鲁鲁兽黑
        evolvesFrom: [470, 153]
    },
    {
        id: 474,
        name: "黑暗战斗暴龙兽",
        level: "究极体",
        image: getDigimonImagePath("黑暗战斗暴龙兽"),
        evolvesTo: [431], // 奥米加兽兹瓦特
        evolvesFrom: [472, 219]
    },
    {
        id: 475,
        name: "钢铁加鲁鲁兽黑",
        level: "究极体",
        image: getDigimonImagePath("钢铁加鲁鲁兽黑"),
        evolvesTo: [431], // 奥米加兽兹瓦特
        evolvesFrom: [473, 236, 208, 209]
    }
];

// 创建数码宝贝索引映射
const digimonMap = new Map();
digimonData.forEach(digimon => {
    digimonMap.set(digimon.id, digimon);
});

// 导出数据供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { digimonData, digimonMap };
}