
const personalityQuadrants = [
    {
        id: 'top-left',
        title: '博爱',
        titlePosition: 'top',
        traits: [
            { index: '1', name: '慈爱', stats: ['精神', '防御力'] },
            { index: '2', name: '牺牲奉献', stats: ['精神', '智力'] },
            { index: '3', name: '包容力', stats: ['精神', 'SP'] },
            { index: '4', name: '过度保护', stats: ['精神', 'HP'] }
        ]
    },
    {
        id: 'top-right',
        title: '勇猛',
        titlePosition: 'top',
        traits: [
            { index: '5', name: '热血', stats: ['攻击力', '敏捷'] },
            { index: '6', name: '勇敢', stats: ['攻击力', 'SP'] },
            { index: '7', name: '匹夫之勇', stats: ['攻击力', 'HP'] },
            { index: '8', name: '胆识非凡', stats: ['攻击力', '防御力'] }
        ]
    },
    {
        id: 'bottom-left',
        title: '知启',
        titlePosition: 'bottom',
        traits: [
            { index: '9', name: '天启', stats: ['智力', 'SP'] },
            { index: '10', name: '坏点子', stats: ['智力', 'HP'] },
            { index: '11', name: '聪颖', stats: ['智力', '敏捷'] },
            { index: '12', name: '战略家', stats: ['智力', '精神'] }
        ]
    },
    {
        id: 'bottom-right',
        title: '友好',
        titlePosition: 'bottom',
        traits: [
            { index: '13', name: '投机分子', stats: ['防御力', '精神'] },
            { index: '14', name: '和蔼可亲', stats: ['防御力', '攻击力'] },
            { index: '15', name: '善于社交', stats: ['防御力', 'SP'] },
            { index: '16', name: '饶富人情味', stats: ['防御力', 'HP'] }
        ]
    }
];

function renderPersonalityChart() {
    const root = document.getElementById('personalityChart');
    if (!root) return;

    root.innerHTML = '';

    const chart = document.createElement('div');
    chart.className = 'personality-chart';
    root.appendChild(chart);

    const verticalAxis = document.createElement('div');
    verticalAxis.className = 'axis axis-vertical';
    chart.appendChild(verticalAxis);

    const horizontalAxis = document.createElement('div');
    horizontalAxis.className = 'axis axis-horizontal';
    chart.appendChild(horizontalAxis);

    const axisLabels = [
        { direction: 'up', label: '爱' },
        { direction: 'down', label: '友' },
        { direction: 'left', label: '头脑' },
        { direction: 'right', label: '心' }
    ];

    axisLabels.forEach(({ direction, label }) => {
        const axisEnd = document.createElement('div');
        axisEnd.className = `axis-end axis-${direction}`;

        const arrowSpan = document.createElement('span');
        arrowSpan.className = `axis-arrow axis-arrow-${direction}`;

        const labelSpan = document.createElement('span');
        labelSpan.className = 'axis-text';
        labelSpan.textContent = label;

        axisEnd.appendChild(arrowSpan);
        axisEnd.appendChild(labelSpan);

        chart.appendChild(axisEnd);
    });

    personalityQuadrants.forEach(quadrantData => {
        const quadrant = document.createElement('div');
        quadrant.className = `quadrant quadrant-${quadrantData.id}`;

        const title = document.createElement('div');
        title.className = `quadrant-title quadrant-title-${quadrantData.titlePosition}`;
        title.textContent = quadrantData.title;

        const table = document.createElement('div');
        table.className = 'trait-table';

        quadrantData.traits.forEach(trait => {
            const cell = document.createElement('div');
            cell.className = 'trait-cell';

            const index = document.createElement('span');
            index.className = 'trait-index';
            index.textContent = trait.index;

            const name = document.createElement('div');
            name.className = 'trait-name';
            name.textContent = trait.name;

            const stats = document.createElement('div');
            stats.className = 'trait-stats';

            trait.stats.forEach(stat => {
                const statSpan = document.createElement('span');
                statSpan.textContent = stat;
                stats.appendChild(statSpan);
            });

            cell.appendChild(index);
            cell.appendChild(name);
            cell.appendChild(stats);
            table.appendChild(cell);
        });

        if (quadrantData.titlePosition === 'bottom') {
            quadrant.appendChild(table);
            quadrant.appendChild(title);
        } else {
            quadrant.appendChild(title);
            quadrant.appendChild(table);
        }

        chart.appendChild(quadrant);
    });
}