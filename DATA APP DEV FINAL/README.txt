My project runs on Firebase but I will uplaod to both just in case. I also sent an invitation to my firebase console at trshelto@iupui.edu because i could not find 
any other relevant email so if you need me to do something else for access just let me know.

Firebase address: https://console.firebase.google.com/project/database-e5ab1
Web4 address: https://in-info-web4.informatics.iupui.edu/~jakeoaks/


My application is a web server that stores data about how fast the users completed the resepective games. It cna be interacted with as an anonymous user who 
only has privilages to view the leaderboards and webpages. A user, who can submit times to the leader boards for a moderator to approve. A moderator, who can
review submitted runs that users submit on their respective boards. Or as an Admin, who has compelte control over the acceptence of runs to all game leaderboards.

Using my application is simple. Simply loading the webpage allows the user to view every bit of data publicly available on the leaderboards. Creating an account allows
them submit run times ot boards and review what runs they have submitted on their Account page. Moderators can do both of these things as well as review speedruns by 
selecting the "Pending Runs" button on a page they are the moderator of. And of course, the admin can do it all.


Submitting a run sets the data for that run into a seperate database were it is held for review by a moderator or admin. Until one of those accounts approves it,
the only place it can be seen is by the user in their account page under "pending runs". This allows for what would normally be a "verification" stage of a real
website liek this where the moderator would review footage to validify the runs legitamacy.


Once a run is accepted, this pushes the data into the database that stores all the other speedrunning data that is displayed on the site. 
On acceptance, it is compared to the otherruns on the same game and they are re-ranked in order from fastest to slowest times. For this prototype the 
usage of "hh:mm:ss" is crucial to making sure the site works properly as there was not enough time for me to design a fail safe. If the run is denied, it is 
deleted form the temporary database where it was held for review and is gone forever.


To see the fullness of my application you will most likely need to sign in and out of a few accounts to see what permission they have and what ones they do not.
The admin account has full permisions meaning that account can accept or deny speedrun submissions form any leaderboard. Whereas, the moderators have their respective
boards listed.

====================

Admin Account
------------------

email: admin@admin.net
password: adminadmin

-------------------

====================

Moderator Accounts
-------------------

"Outlast" and "Super Mario Sunshine" Moderator:

email: akira@gmail.com 
password: akirarika

--------------------

"Dark Souls" and "Portal" Moderator:

email: jakeoaks@gmail.com
password: darksouls4ever

--------------------

"Mario 64" and "Hallow Knight" Moderator:

email: hexblade@gmail.com
password: hexblades

--------------------

"Minecraft" Moderator:

email: jasper@gmail.com
password: jaspersup

---------------------

=======================