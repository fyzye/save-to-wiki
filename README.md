# 前端资讯收集工具

## 项目结构说明

由三个部分组成，

- 静态的博客系统
  - 由 (vuepress)[https://vuepress.vuejs.org/zh/guide/] 搭建而成
  - 放置收集汇总的前端每周资源
- Chrome 扩展
  - 收集需要分享的网页资源（标题、链接、分享说明等）
- node脚本
  - 接收 chrome 扩展发送过来的网页资源信息，并生成文档，同步到静态博客系统中



## 快速启动

- 安装Chrome扩展
  - 打开chrome://extensions/，将根目录下的chrome-save-to-wiki.crx文件拖入扩展程序的面板即可安装
- 启动node脚本
- 启动静态博客系统



至此，这个前端资讯收集工具就可以放心食用啦～