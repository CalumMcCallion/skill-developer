# Getting Started


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# OpenAI Hackathon Learning Plan
This is a React.js web application that generates a comprehensive and customized learning plan (hackathon) for team members to master a particular skill to a specific level within a given timeframe. The generated plan includes an overview of the task, specific and actionable steps, resources to call upon to help with learning the skill, and help with completing the task, and milestones that each team member can follow to achieve their objectives.

The application uses OpenAI's GPT-3 API to generate the hackathon learning plan based on the team member's name, skill, level, and timeframe inputs. If there are already existing team member records, the app can generate a comprehensive learning plan for multiple team members.

# Tailored Hackathon Generator
This is a React.js web application that generates a comprehensive and customised learning plan (hackathon) for team members to master a particular skill to a specific level within a given timeframe. The generated plan includes an overview of the task, specific and actionable steps, resources to call upon to help with learning the skill, and help with completing the task, as well milestones that each team member can follow to achieve their objectives.

There is the ability to add as many team members to the list as you want, each with different skill development requests, therefore if there are already existing team member records, the app will automatically generate a comprehensive learning plan for multiple team members that combines all of the inputs into a final project plan that will allow the members to work together and develop team working skills as a bonus whilst advancing their skills in a practical non boring way.

The application uses OpenAI's API to generate the hackathon learning plan based on the team member's name, skill, level, and timeframe inputs. 

## Future Plans
Input field for users emails, this will allow for an email to be generated and sent to each team member with the hackathon brief and the specific tasks that they are required to do.

Allow for multiple screen views to best match the user's needs i.e schools might want to put a limit of the competency level that students may input.

## Installation
Clone the repository: git clone: https://github.com/CalumMcCallion/skill-developer.git
Navigate to the project directory: cd REPOSITORY
Install dependencies: npm install
Run the app: npm start

You should replace USERNAME/REPOSITORY with your GitHub username and the name of the cloned repository.

## Usage
To use the app, fill out the form with the team member's name, skill, level, and timeframe to master the skill. The generated hackathon learning plan will be displayed in the textbox below the form.


If there are already existing team member records, the app will automatically generate a comprehensive learning plan for multiple team members.

## Dependencies
@mui/material
@openai/openai-api

## Environment Variables
API_KEY - Your OpenAI API key

## Contributing
Feel free to submit a pull request or raise an issue for bug fixes or new features.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
=======
## Contributing
Feel free to submit a pull request or raise an issue for bug fixes or new features.
