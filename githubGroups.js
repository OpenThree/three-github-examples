const HOST = new URL('.', import.meta.url).href

export default [

]

// HOST 自动获取 当前域名/ip 防止部署环境不同 资源引用失效
// {
//     id: '列表唯一id',
//     name: '名称',
//     name_en: '英文名',
//     tag: '标签名字-背景颜色-字体大小',
//     tip: '提示信息',
//     author: '作者id',
//     referUrl: '案例参考来源地址', // 如 没有可不配置
//     downloadUrl: '附带下载的url', // 如three.js => 高级案例 => 桃花亭 配置后refer将不显示
//     imporver: '优化作者', // 优化作者的id
//     links: [{ url: '连接', name: '名称' }] //配置link imporver 将不显示
//     image: HOST + 'threeExamples/basic/test.jpg', // 对应窗口图
//     codeUrl: HOST + 'threeExamples/basic/test.js', // js module格式 大多数案例形式
//     htmlUrl: HOST + 'threeExamples/test/test.html' // html 在线格式 如 three案例 => 粒子 => 随机粒子 粒子行星
//     openUrl: '预览外联地址url', // openurl 和 codeurl 为二选一形式 如 可见桃花亭 su7 案例
//     githubUrl: '附带github 仓库的url', // 如 three.js => 开源作品 => su7
//     meta: {
//         title: '此案例网站标题',
//         keywords: '搜索引擎关键字',
//         description: '此案例页面描述'
//     }
// }