# WP Plugin Boilerplate CLI

A CLI tool to automate the setup of new WordPress plugins with React.js setup. It simplifies the process by taking inputs and replacing boilerplate code, saving developers time and effort. No more manual editing of plugin names, text domains, or other repetitive tasks—let the CLI handle it for you!

---

## Features
- Automates replacing boilerplate code with user-provided inputs.
- Speeds up the setup process for WordPress plugin development.
- Easy-to-use and interactive CLI interface.

---

## Installation

To use `wp-add-plugin`, you need to install it globally on your machine.

```bash
npm install -g wp-add-plugin
```

This command makes the CLI tool globally accessible on your system.

---

## Usage

### Step 1: Start the CLI
Run the following command in the terminal within your plugin directory:

```bash
wp-add-plugin
```

### Step 2: Follow the Prompts
The CLI will guide you through the setup process by asking for specific inputs:
1. **Plugin Name**: Enter the name of your plugin (e.g., "My Awesome Plugin").
2. **Text Domain**: Specify the text domain for your plugin (e.g., "my-awesome-plugin").
3. **Namespace**: Define the namespace for your PHP classes (recommended).
4. **Constant Prefix**: Define the Constant Prefix for your PHP files (recommended).

The CLI will automatically:
- Update the plugin name and text domain in all relevant files.
- Replace placeholders in the boilerplate code with your inputs.
- Set up your plugin folder structure.

### Step 3: Start Developing
Once the CLI finishes, your new WordPress plugin is ready. Open the generated files in your favorite code editor and start building!

---

## Example

Here’s a sample session:

```bash
$ wp-add-plugin
? Enter your plugin name: My Awesome Plugin
? Enter your text domain: my-awesome-plugin
? Enter the namespace for php files: MyAwesomePlugin
? nter the Constant Prefix for php files: MY_AWESOME_PLUGIN

🎉 Your plugin has been successfully set up!
Path: /path/to/your/new-plugin-folder
```

---

## Contributions
Contributions, issues, and feature requests are welcome! Feel free to open a pull request or file an issue in the [GitHub repository](https://github.com/hrrarya/wp-add-plugin).

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Support

If you encounter any issues, please contact me via the repository or raise an issue.

---

Feel free to replace placeholders like `https://github.com/hrrarya/wp-add-plugin` and `LICENSE` with the actual details from your project. Let me know if you'd like to include more details or examples!