/*

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "VB@2024"; // Replace with your secret key

app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Steph@0136",
  database: "vbuilder_quiz_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

app.post("/users", async (req, res) => {
  const { username, organization, email, password, role } = req.body;

  // Validate the input fields
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (role === "organization" && !organization) {
    return res
      .status(400)
      .json({ message: "Organization name is required for organizations" });
  }

  // Hash the password using bcryptjs
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate a custom UserId in the format 'VBXXXX'
  const generateUserId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    return `VB${randomNum}`;
  };

  const userId = generateUserId();

  // Insert the new user into the database, including the organization (conditionally)
  const query = `
    INSERT INTO users (UserId, Username, Organization, Email, Password, Role)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [userId, username, organization, email, hashedPassword, role],
    (err, results) => {
      if (err) {
        // Check if email already exists (unique constraint)
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Email already exists" });
        }
        console.error("Error inserting user:", err);
        return res.status(500).json({ message: "Failed to insert user" });
      }

      res
        .status(201)
        .json({ message: "User created successfully", UserId: userId });
    }
  );
});

// Route to handle user login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Query the database to find the user by email
  const query = "SELECT * FROM users WHERE Email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Error retrieving user:", err);
      return res.status(500).json({ message: "Server error" });
    }

    // If no user is found with the provided email
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.UserId, role: user.Role },
      JWT_SECRET,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    // Respond with the JWT token and user details
    res.status(200).json({
      message: "Login successful",
      token,
      userId: user.UserId,
      username: user.Username,
      role: user.Role,
    });
  });
});

// Route to get all users
app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving users:", err);
      return res.status(500).json({ message: "Failed to retrieve users" });
    }

    res.status(200).json(results);
  });
});

// Route to add the quiz title and id
app.post("/quizzes", (req, res) => {
  const { Title, QuizId } = req.body;

  if (!Title || !QuizId) {
    return res.status(400).json({ message: "Quiz title and ID are required" });
  }

  const query = "INSERT INTO quizzes (Title, QuizId) VALUES (?, ?)";
  db.query(query, [Title, QuizId], (err, results) => {
    if (err) {
      console.error("Error inserting quiz:", err);
      return res.status(500).json({ message: "Failed to insert quiz" });
    }
    res.status(200).json({
      message: "Quiz info received successfully!",
      QuizId: QuizId,
    });
  });
});

// Route to count users by month
app.get("/users/count-by-month", (req, res) => {
  const query = `
    SELECT
      DATE_FORMAT(created_at, '%b') AS month,
      COUNT(*) AS count
    FROM users
    GROUP BY month
    ORDER BY MONTH(STR_TO_DATE(month, '%b'))
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving user counts by month:", err);
      return res
        .status(500)
        .json({ message: "Failed to retrieve user counts" });
    }

    // Ensure that all months are represented
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const counts = months.map((month) => {
      const row = results.find((r) => r.month === month);
      return row ? row.count : 0;
    });

    res.json(counts);
  });
});

// Route to add the questions and their answers
app.post("/questions", (req, res) => {
  const { questions, QuizId } = req.body;

  if (!questions || !QuizId) {
    return res
      .status(400)
      .json({ message: "Questions and quiz ID are required" });
  }

  const query =
    "INSERT INTO questions (QuizId, Question, QuestionId, CorrectAnswer, OptionA, OptionB, OptionC, OptionD) VALUES ?";
  const values = questions.map((q) => [
    QuizId,
    q.Question,
    q.QuestionId,
    q.CorrectAnswer,
    q.OptionA,
    q.OptionB,
    q.OptionC,
    q.OptionD,
  ]);

  db.query(query, [values], (err) => {
    if (err) {
      console.error("Error inserting questions:", err);
      return res.status(500).json({ message: "Failed to insert questions" });
    }
    res.status(200).json({ message: "Questions received successfully!" });
  });
});

// Route to get all users
app.get("/questions", (req, res) => {
  const query = "SELECT * FROM questions";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving questions:", err);
      return res.status(500).json({ message: "Failed to retrieve questions" });
    }

    res.status(200).json(results);
  });
});

// Route to get all quizzes
app.get("/quizzes", (req, res) => {
  const query = `
    SELECT q.Title, q.QuizId, 
           qs.QuestionId, qs.Question, 
           qs.OptionA, qs.OptionB, qs.OptionC, 
           qs.OptionD, qs.CorrectAnswer
    FROM quizzes q
    LEFT JOIN questions qs ON q.QuizId = qs.QuizId
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving quizzes:", err);
      return res.status(500).json({ message: "Failed to retrieve quizzes" });
    }

    // Group results by quiz
    const quizzes = results.reduce((acc, row) => {
      if (!acc[row.QuizId]) {
        acc[row.QuizId] = {
          Title: row.Title,
          QuizId: row.QuizId,
          questions: [],
        };
      }

      if (row.QuestionId) {
        acc[row.QuizId].questions.push({
          QuestionId: row.QuestionId,
          Question: row.Question,
          OptionA: row.OptionA,
          OptionB: row.OptionB,
          OptionC: row.OptionC,
          OptionD: row.OptionD,
          CorrectAnswer: row.CorrectAnswer,
        });
      }

      return acc;
    }, {});

    res.status(200).json(Object.values(quizzes));
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


*/
