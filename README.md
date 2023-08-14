## 信号哨兵长时检测系统

用于展示通讯设备实时数据、图表、告警信息等。

[接口文档地址](http://58.48.76.202:18800/doc.html#/home)

## 安装

进入项目所在目录，使用 pnpm 安装

```bash
pnpm install
```

## 运行

```bash
pnpm dev
```

目前 HTTP 接口不支持跨域访问，所有 HTTP 请求使用 node 后端创建 HttpClient 访问。

后端数据推送基于 [SSE](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource) 技术，代码位置：`/src/utility/sse.ts`

## 命令说明

| 命令            | 说明     |
| --------------- | -------- |
| `pnpm run dev`  | 开发     |
| `pnpm run dist` | 生产打包 |

## 测试用户

admin/111111
