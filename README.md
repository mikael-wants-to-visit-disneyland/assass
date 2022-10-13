# Assassin implementation

The classic coding challenge _Assassins_ is an extension of the basic grid navigation problem, i.e., finding whether a path exists. In this case, there are guards whose sightlines act as additional walls.

There are two ways that the basic algorithm can be modified to account for this added complexity:

1. _Wall projection_: replace all guards and their sightlines with walls, and then apply the original algorithm.
2. _Dynamic checking_: at each step, after checking whether there is an empty space, check whether it is on a sightline.

This repo is an implementation of method 2. While 2. can be less efficient than 1. -- because in some cases it may check for sightlines that have already been checked in previous steps -- its benefit is simplicity: the code needed to precompute the walls and to insert them into the array is considerably gnarlier than the additions that 2. entails.
