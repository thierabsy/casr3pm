
# jQuery-scrollFix 介绍

jQuery-scrollFix 一个滚动固定在某个位置的jQuery插件。   [点击预览](http://mengqing723.github.io/public/demo/jQ_scrollFix/index.html)

遵循 `AMD` 、`CMD` 规范  

当前版本： `v2.0.2`  



# 参数详解

参数 | 描述 | 默认值
---|---|---|---
`top` | 浮动对象 到顶部的高度 | 0
`bottom` | 浮动对象 到停靠对象(startObj)的间距 | 0
`zindex` | 浮动对象 的z-index索引值 | 999
`startObj` | 滑到 startObj 位置时开始浮动固定，默认为浮动对象 | null
`position` | 滑到 startObj 顶端/底端 开始浮动固定 | `top`/`bottom`
`endObj` | 滑到 endObj 顶部时取消固定并继续跟随滚动 | null
`endPos` | 浮动对象 到停止对象(endObj)的间距 | 0
`fixClass` | 浮动固定后添加 class 样式 | `fixed`
`fixFn` | 浮动固定后回调 | -
`fixEndFn` | 浮动固定结束后回调 | -
`endFn` | 浮动结束后回调 | -



# 用法

先在页面引入 `jQuery` 和 `scrollFix.js` 文件

```html
<script src="//cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script>
<script src="../dist/jQuery.scrollFix.min.js"></script>
```

调用

```js

// 滚动到 `#nav` 位置后开始浮动固定
$('#nav').scrollFix();

// 滚动到 `#main` 位置后开始浮动固定, 滚动到 `#footer` 后停止固定并跟随滚动
$('#nav').scrollFix({
	top: 60,
	bottom: 20,
	startObj: '#main',
	endObj: '#footer',
	endPos: 20,
	fixFn: function() {
		console.log('开始浮动固定');
	},
	endFn: function() {
		console.log('结束浮动');
	}
});
```

### Demo

[点击预览](https://github.com/mengqing723/jQuery-scrollFix/tree/master/example)  



# Bug tracker

Have a bug? Please create an issue on GitHub at [issues](https://github.com/mengqing723/jQuery-scrollFix/issues)