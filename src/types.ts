import type { Database } from "./db/database.types";

// Extract table types from database schema
type Tables = Database["public"]["Tables"];
type Flashcards = Tables["flashcards"]["Row"];
type FlashcardsInsert = Tables["flashcards"]["Insert"];
type FlashcardsUpdate = Tables["flashcards"]["Update"];
type LearningProgress = Tables["learning_progress"]["Row"];
type LearningProgressInsert = Tables["learning_progress"]["Insert"];
type LearningProgressUpdate = Tables["learning_progress"]["Update"];
type LearningSessions = Tables["learning_sessions"]["Row"];
type LearningSessionsInsert = Tables["learning_sessions"]["Insert"];
type GenerationStatistics = Tables["generation_statistics"]["Row"];

// ============================================================================
// FLASHCARD DTOs
// ============================================================================

/**
 * Flashcard response DTO for API responses
 * Excludes user_id for security, includes all other flashcard fields
 */
export type FlashcardResponse = Omit<Flashcards, "user_id">;

/**
 * Flashcard creation DTO for manual flashcard creation
 * Only requires front and back content
 */
export type FlashcardCreate = Pick<FlashcardsInsert, "front" | "back">;

/**
 * Flashcard update DTO for modifying existing flashcards
 * Makes all fields optional for partial updates
 */
export type FlashcardUpdate = Partial<FlashcardCreate>;

/**
 * Flashcard detail DTO for single flashcard retrieval
 * Same as response but semantically indicates single item
 */
export type FlashcardDetail = FlashcardResponse;

// ============================================================================
// AI GENERATION DTOs
// ============================================================================

/**
 * Request DTO for AI flashcard generation
 * Specifies input text and desired flashcard count
 */
export interface FlashcardGenerateRequest {
  text: string; // 1000-10000 characters
  count: number; // 1-20 flashcards
}

/**
 * AI-generated flashcard DTO
 * Extends flashcard structure with AI-specific fields
 */
export interface AIGeneratedFlashcard {
  id: string;
  front: string;
  back: string;
  is_ai_generated: true;
  is_accepted: false;
  confidence_score: number; // 0.0-1.0
}

/**
 * Response DTO for AI generation endpoint
 * Contains generated flashcards and metadata
 */
export interface FlashcardGenerateResponse {
  data: AIGeneratedFlashcard[];
  generation_metadata: {
    total_generated: number;
    processing_time_ms: number;
  };
}

/**
 * Request DTO for approving/rejecting AI-generated flashcards
 * Specifies which cards to accept or reject
 */
export interface FlashcardApproveRequest {
  flashcard_ids: string[]; // IDs to approve
  reject_ids: string[]; // IDs to reject
}

// ============================================================================
// LEARNING PROGRESS DTOs
// ============================================================================

/**
 * Learning progress response DTO
 * Combines flashcard data with learning progress information
 */
export interface LearningProgressResponse {
  flashcard_id: string;
  front: string;
  back: string;
  difficulty_rating: number | null;
  ease_factor: number;
  interval_days: number;
  next_review_date: string;
  review_count: number;
  last_review_date: string | null;
  algorithm_metadata: any | null;
}

/**
 * Learning progress update DTO
 * Fields that can be updated during learning sessions
 */
export type LearningProgressUpdate = Pick<LearningProgressUpdate, "difficulty_rating" | "algorithm_metadata">;

// ============================================================================
// LEARNING SESSION DTOs
// ============================================================================

/**
 * Request DTO for starting a new learning session
 * Specifies session type and maximum cards
 */
export interface LearningSessionStartRequest {
  session_type: "new" | "review" | "mixed";
  max_cards: number; // 1-100
}

/**
 * Current card information within a learning session
 * Combines flashcard data with progress tracking
 */
export interface SessionCard {
  flashcard_id: string;
  front: string;
  progress_id: string;
}

/**
 * Learning session response DTO
 * Extends session data with current card information
 */
export interface LearningSessionResponse extends Omit<LearningSessions, "user_id"> {
  session_type: "new" | "review" | "mixed";
  current_card: SessionCard | null;
}

/**
 * Request DTO for rating cards during learning sessions
 * Includes difficulty rating and optional response time
 */
export interface LearningSessionRateRequest {
  flashcard_id: string;
  difficulty_rating: number; // 1-5
  response_time_ms?: number;
}

// ============================================================================
// STATISTICS DTOs
// ============================================================================

/**
 * Generation statistics response DTO
 * Extends database statistics with computed rates
 */
export interface GenerationStatisticsResponse extends Omit<GenerationStatistics, "user_id"> {
  acceptance_rate: number; // total_accepted / total_generated
  ai_usage_rate: number; // total_generated / (total_generated + total_manual_created)
}

// ============================================================================
// PAGINATION DTOs
// ============================================================================

/**
 * Pagination metadata DTO
 * Standard pagination information for list responses
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

/**
 * Generic paginated response wrapper
 * Wraps any data array with pagination metadata
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// ============================================================================
// API RESPONSE DTOs
// ============================================================================

/**
 * Paginated flashcard response
 * Combines flashcard array with pagination metadata
 */
export type PaginatedFlashcardsResponse = PaginatedResponse<FlashcardResponse>;

/**
 * Paginated learning progress response
 * Combines learning progress array with pagination metadata
 */
export type PaginatedLearningProgressResponse = PaginatedResponse<LearningProgressResponse>;

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Session type union for type safety
 */
export type SessionType = "new" | "review" | "mixed";

/**
 * Difficulty rating range for validation
 */
export type DifficultyRating = 1 | 2 | 3 | 4 | 5;

/**
 * Confidence score range for AI generation
 */
export type ConfidenceScore = number; // 0.0-1.0
