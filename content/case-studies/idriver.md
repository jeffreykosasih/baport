---
title: iDriver
context: Self-initiated case study
year: 2026
order: 1
summary: >-
  Newspaper delivery drivers lost time between logging in and starting their
  route. I mapped the process from my own delivery shifts, found four pain
  points and proposed a flow with half the steps.
outcome: 2 steps from login to route instead of 4, with the compliance check asked once per shift.
role: Solo, self-initiated
methods:
  - BPMN process mapping
  - Requirements and MoSCoW
  - User stories with acceptance criteria
  - UAT planning
  - SQL
tools:
  - draw.io
  - SQL
deliverables:
  - As-is process map in BPMN, across drivers, the app and customer service
  - 10 requirements, prioritised with MoSCoW
  - 6 user stories with Given/When/Then acceptance criteria
  - A UAT plan with 4 drivers and 4 success measures, checked with SQL
# Check these steps against your draw.io map before you publish. They were
# read from the app screenshots and the 4-to-2 count on your resume.
processMap:
  title: 'iDriver: from login to route'
  caption: >-
    Drivers went through four steps after logging in before they could start
    their route, and the compliance check came back at every login. My proposed
    flow takes two, and asks for the check once per shift.
  lanes:
    - label: As-is
      end: Route open
      steps:
        - label: Log in
        - label: Confirm compliance
          note: Asked again at every login
          pain: true
        - label: Tap Select runs on an empty list
          pain: true
        - label: Choose distributor, depot and date
          pain: true
        - label: Pick today’s run
    - label: To-be
      end: Route open
      steps:
        - label: Log in
        - label: Confirm compliance
          note: First login of the shift only
        - label: Pick today’s run
          note: Today’s runs are already listed
---

## Context

I’ve driven early-morning newspaper routes for National Distribution Service in Melbourne. Drivers use the iDriver app to log in, load their run and record proof of delivery. I took this on myself: it’s a proposal, not a change NDS has made.

## The problem

Every extra tap happens in the driver’s seat, while the papers are still in the van. Mapping the current process turned up four pain points, including:

1. The compliance check came back at every login, not once per shift.
2. Today’s runs stayed hidden until the driver searched by distributor, depot and date.
3. Proof-of-delivery photos weren’t clearly tied to the address they belonged to, which matters when a customer complains.

> [!TODO] Add your fourth pain point to the list above.

> [!TODO] Add the as-is BPMN map. Export it from draw.io as SVG into `public/case-studies/idriver/` and add it here with `![As-is process map](/case-studies/idriver/as-is.svg)`.

## What I did

- Mapped the current process in BPMN (draw.io) across three lanes: drivers, the app and customer service, drawing on first-hand delivery work.
- Wrote 10 requirements, prioritised with MoSCoW, and 6 user stories with Given/When/Then acceptance criteria.
- Designed the flow around the run instead of the menu: map and list together, with package counts and delivered status on every stop.

> [!TODO] Add the requirements as a table (ID, requirement, MoSCoW) and two or three user stories with their acceptance criteria.

## The proposed flow

Two steps from login to route instead of four. The compliance check is asked at the first login of a shift, and today’s runs are already listed when the driver opens the app.

![Proposed screens: sign in, the compliance check, and runs listed by date](/case-studies/idriver/proposed-screens.png)

## How I’d test it

I planned UAT with 4 drivers and set 4 success measures, then tested the measures with SQL on a practice dataset of 32 drivers over 12 weeks.

> [!TODO] List the 4 success measures and show one SQL query with its result.

## Result

Drivers who walked through my prototype understood the flow from the first screen.

> [!TODO] Say how many drivers tried the prototype, then add what you’d do differently next time.
