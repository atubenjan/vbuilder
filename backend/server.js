/*

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "VB@2024"; // Replace with your secret key

//Middleware
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

// Send quiz results
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

// Fetch all quiz results
app.get("/quiz-results", verifyToken, (req, res) => {
  const query = "SELECT * FROM quiz_results";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving quiz results:", err);
      return res
        .status(500)
        .json({ message: "Failed to retrieve quiz results" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No quiz results found" });
    }

    res.status(200).json(results);
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

// Check if a user has done a quiz already
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

// Create new users
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

  try {
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
      (err) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "Email already exists" });
          }
          console.error("Error inserting user:", err);
          return res.status(500).json({ message: "Failed to insert user" });
        }

        // Add notification to the notifications table
        const notificationQuery = `
        INSERT INTO notifications (UserId, Email, Username, message)
        VALUES (?, ?, ?, ?)
      `;
        const notificationMessage = `Dear Admin, ${username} has created an account with email ${email} successfully created.`;

        db.query(
          notificationQuery,
          [userId, email, username, notificationMessage],
          (err) => {
            if (err) {
              console.error("Error inserting notification:", err);
              return res
                .status(500)
                .json({ message: "Failed to add notification" });
            }

            res
              .status(201)
              .json({ message: "User created successfully", UserId: userId });
          }
        );
      }
    );
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Get notification based on user id
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

// Get all notifications based on its id
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

// Handle user login
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
      organization: user.Organization,
    });
  });
});

// Get users as an admin or organization role
app.get("/users", verifyToken, (req, res) => {
  const { role, organization } = req.user;

  let query;
  let queryParams = [];

  if (role === "admin") {
    query = "SELECT * FROM users";
  } else if (role === "organization") {
    // Check if organization parameter is present in request
    if (req.query.organization) {
      query = "SELECT * FROM users WHERE Organization = ?";
      queryParams = [req.query.organization];
    } else {
      // If no organization parameter, return users for the user's organization
      query = "SELECT * FROM users WHERE Organization = ?";
      queryParams = [organization];
    }
  } else {
    return res.status(403).json({ message: "Access denied!" });
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Error retrieving users:", err);
      return res.status(500).json({ message: "Failed to retrieve users" });
    }

    res.status(200).json(results);
  });
});

// Get users based on their id
app.get("/users/:userId", verifyToken, (req, res) => {
  const { userId } = req.params;

  // Check if the user is an admin or organization
  if (req.user.role === "admin" || req.user.role === "organization") {
    // Proceed to fetch user details
    const query =
      "SELECT UserId, Username, Organization, Email, Role FROM users WHERE UserId = ?";

    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error retrieving user details:", err);
        return res
          .status(500)
          .json({ message: "Failed to retrieve user details" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(results[0]);
    });
  } else {
    // If the user role is neither admin nor organization, deny access
    return res.status(403).json({ message: "Access denied!" });
  }
});

// Count users created by month
app.get("/users/count-by-month", verifyToken, (req, res) => {
  const { organization } = req.query;
  const { role } = req.user; // Assuming you get the role from the verifyToken middleware

  let query = `
    SELECT MONTH(created_at) AS month, COUNT(UserId) AS count
    FROM users
    WHERE YEAR(created_at) = YEAR(CURDATE())
  `;

  // If the user is an organization, filter by organization
  if (role === "organization") {
    query += " AND Organization = ?";
  }

  query += " GROUP BY MONTH(created_at)";

  db.query(
    query,
    role === "organization" ? [organization] : [],
    (err, results) => {
      if (err) {
        console.error("Error fetching user counts:", err);
        return res.status(500).json({ message: "Failed to fetch user counts" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "No user counts found" });
      }

      // Prepare the counts array, indexed by month (1-12)
      const counts = Array(12).fill(0); // initialize array for all months
      results.forEach((row) => {
        counts[row.month - 1] = row.count; // row.month is 1-based (Jan = 1)
      });

      res.status(200).json(counts);
    }
  );
});

//Create quiz
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

// Get a quiz based on QuizId
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

// Create questions and their answers
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

// Get all questions
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

// Get all quizzes
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

// DELETE quiz based on its id
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

//Set port
const PORT = process.env.PORT || 5000;

//App listening
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/
