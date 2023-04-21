import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Configuration, OpenAIApi } from "openai";
import Typography from "@mui/material/Typography";
import { CompletionResponse } from "@openai/openai-api";
import Box from "@mui/material/Box";
import "./App.css";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const API_KEY = "API_KEY_HERE";
let messageFeedback = "";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

function App() {
  function createData(
    nameP: string,
    skillP: string,
    levelP: string,
    timeP: string
  ) {
    return { nameP, skillP, levelP, timeP };
  }

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [hackathonTask, setHackathonTask] = useState("");
  const [hackathonTaskF, setHackathonTaskF] = useState("");
  const [rows, setRows] = useState([]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSkill(event.target.value);
  };

  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(event.target.value);
  };

  const handleTimeframeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTimeframe(event.target.value);
  };

  const generateHackathonTask = async () => {
    let prompt = "";
    const numRows = rows.length;
    if (numRows > 0) {
      prompt = `Develop a comprehensive and customized learning plan (hackathon) for the following team members: `;
      rows.forEach((row) => {
        prompt += `${row.nameP}, `;
      });
      rows.forEach((row) => {
        prompt =
          prompt.slice(0, -2) +
          `, ${row.nameP} to learn ${row.skillP} within ${row.timeP} to a ${row.levelP} level . `;
      });
    } else {
      prompt = `Develop a comprehensive and customized learning plan (hackathon) for ${name} to learn ${skill} to a ${level} level within ${timeframe}. The plan should be tailored to ${name}'s requirements, and goals. It should include an overview of the task, specific and actionable steps, resources to call upon to help with learning ${skill} and help with completing the task, and milestones that ${name} can follow to achieve their objective. Additionally, please provide a brief explanation for each step and the reason behind it. The plan should empower ${name} to not only learn ${skill} but also develop a deep understanding and practical application of it. The final learning plan should be presented in a clear and concise format that is easy for ${name} to follow and refer to throughout their learning journey.`;
    }

    prompt += `The plan should be tailored to the requirements and goals of each team member. It should include an overview of the task, specific and actionable steps, resources to call upon to help with learning ${skill} and help with completing the task, and milestones that each team member can follow to achieve their objective. Additionally, please provide a brief explanation for each step and the reason behind it. The plan should empower each team member to not only learn ${skill} but also develop a deep understanding and practical application of it. The final learning plan should be presented in a clear and concise format that is easy for each team member to follow and refer to throughout their learning journey.`;
    prompt += ` ## Return response in the same layout as provided here but don't pay attention to the context as you will come up with your own Project based on the input: 
Project: (Project Title)

Description: (Detailed Project Description)

(Tailored Task) EXAMPLE: Front-end development: Calum will focus on learning and implementing React.js to build the front-end of the application. He will need to create the necessary components, such as the login form, chat room list, and message interface.

Resources:

(Tool) documentation: https://(tool).org.html
(Tool) tutorial: https://(tool).org/tutorial.html

(Tailored Task) EXAMPLE: Back-end development: Hussain will focus on learning and implementing AWS Lambda to build the back-end of the application. He will need to create Lambda functions that handle the authentication, chat room creation, and message sending.

Resources:

(Tool) documentation: https://(tool).org.html
(Tool) tutorial: https://(tool).org/tutorial.html
    `;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 3671,
      n: 1,
      temperature: 0.7,
    });

    const choice = completion.data.choices[0];
    const hackathonTask = choice.message.content.trim();

    setHackathonTask(hackathonTask);

    // let firstResponse = hackathonTask;
    // let finalResponse = "Combine the following tasks into a singular hackathon that is split into individual tasks suited for the team member and the skill, level and timeframe they set: " + firstResponse;

    // const completion2 = await new Promise((resolve, reject) => {
    //   openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: finalResponse,
    //     max_tokens: 3000,
    //     n: 1,
    //     frequency_penalty: 0.2,
    //     presence_penalty: 0.8,
    //     temperature: 0.7,
    //   })
    //     .then((response) => {
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });

    // setHackathonTaskF(completion2.data.choices[0].text);
  };

  const addTeamMember = async () => {
    const newRow = createData(name, skill, level, timeframe);
    setRows([...rows, newRow]);
    setName("");
    setSkill("");
    setLevel("");
    setTimeframe("");
  };

  const numRows = rows.length;
  if (numRows > 1) {
  }

  const [open, setOpen] = React.useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        close
      </Button>
    </React.Fragment>
  );

  const handleGenerateHackathonTaskClick = () => {
    const allFieldsPopulated =
      rows.length !== 0 ||
      (name.trim() !== "" &&
        skill.trim() !== "" &&
        level.trim() !== "" &&
        timeframe.trim() !== "");

    if (allFieldsPopulated) {
      messageFeedback = "Request Succesfully Submitted";
      setLoading(true);
      setOpen(true);
      generateHackathonTask();
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } else {
      messageFeedback = "Request Failed - Make Sure All Fields Are Populated";
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  };

  return (
    <>
      <style>
        {`
          body {
            background-image: url('/bgwave.jpg');
            background-size: cover;
          }
        `}
      </style>
      <div className="Spacing">
        <h1 className="Title">Team Skill Development Platform</h1>
        <h4>
          TIP: Ensure your inputs are saved by clicking "add team member" before
          generating a task.
        </h4>
        <TextField
          required
          id="outlined-required"
          label="Enter your name"
          value={name}
          variant="outlined"
          onChange={handleNameChange}
          sx={{
            width: 500,
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
              border: "1px solid #ccc",
            },
            "& .MuiOutlinedInput-input": {
              backgroundColor: "#96ecff72",
              borderRadius: "30px",
              padding: "17px",
            },
          }}
        />

        <TextField
          required
          id="outlined-required"
          label="Enter the skill you would like to learn"
          value={skill}
          variant="outlined"
          onChange={handleSkillChange}
          sx={{
            width: 500,
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
              border: "1px solid #ccc",
            },
            "& .MuiOutlinedInput-input": {
              backgroundColor: "#96ecff72",
              borderRadius: "30px",
              padding: "17px",
            },
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="To what level would you like to learn (e.g basic - expert)"
          value={level}
          variant="outlined"
          onChange={handleLevelChange}
          sx={{
            width: 500,
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
              border: "1px solid #ccc",
            },
            "& .MuiOutlinedInput-input": {
              backgroundColor: "#96ecff72",
              borderRadius: "30px",
              padding: "17px",
            },
          }}
        />

        <TextField
          required
          id="outlined-required"
          label="Hackathon Duration (e.g 1 day, week, month) "
          value={timeframe}
          variant="outlined"
          onChange={handleTimeframeChange}
          sx={{
            width: 500,
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
              border: "1px solid #ccc",
            },
            "& .MuiOutlinedInput-input": {
              backgroundColor: "#96ecff72",
              borderRadius: "30px",
              padding: "17px",
            },
          }}
        />
        <Button variant="contained" onClick={addTeamMember}>
          Add Team Member
        </Button>
        <Button variant="contained" onClick={handleGenerateHackathonTaskClick}>
          Generate Hackathon Task
        </Button>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Skill</TableCell>
                <TableCell align="right">Level</TableCell>
                <TableCell align="right">Timeframe</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key="Name"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.nameP}</TableCell>
                  <TableCell align="right">{row.skillP}</TableCell>
                  <TableCell align="right">{row.levelP}</TableCell>
                  <TableCell align="right">{row.timeP}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>{loading && !hackathonTask && <CircularProgress />}</div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={messageFeedback}
          action={action}
        />
      </div>

      <div className={`Preview-Box ${hackathonTask ? "show" : ""}`}>
        {hackathonTask && <h1 className="Preview-Box-Title">Response:</h1>}
        <div
          className="Preview-Box-Text"
          dangerouslySetInnerHTML={{
            __html: hackathonTask && hackathonTask.replace(/\n/g, "<br>"),
          }}
        ></div>
      </div>
    </>
  );
}

export default App;
