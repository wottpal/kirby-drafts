<?php

Kirby::plugin('wottpal/drafts', [
  'fields' => [
    'drafts' => [
      'computed' => [
        'allDrafts' => function () {
          $drafts = [];

          foreach(site()->index() as $page) {
            foreach($page->drafts() as $draft) {
              $drafts[] = [
                'id'    => $draft->id(),
                'link'  => "pages/" . $draft->id(),
                'text'  => $draft->title()->value(),
                'info'  => $draft->parent()->title()->value(),
                'parent'=> $draft->parent()->id(),
                'image' => [
                  'url' => $draft->image() ? $draft->image()->url() : ""
                ]
              ];
            }
          }

          return $drafts;
        }
      ]
    ],
  ]
]);
