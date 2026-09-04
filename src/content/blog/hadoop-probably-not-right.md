---
title: "Why Hadoop Probably Isn't Right For Your Problem"
description: "When Hadoop MapReduce is useful—and why many problems are better solved without it."
pubDate: "2011-10-14T00:00:00Z"
draft: true
tags:
  - hadoop
  - mapreduce
---

Hadoop is an interesting project, but I believe there are rare cases where it is useful. It is really meant for embarassingly parallel I/O bound “Big Data” problems. It has become a solution looking for a problem. I experienced and have heard of many companies building up huge Hadoop clusters just to have them site there and use it for marketing.

Problems where Hadoop MapReduce is useful:

- **Embarassingly Parallel.** Splitting up the problem gives a linear speed-up, in other words, N machines makes it go N times faster.
- **I/O Bound.** Most of the time is spent reading off the disk, not necessarily doing any intense computations.
- **Big Data.** The problem can no longer fit in a reasonable amount of memory or you project that it won't soon. I'd say 100GB minimum. Personally, I would rather use two EC2 64GB memory instances than manage a Hadoop cluster.

Unless you can really justify using Hadoop based on two or more of the above qualifications I'd avoid it, and here's why:

- **Hadoop is a pain to manage.** Several XML config files and Java memory settings to deal with and poor documentation to boot. Elastic MapReduce may be a good option here, but Amazon charges 20% extra to do it for you.
- **Application development is slow.** Setting up your development environment is slow and distributed applications are difficult to debug. The Java language also has become persona non grata around many developers now. APIs for other languages are clunky and built on top of thrift.
- **Java is slow.** Java is much faster than it used to be, but it's still slow. A well written C or C++ program on a single machine can easily calculate many CPU-bound problems in the same time it takes a 10-node Hadoop cluster to do so.
