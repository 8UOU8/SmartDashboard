# 信息面板 (Personal Dashboard)

这是一个轻量级的、无需后端、可本地运行的个人信息面板网页。它被设计用来在像旧款 iPad 这样的设备上全屏运行，作为一个信息中心或动态数字相框。

## ✨ 功能特性

- **纯前端实现**: 无需编译或后端服务器，下载后可直接在浏览器中本地运行。
- **全屏背景轮播**: 支持用户上传一张或多张本地图片作为背景，并进行淡入淡出轮播，实现动态数字相框效果。
- **集成信息组件**: 一个悬浮于屏幕底部的多功能组件，整合了时钟和天气信息，最大化背景可视区域。
- **实时时钟**: 在天气组件中实时显示当前日期、星期和精确到秒的时间。
- **强大的天气模块**: 
    - **固定地点**: 天气数据固定为丹麦哥本哈根。
    - **当前实况**: 显示当前天气图标、温度、风向和风速 (m/s)。
    - **三日预报**: 简洁地展示未来三天的天气趋势（天气图标、最高/最低温度）。
    - **可交互的小时预报**: 
        - 点击天气组件可**展开/收起**详细的小时预报视图。
        - 小时预报显示从**当前小时开始的未来8小时**的滚动数据。
        - 每小时的预报都包含天气图标、温度、风向箭头和风速。

## 🚀 如何使用

1.  确保 `dashboard.html`, `dashboard.css`, 和 `dashboard.js` 三个文件在同一个文件夹内。
2.  在现代网页浏览器 (如 Chrome, Firefox, Safari) 中打开 `dashboard.html` 文件。
3.  点击右下角的 `+` 按钮上传您自己的背景图片。
4.  点击天气组件区域可展开或收起小时预报。

## 🛠️ 技术栈

- **HTML5**
- **CSS3**: Flexbox, Grid, Transitions, Animations, `backdrop-filter`
- **原生 JavaScript (ES6+)**: `fetch` API, `File` API, `URL.createObjectURL`

---

# Personal Dashboard (English Version)

A lightweight, serverless, locally-run personal dashboard webpage. It is designed to run full-screen on devices like an old iPad, serving as an information hub or a dynamic digital picture frame.

## ✨ Features

- **Pure Frontend**: No build process or backend server required. Runs locally in any modern browser right after download.
- **Full-Screen Background Slideshow**: Allows users to upload one or more local images to be used as a background slideshow with a fade-in/fade-out effect, acting as a digital picture frame.
- **Integrated Info Widget**: A single, floating multi-function widget at the bottom of the screen that combines the clock and weather, maximizing the visible area for the background images.
- **Real-time Clock**: Displays the current date, day of the week, and time (down to the second) within the weather widget.
- **Powerful Weather Module**:
    - **Fixed Location**: Weather data is hardcoded for Copenhagen, Denmark.
    - **Current Conditions**: Shows the current weather icon, temperature, wind direction, and wind speed (in m/s).
    - **3-Day Forecast**: Cleanly displays the weather trend for the next three days (icon, max/min temperature).
    - **Interactive Hourly Forecast**:
        - The weather widget can be **clicked to expand/collapse** a detailed hourly forecast view.
        - The hourly forecast displays a **rolling 8-hour window** starting from the current hour.
        - Each hourly item includes the weather icon, temperature, a rotated wind-direction arrow, and wind speed.

## 🚀 How to Use

1.  Ensure the three files (`dashboard.html`, `dashboard.css`, and `dashboard.js`) are in the same folder.
2.  Open the `dashboard.html` file in a modern web browser (e.g., Chrome, Firefox, Safari).
3.  Click the `+` button in the bottom-right corner to upload your own background images.
4.  Click the weather widget area to expand or collapse the hourly forecast.

## 🛠️ Technology Stack

- **HTML5**
- **CSS3**: Flexbox, Grid, Transitions, Animations, `backdrop-filter`
- **Vanilla JavaScript (ES6+)**: `fetch` API, `File` API, `URL.createObjectURL`