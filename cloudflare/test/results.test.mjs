import test from 'node:test';
import assert from 'node:assert/strict';
import { validResult } from '../src/results.js';

const result = () => ({
  attempt_uuid: '6fea9217-1234-4123-8123-123456789abc', game_id: 'elbow-goniometry',
  technical_score: 88, independence_score: 80, completed: true, attempts_in_game: 4,
  hints_used: 2, ai_used: true, ai_requests: 2, highest_scaffold_level: 'focused-hint',
  duration_seconds: 154, error_summary: ['axis-placement-error'], metrics: {},
});

test('accepts bounded formative results', () => assert.equal(validResult(result()), true));
test('rejects identity, transcripts, arbitrary metrics and malformed values', () => {
  for (const override of [
    { user_id: 1 }, { email: 'private@example.org' }, { technical_score: 101 },
    { technical_score: NaN }, { completed: 1 }, { attempts_in_game: 0 },
    { hints_used: -1 }, { ai_used: false }, { highest_scaffold_level: 'invented' },
    { metrics: { transcript: 'text' } }, { error_summary: ['private text'] },
    { error_summary: Array(33).fill('axis-error') }, { attempt_uuid: 'bad' },
  ]) assert.equal(validResult({ ...result(), ...override }), false, JSON.stringify(override));
});
test('typing metrics and unassisted results are supported', () => {
  assert.equal(validResult({ ...result(), game_id: 'typing-speed', ai_used: false,
    ai_requests: 0, highest_scaffold_level: 'none', metrics: { wpm: 52, accuracy: 96 } }), true);
});
