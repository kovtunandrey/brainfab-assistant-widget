# brainfab-assistant-widget

Brainfab Assistant Widget

Use this source:

```html
<script>
	document.addEventListener('DOMContentLoaded', function () {
		let script = document.createElement('script')
		script.src =
			'https://cdn.jsdelivr.net/gh/kovtunandrey/brainfab-assistant-widget@latest/widget.js'
		script.onload = function () {
			assistant_widget('ASSISTANT-ID')
		}
		document.body.appendChild(script)
	})
</script>
```
