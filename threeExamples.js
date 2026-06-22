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
        ]
    }
]