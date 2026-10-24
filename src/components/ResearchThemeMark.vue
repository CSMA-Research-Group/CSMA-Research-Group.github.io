<template>
  <svg class="research-theme-mark" viewBox="0 0 72 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <template v-if="id === 'artificial-intelligence'">
      <path d="M31 12c-11-7-22 5-16 14-9 6-6 19 3 20-1 9 11 13 17 7V14m6-2c11-7 22 5 16 14 9 6 6 19-3 20 1 9-11 13-17 7V14" />
      <path d="m22 20 8 9-8 10 8 9m20-28-8 9 8 10-8 9M22 39h28M30 29h12" opacity=".5" />
      <g fill="currentColor" stroke="none"><circle cx="22" cy="20" r="2.6"/><circle cx="30" cy="29" r="2.6"/><circle cx="22" cy="39" r="2.6"/><circle cx="30" cy="48" r="2.6"/><circle cx="50" cy="20" r="2.6"/><circle cx="42" cy="29" r="2.6"/><circle cx="50" cy="39" r="2.6"/><circle cx="42" cy="48" r="2.6"/></g>
    </template>
    <template v-else-if="id === 'intelligent-software-engineering'">
      <rect x="10" y="9" width="52" height="37" rx="4"/><path d="M10 18h52M28 46v9m16-9v9H28m-7-1h30M27 25l-7 6 7 6m18-12 7 6-7 6m-6-14-6 16"/>
      <g fill="currentColor" stroke="none"><circle cx="16" cy="13.5" r="1"/><circle cx="20" cy="13.5" r="1"/><circle cx="24" cy="13.5" r="1"/></g>
    </template>
    <template v-else-if="id === 'intelligent-robotics'">
      <path d="M13 55h33v-5H13zM20 50v-9l13-16m-5-4L14 39v11m22-24 13-9-5-8-16 10m18-9 9 7 4 10m-6-6-5 7 2 5m9-6 4 5-2 5"/>
      <circle cx="31" cy="23" r="5"/><circle cx="46" cy="13" r="4"/><circle cx="18" cy="42" r="4"/><path d="m52 47 7-4 7 4v9l-7 4-7-4zm0 0 7 4 7-4m-7 4v9" opacity=".6"/>
    </template>
    <template v-else>
      <rect x="7" y="10" width="21" height="17" rx="3"/><rect x="43" y="10" width="21" height="17" rx="3"/><rect x="25" y="42" width="21" height="15" rx="3"/>
      <path d="M28 18h15m-25 9v7l17 8m19-15v7l-18 8M13 16h9m-9 5h5m31-5h9m-9 5h5m-23 27h9m-9 4h5"/>
      <circle cx="35.5" cy="18" r="2.5" fill="currentColor"/>
    </template>
  </svg>
</template>

<script setup>
defineProps({ id: { type: String, required: true } })
</script>
