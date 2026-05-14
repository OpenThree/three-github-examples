export default [
    {
        pid: 'threeMap',
        name: '三维地图',
        name_en: 'Three Map',
        gid: 'commonSeries',
        group: '常用系列',
        group_en: 'Common Series',
        order: 30,
        children: [
            {
                id: 'paintCar',
                name: '汽车911',
                name_en: 'Car Paint',
                author: 'AUTO',
                openUrl: 'https://faraz-portfolio.github.io/demo-2025-car-paint/',
                githubUrl: 'https://github.com/Faraz-Portfolio/demo-2025-car-paint',
                image: 'https://z2586300277.github.io/three-cesium-examples/' + 'threeExamples/openSource/paintCar.jpg',
            },

        ]
    },
    {
        pid: 'threeCar',
        name: '汽车相关',
        name_en: 'Car Related',
        gid: 'commonSeries',
        group: '常用系列',
        group_en: 'Common Series',
        order: 30,
        children: [


            {
                id: 'carShowReact',
                name: '汽车展示',
                name_en: 'Car Show(React)',
                author: 'AUTO',
                openUrl: 'https://nik-car-show.netlify.app/',
                githubUrl: 'https://github.com/n1k02/three-js-projects',
                image: 'https://z2586300277.github.io/three-cesium-examples/' + 'threeExamples/openSource/carShowReact.jpg',
            }
        ]
    },
    {
        pid: 'threeEarth',
        name: '三维地球',
        name_en: 'Three Earth',
        children: [
            {
                id: 'tslScifiEarth',
                name: '科幻地球',
                name_en: 'Sci-fi Earth',
                author: 'AUTO',
                openUrl: 'https://tsl-scifi-earth.vercel.app/',
                githubUrl: 'https://github.com/hexianWeb/tsl-scifi-earth',
                image: 'https://raw.githubusercontent.com/hexianWeb/tsl-scifi-earth/tsl-earth-publish/docs/preview.png'
            }

        ]

    }
]