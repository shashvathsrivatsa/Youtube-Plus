# YOUTUBE+ Chrome Extension
This is a Chrome extension that adds additional features to YouTube by injects custom CSS styles to YouTube pages.

## Installation
1. Clone this repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable Developer mode by ticking the checkbox in the upper-right corner.
4. Click on the "Load unpacked" button.
5. Select the directory where you cloned the repository.
6. Usage
7. Once installed, the extension will automatically apply the additional features when you visit YouTube.

#### Manifest
The manifest file for the extension is `manifest.json`. It specifies the permissions, background scripts, content scripts, and other settings for the extension.

#### Scripts
- `background.js`: This script runs in the background and listens for tab updates. It injects the custom CSS file into YouTube pages and sends messages to the content script when a YouTube video page is fully loaded.
- `content.js`: This script runs in the context of YouTube pages. It fetches video information from an external API and displays the like/dislike ratio on the video page.

#### Styles
The custom CSS styles for the extension are defined in `styles.css`. They style the like/dislike ratio element that is added to YouTube video pages.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
