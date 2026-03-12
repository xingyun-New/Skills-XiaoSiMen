import axios from 'axios';

const FLYSITE_CONFIG = {
    appToken: process.env.FLYSITE_APP_TOKEN || 'AKF2bHBDVaEfEpsCLggc3mUSnyb',
    tableId: process.env.FLYSITE_TABLE_ID || 'tblOy4VZZ5L1baTP',
    appId: process.env.FLYSITE_APP_ID || 'cli_a92481440eb81bb4',
    appSecret: process.env.FLYSITE_APP_SECRET || 'vtuXWbgg8xLKPnZErTMLZc3jmLiJgiCo'
};

/**
 * 获取 tenant_access_token
 */
async function getTenantAccessToken() {
    const response = await axios.post(
        'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
        {
            app_id: FLYSITE_CONFIG.appId,
            app_secret: FLYSITE_CONFIG.appSecret
        }
    );
    
    if (response.data.code === 0) {
        return response.data.tenant_access_token;
    } else {
        throw new Error(`获取 Token 失败：${response.data.msg}`);
    }
}

/**
 * Vercel Serverless Function 入口
 */
export default async function handler(req, res) {
    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // 处理 OPTIONS 预检请求
    if (req.method === 'OPTIONS') {
        return res.status(200).json({ message: 'CORS preflight' });
    }
    
    // 处理 POST 请求
    if (req.method === 'POST') {
        try {
            const recordData = req.body;
            console.log('📝 收到答题记录:', recordData);
            
            const token = await getTenantAccessToken();
            
            const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${FLYSITE_CONFIG.appToken}/tables/${FLYSITE_CONFIG.tableId}/records`;
            
            const fields = {
                '初中练习题 - 答题记录': recordData.practiceTitle || '未知练习',
                '练习标题': recordData.practiceTitle || '未知练习',
                '题目数量': recordData.questionCount || 0,
                '得分': recordData.score || 0,
                '正确率': recordData.accuracy || 0,
                'HTML 链接': {
                    text: '在线练习',
                    link: recordData.practiceUrl || 'https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/english-passive-comprehensive.html'
                }
            };
            
            const response = await axios.post(
                url,
                { fields },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            
            if (response.data.code === 0) {
                const recordId = response.data.data.record?.record_id || response.data.data.record_id;
                console.log('✅ 记录创建成功:', recordId);
                return res.status(200).json({
                    success: true,
                    recordId,
                    message: '同步成功'
                });
            } else {
                console.error('❌ 创建失败:', response.data);
                return res.status(500).json({
                    success: false,
                    error: response.data.msg
                });
            }
        } catch (error) {
            console.error('❌ 同步错误:', error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
    
    // 其他方法
    return res.status(405).json({ error: 'Method Not Allowed' });
}
