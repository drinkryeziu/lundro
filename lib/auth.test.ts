import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, verifyPassword } from './auth-hash.ts';

test('password hash verifies only the right password', () => {
  const h = hashPassword('correct horse');
  assert.ok(verifyPassword('correct horse', h));
  assert.ok(!verifyPassword('wrong', h));
  assert.ok(!verifyPassword('x', null));
});

test('hashes are salted', () => {
  assert.notEqual(hashPassword('same'), hashPassword('same'));
});
