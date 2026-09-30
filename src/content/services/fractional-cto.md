---
title: "Fractional CTO"
description: "Kyle Teague provides fractional CTO services: technology strategy, engineering leadership, architecture, and infrastructure optimization for growing companies."
headline: "From prototype to launch"
introduction: "I help early-stage companies turn prototypes into launchable products and get existing MVPs into customers’ hands. As a fractional CTO, I help you decide what to build, what can wait, and how to ship with the team and budget you have."
contactText: "Share your company’s stage, the team you have today, and the decisions you need help making. We’ll discuss what level of involvement makes sense."
---

## Why hire a fractional CTO?

The biggest reason to hire a fractional CTO is to **prevent bad technical decisions**. These decisions could be anything from choosing the wrong technology stack to designing an architecture that becomes expensive or impossible to scale.

An experienced CTO helps you weigh those decisions against your budget, your team, and the stage of your business. On a part-time basis, I can help you set a technical direction, support your engineers, and keep the work focused on what your company needs next.

## How I can help

### Technology direction

Turn business priorities into a practical technical roadmap. Evaluate architecture, build-versus-buy decisions, and the tradeoffs involved in modernizing an existing product.

### Engineering leadership

Help your team establish clear ownership, improve delivery, and hire well. Work with founders and engineering teams to align technical decisions with the needs of the business.

### Systems and operating costs

Review infrastructure, reliability, and security priorities. Find opportunities to simplify systems, reduce recurring costs, and bring AI into workflows where it solves a real problem.

## What I've shipped

### OnFrontiers

I joined [OnFrontiers](https://www.onfrontiers.com) as the last cofounder and CTO. When I arrived, the company had a small Ruby on Rails app that an intern had cobbled together. It consisted of a marketing site and a few intake forms for customers. I was convinced Ruby on Rails was not the future of the web and that our setup was going to make it harder to hire developers. I slowly migrated us from the existing site to a new architecture based on a Go API and a React frontend. This created a clear distinction between the backend and frontend, which enabled us to take advantage fof the latest frontend tooling and hire frontend specialists. Most of the original architecture is still intact and feels relevant to this day!

Another problem when I arrived was the lack of DevOps. I had previously learned that complicating DevOps at this early stage was a very costly mistake both in terms of time and money. Instead of developing an elaborate AWS architecture, I developed Ansible scripts that deployed everything in Docker containers to a single EC2 instance. This allowed us to keep our AWS costs down and avoid needing a dedicated DevOps engineer.

### SonicCloud

I worked with [SonicCloud](https://www.soniccloud.com) to help ship the first version of their hearing aid app. When I arrived, they had a prototype based on FreeSWITCH and an elaborate architecture involving several complicated microservices for processing streaming audio. Although the architecture was technically sound, I knew the company didn’t have the money or time to implement and test all that code.

I managed to convince them to set aside the complicated architecture for now and ship the first version based on the working prototype. Instead of spending months building out the architecture, they could get to market sooner and get validation from real customers, even if the initial version was inefficient and a little hacky.

I also convinced them to use Docker, which was brand-new at the time, despite strong initial skepticism. Ten years later, the SonicCloud app is still operating and has gone on to win several awards!

### Thomson Reuters

I was dropped into a skunkworks team at [Thomson Reuters](https://www.thomsonreuters.com) to build out a messaging server to replace Microsoft Live Communication Server (LCS) they were serving to their 200,000 financial professionals. Thomson Reuters wanted to avoid paying millions to Microsoft every year for a site license and they wanted a messaging backend they could modify to compete with Bloomberg. They initially budgeted $200 million for the project but after a year, 200 people working on the project, and $30 million spent they didn't even have a prototype. Given the lack of progress a worried project manager organized a small team of contractors to build out a second messaging server as insurance. I was placed on that team and in a few months we were able to demonstrate a prototype and eventually launch the new server named Nitro into production. It was the largest deployment of Go outside of Google at the time.

### GetGlue

After a year at [GetGlue](https://en.wikipedia.org/wiki/Tvtag) working in data science, I was promoted to VP of Engineering to lead a team of 14 engineers. My first big project was building a social TV guide for our 4 million users. Instead of building on the existing monolithic Java infrastructure, which was encumbered with technical debt, I convinced the CEO to build a separate microservice in Python, which was an up-and-coming language at the time for backend services. We were able to ship the guide in record time. The guide was later featured in the [Los Angeles Times](https://www.latimes.com/business/la-xpm-2012-aug-24-la-fi-tn-tv-guide-mobile-and-getglue-program-guide-apps-20120823-story.html), [ABC News](https://abcnews.com/blogs/technology/2012/08/get-glue-hd-simplifies-finding-whats-on-tv), and [Adweek](https://www.adweek.com/performance-marketing/getglue-social-tv-guide/). GetGlue was later acquired by [i.TV](https://en.wikipedia.org/wiki/I.TV) and rebranded as [tvtag](https://tvtag.com).

### Northrop Grumman

While at [Northrop Grumman](https://www.northropgrumman.com), I did the principal work on a research project called Hector that performed real-time intrusion detection. I wrote the code that extracted system calls from the KVM hypervisor using a trick involving fake page faults. The system calls were then fed into a machine learning algorithm based on gradient-boosted decision trees to detect threats. We were famously even able to detect Stuxnet. Northrop Grumman later productized the technology.
