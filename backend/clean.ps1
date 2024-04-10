# Define a function to recursively remove files and directories
function Remove-ItemRecursively {
    param(
        [string]$Path
    )
    
    # Remove the item at the given path
    Remove-Item -Path $Path -Force -Recurse -ErrorAction SilentlyContinue
}

# Define the clean target
function Clean {
    # Remove db.sqlite3 file
    Remove-ItemRecursively "db.sqlite3"

    # Remove migration files
    Remove-ItemRecursively "*\migrations\0*.py"

    # Remove .pyc files
    Remove-ItemRecursively "*.pyc"

    # Remove .dist files
    Remove-ItemRecursively "..\..\**\.dist"

    # Remove .vscode files
    Remove-ItemRecursively "..\..\**\.vscode"

    # Remove __pycache__ directories
    Remove-ItemRecursively "**\__pycache__"
    Remove-ItemRecursively "*\__pycache__"

    Remove-ItemRecursively ".DS_Store"

    Remove-ItemRecursively "media\*"
}

# Call the clean target
Clean
