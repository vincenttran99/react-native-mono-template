#!/usr/bin/env bash
set -euo pipefail

# ===================================================================
# Auto-translation script for PO files
# ===================================================================
# This script automatically translates empty msgstr entries in PO files
# using translate-shell. It can be used as a pre-commit hook or run manually.
# 
# Features:
# - Translates only empty msgstr entries
# - Supports auto-detection of source language
# - Can process staged files or all PO files
# - Configurable through environment variables
# ===================================================================

# Setup logging
# Uncomment these lines to enable logging to a file
# LOG_FILE="auto-translate.log"
# exec > >(tee -a "$LOG_FILE") 2>&1
echo "=== Auto-translate started at $(date) ==="

# Read environment variables from .env.development
# This loads configuration settings like ENABLE_AUTO_TRANSLATE
if [ -f .env.development ]; then
  export $(grep -v '^#' .env.development | xargs)
else
  echo "❌ File .env.development does not exist."
  exit 1
fi

# Check if auto-translation is enabled in environment settings
# Skip the entire process if disabled
if [[ "${ENABLE_AUTO_TRANSLATE:-false}" != "true" ]]; then
  echo "Auto-translate disabled. Skipping."
  exit 0
fi

# Verify that translate-shell is installed
# This is the core dependency for performing translations
if ! command -v trans &> /dev/null; then
  echo "❌ translate-shell not found. Please install it from https://github.com/soimort/translate-shell"
  exit 1
fi

# Set the default source language for translations
# Uses DEFAULT_LANGUAGE_CODE from .env or falls back to "vi"
if [ -z "${DEFAULT_LANGUAGE_CODE:-}" ]; then
  DEFAULT_LANG="vi"
  echo "⚠️ DEFAULT_LANGUAGE_CODE is not defined, using default: $DEFAULT_LANG"
else
  DEFAULT_LANG="$DEFAULT_LANGUAGE_CODE"
fi

# Determine whether to auto-detect source language
# When enabled, translate-shell will try to identify the language automatically
if [[ "${ENABLE_AUTO_DETECT_WHEN_TRANSLATE:-false}" == "true" ]]; then
  AUTO_DETECT=true
  echo "🔍 Auto-detection of source language enabled"
else
  AUTO_DETECT=false
  echo "🔄 Auto-translating empty msgstr using source language: $DEFAULT_LANG"
fi

# Get list of PO files to process
# First tries to get staged files from git, then falls back to all PO files
STAGED_PO_FILES=$(git diff --cached --name-only --diff-filter=ACMR | grep -E "\.po$" || true)

# If no PO files are staged in git, find all PO files in the locale directory
if [ -z "$STAGED_PO_FILES" ]; then
  echo "No .po files are staged, checking all .po files..."
  STAGED_PO_FILES=$(find src/locale/locales -type f -name "*.po" 2>/dev/null || echo "")
fi

# Exit if no PO files are found to process
if [ -z "$STAGED_PO_FILES" ]; then
  echo "No .po files found. Skipping."
  exit 0
fi

# Track whether any files were changed during processing
CHANGED=false

