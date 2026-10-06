/**
 * "Report an issue" (P1-14): a prefilled GitHub issue for a question or simulation.
 * Only the item id, title and a template go into the URL; no learner data.
 */
export const ISSUE_REPO = 'djaypratt23/CPA_Study_Program'

export function issueUrl(itemId: string, kind: 'question' | 'simulation', excerpt: string): string {
  const title = `Content issue: ${itemId}`
  const body = [
    `**Item:** \`${itemId}\` (${kind})`,
    `**Excerpt:** ${excerpt.replace(/\s+/g, ' ').slice(0, 140)}`,
    '',
    '**What looks wrong?** (wrong key, ambiguous wording, outdated rule, typo, other)',
    '',
    '**Your reasoning or source** (standard, code section, page):',
    '',
  ].join('\n')
  return `https://github.com/${ISSUE_REPO}/issues/new?${new URLSearchParams({ title, body, labels: 'content' }).toString()}`
}
