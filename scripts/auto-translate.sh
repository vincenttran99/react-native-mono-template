#!/usr/bin/env bash
set -euo pipefail

# Setup logging
# LOG_FILE="auto-translate.log"
# exec > >(tee -a "$LOG_FILE") 2>&1
echo "=== Auto-translate started at $(date) ==="

# Read .env to get ENABLE_AUTO_TRANSLATE
if [ -f .env.development ]; then
  export $(grep -v '^#' .env.development | xargs)
else
  echo "❌ File .env.development does not exist."
  exit 1
fi

if [[ "${ENABLE_AUTO_TRANSLATE:-false}" != "true" ]]; then
  echo "Auto-translate disabled. Skipping."
  exit 0
fi

# Check if translate-shell is installed
if ! command -v trans &> /dev/null; then
  echo "❌ translate-shell not found. Please install it from https://github.com/soimort/translate-shell"
  exit 1
fi

# Ensure DEFAULT_LANGUAGE_CODE has a value
if [ -z "${DEFAULT_LANGUAGE_CODE:-}" ]; then
  DEFAULT_LANG="vi"
  echo "⚠️ DEFAULT_LANGUAGE_CODE is not defined, using default: $DEFAULT_LANG"
else
  DEFAULT_LANG="$DEFAULT_LANGUAGE_CODE"
fi

# Check ENABLE_AUTO_DETECT_WHEN_TRANSLATE flag
if [[ "${ENABLE_AUTO_DETECT_WHEN_TRANSLATE:-false}" == "true" ]]; then
  AUTO_DETECT=true
  echo "🔍 Auto-detection of source language enabled"
else
  AUTO_DETECT=false
  echo "🔄 Auto-translating empty msgstr using source language: $DEFAULT_LANG"
fi

# Get list of staged .po files
STAGED_PO_FILES=$(git diff --cached --name-only --diff-filter=ACMR | grep -E "\.po$" || true)

# If no .po files are staged, check all .po files
if [ -z "$STAGED_PO_FILES" ]; then
  echo "No .po files are staged, checking all .po files..."
  STAGED_PO_FILES=$(find src/locale/locales -type f -name "*.po" 2>/dev/null || echo "")
fi

if [ -z "$STAGED_PO_FILES" ]; then
  echo "No .po files found. Skipping."
  exit 0
fi

CHANGED=false

for po in $STAGED_PO_FILES; do
  # Skip if file doesn't exist
  if [ ! -f "$po" ]; then
    continue
  fi
  
  locale=$(basename "$(dirname "$po")")
  
  # Skip if locale is the same as source language and not a new file
  if [ "$locale" = "$DEFAULT_LANG" ]; then
    # Check if the file is new
    if git ls-files --error-unmatch "$po" > /dev/null 2>&1; then
      echo "Skipping source language file (already exists): $po"
      continue
    else
      echo "New source language file, continuing processing: $po"
    fi
  fi
  
  echo "Processing: $po (locale: $locale)"
  
  # Count the number of actual empty msgstr (excluding header)
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
  
  # If there are no empty msgstr to translate, skip this file
  if [ "$empty_before" -eq 0 ]; then
    echo "No strings to translate in file $po. Skipping."
    continue
  fi
  
  # Use a simpler method to process the file
  echo "Starting file processing..."
  
  # Create a copy of the original file
#   cp "$po" "${po}.bak"
  
  # Find and translate empty msgstr strings
  translations_count=0
  
  # Create an array to store source:target pairs
  declare -a translations
  
  # Read the file and process each line to find msgid that need translation
  while IFS= read -r line || [ -n "$line" ]; do
    # Find msgid line
    if [[ "$line" =~ ^msgid\ \"(.*)\"$ ]]; then
      current_msgid="${BASH_REMATCH[1]}"
      
      # Skip empty msgid (header)
      if [[ -z "$current_msgid" ]]; then
        continue
      fi
      
      # Find the next msgstr line
      line_num=$(grep -n "msgid \"$current_msgid\"" "$po" | cut -d: -f1)
      next_line_num=$((line_num + 1))
      next_line=$(sed -n "${next_line_num}p" "$po")
      
      # If msgstr is empty, translate and add to translations array
      if [[ "$next_line" == 'msgstr ""' ]]; then
        echo "Translating string: '$current_msgid' from $DEFAULT_LANG to $locale"
        
        # Perform translation with or without -s parameter depending on AUTO_DETECT
        if [ "$AUTO_DETECT" = true ]; then
          translation=$(trans -b :"$locale" "$current_msgid" 2>/dev/null || echo "")
        else
          translation=$(trans -b :"$locale" -s "$DEFAULT_LANG" "$current_msgid" 2>/dev/null || echo "")
        fi
        
        if [[ -n "$translation" ]]; then
          echo "Translation result: '$translation'"
          # Add to translations array
          translations+=("$current_msgid:$translation")
          ((translations_count++))
        else
          echo "Could not translate: '$current_msgid'"
        fi
      fi
    fi
  done < <(grep -A 1 "^msgid " "$po" | grep -v "^--$")
  
  echo "Number of strings translated: $translations_count"
  
  # Apply translations to the file
  for trans in "${translations[@]}"; do
    IFS=':' read -r source target <<< "$trans"
    echo "Applying translation: '$source' -> '$target'"
    
    # Find the position of msgid and the next msgstr line
    line_num=$(grep -n "msgid \"$source\"" "$po" | cut -d: -f1)
    if [ -n "$line_num" ]; then
      next_line_num=$((line_num + 1))
      # Check if the next line is an empty msgstr
      next_line=$(sed -n "${next_line_num}p" "$po")
      if [ "$next_line" = 'msgstr ""' ]; then
        # Replace empty msgstr with translation
        target_escaped=$(echo "$target" | sed 's/[\/&]/\\&/g')
        sed -i.tmp "${next_line_num}s/msgstr \"\"/msgstr \"$target_escaped\"/" "$po"
        echo "Updated line $next_line_num with translation"
      else
        echo "msgstr line is not empty or not a msgstr, skipping"
      fi
    else
      echo "Could not find msgid: '$source'"
    fi
  done
  
  # Remove temporary .tmp file if exists
  rm -f "${po}.tmp"
  
  # Count the number of actual empty msgstr after processing (excluding header)
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
  
  # Show some translated lines for debugging
  if [ "$empty_before" -ne "$empty_after" ]; then
    echo "Examples of translated lines:"
    # diff -u "${po}.bak" "$po" | grep -E "^\+msgstr" | head -n 5
    
    # Add file to git
    # git add "$po"
    echo "Added file to git: $po"
    
    CHANGED=true
  else
    echo "ℹ️ No changes in: $po"
  fi
  
  # Remove backup file
#   rm -f "${po}.bak"
done

if [ "$CHANGED" = true ]; then
  echo "✅ Auto-translate completed and changes have been staged."
else
  echo "ℹ️ No strings to translate."
fi

# Ensure script exits successfully
echo "=== Auto-translate completed at $(date) ==="
exit 0