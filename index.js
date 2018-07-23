panel.plugin("wottpal/drafts", {
  fields: {
    drafts: {
      props: {
        allDrafts: Array,
        exclude: Array,
        layout: String
      },
      data: function () {
        return {
          drafts: this.allDrafts.filter(draft => {
            if (!this.exclude) return true

            if (this.exclude.includes(draft.parent)) return false
            if (this.exclude.includes(draft.id)) return false

            return true
          })
        };
      },
      template: `
        <kirby-field v-bind="$attrs">

        <kirby-cards v-if="layout == 'cards'">
            <kirby-card v-for="page in drafts" :key="page.id" v-bind="page" />
        </kirby-cards>

        <kirby-list v-else>
            <kirby-list-item v-for="page in drafts" :key="page.id" v-bind="page" />
        </kirby-list>

        </kirby-field>
      `
    }
  }
});
