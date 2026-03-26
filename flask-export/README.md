# Flask Shell Export

This folder is a Flask-ready export of the `hasasntutoring-static` shell.

Contents:

- `flask_shell_config.py`: base config and helper for shell overrides
- `templates/base_shell.html`: shared base Jinja template
- `templates/partials/header.html`: header partial
- `templates/partials/footer.html`: footer partial
- `static/css/global.css`: copied shell CSS
- `static/js/squarespace-shell.js`: copied shell bootstrap script
- `static/sqs-shell/*`: copied shared Squarespace assets

Suggested Flask usage:

```python
from flask import Flask, render_template
from flask_shell_config import create_shell_config

app = Flask(__name__)

@app.route("/")
def index():
    shell = create_shell_config()
    return render_template("base_shell.html", shell=shell)

@app.route("/alt")
def alt():
    shell = create_shell_config(
        {
            "site_title": "Alt Shell",
            "cta": {"href": "https://example.com/portal", "text": "Student Portal"},
            "navigation": [
                {"href": "https://example.com/", "label": "Home", "home": True},
                {"href": "https://example.com/about", "label": "About"},
                {"href": "https://example.com/contact", "label": "Contact"},
            ],
        }
    )
    return render_template("base_shell.html", shell=shell)
```

If you want application content inside the shell, extend `base_shell.html` and override the `content` block.
