# Project 3
1. Search<br/>
    Hassan - <br/>
    Justin - <br/>
    Joesph - <br/>
    Mohamed - <br/>

2. Create / Delete / Update<br/>
    Philip - Lead<br/>
    Jaya -<br/>
    Parth - <br/>
    Hailey -<br/>

3. Chat<br/>
    Chime <br/>
    Nabil <br/>
    Milan - Lead<br/>
    Lilianne <br/>
    Victor <br/>
    Swathi <br/>

4. Input Validation / UX-UI Error handling<br/>
    Darryl - Lead 2*<br/>
    Kenneth<br/>
    Dawit<br/>
    Mohammad<br/>
    Bayode<br/>

6. Front-End Styling<br/>

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
