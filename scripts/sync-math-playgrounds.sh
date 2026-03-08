#!/bin/bash

# Math Playgrounds Auto-Sync Script
# 自动同步 math-teacher 生成的练习题到 Skills-XiaoSiMen 仓库
# 并更新 README.md 和提交到 GitHub

# Note: not using set -e to avoid issues with arithmetic operations

# Configuration
SOURCE_DIR="/mnt/d/0.py/openclaw/openclaw/skills/math-teacher/math-playgrounds"
DEST_DIR="/mnt/d/0.py/Skills-XiaoSiMen/math-playgrounds"
README_FILE="/mnt/d/0.py/Skills-XiaoSiMen/README.md"
REPO_DIR="/mnt/d/0.py/Skills-XiaoSiMen"
GITHUB_PAGES_BASE="https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Math Playgrounds Auto-Sync Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}Error: Source directory not found: $SOURCE_DIR${NC}"
    exit 1
fi

# Check if destination directory exists
if [ ! -d "$DEST_DIR" ]; then
    echo -e "${YELLOW}Creating destination directory: $DEST_DIR${NC}"
    mkdir -p "$DEST_DIR"
fi

# Get list of HTML files in source (with full paths)
SOURCE_FILES=$(find "$SOURCE_DIR" -maxdepth 1 -name "*.html" -type f | sort)

# Get list of HTML files in destination (with full paths)
DEST_FILES=$(find "$DEST_DIR" -maxdepth 1 -name "*.html" -type f | sort)

# Track synced files
SYNCED_COUNT=0
NEW_FILES=()

echo -e "${YELLOW}Checking for new/updated files...${NC}"
echo ""

# Sync each file
for src_file in $SOURCE_FILES; do
    filename=$(basename "$src_file")
    dest_file="$DEST_DIR/$filename"
    
    # Check if file exists in destination or is newer in source
    if [ ! -f "$dest_file" ] || [ "$src_file" -nt "$dest_file" ]; then
        echo -e "${GREEN}Syncing: $filename${NC}"
        cp "$src_file" "$dest_file"
        NEW_FILES+=("$filename")
        SYNCED_COUNT=$((SYNCED_COUNT + 1))
    else
        echo -e "  Up to date: $filename"
    fi
done

echo ""
echo -e "${YELLOW}Synced $SYNCED_COUNT file(s)${NC}"
echo ""

# If no new files, exit
if [ ${#NEW_FILES[@]} -eq 0 ]; then
    echo -e "${GREEN}All files are up to date. Nothing to commit.${NC}"
    exit 0
fi

# Update README.md with new files
echo -e "${YELLOW}Updating README.md...${NC}"

# Get current date
CURRENT_DATE=$(date +%Y-%m-%d)

# Generate markdown table entries for new files
NEW_ENTRIES=""
for filename in "${NEW_FILES[@]}"; do
    # Extract topic name from filename (remove .html and convert to readable format)
    topic_name=$(echo "$filename" | sed 's/.html$//' | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')
    file_url="$GITHUB_PAGES_BASE/$filename"
    
    NEW_ENTRIES+="| $topic_name | Playground | [开始练习]($file_url) |
"
done

# Check if math section exists in README
if grep -q "### 🔢 数学 (Math Teacher)" "$README_FILE"; then
    echo -e "${GREEN}Found math section in README${NC}"
    
    # Find the line number of the table separator (|------|------|---------|)
    # This is the line right after "| 内容 | 类型 | 在线练习 |"
    SEPARATOR_LINE=$(grep -n "^|------|------|---------|" "$README_FILE" | head -1 | cut -d: -f1)
    
    if [ -n "$SEPARATOR_LINE" ]; then
        # Insert after the separator line
        INSERT_LINE=$SEPARATOR_LINE
        
        # Create temp file with new entries inserted
        head -n $INSERT_LINE "$README_FILE" > "$README_FILE.tmp"
        echo -n "$NEW_ENTRIES" >> "$README_FILE.tmp"
        tail -n +$((INSERT_LINE + 1)) "$README_FILE" >> "$README_FILE.tmp"
        mv "$README_FILE.tmp" "$README_FILE"
        
        echo -e "${GREEN}README.md updated with ${#NEW_FILES[@]} new entry(ies)${NC}"
    else
        echo -e "${YELLOW}Warning: Could not find table separator, skipping README update${NC}"
    fi
else
    echo -e "${YELLOW}Warning: Math section not found in README, skipping update${NC}"
fi

# Git operations
echo ""
echo -e "${YELLOW}Committing changes to GitHub...${NC}"

cd "$REPO_DIR"

# Check if there are changes to commit
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}No changes to commit.${NC}"
    exit 0
fi

# Add changed files
git add math-playgrounds/
git add README.md

# Create commit message
COMMIT_MSG="Auto-sync: Add ${#NEW_FILES[@]} math playground(s) - $CURRENT_DATE"

# Commit and push
git commit -m "$COMMIT_MSG"
echo -e "${GREEN}Committed: $COMMIT_MSG${NC}"

git push origin main
echo -e "${GREEN}Pushed to GitHub successfully!${NC}"

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ Sync Complete!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "New files available at:"
for filename in "${NEW_FILES[@]}"; do
    echo -e "  ${GREEN}$GITHUB_PAGES_BASE/$filename${NC}"
done
echo ""
