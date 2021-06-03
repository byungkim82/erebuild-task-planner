<template>
  <v-app>
    <v-main>
      <v-container fluid class="py-0 px-0">
        <v-system-bar window dark :color="systemBar.color">
          <v-icon color="white">{{ systemBar.icon }}</v-icon>
          <span class="white--text font-weight-medium mr-2">{{
            systemBar.title
          }}</span>
        </v-system-bar>
        <v-tabs
          v-model="currentTab"
          height="48"
          centered
          fixed-tabs
          :background-color="tabColor"
        >
          <v-tab
            v-for="(tab, index) in tabs"
            :key="'tab-' + index"
            :nuxt="true"
            :to="tab.to"
            style="font-size: 11px"
            >{{ index > 0 ? `${index}:` : '' }} {{ tab.name }}
            <v-badge
              :color="tab.checked ? 'primary' : ''"
              :icon="tab.checked ? 'mdi-check' : ''"
            ></v-badge>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="currentTab">
          <v-tab-item
            v-for="(tab, index) in tabs"
            :key="'tabItem-' + index"
            :value="tab.to"
          >
            <v-card>
              <nuxt keep-alive></nuxt>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 0,
      tabColor: 'light-blue lighten-4',
      systemBar: {
        color: 'light-blue',
        icon: 'mdi-home-group',
        title: 'Allocating',
      },
    }
  },
  computed: {
    tabs() {
      return this.$store.state.phases
    },
  },
}
</script>
