<script>
  import "../app.css";
  import Modal from 'svelte-simple-modal';
  import AboutContent from "$lib/components/AboutContent.svelte";
  import HelpContent from "$lib/components/HelpContent.svelte";
</script>
<Modal>
<div class="w-full h-screen bg-gray-100">
  <div class="mx-auto flex flex-wrap p-3 flex-row bg-white text-gray-600 shadow-md items-center fixed z-40 w-full">
      <AboutContent />
    <span class="flex-grow"></span>
    <span class="text-xl uppercase tracking-widest">Hotshots</span>
    <span class="flex-grow"></span>
    <HelpContent />
  </div>
<slot />
</div>
</Modal>
