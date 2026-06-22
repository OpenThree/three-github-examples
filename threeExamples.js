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
        ]
    }
]