

export async function GET({ params }) {
    const { image } = params;

    // 这里，我们将请求转发到Axum后端服务
    const backendUrl = `http://localhost:3000/api/blog/image/${image}`;

    // 使用fetch API向Axum服务发起请求
    const response = await fetch(backendUrl);
    // 将Axum服务的响应直接转发给客户端
    // 注意：你可能需要处理不同的响应状态和错误处理
    const imageBuffer = await response.arrayBuffer();

    return new Response(imageBuffer, {
        headers: {
            'Content-Type': response.headers.get('Content-Type'),
        },
    });
}
