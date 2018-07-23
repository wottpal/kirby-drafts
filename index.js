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

        <kirby-collection :items="drafts" :sortable="false" :layout="layout" />

        </kirby-field>
      `
    }
  }
});
