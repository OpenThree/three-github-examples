const HOST = (window.origin + window.location.pathname).replace(/\/index.html$/, '/')

export default [
    {
        pid: 'RecentlySubmitted',
        name: '最近提交',
        name_en: 'Recently Submitted',
        order: 0,
        children: [
{
                id: 'test',
                name: 'test',
                htmlUrl: HOST + 'three/test.html',
                image: HOST + 'three/test.webp',
            },
{
                id: 'wuliTest',
                name: 'wuliTest',
                codeUrl: HOST + 'three/wuliTest.js',
                image: HOST + 'three/wuliTest.webp',
            },
{
                id: 'shuiliu_kuan',
                name: '宽水流',
                name_en: 'shuiliu_kuan',
                codeUrl: HOST + 'three/shuiliu_kuan.js',
                image: HOST + 'three/shuiliu_kuan.webp',
            },
{
                id: 'octree',
                name: '八叉树',
                name_en: 'octree',
                codeUrl: HOST + 'three/octree.js',
                image: HOST + 'three/octree.webp',
            },
{
                id: 'rainday',
                name: '雷雨',
                name_en: 'rainday',
                codeUrl: HOST + 'three/rainday.js',
                image: HOST + 'three/rainday.webp',
            },
{
                id: 'DQuantum',
                name: '3D Quantum',
                name_en: '3D Quantum',
                htmlUrl: HOST + 'three/DQuantum.html',
                image: HOST + 'three/DQuantum.webp',
            },
{
                id: 'Singularity',
                name: 'Singularity',
                name_en: 'Singularity',
                htmlUrl: HOST + 'three/Singularity.html',
                image: HOST + 'three/Singularity.webp',
            },
            {
                id: 'VeryHotPlanet',
                name: 'VeryHotPlanet',
                name_en: 'VeryHotPlanet',
                htmlUrl: HOST + 'three/VeryHotPlanet.html',
                image: HOST + 'three/VeryHotPlanet.webp',
            },
        ]
    }
]