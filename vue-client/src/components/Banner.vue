<template>
  
    <v-banner
      lines="one"
      color="#FFB86F"
    >
      <v-banner-text
      class="ml-15"
      >
        New to Instructor Scheduler? Watch this video tutorial to get started
      </v-banner-text>

      <template v-slot:actions>
        <v-btn
        class="mr-15 mb-1"
        >Tutorial Video</v-btn>
      </template>
    </v-banner>
      

</template>

<script>
  export default {
    name: 'Navbar',
    data: () => ({
     
    
    }),
  }
</script>

<style>
.navbar-title {
  left: 50%;
}

</style>