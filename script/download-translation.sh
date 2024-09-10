#!/bin/bash

# Load environment variables based on the current environment
if [ "$NODE_ENV" == "production" ]; then
  export $(grep -v '^#' .env.production | xargs)
else
  export $(grep -v '^#' .env.development.local | xargs)
fi

# Define languages and output directory
languages=("zh" "en")
outputDir="messages"

# Ensure the /i18n folder exists
if [ ! -d "$outputDir" ]; then
  mkdir -p "$outputDir"
fi

# Function to fetch and move JSON files
fetchLanguageFile() {
  lang=$1
  outputFile="${lang}.json"

  # Run the curl command
  curl -L -X GET "${NEXT_PUBLIC_TOLGEE_API_URL}/v2/projects/1/export?languages=${lang}&zip=false" \
    -H "Accept: application/json" \
    -H "X-API-Key: ${NEXT_PUBLIC_TOLGEE_API_KEY}" \
    --output "$outputFile"

  # Check if curl was successful
  if [ $? -eq 0 ]; then
    # Move the file to the /i18n directory
    mv "$outputFile" "$outputDir/"
    echo "${outputFile} has been moved to ./src/i18n"
  else
    echo "Error fetching ${lang}.json"
  fi
}

# Fetch and move all language files
for lang in "${languages[@]}"; do
  fetchLanguageFile "$lang"
done
