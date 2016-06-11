# Design decisions so far

## Umbrella project with nested subprojects

This is an umbrella project using subprojects (with subprojects).
* The good thing is: Alone this projects can be used together with the ACDH servers to
  get a virtual research environment for language comparison up in a second.
* The bad thing is: the tight coupling to a particular revision (SHA value) in the
  other repositories proved not to be flexible enough. Most of our real projects
  follow master in all subprojects.
