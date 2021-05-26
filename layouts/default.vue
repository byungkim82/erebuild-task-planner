<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-system-bar window dark :color="systemBar.color">
          <v-icon color="white">{{ systemBar.icon }}</v-icon>
          <span class="white--text font-weight-medium mr-2">{{
            systemBar.title
          }}</span>
        </v-system-bar>
        <v-tabs
          v-model="currentTab"
          height="32"
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
            >{{ index > 0 ? `${index}:` : '' }} {{ tab.name }}</v-tab
          >
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
      tabs: [
        {
          name: 'Overview',
          to: '/',
        },
        {
          name: 'Space Needed',
          to: '/space-needed',
        },
        {
          name: 'Space Provided',
          to: '/space-provided',
        },
        {
          name: 'Space Comparison',
          to: '/space-comparison',
        },
        {
          name: 'Practice',
          to: '/allocating-practice',
        },
      ],
      currentTab: 0,
      tabColor: 'light-blue lighten-4',
      systemBar: {
        color: 'light-blue',
        icon: 'mdi-home-group',
        title: 'Allocating',
      },
    }
  },
}
</script>
