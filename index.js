panel.plugin("wottpal/drafts", {
  fields: {
    drafts: {
      props: {
        allDrafts: Array,
        exclude: Array,
        layout: String
      },
      data: function() {
        return {
          drafts: []
        }
      },
      mounted: function () {
        this.initDrafts()
      },
      methods: {
        initDrafts() {
          // Add options, status, link, flag
          const drafts = this.allDrafts.map(draft => {
            return this.$api.pages.get(draft.id, "status").then(response => {
              draft.info = response.id
              draft.text = response.title
              draft.status = response.status
              draft.link = this.$api.pages.link(draft.id)
              draft.flag = {
                click: () => { this.$refs.status.open(draft.id) },
                icon: "circle",
                class: "kirby-status-flag kirby-status-flag-draft",
              }
              return draft
            })
          })

          Promise.all(drafts).then(drafts => {
            this.drafts = drafts.filter(draft => {
              // Filter out non-drafts (status changed)
              if (draft.status != 'draft') return false

              // Filter out all excluded pages
              if (!this.exclude) return true
              if (this.exclude.includes(draft.parent)) return false
              if (this.exclude.includes(draft.id)) return false

              return true
            })
          })

        }
      },

      template: `
      <kirby-field v-bind="$attrs" v-if="drafts.length">

      <kirby-collection :items="drafts" :sortable="false" :layout="layout" />

      <kirby-page-status-dialog ref="status" @success="initDrafts" />

      </kirby-field>
      `
    }
  }
});
