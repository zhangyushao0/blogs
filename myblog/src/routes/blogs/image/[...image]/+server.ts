export async function GET({ params }) {
    // 当使用[...image]+.svelte时，params.image将是一个数组
    const imagePath = Array.isArray(params.image) ? params.image.join('/') : params.image;
    
    // 构建转发到Axum后端服务的URL，正确处理嵌套路径
    const backendUrl = `http://localhost:3000/api/blog/image/${imagePath}`;

    // 使用fetch API向Axum服务发起请求
    const response = await fetch(backendUrl);
    if (!response.ok) {
        // 如果响应状态不是2xx，可以返回一个错误或者自定义的响应
        // 这里只是简单地返回了一个404状态，你可以根据需要进行更复杂的错误处理
        return new Response('Image not found', { status: 404 });
    }

    // 将Axum服务的响应直接转发给客户端
    const imageBuffer = await response.arrayBuffer();

    return new Response(imageBuffer, {
        headers: {
            'Content-Type': response.headers.get('Content-Type'),
        },
    });
}
