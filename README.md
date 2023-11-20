
# ToDo List App

This project is a ToDo List application built using React. It allows users to manage their tasks in both local and public lists. Users can add, delete, and mark tasks as completed. Additionally, the app supports the creation of public lists that can be shared with others.




## Screenshots

![App Screenshot](https://raw.githubusercontent.com/landerssini/OnlineToDoList/main/src/assets/readmeImg/readmeImg1.png)

![App Screenshot](https://raw.githubusercontent.com/landerssini/OnlineToDoList/main/src/assets/readmeImg/readmeImg2.png)

![App Screenshot](https://raw.githubusercontent.com/landerssini/OnlineToDoList/main/src/assets/readmeImg/readmeImg3.png)


## Tech Stack

- React (v18.2.0):

A JavaScript library for building user interfaces.
Used for building the components and managing the UI state of the ToDo List app.
- React Router DOM (v6.18.0):

A routing library for React applications.
Used for handling navigation and routing within the ToDo List app.
- Axios (v1.6.1):

A promise-based HTTP client for making API requests.
Used for handling HTTP requests, likely for communication with a backend or external API.
- React Hot Toast (v2.4.1):

A customizable toast notification library for React.
Used for displaying informative and error messages to the user.

## Features

- Local and Public Lists: Manage tasks in both local and public lists.
- Task Operations: Add, delete, and mark tasks as completed.
- Public List Sharing: Create public lists and share them with others using unique list codes.
- Responsive Design: The app is designed to work seamlessly on various screen sizes.


## Usage/Examples

### Local List
The app starts with a local list by default. You can add, delete, and mark tasks as completed. The changes are stored locally.

### Public Lists
To switch to a public list, click on the menu button in the top left corner.
Enter the unique list code in the "Connect to List" section and submit the form.
The app will switch to the selected public list, and you can view and modify its tasks.

### Creating a Public List
Click on the menu button and select "Convert to Public."
If the local list is not empty, a public list will be created, and you'll receive a unique list code.
Share the list code with others to allow them to access the same list.


## Future Implementations


### 1. Sorting and Filtering:

Implement sorting options for tasks based on priority, due date, or completion status.
Add filtering options to view tasks by category, date, or other criteria.
Enhance the user's ability to organize and find tasks efficiently.

### 2. Notifications:

Integrate a notification system to remind users of upcoming tasks or deadlines.
Allow users to customize notification preferences, such as the timing and frequency of reminders.
Enhance user engagement by providing timely reminders for task management.

### 3. Customizable Themes:

Implement a theme selector to allow users to customize the app's appearance.
Provide a set of predefined themes and the ability to create custom themes.
Allow users to personalize the visual style of the app according to their preferences.

### 4. Task Details:

Add the ability to include additional details for each task.
Allow users to attach files, set due dates, or add notes to tasks.
Enhance the granularity of task management by providing more information and context for each task.
## API Reference

The app integrates with a ToDo List API for managing public lists. The API methods include:

- getPublicList: Fetches data for a public list.
- fromLocalToPublicList: Converts a local list to a public list.
- addToList: Adds a task to the list.
- changeCompletedTask: Changes the completion status of a task.
- deleteFromList: Deletes a task from the list.
