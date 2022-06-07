# Project 3

0. Update-Thoughts

1. User Stories
    a. register -> login -> view homepage -> add item -> view cart -> checkout

    view Homepage -> component

    component -> view  

2. Views/Controller/Models
    a. Central view that gets updated
    b. individual views

3. Roles in Teams

5. input/validation (Ux/UI error handling) 

6. breaks

Central Views 
Admin Home 
    - Delete

Home (user)
    - search
    - featured products

1. Search
    Hassan - 
    Justin - 
    Joesph - git hubber
    Mohamed - 

2. Create / Delete / Update
    Philip - team lead git
    Jaya -
    Parth - 
    Hailey -

3. Chat
    Chime 
    Nabil
    Milan - team lead 1
    Lilianne
    Victor
    Swathi

4. Input Validation / UX-UI Error handling
    Darryl - team lead 2*
    Kenneth
    Dawit
    Mohammad
    Bayode

6. Front-End Styling

7. Jenkins
    Darryl
    Chime


## Naming Convention 
git checkout -b

### Things to remember
Always git pull before creating a new branch

### Creating a new branch
git checkout develop (Start from the develop branch)
git pull
git checkout -b feature/ OR style/ OR bug/(bug-to-fix)

### Merging feature branch into develop
save your work and push it to yor branch git add . -> git commit -m " " -> git push origin feature/
git checkout develop
git pull (always do a pull before you merge, you will get an error if you try to merge when the develop branch is behind)
git merge your-branch-name
git push (push the changes that you merged into develop)
Merge Conflicts
When you get a merge conflict, open VS Code and see what changes need to be approved

Click on the changes you want to accept Please don't change the models in the Backend or Frontend(IUser, IDeck, ICard) unless everyone agrees, if the models change then all methods that rely on it will break and there will be a merge conflict for unmerged branches
