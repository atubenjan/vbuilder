/*   
CREATE DATABASE vbuilder_quiz_db;
USE vbuilder_quiz_db;

CREATE TABLE quizzes (
    Id INT AUTO_INCREMENT PRIMARY KEY,  -- Make id the primary key
	Title VARCHAR(255) NOT NULL,
    QuizId VARCHAR(255),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (QuizId) 
);

CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    QuizId VARCHAR(255) NOT NULL,
    QuestionID VARCHAR(255) NOT NULL,
    Question TEXT NOT NULL,
    CorrectAnswer VARCHAR(255) NOT NULL,
    OptionA VARCHAR(255) NOT NULL,
    OptionB VARCHAR(255) NOT NULL,
    OptionC VARCHAR(255) NOT NULL,
    OptionD VARCHAR(255) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (QuizId) REFERENCES quizzes(QuizId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    UserId VARCHAR(255) NOT NULL,
    Username VARCHAR(50) NOT NULL,
    Organization VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Role ENUM('admin', 'user','organization') DEFAULT 'user', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    UserId VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    readStatus BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (UserId) REFERENCES users(UserId) ON DELETE CASCADE
);

-- Add Difficulty and scores column to questions table
ALTER TABLE questions
ADD COLUMN Difficulty VARCHAR(20),
ADD COLUMN Score INT;

*/
