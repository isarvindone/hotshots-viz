<script>
  import "../app.css";
</script>
<div class="w-full h-screen bg-gray-100">
  <div class="mx-auto flex flex-wrap p-3 flex-row bg-white text-gray-600 shadow-md items-center">
    <button class="inline-flex items-center py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-sm focus:shadow-lg hover:bg-gray-200 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500">
      <svg class="w-6 h-6 mr-2 fill-current text-gray-700" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24"><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"/></svg>
      About
    </button>  
    <span class="flex-grow"></span>
    <span class="text-xl uppercase tracking-widest">Hotshots</span>
    <span class="flex-grow"></span>
    <button class="inline-flex items-center py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-sm focus:shadow-lg hover:bg-gray-200 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500">
      <svg class="w-6 h-6 mr-2 fill-current text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>      
      Help
    </button>  
  </div>
<slot />
</div>