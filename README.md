# CMPT 315 Midterm: A University Course Registration System
This web application represents a university course registration system with multiple students and courses. The application allows a user to select any student from a list of students. Selecting a student will show a list of courses a student can enroll in and another list of courses the student is already enrolled in.

## Links

Link to application: https://three15-midterm-frontend.onrender.com

Link to backend: https://three15-midterm-backend.onrender.com

## How To Access
To use the web application, click on the [website link](https://three15-midterm-frontend.onrender.com) and the user will be able to access the web application without setup. Since the backend is hosted using Render's free web service plan, it might take over 50 seconds for the data to load into the application as the server may need to be spun up. 

Once the server is spun up, the data will be automatically loaded into the application so there will be no need for the user to refresh the web page. If at any point the server becomes disconnected from the web application, the tables will be filled with spinners indicating that the data cannot be loaded.

## How To Use
By clicking on the dropdown menu within the course registration container, a user can view a list of students within the system and select any student they want to. By default the student with id number 1 will be loaded.

After selecting a student, a list of courses they can enroll in will be displayed inside the course registration container. Another list of courses they are already enrolled in will be displayed in the Student Information container.

Within the course registration panel, a user can click on a green button labelled "enroll" to enroll the student in the course that is within the same row. If a user wishes to unenroll a student from a course, in the student information panel they can click on a red button labelled "Unenroll" to remove the student from the course within the same row.

Within each container is a searchbar that will filter courses based on their start times. This is useful if the user wishes to find courses that fit within the schedule of the student or possibly have a matching time.

***** **_NOTICE:_** *****

**While a student can be registered into any course, they must ensure first that a course they are attempting to enroll in does not conflict with any other courses they have previously enrolled in. Such a conflict would be if the start times are at the same time. The system will check and prevent a student from them signing up for a course that has the same class start time as one they are already enrolled in.**
