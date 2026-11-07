/**
 * Brandline — Mastra 6-Step Parallel Agent Workflow Definition
 * Designed by Saanvi Singhal (AI Agents & Architecture)
 */
const { BrandlineWorkflow } = {
  BrandlineWorkflow: {
    name: "brandline-prepublish-governance",
    steps: [
      "1_submit_and_screen_pii_injection",
      "2_extract_intent_and_claim_ledger",
      "3_parallel_agents: [claimsAgent, terminologyAgent, toneAgent, visualPaletteAgent, accessibilityAgent]",
      "4_explain_with_rule_and_fact_evidence",
      "5_generate_intent_preserving_tracked_diff",
      "6_human_in_the_loop_approval_and_audit_log"
    ]
  }
};

module.exports = { BrandlineWorkflow };
