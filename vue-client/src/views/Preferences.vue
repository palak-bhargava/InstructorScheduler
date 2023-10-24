<template>
        <v-card
            max-width="500"
            flat
            class="ma-8 pa-8"
        >
        <v-card-title>
            Course Search
        </v-card-title>
            <v-row>
            <v-col cols="12">
                <v-autocomplete
                v-model="values"
                :items="items"
                filled
                rounded
                outlined
                background-color = "#5C9970"
                label="Course Number"
                color = "white"
                class = "small-autocomplete"
                ></v-autocomplete>
            </v-col>
            </v-row>
        </v-card>
  </template>

  <script>
    export default {
    data: () => ({
      items: ['CS 4348', 'CS 4347', 'CS 4349', 'CS 4375'],
      values: ['CS 4348'],
      value: null,
    }),
  }
</script>