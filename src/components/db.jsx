// //CREATE DATABASE vbuilder_quiz_db;
// USE vbuilder_quiz_db;

// //Create the quizzes table with an additional autocomplete_input column
// CREATE TABLE quizzes (
//     id INT AUTO_INCREMENT PRIMARY KEY,  -- Make id the primary key
//     title VARCHAR(255) NOT NULL,
//     quiz_id VARCHAR(255),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     UNIQUE (quiz_id)  -- Add a unique constraint on quiz_id if needed
// );

// Create the questions table with a foreign key to quizzes
// CREATE TABLE questions (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     quiz_id VARCHAR(255) NOT NULL,
//     question_text TEXT NOT NULL,
//     correct_answer VARCHAR(255) NOT NULL,
//     option_a VARCHAR(255) NOT NULL,
//     option_b VARCHAR(255) NOT NULL,
//     option_c VARCHAR(255) NOT NULL,
//     option_d VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id) ON DELETE CASCADE
// );
