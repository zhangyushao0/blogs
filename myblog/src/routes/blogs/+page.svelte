<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	let currentPage = 1;
	const pageSize = 5; // 每页显示的记录数
	$: totalPages = Math.ceil(data.metas.length / pageSize);
	$: paginatedData = data.metas.slice((currentPage - 1) * pageSize, currentPage * pageSize);

	function goToPage(page: number) {
		currentPage = Math.max(1, Math.min(page, totalPages));
	}
</script>

<div class="flex flex-col mt-8">
	{#if paginatedData.length > 0}
		<div class="space-y-4">
			{#each paginatedData as meta}
				<div class="card bg-base-200 shadow-xl card-body mx-auto max-w-4xl">
					<a href={'/blogs/' + meta.link} class="block">
						<h2 class="card-title">{meta.title}</h2>
						<h2 class="card-title text-sm font-light">{meta.date}</h2>
						<p>{meta.summary}</p>
					</a>
				</div>
			{/each}
		</div>

		<!-- 分页控件，使用 flex 和 justify-center 来居中 -->
		<div class="flex justify-center mt-8">
			<button
				on:click={() => goToPage(currentPage - 1)}
				disabled={currentPage === 1}
				class="btn"
				aria-label="Go to previous page">←</button
			>
			<div class="btn" aria-disabled="true">{currentPage} / {totalPages}</div>
			<button
				on:click={() => goToPage(currentPage + 1)}
				disabled={currentPage === totalPages}
				class="btn"
				aria-label="Go to next page">→</button
			>
		</div>
	{:else if data.error}
		<div class="alert alert-error">{data.error}</div>
	{:else}
		<div class="alert alert-warning">No data found</div>
	{/if}
</div>
