<p align="center">
<img src="https://i.imgur.com/k2sRIG2.png"/>
</p>

<h1 align="center">MapDoc</h1>

<p align="center">A place to share work by location!</p>

##Description

MapDoc is an application which allows users to both upload articles that can be used for research and to also explore documents by location, title, author or subject matter. Users join and can upload any type of file along with a certain location. The location gets pinned to the MapDoc map and other users are able to join and find work on MapDoc. 

<img align="center" src="https://i.imgur.com/QYmQxr1.png" height="400"/>

Development | Services | Deplployment
------------|------|-------------
AngularJs | Google Maps API | Heroku
JavaScript | Google Geocoder
jQuery | Amazon Web Services
Node.js | angular-ui-google-maps
Express |
Passport |
MongoDB |
HTML|
CSS|

##API Routes
Method | Parameters | Description | Exposed
-------------|------|-----------|-------
`usersAll` | `/users` | displays all users in the database | Yes
`userShow` | '/users/:id' | displays particular user | Yes
`docIndex` | `/docs` | displays all users| Yes
`docShow` | `/docs/:id | displays particular user | Yes


##Trello:
[MapDoc](https://trello.com/b/su9YFMZ1/mapdoc)

### USER MODEL

Parameters  | Value | Description | Example
----------- | ------ | ---------- | --------
name | String | Display Name | "Mike Klophaus"
email | String | Email  | mike@klophaus.com

  

### CIRCLE MODEL


Parameters  | Value | Description | Example
----------- | ------ | ---------- | --------
author | String | author of document created | "James Hunter"
title | String| title of document created | "Bears"
subject | String | subject of the document | "Animals"
location | String | location of the document | Anchorage, Alaska 
longitude | String | longitude of the location | "78.96288"
latitude | String | latitude of the location | "20.593684"



