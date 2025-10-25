# Database Schema Documentation

## Overview
This document outlines the database schema for the Green Synthesis Research website. The schema is designed to support articles, team members, and related content management.

## Tables

### Articles Table
Stores all published and draft articles for the research publication.

\`\`\`sql
CREATE TABLE articles (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  image VARCHAR(500),
  date DATE NOT NULL,
  author VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  read_time VARCHAR(50),
  status ENUM('draft', 'published') DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_date (date),
  INDEX idx_category (category),
  INDEX idx_author (author)
);
\`\`\`

### Team Members Table
Stores information about research team members.

\`\`\`sql
CREATE TABLE team_members (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  image VARCHAR(500),
  bio TEXT NOT NULL,
  expertise JSON,
  order_position INT DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active (active),
  INDEX idx_order (order_position)
);
\`\`\`

### Categories Table (Optional)
Stores article categories for better organization.

\`\`\`sql
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

## Relationships

- **Articles** → **Categories**: Many-to-One relationship
- **Articles** → **Team Members**: Many-to-One relationship (author)

## Indexes

- `articles.date`: For sorting articles by publication date
- `articles.category`: For filtering articles by category
- `articles.author`: For finding articles by author
- `team_members.active`: For displaying only active team members
- `team_members.order_position`: For maintaining team member display order

## Migration Notes

When setting up the database:

1. Create the `categories` table first
2. Create the `team_members` table
3. Create the `articles` table with foreign key constraints
4. Insert default categories
5. Insert team member data
6. Insert sample articles

## Future Enhancements

- Add user authentication table for admin access
- Add comments/feedback table for articles
- Add analytics table for tracking article views
- Add tags table for better article organization
- Add media library table for image management
