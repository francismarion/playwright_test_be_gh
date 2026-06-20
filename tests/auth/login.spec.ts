import { expect } from '@playwright/test';
import { PASSWORD, USERNAME } from '../../helpers/dotenv-loader';
import { test } from '../fixtures/fixtures';
import { Assertions } from '../../utils/assertions';

test('login user', async ({ authWorkflow }) => {
  const { response, token } = await authWorkflow.loginAndGetToken(
    USERNAME,
    PASSWORD
  );

  expect(typeof token).toBe('string')
});