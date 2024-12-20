#!/usr/bin/env node

// const inquirer = require("inquirer");
import inquirer from "inquirer"
// const replaceInFile = require("replace-in-file");
import {replaceInFile} from "replace-in-file";

// const simpleGit = require("simple-git");
import {simpleGit} from 'simple-git';
// const fs = require("fs");
import * as fs from 'fs';


// const path = require("path");
import * as path from 'path';


// Prompt user for input
async function promptUser() {
    return await inquirer.prompt([
        { name: "pluginName", message: "Enter the plugin name:", default: "Main Plugin" },
        { name: "textDomain", message: "Enter the text domain:", default: "main-plugin" },
        { name: "namespace", message: "Enter the namespace for php files:", default: "MainPlugin" },
        { name: "constantPrefix", message: "Enter the Constant Prefix for php files:", default: "CONSTANT_PREFIX" },
        { name: "description", message: "Enter the plugin description:", default: "A great plugin!" },
        { name: "author", message: "Enter the author's name:", default: "Your Name" },
    ]);
}

// Clone boilerplate repo
async function cloneBoilerplate(pluginSlug) {
    const git = simpleGit();
    const repoUrl = "https://github.com/hrrarya/wp-react-plugin-boilerplace.git"; // Replace with your boilerplate repo URL
    const targetDir = path.resolve(pluginSlug);
    console.log('Boilerplate cloning...');
    await git.clone(repoUrl, targetDir);
    console.log("Boilerplate cloned successfully!");
    return targetDir;
}

// Update placeholders in files
async function updatePlaceholders(pluginDir, replacements) {
    const hashedTextDomain = replacements?.textDomain?.replace('-', '_') || 'main_plugin';
    const options = {
        files: [
            `${pluginDir}/**/*.php`,
            `${pluginDir}/**/*.json`,
            `${pluginDir}/**/*.md`,
            `${pluginDir}/**/*.js`,

        ],
        from: [/PLUGIN_NAME/g, /TEXT_DOMAIN/g,/MainPlugin/g,/CONSTANT_PREFIX/g,/main_plugin/g, /PLUGIN_DESCRIPTION/g, /AUTHOR_NAME/g],
        to: [
            replacements.pluginName,
            replacements.textDomain,
            replacements.namespace,
            replacements.constantPrefix,
            hashedTextDomain,
            replacements.description,
            replacements.author,
        ],
    };

    await replaceInFile(options);
    console.log("Placeholders updated!");
}

// Rename main plugin file
function renameMainFile(pluginDir, textDomain) {
    const oldFiles = [path.join(pluginDir, "main-plugin.php"), path.join(pluginDir + "/assets/scss" , "main-plugin.scss"),  path.join(pluginDir + "/assets/js" , "main-plugin.core.min.asset.php")];
    const newFiles = [path.join(pluginDir, `${textDomain}.php`), path.join(pluginDir + "/assets/scss/" , `${textDomain}.scss`), path.join(pluginDir + "/assets/js" , `${textDomain}.core.min.asset.php`)];
    

    for (var i = oldFiles.length - 1; i >= 0; i--) {
        if (fs.existsSync(oldFiles[i])) {
            fs.renameSync(oldFiles[i], newFiles[i]);
            // console.log(`Renamed main file to: ${newFiles[i]}`);
        } else {
            console.warn(`${oldFiles?.[i]} file not found. Skipping rename.`);
        }
    }
}

async function main() {
    try {
        const answers = await promptUser();
        const pluginSlug = answers.textDomain;
        const pluginDir = await cloneBoilerplate(pluginSlug);

        await updatePlaceholders(pluginDir, answers);
        renameMainFile(pluginDir, answers.textDomain);

        console.log(`
        Plugin setup complete!


        run the following commands:
        _____________________________________

        cd ${answers.textDomain}
        composer install 
        npm install 
        npm start


        Happy Coding!

        `);

    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

main();
