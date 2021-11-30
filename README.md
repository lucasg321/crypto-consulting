# Crypto Consulting

Website made with: Python, Django, DRF, Angular, Ionic, TypeScript, SQL

This project is currently in development and will be finished by December 13. 

The front-end is located in the "frontend" folder. The repo root is the Python/Django backend root.

### Description:
A website focused on providing consulting services for users by expert consultants. It is a marketplace for consultants and users to be matched together based on expertise and topic. Users can choose a question they need help with and it will recommend consultants that have that area of expertise. They can then book a meeting for half an hour or a full hour, for a fixed cost.

### Languages/Libraries/Frameworks:
HTML, CSS, Javascript, TypeScript, Angular, Ionic, Python, Django, Django Rest Framework, JWT, Calendly, Zoom, Stripe, and SQL

### How it works:
The back-end is a Restful API developed in Django with Django Rest Framework. It has get, post, update, and delete functionality for the following four main services: users, questions/services, discounts, meetings. It integrates with Calendly for calendar syncing, Zoom for creating meeting links and Stripe for collecting payments. The front-end is made using Angular and Ionic to create a visually appealing respopnsive interface. It simply calls the various endpoints depending on the user's actions. The application is developed mobile first, meaning the desktop and mobile version will be very responsive and have quite different mobile and desktop views. Developed using Angular wrapped in Ionic, when ported to an app the Ionic components will naturally make it look like a native mobile application. 

Software Requirements document pre-development: https://docs.google.com/document/d/14BAxNQ0knwr24HllClpMnl4QF2lNSswyQ2qYk_WaW-0/edit?usp=sharing

Architecure Thoughts:

Use GCP app Engine, container and SQL for now. When scaling there are a few things to think about. If we have core regions that seem to use the app we can use a load balancer to direct traffic to a US and Europe version. Or even have multiple witihn a continent like East and West, etc. Can create read copies of the DB. Writing only occurs when booking a meeting or creating a user profile, therefore reading will be much more common. Multiple read copies of the DB will enable faster reading from the DBs especially if cognizant of location. 

### Pictures: 

https://gyazo.com/4cc9b8d4a7af4f8301ef7720f3593a29

https://gyazo.com/92a740c16963431ee41fa9e01d184c9d

https://gyazo.com/3dae48e3aef96bffec046e162404221c

https://gyazo.com/1caa54c0cf8b28c4d5c62ed752a307e6
