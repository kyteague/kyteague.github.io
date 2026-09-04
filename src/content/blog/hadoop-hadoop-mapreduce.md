---
title: "Hadoop != Hadoop MapReduce"
description: "Hadoop is a distributed processing framework, not just its MapReduce implementation."
pubDate: "2011-10-14T00:00:00Z"
draft: true
tags:
  - hadoop
  - mapreduce
---

One of the biggest misnomers I see is “Hadoop.” Too often people say Hadoop when they actually mean Hadoop MapReduce. Hadoop is what you get when you remove HDFS, MapReduce, and of course, any of the related projects.

At the core, Hadoop is a distributed processing framework. It includes a scheduler and some classes for easy serialization of data across the network.
