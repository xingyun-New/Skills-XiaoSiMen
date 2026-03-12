// 健康检查端点
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    return res.status(200).json({
        status: 'ok',
        message: '飞书同步服务运行中',
        timestamp: new Date().toISOString()
    });
}