# Process each PO file
for po in $STAGED_PO_FILES; do
  # Skip if file doesn't exist
  if [ ! -f "$po" ]; then
    continue
  fi
  
  # Extract locale from directory name
  # Example: src/locale/locales/vi/messages.po -> locale is "vi"
  locale=$(basename "$(dirname "$po")")
  
  # Skip source language files that already exist in git
  # This prevents modifying the source language files unnecessarily
  if [ "$locale" = "$DEFAULT_LANG" ]; then
    # Check if the file is already tracked by git
    if git ls-files --error-unmatch "$po" > /dev/null 2>&1; then
      echo "Skipping source language file (already exists): $po"
      continue
    else
      echo "New source language file, continuing processing: $po"
    fi
  fi
  
  echo "Processing: $po (locale: $locale)"
  
  # Count empty msgstr entries before processing
  # This AWK script carefully excludes the header section
  empty_before=$(awk '
    BEGIN { count=0; header=1; }
    /^msgid / { 
      if (header == 1 && $0 == "msgid \"\"") {
        header=2;
      } else if (header == 2) {
        header=0;
      }
    }
    /^msgstr ""$/ { 
      if (header == 0) count++; 
    }
    END { print count; }
  ' "$po")
  
  echo "Number of actual empty msgstr (excluding header): $empty_before"
  
  # Skip files with no empty msgstr entries
  if [ "$empty_before" -eq 0 ]; then
    echo "No strings to translate in file $po. Skipping."
    continue
  fi
  
  # Begin processing the file
  echo "Starting file processing..."
  
  # Uncomment to create a backup of the original file
  # cp "$po" "${po}.bak"
  
  # Initialize translation counter and array
  translations_count=0
  declare -a translations
  
  # Process the file line by line to find msgid entries that need translation
  # This extracts all msgid lines and their following msgstr lines
  while IFS= read -r line || [ -n "$line" ]; do
    # Match lines starting with "msgid" followed by a quoted string
    if [[ "$line" =~ ^msgid\ \"(.*)\"$ ]]; then
      # Extract the string content from the msgid line
      current_msgid="${BASH_REMATCH[1]}"
      
      # Skip empty msgid (part of the PO file header)
      if [[ -z "$current_msgid" ]]; then
        continue
      fi
      
      # Find the line number of the current msgid
      line_num=$(grep -n "msgid \"$current_msgid\"" "$po" | cut -d: -f1)
      # The msgstr line is typically the next line after msgid
      next_line_num=$((line_num + 1))
      next_line=$(sed -n "${next_line_num}p" "$po")
      
      # Only translate if the msgstr is empty
      if [[ "$next_line" == 'msgstr ""' ]]; then
        echo "Translating string: '$current_msgid' from $DEFAULT_LANG to $locale"
        
        # Perform translation using translate-shell
        # The approach differs based on whether auto-detection is enabled
        if [ "$AUTO_DETECT" = true ]; then
          # Auto-detect source language
          translation=$(trans -b :"$locale" "$current_msgid" 2>/dev/null || echo "")
        else
          # Use specified source language
          translation=$(trans -b :"$locale" -s "$DEFAULT_LANG" "$current_msgid" 2>/dev/null || echo "")
        fi
        
        # Store successful translations for later processing
        if [[ -n "$translation" ]]; then
          echo "Translation result: '$translation'"
          # Store as source:target pair
          translations+=("$current_msgid:$translation")
          ((translations_count++))
        else
          echo "Could not translate: '$current_msgid'"
        fi
      fi
    fi
  done < <(grep -A 1 "^msgid " "$po" | grep -v "^--$")
  
  echo "Number of strings translated: $translations_count"
  
  # Apply all translations to the file
  for trans in "${translations[@]}"; do
    # Split the source:target pair
    IFS=':' read -r source target <<< "$trans"
    echo "Applying translation: '$source' -> '$target'"
    
    # Find the position of the msgid line
    line_num=$(grep -n "msgid \"$source\"" "$po" | cut -d: -f1)
    if [ -n "$line_num" ]; then
      # The msgstr line is the next line
      next_line_num=$((line_num + 1))
      # Verify that the next line is an empty msgstr
      next_line=$(sed -n "${next_line_num}p" "$po")
      if [ "$next_line" = 'msgstr ""' ]; then
        # Escape special characters in the target string for sed
        target_escaped=$(echo "$target" | sed 's/[\/&]/\\&/g')
        # Replace the empty msgstr with the translation
        sed -i.tmp "${next_line_num}s/msgstr \"\"/msgstr \"$target_escaped\"/" "$po"
        echo "Updated line $next_line_num with translation"
      else
        echo "msgstr line is not empty or not a msgstr, skipping"
      fi
    else
      echo "Could not find msgid: '$source'"
    fi
  done
  
  # Clean up temporary files created by sed
  rm -f "${po}.tmp"
  
  # Count empty msgstr entries after processing
  # Uses the same AWK script as before to ensure consistent counting
  empty_after=$(awk '
    BEGIN { count=0; header=1; }
    /^msgid / { 
      if (header == 1 && $0 == "msgid \"\"") {
        header=2;
      } else if (header == 2) {
        header=0;
      }
    }
    /^msgstr ""$/ { 
      if (header == 0) count++; 
    }
    END { print count; }
  ' "$po")
  
  echo "Number of actual empty msgstr after processing (excluding header): $empty_after"
  
  # Show examples of translated lines for debugging
  if [ "$empty_before" -ne "$empty_after" ]; then
    echo "Examples of translated lines:"
    # Uncomment to show diff of changes
    # diff -u "${po}.bak" "$po" | grep -E "^\+msgstr" | head -n 5
    
    # Uncomment to automatically stage changes in git
    # git add "$po"
    echo "Added file to git: $po"
    
    CHANGED=true
  else
    echo "ℹ️ No changes in: $po"
  fi
  
  # Uncomment to remove backup file if it was created
  # rm -f "${po}.bak"
done

# Final status message
if [ "$CHANGED" = true ]; then
  echo "✅ Auto-translate completed and changes have been staged."
else
  echo "ℹ️ No strings to translate."
fi

# Ensure script exits successfully
echo "=== Auto-translate completed at $(date) ==="
exit 0