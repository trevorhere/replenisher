Running the code:
  *   clone the repository onto your local machine
  *   cd into the cloned repository
  *   run the command `npm install`
  *   run the command `npm run dev`
  *   at this point you should be able to browse to `http://localhost:4000` to view the application

Assumptions:
  * Authentication
    *  The specs for this project didn't mention much in regard to authentication, user profiles or anything like that.The specs did mention that tasks could be assigned by one user to another. Because of this, it seemed that user accounts would be necessary.  Without user accounts, assigning tasks from one user to another would't work very well.

  *  Team Based Organization
      * I built a team component with the option to add users, and view a rudementary user profile. This allows you to view emails, name, etc of another user and use that info (email) to assign tasks to a specific user.

  * Priority / Rank
    *   I limited priority to a scale of 0 - 4, 0 being low and 4 being nuclear. Tasks are then ordered in a list first based on priority and then based on expected duration. i.e Tasks with the highest priority and the shortest expected duration appear first.

    * Though rank isn't explicitly stated in the application, this ordering in the list provides an intuitive ranking system for the user to follow.


Things I Didn't Complete
  * Testing
    * Though testing is incredibly important in the development process, I was unfortunately unable to write tests for this application. But, If I could have, I would have writen unit test for most of the major components along with some tests that would essentialy be API calls to my graphql layer to seed data along with API calls to graphql to assert correct data placement.
  * Notes
    * Although you are able to enter notes when you create a task, I didn't include the capability to update these notes.
  * Feedback
    * Feedback exists on the task data type but I didn't include editing capability for this feature either.
