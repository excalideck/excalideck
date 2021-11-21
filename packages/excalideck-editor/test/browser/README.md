# Note on the ExcalideckEditor component scenario tests

The scenario tests in this directory only use visual comparisons of snapshots
for assertions. This approach has some pros and cons.

Pros:

- it's easy to write assertions: just call the
  `ExcalideckEditorPage.expectToSee` method
- it's easy to verify that assertions are correct: just verify that the snapshot
  satisfies the conditions passed to `ExcalideckEditorPage.expectToSee`

Cons:

- even minor style changes can break all tests
- visual assertions are not fine-grained (you don't just verify the one thing
  you're interested in verifying, you verify that all the page looks ok)
- when a snapshot is (re)generated, the developer has to remember to (re)verify
  that the snapshot satisfies the conditions passed to
  `ExcalideckEditorPage.expectToSee`
