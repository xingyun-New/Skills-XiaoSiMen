import axios from 'axios';

const FLYSITE_CONFIG = {
    appToken: process.env.FLYSITE_APP_TOKEN || 'AKF2bHBDVaEfEpsCLggc3mUSnyb',
    wrongTableId: process.env.FLYSITE_WRONG_TABLE_ID || 'tbl19eeA1CCNw2NH',
    appId: process.env.FLYSITE_APP_ID || 'cli_a92481440eb81bb4',
    appSecret: process.env.FLYSITE_APP_SECRET || 'vtuXWbgg8xLKPnZErTMLZc3jmLiJgiCo'
};

async function getTenantAccessToken() {
    const response = await axios.post(
        'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
        { app_id: FLYSITE_CONFIG.appId, app_secret: FLYSITE_CONFIG.appSecret }
    );
    if (response.data.code === 0) {
        return response.data.tenant_access_token;
    }
    throw new Error(`获取 Token 失败：${response.data.msg}`);
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).json({ message: 'CORS preflight' });
    }

    if (req.method === 'POST') {
        try {
            const { practiceTitle, practiceUrl, subject, wrongQuestions } = req.body;
            console.log('📝 收到错题记录:', practiceTitle, '共', wrongQuestions?.length, '题');

            if (!wrongQuestions || wrongQuestions.length === 0) {
                return res.status(200).json({ success: true, message: '无错题', created: 0 });
            }

            const token = await getTenantAccessToken();
            const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${FLYSITE_CONFIG.appToken}/tables/${FLYSITE_CONFIG.wrongTableId}/records/batch_create`;

            const records = wrongQuestions.map(q => ({
                fields: {
                    '练习标题': practiceTitle || '未知练习',
                    '题目内容': q.question || '',
                    '正确答案': q.correctAnswer || '',
                    '学生答案': q.studentAnswer || '',
                    '知识点': q.topic || '',
                    '易错提醒': q.commonMistake || '',
                    '学科': subject || '',
                    '难度': q.difficulty || 0,
                    'HTML 链接': practiceUrl
                        ? { text: practiceTitle || '在线练习', link: practiceUrl }
                        : undefined
                }
            }));

            const response = await axios.post(url, { records }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.code === 0) {
                const created = response.data.data.records?.length || 0;
                console.log('✅ 错题写入成功:', created, '条');
                return res.status(200).json({ success: true, message: '错题同步成功', created });
            } else {
                console.error('❌ 错题写入失败:', response.data);
                return res.status(500).json({ success: false, error: response.data.msg });
            }
        } catch (error) {
            console.error('❌ 错题同步错误:', error);
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
