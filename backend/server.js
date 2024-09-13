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
  password: "",
  database: "vbuilder_quiz_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

// JWT middleware to verify token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Access denied, token missing!" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

app.post("/quiz-results", verifyToken, (req, res) => {
  const { quizId, score, totalScore, userId } = req.body;

  if (!quizId || score == null || totalScore == null || !userId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = `
    INSERT INTO quiz_results (QuizId, UserId, TotalScore, Score, CompletedAt)
    VALUES (?, ?, ?, ?, NOW())
  `;

  db.query(query, [quizId, userId, totalScore, score], (err) => {
    if (err) {
      console.error("Error inserting quiz results:", err);
      return res.status(500).json({ message: "Failed to insert quiz results" });
    }

    res.status(201).json({ message: "Quiz results submitted successfully!" });
  });
});

//Get results based on user id
app.get("/quiz-results/:userId", verifyToken, (req, res) => {
  const { userId } = req.params;

  // Ensure the user can only access their own results
  if (userId !== req.user.userId) {
    return res.status(403).json({ message: "Access denied!" });
  }

  const query = `SELECT * FROM quiz_results WHERE UserId = ?`;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error retrieving quiz results:", err);
      return res
        .status(500)
        .json({ message: "Failed to retrieve quiz results" });
    }

    res.status(200).json(results);
  });
});

app.get("/quiz-results/check/:quizId/:userId", verifyToken, (req, res) => {
  const { quizId, userId } = req.params;

  const query = `SELECT * FROM quiz_results WHERE QuizId = ? AND UserId = ?`;

  db.query(query, [quizId, userId], (err, results) => {
    if (err) {
      console.error("Error checking quiz completion:", err);
      return res
        .status(500)
        .json({ message: "Failed to check quiz completion" });
    }

    if (results.length > 0) {
      return res
        .status(200)
        .json({ completed: true, message: "Quiz already completed" });
    } else {
      return res
        .status(200)
        .json({ completed: false, message: "Quiz not completed" });
    }
  });
});

app.post("/users", async (req, res) => {
  const { username, organization, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (role === "organization" && !organization) {
    return res
      .status(400)
      .json({ message: "Organization name is required for organizations" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const generateUserId = () => `VB${Math.floor(1000 + Math.random() * 9000)}`;
  const userId = generateUserId();

  const query = `
    INSERT INTO users (UserId, Username, Organization, Email, Password, Role)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [userId, username, organization, email, hashedPassword, role],
    (err, results) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Email already exists" });
        }
        console.error("Error inserting user:", err);
        return res.status(500).json({ message: "Failed to insert user" });
      }

      // Add notification to the notifications table
      const notificationQuery = `
      INSERT INTO notifications (UserId, message)
      VALUES (?, ?)
    `;
      const notificationMessage = `Welcome ${username}! Your account has been successfully created.`;

      db.query(notificationQuery, [userId, notificationMessage], (err) => {
        if (err) {
          console.error("Error inserting notification:", err);
          return res
            .status(500)
            .json({ message: "Failed to add notification" });
        }

        res
          .status(201)
          .json({ message: "User created successfully", UserId: userId });
      });
    }
  );
});

app.get("/notifications/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT * FROM notifications
    WHERE UserId = ?
    ORDER BY createdAt DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching notifications:", err);
      return res.status(500).json({ message: "Failed to fetch notifications" });
    }

    res.status(200).json(results);
  });
});

app.put("/notifications/:id", (req, res) => {
  const { id } = req.params;

  const query = `
    UPDATE notifications
    SET readStatus = true
    WHERE id = ?
  `;

  db.query(query, [id], (err) => {
    if (err) {
      console.error("Error updating notification status:", err);
      return res
        .status(500)
        .json({ message: "Failed to update notification status" });
    }

    res.status(200).json({ message: "Notification marked as read" });
  });
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

app.post("/quizzes", (req, res) => {
  const { Title } = req.body;

  if (!Title) {
    return res.status(400).json({ message: "Quiz title is required" });
  }

  const generateQuizId = () => `VB${Math.floor(1000 + Math.random() * 9000)}`;
  const QuizId = generateQuizId();

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

// Route to get a specific quiz based on QuizId
app.get("/quizzes/:quizId", (req, res) => {
  const { quizId } = req.params;

  const query = `
    SELECT q.Title, q.QuizId, 
           qs.QuestionId, qs.Question, 
           qs.OptionA, qs.OptionB, qs.OptionC, qs.OptionD, 
           qs.CorrectAnswer, qs.Difficulty, qs.Score
    FROM quizzes q
    JOIN questions qs ON q.QuizId = qs.QuizId
    WHERE q.QuizId = ?
  `;

  db.query(query, [quizId], (err, results) => {
    if (err) {
      console.error("Error retrieving quiz:", err);
      return res.status(500).json({ message: "Failed to retrieve quiz" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Structure the response
    const quiz = {
      Title: results[0].Title,
      QuizId: results[0].QuizId,
      Questions: results.map((row) => ({
        QuestionId: row.QuestionId,
        Question: row.Question,
        OptionA: row.OptionA,
        OptionB: row.OptionB,
        OptionC: row.OptionC,
        OptionD: row.OptionD,
        CorrectAnswer: row.CorrectAnswer,
        Difficulty: row.Difficulty,
        Score: row.Score,
      })),
    };

    res.status(200).json(quiz);
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

app.post("/questions", (req, res) => {
  const { questions, QuizId } = req.body;

  if (!questions || !QuizId) {
    return res
      .status(400)
      .json({ message: "Questions and quiz ID are required" });
  }

  const generateQuestionId = () =>
    `${Math.floor(10000 + Math.random() * 90000)}`;

  const query =
    "INSERT INTO questions (QuizId, Question, QuestionId, CorrectAnswer, OptionA, OptionB, OptionC, OptionD, Difficulty, Score) VALUES ?";

  const values = questions.map((q) => [
    QuizId,
    q.Question,
    generateQuestionId(),
    q.CorrectAnswer,
    q.OptionA,
    q.OptionB,
    q.OptionC,
    q.OptionD,
    q.Difficulty || "Medium", // Default to 'Medium' if not provided
    q.Score || 1, // Default to 1 if not provided
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
           qs.OptionD, qs.CorrectAnswer, 
           qs.Difficulty, qs.Score
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
          Difficulty: row.Difficulty,
          Score: row.Score,
        });
      }

      return acc;
    }, {});

    res.status(200).json(Object.values(quizzes));
  });
});

// DELETE request to delete a quiz
app.delete("/quizzes/:quizId", verifyToken, (req, res) => {
  const { quizId } = req.params;

  const query = `DELETE FROM quizzes WHERE QuizId = ?`;

  db.query(query, [quizId], (err, results) => {
    if (err) {
      console.error("Error deleting quiz:", err);
      return res.status(500).json({ message: "Failed to delete quiz" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz deleted successfully" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/
