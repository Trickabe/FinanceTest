# 青财智管 Demo

青财智管是一套面向大学生与初入职场青年的智能成长型金融服务平台 demo。项目以 React + TypeScript + Tailwind CSS 搭建，使用模拟数据、规则引擎和 localStorage 持久化来演示个性化预算管理、储蓄规划、理财建议、风险提示和金融知识学习等能力。

## 特性

- 用户仪表盘：资产总览、月度收支、储蓄进度、消费趋势和智能建议。
- 资产管理：预算管理、储蓄目标、模拟理财产品与风险画像。
- AI 财富管家：基于规则引擎的对话式建议与风险提示。
- 风险控制中枢：现金流压力、信用占用和借贷支出占比可视化。
- 金融学习中心：知识路径、模拟实验室、情景任务和小测验。
- 青年成长账户：信用成长积分、行为成就和成长轨迹。
- 本地持久化：预算、聊天记录、学习进度与 Demo 状态都会保存在 localStorage。

## 技术栈

- React + TypeScript
- Tailwind CSS
- React Router
- Recharts

## 运行方式

1. 安装依赖：`npm install`
2. 启动开发环境：`npm run dev`
3. 打包生产版本：`npm run build`
4. 本地预览构建结果：`npm run preview`

## GitHub Pages 发布

这个项目已经准备好直接部署到 GitHub Pages。

1. 把仓库推送到 GitHub，仓库名为 `FinanceTest`。
2. 在 GitHub 仓库设置里打开 Pages。
3. 选择 `GitHub Actions` 作为发布来源。
4. 推送到 `main` 分支，或者在 Actions 里手动触发 `Deploy to GitHub Pages`。

部署完成后，页面通常会出现在 `https://你的用户名.github.io/FinanceTest/`。

## 演示说明

- 首次打开会看到简化登录页，点击“进入 Demo 空间”即可体验完整平台。
- 在 AI 财富管家页面可以输入问题，例如“如何开始投资？”或“本月餐饮超支怎么办？”。
- 风险提示会根据模拟消费数据自动触发，支持一键关闭。
- 学习中心可查看主题路径并模拟完成小测验，成长账户会同步积分与成就。

## 目录结构

- `src/components`：通用 UI 组件
- `src/data`：模拟用户数据
- `src/pages`：核心页面
- `src/utils`：规则引擎与持久化工具
- `src/store`：React Context 状态管理

## 后续扩展

这个 demo 预留了后端接入空间，后续可以方便替换为 .NET 或其他服务端方案。
