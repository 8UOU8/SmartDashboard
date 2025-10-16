# 信息面板 (Personal Dashboard)

**线上访问地址: [https://display.8uou8.com/dashboard.html](https://display.8uou8.com/dashboard.html)**

一个基于原生JavaScript (ES5) 的轻量级个人信息面板，旨在将旧平板电脑（如第一代iPad mini）改造为集电子相册、时钟和天气预报于一体的墙面信息中心。

项目无需后端、可完全在本地运行，专为性能不足的旧设备和老版本浏览器（如 iOS 9）优化，是您改造闲置电子设备（kiosk、数字标牌等）的理想选择。

## ✨ 功能特性

- **变废为宝**: 专为旧设备和老版本浏览器优化，让您闲置的旧平板重新焕发价值。
- **全屏电子相册**: 支持用户上传一张或多张本地图片作为背景，并进行淡入淡出轮播。
- **集成信息组件**: 一个悬浮于屏幕底部的多功能组件，整合了时钟和天气信息。
- **实时时钟**: 实时显示当前日期、星期和精确到秒的时间。
- **天气模块**: 
    - **固定地点**: 天气数据固定为丹麦哥本哈根。
    - **当前实况**: 显示当前天气、温度、风向和风速 (m/s)。
    - **三日预报**: 简洁地展示未来三天的天气趋势。
    - **可交互的小时预报**: 点击可展开/收起从当前小时开始的未来8小时的滚动预报。

## 🚀 如何使用

1.  在您的设备（尤其是旧 iPad）的浏览器中，直接访问线上地址： **[https://display.8uou8.com/dashboard.html](https://display.8uou8.com/dashboard.html)**
2.  点击右下角的 `+` 按钮上传您自己的照片。
3.  点击天气组件区域可展开或收起小时预报。
3.  **推荐**: 使用浏览器的“添加到主屏幕”功能，将此页面在桌面上生成一个图标，方便日后像 App 一样直接打开。

## 兼容性说明

本项目为了能成功运行在第一代 iPad mini (iOS 9.3.5) 等极端老旧的设备上，进行了深度的兼容性改造：

- **代码标准**: 整体 JavaScript 代码已用 ES5 标准重写，替换了所有现代浏览器中的新语法（如 `fetch`, `let`, `const`, `=>` 等）。
- **CSS 兼容**: 移除了 `backdrop-filter` 等性能敏感的特效，并为 Flexbox 布局添加了 `-webkit-` 前缀以兼容旧版 Safari。
- **功能权衡**: 项目曾尝试加入根据设备方向自动切换布局的功能，但测试证明该功能对旧设备负担过重，会导致脚本崩溃。因此，**该功能已被移除**，以保证核心功能的稳定运行。

## 🛠️ 技术栈

- **HTML5**
- **CSS3**: Flexbox (带 `-webkit-` 前缀), Transitions
- **原生 JavaScript (ES5)**: `XMLHttpRequest`

## 未来计划 (Roadmap)

- **用户自定义位置**: 新增“定位”功能，允许用户授权浏览器获取当前位置，并自动加载当地的天气状况。位置信息将被本地保存，无需重复设置。

---

# Personal Dashboard (English Version)

**Live Demo: [https://display.8uou8.com/dashboard.html](https://display.8uou8.com/dashboard.html)**

A lightweight personal dashboard built with vanilla JavaScript (ES5), designed to upcycle old tablets (like the original iPad mini) into a wall-mounted information hub with a digital photo frame, clock, and weather forecast.

This serverless project runs entirely on the client-side and is optimized for underpowered legacy devices and old browsers (like iOS 9), making it an ideal choice for repurposing e-waste into a kiosk, digital sign, or personal display.

## ✨ Features

- **Upcycle Old Devices**: Specifically optimized for legacy devices and old browsers, giving your idle tablets a new life.
- **Full-Screen Photo Frame**: Allows users to upload one or more local images to be used as a background slideshow with a fade effect.
- **Integrated Info Widget**: A single, floating multi-function widget at the bottom of the screen that combines the clock and weather.
- **Real-time Clock**: Displays the current date, day of the week, and time (down to the second).
- **Weather Module**:
    - **Fixed Location**: Weather data is hardcoded for Copenhagen, Denmark.
    - **Current Conditions**: Shows the current weather icon, temperature, wind direction, and wind speed (in m/s).
    - **3-Day Forecast**: Cleanly displays the weather trend for the next three days.
    - **Interactive Hourly Forecast**: Can be clicked to expand/collapse a rolling 8-hour forecast starting from the current hour.

## 🚀 How to Use

1.  On your device (especially an old iPad), open a browser and go to the live URL: **[https://display.8uou8.com/dashboard.html](https://display.8uou8.com/dashboard.html)**
2.  Click the `+` button in the bottom-right corner to upload your own photos.
3.  Click the weather widget area to expand or. collapse the hourly forecast.
3.  **Recommended**: Use the browser's "Add to Home Screen" feature to create a shortcut on your desktop, allowing you to launch it like a native app.

## Compatibility Notes

To successfully run on extremely old devices like the original iPad mini (iOS 9.3.5), this project underwent a deep compatibility refactoring:

- **Code Standard**: The entire JavaScript codebase has been rewritten in ES5, replacing all modern syntax (e.g., `fetch`, `let`, `const`, `=>`).
- **CSS Compatibility**: Performance-sensitive effects like `backdrop-filter` were removed, and `-webkit-` prefixes were added to Flexbox properties for legacy Safari compatibility.
- **Feature Trade-offs**: A feature to automatically switch layouts based on device orientation was attempted. However, testing proved this feature was too demanding for older devices and caused script crashes. Therefore, **this feature has been removed** to ensure the stability of core functionalities.

## 🛠️ Technology Stack

- **HTML5**
- **CSS3**: Flexbox (with `-webkit-` prefixes), Transitions
- **Vanilla JavaScript (ES5)**: `XMLHttpRequest`

## Roadmap

- **User-Defined Location**: A new "Locate Me" feature is planned to allow users to grant permission for the browser to get their current location and automatically load local weather conditions. The location will be saved locally for future visits.