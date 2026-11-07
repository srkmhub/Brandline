-- ============================================================================
-- Brandline PostgreSQL + pgvector Schema
-- Architected by Alapathi Sai Rama Krishna Mani (Backend, Data & Security)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS vector;

-- 1. Role-Based Access Control (RBAC) Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(180) UNIQUE NOT NULL,
  role VARCHAR(32) NOT NULL CHECK (role IN ('creator', 'manager', 'reviewer')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Brand Governance Rules (with pgvector semantic embeddings)
CREATE TABLE brand_guidelines (
  rule_id VARCHAR(20) PRIMARY KEY,
  category VARCHAR(40) NOT NULL,
  title TEXT NOT NULL,
  trigger_phrase TEXT,
  replacement_phrase TEXT,
  linked_fact_id VARCHAR(20),
  escalation_tier VARCHAR(24) NOT NULL CHECK (escalation_tier IN ('Auto-Pass', 'Suggest Fix', 'Must Escalate')),
  description TEXT NOT NULL,
  override_rate NUMERIC(5,2) DEFAULT 0.0,
  embedding vector(1536),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Approved Fact Base (Single Source of Truth for Claims)
CREATE TABLE approved_facts (
  fact_id VARCHAR(20) PRIMARY KEY,
  category VARCHAR(60) NOT NULL,
  statement TEXT NOT NULL,
  source_document TEXT NOT NULL,
  embedding vector(1536),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Content Submissions & Versions
CREATE TABLE submissions (
  submission_id VARCHAR(32) PRIMARY KEY,
  channel VARCHAR(60) NOT NULL,
  contributor_type VARCHAR(60) NOT NULL,
  original_draft TEXT NOT NULL,
  extracted_intent TEXT,
  final_approved_draft TEXT,
  escalation_tier VARCHAR(24) NOT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'Needs Manager Review',
  created_by INTEGER REFERENCES users(id),
  approved_by INTEGER REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Immutable Cryptographic Audit Log
CREATE TABLE audit_logs (
  log_id BIGSERIAL PRIMARY KEY,
  actor_name VARCHAR(120) NOT NULL,
  actor_role VARCHAR(32) NOT NULL,
  event_type VARCHAR(60) NOT NULL,
  reference_id VARCHAR(60),
  details TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Approved Facts F-12 & F-18 from Slide 6 Worked Example
INSERT INTO approved_facts (fact_id, category, statement, source_document) VALUES
('F-12', 'Customer Adoption', 'Trusted by 50,000+ customers across India with a 4.8/5 verified repeat rating.', 'CRM & Order Ledger Q3 2026'),
('F-18', 'Clinical Efficacy', 'Delivers visible glow in 4 weeks* (*based on a 28-day consumer perception study).', 'DermaLab Clinical Dossier #DL-2026-09');
