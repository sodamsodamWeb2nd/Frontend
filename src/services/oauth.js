import express from 'express';
import axios from 'axios';
const router = express.Router();

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const REDIRECT_URI =
  import.meta.env.VITE_KAKAO_REDIRECT_URI ||
  'http://localhost:5173/oauth/kakao/callback';

router.get('/oauth/kakao', async (req, res) => {
  const { code } = req.query;

  try {
    const tokenRes = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    const { access_token } = tokenRes.data;

    const userRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // TODO: 로그인 성공 후 사용자 정보 처리 로직 구현
    res.json(userRes.data);
  } catch (err) {
    console.error('Kakao OAuth Error:', err.message);
    res.status(500).send('Kakao OAuth Error');
  }
});

export default router;
