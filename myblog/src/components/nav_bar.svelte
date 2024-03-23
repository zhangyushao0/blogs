<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<div class="navbar bg-base-200 flex justify-between">
	<div>
		<a href="/" class="btn btn-ghost text-5xl">🐙</a>
		<span class="text-sm hidden sm:flex">章鱼烧的小站</span>
	</div>
	<div class="flex-1 justify-center">
		<div class="form-control">
			<input type="text" placeholder="🔍搜索" class="input input-bordered w-24 md:w-auto" />
		</div>
	</div>
	<div class="dropdown dropdown-end">
		<div tabindex="0" role="button" class="btn btn-ghost sm:hidden">☰</div>
		<ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-24">
			<li>
				<a href="/blogs">博客</a>
			</li>
			<li>
				<a href="/about">关于我</a>
			</li>
			<li class="justify-center">
				<button data-toggle-theme="dark,light" data-act-class="ACTIVECLASS">🌓</button>
			</li>
		</ul>
	</div>
	<div class="hidden sm:flex">
		<ul class="menu menu-horizontal px-1">
			<li>
				<a href="/blogs">博客</a>
			</li>
			<li>
				<a href="/about">关于我</a>
			</li>
			<li>
				<button data-toggle-theme="dark,light" data-act-class="ACTIVECLASS" class="">🌓</button>
			</li>
		</ul>
	</div>
</div>
