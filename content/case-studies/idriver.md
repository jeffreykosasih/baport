---
title: iDriver
context: Self-initiated case study
kind: Process improvement
coverArt: flow
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

Every extra tap happens in the driver’s seat, while the papers are still in the van. Mapping the current process turned up four pain points:

1. The compliance check came back at every login, not once per shift.
2. Today’s runs stayed hidden until the driver searched by distributor, depot and date.
3. Proof-of-delivery photos weren’t clearly tied to the address they belonged to, which matters when a customer complains.
4. The map and the stop list were on separate screens, so drivers had to flip between them.

The process map above covers the first two, between login and the route.

> [!TODO] Add the as-is BPMN map. Export it from draw.io as SVG into `public/case-studies/idriver/` and add it here with `![As-is process map](/case-studies/idriver/as-is.svg)`.

## What I did

- Mapped the current process in BPMN (draw.io) across three lanes: drivers, the app and customer service, drawing on first-hand delivery work.
- Wrote 10 requirements, prioritised with MoSCoW, and 6 user stories with Given/When/Then acceptance criteria.
- Designed the flow around the run instead of the menu: map and list together, with package counts and delivered status on every stop.

### Requirements

Each one written so it can be tested, and prioritised with MoSCoW.

| ID | Requirement | Priority |
| --- | --- | --- |
| R1 | Show the driver’s runs for today on the first screen after login, with no search | Must |
| R2 | Ask for the compliance check at the first login of a shift, not at every login | Must |
| R3 | Save each compliance confirmation with the driver, date and time | Must |
| R4 | Tie every proof-of-delivery photo to the address of the stop it was taken at | Must |
| R5 | Take a driver from login to their route in no more than two steps | Must |
| R6 | Show the run as a map and as a list on the same screen | Should |
| R7 | Show the package count and delivered status on every stop | Should |
| R8 | Let customer service find a delivery photo by address and date | Should |
| R9 | Keep working when mobile reception drops mid-run, and sync when it returns | Should |
| R10 | Show yesterday’s performance before the driver leaves the depot | Could |

### User stories

Three of the six, with their acceptance criteria.

**Start the run without searching**

As a driver, I want today’s runs listed when I open the app, so that I can start my route straight away.

- Given I have runs assigned for today, when I log in, then my runs for today are listed on the first screen.
- Given I have no runs assigned today, when I log in, then I see a message saying so.

**Confirm compliance once per shift**

As a driver, I want to confirm compliance once at the start of my shift, so that I don’t repeat it every time I log in.

- Given it’s my first login of the shift, when I log in, then I’m asked to confirm compliance before I see my runs.
- Given I already confirmed compliance this shift, when I log in again, then I go straight to my runs.

**Back up a delivery with evidence**

As a customer service officer, I want each delivery photo linked to its address, so that I can answer a complaint with evidence.

- Given a driver takes a photo at a stop, when the photo is saved, then it is stored against that stop’s address, the date and the time.
- Given a customer complains about an address, when I search for that address and date, then I see the delivery photo.

## The proposed flow

Two steps from login to route instead of four. The compliance check is asked at the first login of a shift, and today’s runs are already listed when the driver opens the app.

![Proposed screens: sign in, the compliance check, and runs listed by date](/case-studies/idriver/proposed-screens.png)

## How I tested it

I planned UAT with 4 drivers and set 4 success measures. The same 4 drivers walked through the prototype, and I tested the measures with SQL on a practice dataset of 32 drivers over 12 weeks.

<!-- draft -->
### Success measures

| Measure | Today | Target |
| --- | --- | --- |
| Steps from login to route | 4 | 2 |
| Compliance checks per driver per shift | One per login | 1 |
| Delivery photos tied to an address | Not reliably | Every photo |
| Minutes from login to first delivery | Baseline from the practice data | Below the baseline |

### Checking a measure with SQL

Compliance checks per driver per shift, week by week, from the practice dataset:

```sql
SELECT s.week,
       COUNT(c.id) * 1.0 / COUNT(DISTINCT s.id) AS checks_per_shift
FROM shifts AS s
LEFT JOIN compliance_checks AS c ON c.shift_id = s.id
GROUP BY s.week
ORDER BY s.week;
```
<!-- /draft -->

> [!TODO] Swap in your real table and column names, then add the query’s result from your practice dataset.

## Result

The 4 drivers who walked through my prototype understood the flow from the first screen.

> [!TODO] Add what you’d do differently next time.
