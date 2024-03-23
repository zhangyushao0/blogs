<script lang="ts">
	import '../tailwind.css';
	import NavBar from '$components/nav_bar.svelte';
	import Footer from '$components/footer.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<NavBar />
	<slot />
	<Footer />
</div>
