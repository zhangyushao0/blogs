import type { PageServerLoad } from './$types';
import type { Post } from '$types/blog';
export const load: PageServerLoad = async ({ params }) => {
	const { link } = params;
	try {
		const response = await fetch(`http://localhost:3000/api/blog`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ link })
		});

		// 检查响应的状态码
		if (!response.ok) {
			// 抛出错误，包括状态码和状态文本
			const text = await response.text();
			throw new Error(`Error from server: ${response.status} ${response.statusText} ${text}`);
		}

		const post: Post = await response.json();
		return { post };
	} catch (error) {
		// 处理错误情况
		console.error("Fetching error:", error);
		return { status: 500, error: error.message };
	}
};
