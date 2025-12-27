# GearGuard Maintenance Management System

## Project Overview
GearGuard is a comprehensive maintenance management system designed to track equipment, schedule maintenance requests, and manage recurring maintenance tasks. It features a modern web interface built with Next.js and a robust backend API powered by FastAPI.

## Prerequisites
- Python 3.9 or higher
- Node.js 16 or higher
- npm or yarn

## Installation and Setup

### 1. Backend Setup

1. Navigate to the backend directory:
   cd gearguard-backend

2. Create a virtual environment:
   python -m venv venv

3. Activate the virtual environment:
   - Windows: venv\Scripts\activate
   - Unix/MacOS: source venv/bin/activate

4. Install dependencies:
   pip install -r requirements.txt

5. Initialize the database:
   python init_db.py
   
   Note: This script will create a SQLite database (gearguard.db) and seed it with initial data, including users, teams, and equipment. Validates database schema and populates tables with realistic sample records.

6. Start the backend server:
   uvicorn app.main:app --reload

The API will be available at http://localhost:8000.

### 2. Frontend Setup

1. Navigate to the frontend directory:
   cd gearguard-frontend

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev

The application will be available at http://localhost:3000.

## Default Credentials

Use the following credentials to log in as an administrator:

- Email: admin@gearguard.com
- Password: admin

## Key Features
- Dashboard: High-level overview of maintenance activities.
- Maintenance Requests: Create, track, and manage maintenance tickets.
- Equipment Management: Asset tracking with detailed specifications.
- Calendar: Visual schedule of upcoming maintenance tasks.
- Team Management: Assign tasks to specific teams or technicians.
