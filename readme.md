# brainfab-assistant-widget

Brainfab Assistant Widget

Use this source:

```html
<script>
	document.addEventListener('DOMContentLoaded', function () {
		let script = document.createElement('script')
		script.onload = function () {
			assistant_widget('ASSISTANT-ID')
		}
		document.body.appendChild(script)
	})
</script>
```
