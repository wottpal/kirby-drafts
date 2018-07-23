<?php

Kirby::plugin('wottpal/drafts', [
  'fields' => [
    'drafts' => [
      'computed' => [
        'allDrafts' => function () {
          $drafts = [];

          foreach(site()->index()->drafts() as $draft) {
              $drafts[] = [
                'id'    => $draft->id(),
                'parent'=> $draft->parent()->id(),
                'image' => [
                  'url' => $draft->image() ? $draft->image()->url() : ""
                ]
              ];
          }

          return $drafts;
        }
      ]
    ],
  ]
]);
