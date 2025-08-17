# REST API Plan

## 1. Resources

- **Users** - User accounts and profiles (managed by Supabase Auth)
- **Flashcards** - Individual flashcard content and metadata
- **Learning Progress** - Spaced repetition tracking data
- **Generation Statistics** - AI generation metrics per user
- **Learning Sessions** - Study session management
- **AI Generation** - Temporary flashcard generation and review

## 2. Endpoints

### Authentication (Supabase Auth)
- **POST** `/auth/register` - User registration
- **POST** `/auth/login` - User login
- **POST** `/auth/logout` - User logout
- **POST** `/auth/refresh` - Refresh access token

### Flashcards

#### **GET** `/api/flashcards`
Retrieve user's flashcards with pagination and filtering
- **Query Parameters:**
  - `page` (integer, default: 1)
  - `limit` (integer, default: 20, max: 100)
  - `is_ai_generated` (boolean, optional)
  - `is_accepted` (boolean, optional)
  - `sort_by` (string: "created_at", "updated_at", default: "created_at")
  - `sort_order` (string: "asc", "desc", default: "desc")
- **Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "front": "string",
      "back": "string",
      "is_ai_generated": boolean,
      "is_accepted": boolean,
      "created_at": "ISO-8601",
      "updated_at": "ISO-8601"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "total_pages": 8
  }
}
```
- **Success Codes:** 200 OK
- **Error Codes:** 401 Unauthorized, 400 Bad Request

#### **POST** `/api/flashcards`
Create a new manual flashcard
- **Request Payload:**
```json
{
  "front": "string (max 500 chars)",
  "back": "string (max 500 chars)"
}
```
- **Response:** 201 Created with created flashcard object
- **Success Codes:** 201 Created
- **Error Codes:** 400 Bad Request (validation), 401 Unauthorized

#### **GET** `/api/flashcards/{id}`
Retrieve a specific flashcard
- **Response:** 200 OK with flashcard object
- **Success Codes:** 200 OK
- **Error Codes:** 401 Unauthorized, 404 Not Found

#### **PUT** `/api/flashcards/{id}`
Update an existing flashcard
- **Request Payload:**
```json
{
  "front": "string (max 500 chars)",
  "back": "string (max 500 chars)"
}
```
- **Response:** 200 OK with updated flashcard object
- **Success Codes:** 200 OK
- **Error Codes:** 400 Bad Request, 401 Unauthorized, 404 Not Found

#### **DELETE** `/api/flashcards/{id}`
Delete a flashcard
- **Response:** 204 No Content
- **Success Codes:** 204 No Content
- **Error Codes:** 401 Unauthorized, 404 Not Found

### AI Flashcard Generation

#### **POST** `/api/flashcards/generate`
Generate flashcards from text using AI
- **Request Payload:**
```json
{
  "text": "string (1000-10000 chars)",
  "count": "integer (1-20, default: 10)"
}
```
- **Response:** 200 OK with generated flashcards
```json
{
  "data": [
    {
      "id": "temp-uuid",
      "front": "string",
      "back": "string",
      "is_ai_generated": true,
      "is_accepted": false,
      "confidence_score": "decimal (0.0-1.0)"
    }
  ],
  "generation_metadata": {
    "total_generated": 10,
    "processing_time_ms": 1500
  }
}
```
- **Success Codes:** 200 OK
- **Error Codes:** 400 Bad Request, 401 Unauthorized, 500 Internal Server Error

#### **POST** `/api/flashcards/generate/approve`
Approve selected AI-generated flashcards
- **Request Payload:**
```json
{
  "flashcard_ids": ["uuid1", "uuid2"],
  "reject_ids": ["uuid3", "uuid4"]
}
```
- **Response:** 200 OK with approval results
- **Success Codes:** 200 OK
- **Error Codes:** 400 Bad Request, 401 Unauthorized

### Learning Progress

#### **GET** `/api/learning-progress`
Retrieve user's learning progress
- **Query Parameters:**
  - `page` (integer, default: 1)
  - `limit` (integer, default: 20)
  - `next_review_date` (ISO-8601, optional)
  - `difficulty_rating` (integer 1-5, optional)
- **Response:** 200 OK with learning progress data
- **Success Codes:** 200 OK
- **Error Codes:** 401 Unauthorized

#### **PUT** `/api/learning-progress/{flashcard_id}`
Update learning progress for a specific flashcard
- **Request Payload:**
```json
{
  "difficulty_rating": "integer (1-5)",
  "algorithm_metadata": "object (optional)"
}
```
- **Response:** 200 OK with updated progress
- **Success Codes:** 200 OK
- **Error Codes:** 400 Bad Request, 401 Unauthorized, 404 Not Found

### Learning Sessions

#### **POST** `/api/learning-sessions/start`
Start a new learning session
- **Request Payload:**
```json
{
  "session_type": "string (new, review, mixed)",
  "max_cards": "integer (1-100, default: 20)"
}
```
- **Response:** 201 Created with session details
```json
{
  "id": "uuid",
  "started_at": "ISO-8601",
  "total_cards": 20,
  "session_type": "mixed",
  "current_card": {
    "flashcard_id": "uuid",
    "front": "string",
    "progress_id": "uuid"
  }
}
```
- **Success Codes:** 201 Created
- **Error Codes:** 400 Bad Request, 401 Unauthorized

#### **GET** `/api/learning-sessions/{id}/next-card`
Get the next card in the learning session
- **Response:** 200 OK with next card data
- **Success Codes:** 200 OK
- **Error Codes:** 401 Unauthorized, 404 Not Found

#### **PUT** `/api/learning-sessions/{id}/rate-card`
Rate the current card and get next card
- **Request Payload:**
```json
{
  "flashcard_id": "uuid",
  "difficulty_rating": "integer (1-5)",
  "response_time_ms": "integer (optional)"
}
```
- **Response:** 200 OK with next card or session completion
- **Success Codes:** 200 OK
- **Error Codes:** 400 Bad Request, 401 Unauthorized, 404 Not Found

#### **PUT** `/api/learning-sessions/{id}/complete`
Complete the learning session
- **Response:** 200 OK with session summary
- **Success Codes:** 200 OK
- **Error Codes:** 401 Unauthorized, 404 Not Found

### Generation Statistics

#### **GET** `/api/generation-statistics`
Retrieve user's generation statistics
- **Response:** 200 OK with statistics data
```json
{
  "total_generated": 150,
  "total_accepted": 112,
  "total_manual_created": 25,
  "acceptance_rate": 0.75,
  "ai_usage_rate": 0.82,
  "last_generation_date": "ISO-8601"
}
```
- **Success Codes:** 200 OK
- **Error Codes:** 401 Unauthorized

## 3. Authentication and Authorization

**Authentication Mechanism:** Supabase JWT-based authentication
- All API endpoints require valid JWT token in Authorization header
- Token format: `Authorization: Bearer <jwt_token>`
- Token validation handled by Supabase middleware

**Authorization Implementation:**
- Row Level Security (RLS) policies enforce user isolation
- All database queries filtered by `auth.uid()`
- No cross-user data access possible
- User ID extracted from JWT token for all operations

## 4. Validation and Business Logic

### Validation Conditions

**Flashcards:**
- `front` and `back`: Required, max 500 characters
- `user_id`: Automatically set from authenticated user

**Learning Progress:**
- `difficulty_rating`: Integer 1-5, required
- `ease_factor`: Decimal 4,3 precision, default 2.5
- `interval_days`: Integer, minimum 1

**AI Generation:**
- `text`: 1000-10000 characters
- `count`: 1-20 flashcards per generation

### Business Logic Implementation

**Spaced Repetition Algorithm:**
- Learning sessions automatically select cards based on `next_review_date`
- Card difficulty ratings update `interval_days` and `ease_factor`
- Algorithm metadata stored in JSONB for future enhancements

**Flashcard Approval Workflow:**
- AI-generated flashcards start as temporary (not saved to database)
- User reviews and approves/rejects generated cards
- Approved cards create learning progress records automatically
- Statistics updated in real-time during approval process

**Session Management:**
- Learning sessions track individual study progress
- Cards presented based on spaced repetition algorithm
- Session completion updates all progress records
- Performance metrics stored for analytics

**Rate Limiting:**
- AI generation: 10 requests per hour per user
- General API: 1000 requests per hour per user
- Authentication endpoints: 5 attempts per 15 minutes per IP
