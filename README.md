# Mobile Web Specialist Certification Course
---
#### _Three Stage Course Material Project - Restaurant Reviews_

## Project Overview: Stage 1, 2, and 3

This project contains Stages One, Two, and Three of Udacity's Mobile Web Specialist Nanodegree.

Stage One converts a static web website into a design that's responsive on different
sized displays and accessible for screen reader use.  It uses service workers to
support offline viewing and improve performance. 

Stage Two modifies the website delivered in Stage One to pull JSON from a remote
server and cache this information using the IndexedDB API.  Lighthouse was used leading up
to submission to achieve Performance, PWA, and Accessibility targets.

Stage Three adds deferred form submission and even tighter Lighthouse Performance benchmarks than
Stage 2.

### Getting the app up and running

**Prerequisites**:  _You must have Nodejs installed on your system._

1.  Clone or download the MWS Restaurant Stage 3 server component from
    https://github.com/dstaflund/mws-restaurant-stage-3
2.  Unzip the project and start the server by running `node server` from its root directory.
3.  Clone or download the MWS Restaurant Stage 1 client component from
    https://github.com/dstaflund/mws-restaurant-stage-1
4.  Unzip the project and run `npm install` from its root directory.
5.  Then start the server by running `gulp serve` from its root directory.
6.  Navigate to `localhost:8000` to view the app.

## Screenshots

The following is a screenshot of the homepage, which shows the restaurants you can
find reviews on, their locations on a map, and whether or not they're a favorite of yours.

![Alt text](/screenshots/restaurant_list.jpg?raw=true "Restaurant List")

The following is a screenshot of the reviews page, which shows reviews for a given
restaurant, and lets you enter your own review.

![Alt text](/screenshots/restaurant_reviews.jpg?raw=true "Restaurant Reviews")

The following is a screenshot of the dialog you'll see when entering a review for
a restaurant.

![Alt text](/screenshots/review_dialog.jpg?raw=true "Review Entry Dialog")


## Leaflet.js, Mapbox, et al.

This repository uses [leafletjs](https://leafletjs.com/), [Mapbox](https://www.mapbox.com/), and
[Idb Promise](https://github.com/jakearchibald/idb).

Snackbar code is an adaptation of code from [Snackbar / Toast](https://www.w3schools.com/howto/howto_js_snackbar.asp).


### Note about ES6

Most of the code in this project has been written to the ES6 JavaScript specification for
compatibility with modern web browsers and future-proofing JavaScript code.
