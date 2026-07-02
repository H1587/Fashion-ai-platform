# Fashion AI Platform - Backlog

This document tracks approved improvements and technical debt that have been intentionally deferred to keep sprint scope focused and ensure timely MVP delivery.

---

# High Priority (Post-MVP)

## AI Analysis

- Replace `gender` with `targetAudience` (`Men`, `Women`, `Unisex`, `Unknown`)
- Hide `rawResponse` from the public API response
- Return HTTP `404 Not Found` instead of `400 Bad Request` for missing resources
- Introduce typed domain exceptions (NotFoundError, ValidationError, AIProviderError)
- Implement configurable AI request timeout using `AI_TIMEOUT_MS`
- Normalize empty AI response values (e.g. `""`) to `null`

---

# Medium Priority

## AI Enhancements

- Detect multiple garments in a single image
- Return per-attribute confidence scores
- Return multiple fabric candidates with confidence
- Detect neckline
- Detect garment length
- Detect hem style
- Detect cuff style
- Detect print placement
- Detect construction details
- Detect garment silhouette

---

# Low Priority

## Platform Improvements

- AI provider health monitoring
- Prompt version management
- AI performance metrics
- AI analysis caching
- Prompt A/B testing

---

# Technical Debt

- Uploaded files currently stored using local storage (Google Cloud Storage planned)
- Prompt version currently hardcoded as `v1`
- ImageAnalysis currently allows multiple analyses for the same image
- AI retry strategy not implemented
- Centralized error handling middleware
- Shared `AuthenticatedRequest` type across all modules

---

# Notes

The items in this backlog are intentionally out of scope for the MVP and should only be considered after the core platform milestones have been completed.