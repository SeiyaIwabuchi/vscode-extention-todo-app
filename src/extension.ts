import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.showTodoList', () => {
        const panel = vscode.window.createWebviewPanel(
            'todoList',
            'ToDo List',
            vscode.ViewColumn.One,
            {
				enableScripts: true,
			}
        );

        panel.webview.html = getWebviewContent();
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ToDo List</title>
    </head>
    <body>
        <h1>ToDo List</h1>
        <ul id="todo-list"></ul>
        <input type="text" id="todo-input" placeholder="New task">
        <button onclick="addTask()">Add</button>

        <script>
            const todoList = document.getElementById('todo-list');
            const todoInput = document.getElementById('todo-input');

            function addTask() {
                const task = todoInput.value.trim();
                if (task) {
                    const li = document.createElement('li');
                    li.textContent = task;
                    todoList.appendChild(li);
                    todoInput.value = '';
                }
            }
        </script>
    </body>
    </html>
    `;
}

export function deactivate() {}