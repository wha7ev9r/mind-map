const fs = require('fs')
const path = require('path')

const src = path.resolve(__dirname, './dist/index.html') 
const dest = path.resolve(__dirname, './index.html') 

if (fs.existsSync(dest)) {
    fs.unlinkSync(dest)
}

if (fs.existsSync(src)) {
    let html = fs.readFileSync(src, 'utf8')
    // 构建注入的脚本统一加 defer，与 head 中 defer 的 CDN 脚本按文档顺序执行
    html = html.replace(/<script src="dist\/js\/([^"]+)"/g, '<script src="dist/js/$1" defer')
    fs.writeFileSync(dest, html)
    fs.unlinkSync(src)
}

// console.warn('请检查付费插件是否启用！！！')