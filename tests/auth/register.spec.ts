// import {test} from '../fixtures/fixtures'
// import {expect} from '@playwright/test'
// import { ENDPOINTS } from '../../api/routes/endpoints' 
// import * as env from '../../utils/dotenv.loader'
// // import { PAYLOADS } from '../../api/routes/payloads'


// test('register user', async ({ baseClient }, testInfo) => {
//     const requiredTags = testInfo.annotations.some(
//         a => a.type === 'tag' && a.description === 'auth'
//     );
//     if (requiredTags) {
//         const response = await baseClient.post(ENDPOINTS.REGISTER, {
//             email: PAYLOADS.userNameToRegister,
//             password: PAYLOADS.passwordToRegister,
//             role: 'ADMIN',
//             username: 'doeh'
//         });

//         const responseBody = await response.json();
//     }
// });
