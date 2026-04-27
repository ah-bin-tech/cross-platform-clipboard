# Logo 使用指南

## 🎨 Logo 设计理念

为 Cross-Platform Clipboard 项目设计的 Logo 融合了以下元素：

- **剪贴板图标**: 核心功能象征
- **渐变色彩**: 蓝色到紫色的渐变，体现科技感和现代感
- **同步箭头**: 象征跨平台同步功能
- **Apple 风格**: 简洁、优雅、扁平化设计

## 📦 Logo 文件

### 主 Logo (带文字)
- **文件名**: `public/logo-main.svg`
- **尺寸**: 200x50px
- **用途**: 网站头部、宣传材料、文档

### 图标版本
- **文件名**: `public/logo-icon.svg`
- **尺寸**: 64x64px
- **用途**: 大图标显示、社交媒体头像

### 简化图标
- **文件名**: `public/logo-simple.svg`
- **尺寸**: 32x32px
- **用途**: 按钮图标、小尺寸显示

### Favicon
- **文件名**: `public/favicon.svg`
- **尺寸**: 32x32px
- **用途**: 浏览器标签页图标、书签图标

## 🎯 使用方法

### 1. 直接使用 SVG 文件

```html
<!-- 主 Logo -->
<img src="/logo-main.svg" alt="CrossPlatform Clipboard" width="200" height="50" />

<!-- 图标版本 -->
<img src="/logo-icon.svg" alt="CrossPlatform Clipboard" width="64" height="64" />

<!-- 简化图标 -->
<img src="/logo-simple.svg" alt="CrossPlatform Clipboard" width="32" height="32" />

<!-- Favicon -->
<link rel="icon" href="/favicon.svg" />
```

### 2. 使用 React 组件

```tsx
import { Logo } from "@/components/Logo";

// 使用简化图标（默认）
<Logo />

// 使用主 Logo
<Logo variant="main" />

// 使用图标版本
<Logo variant="icon" />

// 使用 favicon
<Logo variant="favicon" />

// 自定义大小
<Logo variant="simple" size={40} />

// 添加自定义类名
<Logo variant="icon" className="mb-4" />
```

### 3. 在 Next.js Image 组件中使用

```tsx
import Image from "next/image";

<Image
  src="/logo-main.svg"
  alt="CrossPlatform Clipboard Logo"
  width={200}
  height={50}
  priority
/>
```

## 🎨 设计规格

### 颜色方案

- **主渐变**: `#0071e3` (蓝色) → `#5856d6` (紫色)
- **白色**: `#ffffff`
- **浅灰色**: `#f5f5f7`
- **文本颜色**: `#1d1d1f` (深色文本), `#86868b` (灰色文本)

### 圆角半径

- **剪贴板主体**: 6-8px
- **夹子**: 4-6px
- **内容线条**: 1.5px

### 阴影效果

- **偏移**: dx=0, dy=2-3
- **模糊**: stdDeviation=2-3
- **颜色**: `#000000` with opacity 0.1-0.15

## 📱 适配场景

### 移动设备
```tsx
// 小屏幕使用简化图标
<Logo variant="simple" size={24} />
```

### 桌面设备
```tsx
// 大屏幕使用主 Logo
<Logo variant="main" />
```

### 社交媒体
```tsx
// 使用图标版本作为头像
<Logo variant="icon" size={120} />
```

## 🔄 响应式使用示例

```tsx
function ResponsiveHeader() {
  return (
    <header>
      {/* 移动端 */}
      <div className="md:hidden">
        <Logo variant="simple" size={24} />
      </div>

      {/* 桌面端 */}
      <div className="hidden md:block">
        <Logo variant="main" />
      </div>
    </header>
  );
}
```

## 🎯 品牌一致性

使用 Logo 时请遵循以下原则：

1. **保持比例**: 不要拉伸或扭曲 Logo
2. **保持颜色**: 使用官方的渐变色方案
3. **留白空间**: 为 Logo 周围预留足够的空白
4. **背景适配**: 在浅色背景上使用原 Logo，在深色背景上确保对比度
5. **最小尺寸**: 确保在任何尺寸下都清晰可见

## 🔧 自定义修改

如需修改 Logo，建议使用矢量图形编辑软件：

- **Adobe Illustrator**: 专业矢量编辑
- **Figma**: 在线协作设计
- **Inkscape**: 免费开源矢量编辑
- **Sketch**: Mac 平台设计工具

修改时请保持设计风格的一致性。

## 📄 商标使用

本 Logo 专为 Cross-Platform Clipboard 项目设计，请勿在其他项目中使用。如需使用，请获得正式授权。

## 🌐 其他格式

如需其他格式的 Logo 文件（PNG、PDF 等），可以使用在线工具将 SVG 转换：

- [CloudConvert](https://cloudconvert.com/)
- [SVG to PNG](https://svgtopng.com/)
- [Adobe Express](https://www.adobe.com/express/feature/image/convert/svg-to-png)

## 💡 使用建议

1. **性能优化**: SVG 文件体积小，可直接使用，无需额外优化
2. **SEO 优化**: 在使用图片时确保添加合适的 alt 文本
3. **可访问性**: 为屏幕阅读器提供适当的描述
4. **加载优先**: 首页 Logo 应使用 `priority` 属性

---

如有任何关于 Logo 使用的问题，请参考项目文档或联系设计团队。