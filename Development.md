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

### Merging feature branch into develop through pull requests
1. save your work and push it to yor branch git add . -> git commit -m " " -> git push origin feature/
2. go on git hub and create a full request from your branch into the develop branch
Creating a new pull request
![image](https://user-images.githubusercontent.com/101683611/172508314-441c0707-f909-4594-b52e-533859530c70.png) <br/>

Select the base repository to be revate-rss-ethan-1354... and the base to be develop
![image](https://user-images.githubusercontent.com/101683611/172508574-fec02517-7412-414b-968d-2f5f359032e4.png) <br/>

Select the branch that you were working on and click on create new pull request
![image](https://user-images.githubusercontent.com/101683611/172508767-d17f5faf-db03-4ce4-b56d-68565499329e.png) <br/>

### Merging feature branch into develop directly
save your work and push it to yor branch git add . -> git commit -m " " -> git push origin feature/
git checkout develop
git pull (always do a pull before you merge, you will get an error if you try to merge when the develop branch is behind)
git merge your-branch-name
git push (push the changes that you merged into develop)
Merge Conflicts
When you get a merge conflict, open VS Code and see what changes need to be approved

Click on the changes you want to accept Please don't change the models in the Backend or Frontend(IUser, IDeck, ICard) unless everyone agrees, if the models change then all methods that rely on it will break and there will be a merge conflict for unmerged branches
