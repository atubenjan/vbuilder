// const express = require("express");
// const app = express();
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const mysql = require("mysql2");

// app.use(cors());
// app.use(bodyParser.json());

// // Create MySQL connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Steph@0136",
//   database: "vbuilder_quiz_db",
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Database connection failed:", err.stack);
//     return;
//   }
//   console.log("Connected to database.");
// });

// // Route to add the quiz title and id
// app.post("/quizzes", (req, res) => {
//   const { title, quiz_id } = req.body;

//   if (!title || !quiz_id) {
//     return res.status(400).json({ message: "Quiz title and ID are required" });
//   }

//   const query = "INSERT INTO quizzes (title, quiz_id) VALUES (?, ?)";
//   db.query(query, [title, quiz_id], (err, results) => {
//     if (err) {
//       console.error("Error inserting quiz:", err);
//       return res.status(500).json({ message: "Failed to insert quiz" });
//     }
//     res.status(200).json({
//       message: "Quiz info received successfully!",
//       quizId: quiz_id,
//     });
//   });
// });

// // Route to add the questions and their answers
// app.post("/questions", (req, res) => {
//   const { questions, quiz_id } = req.body;

//   if (!questions || !quiz_id) {
//     return res
//       .status(400)
//       .json({ message: "Questions and quiz ID are required" });
//   }

//   const query =
//     "INSERT INTO questions (quiz_id, question_text, correct_answer, option_a, option_b, option_c, option_d) VALUES ?";
//   const values = questions.map((q) => [
//     quiz_id,
//     q.question_text,
//     q.correct_answer,
//     q.option_a,
//     q.option_b,
//     q.option_c,
//     q.option_d,
//   ]);

//   db.query(query, [values], (err) => {
//     if (err) {
//       console.error("Error inserting questions:", err);
//       return res.status(500).json({ message: "Failed to insert questions" });
//     }
//     res.status(200).json({ message: "Questions received successfully!" });
//   });
// });

// // Route to get all quizzes
// app.get("/quizzes", (req, res) => {
//   const query = `
//     SELECT q.title AS quiz_title, q.quiz_id,
//            qs.id AS question_id, qs.question_text,
//            qs.option_a, qs.option_b, qs.option_c,
//            qs.option_d, qs.correct_answer
//     FROM quizzes q
//     LEFT JOIN questions qs ON q.quiz_id = qs.quiz_id
//   `;

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("Error retrieving quizzes:", err);
//       return res.status(500).json({ message: "Failed to retrieve quizzes" });
//     }

//     // Group results by quiz
//     const quizzes = results.reduce((acc, row) => {
//       if (!acc[row.quiz_id]) {
//         acc[row.quiz_id] = {
//           title: row.quiz_title,
//           quiz_id: row.quiz_id,
//           questions: [],
//         };
//       }

//       if (row.question_id) {
//         acc[row.quiz_id].questions.push({
//           question_id: row.question_id,
//           question_text: row.question_text,
//           option_a: row.option_a,
//           option_b: row.option_b,
//           option_c: row.option_c,
//           option_d: row.option_d,
//           correct_answer: row.correct_answer,
//         });
//       }

//       return acc;
//     }, {});

//     res.status(200).json(Object.values(quizzes));
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
