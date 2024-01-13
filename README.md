# Harvest Time Tracker Chrome Extension

## Overview

The Harvest Time Tracker Chrome Extension is a productivity tool designed to streamline time tracking in Harvest and enhance the GitHub pull request management experience. Built using React and craco, this extension allows users to seamlessly add time entries to Harvest and view a list of their GitHub pull requests.

## Features

### 1. Time Tracking in Harvest

Easily add time entries to Harvest directly from your browser. The extension integrates with Harvest, requiring users to input their GitHub and Harvest API tokens in the provided `.env` file.

### 2. GitHub Pull Request Integration

View a list of all current pull requests associated with your GitHub account. You can select a pull request from the list, and its title will be automatically added to your task notes.

### 3. Automatic Title Extraction

When clicking on the extension icon while on a GitHub pull request page, the pull request's title becomes the default task in the extension. This feature enhances efficiency by pre-filling the task field with relevant information.

## Installation

To use the Harvest Time Tracker Chrome Extension, follow these steps:

1. Clone the repository to your local machine.

   ```bash
   git clone https://github.com/your-username/harvest-time-tracker.git
   ```

2. Navigate to the extension folder.
   ```bash
   cd harvest-time-tracker
   ```

3. Create a .env file with your GitHub and Harvest API tokens.
     ```bash
    REACT_APP_GITHUB_TOKEN=
    REACT_APP_HARVEST_TOKEN=
    REACT_APP_HARVEST_ACCOUNT_ID=
    REACT_APP_HARVEST_API_URL=https://api.harvestapp.com/v2/
   ```

 4. Install dependencies.
    ```bash
    npm install
    ```
5. Build the extension.
    ```bash
    npm run build
    ```
6. Open Chrome and go to chrome://extensions/.
7. Enable "Developer mode" and click on "Load unpacked".
8. Select the build folder from the extension directory.

## Usage

1. Click on the extension icon in your browser to access the main menu.
2. Complete the form.
3. View and select pull requests from the "GitHub Pull Requests" list to add their titles to Harvest notes.
4. Click on the extension icon while on a GitHub pull request page to automatically set its title as the default task.







