const express = import ('express');
const axios = import ('axios');
const router = express.Router();

const REST_API_KEY = '64be66bae7cf607109010e012715b3e6';
const REDIRECT_URI = 'http://localhost:5173/oauth/kakao/callback';

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
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token } = tokenRes.data;

    const userRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // 로그인 성공 후 사용자 정보 처리
    console.log('User Info:', userRes.data);

    res.json(userRes.data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Kakao OAuth Error');
  }
});

export default router;
